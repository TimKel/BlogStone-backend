const express = require("express");
const User = require("../models/user");
const router = express.Router()

router.get("/", (req, res) => {
    res.json("USERS")
});

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, jobs }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: admin or same user-as-:username
 **/

 router.get("/:username", async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;