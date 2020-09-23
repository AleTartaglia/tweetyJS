const express = require("express");
const bodyParser = require('body-parser')
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const socketio = require('socket.io');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//requiriendo rutas by Middleware

//middleware de logeo con morgan
app.use(morgan('tiny'))

//nunjucks
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates

app.use(express.static('./public'))
/* app.listen(3000, function () {
  console.log('Estas escuhando en el puerto 3000')
}); */
var server = app.listen(3000)
var io = socketio.listen(server);
app.use('/', routes(io));