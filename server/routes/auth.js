const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../model/users');
const CLIENT_URL = 'http://localhost:3000/';
const bcrypt = require('bcryptjs');


router.get('/login/success', (req, res) => {
    console.log("req",req)
    if (req.user) {
        res.status(200).json({
            success: true,
            msg: "successful",
            user: req.user,
        })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        msg: "failure"
    })
})

router.get('/logout', (req, res) => {;
    req.logout();
    res.redirect(CLIENT_URL);
})

// local
router.post('/locallogin', (req, res, next) => {
 
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(201).send("No user found");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.status(200).send("successfully authenticated");
            })
        }
    })(req, res, next);
})


router.post('/register', async (req, res) => {
    try {
        if (req.body.password != req.body.confirmPassword) {
           return  res.status(201).send("password didnot match");
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newuser = { username: req.body.username, email: req.body.email, password: hashedPassword };
        
            await User.create(newuser);
            return res.status(200).send("user created successfully");
        } else {
            return res.status(201).send("user already exists");
        }
    } catch (err) {
        console.log("error in finding the user in sigining up")
    }

})




// google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: "/login/failed"
}),
    function (req, res) {
        res.redirect(CLIENT_URL)
    }
);


// github
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: "/login/failed"
}),
    function (req, res) {
        res.redirect(CLIENT_URL)
    }
);

// facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }));

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: "/login/failed"
}),
    function (req, res) {
        res.redirect(CLIENT_URL)
    }
);

module.exports = router;