const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// Función para escanear los puertos disponibles
async function getAvailablePorts() {
  try {
    const ports = await SerialPort.list();
    return ports.map((port) => ({
      path: port.path,
      manufacturer: port.manufacturer || "Desconocido",
    }));
  } catch (error) {
    console.error("Error al escanear los puertos:", error);
    return [];
  }
}

let port;
function serialconnect(selectedPort, baudratePort) {
  port = new SerialPort({
    path: selectedPort, //EDIT AS NEEDED
    baudRate: parseInt(baudratePort), //EDIT AS NEEDED
  });

  // const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  localStorage.setItem(
    "serialPort",
    JSON.stringify({ path: selectedPort, baudRate: 115200 })
  );
}

function serialdisconnect() {
  port.close();
}

let isGraphing = false;

let parser;

function serialgraph() {
  if (!isGraphing) {
    // Comienza a graficar
    parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

    parser.on("data", (newData) => {
      updateChart(newData);
    });

    document.getElementById("graphButton").textContent = "Parar";
    document.getElementById("graphButton").className = "btn btn-light btn-sm";
  } else {
    // Detiene la gráfica
    parser.removeAllListeners("data");
    document.getElementById("graphButton").textContent = "Graficar";
    document.getElementById("graphButton").className =
      "btn btn-outline-light btn-sm";
  }

  isGraphing = !isGraphing; // Invierte el estado
}
