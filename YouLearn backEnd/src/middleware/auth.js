const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try
    {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "my-secret-message");
        const user = await User.findOne({
            _id: decoded._id,
        });
        if (!user)
        {
            console.log("AUTH FAILED");
            throw new Error("AUTH FAILED");
        }
        req.user = user;
        next();
    } catch (e)
    {
        res.status(400).send({ error: "Please Authenticate" });
    }
};

module.exports = auth; //express middleware
