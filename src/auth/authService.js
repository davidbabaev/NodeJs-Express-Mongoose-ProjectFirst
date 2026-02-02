const auth = (req, res, next) => {
    // 1) check it the header exists
    if(req.header('x-auth-token')){
        // 2) token exists --> let them through
        console.log('user is authenticated');
        next()
    }
    // 3) no token --> block them
    console.log('user is not authenticated');
    res.status(401).send('User is not authorized')
}

module.exports = auth;