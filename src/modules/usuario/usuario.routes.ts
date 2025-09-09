import {Router} from "express";
const express = require("express");
const router = express.Router();


router.post("/", usuarioController.create);

module.exports = router;
