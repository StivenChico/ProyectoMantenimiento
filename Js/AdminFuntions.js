const tablae=document.querySelector("#tablaa tbody");
console.log(tablae)
const Init_Data=()=>{


    fetch("https://raw.githubusercontent.com/StivenChico/ProyectoMantenimiento/main/json/Usuarios.json")
    .then(res=>res.json())
    .then(usuarios=>{
        for(i of usuarios){

            const row=document.createElement('tr');
            row.innerHTML+=`
            <td>${i.ID}</td>
            <td>${i.username}</td>
            <td>${i.name}</td>
            <td>${i.surname}</td>
            <td>${i.email}</td>
            <td>${i.password}</td>
            <td>${i.Cell}</td>
            `;
            tablae.appendChild(row)
            
        }
    })
}
Init_Data();
 