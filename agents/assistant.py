import os
import json
from smolagents import CodeAgent, Tool, ApiModel

# -----------------------------
# OLD API COMPATIBLE TOOLS
# -----------------------------

def list_files(path="."):
    return "\n".join(os.listdir(path))

def read_file(path):
    return open(path, "r").read()

def write_file(path, content):
    with open(path, "w") as f:
        f.write(content)
    return "OK"

def analyze_repo(path="."):
    structure = {}
    for root, dirs, files in os.walk(path):
        rel = os.path.relpath(root, path)
        structure[rel] = {"dirs": dirs, "files": files}
    return json.dumps(structure, indent=2)

# Wrap functions as Tools (old smolagents API)
list_files_tool = Tool(list_files)
read_file_tool = Tool(read_file)
write_file_tool = Tool(write_file)
analyze_repo_tool = Tool(analyze_repo)

# -----------------------------
# Termux‑Safe Model (no HF)
# -----------------------------

class TermuxSafeModel(ApiModel):
    def __init__(self):
        super().__init__(model_id="termux-safe-mock", max_tokens=2048)

    def create_client(self):
        return None

    def run(self, prompt, **kwargs):
        return "Model disabled on Termux. Tools and Python logic still work."

model = TermuxSafeModel()

# -----------------------------
# Agent
# -----------------------------

agent = CodeAgent(
    model=model,
    tools=[list_files_tool, read_file_tool, write_file_tool, analyze_repo_tool],
    add_base_tools=True
)

# -----------------------------
# Run agent
# -----------------------------

agent.run("Analyze this repository using Python logic and list its structure.")
