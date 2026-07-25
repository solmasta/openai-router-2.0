from .router_bridge import get_route


def execute_request(payload):
    route = get_route()

    return {
        "success": True,
        "route": route,
        "input": payload.get("input", ""),
        "output": f"Processed by {route['provider']}",
    }
