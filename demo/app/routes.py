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
    query_result = json.dumps(db.search(data['name']))
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
    home_id = db.add(data)
    result = {'success': True, 'response': home_id}
    return jsonify(result)

@app.route("/delete", methods = ['POST'])
def delete():
    data = request.get_json()
    try:
        db.delete(data)
        result = {'success':True, 'response':'Removed task'}
    except:
        result = {'success':False, 'response':'Something went wrong'}
    return jsonify(result)