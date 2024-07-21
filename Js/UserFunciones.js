user=JSON.parse(localStorage.getItem('Usuario'))
const GetRutina=()=>{
    
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/GetDiagnostico/'+user.id,
    }).then(function(response){
        console.log(response.data)
        if(response.data.length>0 || response.data.diagnostico!=null){
            document.getElementById("RutinaUser").innerHTML=response.data.diagnostico
        }else{
            document.getElementById("RutinaUser").innerHTML="Aun no se te ha asignado una rutina"
        }
    })
    }
