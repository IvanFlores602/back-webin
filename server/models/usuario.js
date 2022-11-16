const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    //_id: {
    //    type: String,
    //    required: [true, 'El id es necesario']   
   // },
    nombre: {
        type: String,
        required: [true, 'Es necesario el Nombre']
    },
    apellidos: {
        type: String,
        required: [true, 'Es necesario el Apeelido']
    },
    email:{
        type: String,
        required: [true, 'Es Requerido el Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Es reuerido el Password']
    },
    rol: {
        type: String,
        default: "3",
      },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema);