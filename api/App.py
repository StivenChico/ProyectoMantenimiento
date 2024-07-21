############# importar librerias o recursos#####
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

# initializations
app = Flask(__name__)
CORS(app)



"""
# Mysql Connection
app.config['MYSQL_HOST'] = 'bv7h1w4xo7apdbtrysyl-mysql.services.clever-cloud.com' 
app.config['MYSQL_USER'] = 'uv6qsokghzno3ntw'
app.config['MYSQL_PASSWORD'] = 'C9KrEz8JwELh7RZoERVj'
app.config['MYSQL_DB'] = 'bv7h1w4xo7apdbtrysyl'
mysql = MySQL(app)
"""
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'prueba1'
mysql = MySQL(app)
# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"






# ruta para consultar todos los registros de estado fisico a traves de una vista creada en la base de datos
@app.route('/TableFisic', methods=['GET'])
def Table_Fisic_State():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM tablaetrainer')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'name': result[1], 'surname': result[2], 'age': result[3],'gender': result[4],'height': result[5],'weight': result[6],'Fr_Train':result[7]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

# ruta para saber informacion de un usuario con el id a traves de una vista creada en la base de datos
@app.route('/FisicById/<id>',methods=['GET'])
def FisicById(id):
    try:
        cur=mysql.connection.cursor()
        cur.execute('SELECT * FROM tablaetrainer WHERE id = %s', (id,))
        rv = cur.fetchone()
        cur.close()
        content = {'id': rv[0], 'name': rv[1], 'surname': rv[2], 'age': rv[3],'gender': rv[4],'height': rv[5],'weight': rv[6],'Fr_Train':rv[7],'restrictions':rv[8],'duration':rv[9],'goal':rv[10]}
        return jsonify(content)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    

