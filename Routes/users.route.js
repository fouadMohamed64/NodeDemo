const express = require("express");
const { saveUser , getAllUsers , getUserById, updateUser , deleteUser } = require('../Controller/user.controller');

const router = express.Router();

router.post('/', saveUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);



module.exports = router;

