import time


health={}


def report(provider,ok=True,latency=0):

    health[provider]={
        "online":ok,
        "latency":latency,
        "updated":time.time()
    }


def status():
    return health
