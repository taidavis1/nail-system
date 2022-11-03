from curses import flash
import email
from . import db
from . import marsh
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime

class User(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    
    public_id = db.Column(db.String(50), unique = True)
    
    name = db.Column(db.String(50), unique = True)
    
    email = db.Column(db.String(50), unique = True)
    
    password  = db.Column(db.String(100), nullable = False)
    
    role = db.Column(db.String(100), nullable = False)
    
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    
    staff_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    
    status = db.Column(db.Integer, nullable = True)
    
    def __init__ (self,public_id, email, name, password, role, role_id, staff_id, status):
        self.public_id = public_id
        
        self.name = name
        
        self.email = email
        
        self.password = password
        
        self.role = role
        
        self.role_id = role_id
        
        self.staff_id = staff_id
        
        self.status = status
        
        
class Subcat(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    name = db.Column(db.String(50) , nullable = False)
        
    category = db.Column(db.Integer , db.ForeignKey('category.id'))
    
    services = db.relationship('Services' , backref = 'sub_services')

    def __init__ (self , name , category):
        
        self.name = name
        
        self.category = category
        
    
class Category(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    category_name = db.Column(db.String(50) , nullable = False)
    
    color = db.Column(db.String(50) , nullable = False)
        
    services_id = db.relationship('Services' , backref = 'cat_services')
    
    subCategories = db.relationship('Subcat' , backref = 'subcat')
    
    def __init__ (self , category_name , color):
        
        self.category_name = category_name
        
        self.color = color
        

class Services(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    name = db.Column(db.String(50) , nullable = False)
    
    display_name = db.Column(db.String(50) , nullable = False)
    
    name = db.Column(db.String(50) , nullable = False)

    price = db.Column(db.Integer , nullable = False)
    
    commision = db.Column(db.String(50) , nullable = False)
    
    color = db.Column(db.String(50) , nullable = False)

    photo = db.Column(db.String(150) , nullable = False)

    category = db.Column(db.Integer , db.ForeignKey('category.id'))
    
    subCategories = db.Column(db.Integer , db.ForeignKey('subcat.id'))
    
    def __init__ (self , name, display_name , price , commision , color , photo , category , subCategories):
        
        self.name = name
        
        self.display_name = display_name 
        
        self.price = price
        
        self.commision = commision
        
        self.color = color
        
        self.photo = photo
        
        self.category = category
        
        self.subCategories = subCategories
        
class Employee(db.Model):
    __tablename__ = 'employee'
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    cellphone = db.Column(db.String(50), nullable = True )
    street = db.Column(db.String(50), nullable = False)
    city = db.Column(db.String(50), nullable = False)
    state = db.Column(db.String(50), nullable = False)
    zip = db.Column(db.String(50), nullable = True)
    major = db.Column(db.String(50), nullable = True)
    user_staff_id = db.relationship('User', backref = 'user.id', cascade="all, delete-orphan")
    salary_id = db.relationship('Salary', backref = 'salary.id', cascade="all, delete-orphan")
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    def __init__(self, first_name, last_name, cellphone, street, city, state, zip, major ):
        self.first_name = first_name
        self.last_name = last_name
        self.cellphone = cellphone
        self.street = street
        self.city = city
        self.state = state
        self.zip = zip
        self.major = major

class Salary(db.Model):
    
    id = db.Column(db.Integer, primary_key = True)
    type_of_salary = db.Column(db.Integer, nullable = False)
    salary_per_type = db.Column(db.Integer, nullable = False)
    cash_salary = db.Column(db.Float, nullable = True)
    check_salary = db.Column(db.Float, nullable = True)
    tip = db.Column(db.String(50), nullable = False)
    cash_tip = db.Column(db.Float, nullable = True)
    check_tip = db.Column(db.Float, nullable = True)
    staff_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    
    def __init__(self, type_of_salary, staff_id ):
        self.type_of_salary = type_of_salary
        self.staff_id = staff_id

class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable = False)
    user_role = db.relationship('User' , backref = 'role_user')
    
    def __init__(self, name):
        self.name = name

          
class subcatSchema(marsh.SQLAlchemyAutoSchema):
    
    class Meta:
        
        model = Subcat
        
        load_instance = True
                
class servicesSchema(marsh.SQLAlchemyAutoSchema):
    
    class Meta:
        
        model = Services
        
        load_instance = True
                        
class categorySchema(marsh.SQLAlchemyAutoSchema):
    
    subCategories = marsh.Nested(subcatSchema , many = True)
    
    services_id = marsh.Nested(servicesSchema , many = True)
    
    class Meta:
        
        model = Category
        
        load_instance = True 
        
class userSchema(marsh.SQLAlchemyAutoSchema):
    class Meta:
        
        model = User
        
        load_instance = True

class salarySchema(marsh.SQLAlchemyAutoSchema):
    class Meta:
        model = Salary
        load_instance = True

class employeeSchema(marsh.SQLAlchemyAutoSchema):
    
    user_staff_id = marsh.Nested(userSchema , many = True)
    salary_id = marsh.Nested(salarySchema , many = True)
    class Meta:
        
        model = Employee
        
        load_instance = True 

class roleSchema(marsh.SQLAlchemyAutoSchema):
    user_role = marsh.Nested(userSchema , many = True)
    class Meta:
        
        model = Role
        
        load_instance = True

        
