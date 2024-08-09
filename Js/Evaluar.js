tablaa = document.getElementById("tablab");

if(tablaa!=null){
tablaa.addEventListener('click',function(e){
    e.stopPropagation();
    if(e.target.id === 'evaluar'){
        e.stopPropagation();
        const id = e.target.parentNode.parentNode.children[0].textContent;
        
        //pedimos los datos en la base de datos en la tabla 
        //cliente para saber la demas informacion
        axios({
            method:'GET',
            url: 'http://127.0.0.1:5000/FisicById/'+id,
        }).then(function(response){
            conten={
                id:id,
                name:response.data.name,
                surname:response.data.surname,
                age:response.data.age,
                gender:response.data.gender,
                height:response.data.height,
                weight:response.data.weight,
                Fr_train:response.data.Fr_Train,
                duration:response.data.duration,
                goal:response.data.goal,
                equipment:response.data.equipment,
                restrictions:response.data.restrictions
            }
            localStorage.setItem('datos', JSON.stringify(conten));
            window.location.href = 'evaluar.html';
        })
    }
})
}

const CargarInfo=()=>{
    let contenido=JSON.parse(localStorage.getItem('datos'))
    if(localStorage.getItem('datos')!=null){
    //console.log(contenido)
    document.getElementById('inputnombre').value= contenido.name
    document.getElementById('inputApellido').value= contenido.surname
    document.getElementById('inputage').value= contenido.age
    document.getElementById('inputgenero').value= contenido.gender
    document.getElementById('inputAltura').value= contenido.height
    document.getElementById('inputpeso').value= contenido.weight
    document.getElementById('inputfr_train').value= contenido.Fr_train
    document.getElementById('inputDuration_sesion').value= contenido.duration
    document.getElementById('inputObjetivo').value= contenido.goal
    document.getElementById('inputEquipamiento').value= contenido.equipment
    document.getElementById('inputRestricción_alimenticia').value= contenido.restrictions
    CargarEjercicios()
    }else{
    alert('No hay datos seleccionados')
    window.location.href = 'FisicUsers.html';
    }
}
const tablaPD = new DataTable('#tablaWorkout_Personal', {
    paging:false,
    scrollY:200,
    
});
const CargarEjercicios=()=>{
    axios.get('http://127.0.0.1:5000/ejercicioTabla')
    .then(function(response){
        botones1=`<buttom type="buttom" class="btn btn-success btn-sm" data-bs-target="#Agregar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
</svg></Buttom> <buttom class= "btn btn-primary btn-sm" data-bs-target="#Información"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></buttom>`
        data= response.data;
        ArregloDataPag1=[]
        tablaPD.clear().draw();
        for(let i = 0; i< data.length; i++){
            tablaPD.row.add([data[i].id,data[i].nombre,data[i].tipo,data[i].rating,botones1]).draw();

        }
        
        
    }).catch(err=> console.log('error:', err))
}
let tablaAR = new DataTable('#tablaRutinas', {
    paging:false,
    scrollY:200,
});
const CargarRutinas=()=>{
    //Cargar las rutinas al modal de las rutinas
    boton=`<a id="asignar" class="btn btn-success" data-bs-dismiss="modal">Asignar</a>`
    axios({
        method:'GET',
        url: 'http://127.0.0.1:5000/RutinaModal'
    }).then(function(response){
        tablaAR.clear().draw();
        for(let i=0;i<response.data.length;i++){
            tablaAR.row.add([response.data[i].id_routine,response.data[i].nombre,response.data[i].ejercicios,boton]).draw()
        }

    }).catch(err => console.log('Error: ', err))
    
}
tablaARevent=document.getElementById('tablaRutinas')
if(tablaARevent!=null){
tablaARevent.addEventListener('click',function(e){
    e.stopPropagation();
    if(e.target.id === 'asignar'){
        e.stopPropagation();
        const id = e.target.parentNode.parentNode.children[0].textContent;
        const nombre = e.target.parentNode.parentNode.children[1].textContent;
        document.getElementById('RutinaA').value=nombre;
        sessionStorage.setItem('Rutina', JSON.stringify({id_routine:id, nombre:nombre}));

    }
})
}
predecirBool=false
const predecir=() => {
    axios({
        method:'POST',
        url: 'http://127.0.0.1:5000/predictWorkout',
        data: {
            equipment: document.getElementById('inputEquipamiento').value,
            bodypart: document.getElementById('inputBodypartPredic').value,
            type:document.getElementById('inputTypePredic').value,
            level:document.getElementById('inputLevelPredic').value
        }
    }).then(function(response){
        document.getElementById('predic').value=response.data.Rating.toFixed(3)
        predecirBool=true
    }).catch(err => console.log('Error: ', err))
}
const EnvioDiagnostico=()=>{
    diagnostico=document.getElementById('diagnostico').value
    if(diagnostico!=""){
        axios({
            method:'GET',
            url: 'http://127.0.0.1:5000/verify_token/'+localStorage.getItem('token')
        }).then(function(response){
            pro=response.data.id
            Cliente=JSON.parse(localStorage.getItem('datos'))
            rutina=JSON.parse(sessionStorage.getItem('Rutina'))
            date = new Date();
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            fecha=year + '-' + (month < 10? '0' + month : month) + '-' + (day < 10? '0' + day : day);
            axios({
                method:'POST',
                url: 'http://127.0.0.1:5000/addDiagnostico',
                data:{
                    id_cliente:Cliente.id,
                    id_prof:pro,
                    fecha:fecha,
                    diagnostico:diagnostico,
                    rutina:rutina.id_routine
                }
                }).then(function(response){
                    alert(response.data.informacion)
                    localStorage.removeItem('datos')
                    window.location.href = 'FisicUsers.html';
                }).catch(err => console.log('Error: ', err))
            }).catch(err => console.log('Error: ', err))
    }else{
        alert("Diagnostico en blanco, porfavor verifique.")}
}

