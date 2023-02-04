"use strict";

const { post } = require("superagent");
const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");



/** Related functions for companies. */

class Post {
/** Given a post category, return posts by category.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

 static async getPostsByCat(cat) {

    const q = `SELECT *
                FROM posts
                WHERE cat = $1::text`
                              
                                
    const postRes = await db.query(q, [cat]);
    // console.log("POSTRES", postRes);

    const posts = postRes.rows;

    if (!posts) throw new NotFoundError(`No posts with category: ${cat}`);

    return posts;
  }

  static async getAllPosts(){
    let q = `SELECT * FROM posts`;

    const res = await db.query(q);
    console.log(res);

    const postRes = res.rows;

    if(!postRes) throw new NotFoundError(`No current posts. Post something!`);
    
    return postRes;
  }

  static async getPostById(id){
    // const getPost = await db.query(
    //       `SELECT * FROM posts 
    //       WHERE id = $1`, [id]);

    const getPost = await db.query(
        `SELECT username, title, content, p.img, u.img AS userImg, cat, post_date
        FROM users u 
        JOIN posts p ON u.id = p.user_id
        WHERE p.id = $1`, [id]
    )
    
    const post = getPost.rows[0];

    if(!post) throw new NotFoundError(`Oops! This post may have been deleted or moved.`)
    
    return post;
  }

  static async removePost(id){
      const res = await db.query(
          `DELETE FROM posts
          WHERE id = $1
          RETURNING id`, [id]
      )

      const post = res.rows[0];

      if(!post) throw new NotFoundError(`No post to delete with id of ${id}`)
  }

}

module.exports = Post;

