const verificar=()=>{
     if(document.getElementById("usertxt").value=="" || document.getElementById("passwordtxt").value==""){
        alert("VERIFICAR CAMPOS VACIOS")
     }else{
        IngUser=document.getElementById("usertxt").value
        IngPass=document.getElementById("passwordtxt").value  
        IngRol=document.getElementById("rol").value
        path=""
        path2=""
        if(IngRol=="Usuario"){
            path="/json/Usuarios.json"
            path2="/html/users.html"
        }else if(IngRol=="Administrador"){
            path="/json/Admins.json"
            path2="/html/admin.html"
        }
        fetch(path)
            .then(res=>res.json())
            .then(usuario=>{
                for(i of usuario){
                    if(i.username==IngUser){
                        if(i.password==IngPass){
                            alert("Ingreso Exitoso")
                            location.href=path2
                        }
                    }
                }
            })
    
    }
}
