const { Utilisateur } = require('../models/utilisateur.js');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Utilisateur.findOne({_id: jwt_payload.id})
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => {
                return done(err, false);
            });
    }));
}
