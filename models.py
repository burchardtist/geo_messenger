from api import db


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
