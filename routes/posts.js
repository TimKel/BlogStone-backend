const express = require("express");
const { addPost } = require("../controllers/post.js");
const Post = require("../models/post.js");
const db = require("../db");
const { NotFoundError } = require("../expressError.js");

const router = express.Router()

// router.get("/", (req, res) => {
//     res.json("this works now")
// });

// router.get("/", async (req, res, next) => {
//     // const q = req.query.cat
//     try {
//         // const validator = jsonschema.validate(q, companySearchSchema);
//         // if (!validator.valid) {
//         //   const errs = validator.errors.map(e => e.stack);
//         //   throw new BadRequestError(errs);
//         // }
        
//         const posts = await Post.getAllPosts();
//         return res.json({ posts });
//       } catch (err) {
//         return next(err);
//       }
// });

//Trial #1
// router.get("/", async (req, res, next) => {
//     try{
//         const q = req.query.cat 
//         ? "SELECT * FROM posts WHERE cat = $1::text"
//         : "SELECT * FROM posts"
//         console.log("Q", q)
//         const postRes = await db.query(q, [req.query.cat]);
//         console.log("POSTRES", postRes)
//         const posts = postRes.rows;

//         if (!posts) throw new NotFoundError(`No posts under ${q}`)

//         return posts;
//     }catch(err){
//         return next(err);
//     }
// })


//Trial #2
router.get("/", async (req, res, next) => {
    // const q = req.query.cat

    // if (q !== undefined){
    //     const postsByCat = await Post.getPostsByCat();
    //     console.log(postsByCat);
    //     return res.json({ postsByCat });
    // } else{
    //     const posts = await Post.getAllPosts();
    //     return res.json({ posts });
    // }
    try {
        // const validator = jsonschema.validate(q, companySearchSchema);
        // if (!validator.valid) {
        //   const errs = validator.errors.map(e => e.stack);
        //   throw new BadRequestError(errs);
        // }
        const q = req.query.cat
        console.log("query", req.query);
        console.log("Query2", JSON.stringify(req.query.cat))
        if (q !== undefined){
            const postsByCat = await Post.getPostsByCat(q);
            console.log("QUERY", q)
            console.log("POSTCAT", postsByCat);
            return res.json({ postsByCat });
        } else{
            const posts = await Post.getAllPosts();
            console.log("ALLPOST", posts )
            return res.json({ posts });
        }
      } catch (err) {
        return next(err);
      }
});



router.get("/:id", async (req, res, next) => {
    try {
        const post = await Post.getPostById(req.params.id);
        return res.json({ post });
      } catch (err) {
        return next(err);
      }
});


router.post("/", (req, res) => {
    
});

router.delete("/:id", (req, res) => {
    
});

router.patch("/:id", (req, res) => {
    
});

module.exports = router;