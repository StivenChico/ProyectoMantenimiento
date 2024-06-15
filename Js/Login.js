const verificar = () => {
  if (
    document.getElementById("usertxt").value == "" ||
    document.getElementById("passwordtxt").value == ""      // Verifica que no hayan campos vacios
  ) {
    alert("VERIFICAR CAMPOS VACIOS");
  } else {
    let IngUser = document.getElementById("usertxt").value;     // recibe los datos en caso no esten vacios
    let IngPass = document.getElementById("passwordtxt").value;
    let IngRol = document.getElementById("rol").value;
    let path=(IngRol=="Usuario")? "../html/fit_intUser.html":"../html/admin.html";
    let bool=false
    fetch("https://raw.githubusercontent.com/StivenChico/ProyectoMantenimiento/main/json/Usuarios.json?token=GHSAT0AAAAAACTUV6Q24WBIOELDFXWGDJLGZTN62FA")
      .then((res) => res.json())                // establece el formato en el que se recibirá el resultado
      .then((usuario) => {
        for (i of usuario) {                    // iteramos en cada objeto del json 
          if (i.username == IngUser) {
            if (i.password == IngPass) {        
              if(i.Rol==IngRol){         
                  bool=true
                  console.log(i)
                  localStorage.setItem("Usuario",JSON.stringify(i))
                  location.href = path;
                
              }
            }
          }
        }
      });
      if(!bool){
        document.getElementById("mensaje").innerHTML= "Usuario y/o contraseña ingresada erroneas "
      }
  }
};
