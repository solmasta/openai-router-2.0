from agents.api.providers import (
    local_run,
    mock_run,
    openai_run
)


PROVIDERS = {
    "local": local_run,
    "mock": mock_run,
    "openai": openai_run
}


def get_provider(name: str):

    return PROVIDERS.get(
        name,
        local_run
    )


def list_providers():

    return [
        {
            "id": name,
            "name": f"{name.title()} Provider",
            "status": "online"
        }
        for name in PROVIDERS
    ]
