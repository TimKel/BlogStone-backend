"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

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

/************************************** POST /users */

describe("GET /users/:username", function () {
    test("works for same user", async function () {
      const resp = await request(app)
          .get(`/users/u1`)
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.body).toEqual({
        user: {
          id: 1,
          username: "u1",
          email: "user1@gmail.com"
        },
      });
    });

    test("unauth for other users", async function () {
        const resp = await request(app)
            .get(`/users/u1`)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(401);
      });

      test("unauth for anon", async function () {
        const resp = await request(app)
            .get(`/users/u1`);
        expect(resp.statusCode).toEqual(401);
      });

      test("not found if user not found", async function () {
        const resp = await request(app)
            .get(`/users/nope`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
      });

});