def execute_router(
    message: str,
    provider: str | None = None
):

    if not provider:

        if "openai" in message.lower():
            provider = "openai"

        elif "mock" in message.lower():
            provider = "mock"

        else:
            provider = "local"


    providers = {
        "local": "Local Provider",
        "mock": "Mock Provider",
        "openai": "OpenAI Provider"
    }


    selected = providers.get(
        provider,
        "Local Provider"
    )


    return {
        "success": True,
        "provider": provider,
        "response":
            f"{selected} handled: {message}"
    }
