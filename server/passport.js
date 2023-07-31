const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./model/users');

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const GOOGLE_CLIENT_ID = '959818041316-5ovvcs1klpkcm8uiq895jk3uvmorblpn.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const GITHUB_CLIENT_ID = 'a2b59cfbc4fba56ef40a'
const GITHUB_CLIENT_SECRET = 'bb3db1f1a2ee0506b67db156848efc0a55df1432'
const FACEBOOK_APP_ID = '816616346509412'
const FACEBOOK_APP_SECRET = 'be12fc423727fa91757b3deaccf9f225'


// local
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {
        // console.log("strategy0");
        try {
            console.log("strategy")
            const user = await User.findOne({ email: email });
            // console.log("strategy2", user);
            if (!user) {
                return done(null, false);
            }
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                return done(null, user)
            }
            return done(null, false)
        } catch (err) {
            console.log("err in logging user");
            return done(err);
        }


    }
));


// google
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        done(null, profile)
        // const user = {
        //     username: profile.displayName,
        //     avatar: profile.photos[0],
        // };

    }
));

// github
passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log("github")
        done(null, profile)
        // const user = {
        //     username: profile.displayName,
        //     avatar: profile.photos[0],
        // };

    }
));

// Facebook
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        done(null, profile)
        // const user = {
        //     username: profile.displayName,
        //     avatar: profile.photos[0],
        // };

    }
));
passport.serializeUser((user, done) => {
    // console.log("serialize");
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null,user)
})