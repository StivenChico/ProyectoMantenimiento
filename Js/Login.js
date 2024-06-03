const Verificar=()=>{
    fetch("/json/Usuarios.json")
    .then(usuarios=usuarios.json)
    .then(usuarios=>{
        usuarios.forEach(usuario => {
            if(usuario.username==document.getElementById(txtUsuario).value){
                if(usuario.password==document.getElementById(txtPass).value){
                    console.log("ingresaste")
                    location.href("/html/UserHome.html")
                }
            }
        });
    })
}