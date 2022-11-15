let form = document.querySelector(".loginForm");

let passwordError = document.getElementById("passwordError");
let docNumberError = document.getElementById("docNumberError");
let formError = document.getElementById("formError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
      console.log("successfully loged in");
      passwordError.innerHTML = "";
      docNumberError.innerHTML = "";
      formError.innerHTML = "";
    }
    if (data.errors) {
      passwordError.innerHTML = data.errors.password;
      docNumberError.innerHTML = data.errors.docNumber;
      console.log(data);
    }
  } catch (err) {
    console.log(err);
    formError.innerHTML = err;
  }

  //   console.log(form.docNumber.value);
  //   console.log(form.loginPassword.value);
});
