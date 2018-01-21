from datetime import datetime

from flask_restful import fields


req_parse_message = [
    ('id', int, False, None),
    ('created', datetime, False, None),
    ('life_time', int, False, 10),
    ('title', str, True, None),
    ('text', str, True, None),
    ('lat', float, True, None),
    ('lon', float, True, None),
    ('range', int, False, 5),
]


def req_parse_to_field(req_parse, exclude=None):
    if not exclude:
        exclude = list()
    result = map(lambda x: x[:2], req_parse)
    return {k: map_types(v) for k, v in result if k not in exclude}


def map_types(field):
    if field == str:
        return fields.String
    if field == int:
        return fields.Integer
    if field == float:
        return fields.Float
    if field == datetime:
        return fields.DateTime(dt_format='rfc822')
    raise Exception('A type of "{}" is not supported'.format(field))


message_fields = req_parse_to_field(req_parse_message)
