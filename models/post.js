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

    const q = req.query.cat `SELECT *
                            FROM posts
                            WHERE cat = ${cat}`
                                
    const postRes = await db.query(q, [req.query.cat]);

    const posts = postRes.rows;

    if (!posts) throw new NotFoundError(`No posts with category: ${cat}`);

    return posts;
  }

  static async getAllPosts(){
      let q = `SELECT * FROM posts`;

      const res = await db.query(q);
      console.log(res);

      const postRes = res.rows;

    //   if(!postRes) throw new NotFoundError(`No current posts. Post something!`);
    
      return postRes;
  }

}

module.exports = Post;

