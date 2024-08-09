//CARGA DE TABLAS PARA INTERFAZ DE PROFESIONAL
const Init_Data =() =>{
    CargarEjercicios()
    CargarRutinasBIG()

}
const CargarEjercicios=()=>{
    //TABLA DE EJERCICIOS PARA AGGREGAR A UNA RUTINA
    axios.get('http://127.0.0.1:5000/ejercicioTabla')
    .then(function(response){
        botones1=`<buttom type="buttom" class="btn btn-success btn-sm" data-bs-target="#Agregar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
</svg></Buttom> <buttom class= "btn btn-primary btn-sm" data-bs-target="#Información"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></buttom>`
        data= response.data;
        ArregloDataPag2=[]
        for(let i = 0; i< data.length; i++){
            ArregloDataPag2.push([data[i].id,data[i].nombre,data[i].tipo,data[i].nivel,botones1]);
        }
        let tabla = new DataTable('#tablaWorkout_routine', {
            paging:false,
            scrollY:200,
            data:ArregloDataPag2
        });
        
    }).catch(err=> console.log('error:', err))
}
const CargarRutinasBIG=()=>{
    axios.get('http://127.0.0.1:5000/getRoutines')
    .then(function(response){
        botones2=`<button class="btn btn-danger btn-sm">Delete</button>`
        data= response.data;
        ArregloRutinas=[]
        for(let i = 0; i< data.length; i++){
            ArregloRutinas.push([data[i].Autor,data[i].id_routine,data[i].nombre,data[i].descripcion,data[i].duracion,data[i].nivel,botones2])
        }
        let tablaR = new DataTable('#tablaR', {
            paging:false,
            scrollY:500,
            data:ArregloRutinas
        });
    }).catch(err=> console.log('error:', err))
}
Init_Data();
// tomamos el tabla de los ejercicios
tablab= document.getElementById('tablaWorkout_routine');
// verificamos que no este vacia
if(tablab!=null){
    // creamos el evento de click
    tablab.addEventListener('click',function(e){
        e.stopPropagation();
        // se verifica que el elemento clicado tenga la clase correcta para evitar errores
        if(e.target.className=='btn btn-primary btn-sm'){
            e.stopPropagation();
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
   // }
}
// función para agregar ejercicios a la rutina
let ejerciciosSeleccionados=[];
let totalDuracion= 0;
if(tablab!=null){
    // creamos el evento del click del segundo boton
    tablab.addEventListener('click',function(e){
        e.stopPropagation();
        // verificamos que el elemeto clicado sea el segundo boton
        if(e.target.className == 'btn btn-success btn-sm'){
            e.stopPropagation();
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
            }   ).catch(err=> console.log('error:', err))
            }else{
                alert('El ejercicio ya se encuentra en la lista de la rutina')
            }
        }
    })
}

mensj="";
// se piden los datos del formulario
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
