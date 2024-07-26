user=JSON.parse(localStorage.getItem('Usuario'))
const GetRutina=()=>{
    
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/GetDiagnostico/'+user.id,
    }).then(function(response){
        //arreglo=response.data
        //console.log(response.data.length)
        if(response.data.length>0){
            document.getElementById("RutinaUser").innerHTML=response.data[0].diagnostico
        }else{
            document.getElementById("RutinaUser").innerHTML="Aun no se te ha asignado una rutina"
        }
    })
    }
