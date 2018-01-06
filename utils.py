def get_id(messages):
    try:
        id_ = messages[-1]['id'] + 1
    except IndexError:
        id_ = 1
    return id_
