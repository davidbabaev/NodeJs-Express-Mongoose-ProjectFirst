const {verifyToken} = require('./providers/jwt')

const auth = (req, res, next) => {
    // 1) get the token from header
    const token = req.header('x-auth-token');

    // 2) check if token exists
    if(!token){
        return res.status(401).send('No token provided')
    }

    // 3) verify the token is real
    const userData = verifyToken(token);

    // 4) check if verifications needed
    if(!userData){
        return res.status(401).send('Invalid token');
    }

    // 5) token i valid! attach user data to request
    req.user = userData; // now routes can access req.user._id
    next();
}

module.exports = auth;