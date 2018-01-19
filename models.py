from datetime import datetime

from itsdangerous import TimedJSONWebSignatureSerializer, Serializer, \
    SignatureExpired, BadSignature
from parse import parse
from passlib.apps import custom_app_context as pwd_context
from sqlalchemy.exc import IntegrityError

from api import db, app
from utils import HTTPExceptionJson


class MessagesModel(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime)
    life_time = db.Column(db.Integer)
    title = db.Column(db.String())
    text = db.Column(db.String())
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    range = db.Column(db.Integer)

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def __repr__(self):
        return '<id {}>'.format(self.id)

    @classmethod
    def all(cls):
        return cls.query.all()

    @classmethod
    def create(cls, **kwargs):
        if 'created' not in kwargs:
            kwargs['created'] = datetime.now()
        message = MessagesModel(**kwargs)
        db.session.add(message)
        db.session.commit()
        return message


class UserModel(db.Model):
    __tablename__ = 'tuser'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(30))
    password_hash = db.Column(db.String(128))

    def __init__(self, email, password):
        self.email = email
        self.password_hash = self.hash_password(password)

    def __repr__(self):
        return '<id {} {}>'.format(self.id, self.email)

    @classmethod
    def create(cls, email, password, password_repeat):
        try:
            if password != password_repeat:
                raise HTTPExceptionJson(dict(user=dict(password='a password have to be the same as password_repeat')))
            user = UserModel(email, password)
            db.session.add(user)
            db.session.commit()
            return user
        except IntegrityError as e:
            error = parse('duplicate key value violates unique constraint "{constraint}"\nDETAIL:  Key ({field})=({input}) already exists.\n', str(e.orig))
            import ipdb
            ipdb.set_trace()
            raise HTTPExceptionJson(e)

    @classmethod
    def hash_password(cls, password):
        return pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    @classmethod
    def get(cls, user_id):
        return cls.query.filter_by(id=user_id).first()

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def generate_auth_token(self, expiration=600):
        s = TimedJSONWebSignatureSerializer(
            app.config['SECRET_KEY'],
            expires_in=expiration
        )
        return s.dumps({'id': self.id})

    @classmethod
    def verify_auth_token(cls, token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None  # valid token, but expired
        except BadSignature:
            return None  # invalid token
        user = cls.get(data['id'])
        return user
