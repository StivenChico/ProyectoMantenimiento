const tabla=document.querySelector("#lista-usuarios tbody")
const Init_Data=()=>{
    fetch("/js/Usuarios")
    .then(res=>res.json())
    .then(usuarios=>{
        for(i of usuarios){
            const row=document.createElement("tr");
            row.innerHTML+='<td>${i.nombre}</td><td>${i.edad}</td><td>${i.peso}</td><td>${i.frecuencia}</td>'
            
            tabla.appendChild(row)
        }
    })
}