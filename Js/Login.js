const verificar=()=>{   
    fetch("C:/Users/DELL/Documents/ProyectoMantenimiento/json/usuarios.json")
        .then(res=>res.json())
        .then(usuario=>console.log(usuario))
}
