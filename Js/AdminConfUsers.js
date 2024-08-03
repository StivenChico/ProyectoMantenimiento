//const tabla=document.querySelector("#tablaa tbody");
const tablaBoton=document.getElementById("tablaa");

//console.log(tablaBoton)
tablaBoton.addEventListener('click', function(e){
  e.stopPropagation()
 if(e.target.className ==  'btn btn-warning ms-3'){
  localStorage.setItem("idUpdate", e.target.parentNode.parentNode.children[0].textContent);
  console.log(localStorage.getItem("idUpdate"))
  document.getElementById("inputName").value = e.target.parentNode.parentNode.children[2].textContent;
  document.getElementById("inputLastName").value = e.target.parentNode.parentNode.children[3].textContent;
  document.getElementById("inputUsername").value = e.target.parentNode.parentNode.children[1].textContent;
  document.getElementById("inputEmail").value = e.target.parentNode.parentNode.children[4].textContent;
  document.getElementById("inputPassword").value = e.target.parentNode.parentNode.children[5].textContent;
  document.getElementById("inputCell").value = e.target.parentNode.parentNode.children[6].textContent;  

  rol=e.target.parentNode.parentNode.children[7].textContent;
  if(rol=="Administrador"){
    document.getElementById("SelecRol").value = 1;
  } else if(rol=="Usuario"){
    document.getElementById("SelecRol").value = 2;
  } else if(rol=="Profesional"){
    document.getElementById("SelecRol").value = 3;
  }   

}else if(e.target.className === 'btn btn-danger ms-3'){
  localStorage.setItem("IdDelete",e.target.parentNode.parentNode.children[0].textContent)
}
})
const onEdit=(e)=>{
  console.log(e.target.parentNode.parentNode.parentNode.children[0].textContent)
}
let tabla = new DataTable('#tablaa', {
   responsive:true
});
tabla.on('responsive-resize', function (e, datatable, columns) {
  var count = columns.reduce(function (a, b) {
      return b === false ? a + 1 : a;
  }, 0);});
const Init_Data=()=>{
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/TableUser',
        
      }).then(function (response) {
        
      botones=`<buttom type="buttom" class="btn btn-warning ms-3" data-bs-toggle="modal" data-bs-target="#Editar">Edit</Buttom>
      <a class= "btn btn-danger ms-3" data-bs-toggle="modal" data-bs-target="#Eliminar" >Delete</a>`
        //console.log(response)
            for (let i = 0; i < response.data.length; i++) {
                menRol=""
                if(response.data[i].rol === 1){
                  menRol="Administrador"
                } else if(response.data[i].rol === 2){
                  menRol="Usuario"
                } else if(response.data[i].rol === 3){
                  menRol="Profesional"
                }
                tabla.row.add([response.data[i].id,response.data[i].username, response.data[i].name, response.data[i].surname, response.data[i].email, response.data[i].password, response.data[i].cell,menRol,botones]).draw();
                /*let nuevaFila = tabla.insertRow(tabla.lenght);
                
                id = nuevaFila.insertCell(0);
                id.innerHTML = response.data[i].id;
    
                username = nuevaFila.insertCell(1);
                username.innerHTML = response.data[i].username;
    
                nameT = nuevaFila.insertCell(2);
                nameT.innerHTML = response.data[i].name; 
    
                surname = nuevaFila.insertCell(3);
                surname.innerHTML = response.data[i].surname;
    
                email = nuevaFila.insertCell(4);
                email.innerHTML = response.data[i].email;

                password = nuevaFila.insertCell(5);
                password.innerHTML = response.data[i].password;  
    
                cell= nuevaFila.insertCell(6);
                cell.innerHTML = response.data[i].cell; 

                rol= nuevaFila.insertCell(7);
                rol.innerHTML = menRol;

                cell4  = nuevaFila.insertCell(8);
                cell4.innerHTML =   `<buttom type="buttom" class="btn btn-warning ms-3" data-bs-toggle="modal" data-bs-target="#Editar">Edit</Buttom>
                    <a class= "btn btn-danger ms-3" data-bs-toggle="modal" data-bs-target="#Eliminar" >Delete</a>`;*/
                    
            } 
              
      }).catch(err => console.log('Error: ', err))

    }

const Eliminar=()=>{
  idDel=localStorage.getItem("IdDelete")
  axios({
    method:'PUT',
    url:'http://127.0.0.1:5000/delete/'+idDel,
  }).then(function(response){
    console.log(response.data.informacion)
    Init_Data()
    localStorage.removeItem("IdDelete");
  }).catch(err => console.log('Error: ', err))
}

const Actualizar=()=>{
  idUpt=localStorage.getItem("idUpdate")
  nameI=document.getElementById('inputName').value;
  surnameI=document.getElementById('inputLastName').value;
  usernameI=document.getElementById('inputUsername').value;
  emailI=document.getElementById('inputEmail').value;
  passwordI=document.getElementById('inputPassword').value;
  cellI=document.getElementById('inputCell').value;
  rolI=document.getElementById('SelecRol').value;
  axios({
    method:'PUT',
    url:'http://127.0.0.1:5000/editUser/'+idUpt,
    data:{
      id:idUpt,
      username:usernameI,
      name:nameI,
      surname:surnameI,
      email:emailI,
      password:passwordI,
      cell:cellI,
      rol:rolI,
    }
  }).then(function(response){
    alert(response.data.informacion)

    document.getElementById("inputName").value = "";
    document.getElementById("inputLastName").value = "";
    document.getElementById("inputUsername").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPassword").value = "";
    document.getElementById("inputCell").value = "";
    document.getElementById("SelecRol").value = 1;
    localStorage.removeItem("idUpdate");
    Init_Data()
  }).catch(err => console.log('Error: ', err))
}