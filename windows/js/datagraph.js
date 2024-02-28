// Almacena los datos del gráfico en una variable
let chartData = [];

// Configuración inicial del gráfico
const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "line",

  // The data for our dataset
  data: {
    labels: ["Serial"],
    datasets: [
      {
        label: "Serial Data from Arduino",
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        data: chartData,
      },
    ],
  },

  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
  },
});

let dataIndex = 0; // Indice para la posición en el eje X

// Manejo de datos del puerto serie
function updateChart(newData) {
  // Asegúrate de convertir newData a un número si es necesario
  const parsedData = parseInt(newData);

  // Agrega el nuevo dato al conjunto de datos
  chartData.push(parsedData);

  // Añade el índice actual al conjunto de etiquetas
  myChart.data.labels.push(dataIndex);

  // Incrementa el índice para la próxima actualización
  dataIndex++;

  // Limita el número de puntos en el gráfico para evitar la sobrecarga
  const maxDataPoints = 100; // Establece el número máximo de puntos a mostrar
  if (chartData.length > maxDataPoints) {
    chartData.shift(); // Elimina el primer elemento del array
    myChart.data.labels.shift(); // Elimina la primera etiqueta
  }

  // Actualiza el gráfico con los nuevos datos
  myChart.update();
}

module.exports = { updateChart };
