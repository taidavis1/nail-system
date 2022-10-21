from flask import Flask , redirect , render_template , jsonify, url_for, request , flash, make_response
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

from sqlalchemy import JSON
# import cv2

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static', 'images')

app = Flask(__name__ , template_folder='templates' , static_folder= 'static')

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:tuong123@localhost:57969/nailsapp'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

marsh = Marshmallow(app)

db = SQLAlchemy(app)
class User(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    
    public_id = db.Column(db.String(50), unique = True)
    
    name = db.Column(db.String(50), unique = True)
    
    email = db.Column(db.String(50), unique = True)
    
    password  = db.Column(db.String(100), nullable = False)
    
    def __init__ (self,public_id, email, name, password):
        self.public_id =public_id
        
        self.name = name
        
        self.email = email
        
        self.password = password
        
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
    
    services = marsh.Nested(servicesSchema , many = True)
    
    class Meta:
        
        model = Category
        
        load_instance = True

        
cat_sche = categorySchema()

cats_sche = categorySchema(many = True)

service_sche = servicesSchema()

services_sche = servicesSchema(many=True)

sub_sche = subcatSchema()

subs_sche = subcatSchema(many=True)

# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        print(request.headers)
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query\
                .filter_by(public_id = data['public_id'])\
                .first()
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated

# User Database Route
# this route sends back list of users
@app.route('/user', methods =['GET'])
@token_required
def get_all_users(current_user):
    # querying the database
    # for all the entries in it
    users = User.query.all()
    # converting the query objects
    # to list of jsons
    output = []
    for user in users:
        # appending the user data json
        # to the response list
        output.append({
            'public_id': user.public_id,
            'name' : user.name,
            'email' : user.email,
            'current_user': current_user.email
        })
  
    return jsonify({'users': output})

# route for logging user in
@app.route('/login', methods =['POST'])
def login():
    # creates dictionary of form data
    auth = request.form
    if not auth or not auth.get('email') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="Login required !!"'}
        )
    user = User.query\
        .filter_by(email = auth.get('email'))\
        .first()
    if not user:
        # returns 401 if user does not exist
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
        )
    if check_password_hash(user.password, auth.get('password')):
        # generates the JWT Token
        token = jwt.encode({
            'public_id': user.public_id,
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'])
        
        return make_response(jsonify({'token' : token}), 201)
    # returns 403 if password is wrong
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
    )
    
# signup route
@app.route('/signup', methods =['POST'])
def signup():

    data = request.form
    
    print(data)
  
    # gets name, email and password
    name, email = data.get('name'), data.get('email')
    password = data.get('password')
    
    # return jsonify(data)
  
    # checking for existing user
    user = User.query\
        .filter_by(email = email)\
        .first()
    if not user:
        # database ORM object
        user = User(
            public_id = str(uuid.uuid4()),
            name = name,
            email = email,
            password = generate_password_hash(password)
        )
        # insert user
        db.session.add(user)
        db.session.commit()
  
        return make_response('Successfully registered.')
    else:
        # returns 202 if user already exists
        return make_response('User already exists. Please Log in.')

### GET ALL DATE FROM DB ###
### RETURN DATA ###
@app.route('/get_data' , methods = ['GET'])
def get_data():
                
    category_list = Category.query.all()
            
    all_data = cats_sche.dump(category_list)
        
    return jsonify(all_data)


@app.route('/get_all_services' , methods = ['GET'])
def get_services():
                
    category_list = Services.query.all()
            
    all_data = services_sche.dump(category_list)
        
    return jsonify(all_data)


@app.route('/Add_Category' , methods = ['POST'])
def add_category():
    
    category_name = request.json['name']
    
    color = request.json['color']
    
    cat_add = Category(category_name , color)
    
    db.session.add(cat_add)
    
    db.session.commit()
        
    return cat_sche.jsonify([cat_add])

## function add subcat
## param request
## return data 
@app.route('/Add_Subcat' , methods = ['POST'])
def add_subcat():

    name = request.json['name']
    
    id = request.json['category']
    
    subcat_add = Subcat(name , id)
    
    db.session.add(subcat_add)
    
    db.session.commit()
    
    cat_add = sub_sche.dump(subcat_add)
        
    return jsonify(cat_add)


@app.route('/Add-photo', methods = ['POST'])

def addPhoto():
    
    display_name = request.form.get('display_name')
    
    name = request.form.get('name')
    
    price = request.form.get('price')
    
    commision = request.form.get('commision')
    
    color = request.form.get('color')
    
    photo = request.files.get('image')
    
    category = request.form.get('category')
    
    subCategories = request.form.get('subCategories')
    
    photo.save(os.path.join("/Users/macbook/nails-app/nails-sys/images/", name + category))

    print(display_name,name,price,commision,color, 'photo :' +photo,category,subCategories)
    
    service_photo = Services(display_name, name, price, commision, color, photo, category, subCategories)
    
    db.session.add(service_photo)
    
    db.session.commit()
    
    return jsonify('success!!!')


######## ADD IMAGE TO DATABASE FROM FE
@app.route('/Add_Services' , methods = ['POST'])

def add_services():
    
    display_name = request.form.get('displayName')
    
    name = request.form.get('name')
    
    price = request.form.get('price')

    commision = request.form.get('commission')

    color = request.form.get('color')
    
    photo = request.files.get('photo')
    
    category = request.form.get('category')
    
    subcat = request.form.get('subcat')
    
    # user_check = Services.query.filter_by(name = name).first()
    
    # user_check = user_check.name
    
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], name + ".png")
    
    photo.save(image_path)

    services_add = Services(name, display_name , price , commision , color , image_path,  category , subcat) #fix luu sai displayname va name
    
    db.session.add(services_add)
    
    db.session.commit()
    
    # if name != user_check:
        
    #     photo.save(os.path.join("/Users/macbook/nails-services/nails-sys/nails-sys-client/assets/images", name + ".jpeg"))
        
    #     services_add = Services(name, display_name , price , commision , color , photo,  category , subcat)
        
    #     db.session.add(services_add)
        
    #     db.session.commit()
        
    #     return services_sche.jsonify([services_add])
    # else: 
        
    #     return jsonify('duplicate column name')
    
    return services_sche.jsonify([services_add])


