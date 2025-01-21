//Header burger
const burger = document.querySelector(".js-burger");
const header = document.querySelector(".js-header");
const body = document.querySelector("body");

burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    header.classList.toggle("open-menu");

    if (burger.classList.contains("active")) {
        body.style.overflow = "hidden"; 
    } else {
        body.style.overflow = "visible"; 
    }
});