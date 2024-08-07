//const tabla= document.querySelector('#tablaWorkout tbody');

let tabla = new DataTable('#tablaWorkout', {
    paging:false,
    scrollY:400
});
const Init_Data =() =>{
    axios.get('http://127.0.0.1:5000/ejercicioTabla')
    .then(function(response){0
        botones=`<buttom type="buttom" class="btn btn-warning ms-3 btn-sm" data-bs-toggle="modal" data-bs-target="#Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></Buttom>`
        data= response.data;
        for(let i = 0; i< data.length; i++){
            tabla.row.add([data[i].id,data[i].nombre,data[i].guia,data[i].tipo,data[i].equipo,data[i].nivel,data[i].repeticiones,data[i].series,data[i].duracion,botones]).draw();
            /*let row = tabla.insertRow(tabla.length);
            id = row.insertCell(0);
            id.innerHTML = data[i].id;
            
            row.insertCell(1).innerHTML = data[i].nombre;
            row.insertCell(2).innerHTML = data[i].guia;
            row.insertCell(3).innerHTML = data[i].tipo;
            row.insertCell(4).innerHTML = data[i].equipo;
            row.insertCell(5).innerHTML = data[i].nivel;
            row.insertCell(6).innerHTML = data[i].repeticiones;
            row.insertCell(7).innerHTML = data[i].series;
            row.insertCell(8).innerHTML = data[i].duracion;
            row.insertCell(9).innerHTML = `<button class="btn btn-danger btn-sm">Delete</button>`;*/
        }
    }).catch(err=> console.log('error:', err))
}
Init_Data();