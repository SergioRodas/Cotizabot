const express = require("express");
const axios = require("axios");
const path = require("path");
const mongoose = require("mongoose");

//Initializations
const app = express();
require("./database");

//Settings
app.set("port", 8080);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//Middlewares
app.use(express.json());
const userSchema = mongoose.Schema({
  nombre: String,
  pais: String,
  ciudad: String,
  dni: Number,
  email: String,
  session: String,
});
app.post("/webhook", (req, res) => {
  const query = req.body.queryResult;
  const session = req.body.session.split("/").pop();
  const action = query.action;

  switch (action) {
    case "action.welcome":
      res.json({
        fulfillmentText: `\n *** Bienvenidos al Cotizabot *** \n
        Obtenga información sobre la cotización del Bitcoin, Ethereum y Monero en pesos argentinos al instante.
        
        Para continuar necesita registrarse.
        
        Por favor, escriba su nombre a continuación:`,
      });
      break;
    case "action_name":
      const name = query.parameters.name;
      break;
    case "action_country":
      const country = query.parameters.country;
      break;
    case "action_city":
      const city = query.parameters.city;
      break;
    case "action_dni":
      const dni = query.parameters.dni;
      const dniLength = dni.toString().length;
      if (dniLength > 6 && dniLength < 9) {
        res.json({
          fulfillmentText: `Por último, ingrese su dirección de email:`,
        });
      } else {
        res.json({
          fulfillmentText:
            "Por favor, ingrese un dni válido(entre 7 y 9 dígitos)",
        });
      }

      console.log(dniLength);
      break;
    case "action_email":
      const email = query.parameters.email;
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const esValido = emailRegex.test(email);
      if (esValido) {
        res.json({
          fulfillmentText: `Muy bien, ha completado el registro con éxito. \n
          Nombre: 
          País: 
          Ciudad: 
          DNI: 
          Email: 
          ¿Está de acuerdo con los datos ingresados? \n
          Para continuar escriba 'si'. \n
          Para modificarlos o desistir escriba 'no'.\n`,
        });
      } else {
        res.json({
          fulfillmentText: "Por favor ingrese un email válido",
        });
      }

      break;

    default:
      break;
  }
});

//Routes

//Static files

//Listening the server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
