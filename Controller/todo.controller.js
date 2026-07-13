const todoModel = require('../Models/todo.model');

exports.save = async (req, res) => {
    let todo = req.body;
    await todoModel.create(todo);
    res.status(201).json({ message: "Created Successfully", data: todo })
}

//! populate
exports.getTodos = async (req, res) => {
    try {
        const todos = await todoModel.find().populate('user', '-_id -__v -refreshToken -password -email -role');
        res.status(200).json({ data: todos, message: "Successfull" });
    } catch (error) {
        res.status(400).json({ message: "fail in get todos" })
    }
}

exports.getTodoById = async (req, res) => {
    let { id } = req.params;
    try {
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'this todo is not found' })
        }
        res.status(200).json({ message: "successfully", data: todo });
    } catch (error) {
        res.status(400).json({ message: "fail" })
    }
}

exports.deleteTodo = async (req, res) => {
    let { id } = req.params;
    try {
        let todo = await todoModel.findByIdAndDelete(id);
        if (!todo) {
            res.status(404).json({ message: "this todo is not found" })
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json();
    }
}

exports.updateTodo = async (req, res)=>{
    const {id} = req.params;
    const newTodo = req.body;
    console.log(newTodo)
    try{
        const todo = await todoModel.findByIdAndUpdate(id, newTodo , {new: true});
        if (!todo) {
            return res.status(404).json({message: "fail"})
        }
        res.status(201).json({message: "upated successfully" , data: newTodo});
    }catch(error){
        res.status(400).json({message: "fail"})
    }
}

exports.viewAllTodos =async (req, res)=>{
    try{
        let todos = await todoModel.find() 
        res.render('todos', {todos})
    }catch(error){
        console.log('error , ', error)
    }
}