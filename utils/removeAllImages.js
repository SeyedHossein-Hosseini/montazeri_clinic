const path = require("path");
const fs = require("fs");

const ImageDirectory = path.resolve(__dirname, "..", "temp");

// clean the folder content (consists of images) 
module.exports.removeAllFiles = () => {
  if (fs.existsSync(ImageDirectory)) {
    fs.readdir(ImageDirectory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(ImageDirectory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  } else {
    fs.mkdirSync(ImageDirectory);
  }
};
