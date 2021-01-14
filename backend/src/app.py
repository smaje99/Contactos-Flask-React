from flask import Flask, jsonify, request
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)

db = mongo.db.users


@app.route('/users', methods=['POST'])
def createUser():
    '''Recibe un usuario nuevo, lo registra
    en la base de datos y devuelve el id en
    la base de datos del nuevo usuario

    Returns:
        str: id en la base de datos del nuevo usuario
    '''
    user = request.json
    result = db.insert_one({
        'name': user['name'],
        'email': user['email'],
        'password': user['password'],
    })
    return jsonify(str(result.inserted_id))


@app.route('/users', methods=['GET'])
def getUsers():
    return 'received'


@app.route('/user/<id>', methods=['GET'])
def getUser():
    return 'received'


@app.route('/users/<id>', methods=['GET'])
def deleteUser():
    return 'received'


@app.route('/users/<id>', methods=['PUT'])
def updateUser():
    return 'received'


if __name__ == "__main__":
    app.run(debug=True)
