from .db import connect


def save_request(provider, status, latency):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO requests(provider,status,latency)
        VALUES(?,?,?)
        """,
        (provider, status, latency)
    )

    conn.commit()
    conn.close()


def get_requests(limit=50):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id,provider,status,latency,created_at
        FROM requests
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    )

    rows = cur.fetchall()
    conn.close()

    return [
        {
            "id": r[0],
            "provider": r[1],
            "status": r[2],
            "latency": r[3],
            "created_at": r[4]
        }
        for r in rows
    ]
