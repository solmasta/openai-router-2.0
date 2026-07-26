import time

metrics={
    "requests":0,
    "errors":0,
    "started":time.time()
}

def record_request(ok=True):
    metrics["requests"]+=1
    if not ok:
        metrics["errors"]+=1

def get_metrics():
    return metrics
