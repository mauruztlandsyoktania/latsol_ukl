const express = require("express");
const router = express.Router();
const siswaController = require("../controllers/siswa.controller");

router.get("/", siswaController.getAllSiswa);
router.post("/", siswaController.addSiswa);

module.exports = router;