from agents.api.provider_registry import (
    get_provider,
    list_providers,
    PROVIDERS
)

from agents.api.provider_intelligence import get as get_intelligence


# Preferred order when everything looks equally trustworthy.
PRIORITY = [
    "openai",
    "local",
    "mock"
]

# Below this many attempts we don't have enough signal to judge a
# provider, so it keeps its place in the priority order.
MIN_SAMPLE = 3

# A provider failing more often than this, once it has enough
# samples, is skipped in favor of the next one in priority order.
FAILURE_THRESHOLD = 0.5


def is_reliable(stats):

    if not stats or stats.get("requests", 0) < MIN_SAMPLE:
        return True

    failure_rate = (
        stats.get("failure", 0) / stats["requests"]
    )

    return failure_rate <= FAILURE_THRESHOLD


def choose_provider():

    healthy = [
        name for name in PRIORITY
        if PROVIDERS.get(name) and PROVIDERS[name]["health"]()
    ]

    if not healthy:
        return "local"

    intelligence = get_intelligence()

    for name in healthy:
        if is_reliable(intelligence.get(name)):
            return name

    # Nothing looks reliable - a healthy provider still beats none,
    # so fall back to the top of the priority order anyway.
    return healthy[0]


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
        success = result.get("success", True)
    else:
        response = result
        success = True

    return {
        "provider": selected,
        "response": response,
        "success": success,
        "route": "auto"
            if provider == "auto"
            else "manual"
    }


def router_info():

    return {
        "name": "openai-router-2.0",
        "providers": list_providers()
    }
