(function () {
  "use strict";

  var wedding = new Date("2026-10-24T14:30:00+02:00").getTime();
  var countdowns = document.querySelectorAll("[data-countdown]");

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateCountdown() {
    var remaining = Math.max(0, wedding - Date.now());
    var days = Math.floor(remaining / 86400000);
    var hours = Math.floor((remaining % 86400000) / 3600000);
    var minutes = Math.floor((remaining % 3600000) / 60000);

    countdowns.forEach(function (countdown) {
      var dayNode = countdown.querySelector("[data-days]");
      var hourNode = countdown.querySelector("[data-hours]");
      var minuteNode = countdown.querySelector("[data-minutes]");
      if (dayNode) dayNode.textContent = days;
      if (hourNode) hourNode.textContent = pad(hours);
      if (minuteNode) minuteNode.textContent = pad(minutes);
    });
  }

  updateCountdown();
  if (countdowns.length) window.setInterval(updateCountdown, 60000);

  var toggle = document.querySelector("[data-menu-toggle]");
  var navigation = document.querySelector("[data-nav]");
  if (toggle && navigation) {
    toggle.addEventListener("click", function () {
      var isOpen = navigation.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        navigation.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        navigation.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (item) { item.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(function (item) { observer.observe(item); });
}());
