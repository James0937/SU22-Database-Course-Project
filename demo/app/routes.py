from flask import render_template, request, jsonify
import json
from app import app
from app import database as db

@app.route("/")
def homepage():
    return render_template("test.html")

@app.route("/search", methods = ['POST'])
def search():
    data = request.get_json()
    query_result = json.dumps(db.search(data['name']))
    result = {'success': True, 'response': query_result}
    return jsonify(result)