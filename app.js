const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
const router2 = express.Router();

const users = ["John", "Mark"];
const products = ["Keyboard", "Mouse"];

const logUsers = (req, res, next) => {
  if (users.length !== 0) {
    console.log(users);
    next();
  } else {
    const err = new Error("Internal server error");
    err.status = 500;
    next(err);
  }
};

const logMethod = (req, res, next) => {
  console.log(req.method);
  next();
};

router.use((req, res, next) => {
  console.log("Directing to users");
  next();
});

router.use("/create", (req, res, next) => {
  if (req.body) {
    console.log(req.body);
    next();
  }
});

router2.use((req, res, next) => {
    console.log(req.url);
    next();
})

app.use(logUsers);
app.use(logMethod);
app.use("/users", router);
app.use("/products", router2);

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users/create", (req, res) => {
  users.push(req.body.name);
  res.json("User added successfully");
});

app.put("/products/update", (req, res) => {
  products.shift();
  products.push(req.body.item);
  console.log(products);
  res.json("Updated successfully");
});

app.use((error, req, res, next) => {
  res.json("No users");
});

app.use((error, req, res, next) => {});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
