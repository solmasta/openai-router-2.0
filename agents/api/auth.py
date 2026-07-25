import os


API_KEY = os.getenv(
    "ROUTER_API_KEY",
    "dev-router-key"
)


def verify_key(headers):

    provided = headers.get(
        "X-API-Key"
    )

    return provided == API_KEY
