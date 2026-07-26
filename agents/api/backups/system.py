from datetime import datetime

def backup_status():
    return {
        "last_check":str(datetime.utcnow())
    }
