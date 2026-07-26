
usage={}


def record(key):

    usage[key]=usage.get(key,0)+1


def get_usage():

    return usage
