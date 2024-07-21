const grafica1 = document.getElementById('Grafica1').getContext('2d');
const grafica2=document.getElementById("Grafica2");
const grafica3=document.getElementById("Grafica3");
const grafica4=document.getElementById("Grafica4");
const grafica5=document.getElementById("Grafica5");
const Init_Graficas=()=>{
    //Peticion de datos generales
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/GetGeneral',
    }).then(function(response){
        document.getElementById("Activos").innerHTML+=response.data.totalUsuarios;
        document.getElementById("DiagnosticosTt").innerHTML+=response.data.diagnosticosTotales;
    }).catch(err => console.log('Error: ', err))



    //peticion para grafica 1 sobre el IMC
axios({
    method: 'GET',
    url: 'http://127.0.0.1:3000/GetGrafica1',
    }).then(function(response){
        let arreglorecibe=response.data;
        counts=[0,0,0,0]
        for(i=0;i<arreglorecibe.length;i++){
            let weight=parseFloat(arreglorecibe[i].weight);
            let height=parseFloat(arreglorecibe[i].height);
            let IMC=weight/(height*height);
            if(IMC<18.5){
                counts[0]++;
            }else if(IMC>=18.5 && IMC<24.9){
                counts[1]++;
            } else if(IMC>=25 && IMC<30){
                counts[2]++;
            } else if(IMC>=30){
                counts[3]++;
            }
        }



    var chart1=new Chart(grafica1, {
        type:'pie',
        data:{
            labels: [ 'Bajo peso', 'Peso normal', 'Sobrepeso', 'Obesidad'],
            datasets:[{
                label:"Grafica de IMC",
                data:counts,
                backgroundColor:['rgba(92, 186, 224 ,0.8)',
                                 'rgba(157, 178, 39, 0.8)',
                                 'rgba(217, 115, 24, 0.8)',
                                 'rgba(198, 62, 47, 0.8)'],
                borderColor:['rgba(92, 186, 224 ,1)',
                             'rgba(157, 178, 39, 1)',
                             'rgba(217, 115, 24, 1)',
                             'rgba(198, 62, 47, 1)'],
                borderWidth:1
            }]
        }
    })
    }).catch(err => console.log('Error: ', err))


    //carga del grafico 2 con get (grafica sobre el genero)
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

    //carga de grafica 3 con un get(grafica sobre objetivos) 
    axios({
        method:'GET',
        url:'http://127.0.0.1:3000/GetGrafica3'
    }).then(function(response){
        arreglorecibe=response.data; 
    var chart3 = new Chart(grafica3, {
        type:'bar',
        data:{
            labels: [arreglorecibe[0].goal,arreglorecibe[1].goal ,arreglorecibe[2].goal],
            datasets:[{
                label:"Grafica Objetivos",
                data:[arreglorecibe[0].total,arreglorecibe[1].total,arreglorecibe[2].total],
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


//Peticon a la api de datos para la grafica 4 de roles
axios({
    method: 'GET',
    url: 'http://127.0.0.1:3000/GetGrafica4',
}).then(function(response){
    arreglorecibe=response.data;
    labels=[]
    datos=[]
    for(i=0;i<arreglorecibe.length;i++){
    if(arreglorecibe[i].rol==1){
        labels.push('Administrador');
    }else if(arreglorecibe[i].rol==2){
        labels.push('Usuario');
    }else if(arreglorecibe[i].rol==3){
        labels.push('Profesional');
    }
    datos.push(arreglorecibe[i].total);
    }

    var char4=new Chart(Grafica4,{
        type:'bar',
        data:{
            labels:labels,
            datasets:[{
                label:"Grafica de Roles",
                data:datos,
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

//Grafica 5 sobre rango de edad
axios.get('http://127.0.0.1:3000/getGrafica5')

      .then(function(response) {
        
        Arreglo=response.data
        nombres=[];
        data=[];
        for(i=0;i<Arreglo.length;i++ ){
            //console.log(response.data[i].rango_edad);
            //console.log(Arreglo[i].total);
            nombres.push(Arreglo[i].rango_edad);
            data.push(Arreglo[i].total);
        }

        // Rango de edades
        //const labels = ['0-17', '18-25', '26-35', '36-45', '46-55', '56-65', '66+'];
        //console.log(response.data)
        
        const ageChart = new Chart(grafica5, {
          type: 'bar',
          data: {
            labels: nombres, // etiquetas de los rangos de edad
            datasets: [{
              label: 'Rangos de edad',
              data:data, // datos de la cantidad de personas en cada rango de edad
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

  //Peticion de datos para la grafica 6 sobre altura
  axios.get('http://127.0.0.1:3000/getGrafica6')
  .then(response =>{
    // Rango de alturas
    const labels = ['155-165 cm', '165-175 cm', '175-185 cm', '185-195 cm'];
    console.log(response.data)
    const heightCtx = document.getElementById('Grafica6').getContext('2d');
    const heightChart = new Chart(heightCtx,{
      type:'bar',
      data:{
        labels: labels, // etiqueta de los rangos
        datasets:[{
          label:'Numero de personas por altura',
          data:response.data, // datos de la cantidad de personas en cada rango
          backgroundColor: 'rgba(75, 192, 192)'
        }]
      },
      options:{
        scales:{
          y:{
            min:0, // Rango minimo
            max:10,// rango maximo
            beginAtZero:true
          }
        }
      }
    })
  })
  .catch(err => console.log('error:', err));
}


Init_Graficas()

