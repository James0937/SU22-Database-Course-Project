from app import db

def search(name) -> dict:
    conn = db.connect()
    query = "SELECT name, price, safety_score, neighborhood FROM Home NATURAL JOIN Neighborhood WHERE name LIKE '%%%%%s%%%%' ORDER BY safety_score DESC, price LIMIT 10;" % name
    query_results = conn.execute(query).fetchall()
    conn.close()

    res_list = []
    for result in query_results:
        item = {
            "house_name": result[0],
            "price": result[1],
            "safety_score": result[3],
            "district": result[2]
        }
        res_list.append(item)

    return res_list