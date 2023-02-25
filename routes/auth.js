const express = require("express");

const jsonschema = require("jsonschema");
const User = require("../models/user")
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError.js");
const newUserSchema = require("../schemas/NewUserSchema.json")
const userAuthSchema = require("../schemas/UserAuth.json")

const router = express.Router()

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
      const validator = jsonschema.validate(req.body, newUserSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        console.log(errs)
        throw new BadRequestError(errs);
      }
  
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
      const validator = jsonschema.validate(req.body, userAuthSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const { username, password } = req.body;
      const user = await User.authenticate(username, password);
      const token = createToken(user);
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;