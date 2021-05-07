const Post = require('../models/post')

exports.getAllPosts = (req , res , next) => {
    Post.find().then(
        (posts) => {
            res.status(200).json(posts)
        }
    ).catch(
        (error) => {
            res.status(500).json({error : error })
        }
    )
    next()
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
    next()
}

exports.createPost = (req , res , next) => {
    const post = new Post({
        title : req.body.title,
        content: req.body.content,
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
    next()
}

exports.editPost = (req , res , next) => {
    const post = new Post({
        _id: req.params.id,
        title : req.body.title,
        content: req.body.content,
        release_time : req.body.release_time,
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
    next()
}

exports.deletePost = (req , res , next) => {
    Post.deleteOne({_id : req.params.id}).then(
        () => {
            res.status(200).json({message : "Deleted successfully "})
        }
    ).catch(
        (error) => {
            res.status(400).json({error : error})
        }
    )
    next()
}