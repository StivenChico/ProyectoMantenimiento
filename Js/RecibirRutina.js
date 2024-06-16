const GetRutina=()=>{
    let GetRutina=localStorage.getItem("Rutina")
    if(GetRutina!=null){
        document.getElementById("RutinaUser").innerHTML=GetRutina
            
    }else{
        document.getElementById("RutinaUser").innerHTML="Aun no hay una Rutina para este dia"
    }
    }
GetRutina()