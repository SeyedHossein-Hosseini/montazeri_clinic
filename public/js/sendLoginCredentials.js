let form = document.querySelector(".loginForm");

let passwordError = document.getElementById("passwordError");
let docNumberError = document.getElementById("docNumberError");
let formError = document.getElementById("formError");
let loginSpinner = document.querySelector(".loginSpinner");

let noImageFoundError = document.querySelector(".noImageFoundError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loginSpinner.classList.remove("d-none");

  try {
    let result = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        docNumber: form.docNumber.value,
        password: form.loginPassword.value
      }),
      headers: { "Content-Type": "application/json" }
    });
    let data = await result.json();

    if (data.user) {
      location.assign("/main");
      passwordError.innerHTML = "";
      docNumberError.innerHTML = "";
      formError.innerHTML = "";
      loginSpinner.classList.add("d-none");
    }
    if (data.errors) {
      passwordError.innerHTML = data.errors.password;
      docNumberError.innerHTML = data.errors.docNumber;
      console.log(data);
      loginSpinner.classList.add("d-none");
    }
  } catch (err) {
    console.log(err);
    formError.innerHTML = err;
    loginSpinner.classList.add("d-none");
    return;
  }

  setTimeout(() => {
    console.log(passwordError);
    console.log("ggg");
    passwordError.innerHTML = "";
    docNumberError.innerHTML = "";
    formError.innerHTML = "";
    noImageFoundError.remove();
    loginSpinner.classList.add("d-none");
  }, 4000);
});

function closeMessageBox(e) {
  e.parentElement.remove();
}
