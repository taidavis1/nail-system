from flask import Flask , redirect , render_template , jsonify, url_for, request , flash, make_response, session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import UserMixin , AnonymousUserMixin , login_manager , login_user , logout_user
import pymysql
import json
import os
import sys
import random
import uuid # for public id
from  werkzeug.security import generate_password_hash, check_password_hash
# imports for PyJWT authentication
import jwt
from datetime import datetime, timedelta
from functools import wraps

marsh = Marshmallow()
db = SQLAlchemy()
key = '$2y$10$HOP85MUzr39.uJcQoGyMOerF0yXU1RuWyYoUcqINGR4A0FILFLSDC'
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static', 'images')

def create_app():

    app = Flask(__name__ , template_folder='templates' , static_folder= 'static')

    app.config['SECRET_KEY'] = key

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:duykhanh12345@localhost/test_nails'

    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    marsh.init_app(app)
    
    from .routes import routes
    
    app.register_blueprint(routes, url_prefix ='/')
    
    from .models import User, Category, Subcat, Services, subcatSchema, servicesSchema, categorySchema
    
    connect_database(app)
    
    return app

def connect_database(app):
    db.create_all(app = app)
    print('created database sucessfully!')
    