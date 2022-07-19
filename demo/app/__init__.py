from flask import Flask, jsonify, render_template

app = Flask(__name__)

# Cyclic import to prevent from using a template
from app import routes