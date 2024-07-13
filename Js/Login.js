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
    let path =
      IngRol == "Usuario" ? "../html/fit_intUser.html" : "../html/admin.html";
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
        url: "bv7h1w4xo7apdbtrysyl-mysql.services.clever-cloud.com/Login/" + IngUser,
      })
        .then(function (response) {
          if (response.data[0].username == IngUser) {
            if (response.data[0].password == IngPass) {
              if (response.data[0].rol == IngRol) {
                location.href = path;
                us={
                  name: response.data[0].name,
                  surname: response.data[0].surname,
                }
                localStorage.setItem("Usuario",JSON.stringify(us));
              }
            }
          }
        })
        .catch((err) => console.log("Error: ", err));
    } else {
      alert(mens);
    }
  }
};
