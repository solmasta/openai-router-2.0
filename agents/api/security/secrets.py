secrets={}

def set_secret(name,value):
    secrets[name]=value

def exists(name):
    return name in secrets
