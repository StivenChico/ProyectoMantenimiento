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
        url: "http://127.0.0.1:5000/Login/" + IngUser,
      }).then(function (response) {
        if(response.data.length>0){
          if(response.data[0].status==1 && response.data[0].username == IngUser && response.data[0].password == IngPass &&response.data[0].rol == IngRol) {
                  localStorage.setItem("token",response.data[0].token);
                  window.location.href = path;
                  /*us={
                    id:response.data[0].id,
                    username: response.data[0].username,
                    name: response.data[0].name,
                    surname: response.data[0].surname,
                    rol:response.data[0].rol
                  }*/
                  

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
