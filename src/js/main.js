//Header burger
const burger = document.querySelector(".js-burger");
const header = document.querySelector(".js-header");
const body = document.querySelector("body");

const actions = document.querySelector('.header__action');
const navigation = document.querySelector('.header__nav');
const wrapper = document.querySelector('.header__inner');


// Toggle burger menu
burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    header.classList.toggle("open-menu");

    if (burger.classList.contains("active")) {
        body.style.overflow = "hidden"; 
    } else {
        body.style.overflow = "visible"; 
    }
});

// Move actions based on screen width
function moveActions() {
    if (window.innerWidth < 1072) {
        if (navigation && !navigation.contains(actions)) {
            navigation.append(actions);
        }
    } else {
        if (wrapper && !wrapper.contains(actions)) {
            wrapper.append(actions);
        }
    }
}

// Initial check and on resize
moveActions(); // Run on load
window.addEventListener("resize", moveActions); // Run on resize