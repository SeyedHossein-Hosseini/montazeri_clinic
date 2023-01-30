const fs = require("fs");

module.exports.UserLoginDate = () => {
  let date = new Date();
  return `Year: ${date.getFullYear()} - Month: ${
    date.getMonth() + 1
  } - Day: ${date.getDate()} - Hour: ${date.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true
  })} - Minute: ${date.getMinutes()} - Seconds: ${date.getSeconds()}`;
};

module.exports.saveUserLoginDate = (loginDateObj) => {
  fs.readFile("report.json", (err, data) => {
    if (err) {
      alert("اروری در قسمت لاگ ادمین رخ داده است");
      return;
    } else {
      data = JSON.parse(data);
      data.push(loginDateObj);
      fs.writeFile("report.json", JSON.stringify(data), (err) => {
        if (err) {
          alert("اروری در قسمت لاگ ادمین رخ داده است");
          return;
        }
      });
    }
  });
};
