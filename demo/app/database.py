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

def add(data) -> int:
    conn = db.connect()
    home_id = conn.execute("SELECT MAX(home_id) FROM Home").fetchall()[0][0] + 1
    query = "INSERT INTO Home(home_id, host_id, name, price, neighborhood, latitude, longtitude) VALUES(%s, %s, \"%s\", %s, \"%s\", %s, %s);" % (home_id, 0, data['name'], data['price'], data['district'], data['latitude'], data['longtitude'])
    conn.execute(query)
    conn.close()
    return home_id

def delete(data: int) -> None:
	conn = db.connect()
	query = "DELETE FROM Home WHERE home_id = {};".format(data)
	conn.execute(query)
	conn.close()