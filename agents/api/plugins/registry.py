plugins={}

def register(name,data):
    plugins[name]=data

def list_plugins():
    return plugins
