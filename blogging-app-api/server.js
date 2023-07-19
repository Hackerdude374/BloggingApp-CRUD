const express = require("express");
const app = express();
const port = 6000;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { Post, Comment, User } = require("./models");
require("dotenv").config();
app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, 
      },
    })
  );
//---------------------------------authenticate user------------------------
const authenticateUser = (req, res, next) => {
    //if not logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: "You must be logged in to view this page." });
    }
    next();
  };


app.get("/", (req, res) => {
  res.send("Welcome to the Blog application using CRUD");
});
//POSTS-------------------------------------------
// Get all the posts
app.get("/posts", authenticateUser, async (req, res) => {
    try {
      const allPosts = await Post.findAll();
  
      res.status(200).json(allPosts);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  // Get a specific Post
app.get("/posts/:id", authenticateUser, async (req, res) => {
    const postId = parseInt(req.params.id, 10);
  try {
      const Post1 = await Post.findOne({ where: { id: postId } });
    if (Post1) {
        res.status(200).json(Post1);
      } else {
        res.status(404).send({ message: "error: Post not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

// Create new post
app.post("/posts", authenticateUser, async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.userId;

    // Create the new post with the UserId set to the user's ID
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      UserId: userId,
    });

    res.status(201).json(newPost);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Update specific post
app.patch("/posts/:id", authenticateUser, async (req, res) => {
    const postId = parseInt(req.params.id, 10);
  
    try {
      const record = await Post.findOne({ where: { id: postId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this post" });
      }
  
      const [numberOfAffectedRows, affectedRows] = await Post.update(req.body, {
        where: { id: postId },
        returning: true,
      });
  
      if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });
  
  // Delete a specific Post
app.delete("/posts/:id", authenticateUser, async (req, res) => {
    const postId = parseInt(req.params.id, 10);
  
    try {
      const record = await Post.findOne({ where: { id: postId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }
  
      const deleteOp = await Post.destroy({ where: { id: postId } });
  
      if (deleteOp > 0) {
        res.status(200).send({ message: "Post deleted successfully" });
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  //COMMENTS---------------------------
  // post a comment
app.post("/comments", authenticateUser, async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
  
      res.status(201).json(newComment);
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });


  // Get all comments
app.get("/comments", authenticateUser, async (req, res) => {
    try {
      const allcomments = await Comment.findAll();
  
      res.status(200).json(allcomments);
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  // Get a specific comment
app.get("/comments/:id", authenticateUser, async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
  
    try {
      const comment = await Comment.findOne({ where: { id: commentId } });
  
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).send({ message: "Comment not found" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });
  // Update a specific comment
app.patch("/comments/:id", authenticateUser, async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
   try {
      const record = await Comment.findOne({ where: { id: commentId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform that action." });
      }
  
      const [numberOfAffectedRows, affectedRows] = await Comment.update(
        req.body,
        { where: { id: commentId }, returning: true }
      );
    if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
      } else {
        res.status(404).send({ message: "Comment not found" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      res.status(500).send({ message: err.message });
      console.error(err);
    }
  });
  // Delete a specific comment
app.delete("/comments/:id", authenticateUser, async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
  
    try {
      const record = await Comment.findOne({ where: { id: commentId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform that action." });
      }
  
      const deleteOp = await Comment.destroy({ where: { id: commentId } });
  
      if (deleteOp > 0) {
        res.status(200).send({ message: "Comment deleted successfully" });
      } else {
        res.status(404).send({ message: "Comment not found" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });
  //------------------------------login details-------------------------------------------
  //signUp
  app.post("/signup", async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
  
    try {
      const user = await User.create({ //json format: name, email, and password
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      });
      req.session.userId = user.id;
      // Send a response to the client informing them that the user was successfully created
      res.status(201).json({
        message: "User created",
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(422)
          .json({ errors: error.errors.map((e) => e.message) });
      }
      res.status(500).json({
        message: "Error occurred while creating user",
        error: error,
      });
    }
  });
  //login using credentials--------------------------------------------- (name email and pass)
  app.post("/login", async (req, res) => {
    try {
      // find user by email
      const user = await User.findOne({ where: { email: req.body.email } });
  
      if (user === null) {
        // user not found
        return res.status(401).json({
          message: "unknown credentials",
        });
      }
  
      // if user found, use bcrypt to check if password matches hashed password
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (result) {
          // Passwords match, create session
          req.session.userId = user.id;
          res.status(200).json({
            message: "Logged in successfully",
            user: {
              name: user.name,
              email: user.email,
            },
          });
        } else {
          // Passwords don't match
          res.status(401).json({ message: "Incorrect password" });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred during the login process" });
    }
  });
//logout (destroy session)
app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    
    return res.status(200).json({ message: "Logout successful" });
  });
});

//----------------------------------------------------------
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});