const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.addUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
        return res.status(400).json({ error: "Enter all required field" });

    User.findOne({ email }).then((u) => {
        if (u) return res.status(400).json({ error: "User already exist" });

        const hashPassword = bcrypt.hashSync(password, 3);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
        user.save()
            .then(() => res.status(200).json({ message: "User added" }))
            .catch((error) => res.status(400).json({ error: error.message }));
    });
};

exports.signinUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: "Enter all required field" });

    User.findOne({ email }).then((u) => {
        if (!u) return res.status(400).json({ error: "User dose not exist" });

        bcrypt.compare(password, u.password).then((result) => {
            if (result) {
                const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET);
                return res
                    .status(200)
                    .json({ token, id: u._id, message: "Login sucsses" });
            } else return res.status(400).json({ error: "Invalid Inputs" });
        });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.findByIdAndRemove(id)
        .then(() => {
            return res.status(200).json({ message: "User Removed" });
        })
        .catch((error) => {
            return res.status(400).json({ error: error.message });
        });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .then((u) => {
            u.password = undefined;
            const user = u;

            return res.status(200).json({ user });
        })
        .catch((error) => {
            return res.status(400).json({ error: error.message });
        });
};

exports.changeUserById = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email)
        return res.status(400).json({ error: "Enter all required field" });

    User.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true })
        .then((u) => {
            return res.status(200).json({
                message: "User updated",
                user: {
                    firstName: u.firstName,
                    lastName: u.lastName,
                    email: u.email,
                },
            });
        })
        .catch((error) => {
            return res.status(400).json({ error: error.message });
        });
};
