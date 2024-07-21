const grafica2=document.getElementById("Grafica2");
const Init_Graficas=()=>{

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

Init_Graficas()
renderModelsChart()