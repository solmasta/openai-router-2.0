from agents.api.providers import (
    local_run,
    mock_run,
    openai_run
)

from agents.api.providers import (
    local,
    mock,
    openai
)


PROVIDERS = {
    "local": {
        "run": local_run,
        "health": local.health
    },
    "mock": {
        "run": mock_run,
        "health": mock.health
    },
    "openai": {
        "run": openai_run,
        "health": openai.health
    }
}


def get_provider(name: str):

    provider = PROVIDERS.get(
        name,
        PROVIDERS["local"]
    )

    return provider["run"]


def list_providers():

    return [
        {
            "id": name,
            "name": f"{name.title()} Provider",
            "status":
                "online"
                if provider["health"]()
                else "offline"
        }
        for name, provider in PROVIDERS.items()
    ]
