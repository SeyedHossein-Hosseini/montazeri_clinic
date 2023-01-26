// this should be set according to forget password

let form = document.querySelector(".forgetPasswordForm");

let TelError = document.getElementById("TelError");
let docNumError = document.getElementById("docNumError");
let formErr = document.getElementById("formErr");
let errorMsg = document.querySelector(".errorMsg");
let forgetPassSpinner = document.querySelector(".forgetPassSpinner");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  forgetPassSpinner.classList.remove("d-none");
  try {
    let result = await fetch("/forget-password", {
      method: "POST",
      body: JSON.stringify({
        docNum: form.docNum.value,
        pass: form.Tel.value
      }),
      headers: { "Content-Type": "application/json" }
    });
    let data = await result.json();

    if (data.user) {
      location.assign("/changePassword");
      forgetPassSpinner.classList.add("d-none");
      TelError.innerHTML = "";
      docNumError.innerHTML = "";
      formErr.innerHTML = "";
    }
    if (data.errors) {
      TelError.innerHTML = data.errors.pass;
      docNumError.innerHTML = data.errors.docNum;
      forgetPassSpinner.classList.add("d-none");
      console.log(data);
    }
  } catch (err) {
    forgetPassSpinner.classList.add("d-none");
    formErr.innerHTML = err;
    return;
  }

  setTimeout(() => {
    TelError.innerHTML = "";
    docNumError.innerHTML = "";
    formErr.innerHTML = "";
  }, 4000);

  // console.log(form.docNum.value);
  // console.log(form.Tel.value);
});
