//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://lynn062504:lynn062504@blog-01.bkub9.mongodb.net/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const homeStartingContent = "Welcome to my place and enjoy yourself!";
const aboutContent = "As you can see, you can call me Lynn. I'm from Malaysia, staying in Singapore now. Also I'm a newbie in Web Development. I am trying my best to practice what I have learn for this half year past, creating fews projects and looking for a Front-end / Web Developer job. Hopefully I can be a builder to create creative works in future.";
const contactContent = "Except for leaving a comment under a post. Also feel free to contact me through E-mail, LinkedIn and GitHub";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const currentDate = new Date;
const currentYear = currentDate.getFullYear();

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/comment", function(req, res) {
  res.render("received-comment");
});


const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

//detech document's object id as postId
app.get("/posts/:postId", function(req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({
    _id: requestedPostId
  } , function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
