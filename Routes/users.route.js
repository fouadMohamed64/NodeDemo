const express = require("express");
const { saveUser } = require('../Controller/user.controller');

const router = express.Router();

router.get('/', saveUser)


module.exports = router;

