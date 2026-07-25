from typing import List, Dict

def get_providers() -> List[Dict]:
    return [
        {
            "id": "local",
            "name": "Local Provider",
            "status": "online",
        }
    ]
