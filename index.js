const express = require ('express');

const morgan = require('morgan');
const app = express();

const port = 3000;
//connect to database
const connect = require('./Database/connect');

//configuration morgan

app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.json({message :'welcome to my rest API'});
});

//get all todo
app.post('/todos' , (req,res)=>{

});

//get todo by id
app.get('/todos:id' , (req,res)=>{

});

//create todo
app.post('/todos' , (req,res)=>{

});
 //update todo
app.put('/todos:id' , (req,res)=>{

});

//delete todo
app.delete('/todos:id' , (req,res)=>{

});

app.listen(port, ()=>{
    console.log(`application listening at http://localhost: ${port}`);
})