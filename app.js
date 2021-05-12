const express = require("express");
const app = express();
app.use(express.json());

const users = ["John", "Mark"];

app.get("/users", (req, res, next) => {
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});