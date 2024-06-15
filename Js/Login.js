const verificar = () => {
  if (
    document.getElementById("usertxt").value == "" ||
    document.getElementById("passwordtxt").value == ""      // Verifica que no hayan campos vacios
  ) {
    alert("VERIFICAR CAMPOS VACIOS");
  } else {
    IngUser = document.getElementById("usertxt").value;     // recibe los datos en caso no esten vacios
    IngPass = document.getElementById("passwordtxt").value;
    IngRol = document.getElementById("rol").value;
    path=(IngRol=="Usuario")? "../html/fit_initUser.html":"../html/admin.html";
    
    fetch("/json/Usuarios.json")
      .then((res) => res.json())                // establece el formato en el que se recibirá el resultado
      .then((usuario) => {
        for (i of usuario) {                    // iteramos en cada objeto del json 
          if (i.username == IngUser) {
            if (i.password == IngPass) {        
              if(i.Rol==IngRol){         
                
                  localStorage.setItem("Usuario", i)
                  location.href = path;
                
              }
            }
          }
        }
      });
  }
};
