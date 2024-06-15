const InitVerify=()=>{
    Usuario=localStorage.getItem("Usuario")
    if(Usuario==null){
        alert("Primero debe iniciar sección")
        location.href="../Index.html"
    }else{
        document.getElementById("NombreUser").innerHTML= Usuario.name+" "+ Usuario.surname;
    }
}

InitVerify()