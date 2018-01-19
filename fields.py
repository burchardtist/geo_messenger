from flask_restful import fields

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
