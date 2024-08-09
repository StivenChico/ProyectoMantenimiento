const RegistroFisicState=()=>{
    ageI=document.getElementById("inputage").value
    weightI=document.getElementById("inputpeso").value
    heightI=document.getElementById("inputAltura").value
    Fr_trainI=document.getElementById("inputfr_train").value
    durationI=document.getElementById("inputDuration_sesion").value
    goalI=document.getElementById("inputObjetivo").value
    equipment=document.getElementById("inputEquipamiento").value
    restrictionsI=document.getElementById("inputRestricción_alimenticia").value

    genderI=document.getElementById("M").checked==true?"M":"F";
    console.log(document.getElementById("M").checked)
    if(ageI=="" || weightI=="" || heightI=="" || Fr_trainI=="" || goalI=="" ){
        alert("Todos los campos son obligatorios");
        return;
    }else{
        token=localStorage.getItem("token");
        axios({
            method:'GET',
            url:'http://127.0.0.1:5000/verify_token/'+token
        }).then(function(response){
            user=response.data
    
            axios({
                method:'POST',
                url:"http://127.0.0.1:5000/regisFisicState",
                data:{
                    id:user.id,
                    age:ageI,
                    gender:genderI,
                    height:heightI,
                    weight:weightI,
                    Fr_train:Fr_trainI,
                    duration:durationI,
                    goal:goalI,
                    equipment:equipment,
                    restrictions:restrictionsI
                }
            }).then(function(response){
            alert(response.data.informacion)
            window.location.href="/fit_intUser"
            }).catch(err => console.log('Error: ', err))
    }).catch((err) => console.log("Error: ", err));

    }
}