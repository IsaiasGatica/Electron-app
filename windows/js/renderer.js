let selectedPort;
let baudratePort;

async function Puertosdisponibles() {
  const availablePorts = await getAvailablePorts();
  console.log("Puertos disponibles:", availablePorts);
  const portSelect = document.getElementById("portSelect");
  portSelect.innerHTML = "";
  selectedPort = availablePorts.length > 0 ? availablePorts[0].path : null;

  availablePorts.forEach((port) => {
    const option = document.createElement("option");
    option.value = port.path;
    option.text = `${port.path} (${port.manufacturer})`;
    portSelect.appendChild(option);

    portSelect.addEventListener("change", function () {
      selectedPort = this.value;
      console.log("Puerto seleccionado:", selectedPort);
    });
  });

  const baudrateSelect = document.getElementById("portbaudrate");

  baudratePort = baudrateSelect.options[0].text;
  console.log("baudrate", baudratePort);

  baudrateSelect.addEventListener("change", function () {
    baudratePort = this.options[this.selectedIndex].text;
    console.log(baudratePort);
  });
}

Puertosdisponibles();

let isportConnect = false;

function bttserialconnect() {
  if (!isportConnect) {
    console.log("button serial connect");
    serialconnect(selectedPort, baudratePort);

    document.getElementById("buttonConnectPort").textContent = "Desconectar";
    document.getElementById("buttonConnectPort").className =
      "btn btn-light btn-sm";
  } else {
    console.log("button serial disconnect");
    serialdisconnect();
    document.getElementById("buttonConnectPort").textContent = "Conectar";
    document.getElementById("buttonConnectPort").className =
      "btn btn-outline-light btn-sm";
  }

  isportConnect = !isportConnect; // Invierte el estado
}
