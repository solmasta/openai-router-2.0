from agents.api.database.db import connect


def set_setting(key,value):
    conn=connect()
    cur=conn.cursor()

    cur.execute(
        """
        INSERT INTO admin(key,value)
        VALUES(?,?)
        ON CONFLICT(key)
        DO UPDATE SET value=excluded.value
        """,
        (key,value)
    )

    conn.commit()
    conn.close()


def get_settings():
    conn=connect()
    cur=conn.cursor()

    cur.execute(
        "SELECT key,value FROM admin"
    )

    rows=cur.fetchall()
    conn.close()

    return {
        x[0]:x[1]
        for x in rows
    }
