const express = require("express");

const router = express.Router();
const Candy = require("../models/candy");

const candyController = require("../controllers/candy");

router.post("/candy/add-candy", candyController.postCandy);

router.get("/candy/get-candy", candyController.getCandy);

router.post("/buy/:id/:quantity", candyController.buyCandy);

module.exports = router;
