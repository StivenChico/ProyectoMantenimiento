const tabla= document.querySelector('#tablaWorkout tbody');
const Init_Data =() =>{
    axios.get('http://127.0.0.1:5000/ejercicioTabla')
    .then(function(response){
        data= response.data;
        for(let i = 0; i< data.length; i++){
            let row = tabla.insertRow(tabla.length);
            row.insertCell(0).innerHTML = data[i].id;
            row.insertCell(1).innerHTML = data[i].nombre;
            row.insertCell(2).innerHTML = data[i].guia;
            row.insertCell(3).innerHTML = data[i].tipo;
            row.insertCell(4).innerHTML = data[i].equipo;
            row.insertCell(5).innerHTML = data[i].nivel;
            row.insertCell(6).innerHTML = data[i].repeticiones;
            row.insertCell(7).innerHTML = data[i].series;
            row.insertCell(8).innerHTML = data[i].duracion;
            row.insertCell(9).innerHTML = `<button class="btn btn-danger btn-sm">Delete</button>`;
        }
    }).catch(err=> console.log('error:', err))
}
Init_Data();