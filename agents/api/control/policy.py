
policy = {
    "strategy":"best-score",
    "fallback":True
}


def get_policy():
    return policy


def set_policy(data):
    policy.update(data)
