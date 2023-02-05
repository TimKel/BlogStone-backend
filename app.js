const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { NotFoundError } = require("./expressError.js");
const multer = require("multer");

const postRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");

const app = express();


app.use(express.json())
app.use(cors());
app.use(cookieParser());

const upload = multer({ dest: './uploads/' })
app.post('/upload', upload.single('img'), function (req, res, next){
  res.status(200).json("Image has been uploaded")
})
//!!IF NEEDED, 1:24::

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