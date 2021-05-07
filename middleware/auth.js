const jwt = require('jsonwebtoken')


module.exports = (req , res , next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token , "THIS_IS_SOME_RANDOM_TEXT");
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user id'
        } else {
            next()
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request')
        })
    }
}