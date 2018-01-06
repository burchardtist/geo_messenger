from datetime import datetime

from flask import Flask
from flask_restful import Api, Resource, fields, marshal, reqparse

from consts import HTTP_CREATED
from utils import get_id

app = Flask(__name__)
api = Api(app)

messages = list()

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
            ('end_date', str, False, 10),
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
        return {'messages': [marshal(task, message_fields) for task in messages]}

    def post(self):
        args = self.reqparse.parse_args()

        message = {
            'id': get_id(messages),
            'created': datetime.now(),
            'end_date': args['end_date'],
            'title': args['title'],
            'text': args['text'],
            'lat': args['lat'],
            'lon': args['lon'],
            'range': args['range'],
        }
        messages.append(message)

        return {'message': marshal(message, message_fields)}, HTTP_CREATED


api.add_resource(
    Message, '/geomessages/api/v1.0/messages/<int:msg_id>', endpoint='message')
api.add_resource(
    MessageList, '/geomessages/api/v1.0/messages/', endpoint='messages')
