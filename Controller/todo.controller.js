const fs = require('fs');

exports.save = (req, res) => {
    let todo = req.body;
    let todos = JSON.parse(fs.readFileSync('./todos.json', { encoding: 'utf8' }));
    todos.push(todo);
    fs.writeFile('./todos.json', JSON.stringify(todos), () => {
        res.status(201).json({ data: todo, message: "Successfull" })
    })
}

exports.getTodos = (req, res) => {
    let todos = JSON.parse(fs.readFileSync('./todos.json', { encoding: 'utf8' }));
    res.status(200).json({ data: todos, message: "Successfull" });
}

exports.getTodoById = (req, res) => {
    let { id } = req.params;
    let todos = JSON.parse(fs.readFileSync('./todos.json', { encoding: 'utf8' }));
    // let todo = todos.find((ele) =>{ ele.id === Number(id)}) 
    // let todo = todos.find((ele) =>{ ele.id ===  parseInt(id)}) 
    let todo = todos.find((ele) => { return ele.id === +id })
    if (!todo) {
        return res.status(404).json({ message: "fail" });
    }
    res.status(200).json({ message: "Successfull", data: todo });
}

exports.deleteTodo = (req, res) => {
    let { id } = req.params;
    let todos = JSON.parse(fs.readFileSync('./todos.json', { encoding: 'utf8' }));
    let todoIndex = todos.findIndex((ele) => ele.id == id); // if not found => -1
    if (todoIndex == -1) {
        return res.status(404).json({ message: "this is not found " })
    }
    console.log(todoIndex)
    todos.splice(todoIndex, 1);
    console.log(todos);
    fs.writeFile('./todos.json', JSON.stringify(todos), () => {
        res.status(204).json();
    })
}