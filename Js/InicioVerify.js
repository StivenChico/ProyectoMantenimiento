const InitVerify=()=>{
    
    token=localStorage.getItem("token")
    if(token==null){
        alert("Primero debe iniciar sección")
        location.href="../Index.html"
    }else{
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/verify_token/'+token
    }).then(function (response) {

        //console.log(response)
        Usuario=response.data
        //console.log(Usuario)
        if(document.getElementById("NombreUser")!=null){
            document.getElementById("NombreUser").innerHTML+= Usuario.name+" "+ Usuario.surname;
        }
    
    }).catch(err =>{
        console.log('Error: ', err);
        if(err.response.status==401){
            location.href="../Index.html"
            alert("Sesión Expirada,porfavor ingresar nuevamente")
            localStorage.removeItem("token")
        }
        });
    }
}
const cerrarSesion=()=>{
    localStorage.removeItem("token")
    location.href="../Index.html"
}
InitVerify()