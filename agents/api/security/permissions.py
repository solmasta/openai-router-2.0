
roles = {
    "admin":[
        "manage",
        "configure",
        "view"
    ],
    "user":[
        "view"
    ]
}


def allowed(role,action):

    return action in roles.get(role,[])
