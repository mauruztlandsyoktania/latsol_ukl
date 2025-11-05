const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

router.post("/", user.addUser);
router.get("/:id", user.getUserById);
router.put("/:id", user.updateUser);

module.exports = router;