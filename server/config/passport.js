const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../db/user-model')

passport.serializeUser((user,done)=>{
    console.log('serializing user: '+user)
    done(null,user)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then(()=>{
        done(null,id)
    })
    
})

passport.use(
    new GoogleStrategy({
        //options for google Strategy
        callbackURL:'/auth/google/callback',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    }, (accessToken,refreshToken,profile,done)=>{
        //passport callback function
        console.log(profile)
        User.findOne({
            gid:profile.id,
            strategy:'google'
        }).then((foundUser)=>{
            if(foundUser){
                //existing user found
                console.log('user is: '+foundUser)
                done(null,foundUser)
            }
            else{
                new User({
                    name:{
                        first:profile.name.givenName,
                        last:profile.name.familyName
                    },
                    gid:profile.id,
                    strategy:'google'
                }).save().then((NewUser)=>{
                    console.log("created new user " + NewUser)
                    done(null,NewUser)
                })
            }
        })
    })
)