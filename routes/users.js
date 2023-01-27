const express = require("express");

const router = express.Router()

router.get("/", (req, res) => {
    res.json("USERS")
});

module.exports = router;