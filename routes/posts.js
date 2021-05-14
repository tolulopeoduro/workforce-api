const express = require('express');
const postCtrl = require("../controllers/posts")
const auth = require("../middleware/auth")

const router = express.Router()

router.get("/" , postCtrl.getAllPosts)
router.get("/userposts/:id" , postCtrl.getUserPosts)
router.get("/:id" , postCtrl.getSinglePost)
router.post("/"  , postCtrl.createPost)
router.put("/:id" , postCtrl.editPost)
router.delete("/:id", auth , postCtrl.deletePost)


module.exports = router;