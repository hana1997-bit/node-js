const express = require('express');

const morgan = require('morgan');

//  bodyparser config 
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
//connect to database
const connect = require('./Database/connect');

//configuration morgan

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
// bodyparser application /json
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({ message: "welcome to muy rest API" });
});
// todo api
const todoaApi = require('./routes/todosAPI');
const userApi = require('./routes/userApi');

app.use('/api/v1',todoaApi);
app.use('/api/v1',userApi);

// module.exports = {
//     todoApi = require('./routes/todosAPI'),
//     userApi = require('./routes/userApi')

// }

app.listen(port, () => {
    console.log(`application listening at http://localhost: ${port}`);
})