const tablaP= document.getElementById('tablaWorkout_Personal');
// verificamos que no este vacia
if(tablaP!=null){
    // creamos el evento de click
    tablaP.addEventListener('click',function(e){
        e.stopPropagation();
        // se verifica que el elemento clicado tenga la clase correcta para evitar errores
        if(e.target.className=='btn btn-primary btn-sm'){
            e.stopPropagation();
            InformacionEjercicio(e)
        }
        if(e.target.className=='btn btn-success btn-sm'){
            e.stopPropagation();
            AsignarEjercicio(e)
        }
    })
}
let ejerciciosSeleccionados=[];
let totalDuracion= 0;
const AsignarEjercicio=(e)=>{
    const id = e.target.parentNode.parentNode.children[0].textContent;
    const nombre = e.target.parentNode.parentNode.children[1].textContent;
    // verificamos si el ejercicio ya esta en la lista de la rutina
    console.log(ejerciciosSeleccionados.includes(id))
    if(!ejerciciosSeleccionados.includes(id)){
        ejerciciosSeleccionados.push(id);
        // se actualiza la lista de ejercicios
        let listaRutina= document.getElementById('listaRutina');
        let lista= document.createElement('li');
        lista.innerText= nombre;
        listaRutina.appendChild(lista);
        // se agrega el id al sessionStorage
        sessionStorage.setItem('Ejercicios',ejerciciosSeleccionados.join(','))

        // se hace la consulta para obtener la duración del ejercicio
        axios.get('http://127.0.0.1:5000/WorkoutById/'+id) 
        .then(function(response){
        duracionEjercicio = response.data.duration;
        console.log(duracionEjercicio);
        // se suma la duracion del nuevo ejercicio
        totalDuracion += duracionEjercicio;
        // se actualiza el input del total de la duracion de la rutina
        document.getElementById('txtduration').value = totalDuracion;               
    })
    }else{
        alert('El ejercicio ya se encuentra en la lista de la rutina')
    }
}
const InformacionEjercicio=(e)=>{
    const id = e.target.parentNode.parentNode.children[0].textContent;
    axios.get('http://127.0.0.1:5000/WorkoutById/'+id) 
    .then(function(response){
        conten={
            name:response.data.nombre,
            desc:response.data.desc,
            type:response.data.type,
            equipment:response.data.equipment,
            level:response.data.level
        }
        sessionStorage.setItem('ejercicio', JSON.stringify(conten));
        // cargamos la información
        CargarInformacion(conten);
    })
}
const CargarInformacion= (contenido) =>{
    //let contenido= JSON.parse(sessionStorage.getItem('ejercicio'))
    //if(contenido!=null){
        console.log(contenido)
        document.getElementById('predicName').value= contenido.name
        document.getElementById('predicType').value= contenido.type
        document.getElementById('predicDescription').value= contenido.desc
        document.getElementById('predicEquipment').value= contenido.equipment
        document.getElementById('predicLevel').value= contenido.level
    //}
}

