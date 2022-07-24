from app import db

def search(name) -> dict:
    conn = db.connect()
    query = "SELECT home_id, name, price, safety_score, neighborhood FROM Home NATURAL JOIN Neighborhood WHERE name LIKE '%%%%%s%%%%' ORDER BY safety_score DESC, price;" % name
    query_results = conn.execute(query).fetchall()
    conn.close()

    res_list = []
    for result in query_results:
        item = {
            "home_id": result[0],
            "house_name": result[1],
            "price": result[2],
            "safety_score": result[4],
            "district": result[3]
        }
        res_list.append(item)

    return res_list

def search_delete(name) -> dict:
    conn = db.connect()
    query = "SELECT home_id, name, price, neighborhood FROM Home WHERE name LIKE '%%%%%s%%%%' ORDER BY price;" % name
    query_results = conn.execute(query).fetchall()
    conn.close()

    res_list = []
    for result in query_results:
        item = {
            "home_id": result[0],
            "house_name": result[1],
            "price": result[2],
            "district": result[3]
        }
        res_list.append(item)

    return res_list

def search_edit(id) -> dict:
    conn = db.connect()
    query = "SELECT home_id, name, price, neighborhood FROM Home WHERE home_id = %s ORDER BY price;" % id
    query_results = conn.execute(query).fetchall()
    conn.close()

    res_list = []
    for result in query_results:
        item = {
            "home_id": result[0],
            "house_name": result[1],
            "price": result[2],
            "district": result[3]
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

def delete(data) -> None:
    conn = db.connect()
    for id in data:
        query = "DELETE FROM Home WHERE home_id = {};".format(id)
        conn.execute(query)
    conn.close()