let intro = document.querySelector(".intro");
let logo = document.querySelector(".logo-header span");
let logoSpan = document.querySelectorAll(".logo-header span");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add("active");
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove("active");
          span.classList.add("fade");
        }, (idx + 1) * 50);
      });
    }, 4000);
    setTimeout(() => {
      intro.style.top = "-100vh";
      setTimeout(() => {
        window.location.href = "./main-page/main.html";
      }, 700);
    }, 5000);
  });
});
