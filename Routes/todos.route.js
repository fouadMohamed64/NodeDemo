const express = require("express");


const { save, getTodos, getTodoById, deleteTodo, updateTodo , viewAllTodos} = require('../Controller/todo.controller')
const { auth , restrictTo } = require('../Middlewares/authentication.middleware');
const router = express.Router();


router.get('/',getTodos);
router.get('/:id', getTodoById)
router.post('/', auth,restrictTo("admin" , "user"), save);
router.delete('/:id', auth, restrictTo("admin"),  deleteTodo);
router.patch('/:id', auth, updateTodo)

router.get('/view/todo' , viewAllTodos)



module.exports = router;

// ['admin']
// ['admin', 'user']
// ['admin', 'user' , 'hamada']