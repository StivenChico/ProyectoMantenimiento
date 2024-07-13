############# importar librerias o recursos#####
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

# initializations
app = Flask(__name__)
CORS(app)




# Mysql Connection
"""app.config['MYSQL_HOST'] = 'bv7h1w4xo7apdbtrysyl-mysql.services.clever-cloud.com' 
app.config['MYSQL_USER'] = 'uv6qsokghzno3ntw'
app.config['MYSQL_PASSWORD'] = 'C9KrEz8JwELh7RZoERVj'
app.config['MYSQL_DB'] = 'bv7h1w4xo7apdbtrysyl'
mysql = MySQL(app)
"""
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'BD_local'
mysql = MySQL(app)
# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"






# ruta para consultar todos los registros
@app.route('/Table_Fisic_State', methods=['GET'])
def Table_Fisic_State():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM client_status')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'Nombre': result[1], 'Apellido': result[2], 'Edad': result[3],'Altura': result[4],'peso': result[5],'Fr_Train': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


@app.route('/TableUser', methods=['GET'])
def TableUser():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'username': result[1], 'name': result[2], 'surname': result[3],'email': result[4],'password': result[5],'cell': result[6],'rol':result[7]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

  

# ruta para consultar por parametro
@app.route('/Login/<username>',methods=['GET'])
def Login(username):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT username,name,surname,password,rol FROM usuarios WHERE username = %s', (username,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content= {"username":result[0],"name":result[1],"surname":result[2],"password":result[3],"rol":result[4]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    

#### ruta para crear un registro########
@app.route('/registro', methods=['POST'])
def registro():
    try:
        if request.method == 'POST':
            username= request.json['username']
            name = request.json['name']
            surname = request.json['surname']
            email= request.json['email']  
            password = request.json['password']
            cell= request.json['cell']
            rol=request.json['rol']

            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO estudiante (username,name,surname,email,password,cell,rol) VALUES (%s,%s,%s,%s,%s,%s,%s)", (username,name,surname,email,password,cell,rol))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


######### ruta para actualizar################
@app.route('/update/<id>', methods=['PUT'])
def update_contact(id):
    try:
        fullname = request.json['fullname']
        phone = request.json['phone']
        email = request.json['email']
        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE contacts
        SET fullname = %s,
            email = %s,
            phone = %s
        WHERE id = %s
        """, (fullname, email, phone, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})



@app.route('/delete/<id>', methods = ['DELETE'])
def delete_contact(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM contacts WHERE id = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)
