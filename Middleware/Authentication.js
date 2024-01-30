const jwt = require('jsonwebtoken');
const { User } = require('../Model/model');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('../config/config');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = () => {
    const strategy = new Strategy(params, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);

            if (!user) {
                console.error('User Not Found');
                return done(null, false);
            } else if (payload.expire <= Date.now()) {
                console.error('Token Expired');
                return done(null, false);
            } else {
                console.log('User authenticated:', user);
                return done(null, user);
            }
        } catch (error) {
            console.error('Error in authentication:', error);
            return done(error, false);
        }
    });

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
    };
};
