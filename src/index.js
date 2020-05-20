const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

//settings
app.set("port", 8080);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
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
      break;
    case "action_email":
      const email = query.parameters.email;
      break;

    default:
      break;
  }
});

//routes

//static files

//listening the server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
