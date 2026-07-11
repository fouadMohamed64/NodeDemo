const express = require("express");


const { save, getTodos, getTodoById, deleteTodo , updateTodo} = require('../Controller/todo.controller')
const router = express.Router();

router.post('/', save);
router.get('/', getTodos);
router.get('/:id', getTodoById)
router.delete('/:id', deleteTodo);
router.patch('/:id' , updateTodo)


module.exports = router;