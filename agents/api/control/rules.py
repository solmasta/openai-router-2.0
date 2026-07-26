
rules={
    "default":"best-score",
    "fallback":True,
    "max_latency":5
}


def get_rules():
    return rules


def update_rules(data):
    rules.update(data)
