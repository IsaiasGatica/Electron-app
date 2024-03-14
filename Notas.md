# Notas

---

### Boton - Onclick (Seguridad de electron)

El error que estás viendo está relacionado con la Política de Seguridad de Contenido (Content Security Policy, CSP) en Electron. Esta política ayuda a prevenir ataques como inyección de código y ejecución de scripts no autorizados. El mensaje indica que no se permite la ejecución de scripts en línea directamente desde el atributo onclick debido a la directiva script-src en la política de seguridad de contenido.

Para solucionar este problema, puedes definir tu manejador de eventos de clic de forma más segura. Aquí te dejo un ejemplo utilizando JavaScript en lugar de definirlo directamente en el HTML:

```
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Botón con función</title>
    <script>
        // Definir la función que se llamará al hacer clic en el botón
        function miFuncion() {
            alert("¡Hola! Función ejecutada");
        }

        // Asignar el manejador de clic de forma más segura después de que el DOM esté completamente cargado
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('miBoton').addEventListener('click', miFuncion);
        });
    </script>
</head>
<body>

    <!-- Crear el botón con un ID -->
    <button id="miBoton">Haz clic</button>

</body>
</html>


```

---

### Write CSV

```

const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const { parse } = require('papaparse');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadFile('index.html');

  handleFileOperations();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function handleFileOperations() {
  let datosDinamicos = [];

  ipcMain.on('agregar-datos', (event, nuevoDato) => {
    datosDinamicos.push(nuevoDato);
    actualizarArchivo();
  });

  function actualizarArchivo() {
    const contenidoCSV = parse(datosDinamicos, { header: true }).data;
    const rutaArchivo = 'archivo.csv';

    const csvString = parse(contenidoCSV, { header: true }).csv;

    fs.writeFileSync(rutaArchivo, csvString);

    console.log(`Archivo CSV actualizado en: ${rutaArchivo}`);
  }
}
```

```
const { ipcRenderer } = require('electron');

// Ejemplo de uso:
ipcRenderer.send('agregar-datos', { id: 1, nombre: 'Ejemplo', edad: 25 });
ipcRenderer.send('agregar-datos', { id: 2, nombre: 'Otro Ejemplo', edad: 30 });
// ... Agregar más datos según sea necesario
```

```
npm install papaparse

```
