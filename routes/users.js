const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken'); //use to create, verify, and decode tokens
const bcrypt = require('bcryptjs'); //use to hash passwords
const secret = require('../config').secret; //contains secret key used to sign tokens
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");
const isAuthorized = require("../middlewares/isAuthorized");

router.post("/register", (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    User.create({
        email: req.body.email,
        password: hashedPassword,
    }).then((user) => {
        // create a token
        let token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 86400 // expires in 24 hours
        })
        res.send({ auth: true, token: token })
    })
        .catch((err) => { return res.send(err) })
})


router.post('/login', function (req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('Invalid Credentials');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, msg: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/current-user', verifyToken, function (req, res, next) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
});


router.get("/get-quote", verifyToken, isAuthorized, (req, res) => {
    const quote = "If a thing is humanly possible, consider it within your reach. - Marcus Aurelius";
    return res.status(200).send(quote);
})

module.exports = router; //this should the last line of code