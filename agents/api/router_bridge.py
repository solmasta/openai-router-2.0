from agents.api.provider_registry import (
    get_provider,
    list_providers
)


def execute_router(
    message: str,
    provider: str | None = None
):

    selected = provider or "local"

    handler = get_provider(
        selected
    )

    return handler(
        message
    )


def router_info():

    return {
        "name": "openai-router-2.0",
        "providers": list_providers()
    }
