const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError.js");


const postRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const { authenticateJWT } = require("./middleware/auth.js");

const app = express();


app.use(express.json())
app.use(cors());

app.use(authenticateJWT);


app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);




/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;