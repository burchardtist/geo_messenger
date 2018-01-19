from flask import jsonify
from flask_restful import reqparse
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


def parse_request(fields):
    try:
        req_parser = reqparse.RequestParser()
        for name, type_, required, default in fields:
            req_parser.add_argument(
                name,
                type=type_,
                required=required,
                help='{} not provided'.format(name),
                location='json',
                default=default
            )

        return req_parser.parse_args()
    except HTTPException as e:
        raise HTTPExceptionJson(e.data)


