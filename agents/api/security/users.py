users = {
    "admin": {
        "role":"admin",
        "active":True
    }
}


def get_user(name):
    return users.get(name)


def add_user(name,role="user"):
    users[name]={
        "role":role,
        "active":True
    }
