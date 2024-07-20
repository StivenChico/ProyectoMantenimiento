const tabla=document.querySelector("#tablab tbody");

const Init_Data=()=>{
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/TableFisic',
        
      }).then(function (response) {
       
        //console.log(response)
            for (let i = 0; i < response.data.length; i++) {
                              
                let nuevaFila = tabla.insertRow(tabla.lenght);
    
                id = nuevaFila.insertCell(0);
                id.innerHTML = response.data[i].id;
    
                namei = nuevaFila.insertCell(1);
                namei.innerHTML = response.data[i].name;
    
                surname = nuevaFila.insertCell(2);
                surname.innerHTML = response.data[i].surname; 
    
                age = nuevaFila.insertCell(3);
                age.innerHTML = response.data[i].age;

                gender = nuevaFila.insertCell(4);
                gender.innerHTML = response.data[i].gender;
    
                height= nuevaFila.insertCell(5);
                height.innerHTML = response.data[i].height;

                weight = nuevaFila.insertCell(5);
                weight.innerHTML = response.data[i].weight;  
    
                Fr_Train= nuevaFila.insertCell(6);
                Fr_Train.innerHTML = response.data[i].Fr_Train; 
    
                cell4  = nuevaFila.insertCell(7);
                cell4.innerHTML =   `<a class="btn btn-success mx-5 " onClick="onEdit(this)">Evaluar</a>
                <a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
                    <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;
                    
            } 
              
      }).catch(err => console.log('Error: ', err))

    }

Init_Data();