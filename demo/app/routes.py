from flask import render_template, request, jsonify
import json
from app import app
from app import database as db

@app.route("/")
def homepage():
    return render_template("test.html")

@app.route("/add.html")
def addpage():
    return render_template("add.html")

@app.route("/edit.html")
def editpage():
    return render_template("edit.html")

@app.route("/delete.html")
def deletepage():
    return render_template("delete.html")

@app.route("/search", methods = ['POST'])
def search():
    data = request.get_json()
    query_result = json.dumps(db.search(data))
    result = {'success': True, 'response': query_result}
    return jsonify(result)

@app.route("/search-delete", methods = ['POST'])
def search_delete():
    data = request.get_json()
    query_result = json.dumps(db.search_delete(data['name']))
    result = {'success': True, 'response': query_result}
    return jsonify(result)

@app.route("/search-edit", methods = ['POST'])
def search_edit():
    data = request.get_json()
    query_result = json.dumps(db.search_edit(data['home_id']))
    result = {'success': True, 'response': query_result}
    return jsonify(result)

@app.route("/add", methods = ['POST'])
def add():
    data = request.get_json()
    try:
        home_id = db.add(data)
        result = {'success':True, 'response':home_id}
    except:
        result = {'success':False, 'response':'Please make sure that the coordinate and district of your input is within Chicago!'}
    return jsonify(result)

@app.route("/edit", methods = ['POST'])
def edit():
    data = request.get_json()
    try:
        db.edit(data)
        result = {'success':True, 'response':'Success'}
    except:
        result = {'success':False, 'response':'Please make sure that the coordinate and district of your input is within Chicago!'}
    return jsonify(result)

@app.route("/delete", methods = ['POST'])
def delete():
    data = request.get_json()
    try:
        db.delete(data)
        result = {'success':True, 'response':'Successfully removed.'}
    except:
        result = {'success':False, 'response':'Something went wrong.'}
    return jsonify(result)

@app.route("/overview", methods = ['POST'])
def overview():
    query_result = json.dumps(db.overview())
    result = {'success': True, 'response': query_result}
    return jsonify(result)

@app.route("/procedure", methods = ['POST'])
def procedure():
    data = request.get_json()
    try:
        query_result = json.dumps(db.procedure(data['district']))
        result = {'success': True, 'response': query_result}
        return jsonify(result)
    except:
        result = {'success': False, 'response': "Please enter a valid district!"}
        return jsonify(result)