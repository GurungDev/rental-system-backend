const express = require("express");
const connection = require("./config/dbConnection");
const allRouter = require("./router/all.routes");

const cors = require("cors");

const app = express();
connection();
app.use(cors());
app.use(express.json());
app.use("/api", allRouter);

app.listen(8000, () => {
  console.log("listening");
});
