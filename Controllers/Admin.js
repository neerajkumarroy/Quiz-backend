require("dotenv").config();
const AdminModel = require('../Models/Admin.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Add this to hash passwords
const KEY = process.env.KEY;

// This is the Signup API
const AdminSignup = async (req, res) => {
    const { password, ...payload } = req.body;

    // Hashing the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = new AdminModel({ ...payload, password: hashedPassword });

    try {
        let result = await data.save();
        result = result.toObject();
        delete result.password;

        jwt.sign({ result }, KEY, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                res.status(500).send("Something went wrong, please try again...");
            } else {
                res.status(200).send({ result, auth: token });
            }
        });
    } catch (error) {
        res.status(500).send("Something went wrong, please try again...");
    }
};

// This is the Login API
const AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        let user = await AdminModel.findOne({ email });
        if (user) {
            // Compare hashed password with the provided password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                user = user.toObject();
                delete user.password;
                jwt.sign({ user }, KEY, { expiresIn: '2h' }, (err, token) => {
                    if (err) {
                        res.status(500).send("Something went wrong, please try again...");
                    } else {
                        res.status(200).send({ user, auth: token });
                    }
                });
            } else {
                res.status(400).send({ result: "Invalid credentials" });
            }
        } else {
            res.status(400).send({ result: "User not found" });
        }
    } else {
        res.status(400).send({ result: "Please provide email and password" });
    }
}

module.exports = { AdminSignup, AdminLogin };
