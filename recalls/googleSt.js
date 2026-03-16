const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../src/users/models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8181/auth/google/callback"
}, 
    async(accessToken, refreshToken, profile, done) => {
        try{
            const user = await User.findOne({email})
            if(done){
                
            }
        }
        catch(err){

        }
}))




// belogs in the route:
// scope: ['name', 'email']