token=localStorage.getItem('token')

const GetRutina=()=>{
    axios({
        method:'GET',
        url:'http://127.0.0.1:5000/verify_token/'+token
    }).then(function(response){
        user=response.data
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/GetDiagnostico/'+user.id,
        }).then(function(response){
            if(response.data.informacion==null){
                document.getElementById("RutinaUser").innerHTML=response.data.diagnostico
                document.getElementById("nombrerutina").innerHTML=response.data.nombreR
                document.getElementById("nivelR").innerHTML+=" "+response.data.nivelR
                document.getElementById("descripR").value=response.data.descripcion
                IdRutina=response.data.idR
                axios({
                    method:'GET',
                    url:"http://127.0.0.1:5000/EjerciciosUser/"+IdRutina  
                }).then(function(response){
                    dataA=[]
                    ejercicios=response.data
                    for(let i=0;i<response.data.length;i++){
                        dataA.push([ejercicios[i].id,ejercicios[i].nombre,ejercicios[i].duracion,ejercicios[i].repeticiones,ejercicios[i].series])
                    }
                    let tablaRtUser = new DataTable('#tablaRtUser', {
                        columnDefs: [
                            {
                                target: 0,
                                visible: false,
                            }],
                        paging:false,
                        searching: false,
                        scrollY:300,
                        data:dataA
                    });
                }).catch((err) => console.log("Error: ", err));

            }else{
                document.getElementById("RutinaUser").innerHTML="Aun no se te ha asignado una rutina"
                alert("Debes realizar el formulario de estado fisico para recibir un  diagnostico")
                window.location.href='../html/FisicEstate.html'
            }
        }).catch((err) => console.log("Error: ", err));
    }).catch((err) => console.log("Error: ", err));
    
    }
