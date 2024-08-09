const express = require('express');
const cors = require("cors");
const router = require('./lib/router');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const { password } = require('./lib/constraints');
const dotenv = require('dotenv').config();
const UserModel = require('./models/user');
const UserModelInstance = new UserModel();
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    methods: "GET,POST,PUT,DELETE",
    AccessControlAllowOrigin: '*',
    origin: 'http://localhost:3000',
    credentials: true
}));

const port = process.env.PORT || 5000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'ecommerce-app',
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    }
}))

let _ = {};

_.start = () => {
    try {
        app.listen(port);
        console.log(`Express server listening on ${port}`);
    } catch (error) {
        throw new Error(error);
    }
};

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async(id, done) => {
    try {
        console.log('deserialising user')
        const findUser = await UserModelInstance.findOneById(id);
        if(!findUser) throw new Error("User not Found");
        done(null, findUser);
    } catch (error) {
        done(err, null);
    }
});

passport.use('local',
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        console.log(`username: ${username}, password: ${password}`)
        try {
            const findUser = await UserModelInstance.findOneByEmail(username);
            if (!findUser) throw("User not found");
            const match = await bcrypt.compare(password, findUser.password);
            if (!match) { throw new Error('Invalid credentials'); }
            done(null, findUser);
        } catch (error) {
            done(error, null)
        }
    }));

  passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    // callbackURL: process.env.GOOGLE_CALLBACK_URL
    callbackURL: "http://localhost:5000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('google-strategy')
        const { id, displayName } = profile;
        let user = await UserModelInstance.findOneByGoogle(id);
        if (!user) {
            user = await UserModelInstance.create({ google: { id, displayName } });
          }
        console.log(user)
        return done(null, user);
    } catch(err) {
        return done(err);
    }
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CONSUMER_KEY,
    clientSecret: process.env.FACEBOOK_CONSUMER_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const { id, displayName } = profile;
        let user = await UserModelInstance.findOneByFacebook(id);
        if (!user) {
            user =  await UserModelInstance.create({ facebook: { id, displayName } });
          }
        return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));


app.use('/api', router);

_.start();