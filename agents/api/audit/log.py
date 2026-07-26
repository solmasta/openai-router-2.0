from datetime import datetime

events=[]


def record(action,data=None):

    events.append({
        "time":str(datetime.utcnow()),
        "action":action,
        "data":data
    })


def list_events():

    return events
