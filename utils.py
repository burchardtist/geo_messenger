from datetime import datetime
from math import sin, cos, sqrt, atan2

from flask import jsonify
from flask_restful import reqparse
from geopy import Point
from geopy import distance
from werkzeug.exceptions import HTTPException


def response(data, status):
    res = jsonify(data)
    res.status_code = status
    res.mimetype = 'application/json'
    return res


class HTTPExceptionJson(HTTPException):
    code = 400

    def get_response(self, environ=None):
        return response(self.description, self.code)


def parse_request(fields, get=False):
    try:
        req_parser = reqparse.RequestParser()
        for name, type_, required, default in fields:
            req_parser.add_argument(
                name,
                type=type_,
                required=required,
                help='{} not provided'.format(name),
                location='json' if not get else 'args',
                default=default
            )

        return req_parser.parse_args()
    except HTTPException as e:
        raise HTTPExceptionJson(e.data)


def haversine_distance(lat1, lon1, lat2, lon2):
    """
    args have to be in *radians*
    """
    R = 6373.0  # approximate radius of earth in km

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


def geo_distance(lat1, lon1, lat2, lon2):
    coords_1 = Point(lat1, lon1)
    coords_2 = Point(lat2, lon2)

    # use great_circle if vincenty is too slow
    return distance.vincenty(coords_1, coords_2).km


def is_message_available(lat, lon, message):
    now = datetime.now()
    total_seconds = (now - message.created).total_seconds()
    minutes_passed = total_seconds/60

    if is_message_in_range(lat, lon, message) \
            and minutes_passed <= message.life_time:
        return True
    return False


def is_message_in_range(lat, lon, message):
    if geo_distance(lat, lon, message.lat, message.lon) <= message.range:
        return True
    return False
