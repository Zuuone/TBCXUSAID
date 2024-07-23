const headerContainer = document.querySelector(".header_container");
const mobileMenuIcon = document.querySelector(".mobile_header_menu_icon");

mobileMenuIcon.addEventListener("click", function () {
  this.classList.toggle("active");
  headerContainer.setAttribute("style", "background-color: #f9fafa ");

  if (!this.classList.contains("active")) {
    headerContainer.setAttribute("style", "background-color: #fff ");
  }
});

console.log(233);
console.log(headerContainer);
