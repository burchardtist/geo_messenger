import os

from flask import Flask, jsonify, g
from flask import request
from flask_httpauth import HTTPBasicAuth
from flask_restful import marshal
from flask_sqlalchemy import SQLAlchemy

from fields import message_fields, req_parse_message
from utils import response, parse_request, is_message_available, \
    is_message_in_range

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'test')
db = SQLAlchemy(app)
auth = HTTPBasicAuth()

from models import UserModel, MessagesModel


@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = UserModel.verify_auth_token(username_or_token)
    if not user:
        # Second try to authenticate by login credentials
        user = UserModel.get_by_email(username_or_token)
        if not user or not user.verify_password(password):
            return False
        g.user = user
    return True


@app.route('/api/v1/token')
# @auth.login_required
def get_auth_token():
    duration = 600
    token = g.user.generate_auth_token(duration)
    return jsonify({
        'token': token.decode('ascii'),
        'duration': duration,
        'message': 'After Duration: {duration} secs, request for a new token.'.format(duration=duration)
})


@app.route('/api/v1/addUser', methods=['POST'])
def add_new_user():
    fields = [
        ('email', str, True, None),
        ('password', str, True, None),
        ('password_repeat', str, True, None),
    ]
    arguments = parse_request(fields)
    UserModel.create(**arguments)
    return response(dict(email=arguments['email']), 201)


@app.route('/api/v1/messagesList', methods=['GET'])
# @auth.login_required
def get_messages_list():
    arguments = parse_request(
        [
            ('lat', float, True, None),
            ('lon', float, True, None),
        ],
        get=True
    )

    messages = MessagesModel.all()
    available_messages = list()
    for message in messages:
        msg_distance = is_message_in_range(arguments.lat, arguments.lon, message)
        if msg_distance is not False and is_message_available(message):
            available_messages.append(message)
            setattr(message, 'distance', msg_distance)
    messages_data = marshal(available_messages, message_fields, 'messages')
    return response(messages_data, 200)


@app.route('/api/v1/addMessage', methods=['POST'])
# @auth.login_required
def add_message():
    arguments = parse_request(req_parse_message)
    message = MessagesModel.create(**arguments)

    message_data = marshal(message, message_fields)

    return response(message_data, 200)
