const grafica2=document.getElementById("Grafica2");
const grafica3=document.getElementById("Grafica3");
const Init_Graficas=()=>{
    //carga del grafico 2 con get en la bd
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/GetGrafica2',
    }).then(function(response){
        let M=response.data[1].total;
        let F=response.data[0].total;
    var Chart2=new Chart(grafica2, {
        type:'pie',
        data:{
            labels: ["Hombres", "Mujeres"],
            datasets:[{
                label:"Grafica de Genero",
                data:[M,F],
                
            }]
        }
    });
    }).catch(err => console.log('Error: ', err))

    //carga de grafica 3 con un get 
    axios({
        method:'GET',
        url:'http://127.0.0.1:3000/GetGrafica3'
    }).then(function(response){
    var chart3 = new Chart(grafica3, {
        type:'bar',
        data:{
            labels: [response.data[0].goal,response.data[1].goal ,response.data[2].goal],
            datasets:[{
                label:"Grafica Objetivos",
                data:[response.data[0].total,response.data[1].total,response.data[2].total],
                backgroundColor:['rgba(75, 192, 192, 1)'],
                borderColor:['rgba(75, 192, 192, 1)'],
                borderWidth:1
            }]
        },
        options:{
            scales:{
                y:{
                    beginAtZero:true
                }
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

Init_Graficas()
renderModelsChart()