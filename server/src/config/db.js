const mongoose = require('mongoose');

const Connection  = ()=>{
    return mongoose.connect("mongodb+srv://saikiran11471:DWaP1kTKbRLohyIJ@cluster0.sf0hp23.mongodb.net/")
};

module.exports = Connection;