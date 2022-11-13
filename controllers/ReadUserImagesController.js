const path = require("path");
const fs = require("fs");

const { smb2Client } = require("../models/SMBClient");
const { removeAllFiles } = require("../utils/removeAllImages");

// var docNumber = 45;
var docNumber = 111;
const ImageDirectory = path.resolve(__dirname, "..", "temp");


module.exports.readImages = async (req, res) => {
  await removeAllFiles();
  var img;
  smb2Client.readdir(`${docNumber}`, function (err, content) {
    // if there is a image folder for a user in share folder
    if (err) {
      console.log(`There is no folder here`);
      throw err;
    }
    content.forEach((element) => {
      var t = path.join(`${docNumber}`, `${element}`);
      smb2Client.readdir(t, (err, result) => {
        if (err) throw err;
        result.forEach((image) => {
          var addr = path.join(`${docNumber}`, `${element}`, `${image}`);
          if (
            image.includes(".jpg") ||
            image.includes(".png") ||
            image.includes(".jpeg")
          ) {
            smb2Client.readFile(addr, (error, images) => {
              if (error) throw error;
              console.log({ element, image });
              img = images.toString("base64");
              var im = { imageData: img, name: image, number: element };
              fs.writeFile(
                `${ImageDirectory}/${image}.json`,
                JSON.stringify(im),
                (err) => {
                  if (err) throw err;
                }
              );
            });
          }
        });
      });
    });
  });
};
