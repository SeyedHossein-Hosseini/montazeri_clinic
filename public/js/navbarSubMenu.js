let user_info_btn = document.getElementById("user_icon");
let navbarSubmenuContainer = document.querySelector(".navbarSubmenuContainer");

// user_info_btn.addEventListener("focusy", (event) => {
//   navbarSubmenuContainer.classList.toggle("d-none");
// });

// document.addEventListener("click", (e) => {
//   if (e.target.matches(".navbarSubmenuContainer")) {
//     console.log("contains");
//   }
//   if (
//     !e.target.matches("#user_icon") &&
//     !navbarSubmenuContainer.classList.contains("d-none")
//   ) {
//     navbarSubmenuContainer.classList.add("d-none");
//     console.log("hwllo");
//   }
// });

user_info_btn.addEventListener("click", () => {
  navbarSubmenuContainer.classList.toggle("d-none");
});
