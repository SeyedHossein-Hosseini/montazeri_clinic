// import external libraries
const express = require("express");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

//* load config
dotEnv.config({ path: "./config/.env" });

// Import internal files
const { setStatics } = require("./utils/statics");
const loginPage = require("./routes/login");
const logout = require("./routes/logout");
const changePassword = require("./routes/changePassword");
// const getUserRoute = require("./routes/getUserRoute");
const sequelize = require("./models/Sequelize");
// const { readImages } = require("./controllers/ReadUserImagesController");
const {
  handleUserAuth,
  checkUser
} = require("./middleware/authenticateUserByToken");

const { readUserImages } = require("./controllers/ReadUserImagesController");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting ejs templare engine and views folder public
app.set("view engine", "ejs");
app.set("views", "views");

// Set statics included public folder and css libraries
setStatics(app);

// All routes
// app.get("*", checkUser);
app.use(loginPage);
app.use(logout);
app.use(changePassword);
app.get("/main", handleUserAuth, checkUser, readUserImages);
// app.get("/read", readUserImages);
// app.get("/users", getUserRoute);
app.get("/", (req, res) => {
  res.redirect("login");
});
app.get("*", (req, res) => {
  res.render("404");
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
