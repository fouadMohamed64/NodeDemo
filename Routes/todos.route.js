const express = require("express");


const { save, getTodos, getTodoById, deleteTodo, updateTodo } = require('../Controller/todo.controller')
const { auth , restrictTo } = require('../Middlewares/authentication.middleware');
const router = express.Router();

router.get('/', auth,getTodos);
router.get('/:id', getTodoById)
router.post('/', auth,restrictTo("admin" , "user"), save);
router.delete('/:id', auth, restrictTo("admin"),  deleteTodo);
router.patch('/:id', auth, updateTodo)


module.exports = router;

// ['admin']
// ['admin', 'user']
// ['admin', 'user' , 'hamada']