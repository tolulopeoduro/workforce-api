const Post = require('../models/post')

exports.getAllPosts = (req , res , next) => {
    Post.find().then(
        (posts) => {
            res.status(200).json(posts)
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error : error
            })
        }
    )
}


exports.getUserPosts = (req , res , next) => {
    Post.find({userId : req.params.id}).then(
        (posts) => {
            res.status(200).json(posts)
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error : error
            })
        }
    )
}

exports.getSinglePost = (req , res , next) => {
    Post.findOne({_id : req.params.id}).then(
        (post) => {
            res.status(200).json(post)
        }
    ).catch(
        (error) => {
            res.status(404).json({error : error})
        }
    )
}

exports.createPost = (req , res , next) => {
    const post = new Post({
        title : req.body.title,
        content: req.body.content,
        author : req.body.author,
        release_time : req.body.release_time,
        userId : req.body.userId
    });
    post.save().then(
        () => {
            res.status(201).json({message : "post creation successful"})
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error : error
            })
        }
    )
}

exports.editPost = (req , res , next) => {
    const post = new Post({
        _id: req.params.id,
        title : req.body.title,
        content: req.body.content,
        release_time : req.body.release_time,
        author : req.body.author,
        userId : req.body.userId
    })
    Post.updateOne({ _id : req.params.id} , post).then(
        () => {
            res.status(200).json({message : "updated successfully"})
        }
    ).catch(
        (error) => {
            res.status(400).json({error : error})
        }
    )
}

exports.deletePost = (req , res , next) => {
    console.log(req.body)
    Post.deleteOne({_id : req.params.id}).then(
        () => {
            res.status(200).json({message : "Deleted successfully "})
        }
    ).catch(
        (error) => {
            res.status(400).json({error : error})
        }
    )
}