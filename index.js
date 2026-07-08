const express = require('express');
const fs = require('fs');


const app = express();



// Middle ware => parsing JSON into JS
app.use(express.json()); 

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





app.post('/todo' , (req , res)=>{
    let todo = req.body;
    let todos = JSON.parse(fs.readFileSync('./todos.json' , {encoding: 'utf8'}));
    todos.push(todo);
    fs.writeFile('./todos.json' , JSON.stringify(todos) , ()=>{
        res.status(201).json({ data: todo, message: "Successfull"})
    })
});


app.get('/todo' , (req , res)=>{
    let todos = JSON.parse(fs.readFileSync('./todos.json' , {encoding: 'utf8'}));
    res.status(200).json({ data: todos, message: "Successfull"});
});


app.get('/todo/:id' , (req , res)=>{
    let {id} = req.params;
    let todos =JSON.parse(fs.readFileSync('./todos.json', {encoding: 'utf8'}));
    // let todo = todos.find((ele) =>{ ele.id === Number(id)}) 
    // let todo = todos.find((ele) =>{ ele.id ===  parseInt(id)}) 
    let todo = todos.find((ele) =>{ return ele.id === +id})
    if (!todo) {
        return res.status(404).json({message: "fail"});
    }
    res.status(200).json({message: "Successfull", data: todo});
})


app.delete('/todo/:id' , (req ,res)=>{
    let {id} = req.params;
    let todos = JSON.parse(fs.readFileSync('./todos.json', {encoding: 'utf8'}));
    let todoIndex = todos.findIndex((ele) => ele.id == id); // if not found => -1
    if (todoIndex == -1 ) {
        return res.status(404).json({message: "this is not found "})
    }
    console.log(todoIndex)
    todos.splice(todoIndex , 1);
    console.log(todos);
    fs.writeFile('./todos.json' , JSON.stringify(todos) , ()=>{
        res.status(204).json();
    })
});

// [ , , , , , ,]
// find => splice(start , countNumber )


// filter write













const port = 3000;
app.listen(port, (error) => {
    console.log(`listening successfully on port ${port}`);
})


