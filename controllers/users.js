const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req , res , next) => {
    bcrypt.hash(req.body.password , 10).then(
        (hash) => {
            const user = new User({
                email : req.body.email,
                username : req.body.username,
                bio: req.body.bio,
                password: hash,
                profilePicSrc : req.body.profilePicSrc
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message : 'User added'
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error : error
                    })
                }
            )
        }
    )
}


exports.signin = (req , res , next) => {
    User.findOne({ email : req.body.email}).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error : new Error('User not found')
                })
            }
            bcrypt.compare(req.body.password , user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error : new Error('incorrect password')
                        })
                    }
                    const token = jwt.sign(
                        {userId : user.id},
                        "THIS_IS_SOME_RANDOM_TEXT",
                        { expiresIn : '24h' }
                    )
                    res.status(200).json({
                        userId : user._id,
                        token : token
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error : error
                    })
                }
            )
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error : error
            })
        }
    )

}