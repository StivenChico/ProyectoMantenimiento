const Init_Graficas=()=>{













    
    grafica2=document.getElementById("Grafica2");
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/GetGrafica2',
    }).then(function(response){

    var chart2 = new Chart(grafica2, {
        type:'pie',
        data:{
            labels: ["Hombres", "Mujeres"],
            datasets:{
                label:"Grafica de Genero",
                data:[response.data[1].total,response.data[0].total],
                
            }
        }
    })
    }).catch(err => console.log('Error: ', err))
}

const renderModelsChart=()=>{
    axios.get('http://127.0.0.1:3000/getGrafica1'
    ).then(response =>{
        const data=response.data; // guardamos el resultado en la variable data
        const rango=['0-10','11-20','21-30','31-40']
        const edades= data; // se procesan las edades
        const distribucionEdad ={
            labels:rango,
            datasets:[{
                data:edades,// regisro de los datos de la tabla
                backgroundColor:['blue','red'],//fondo de las grafica en orden
                borderColor:['rgba(75, 192, 192, 1)'],
            }]
        } 
    
        new Chart('Grafica1',{type:'bar',distribucionEdad})
    }).catch(err=> console.log('error:', err))
}

