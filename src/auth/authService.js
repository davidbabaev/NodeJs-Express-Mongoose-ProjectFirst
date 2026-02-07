const {verifyToken} = require('./providers/jwt');

const auth = (req, res, next) => {
    try{
        const token = req.header('auth-token')
        if(!token){
            return res.status(401).send('No token provided')
            // without return the code keeps going.
        }
        const decoded = verifyToken(token)
        // req.user = decoded;
        next()
    }
    catch(err){
        res.status(401).send('Auth token invalid')
    }
}

module.exports = auth;