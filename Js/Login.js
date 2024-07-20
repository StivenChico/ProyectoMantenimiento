const verificar = () => {
  if (
    document.getElementById("usertxt").value == "" ||
    document.getElementById("passwordtxt").value == "" // Verifica que no hayan campos vacios
  ) {
    alert("VERIFICAR CAMPOS VACIOS");
  } else {
    let IngUser = document.getElementById("usertxt").value; // recibe los datos en caso no esten vacios
    let IngPass = document.getElementById("passwordtxt").value;
    let IngRol = document.getElementById("rol").value;
    console.log(IngRol);
    let path =""
    if(IngRol=="1"){
      path="../html/admin.html"
    }else if(IngRol == "2"){
        path="../html/fit_intUser.html" 
    }else if(IngRol=="3"){
      path="../html/profesional.html"
    }
    Listbool = [true, true, true];
    let mens = "";
    if (IngPass.length >= 8) {
      Listbool[0] = true;
    } else {
      Listbool[0] = false;
      mens += "La contraseña debe tener minimo 8 caracteres";
    }

    def = true;
    for (i = 0; i < Listbool.length; i++) {
      def = Listbool[i] && def;
    }
    if (def) {
      axios({
        mehod: "GET",
        url: "http://127.0.0.1:3000/Login/" + IngUser,
      }).then(function (response) {
        if(response.data.length!=0 ){
          if(response.data.status==1 && response.data.username == IngUser && response.data.password == IngPass &&response.data.rol == IngRol) {
                  window.location.href = path;
                  us={
                    id:response.data.id,
                    name: response.data.name,
                    surname: response.data.surname,
                    rol:response.data.rol
                  }
                  localStorage.setItem("Usuario",JSON.stringify(us));

            }else{
              alert("Usuario y/o Contraseña erronea")
            }
          }else{
            alert("Usuario y/o Contraseña erronea")
          }
      }
      ).catch((err) => console.log("Error: ", err));
    } else {
      alert(mens);
    }
  }
};
