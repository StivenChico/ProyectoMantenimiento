let tabla = new DataTable('#tablaWorkout_routine', {
    paging:false,
    scrollY:200
});
const Init_Data =() =>{
    axios.get('http://127.0.0.1:5000/ejercicioTabla')
    .then(function(response){0
        botones1=`<buttom type="buttom" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#Agregar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
</svg></Buttom> <buttom class= "btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#Información" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></buttom>`
        data= response.data;
        for(let i = 0; i< data.length; i++){
            tabla.row.add([data[i].nombre,data[i].tipo,data[i].nivel,botones1]).draw();

        }
    }).catch(err=> console.log('error:', err))
}
Init_Data();
mensj="";
// se piden los datos del formulario
const Registrar = () =>{
    
}
