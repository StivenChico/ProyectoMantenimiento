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
    path = "";
    path2 = "";
    if (IngRol == "Usuario") {
      path = "/json/Usuarios.json";
      path2 = "/html/fit.html";               // asigna a que paginas accederá 
    } else if (IngRol == "Administrador") {     // segun el rol establecido
      path = "/json/Admins.json";
      path2 = "/html/admin.html";
    }
    fetch(path)
      .then((res) => res.json())                // establece el formato en el que se recibirá el resultado
      .then((usuario) => {
        for (i of usuario) {                    // iteramos en cada objeto del json 
          if (i.username == IngUser) {
            if (i.password == IngPass) {        // en caso de tener User y Pass correctos ingresan 
              alert("Ingreso Exitoso");         // al path que les correspondess
              location.href = path2;
            }
          }
        }
      });
  }
};
