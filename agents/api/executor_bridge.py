import json
import subprocess


def execute_router(input_text: str):
    payload = json.dumps({
        "input": input_text
    })

    result = subprocess.run(
        [
            "node",
            "-e",
            f"""
            const router = require('./packages/router/dist/index.js');
            router.execute({payload})
              .then(r => console.log(JSON.stringify(r)));
            """
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return {
            "success": False,
            "error": result.stderr
        }

    return json.loads(result.stdout)
