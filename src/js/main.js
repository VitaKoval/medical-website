"use strict";
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


//Submit form
var formTitle = document.querySelector(".form__title");
var form = document.querySelector(".form__primary");
var submitButton = form.querySelector('button[type="submit"]');
var notification = document.querySelector(".notification");

var fields = [{
  id: "#email",
  required: true
}, {
  id: "#phone",
  required: false
    }, {
    id: "#date",
    required: true
//   id: ".custom-select",
//   type: "custom-select",
//   required: true,
//   defaultValue: "Select..."
}];
var handleEmptyField = function handleEmptyField(field) {
   
  var element = form.querySelector(field.id);
//   var value = field.type === "custom-select" ? element.querySelector("select").value : element.value.trim();
    var value = element.value.trim();
    if (field.required) {
    // if (!value || field.defaultValue && value === field.defaultValue) {
       if (!value) {
      element.classList.add("empty-field");
    } else {
      element.classList.remove("empty-field");
    }
  }
};
var handleSubmitForm = function handleSubmitForm(evt) {
    evt.preventDefault();
  var hasEmptyFields = false;
    fields.forEach(function (field) {
      handleEmptyField(field);
     
    if (field.required) {
    //   var value = field.type === "custom-select" ? form.querySelector(field.id).querySelector("select").value : form.querySelector(field.id).value.trim();
      var value = form.querySelector(field.id).value.trim();
        if (!value || field.defaultValue && value === field.defaultValue) {
        hasEmptyFields = true;
      }
    }
  });
  if (hasEmptyFields) {
    return;
  }
  var email = form.querySelector("#email").value;
  var phone = form.querySelector("#phone").value;
  var dateOfAppointment = form.querySelector("#date").value;

  var formData = {
    email: email,
    phone: phone,
    dateOfAppointment: dateOfAppointment,
  };
    
  fetch("https://", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function () {
      form.reset();
      formTitle.classList.add("hidden");
    form.classList.add("hidden");
    notification.classList.add("show");
  }).catch(function () {
      // Temporary solution
      form.reset();
      formTitle.classList.add("hidden");
      form.classList.add("hidden");
      notification.classList.add("show");
    });
};
submitButton.addEventListener("click", handleSubmitForm);


// Animate Running Numbers
function getElementTop(element) {
    const rect = element?.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect ? rect.top + scrollTop : null;
}

function animateRunningNumbers(containerClass, numberClass) {
    const container = document.querySelector(`.${containerClass}`);
    const numbers = container?.querySelectorAll(`.${numberClass}`);
    if (!container || !numbers) return;

    let isAnimated = false;

    function handleScroll() {
        const containerTop = getElementTop(container);
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        if (containerTop && containerTop < scrollTop + windowHeight * 0.8 && !isAnimated) {
            isAnimated = true;
            numbers.forEach(number => {
                const targetValue = parseInt(number.textContent.replace(/\D/g, ''), 10);
                if (isNaN(targetValue)) return;

                let currentValue = 0;
                const increment = Math.ceil(targetValue / 100); // Animation speed
                const interval = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(interval);
                    }
                    number.textContent = `${currentValue}`;
                }, 20); // Update interval
            });

            window.removeEventListener("scroll", handleScroll);
        }
    }

    window.addEventListener("scroll", handleScroll);
}

animateRunningNumbers("js-running-value", "js-running-number");