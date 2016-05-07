from django.db import connection

def get_all_messages(sql):
    cursor = connection.cursor()
    cursor.execute(sql)
    rows = cursor.fetchall()
    msgs = []
    for row in rows:
        print row
        msg = {
            "text" : row[0],
            "type" : "info",
            "username" : row[2]
        }
        msgs.append(msg)
    return msgs