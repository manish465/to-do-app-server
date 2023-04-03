const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const checkAuth = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.slice(7);

    if (!token) return res.status(400).json({ error: "Invelid Auth" });

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) return res.status(400).json({ error: error.message });

        User.findById(decoded.id)
            .then((u) => {
                if (!u) return res.status(400).json({ error: "Invelid Auth" });
                u.password = undefined;
                req.user = u;

                next();
            })
            .catch((error) => {
                return res.status(400).json({ error: error.message });
            });
    });
};

module.exports = checkAuth;
