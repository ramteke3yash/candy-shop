const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const Candy = require("./models/candy");
const cors = require("cors");
const { error } = require("console");

const app = express();
const candyRoutes = require("./routes/candy");

app.use(cors());
app.use(bodyParser.json());
app.use(candyRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
