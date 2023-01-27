const express = require("express");
const { addPost } = require("../controllers/post.js");

const router = express.Router()

router.get("/", (req, res) => {
    res.json("this works now")
});

module.exports = router;