@app.route('/addDiagnostico', methods=['POST'])
def addDiagnostico():
    try:
        id_cliente=request.json['id_cliente']
        id_prof=request.json['id_prof']
        fecha=request.json['fecha']
        diagnostico=request.json['diagnostico']

        cur=mysql.connection.cursor()
        cur.execute("INSERT INTO evaluation (id_cliente, id_prof, fech_evaluation, diagnostico) VALUES (%s,%s,%s,%s)", (id_cliente,id_prof,fecha,diagnostico))
        mysql.connection.commit()
        cur.close()
        return jsonify({"informacion":"Registro exitoso"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


@app.route('/GetDiagnostico/<id>',methods=['GET'])
def GetDiagnostico(id):
    try:
        cur=mysql.connection.cursor()
        cur.execute('SELECT id_cliente,id_prof,fech_evaluation,diagnostico FROM evaluation WHERE id_cliente = %s', (id,))
        rv = cur.fetchall()
        print(rv)
        cur.close()
        content = {}
        payload = []
        for result in rv:
            content={'id_cliente':result[0],    'id_prof':result[1],'fech_evaluation':result[2],'diagnostico':result[3]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


@app.route('/TableUser', methods=['GET'])
def TableUser():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios WHERE status = 1')
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
        cur.execute('SELECT id,username,name,surname,password,rol,status FROM usuarios WHERE username = %s', (username,))
        rv = cur.fetchall()
        cur.close()
        content={}
        payload=[]
        for result in rv:
            content= {"id":result[0],"username":result[1],"name":result[2],"surname":result[3],"password":result[4],"rol":result[5],"status":result[6]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


#### ruta para verificar la existencia de un usuario ###
@app.route('/VerifyUser/<username>',methods=['GET'])
def VerifyUser(username):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT username FROM usuarios WHERE username = %s', (username,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content= {"username":result[0]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
####EDITAR UN USUARIO DESDE ADMIN####
@app.route('/editUser/<id>', methods=['PUT'])
def editUser(id):
    try:
        if request.method == 'PUT':
            username= request.json['username']
            name = request.json['name']
            surname = request.json['surname']
            email= request.json['email']  
            password = request.json['password']
            cell= request.json['cell']
            rol=request.json['rol']
            cur = mysql.connection.cursor()
            cur.execute("UPDATE usuarios SET username=%s,name=%s,surname=%s,email=%s,password=%s,cell=%s,rol=%s WHERE id=%s", (username,name,surname,email,password,cell,rol,id))
            mysql.connection.commit()
            cur.close()
            return jsonify({"informacion":"Actualizacion realizada con exito"})
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
            cur.execute("INSERT INTO usuarios (username,name,surname,email,password,cell,rol,status) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)", (username,name,surname,email,password,cell,rol,1))
            mysql.connection.commit()
            cur.close()
            return jsonify({"informacion":"Registro exitoso"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route("/regisFisicState",methods=['POST'])
def regisFisicState():
    try:
        if request.method=='POST':
            id=request.json['id']
            age=request.json['age']
            gender=request.json['gender']
            height=request.json['height']
            weight=request.json['weight']
            Fr_train=request.json['Fr_train']
            duration=request.json['duration']
            goal=request.json['goal']
            restrictions=request.json['restrictions']
            cur=mysql.connection.cursor()
            cur.execute("INSERT INTO cliente (id_usuario,age,gender,height,weight,fr_train,duration_exerss,goal,restrictions) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)",(id,age,gender,height,weight,Fr_train,duration,goal,restrictions))
            mysql.connection.commit()
            cur.close()
            return jsonify({"informacion":"Registro de estado fisico Exitoso"})
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
        cur.close()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})



@app.route('/delete/<id>', methods = ['PUT'])
def delete_contact(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('UPDATE usuarios SET status = %s WHERE id = %s', (0, id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

###Peticion de datos para la grafica 1####
@app.route('/GetGrafica1',methods=['GET'])
def GetGrafica5():
    try:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT cliente.weight,cliente.height
            FROM cliente join usuarios ON (cliente.id_usuario=usuarios.id) where usuarios.status=1''')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'weight': result[0], 'height': result[1]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


####Peticion de datos para la grafica 2####

@app.route('/GetGrafica2', methods=['GET'])
def GetGrafica2():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM generos")
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'gender': result[0], 'total': result[1]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


####Peticion de datos para la grafica 3####

@app.route('/GetGrafica3',methods=['GET'])
def GetGrafica3():
    try:
        cur=mysql.connection.cursor()
        cur.execute("Select cliente.goal AS goal,count(*) AS total FROM( cliente JOIN usuarios ON (cliente.id_usuario=usuarios.id)) WHERE usuarios.status=1 group by cliente.goal")
        rv=cur.fetchall()
        cur.close()
        content={}
        payload=[]
        for result in rv:
            content = {'goal': result[0], 'total': result[1]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
###Peticion de datos para la grafica 6###
@app.route('/getGrafica6',methods=['GET'])
def getGrafica6():
    try:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT 
                CASE 
                    WHEN height BETWEEN 1.55 AND 1.65 THEN '1.55-1.65'
                    WHEN height BETWEEN 1.65 AND 1.75 THEN '1.65-1.75'
                    WHEN height BETWEEN 1.72 AND 1.85 THEN '1.75-1.85'
                    WHEN height BETWEEN 1.85 AND 1.95 THEN '1.85-1.95'
                    ELSE 'Unknown'
                END AS rango_altura,
                COUNT(*) AS numero_de_personas
            FROM cliente
            GROUP BY rango_altura''')
        rv = cur.fetchall()
        cur.close()
        data= [row[1] for row in rv]
        return jsonify(data)
    except Exception as e:
        return jsonify({"error":str(e)})


@app.route('/GetGrafica4',methods=['GET'])
def GetGrafica4():
    try:
        cur=mysql.connection.cursor()
        cur.execute("SELECT rol,count(*) AS total FROM usuarios WHERE status=1 group by rol")
        rv=cur.fetchall()
        cur.close()
        content={}
        payload=[]
        for result in rv:
            content = {'rol': result[0], 'total': result[1]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
####Peticion de datos para la grafica 5####
@app.route('/getGrafica5',methods=['GET'])
def getGrafica1():
    try:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT 
                CASE 
                    WHEN age BETWEEN 0 AND 17 THEN '0-17'
                    WHEN age BETWEEN 18 AND 25 THEN '18-25'
                    WHEN age BETWEEN 26 AND 35 THEN '26-35'
                    WHEN age BETWEEN 36 AND 45 THEN '36-45'
                    WHEN age BETWEEN 46 AND 55 THEN '46-55'
                    WHEN age BETWEEN 56 AND 65 THEN '56-65'
                    WHEN age > 65 THEN '66+'
                    ELSE 'Unknown'
                END AS rango_edad,
                COUNT(*) AS numero_de_personas
            FROM cliente
            GROUP BY rango_edad''')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'rango_edad': result[0], 'total': result[1]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        return jsonify({"error":str(e)})



# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)

