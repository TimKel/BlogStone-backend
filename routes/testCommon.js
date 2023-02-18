"use strict";

const db = require("../db.js")
const User = require("../models/user");
const Post = require("../models/post");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll(){

    // await db.query("DROP DATABASE blogstone_test")
    // await db.query("CREATE DATABASE blogstone_test")
   
    
    // await db.query("\i blogstone-schema.sql")

    await db.query("DELETE FROM users");

    await db.query("DELETE FROM posts");

    await db.query("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE posts_id_seq RESTART WITH 1")

    // let user1 = await db.query("SELECT id FROM users WHERE username = 'u1'")
    // let user2 = await db.query("SELECT id FROM users WHERE username = 'u2'")
    // console.log("USER1", user1)
    await User.register({
        
        username: "u1",
        email: "user1@gmail.com",
        password: "password1"
    });
    await User.register({
        
        username: "u2",
        email: "user2@gmail.com",
        password: "password2"
    });
    await User.register({
        
        username: "u3",
        email: "user3@gmail.com",
        password: "password3"
    });

    await Post.addPost({
        title: "Test title of Post",
        content: "Testing content description of Post",
        img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2luZW1hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        post_date: "",
        cat: "cinema",
        user_id: 1
    });
    await Post.addPost({
        title: "Test title of Second Post",
        content: "Testing content description of Second Post",
        img: "https://images.unsplash.com/photo-1645680827507-9f392edae51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        post_date: "",
        cat: "art",
        user_id: 2
    });
}

async function commonBeforeEach(){
    await db.query("BEGIN");
};

async function commonAfterEach(){
    await db.query("ROLLBACK");
};

async function commonAfterAll(){
    await db.end();
};

const u1Token = createToken({username: "u1"});
const u2Token = createToken({username: "u2"});
const u3Token = createToken({username: "u3"});

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    u3Token,
};