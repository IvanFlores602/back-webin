require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
      'Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req, res){
  res.send('<h1>App Mercado libre Back </h1><br><hr>');
});
app.use(require('./routes/usuario'));
app.use(require('./routes/email'));

mongoose.connect('mongodb+srv://ivanlf:12345@cluster0.nnhuioe.mongodb.net/app',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
 },(err, res) => {
  if(err) throw err;
  console.log('La Base de Datos App esta en linea');
});

// app.listen(process.env.PORT, ( )=> {
//   console.log('El puerto', process.env.PORT, ' esta en linea')
// });
app.listen(process.env.PORT || 3000, function(){
  console.log("La base de datos escuchando por el puerto ", this.address().port, app.settings.env);
  });