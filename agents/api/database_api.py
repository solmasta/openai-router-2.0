from agents.db.database import connect


def save_request(
    message,
    provider,
    response
):

    db=connect()

    db.execute(
        """
        INSERT INTO requests
        (time,message,provider,response)
        VALUES
        (datetime('now'),?,?,?)
        """,
        (
            message,
            provider,
            str(response)
        )
    )

    db.commit()
    db.close()



def list_requests():

    db=connect()

    rows=db.execute(
        """
        SELECT *
        FROM requests
        ORDER BY id DESC
        LIMIT 100
        """
    ).fetchall()

    db.close()

    return rows
