from datetime import datetime


START_TIME = datetime.utcnow()

metrics = {
    "requests": 0,
    "providers": {}
}


def record_request(provider):

    metrics["requests"] += 1

    if provider not in metrics["providers"]:
        metrics["providers"][provider] = 0

    metrics["providers"][provider] += 1



def get_metrics():

    uptime = (
        datetime.utcnow() - START_TIME
    ).total_seconds()


    return {
        "requests": metrics["requests"],
        "providers": metrics["providers"],
        "uptime_seconds": uptime
    }
