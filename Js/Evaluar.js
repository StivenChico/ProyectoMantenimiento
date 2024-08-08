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
    console.log(contenido)
    document.getElementById('inputnombre').value= contenido.name
    document.getElementById('inputApellido').value= contenido.surname
    document.getElementById('inputage').value= contenido.age
    document.getElementById('inputgenero').value= contenido.gender
    document.getElementById('inputAltura').value= contenido.height
    document.getElementById('inputpeso').value= contenido.weight
    document.getElementById('inputfr_train').value= contenido.Fr_train
    document.getElementById('inputDuration_sesion').value= contenido.duration
    document.getElementById('inputObjetivo').value= contenido.goal
    document.getElementById('inputRestricción_alimenticia').value= contenido.restrictions
    
    
    
    boton=`<a id="asignar" class="btn btn-success" data-bs-dismiss="modal">Asignar</a>`
    axios({
        method:'GET',
        url: 'http://127.0.0.1:5000/RutinaModal'
    }).then(function(response){
        Arreglo=[]
        for(let i=0;i<response.data.length;i++){
            Arreglo.push([response.data[i].id_routine,response.data[i].nombre,response.data[i].ejercicios,boton])
        }
        let tablaAR = new DataTable('#tablaRutinas', {
            paging:false,
            scrollY:200,
            data:Arreglo
        });
    }).catch(err => console.log('Error: ', err))
    }else{
        alert('No hay datos seleccionados')
        window.location.href = 'FisicUsers.html';
    }
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
const volver=()=>{
    localStorage.removeItem('datos')
    window.location.href = 'FisicUsers.html';
}