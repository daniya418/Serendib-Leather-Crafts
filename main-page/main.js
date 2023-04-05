window.addEventListener("scroll", reveal);

function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const selector = ".nav-link";
  const elems = Array.from(document.querySelectorAll(selector));
  const navigation = document.querySelector(".page-navbar");

  function makeActive(evt) {
    const target = evt.target;

    if (!target || !target.matches(selector)) {
      return;
    }

    elems.forEach((elem) => elem.classList.remove("sub-nav-active"));

    evt.target.classList.add("sub-nav-active");
  }

  navigation.addEventListener("mousedown", makeActive);
});

// On Scroll

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 40;
  navLi.forEach((link) => {
    let section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("sub-nav-active");
    } else {
      link.classList.remove("sub-nav-active");
    }
  });
});

// Directing to the relavant sub pages.

document.querySelector("#sculpting").addEventListener("click", () => {
  document.location.href = "../subpage-sculpting/sub1.html";
});

document.querySelector("#carving").addEventListener("click", () => {
  document.location.href = "";
});

document.querySelector("#painting").addEventListener("click", () => {
  document.location.href = "";
});

document.querySelector("#stamping").addEventListener("click", () => {
  document.location.href = "";
});
