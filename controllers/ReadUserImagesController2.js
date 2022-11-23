const { readdir, readFile } = require("fs").promises;
const { readFileSync } = require("fs");
const path = require("path");

const share_folder_path = ["\\\\", "172.16.0.7", "\\", "rvg", "\\", "10"].join(
  ""
);

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

getFileList(share_folder_path).then(async (files) => {
  for (const file of files) {
    // console.log(file);
    if (file.includes(".jpg")) {
      const data = readFileSync(file);
      console.log(Buffer.from(data).toString("base64"));
    }
    console.log(
      "======================================================================================"
    );
  }
});
