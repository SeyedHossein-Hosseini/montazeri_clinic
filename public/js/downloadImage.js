// Using fetch
let count = 1;
const downloadImage = async (e) => {
  console.log(e.dataset.filename);

  let imageSrc = e.parentNode.previousElementSibling.src;
  // console.log(e.parentNode.previousElementSibling.src);
  const image = await fetch(imageSrc);
  const imageBlob = await image.blob();
  const imageURL = URL.createObjectURL(imageBlob);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = e.dataset.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  count++;
};

// console.log(document.querySelector(".downloadBtn"));

// document.querySelector(".downloadBtn").addEventListener("click", () => {
//   console.log("HEloo");
//   console.log(this.parentElement.closet("#teethImages"));
// });
