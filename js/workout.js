mensj="";
// pido los datos del formulario
const Registrar = () =>{
    nombreI=document.getElementById("inputNombre").value;
    guideI=document.getElementById("inputGuia").value;
    tipoI=document.getElementById("inputTipo").value;
    equipoI=document.getElementById("inputEquipo").value;
    nivelI=document.getElementById("inputNivel").value;
    repetitionsI=document.getElementById("inputRepeticion").value;
    seriesI=document.getElementById("inputSeries").value;
    durationI=document.getElementById("inputDuracion").value;
    console.log(nombreI,guideI,tipoI,equipoI,nivelI,repetitionsI,seriesI,durationI);
    //se verifica que no allán campos vacios
    if(nombreI !="" ||
        guideI !="" ||
        tipoI !="" ||
        equipoI !="" ||
        nivelI !="" ||
        repetitionsI !="" ||
        seriesI !="" ||
        durationI !=""
    ){
        axios({
            //se realiza el envio de los datos con la ruta
            method: "POST",
            url: "http://127.0.0.1:5000/registroEjercicio",
            data: {
                nombre: nombreI,
                guia: guideI,
                tipo: tipoI,
                equipo: equipoI,
                nivel: nivelI,
                repeticiones: repetitionsI,
                series: seriesI,
                duracion: durationI
            },
        }).then(function(response){
            alert(response.data.informacion)
            // se recarga la pagina
            window.location.href='crearEjercicio.html'
        }).catch((err)=>console.log("Error:", err));
    } else{
        // si hay campos vacios muestra una alerta
        alert("Verifique que no existan campos vacios!");
    }
};