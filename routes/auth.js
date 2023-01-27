const express = require("express");
const db = require("../db.js");
const bcrypt = require("bcrypt");

const router = express.Router()

router.get("/", (req, res) => {
    res.json("AUTH")
});

router.post("/register", (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err,data) => {
        if(err) return res.json(err)

        if(data.length) return res.status(409).json("User already exists.");

        //hash pw and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const qu = `INSERT INTO users
                        ('username', 'email', 'password')
                        VALUES (?)`
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]

        db.query(qu, [values], (err, data) => {
            if(err) return res.json(err);

            return res.status(200).json("User successfully created.");
        })
                        
    })
})

// router.post("/login", (req, res) => {

// })

// router.post("/logout", (req, res) => {

// })

module.exports = router;