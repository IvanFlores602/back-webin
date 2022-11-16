/*importacion de notificacion en GMAIL*/
import JSONTransport from "nodemailer/lib/json-transport";
var nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: 'ip5978831@gmail.com', 
      pass: 'yjgokjompnhdrveo',
    },
  });
  transporter.verify().then(() => {
    console.log('Ready for send emails')
  })
  