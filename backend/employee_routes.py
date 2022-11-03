from crypt import methods
from flask import Blueprint
from  werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask , redirect , render_template , jsonify, url_for, request , flash, make_response, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import os
import sys
import uuid
from datetime import datetime, timedelta
from . import db
from . import key
from . import UPLOAD_FOLDER
from .models import Role, User, Employee, Salary, userSchema, roleSchema, employeeSchema
from .routes import token_required

employee_routes = Blueprint('employee_routes', __name__)

users_sche = userSchema(many = True)
roles_sche = roleSchema(many = True)
employee_sche = employeeSchema(many = True)
employee_sches = employeeSchema()

# get data from employee table 
# no param
# return jsonify data
@employee_routes.route('/get-all-employees', methods = ['GET'])
def get_all_employees():
    employees = Employee.query.all()
    data = employee_sche.dump(employees)
    return jsonify(data)

# get current employee from table
# param id
# return jsonify data
@employee_routes.route('/get-current-employee/<int:id>', methods = ['GET'])
def get_current_employee(id):
    employee = Employee.query.filter_by(id = id).first()
    data = employee_sches.dump(employee)
    return jsonify(data)

# add new employee
# param request
# return jsonify message
@employee_routes.route('/add-employees', methods = ['POST'])
def add_employees():
    data = request.form
    max_id = None
    role = data.get('role')
    if role != '1':
        employee = Employee( 
            first_name = data.get('first_name'),
            last_name = data.get('last_name'),
            cellphone = data.get('cellphone'),
            street = data.get('street'),
            city = data.get('city'),
            state = data.get('state'),
            zip = data.get('zip'),
            major = data.get('major'),
            )
        db.session.add(employee)
        db.session.commit()
        
        # new_staff_id = session.query(func.max(Employee.id))
        max_id = db.session.query(func.max(Employee.id)).scalar()
        staff_salary = Salary(
            type_of_salary = data.get('type_of_salary'),
            staff_id = max_id,
        )
        db.session.add(staff_salary)
        db.session.commit()
    
    # checking for existing user
    name, email = data.get('name'), data.get('email')
    password = data.get('password')
    role_id = data.get('role_id')
    user = User.query\
        .filter_by(email = email)\
        .first()
    if not user:
        # database ORM object
        user = User(
            public_id = str(uuid.uuid4()),
            name = name,
            email = email,
            password = generate_password_hash(password),
            role = role,
            role_id = role_id,
            staff_id = max_id,
            status = 1,
        )
        # insert user
        db.session.add(user)
        db.session.commit()
  
        return make_response('Successfully registered a new staff')
    else:
        # returns 202 if user already exists
        return make_response('Created Fails')
    
    # role = Role.query.all()
    # employee = Employee.query.all()
    # data = employee_sche.dump(employee)
    # return jsonify(data)
    
@employee_routes.route('/edit-infor', methods = ['POST'])
def edit_employee_infor():
    data =  request.form
    staff = Employee.query.filter_by(id = int(data.get('staff_id')))
    for i in staff:
        i.first_name = data.get('first_name')
        i.last_name = data.get('last_name')
        i.cellphone = data.get('cellphone')
        i.street = data.get('street')
        i.city = data.get('city')
        i.state = data.get('state')
        i.zip = data.get('zip')
        i.major = data.get('major')
        db.session.commit()
        
    return jsonify('employee information updated')
    
@employee_routes.route('/delete/<int:id>', methods = ['GET'])
def delete_employee(id):
    employee = Employee.query.filter_by(id = id).first()
    db.session.delete(employee)
    db.session.commit()
    # data = employee_sche.dump(employee)
    return jsonify('delete staff successfully')