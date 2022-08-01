from typing import Dict
from app import db

def search(data) -> dict:
    name = data['name']
    tags_ss = data['tags_ss']
    tags_pr = data['tags_pr']
    district = data['district']

    tags_ss_query = ""
    if len(tags_ss) >= 1:
        count = 1
        for i in tags_ss:
            if count == 1:
                tags_ss_query += " AND ("
                count += 1
            else:
                tags_ss_query += " OR "
            tags_ss_query += i
        tags_ss_query += ")"

    tags_pr_query = ""
    if len(tags_pr) >= 1:
        count = 1
        for i in tags_pr:
            if count == 1:
                tags_pr_query += " AND ("
                count += 1
            else:
                tags_pr_query += " OR "
            tags_pr_query += i
        tags_pr_query += ")"

    conn = db.connect()
    query = "SELECT home_id, name, price, safety_score, neighborhood, latitude, longtitude, range_name FROM Home NATURAL JOIN Neighborhood JOIN PriceRange pr ON (price >= pr.lower_bound AND price < pr.upper_bound) WHERE name LIKE '%%%%%s%%%%' %s %s AND neighborhood LIKE '%%%%%s%%%%' ORDER BY safety_score DESC, price;" % (name, tags_ss_query, tags_pr_query, district)
    query_results = conn.execute(query).fetchall()
    conn.close()

    res_list = []
    for result in query_results:
        item = {
            "home_id": result[0],
            "house_name": result[1],
            "price": result[2],
            "safety_score": result[3],
            "district": result[4],
            "latitude": result[5],
            "longtitude": result[6]
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

def edit(data) -> None:
    conn = db.connect()
    query = "UPDATE Home SET name = \"%s\" , price = %s, neighborhood = \"%s\" WHERE home_id = %s;" % (data['name'], data['price'], data['district'], data['home_id'])
    print(query)
    conn.execute(query)
    conn.close()

def overview() -> dict:
    conn = db.connect()
    query = "SELECT neighborhood, range_name as price_range, COUNT(home_id) as total_homes FROM Home NATURAL JOIN Host NATURAL JOIN RoomType JOIN PriceRange pr ON (price >= pr.lower_bound AND price < pr.upper_bound) GROUP BY neighborhood, price_range ORDER BY neighborhood;"
    query_results = conn.execute(query).fetchall()
    conn.close()

    res_list = []
    for result in query_results:
        item = {
            "district": result[0],
            "price_range": result[1],
            "total_homes": result[2]
        }
        res_list.append(item)
    
    return res_list