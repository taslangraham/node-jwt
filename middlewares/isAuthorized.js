const User = require("../models/User");

const isAuthorized = (req, res, next) => {
    const acceptedEmail = "graham@gmail.com";

    User.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) return res.status(500).send("There was a problem.");

        if (!user) return res.status(404).send("You must have an account to make this request.");
        if (user.email !== acceptedEmail) return res.status(200).send("You are not authorized.");
        req.email = user.email;
        next();
    });
}

module.exports = isAuthorized;