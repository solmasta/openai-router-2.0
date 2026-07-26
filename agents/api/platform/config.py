config={
    "version":"3.0.0",
    "environment":"development",
    "features":{
        "agents":True,
        "plugins":True,
        "metrics":True
    }
}

def get_config():
    return config

def update_config(data):
    config.update(data)
