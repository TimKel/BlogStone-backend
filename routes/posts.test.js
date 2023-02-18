"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const Post = require("../models/post");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require("./testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /posts */

describe("GET /posts", function () {
    test("gets all posts", async function () {
        const resp = await request(app)
            .get("/posts")
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toMatchObject({"posts": 
            [{"cat": "cinema", "content": "Testing content description of Post", 
            "id": expect.any(Number), "img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2luZW1hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", 
            "post_date": expect.any(String), 
            "title": "Test title of Post", "user_id": 1}, 
            {"cat": "art", "content": "Testing content description of Second Post", 
            "id": expect.any(Number), "img": "https://images.unsplash.com/photo-1645680827507-9f392edae51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", 
            "post_date": expect.any(String), "title": "Test title of Second Post", 
            "user_id": 2}]})
    });

    test("GET /:id gets Single post", async function () {
        const resp = await request(app)
            .get("/posts/1")
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toMatchObject({"post": 
            {"cat": "cinema", 
            "content": "Testing content description of Post", 
            "img": expect.any(String), 
            "post_date": expect.any(String), 
            "profile_img": expect.any(String), 
            "title": "Test title of Post", 
            "username": "u1"}})
    });

    test("GET /post/:id/update", async function () {
        const resp = await request(app)
            .get("/posts/post/1/update")
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toMatchObject({"post": 
            {"cat": "cinema", 
            "content": "Testing content description of Post", 
            "img": expect.any(String), 
            "post_date": expect.any(String), 
            "title": "Test title of Post"}})
    })
});

/************************************** POST /posts */

describe("POST /posts", function (){
    test("adds new post", async function(){
        const resp = await request(app)
            .post("/posts/")
            .send({
                title: "TEST POST",
                content: "Test content",
                img: "",
                post_date: "",
                cat: "science",
            })
            .set("authorization", `Bearer ${u1Token}`);
            expect(resp.statusCode).toEqual(201);
            expect(resp.body).toEqual({
                "post": 
            {"cat": "science", 
            "content": "Test content", 
            "id": 3,
            "img": expect.any(String), 
            "post_date": expect.any(String), 
            "title": "TEST POST",
            "user_id": null,}
            });
    })

    test("blocks user w/o token from posting", async function(){
        const resp = await request(app)
            .post("/posts/")
            .send({
                title: "TEST POST",
                content: "Test content",
                img: "",
                post_date: "",
                cat: "science",
            })
            // .set("authorization", `Bearer ${noToken}`);
            expect(resp.statusCode).toEqual(401);
    })
})

/************************************** DELETE /posts */

describe("DELETE /posts/:id", function () {
    test("logged in user can delete OWN post", async function () {
        const resp = await request(app)
            .delete("/posts/1")
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(202);
    })
    //NOTE: Delete button is not shown via front end to users
    // that hold differnet token or not logged in

    test("can't delete post if logged out", async function () {
        const resp = await request(app)
            .delete("/posts/1")
            // .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(401);
    })
});

/************************************** PATCH /posts */

describe("PATCH /posts/post/:id/update", function(){
    test("logged in user can update OWN post", async function () {
        const resp = await request(app)
            .patch("/posts/post/1/update")
            .send({
                title: "NEW TITLE"
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({"success": 
        {"cat": "cinema", 
        "content": "Testing content description of Post", 
        "id": 1,
        "img": expect.any(String), 
        "title": "NEW TITLE"}})
    })

    test("Not logged in user can't update posts", async function () {
        const resp = await request(app)
            .patch("/posts/post/1/update")
            .send({
                title: "NEW TITLE"
            })
            // .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(401)
    })
})