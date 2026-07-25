import secrets
import os


USERNAME = os.getenv(
    "ROUTER_USER",
    "admin"
)

PASSWORD = os.getenv(
    "ROUTER_PASSWORD",
    "admin"
)


TOKENS = set()


def login(username, password):

    if username == USERNAME and password == PASSWORD:

        token = secrets.token_hex(32)

        TOKENS.add(token)

        return token

    return None



def verify_token(headers):

    auth = headers.get(
        "Authorization",
        ""
    )

    if not auth.startswith(
        "Bearer "
    ):
        return False

    token = auth.replace(
        "Bearer ",
        ""
    )

    return token in TOKENS
