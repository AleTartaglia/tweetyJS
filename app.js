const express = require("express");
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const app = express();

//requiriendo rutas by Middleware
app.use('/', routes);

//middleware de logeo con morgan
app.use(morgan('tiny'))

//nunjucks
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates



app.use(express.static('./public'))

let tweetsDeEjemplo = [
  { id: 1, name: "juan", content: "este es un tweeettt de juan" },
  { id: 2, name: "carlos", content: "este es un tweeettt de carlos" },
  { id: 3, name: "pepe", content: "este es un tweeettt de pepe" },
];



app.listen(3000, function () {
  console.log('Estas escuhando en el puerto 3000')
});

