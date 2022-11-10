let oldPassVisibilityImg = document.getElementById('oldPassVisibility');
let oldPassword = document.getElementById("oldPassword");

let newPassVisibilityImg = document.getElementById('newPassVisibility');
let newPassword = document.getElementById("newPassword");


const togglePasswordVisibility = (passVisibility, password) => {
    passVisibility.addEventListener('click', () => {
        var typeOfPass = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", typeOfPass);

        var visibilityStatus = typeOfPass == "password" ? "img/invisible.png" : "img/visible.png";
        passVisibility.setAttribute("src", visibilityStatus);
    })
};

togglePasswordVisibility(oldPassVisibilityImg, oldPassword);
togglePasswordVisibility(newPassVisibilityImg, newPassword);
