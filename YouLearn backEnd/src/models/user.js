const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Not valid Email");
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    }, "my-secret-message", { expiresIn: "1h" });
    return token;
};

//CREDENTIAL CHECK FUNCTION
userSchema.statics.findByCredentials = async (email, password, res) => {
    try
    {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid email");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Wrong Password");

        return user;
    } catch (e)
    {
        throw new Error(e.message)
    }
};


//HASHING PASSWORD BEFORE SAVE
userSchema.pre("save", async function (next) {
    const user = this;
    try
    {
        if (user.isModified("password"))
        {
            user.password = await bcrypt.hash(user.password, 8);
        }
        next();
    } catch (e) 
    {
        res.send({ error: "Couldnt hash password" });
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
