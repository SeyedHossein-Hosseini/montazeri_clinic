let user_info_btn = document.getElementById("user_icon");
let navbarSubmenuContainer = document.querySelector(".navbarSubmenuContainer");
user_info_btn.addEventListener("click", () => {
  navbarSubmenuContainer.classList.contains("d-none")
    ? navbarSubmenuContainer.classList.remove("d-none")
    : navbarSubmenuContainer.classList.add("d-none");
});
