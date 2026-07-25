import json
import subprocess


def execute_route(message):
    result = subprocess.check_output(
        [
            "node",
            "-e",
            f"""
            import('@openai-router/router')
            .then(async m => {{
                const r = await m.executeRoute({json.dumps(message)});
                console.log(JSON.stringify(r));
            }})
            """
        ],
        text=True
    )

    return json.loads(result)
