from .router_bridge import get_route
from .executor_bridge import execute_router


def execute_request(payload):
    route = get_route()

    result = execute_router(
        payload.get("input", "")
    )

    return {
        "success": True,
        "route": route,
        "result": result,
    }
