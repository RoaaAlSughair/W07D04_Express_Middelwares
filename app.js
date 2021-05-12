const express = require("express");
const app = express();
app.use(express.json());

const users = ["John", "Mark"];

const logUsers = (req, res, next) => {
    if (users.length !== 0) {
    console.log(users);
    next();
    } else {
        const err = new Error("Internal server error");
        err.status = 500;
        next(err);
    }
}

const logMethod = (req, res, next) => {
    console.log("GET");
    next();
}

app.use(logUsers);
app.use(logMethod);

app.get("/users", (req, res, next) => {
  res.json(users);
});

app.use((error, req, res, next) => {
    res.json("No users");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});