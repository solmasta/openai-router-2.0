
from .scoring import best_provider
from .health import health


def choose_provider():

    provider=best_provider()

    if provider:
        if health.get(provider,{}).get("online"):
            return provider


    for name,data in health.items():
        if data.get("online"):
            return name


    return None
