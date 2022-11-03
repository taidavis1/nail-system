from flask import Flask , redirect , render_template , jsonify, url_for, request , flash, make_response, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
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
# from datetime import datetime, timedelta
import datetime
from functools import wraps

marsh = Marshmallow()
db = SQLAlchemy()
key = '$2y$10$HOP85MUzr39.uJcQoGyMOerF0yXU1RuWyYoUcqINGR4A0FILFLSDC'
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static', 'images')

def create_app():

    ###### create app and config database ######
    app = Flask(__name__ , template_folder='templates' , static_folder= 'static')

    app.config['SECRET_KEY'] = key

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:duykhanh12345@localhost/nails-system'

    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    marsh.init_app(app)
    
    ###### import routes and controllers ######
    
    from .routes import routes
    
    app.register_blueprint(routes, url_prefix ='/')
    
    from .employee_routes import employee_routes
    
    app.register_blueprint(employee_routes, url_prefix = '/employee')
    
    ###### import tables and models ######
    
    from .models import User, Category, Subcat, Services, subcatSchema, servicesSchema, categorySchema, userSchema, roleSchema, Employee
    
    connect_database(app)
    
    # engine = create_engine("mysql+pymysql://root:duykhanh12345@localhost/nails-system")
    
    # created = db.Column('created', db.DateTime,  default=datetime.datetime.utcnow)
    
    # add_column(engine, 'employee' , created)
    
    return app

def connect_database(app):
    db.create_all(app = app)
    print('created database sucessfully!')
    
def add_column(engine, table_name, created):
    column_name = created.compile(dialect=engine.dialect)
    column_type = created.type.compile(engine.dialect)
    engine.execute('ALTER TABLE %s ADD COLUMN %s %s' % (table_name, column_name, column_type))
    # engine.execute('ALTER TABLE %s DROP COLUMN %s' % (table_name, column_name))
    print('add new column' + table_name + 'successfully')
    