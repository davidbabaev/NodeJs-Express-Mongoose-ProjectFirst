
const auth = (req, res, next) => {
    if(req.header('x-auth-token')){
        console.log('this user is authenticated');
        next();
        // if the user have token we move to the next middlware 
    }
    else{
        console.log('this user is not authenticated');
        res.status(401).send('user in not authorized');
    }
}

module.exports = auth;
