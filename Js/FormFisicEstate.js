const RegistroFisicState=()=>{
    ageI=document.getElementById("inputage").value
    weightI=document.getElementById("inputpeso").value
    heightI=document.getElementById("inputAltura").value
    Fr_trainI=document.getElementById("inputfr_train").value
    durationI=document.getElementById("inputDuration_sesion").value
    goalI=document.getElementById("inputObjetivo").value
    restrictionsI=document.getElementById("inputRestricción_alimenticia").value

    genderI=document.getElementById("M").checked==true?"M":"F";
    console.log(document.getElementById("M").checked)
    if(ageI=="" || weightI=="" || heightI=="" || Fr_trainI=="" || goalI=="" ){
        alert("Todos los campos son obligatorios");
        return;
    }else{
        user=JSON.parse(localStorage.getItem("Usuario"));
        //console.log(user.id)
        //console.log(user.id,ageI,genderI,weightI,heightI,Fr_trainI,durationI,goalI,restritionsI)

    
        axios({
            method:'POST',
            url:"http://127.0.0.1:3000/regisFisicState",
            data:{
                id:user.id,
                age:ageI,
                gender:genderI,
                height:heightI,
                weight:weightI,
                Fr_train:Fr_trainI,
                duration:durationI,
                goal:goalI,
                restrictions:restrictionsI
            }
        }).then(function(response){
        alert(response.data.informacion)
        }).catch(err => console.log('Error: ', err))
    }


}