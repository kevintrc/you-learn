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

// router.post("/users/logout", auth, async (req, res) => {
//     try
//     {
//         req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
//         await req.user.save();
//         res.send();
//     } catch (e)
//     {
//         res.status(500).send();
//     }
// });

// router.post("/users/logoutAll", auth, async (req, res) => {
//     try
//     {
//         req.user.tokens = [];
//         await req.user.save();
//         res.send();
//     } catch (e)
//     {
//         res.status(500).send();
//     }
// });


// router.get("/users/me", auth, async (req, res) => {
//     res.send(req.user);
// });

// router.get("/users/:id/avatar", async (req, res) => {
//     try
//     {
//         const user = await User.findById(req.params.id);
//         if (!user || !user.avatar)
//         {
//             throw new Error();
//         }
//         res.set("Content-Type", "image/png");
//         res.send(user.avatar);
//     } catch (e)
//     {
//         res.status(404).send();
//     }
// });
// router.patch("/users/me", auth, async (req, res) => {
//     const properties = ["name", "email", "password"];
//     const givenParams = Object.keys(req.body);
//     const availableProperty = givenParams.every((param) => properties.includes(param));
//     if (!availableProperty)
//     {
//         return res.status(400).send({
//             error: "INVALID UPDATION"
//         });
//     }
//     try
//     {
//         givenParams.forEach((param) => (req.user[param] = req.body[param]));
//         await req.user.save();
//         res.status(200).send(req.user);
//     } catch (e)
//     {
//         res.status(400).send(e);
//     }
// });

// router.delete("/users/me", auth, async (req, res) => {
//     try
//     {
//         await req.user.remove();
//         sendCancelEmail(req.user.name, req.user.email);
//         res.send(req.user);
//     } catch (e)
//     {
//         res.status(500).send(e);
//     }
// });

// router.delete("/users/me/avatar", auth, async (req, res) => {
//     try
//     {
//         req.user.avatar = undefined;
//         await req.user.save();
//         res.send("Avatar removed");
//     } catch (e)
//     {
//         res.status(500).send(e);
//     }
// });

module.exports = router;
