import json
from pathlib import Path

CONFIG_FILE = Path(
    "agents/data/providers.json"
)

DEFAULT_CONFIG = {
    "providers": {
        "openai": {
            "enabled": True,
            "priority": 1
        },
        "local": {
            "enabled": True,
            "priority": 2
        },
        "mock": {
            "enabled": True,
            "priority": 3
        }
    }
}


def load_config():

    if not CONFIG_FILE.exists():

        CONFIG_FILE.parent.mkdir(
            exist_ok=True
        )

        CONFIG_FILE.write_text(
            json.dumps(
                DEFAULT_CONFIG,
                indent=2
            )
        )

    return json.loads(
        CONFIG_FILE.read_text()
    )


def save_config(data):

    CONFIG_FILE.write_text(
        json.dumps(
            data,
            indent=2
        )
    )
