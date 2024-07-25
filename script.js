const headerContainer = document.querySelector(".header_container");
const mobileMenuIcon = document.querySelector(".mobile_header_menu_icon");

// variables for scroll bar
const content = document.querySelector(".offers_slider_container");
const scrollbar = document.querySelector(".offers_slider_scroolbar");
const scrollbarDrag = document.querySelector(".offers_scrollbar_drag");

const prevArrow = document.querySelector(".arrow_left");
const nextArrow = document.querySelector(".arrow_right");
const scrollAmount = 300;

let isDragging = false;
let startX, startScrollLeft, startDragWidth;

function updateScrollbar() {
  const scrollLeft = content.scrollLeft;
  const maxScrollLeft = content.scrollWidth - content.clientWidth;
  const maxDragLeft = scrollbar.clientWidth - scrollbarDrag.clientWidth;
  const dragLeft = (scrollLeft / maxScrollLeft) * maxDragLeft;

  scrollbarDrag.style.transform = `translateX(${dragLeft}px)`;
  updateArrows();
}

function updateArrows() {
  const scrollLeft = content.scrollLeft;
  const maxScrollLeft = content.scrollWidth - content.clientWidth;

  if (scrollLeft === 0) {
    prevArrow.classList.remove("active_arrow");
  } else {
    prevArrow.classList.add("active_arrow");
  }

  if (scrollLeft >= maxScrollLeft) {
    nextArrow.classList.remove("active_arrow");
  } else {
    nextArrow.classList.add("active_arrow");
  }
}

function handleDragMove(e) {
  if (!isDragging) return;

  const deltaX = e.clientX - startX;
  const maxScrollLeft = content.scrollWidth - content.clientWidth;
  const maxDragLeft = scrollbar.clientWidth - scrollbarDrag.clientWidth;
  const newScrollLeft = Math.min(
    maxScrollLeft,
    Math.max(0, startScrollLeft + (deltaX / maxDragLeft) * maxScrollLeft)
  );

  content.scrollLeft = newScrollLeft;

  // Adjust scrollbar drag width and position
  const dragMaxLeft = scrollbar.clientWidth - scrollbarDrag.clientWidth;
  const dragPosition = (content.scrollLeft / maxScrollLeft) * dragMaxLeft;
  scrollbarDrag.style.transform = `translateX(${dragPosition}px)`;

  if (content.scrollLeft === 0 || content.scrollLeft >= maxScrollLeft) {
    const excess =
      content.scrollLeft === 0
        ? -content.scrollLeft
        : content.scrollLeft - maxScrollLeft;
    const dragWidth = Math.max(0, scrollbarDrag.clientWidth - excess);
    scrollbarDrag.style.width = `${dragWidth}px`;
  } else {
    scrollbarDrag.style.width = "50px"; // Reset to initial width
  }

  updateScrollbar();
}

function handleDragEnd() {
  isDragging = false;
  scrollbarDrag.style.width = "50px"; // Reset to initial width
  document.removeEventListener("mousemove", handleDragMove);
  document.removeEventListener("mouseup", handleDragEnd);
}

scrollbarDrag.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDragging = true;
  startX = e.clientX;
  startScrollLeft = content.scrollLeft;

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", handleDragEnd);
});

prevArrow.addEventListener("click", () => {
  content.scrollLeft -= scrollAmount;
  updateScrollbar();
});

nextArrow.addEventListener("click", () => {
  content.scrollLeft += scrollAmount;
  updateScrollbar();
});

content.addEventListener("scroll", updateScrollbar);
window.addEventListener("resize", updateScrollbar);
updateScrollbar();
