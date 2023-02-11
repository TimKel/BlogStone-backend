"use strict";

const { post } = require("superagent");
const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const moment = require("moment");


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
        `SELECT username, title, content, p.img, u.profile_img, cat, post_date
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

  static async addPost({title, content, img, post_date, cat, user_id}){
      const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
      const dateStamp = new Date()
    //   const date = dateStamp.toLocaleDateString(
    //     'en-us',
    //   {
    //     hour12: true,
    //     weekday: "short",
    //     hour: "2-digit",
    //     month: "long",
    //     year: "numeric",
    //     }
    // );

      const res = await db.query(
          `INSERT INTO posts
          (title, content, img, post_date, cat, user_id) 
          VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING title, content, img, post_date, cat, user_id`,
        [title,
            content,
            img,
            date,
            cat,
            user_id]
      );

        // INSERT INTO posts
        //   (title, content, img, post_date, cat, user_id) 
        //   VALUES ($1, $2, $3, $4, $5, $6)
        //   WHERE user_id=user.id
        //     RETURNING title, content, img, post_date, cat, user_id

        // INSERT INTO posts (column1, column2, column3, ...)
        // SELECT id
        // FROM users
        // WHERE condition;
      console.log("RES", res.rows[0])

      const newPost = res.rows[0];

      return newPost;
  }

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE posts 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                title, 
                                content, 
                                img,
                                cat`;
    const result = await db.query(querySql, [...values, id]);
    const post = result.rows[0];

    if (!post) throw new NotFoundError(`No post: ${id}`);

    return post;
  }

}

module.exports = Post;

