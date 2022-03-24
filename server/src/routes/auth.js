const express = require("express");
const router = express.Router();

const AddController = require('../Controller/AddController')
router.post('/postApi/web_data/add_data',AddController.Add_data)
router.post('/postApi/web_data/add_play_date',AddController.Add_play_date)


const LoginController = require('../Controller/LoginController')
// router.post('/postApi/Login/Checklogin',LoginController.Checklogin)

module.exports = router;