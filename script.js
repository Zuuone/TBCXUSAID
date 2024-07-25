const headerContainer = document.querySelector(".header_container");
const mobileMenuIcon = document.querySelector(".mobile_header_menu_icon");

//variables to make offers scrollbar work

const content = document.querySelector(".offers_slider_container");
const scrollbar = document.querySelector(".offers_slider_scroolbar");
const scrollbarDrag = document.querySelector(".offers_scrollbar_drag");

// Calculate scrollbar width relative to the content
// function updateScrollbar() {
//   const containerWidth = content.clientWidth;
//   const contentWidth = content.scrollWidth;
//   const scrollbarWidth =
//     (containerWidth / contentWidth) * scrollbar.clientWidth;
//   scrollbarDrag.style.width = `${scrollbarWidth}px`;
// }

// Sync scrollbar position with content scroll
content.addEventListener("scroll", () => {
  const scrollLeft = content.scrollLeft;
  const maxScrollLeft = content.scrollWidth - content.clientWidth;
  const maxDragLeft = scrollbar.clientWidth - scrollbarDrag.clientWidth;
  const dragLeft = (scrollLeft / maxScrollLeft) * maxDragLeft;
  scrollbarDrag.style.transform = `translateX(${dragLeft}px)`;
});

// Initialize scrollbar
updateScrollbar();
window.addEventListener("resize", updateScrollbar);

mobileMenuIcon.addEventListener("click", function () {
  this.classList.toggle("active");
  headerContainer.setAttribute("style", "background-color: #f9fafa ");

  if (!this.classList.contains("active")) {
    headerContainer.setAttribute("style", "background-color: #fff ");
  }
});

console.log(233);
console.log(headerContainer);
