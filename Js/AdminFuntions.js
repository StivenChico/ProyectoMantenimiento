const tablae=document.querySelector("#tablaa tbody");
console.log(tablae)
const Init_Data=()=>{


    fetch("../json/Usuarios.json")
    .then(res=>res.json())
    .then(usuarios=>{
        for(i of usuarios){

            const row=document.createElement('tr');
            row.innerHTML+=`
            <td>${i.username}</td>
            <td>${i.email}</td>
            <td>${i.password}</td>
            <td>${i.Cell}</td>
            `;
            tablae.appendChild(row)
            
        }
    })
}
Init_Data();
 