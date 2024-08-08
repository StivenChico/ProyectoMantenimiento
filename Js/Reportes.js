const { jsPDF } = window.jspdf;
const GenerarReporte=()=>{
    const reporte=new jsPDF({
        orientation:'p',
        format:'a4',
        unit:'mm',
    });
    reporte.text('Reporte de DsWorkout Advisor', 10, 10);
    reporte.save('Reporte_DsWorkoutAdvisor.pdf');
    alert('Reporte generado correctamente');
}