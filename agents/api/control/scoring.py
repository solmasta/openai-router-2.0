import time


providers = {}


def update_provider(name, success=True, latency=0):

    if name not in providers:
        providers[name] = {
            "requests":0,
            "success":0,
            "failure":0,
            "latency":0,
            "score":0
        }

    p = providers[name]

    p["requests"] += 1

    if success:
        p["success"] += 1
    else:
        p["failure"] += 1

    p["latency"] = latency

    reliability = (
        p["success"] /
        max(p["requests"],1)
    )

    speed = 1 / max(latency,0.01)

    p["score"] = round(
        (reliability * .7) +
        (speed * .3),
        4
    )


def get_scores():
    return providers


def best_provider():

    if not providers:
        return None

    return max(
        providers,
        key=lambda x: providers[x]["score"]
    )
