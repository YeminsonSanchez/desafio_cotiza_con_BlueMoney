const child_process = require("child_process");

child_process.exec(
  `node index.js cotizacion txt Dolar 1000`,
  (error, stdout) => {
    if (error) {
      console.log(`exec error: ${error}`);
      return;
    }

    // Devolviendo contenido del archivo por consola
    console.log(`Resultado: ${stdout}`);
  }
);
