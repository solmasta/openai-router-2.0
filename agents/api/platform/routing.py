policy={
    "mode":"intelligent",
    "fallback":True,
    "latency_priority":True
}

def get_policy():
    return policy

def set_policy(data):
    policy.update(data)
