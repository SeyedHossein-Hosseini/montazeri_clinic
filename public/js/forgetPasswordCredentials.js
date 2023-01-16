// this should be set according to forget password

let form = document.querySelector(".forgetPasswordForm");

let TelError = document.getElementById("TelError");
let docNumError = document.getElementById("docNumError");
let formErr = document.getElementById("formErr");
let errorMsg = document.querySelector(".errorMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
      //   console.log("successfully loged in");
      TelError.innerHTML = "";
      docNumError.innerHTML = "";
      formErr.innerHTML = "";
    }
    if (data.errors) {
      TelError.innerHTML = data.errors.pass;
      docNumError.innerHTML = data.errors.docNum;
      console.log(data);
    }
  } catch (err) {
    console.log(err);
    formErr.innerHTML = err;
    return;
  }

  console.log(form.docNum.value);
  console.log(form.Tel.value);
});

// setTimeout(() => {
//   passwordError.innerHTML = "";
//   docNumberError.innerHTML = "";
//   formError.innerHTML = "";
//   errorMsg.innerHTML = "";
// }, 3000);
