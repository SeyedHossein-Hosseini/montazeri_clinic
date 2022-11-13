let form = document.querySelector(".loginForm");

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
    }
    if (data.errors) {
      console.log(data);
    }

  } catch (err) {
    console.log(err);
  }

  //   console.log(form.docNumber.value);
  //   console.log(form.loginPassword.value);
});
