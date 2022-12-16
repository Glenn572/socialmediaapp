const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/Usermodel");

//Update user

router.put("/:id", async (req, res) => {
  // if(req.body.userId === req.params.id || req.body.isAdmin){
  // if(req.body.password){  //password is compulsory to update any details
  //     try {
  //        const salt=await bcrypt.genSalt(5)
  //        req.body.password=await bcrypt.hash(req.body.password,salt)
  //     } catch (error) {
  //         return res.status(500).json("Error in password area")
  //     }
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findOneAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(user);
    } catch (error) {
      return res.status(403).json("Error in finding area");
    }
  }

  // else{
  //     return res.status(403).json("You can update only your account")
  // }
});

//Delete user

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } catch (error) {
    return res.status(404).json("500 Internal error");
  }
});
//Get a user
router.get("/", async (req, res) => {
  const userId = req.query["userId"];
  const username = req.query["username"];
  try {
    const findUser = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...others } = findUser._doc; //destructuring the documents
    res.status(200).json(others);
  } catch (error) {
    return res.status(404).json("500 Internal error");
  }
});

//get user's friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    return res.status(500).json( error);
  }
}); 
//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You are already following this user");
      }
    } catch (error) {
      res.status(500).json("500 Internal error");
    }
  } else {
    return res.status(403).json("You cannot follow yourself");
  }
});
//Unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You are not following this person");
      }
    } catch (error) {
      res.status(500).json("500 Internal error");
    }
  } else {
    return res.status(403).json("You cannot unfollow yourself");
  }
});

module.exports = router;
