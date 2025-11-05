const express = require("express");
const router = express.Router();
const presensiController = require("../controllers/presensi.controller");

router.get("/", presensiController.getAllPresensi);
router.post("/", presensiController.addPresensi);

module.exports = router;