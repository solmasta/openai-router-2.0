
keys={
    "dev-router-key":{
        "requests":0,
        "active":True
    }
}


def verify(key):

    return (
        key in keys and
        keys[key]["active"]
    )


def usage(key):

    return keys.get(key,{})
