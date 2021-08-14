const express = require('express');

const morgan = require('morgan');

const dotenv = require('dotenv');
// configuration de dotenv

dotenv.config();

//  bodyparser config 
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
//connect to database
const connect = require('./Database/connect');
// const User= require('./models/userSchema')
//configuration morgan

app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
// bodyparser application /json
// app.use(bodyParser.json());
app.use(express.json()); // nouvelle  méthde de body parser

// static folder config with express
app.use('/public', express.static('public'));

// config view engine (with ejs)
app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.json({ message: "welcome to muy rest API" });
});

app.get('/index', (req, res) => {
    res.render('index',{title:'hy', message :'hello'})
});

// todo api
const todoaApi = require('./routes/todosAPI');
const userApi = require('./routes/userApi');
const mailApi=require('./routes/mailApihtml');
const mailApiV2 = require ('./routes/mailApiV2');
const imageApi= require('./routes/imagApi');
const cornApi = require('./routes/cornApi');

app.use('/api/v1',todoaApi);
app.use('/api/v1',userApi);
app.use('/api/v1', mailApiV2);
app.use('/api/v1',mailApi);
app.use('/api/v1',imageApi)
app.use('/api/v1',cornApi);



app.listen(port, () => {
    console.log(`application listening at http://localhost: ${port}`);
})