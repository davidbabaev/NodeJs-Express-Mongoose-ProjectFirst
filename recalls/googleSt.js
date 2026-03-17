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
        const user = await User.findOne({googleId: profile.id})
        const fullName = profile.displayName.split(' ')

        if(!user){
            const newUser = new User({
                googleId: profile.id,
                name: fullName[0],
                lastName: fullName[1],
                email: profile.emails?.[0].value,
                profilePicture: profile.photos?.[0].value
            })
            await newUser.save();
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