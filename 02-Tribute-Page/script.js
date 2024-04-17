function openNav() {
  document.getElementById("myNav").setAttribute("aria-hidden", "false");
}

function closeNav() {
  document.getElementById("myNav").setAttribute("aria-hidden", "true");
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var timeline = document.querySelector(".timeline");
    var timelineTop = timeline.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;
    if (timelineTop < windowHeight) {
      timeline.classList.add("animate");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var timeline = document.querySelector(".timeline");
  window.addEventListener("scroll", function () {
    var timelineTop = timeline.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;
    if (timelineTop < windowHeight) {
      var containers = document.querySelectorAll(".container");
      containers.forEach(function (container, index) {
        container.style.animation = "movedown 1s linear forwards";
        container.style.animationDelay = index + 1 + "s";
      });
    }
  });
});
