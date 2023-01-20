// phone prefix for all convinces in Iran and all sub cities in Tehran
let phonePrefixList = [
  "041",
  "044",
  "031",
  "026",
  "045",
  "084",
  "077",
  "021",
  "038",
  "056",
  "051",
  "058",
  "061",
  "024",
  "023",
  "054",
  "071",
  "028",
  "025",
  "087",
  "034",
  "083",
  "074",
  "017",
  "013",
  "066",
  "011",
  "086",
  "076",
  "081",
  "035",
  "029",

  "0221",
  "0228",
  "0021",
  "0292",
  "0262",
  "0221",
  "0261",
  "0229",
  "0261",
  "0291"
];

const deletePhonePrefix = (phoneNumber) => {
  for (let prefix of phonePrefixList) {
    if (
      prefix.length == 3 &&
      phoneNumber.substring(0, 3) == prefix &&
      phoneNumber.length == 10
    ) {
      return phoneNumber.substring(3, 10);
    } else if (
      prefix.length == 3 &&
      phoneNumber.substring(0, 3) == prefix &&
      phoneNumber.length >= 11
    ) {
      return phoneNumber.substring(3, 11);
    } else if (
      prefix.length == 4 &&
      phoneNumber.substring(0, 4) == prefix &&
      phoneNumber.length == 11
    ) {
      return phoneNumber.substring(3, 11);
    } else if (
      prefix.length == 4 &&
      phoneNumber.substring(0, 4) == prefix &&
      phoneNumber.length >= 12
    ) {
      return phoneNumber.substring(3, 12);
    }
  }
  return phoneNumber;
};

const deleteMobilePhonePrefix = (mobilePhone) => {
  if (mobilePhone.substring(0, 2) == "09") {
    return mobilePhone.substring(1, 11);
  }
  return mobilePhone.substring(0, 7);
};

module.exports = { deleteMobilePhonePrefix, deletePhonePrefix };
