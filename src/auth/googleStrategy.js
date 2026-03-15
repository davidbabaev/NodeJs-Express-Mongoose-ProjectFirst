const passport = require('passport');
// give me the whole package, then gran just .Strategy from it
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../users/models/User');

passport.use(new GoogleStrategy({
    // config object - your credentials
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8181/auth/google/callback"
},

async (accessToken, refreshToken, profile, done) => {
    // callback - what to do with the user Google returns
    try{
        const user = await User.findOne({googleId: profile.id})
        const fullName = profile.displayName.split(' ');
        
        if(!user){
            const newUser = await new User({
                googleId: profile.id,
                name: fullName[0],
                lastName: fullName[1],
                email: profile.emails[0].value,
                profilePicture: profile.photos[0].value,
            }).save();
    
            return done(null, newUser)
        }
        else{
            return done(null, user)
        }
    }
    catch(err){
        return done(err)
    }
}))