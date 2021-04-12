const express = require("express");

const userRoutes = require("./routers/user");
const noteRoutes = require("./routers/notes");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS")
    next()
})

app.use(express.json());
app.use(userRoutes);
app.use(noteRoutes);


app.listen(port, () => {
    console.log("server is up on port " + port);
});


