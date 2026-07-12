const express = require("express");
const { saveUser, getAllUsers, getUserById, updateUser, deleteUser, login, refreshToken } = require('../Controller/user.controller');

const router = express.Router();

router.post('/', saveUser); // Registration
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/login', login); // Login
router.post('/refreshToken', refreshToken)


module.exports = router;

