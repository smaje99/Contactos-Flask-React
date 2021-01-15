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
    la base de datos del nuevo usuario.

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
    '''Lista a todos los usuarios registrados
    en la base de datos con su respectivos datos.

    Returns:
        list: todos los usuarios con su datos
    '''
    return jsonify([{
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password':  user['password']
    } for user in db.find()])


@app.route('/users/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})
    return jsonify(
        _id=str(ObjectId(user['_id'])),
        name=user['name'],
        email=user['email'],
        password=user['password']
    )


@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    '''Eliminar un usuario en especifico registrado
    en la base de datos según su id.

    Args:
        id (str): id del usuario

    Returns:
        bool: confirmación
    '''
    user = db.delete_one({'_id': ObjectId(id)})
    return jsonify(
        deleted=bool(user.deleted_count)
    )


@app.route('/users/<id>', methods=['PUT'])
def updateUser():
    return 'received'


if __name__ == "__main__":
    app.run(debug=True)
