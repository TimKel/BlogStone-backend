const express = require("express");

const Post = require("../models/post.js");
const db = require("../db");
const { NotFoundError, UnauthorizedError } = require("../expressError.js");
const { ensureLoggedIn, ensureCorrectUserOrAdmin } = require("../middleware/auth.js");

const router = express.Router()

/* Retrieves ALL posts upon homepage if query is blank
*  or retrieve all posts by Category
*  
*  Returns { title, content, image, category, user_id }
*  
*  Throws NotFoundError if no posts
*/

router.get("/", async (req, res, next) => {
    
    try {
        
        const q = req.query.cat
        
        if (q !== undefined){
            const postsByCat = await Post.getPostsByCat(q);

            return res.json({ postsByCat });
        } else{
            const posts = await Post.getAllPosts();
            
            return res.json({ posts });
        }
      } catch (err) {
        return next(err);
      }
});

/* Retrieves posts by ID
*  
*  Returns { title, content, image, category, user_id }
*  
*  Throws NotFoundError if no post
*/


router.get("/:id", async (req, res, next) => {
    try {
        const post = await Post.getPostById(req.params.id);
        
        return res.json({ post });
      } catch (err) {
        return next(err);
      }
});

/* Retrieves post by ID for update
*  
*  Returns { title, content, image, category, user_id }
*  
*  Throws NotFoundError if no post
*/
router.get("/post/:id/update", async (req, res, next) => {
    try {
        const post = await Post.getPostForUpdate(req.params.id);
        console.log("GETUPDATEPOSTHERE", post)
        return res.json({ post });
      } catch (err) {
        return next(err);
      }
});

/* Create posts and saves to database attached to users_id
*  Image form field left blank will autogenerate an image
*  
*  Returns { title, content, image, category, user_id }
*/

router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.addPost(req.body);
      
        return res.status(201).json({post})
    } catch(err){
        return next(err)
    }
    
});

// Permanently removes post from database.
// Only logged in users can delete. Success alert sent to user.

router.delete("/:id", ensureLoggedIn, async (req, res, next) => {
    try{
        await Post.removePost(req.params.id)

        return res.status(202).json({ deleted: +req.params.id })
    } catch(err){
        return next(err);
    }
});

/* Update users post.
*   Users can only update their own posts
*   Returns { title, content, image, category, user_id }
*   Also returns username but is removed before submitted
*   Unauthorized users that try to access update page are alerted and taken back to "/"
*/

router.patch("/post/:id/update", ensureLoggedIn, ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        
      const updatePost = await Post.update(req.params.id, req.body);
      
      return res.json({ success: updatePost });
    } catch (err) {
        
      return next(err);
    }
  });

module.exports = router;