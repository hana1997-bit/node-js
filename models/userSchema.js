const mongoose = require('mongoose');

const { Schema } = mongoose;
const todo = require('./todoSchema')

const userSchema = new Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   age: Number,
   todos: [{ type: Schema.Types.ObjectId, ref: 'todo' }]
}, {
   versionKey: false, // paramétre pour mongodb , désactivier _v on mongoDB
   timestamps: true // temps de create et temps de modifier (creatAT,updateAT)

});


// creation de model
const User = mongoose.model('user', userSchema);



module.exports = User;
