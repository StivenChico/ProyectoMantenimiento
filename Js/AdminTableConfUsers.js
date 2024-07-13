const tabla=document.querySelector("#tablaa tbody");

const Init_Data=()=>{
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/TableUser',
        
      }).then(function (response) {
       
        //console.log(response)
            for (let i = 0; i < response.data.length; i++) {
                              
                let nuevaFila = tabla.insertRow(tabla.lenght);
    
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
    
                cell4  = nuevaFila.insertCell(7);
                cell4.innerHTML =   `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
                    <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;
                    
            } 
              
      }).catch(err => console.log('Error: ', err))

    }

Init_Data();
 