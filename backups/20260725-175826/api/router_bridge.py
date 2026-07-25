from agents.api.provider_registry import (
    get_provider,
    list_providers,
    PROVIDERS
)


def choose_provider():

    # Preferred order
    priority = [
        "openai",
        "local",
        "mock"
    ]

    for name in priority:

        provider = PROVIDERS.get(name)

        if provider and provider["health"]():
            return name

    return "local"


def execute_router(
    message: str,
    provider: str | None = None
):

    selected = provider

    if not selected or selected == "auto":
        selected = choose_provider()

    handler = get_provider(
        selected
    )

    result = handler(
        message
    )

    if isinstance(result, dict):
        response = result.get("response", "")
    else:
        response = result

    return {
        "provider": selected,
        "response": response,
        "route": "auto"
            if provider == "auto"
            else "manual"
    }


def router_info():

    return {
        "name": "openai-router-2.0",
        "providers": list_providers()
    }
