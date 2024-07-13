const tablae=document.querySelector("#tablab tbody");
console.log(tablae)
url="127.0.0.1:3000"
const Init_Data=()=>{
    fetch(url+"/getAll")
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
            <td><input type="submit" class="btn btn-primary" value="editar"><input type="submit" class="btn btn-danger ml-5" value="eliminar"</td>
            `;
            tablae.appendChild(row)
            
        }
    })
}
Init_Data();
