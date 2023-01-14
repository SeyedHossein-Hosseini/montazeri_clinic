const { readdir, readFile } = require("fs").promises;
const path = require("path");
const {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  unlinkSync,
  rm
} = require("fs");
const { verifyToken } = require("../utils/verifyToken");

const { getImageReleasedTime } = require("../utils/imageReleasedTime");

module.exports.readUserImages = async (req, res, next) => {
  // declare where to save user images
  const imageSaveFolder = path.join(__dirname, "..", "public", "temp");

  // const documentNumber = "45";
  const documentNumber = await verifyToken(req);

  // create full address of network share folder
  const shareFolderPath = () => {
    console.log({ documentNumber });
    return [
      "\\\\",
      process.env.SHARE_FOLDER_ROOT_SERVER,
      "\\",
      process.env.SHARE_FOLDER_ROUTE,
      "\\",
      documentNumber
    ].join("");
  };

  const organizeUserDirectory = async (docNumber) => {
    // create a directory named user document number
    let userImageDirectory = path.join(imageSaveFolder, docNumber);
    if (!existsSync(userImageDirectory)) {
      mkdirSync(userImageDirectory);
    } else {
      readdir(userImageDirectory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          unlinkSync(path.join(userImageDirectory, file), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  };

  const deleteTempContent = (sickID) => {
    let sickPathImage = path.join(imageSaveFolder, sickID);
    if (existsSync(sickPathImage)) {
      rm(sickPathImage, { recursive: true }, (err) => {
        if (err) throw err;
      });
      console.log(`folder sick with id number ${sickID} deleted`);
    }
  };

  const getFileList = async (dirName) => {
    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });

    for (const item of items) {
      const filePath = path.join(dirName, item.name);
      if (item.isDirectory()) {
        files = [...files, ...(await getFileList(filePath))];
      } else {
        files.push(filePath);
      }
    }

    return files;
  };

  getFileList(shareFolderPath())
    .then(async (files) => {
      let folderImageList = [];
      let imageCount = 0;
      for (const file of files) {
        imageCount++;
        if (
          file.includes(".jpg") ||
          file.includes(".png") ||
          file.includes(".jpeg")
        ) {
          const data = readFileSync(file);
          // console.log({ file });

          // preprocess filename to get the exact time of its released time
          let { year, month, day } = getImageReleasedTime(file);
          // let { year, month, day } = { year: "1300", month: "12", day: "30" };

          // console.log({ year, month, day });

          await organizeUserDirectory(documentNumber);
          let imagePath = path.join(
            imageSaveFolder,
            documentNumber,
            `${imageCount}.png`
          );
          writeFileSync(imagePath, data);

          let imagePathFront = path.join(
            "temp",
            documentNumber,
            `${imageCount}.png`
          );

          folderImageList.push({ imagePathFront, year, month, day });
        }
        // console.log(
        //   "======================================================================================"
        // );
      }
      // console.log(folderImageList);
      res.render("mainPage", {
        error: "",
        imageList: folderImageList,
        fname: "",
        lname: "",
        id_sick: ""
      });

      // 60 min remaining to delete all images for the user with specific ID
      setTimeout(() => {
        deleteTempContent(documentNumber);
      }, 1000 * 60 * 60);
    })
    .catch((err) => {
      res.render("login", {
        message: " برای این شماره پرونده هیچ تصویری یافت نشد !!!"
      });
      // console.log(err);
      return;
    });
};