# Function get serive by category_id
# Param Request 
# Return data
@app.route('/get_services_by_category/<int:category>' , methods = ['POST'])
def get_services_by_category(category):
                
    # category_list = Services.query.all()
    
    category_list = Services.query.filter_by(category = category).all()
            
    all_data = services_sche.dump(category_list)
        
    return jsonify(all_data)


# Function get serive by service_id
# Param Request 
# Return data
@app.route('/get_services_by_id' , methods = ['POST'])
def get_services_by_id():
    
    id = request.json['service_id']
    
    category_list = Services.query.filter_by(id = id).first()
    
    print(category_list.category)
            
    all_data = service_sche.dump(category_list)
    
    all_data['category'] = category_list.category
    
    all_data['subcat_id'] = category_list.subCategories
        
    return jsonify(all_data)


# Function get serive by subcat_id
# Param Request 
# Return data
@app.route('/get_services_by_subcat/<int:category>/<int:subcat>' , methods = ['POST'])
def get_services_by_subcat(category, subcat):
                
    # category_list = Services.query.all()
    
    category_list = Services.query.filter_by(category = category,subCategories = subcat,).all()
    
    print(category_list)
            
    all_data = services_sche.dump(category_list)
        
    return jsonify(all_data)


# Function Delete Services by service_id
# Params Request 
# Return json message
@app.route('/delete_service', methods = ['POST'])
def delete_service():
    
    service_id = request.json['service_id']
    
    if service_id == '':
        
        return('param missing')
    else:
    
        item = Services.query.filter_by(id = service_id).first()
        
        db.session.delete(item)
        
        db.session.commit()
        
        return jsonify('successfully delete service')


