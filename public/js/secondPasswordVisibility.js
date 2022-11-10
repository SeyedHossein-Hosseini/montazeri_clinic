let loginPassVisibilityImg = document.getElementById("PassVisibilityImg");
let loginPassword = document.getElementById("loginPassword");

const togglePasswordVisibility = (passVisibility, password) => {
    passVisibility.addEventListener('click', () => {
        var typeOfPass = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", typeOfPass);

        var visibilityStatus = typeOfPass == "password" ? "img/invisible.png" : "img/visible.png";
        passVisibility.setAttribute("src", visibilityStatus);
    })
};

togglePasswordVisibility(loginPassVisibilityImg, loginPassword);