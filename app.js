const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();

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
    console.log(req.method);
    next();
}

router.use((req, res, next) => {
    console.log("Directing to users");
    next();
});

app.use(logUsers);
app.use(logMethod);
app.use("/users", router);

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