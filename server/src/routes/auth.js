const express = require("express");
const router = express.Router();

const AddController = require('../Controller/AddController')
router.post('/postApi/web_data/add_data',AddController.Add_data)


module.exports = router;