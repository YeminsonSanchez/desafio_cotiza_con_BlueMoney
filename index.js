// 1. Recibir por la línea de comando los siguientes argumentos:
// a. Nombre del archivo que se creará.
// b. Extensión del archivo.
// c. Indicador económico que se desea convertir.
// d. Cantidad de pesos que se quiere cambiar.
// 2. Consultar la API con el módulo https y almacenar la respuesta en una variable.
// 3. Crear un archivo con el módulo fs cuyos datos están formados por los argumentos
// recibidos por línea de comando y su contenido basado en el template de la
// descripción.
// 4. Enviar por consola el contenido del archivo luego de que haya sido creado.
// 5. Ejecutar la aplicación desde un archivo externo con el módulo child_process
// enviando los argumentos correspondientes y  devolviendo por consola el contenido
// del archivo luego de que haya sido creado.

const https = require("https");
const fs = require("fs");

const argument = process.argv.slice(2);

let url = "https://mindicador.cl/api";
let name_file = argument[0];
let extention_file = argument[1];
let currency = argument[2];
let amount_pesos = Number(argument[3]);

https
  .get(url, (response) => {
    response.on("data", (data) => {
      let indicator = JSON.parse(data);
      let dolar = indicator.dolar.valor;
      let total_dolar = (amount_pesos / dolar).toFixed(2);

      fs.writeFile(
        `${name_file}.${extention_file}`,
        `   A la fecha: ${Date()}
        Fue realizada una cotización con los siguientes datos:
        Cantidad de Pesos Chilenos a convertir: ${amount_pesos}
        Convertidos a ${currency} a un valor de: ${dolar}
        Da un total en Dolares de: ${total_dolar} $`,
        "utf8",
        () => {
          console.log(
            `Archivo ${name_file}.${extention_file} fue creado con exito`
          );

          fs.readFile(`${name_file}.${extention_file}`, "utf8", (err, data) => {
            console.log(`Contenido del archivo: \n${data}`);
          });
        }
      );
    });
  })
  .on("error", (error) => {
    console.log(error + "Error al conectar con la API");
  });
