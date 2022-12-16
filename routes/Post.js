const router = require("express").Router();
const Post = require("../models/PostModel");
const User = require("../models/UserModel");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json("500 Internal error");
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You cannot update others post");
    }
  } catch (error) {
    return res.status(500).json("500 Internal error");
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("You cannot delete others post");
    }
  } catch (error) {
    return res.status(500).json("500 Internal error");
  }
});
//like a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been disliked");
    }
  } catch (error) {
    return res.status(500).json("500 Internal error");
  }
});
//get a like

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json("500 Internal Error");
  }
});
//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  const currentUser = await User.findById(req.params.userId);
  const userPosts = await Post.find({ userId: currentUser._id });
  const friendPosts = await Promise.all(
    currentUser.following.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.status(200).json(userPosts.concat(...friendPosts));
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json("500 Internal Error");
  }
});
module.exports = router;