const Cancelar = () =>{
    // limpiamos los inputs
    totalDuracion=0;
    ejerciciosSeleccionados=[];
    document.getElementById('txtnombre').value='';
    document.getElementById('txtdescripcion').value='';
    document.getElementById('txtduration').value='';
    document.getElementById('txtnivel').value='';
    sessionStorage.removeItem('Ejercicios');
    // se vacia la lista de ejercicios seleccionados
    document.getElementById('listaRutina').innerHTML='';
    // se vacia el input del total de la duracion de la rutina
    document.getElementById('txtduration').value = 0;
}
const Registrar_rutina = () =>{
    axios({
        method:'GET',
        url: 'http://127.0.0.1:5000/verify_token/'+localStorage.getItem('token')
        }).then(function(response){
        creadorI= response.data.id;
        nombreRutinaI= document.getElementById('txtnombre').value;
        descripRutinaI=document.getElementById('txtdescripcion').value;
        duracionRutinaI=document.getElementById('txtduration').value;
        nivelRutinaI=document.getElementById('txtnivel').value;
        ejerciciosI = sessionStorage.getItem('Ejercicios')
        axios({
            method:'POST',
            url: 'http://127.0.0.1:5000/regisRutina',
            data:{
                creador:creadorI,
                nombre:nombreRutinaI,
                descripcion:descripRutinaI,
                duracion:duracionRutinaI,
                nivel:nivelRutinaI,
                ejercicios:ejerciciosI
            }
        }).then(function(response){
            alert('Rutina registrada correctamente');
            if(response.data.informacion=='Registro de runtina Exitoso'){
                console.log('Rutina registrada correctamente');
                Cancelar();
            }
        }).catch(err=> console.log('error:', err))
    }).catch(err=> console.log('error:', err))
    
}
const FiltroPredic=()=>{
    if(predecirBool==true){
        axios.get('http://127.0.0.1:5000/ejercicioFiltro/'+document.getElementById('predic').value)
        .then(function(response){
            //console.log(response.data);
            if(response.data.length>0){
                botones1=`<buttom type="buttom" class="btn btn-success btn-sm" data-bs-target="#Agregar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
        </svg></Buttom> <buttom class= "btn btn-primary btn-sm" data-bs-target="#Información"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg></buttom>`
                data= response.data;
                ArregloDataPag1=[]
                tablaPD.clear().draw();
                for(let i = 0; i< data.length; i++){
                    tablaPD.row.add([data[i].id,data[i].nombre,data[i].tipo,data[i].rating,botones1]).draw();

                }
                
            }else{
                alert('No se encontraron ejercicios con puntaje similar a '+document.getElementById('predic').value)
            }
        }).catch(err=> console.log('error:', err))
    }else{
        alert('Aun no haz realizado una predicción')
    }
}

const volver=()=>{
    localStorage.removeItem('datos')
    window.location.href = 'FisicUsers.html';
}