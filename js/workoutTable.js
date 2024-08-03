//const tabla= document.querySelector('#tablaWorkout tbody');

let tabla = new DataTable('#tablaWorkout', {
    paging:false,
    scrollY:400
});
const Init_Data =() =>{
    axios.get('http://127.0.0.1:5000/ejercicioTabla')
    .then(function(response){0
        botones=`<button class="btn btn-danger btn-sm">Delete</button>`
        data= response.data;
        for(let i = 0; i< data.length; i++){
            tabla.row.add([data[i].nombre,data[i].guia,data[i].tipo,data[i].equipo,data[i].nivel,data[i].repeticiones,data[i].respeticiones,data[i].series,data[i].duracion,botones]).draw();
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