const express = require("express");
const { Mongoose } = require("mongoose");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users", async (req, res) => {
    const me = new User(req.body);
    try
    {
        await me.save();
        const token = await me.generateAuthToken();
        if (!token) throw new Error("Couldnt Generate AuthToken")
        return res.send({
            email: me.email,
            token: token,
            expiresIn: 3600
        });
    } catch (e)
    {
        if (e.code == 11000)
        {
            return res.status(400).send({ error: "Email Already Exists" })
        }
        else
            res.status(400).send({ error: e.message });
    }
});

router.post("/users/login", async (req, res) => {
    try
    {
        const user = await User.findByCredentials(req.body.email, req.body.password, res);
        if (!user) throw new Error("Invalid Credentials")
        const token = await user.generateAuthToken();
        return res.send({
            email: user.email,
            token: token,
            expiresIn: 3600
        });

    } catch (e)
    {
        res.status(400).send({ error: e.message });
    }
});

module.exports = router;
