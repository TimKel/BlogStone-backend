const express = require("express");
const { addPost } = require("../controllers/post.js");
const Post = require("../models/post.js");


const router = express.Router()

// router.get("/", (req, res) => {
//     res.json("this works now")
// });

router.get("/", async (req, res, next) => {
    // const q = req.query.cat
    try {
        // const validator = jsonschema.validate(q, companySearchSchema);
        // if (!validator.valid) {
        //   const errs = validator.errors.map(e => e.stack);
        //   throw new BadRequestError(errs);
        // }
        
        const posts = await Post.getAllPosts();
        return res.json({ posts });
      } catch (err) {
        return next(err);
      }
});

router.get("/:id", (req, res) => {
    
});

router.post("/", (req, res) => {
    
});

router.delete("/:id", (req, res) => {
    
});

router.patch("/:id", (req, res) => {
    
});

module.exports = router;