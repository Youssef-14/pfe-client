const Roles = {
    Admin: 'Admin',
    User: 'Utilisateur'
}

const inRole = (...roles) => (req, res, next) => {
    const role = roles.find(role => req.user.Role === role);
    if (!role) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

module.exports = {
    Roles,
    inRole
}
