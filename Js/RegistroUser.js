mensj="";
n=10;
const Registrar=()=>{
    usernameI=document.getElementById("inputUserName").value
    nameI=document.getElementById("inputName").value
    surnameI=document.getElementById("inputLastName").value
    emailI=document.getElementById("inputEmail").value
    passwordI=document.getElementById("inputPassword").value
    passwordConfirm=document.getElementById("inputPassword2").value
    CellI=document.getElementById("inputCell").value
    console.log(usernameI,nameI,surnameI,emailI,passwordI,CellI)
    //evitar campos vacios
        if(usernameI!="" || nameI!="" || surnameI!="" || emailI!="" || passwordI!="" || CellI!=""){
        //Verificaciones de los datos ingresados
        var listbool=[false,false,false,false];
        mensj=""
        //Nombre y apellido solo con letras
        listbool[0]=NombreLetras(nameI)
        listbool[1]=ApellidoLetras(surnameI)
        //email que contenga @ y .
        listbool[2]=EmailVerify(emailI)
        listbool[3]=PasswordVerify(passwordI,passwordConfirm)
        //todas las verificaciones deben ser TRUE para registrar
        permite=true;
        for(var i=0;i<4;i++){
            permite=permite && listbool[i];
        }
        console.log("permite = "+permite)
        
        //Verificar si existe el usuario ingresado
        axios({
            method:'GET',
            url:'http://127.0.0.1:3000/VerifyUser/'+usernameI
        }).then(function(response){
            n=response.data.length
            console.log(n)
            
        }
    ).catch(err => console.log('Error: ', err))
    existe=n!=0?true:false;
        //Si no existe procede con el registro
    setTimeout(()=>{
        if(existe==false ){
            if(permite==true){
                axios({
                    method:'POST',
                    url:'http://127.0.0.1:3000/registro',
                    data:{
                        username:usernameI,
                        name:nameI,
                        surname:surnameI,
                        email:emailI,
                        password:passwordI,
                        cell:CellI,
                        rol:'Usuario'
                    }
                }).then(function(response){
                    alert("Registro exitoso");
                    location.href="./Login.html";
                })
            }else{
            //si alguna es false "permite será false, y se enviara el mensaje"
                alert(mensj)
            }
        }else{
            alert("El usuario Ingresado ya existe,Por favor intenta con otro")
        }},5000)
    }else{
        alert("Verifique que no existan campos vacios!")
    }
}

const NombreLetras=(name)=>{
    let salida=true
    for(var i=0;i<nameI.length;i++){
        if(nameI.charCodeAt(i)> 65 && nameI.charCodeAt(i)<91 || nameI.charCodeAt(i)>96 && nameI.charCodeAt(i)<123){
            salida=true;
        }else{
            salida=false;
            mensj+="El nombre no debe contener numeros o caracteres Especiales\n";
            break;
        }
       }
       return salida;
}

const ApellidoLetras=(surname)=>{
    let salida=true
    for(var i=0;i<surnameI.length;i++){
        if(surnameI.charCodeAt(i)> 65 && surnameI.charCodeAt(i)<91 || surnameI.charCodeAt(i)>96 && surnameI.charCodeAt(i)<123){
            salida=true;          
        }else{
            salida=false;
            mensj+="El Apellido no debe contener numeros o caracteres Especiales\n";
            break;
        }
    }
    return salida;
}
const EmailVerify=(emailI)=>{
    let salida=true
    if(emailI.includes("@") && emailI.includes(".")){
        salida=true;
    }else{
        salida=false;
        mensj+="Email erroneo, debe contener minimo @ y . \n";
    }
    return salida;
}
const PasswordVerify=(passwordI,passwordVerify)=>{
    tamaño=true
    verifypass=true
    if(passwordI.length>=8 && passwordI.length<=12){
        tamaño=true
    }else{
        tamaño=false
        mensj+="El tamaño de la contraseña debe ser de 8 a 12 caracteres \n "
    }
    if(passwordI==passwordVerify){
        verifypass=true;
    }else{
        verifypass=false;
        mensj+="Las Contraseñas ingresadas no son iguales\n"
    }
    return tamaño && verifypass;
}