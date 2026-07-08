const express = require('express');
// const fs = require('fs');
const todoRoutes = require('./Routes/todos.route');
const userRoutes = require('./Routes/users.route');

const app = express();



// Middle ware => parsing JSON into JS
app.use(express.json());

app.use(function (req, res, next) {
    console.log('inside custom middle ware');
    next();
})

app.use(express.static('./Static'));



app.use('/todo' , todoRoutes);
app.use('/user' , userRoutes);


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









// let [, , command] = process.argv;
// if (command == 'create') {
//     let [, , , title] = process.argv;
//     let todos = JSON.parse(fs.readFileSync('./todos.json', { encoding: 'utf8' }));
//     todos.push({ title });
//     fs.writeFileSync('./todos.json', JSON.stringify(todos))
// }
// else if (command == 'read') {
//     let todos = JSON.parse(fs.readFileSync('./todos.json', { encoding: 'utf8' }))
//     console.log(todos)
// }
// else if (command == 'delete') {
//     let [, , , title] = process.argv;
//     let todos = JSON.parse(fs.readFileSync('./todos.json', { encoding: 'utf8' }))
//     let newTodos = todos.filter((todo) => todo.title != title)
//     fs.writeFileSync('./todos.json', JSON.stringify(newTodos))
// }




// todos routes

// users route


// [ , , , , , ,]
// find => splice(start , countNumber )


// filter write





// NOt Found Middle Ware
app.use('/', function (req, res, next) {
    res.status(404).json({ message: `This ${req.url} Is Not Found...` });
})







const port = 3000;
app.listen(port, (error) => {
    console.log(`listening successfully on port ${port}`);
})


