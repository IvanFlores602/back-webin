const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Correo = require('../models/email');
const app = express();
var nodemailer = require('nodemailer');

  app.get('/email', function (req, res) {
      let desde = req.query.desde || 0;
      let hasta = req.query.hasta || 100;
    Correo.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Hubo un error al momento de consultar',
               err 
           });
       } 
       res.json({
           ok:true,
           msg: 'Usuarios obtenidos con exito',
           conteo: usuarios.length,
           usuarios
       });
    });
  });

  app.get('/usuario/:email', function (req, res) {
    let idusuario = req.params.email;
  Usuario.findOne({email: idusuario})
  .exec((err, usuarios) =>{
     if(err) {
         return res.status(400).json({
             ok: false,
             msg: 'Hubo un error en la consulta',
             err 
         });
     } 
     res.json({
         ok:true,
         msg: 'Usuario obtenida con exito',
         conteo: usuarios.length,
         usuarios
     });
  });
});

  app.post('/email', function (req, res) {
    let body = req.body;
    let usr = new Correo({
        email: body.email,
    });
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'ip5978831@gmail.com',
            pass: 'yjgokjompnhdrveo',
        },
      });

usr.save((err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error 404',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario agregado con exito',
            usrDB
        });
        var mailOptions = {
            from: "Aplicacion Ropa ONline",
            to: usrDB.email,
            subject: "Se ha registro con exitoso",
            text: "confirmacion",
            html: "<a  href='http://localhost:4200/confirmar'>Confirma el registro del usuario</a></li>",
          }
           transporter.sendMail(mailOptions, (error, info) =>{
            if(error) {
                res.status(500).send(error.message);
            }else{
                console.log("Fue Enviado el Email a tu correo");
                res.status(200).jsonp(req.body);
            }
           })
    });
  });
  
  app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','apellidos','email']);

    Usuario.findByIdAndUpdate(id, body, { new:true, runValidators: true, context: 'query' }, (err, usrDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Hubo un error al actualizar',
                err
            });
        }
        res.json({
            ok:true,
            msg: 'Usuario actualizado con exito',
            usuario: usrDB
        });
    });
  });
  
  app.delete('/usuario/:id', function (req, res) {
     let id = req.params.id;
      Usuario.deleteOne({ _id: id }, (err, usuarioBorrado) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al eliminar el usuario',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usuarioBorrado
        });
      });
  });

module.exports = app;