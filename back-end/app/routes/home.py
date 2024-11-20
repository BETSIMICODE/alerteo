from flask import Blueprint, jsonify
from app.models.Society import Society
from flask_cors import CORS

home = Blueprint('home', __name__)

CORS(home)

@home.route('/home')
def get_societies():
    print("hello")
    societies = Society.showAllSociety()
    print(Society.showAllSociety())
    return jsonify({
        'societies': societies
    })
