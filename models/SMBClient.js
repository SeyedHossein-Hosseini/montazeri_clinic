const SMB2 = require("smb2");
const path = require("path");

// make the correct format of share folder address
const share_folder_path = [
  "\\\\",
  process.env.SHARE_FOLDER_ROOT_SERVER,
  "\\",
  process.env.SHARE_FOLDER_ROUTE
].join("");

// Values for share folder connection
module.exports.smb2Client = new SMB2({
  share: share_folder_path,
  domain: process.env.SHARE_FOLDER_DOMAIN,
  username: "",
  password: "",
  autoCloseTimeout: 0
});
