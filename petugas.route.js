const express = require("express");
const router = express.Router();
const petugasController = require("../controllers/petugas.controller");

router.get("/", petugasController.getAllPetugas);
router.post("/", petugasController.addPetugas);

module.exports = router;