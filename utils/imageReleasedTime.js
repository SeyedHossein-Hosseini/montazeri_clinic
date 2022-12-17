module.exports.getImageReleasedTime = (filename) => {
  if (filename) {
    let fulltime = {};

    let pattern = /_1......._/;
    let result = filename.match(pattern);
    result = result.toString().slice(1, -1);

    fulltime.year = result.slice(0, 4);
    fulltime.month = result.slice(4, 6);
    fulltime.day = result.slice(6, 8);

    return fulltime;
  } else {
    return;
  }
};
