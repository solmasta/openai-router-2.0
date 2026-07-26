import time

from agents.api.provider_registry import (
    get_provider
)

from agents.api.provider_intelligence import (
    update,
    get
)


ORDER = [
    "openai",
    "mock",
    "local"
]


def best_provider():

    stats = get()

    winner = "local"
    score = -999


    for provider in ORDER:

        current = stats.get(
            provider,
            {}
        )


        value = current.get(
            "score",
            0
        )


        if value > score:

            score = value
            winner = provider


    return winner



def execute(message):

    provider = best_provider()

    start = time.time()

    try:

        result = get_provider(
            provider
        )(message)


        update(
            provider,
            True,
            time.time()-start
        )


        return {
            **result,
            "route": "automatic",
            "selected_provider": provider
        }


    except Exception as e:


        update(
            provider,
            False,
            time.time()-start
        )


        return {
            "success": False,
            "provider": provider,
            "error": str(e)
        }
