const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
require('./passport');
const PORT = 5000;
const authRoute = require('./routes/auth');
require('./config/mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieSession({
    name: "session",
    keys: ["anisha"],
    maxAge: 24 * 60 * 60 * 100,
}));

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.use(session({
    secret: "authenticate",
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieParser('authenticate'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})