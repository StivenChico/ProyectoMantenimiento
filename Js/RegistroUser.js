const Registrar=()=>{
    usernameI=document.getElementById("inputUserName").value
    nameI=document.getElementById("inputName").value
    surnameI=document.getElementById("inputLastName").value
    emailI=document.getElementById("inputEmail").value
    passwordI=document.getElementById("inputPassword").value
    passwordVerify=document.getElementById("inputPassword2")
    CellI=document.getElementById("inputCell").value
    console.log(usernameI,nameI,surnameI,emailI,passwordI,cellI)
    //Verificaciones de los datos ingresados
    var listbool=[false,false,false];
    mensj=""



    existe=false
    //Verificar si existe el usuario ingresado
    axios({
        method:'GET',
        url:'http://127.0.0.1:3000/VerifyUser/'+usernameI
    }).then(function(response){
        if(usernameI==response.data[0].username){
            existe=true
        }
    }
)
    //Si no existe procede con el registro
    if(!existe){
        axios({
            method:'POST',
            url:'https://127.0.0.1:3000/registro',
            data:{
                username:usernameI,
                name:nameI,
                surname:surnameI,
                email:emailI,
                password:passwordI,
                cell:cellI,
                rol:'Usuario'
            }
        }).then(function(response){
            alert(response.data[0].informacion);
            window.location.href="./html/Login";
        })
    }
}