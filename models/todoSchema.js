 const mongoose =require( "mongoose");

const {Schema}= mongoose;

const todosSchema = new Schema ({
    title : {type : String , default :'hello' , required : true}, //on peut donner une valeur 
    description : String, // on ne peut pas donner une valeur
},{
    versionKey: false, // paramétre pour mongodb , désactivier _v on mongoDB
    timestamps:true // temps de create et temps de modifier (creatAT,updateAT)

}); 

// creat de model

const Todo = mongoose.model('todo',todosSchema);

module.exports=Todo;