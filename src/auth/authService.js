const {verifyToken} = require('./providers/jwt');

const auth = (req, res, next) => {
    try{
        const token = req.header('auth-token')
        if(!token){
            return res.status(401).send('no token exist');
        }

        const decoded = verifyToken(token);
        
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).send(err.message);
    } 
}

module.exports = auth;