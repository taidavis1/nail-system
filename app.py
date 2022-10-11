from pyclbr import Function
from flask import Flask , redirect , render_template , jsonify, url_for, request , flash
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import UserMixin , AnonymousUserMixin , login_manager , login_user , logout_user
import pymysql
import json
import os
import sys
import random
# import cv2

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static', 'images')

app = Flask(__name__ , template_folder='templates' , static_folder= 'static')

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:duykhanh12345@localhost/test_nails'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

marsh = Marshmallow(app)

db = SQLAlchemy(app)

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


@app.route('/Add_Subcat' , methods = ['POST'])
def add_subcat():
    

    name = request.json['name']
    
    id = request.json['category']

    print('name :' +name,'categoryid:' + id)

    print('aaa')
    
    subcat_add = Subcat(name , id)
    
    db.session.add(subcat_add)
    
    db.session.commit()
        
    return sub_sche.jsonify([subcat_add])


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
    
    print(display_name,name,price,commision,color,photo,category,subcat)
    
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], name + ".png")
    
    print(image_path)
    
    photo.save(image_path)

    services_add = Services(display_name, name , price , commision , color , image_path,  category , subcat)
    
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
    
    print(category_list)
            
    all_data = services_sche.dump(category_list)
        
    return jsonify(all_data)


# Function get serive by service_id
# Param Request 
# Return data
@app.route('/get_services_by_id' , methods = ['POST'])
def get_services_by_id():
    
    id = request.json['service_id']
    
    category_list = Services.query.filter_by(id = id).first()
    
    print(category_list)
            
    all_data = service_sche.dump(category_list)
        
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
def delete_category():
    
    subcat_id = request.json['subcat_id']
    
    if subcat_id == '':
        
        return('param missing')
    else:
    
        item = Subcat.query.filter_by(id = subcat_id).first()
        
        db.session.delete(item)
        
        db.session.commit()
        
        return jsonify('successfully delete subcat')

# Function delete services by subcat_id 
# Params int + int 
# Return json message
@app.route('/delete_service_by_subcat_id/<int:category_id>/<int:subcat_id>', methods = ['GET'])
def delete_services_by_subcat(category_id, subcat_id):
    
    items = Services.query.filter_by(category = category_id, subCategories = subcat_id).all()
    
    db.session.delete(items)
    
    db.session.commit()
    
    return('success')


# Function Edit Services
# Params Request 
# Return data 
@app.route('/edit_service_infor', methods = ['POST'])
def edit_services():
    
    category_id = request.json['category_id']
    
    subcat_id = request.json['subcat_id']
    
    service_id = request.json['service_id']
    
    new_name = request.json['name']
    
    new_photo = request.files['photo']
    
    new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_name + ".png")
    
    new_photo.save(new_image_path)
    
    item = Services.query.filter_by(id = service_id, category = category_id, subCategory = subcat_id)
    
    for i in item:
        item.display_name = request.json['display_name']
        
        item.name = new_name
        
        item.price = request.json['price']
        
        item.commision = request.json['commision']
        
        item.color = request.json['color']
        
        item.photo = new_image_path
        
        db.session.save(item)
        
        db.session.commit()
    
    return services_sche.jsonify([item])

            
####################################################

if __name__ == '__main__':
    
    app.run(host='127.0.0.1',port=5000 , debug = True)