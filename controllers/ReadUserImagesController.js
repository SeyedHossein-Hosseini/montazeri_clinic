const path = require("path");
const fs = require("fs");
const jsonwebtoken = require("jsonwebtoken");

const { smb2Client } = require("../models/SMBClient");
const { removeAllFiles } = require("../utils/removeAllImages");

const ImageDirectory = path.resolve(__dirname, "..", "temp");

module.exports.readImages = async (req, res, next) => {
  removeAllFiles();
  var docNumber = null;
  var img;
  const token = await req.cookies.MontazeriClinicJWT;
  if (token) {
    jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY,
      async (err, decodedToken) => {
        if (err) {
          console.log(`An error accured in fetching images`);
        } else {
          docNumber = await decodedToken.id;
          console.log({ docNumber });
          smb2Client.readdir(`${docNumber}`, function (err, content) {
            // if there is a image folder for a user in share folder
            if (err) {
              // res.json({});
              // next();
              return;
            }
            content.forEach((element) => {
              var t = path.join(`${docNumber}`, `${element}`);
              smb2Client.readdir(t, (err, result) => {
                if (err) {
                  res.json({ msg: `There is a error with fetching images` });
                  next();
                  return;
                }
                result.forEach((image) => {
                  var addr = path.join(
                    `${docNumber}`,
                    `${element}`,
                    `${image}`
                  );
                  if (
                    image.includes(".jpg") ||
                    image.includes(".png") ||
                    image.includes(".jpeg")
                  ) {
                    smb2Client.readFile(addr, (error, images) => {
                      if (error) {
                        res.json({
                          msg: `There is a error with fetching images`
                        });
                        next();
                        return;
                      }
                      console.log({ element, image });
                      img = images.toString("base64");
                      var im = img;
                      // {
                      //   imageData: img,
                      //   name: image,
                      //   number: element
                      // };
                      fs.writeFile(
                        `${ImageDirectory}/${image}.txt`,
                        im,
                        (err) => {
                          if (err) {
                            res.json({
                              msg: `There is a error with fetching images`
                            });
                            next();
                            return;
                          }
                        }
                      );
                    });
                  }
                });
              });
            });
          });
        }
      }
    );
  } else {
    console.log(`An error accured in fetching images`);
    return;
  }

  next();
};

const sendImagesToClient = async () => {
  var images = [];
  fs.readdirSync(ImageDirectory, (err, files) => {
    files.forEach((file) => {
      var img = null;
      let imagePath = path.join(ImageDirectory, file);
      fs.readFile(imagePath, async (err, data) => {
        let image = data.toString();
        img = { image, file };
        images.push(img);
      });
    });
  });
};
