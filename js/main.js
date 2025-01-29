"use strict";

//Header burger
var burger = document.querySelector(".js-burger");
var header = document.querySelector(".js-header");
var body = document.querySelector("body");
var actions = document.querySelector('.header__action');
var navigation = document.querySelector('.header__nav');
var wrapper = document.querySelector('.header__inner');

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

//Submit forms
var forms = document.querySelectorAll(".js-submit-form");
forms.forEach(function (form) {
  var formContainer = form.closest(".js-form-container");
  var formTitle = form.querySelector(".form__title");
  var submitButton = form.querySelector('button[type="submit"]');
  var notification = formContainer.querySelector(".js-notification");
  var fields = form.dataset.fields ? JSON.parse(form.dataset.fields) : [];
  var handleEmptyField = function handleEmptyField(field) {
    var element = form.querySelector(field.id);
    var value = element.value.trim();
    if (field.required) {
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
      var value = form.querySelector(field.id).value.trim();
      if (field.required && !value) {
        hasEmptyFields = true;
      }
    });
    if (hasEmptyFields) {
      return;
    }
    var formData = {};
    fields.forEach(function (field) {
      formData[field.id.replace("#", "")] = form.querySelector(field.id).value.trim();
    });
    fetch("https://", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function () {
      form.reset();
      if (formTitle) formTitle.classList.add("hidden");
      form.classList.add("hidden");
      notification.classList.add("show");
    })["catch"](function () {
      // Temporary solution in case of error
      form.reset();
      if (formTitle) formTitle.classList.add("hidden");
      form.classList.add("hidden");
      notification.classList.add("show");
      console.log(JSON.stringify(formData));
    });
  };
  submitButton.addEventListener("click", handleSubmitForm);
});

// Animate Running Numbers
function getElementTop(element) {
  var rect = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect ? rect.top + scrollTop : null;
}
function animateRunningNumbers(containerClass, numberClass) {
  var container = document.querySelector(".".concat(containerClass));
  var numbers = container === null || container === void 0 ? void 0 : container.querySelectorAll(".".concat(numberClass));
  if (!container || !numbers) return;
  var isAnimated = false;
  function handleScroll() {
    var containerTop = getElementTop(container);
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    if (containerTop && containerTop < scrollTop + windowHeight * 0.8 && !isAnimated) {
      isAnimated = true;
      numbers.forEach(function (number) {
        var targetValue = parseInt(number.textContent.replace(/\D/g, ''), 10);
        if (isNaN(targetValue)) return;
        var currentValue = 0;
        var increment = Math.ceil(targetValue / 100); // Animation speed
        var interval = setInterval(function () {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(interval);
          }
          number.textContent = "".concat(currentValue);
        }, 20); // Update interval
      });

      window.removeEventListener("scroll", handleScroll);
    }
  }
  window.addEventListener("scroll", handleScroll);
}
animateRunningNumbers("js-running-value", "js-running-number");