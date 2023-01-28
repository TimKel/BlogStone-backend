const express = require("express");
const db = require("../db.js");
const bcrypt = require("bcrypt");
const User = require("../models/user")
const { createToken } = require("../helpers/tokens")

const router = express.Router()

router.get("/", (req, res) => {
    res.json("AUTH")
});

// router.post("/register", (req, res) => {
//     const q = "SELECT * FROM users WHERE email = ? OR username = ?"

//     db.query(q, [req.body.email, req.body.username], (err,data) => {
//         if(err) return res.json(err)

//         if(data.length) return res.status(409).json("User already exists.");

//         //hash pw and create user
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);

//         const qu = `INSERT INTO users
//                         ('username', 'email', 'password')
//                         VALUES (?)`
//         const values = [
//             req.body.username,
//             req.body.email,
//             hash,
//         ]

//         db.query(qu, [values], (err, data) => {
//             if(err) return res.json(err);

//             return res.status(200).json("User successfully created.");
//         })
                        
//     })
// })

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

 router.post("/register", async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, userRegisterSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
      const newUser = await User.register({ ...req.body });
      const token = createToken(newUser);
      return res.status(201).json({ token });
    } catch (err) {
      return next(err);
    }
  });


  /** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, userAuthSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
      const { username, password } = req.body;
      const user = await User.authenticate(username, password);
      const token = createToken(user);
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  });
  

// router.post("/login", (req, res) => {

// })

// router.post("/logout", (req, res) => {

// })

module.exports = router;