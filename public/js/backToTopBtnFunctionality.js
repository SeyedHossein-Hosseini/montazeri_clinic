var back_to_top_btn = document.getElementById("back_to_top_btn");

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    back_to_top_btn.classList.add("show");
  } else {
    back_to_top_btn.classList.remove("show");
  }
});

back_to_top_btn.addEventListener("click", (e) => {
  e.preventDefault();
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});


