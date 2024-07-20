const InitVerify=()=>{
    let Usuario={}
    Usuario=JSON.parse(localStorage.getItem("Usuario"))
    if(Usuario==null){
        alert("Primero debe iniciar sección")
        location.href="../Index.html"
    }else{
document.getElementById("NombreUser")!=null
        if(document.getElementById("NombreUser")!=null){
        document.getElementById("NombreUser").innerHTML+= Usuario.name+" "+ Usuario.surname;
    }
    }
}
const cerrarSesion=()=>{
    localStorage.removeItem("Usuario")
    location.href="../Index.html"
}
InitVerify()