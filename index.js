const express = require('express');
const mongoose = require('mongoose');
// const fs = require('fs');
const todoRoutes = require('./Routes/todos.route');
const userRoutes = require('./Routes/users.route');
const cors = require('cors');
const dotenv = require("dotenv");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');




const app = express();
dotenv.config();



// Middle ware => parsing JSON into JS
app.use(express.json());

app.use(function (req, res, next) {
    console.log('inside custom middle ware');
    next();
})

app.set('view engine', 'pug')
app.set('views', './Views')

app.use(express.static('./Static'));
// app.use(cors({
//     methods: "POST GET PATCH",
//     origin: '*'
// }))



app.use('/todo', todoRoutes);
app.use('/user', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * URL/PORT/todo/todo
 * URL/PORT/user/user
 */

/**
 * URL/PORT/todo/
 * URL/PORT/user/
 */


/**
 * Express => package
 * Node JS Framework
 * npm install express
 */


/**
 * Dependencies => Important Packages ( Development + Deploy/Production )
 * Dev Dependencies => Important Packages ( Development )
 */




//? Request => URL/3000/hello Method => get 
//!  http://localhost:3000/hello
//?  Respose ====> hello world


// app.get('/hello' , (req , res)=>{
//     res.send('Hello World...');
// } )

// app.get('/yourName' , (req , res)=>{
//     res.send('My Name Is Fouad...');
// } )

// NOt Found Middle Ware
app.use('/', function (req, res, next) {
    res.status(404).json({ message: `This ${req.url} Is Not Found...` });
})



mongoose.connect('mongodb://127.0.0.1:27017/Todos')
    .then(() => {
        console.log('Connected Successfully On Database')
    })
    .catch((error) => {
        console.log(error)
    })



const port = 3000;
app.listen(port, (error) => {
    console.log(`listening successfully on port ${port}`);
})


// Template Engine => ejs , pugjs 


// this is the first commit to ali




// mongoose.connect('mongodb://127.0.0.1:27017/Todos')
//     .then(() => {
//         console.log('Connected Successfully On Database')
//     })
//     .catch((error) => {
//         console.log(error)
//     })



// const port = 3000;
// app.listen(port, (error) => {
//     console.log(`listening successfully on port ${port}`);
// })
