const tablae=document.querySelector("#tablab tbody");
console.log(tablae)
const Init_Data=()=>{
    fetch("https://raw.githubusercontent.com/StivenChico/ProyectoMantenimiento/main/json/inf_users.json")
    .then(res=>res.json())
    .then(usuarios=>{
        for(i of usuarios){

            const row=document.createElement('tr');
            row.innerHTML+=`
            <td>${i.ID}</td>
            <td>${i.name}</td>
            <td>${i.surname}</td>
            <td>${i.yearsOld}</td>
            <td>${i.height}</td>
            <td>${i.weight}</td>
            <td>${i.Fr_Train}</td>
            `;
            tablae.appendChild(row)
            
        }
    })
}
Init_Data();