@app.route('/delete_subcat', methods = ['POST'])
def delete_subcat():
    
    id = request.json['subcat_id']

    print(id)
    
    if id == '':
        
        return('param missing')
    else:
        
        item_services = Services.query.filter_by(subCategories = id).all()
        
        all_data = services_sche.dump(item_services)
        
        for i in item_services: 
            db.session.delete(i)

        item = Subcat.query.filter_by(id = id).first()
        
        db.session.delete(item)
        
        db.session.commit()
        
        return jsonify('deleted subcat sucessfully')


@app.route('/delete_category', methods = ['POST'])
def delete_category(): #fix khong truyen id vao vi da lay truc tiep json tu req
    
    category_id = request.json['category_id']
    
    if category_id == '':
        
        return('param missing')
    else:
    
        services = Services.query.filter_by(category = category_id).all()
        
        for i in services:
            db.session.delete(i)
        
        subcats = Subcat.query.filter_by(category = category_id).all()
        
        for i in subcats:
            db.session.delete(i)
        
        category = Category.query.filter_by(id = category_id).first()
        
        db.session.delete(category)
        
        db.session.commit()
        
        return jsonify('successfully delete category')

# Function delete services by subcat_id 
# Params int + int 
# Return json message
@app.route('/delete_service_by_subcat_id/<int:category_id>/<int:subcat_id>', methods = ['GET'])
def delete_services_by_subcat(category_id, subcat_id):
    
    items = Services.query.filter_by(category = category_id, subCategories = subcat_id).all()
    
    db.session.delete(items)
    
    db.session.commit()
    
    return('success')

# Function Edit Category Info
# Params Request 
# Return data 
@app.route('/edit_category_info',methods = ['POST']) #Tuong111 bo sung route de update cat info
def edit_category():

    category_id = request.json['category_id']

    new_name = request.json['name']

    new_color = request.json['color']

    item = Category.query.filter_by(id = category_id).all()

    for i in item :
        i.category_name = new_name

        i.color = new_color

        db.session.commit()

    new_item = Category.query.filter_by(id = category_id).all() #query to get cat after edited

    data = cats_sche.dump(new_item)

    return jsonify(data)

# Function Edit SubCat Info
# Params Request 
# Return data 
@app.route('/edit_subcat_info',methods = ['POST']) #Tuong111 bo sung route de update subcat info
def edit_subCat():

    subcat_id = request.json['subcat_id']

    new_name = request.json['name']

    item = Subcat.query.filter_by(id = subcat_id).all()

    for i in item :
        i.name = new_name

        db.session.commit()

    new_item = Subcat.query.filter_by(id = subcat_id).all() #query to get subcat after edited

    data = sub_sche.dump(new_item)

    print(data)

    return jsonify(data)

# Function Edit Services
# Params Request 
# Return data 
@app.route('/edit_service_infor', methods = ['POST'])
def edit_services():
    
    # category_id = request.form.get('category_id') -- Khong can dung den catID nua
    
    # subcat_id = request.form.get('subcat_id') -- Khong can dung den subCatID nua
    
    service_id = request.form.get('service_id')
    
    new_display_name = request.form.get('display_name')
    
    new_name = request.form.get('name')
    
    new_price = request.form.get('price')
    
    new_commision = request.form.get('commision')
    
    new_color = request.form.get('color')

    new_photo = request.files.get('photo')

    item = Services.query.filter_by(id = service_id).all()
    
    for i in item:
        i.display_name = new_display_name
        
        i.name = new_name

        i.price = new_price
        
        i.commision = new_commision
        
        i.color = new_color
        
        if new_photo is not None: #anh fix lai cho nay vi sua tu front end de tra photo = None luon
            
            new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_name + ".png")
        
            new_photo.save(new_image_path)
            
            i.photo = new_image_path
        
        db.session.commit()
    
    return services_sche.jsonify([item])

            
####################################################

if __name__ == '__main__':
    
    app.run(host='127.0.0.1',port=5000 , debug = True)