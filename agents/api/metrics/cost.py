costs={}

def record(provider,amount):
    costs[provider]=costs.get(provider,0)+amount

def summary():
    return costs
