const express = require("express");
const { addPost } = require("../controllers/post.js");
const Post = require("../models/post.js");
const db = require("../db");
const { NotFoundError, UnauthorizedError } = require("../expressError.js");
const { ensureLoggedIn, ensureCorrectUserOrAdmin } = require("../middleware/auth.js");

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
//NEW
router.get("/post/:id/update", async (req, res, next) => {
    try {
        const post = await Post.getPostForUpdate(req.params.id);
        return res.json({ post });
      } catch (err) {
        return next(err);
      }
});


router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.addPost(req.body);
        console.log("POST", post)
        console.log("USERLOCAL", res.locals.user)
        // if(!res.locals.user) return res.redirect("/")
        return res.status(201).json({post})
    } catch(err){
        return next(err)
    }
    
});

router.delete("/:id", ensureLoggedIn, async (req, res, next) => {
    try{
        await Post.removePost(req.params.id)
        return res.status(202).json({ deleted: +req.params.id })
    } catch(err){
        return next(err);
    }
});


router.patch("/post/:id/update", ensureLoggedIn, async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, jobUpdateSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
        
        // const post = await Post.getPostById(req.params.id);
        // console.log("POSTY", post)
        // console.log("USERLOCAL", res.locals.user)
        // if(!res.locals.user) throw new Error("NOT AUTH")
      const updatePost = await Post.update(req.params.id, req.body);
      console.log("UPDATEPOST", updatePost)
      return res.json({ success: updatePost });
    } catch (err) {
        console.log(err)
      return next(err);
    }
  });

module.exports = router;