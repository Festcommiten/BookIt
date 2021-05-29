import collections
import handlers.CONSTANTS as C


def validate_request_keys_unordered(posted_data: dict, endpoint_name: str) -> bool:
    """
    Compares that the posted data have the same keys we expect to receive from this request.
    :param posted_data: The data we received from the request as a Dictionary.
    :param endpoint_name: The name of the endpoint the request was sent to.
    :return: True if the unordered keys are the same, False if they're not.
    """
    return collections.Counter(posted_data.keys()) == collections.Counter(C.API_REQUEST_KEYS[endpoint_name])


def validate_request_keys_ordered(posted_data: dict, endpoint_name: str) -> bool:
    """
    Compares that the posted data have the same keys we expect to receive from this request.
    :param posted_data: The data we received from the request as a Dictionary.
    :param endpoint_name: The name of the endpoint the request was sent to.
    :return: True if the ordered keys are the same, False if they're not.
    """
    return list(posted_data) == C.API_REQUEST_KEYS[endpoint_name]


def str_to_int(string: str):
    try:
        return int(string)
    except ValueError:
        return False
