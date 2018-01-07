import os
from datetime import datetime

from flask import Flask
from flask_restful import Api, Resource, fields, marshal, reqparse
from flask_sqlalchemy import SQLAlchemy

from consts import HTTP_CREATED

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
api = Api(app)

from models import MessagesModel

message_fields = {
    'id': fields.Integer,
    'created': fields.DateTime(dt_format='rfc822'),
    'life_time': fields.Integer,
    'title': fields.String,
    'text': fields.String,
    'lat': fields.Float,
    'lon': fields.Float,
    'range': fields.Integer,
}


class Message(Resource):
    def get(self, msg_id):
        pass

    def put(self, msg_id):
        pass

    def delete(self, msg_id):
        pass


class MessageList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        arguments = [
            ('life_time', int, False, 10),
            ('title', str, True, None),
            ('text', str, True, None),
            ('lat', str, False, 0.00),
            ('lon', str, False, 0.00),
            ('range', str, False, 5),
        ]

        for name, type_, required, default in arguments:
            self.reqparse.add_argument(
                name,
                type=type_,
                required=required,
                help='{} not provided'.format(name),
                location='json',
                default=default
            )
        super(Resource, self).__init__()

    def get(self):
        return {'messages': [marshal(message, message_fields)
                             for message in MessagesModel.all()]}

    def post(self):
        args = self.reqparse.parse_args()

        message = MessagesModel(
            created=datetime.now(),
            life_time=args['life_time'],
            title=args['title'],
            text=args['text'],
            lat=args['lat'],
            lon=args['lon'],
            range=args['range'],
        )
        db.session.add(message)
        db.session.commit()

        return {'message': marshal(message, message_fields)}, HTTP_CREATED


api.add_resource(
    Message, '/geomessages/api/v1.0/messages/<int:msg_id>', endpoint='message')
api.add_resource(
    MessageList, '/geomessages/api/v1.0/messages/', endpoint='messages')
