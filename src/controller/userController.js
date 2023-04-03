const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.addUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
        return res.status(400).json({ error: "Enter all required field" });

    User.findOne({ email }).then((user) => {
        if (user) return res.status(400).json({ error: "User already exist" });

        const hashPassword = bcrypt.hashSync(password, 3);
        const _user = User({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
        _user
            .save()
            .then(() => res.status(200).json({ message: "User added" }))
            .catch((error) => res.status(400).json({ error: error.message }));
    });
};
