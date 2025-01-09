const userName = document.querySelector(".user-name");
const profileMenu = document.querySelector(".profile-options");

userName.addEventListener("mouseover", () => {
  profileMenu.classList.toggle("show");
  profileMenu.classList.toggle("hide");
});

document.addEventListener("click", (e) => {
  if (profileMenu.classList.contains("show")) {
    profileMenu.classList.remove("show");
  }
});
