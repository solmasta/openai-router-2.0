
settings={
    "environment":"development",
    "version":"2.0.0"
}


def get():

    return settings


def update(data):

    settings.update(data)
