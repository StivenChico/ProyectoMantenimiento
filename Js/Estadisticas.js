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
const renderModelsChart = () => {
    axios.get('http://127.0.0.1:3000/getGrafica1')
      .then(response => {
        // Rango de edades
        const labels = ['0-17', '18-25', '26-35', '36-45', '46-55', '56-65', '66+'];
        console.log(response.data)
        const ageCtx = document.getElementById('Grafica1').getContext('2d');
        const ageChart = new Chart(ageCtx, {
          type: 'bar',
          data: {
            labels: labels, // etiquetas de los rangos de edad
            datasets: [{
              label: 'Número de Personas',
              data: response.data, // datos de la cantidad de personas en cada rango de edad
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(err => console.log('error:', err));
  }
const renderModelsChart2 =() =>{
  axios.get('http://127.0.0.1:3000/getGrafica4')
  .then(response =>{
    const data= response.data;
    const roles=['Administradores', 'Usuarios','Profesionales']
    console.log(data)
    const rolCtx=document.getElementById('Grafica4').getContext('2d')
    const rolChart = new Chart(rolCtx,{
      type:'bar',
      data:{
        labels:roles,
      datasets:[{
        label:'Cantidades por Rol',
        data:data,
        backgroundColor:['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor:['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
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
  })
}

Init_Graficas()
renderModelsChart()
renderModelsChart2()