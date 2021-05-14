const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req , res , next) => {
    User.findOne({email : req.body.email}).then(
        (user) => {
            if (user) {
                return res.status(401).json({message : `${req.body.email} has already been used`})
            } else {
                User.findOne({username : req.body.username}).then(
                    (user) => {
                        if (user) {
                            return res.status(401).json({message : `${req.body.username} has already been used`})
                        } else {
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
                                                message : `could'nt sign you up at the moment, please try again` 
                                            })
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {
                                    res.status(500).json({
                                        message : `could'nt sign you up at the moment, please try again` 
                                    })
                                }
                            )
                        }
                    }
                )
            }
        }
    )
    /**/
    
}

exports.auth = (req , res , next) => {
    const decodedToken = jwt.verify(req.headers.authorization , 'secret')
    if (Date.now() >= decodedToken.exp * 1000) {
        return res.status(401).json({message : 'token not verified'})
      }
    res.status(200).json({message : 'token verified'})
}


exports.signin = (req , res , next) => {
    User.findOne({ email : req.body.email}).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    message : 'invalid username'
                })
            }
            bcrypt.compare(req.body.password , user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            message : 'invalid password'
                        })
                    }
                    const token = jwt.sign(
                        {userId : user.id},
                        'secret',
                        { expiresIn : '24h' }
                    )
                    res.status(200).json({
                        userId : user._id,
                        token : token,
                        username : user.username
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        message : 'network error'
                    })
                }
            )
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message : 'network error'
            })
        }
    )

}

exports.getOneUser = ((req , res , next) => {
    User.findById(req.params.id).then(
        (user) => {
            res.status(200).json({
                email : user.email,
                username : user.username,
                bio : user.bio,
                profilePicSrc: user.profilePicSrc
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({error : error})
        }
    )
})