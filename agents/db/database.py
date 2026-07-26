import sqlite3
from pathlib import Path


DB = Path(
    "agents/data/router.db"
)


def connect():

    return sqlite3.connect(DB)



def init():

    db = connect()

    cur = db.cursor()


    cur.execute("""
    CREATE TABLE IF NOT EXISTS requests(
        id INTEGER PRIMARY KEY,
        time TEXT,
        message TEXT,
        provider TEXT,
        response TEXT
    )
    """)


    cur.execute("""
    CREATE TABLE IF NOT EXISTS providers(
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE,
        requests INTEGER DEFAULT 0,
        success INTEGER DEFAULT 0,
        failure INTEGER DEFAULT 0
    )
    """)


    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        role TEXT
    )
    """)


    db.commit()
    db.close()



init()
