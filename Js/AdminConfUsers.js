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
  paging:false,
  scrollY:400
});

const Init_Data=()=>{
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/TableUser',
        
      }).then(function (response) {
        
      botones=`<buttom type="buttom" class="btn btn-warning ms-3 btn-sm" data-bs-toggle="modal" data-bs-target="#Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></Buttom>
      <a class= "btn btn-danger ms-3 btn-sm" data-bs-toggle="modal" data-bs-target="#Eliminar" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></a>`
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