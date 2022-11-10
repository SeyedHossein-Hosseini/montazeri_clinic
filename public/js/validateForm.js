let docNumber = document.getElementById("docNumber");

docNumber.addEventListener("input", (e) => {
    // only numbers allowed
    e.target.value = e.target.value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/^0[^.]/, "0");

  console.log(e.target.value);
});
