const requireAdminAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        if (!user.IsAdmin) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
