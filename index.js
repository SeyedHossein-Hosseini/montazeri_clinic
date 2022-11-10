const express = require("express");

const dotEnv = require("dotenv");
//* load config
dotEnv.config({ path: "./config/.env" });

const bodyParser = require("body-parser");

const { setStatics } = require("./utils/statics");

const getUserRoute = require("./routes/getUserRoute");

const sequelize = require("./models/Sequelize");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting ejs templare engine and views folder public
app.set("view engine", "ejs");
app.set("views", "views");

setStatics(app);

app.get("/users", getUserRoute);

app.get("/", (req, res) => {
  res.send("Hello !!!!");
});

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
      console.log("connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
