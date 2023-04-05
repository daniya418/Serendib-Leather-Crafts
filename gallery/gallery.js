var range = document.getElementById("range");
var body = document.querySelector(".container");
var font = document.querySelector(".font");

checkFontSize();

range.oninput = function () {
    console.log(this.values);
    body.style.setProperty("font-size", this.value + "px");
    window.localStorage.setItem("fontSize", this.value + "px");
    window.localStorage.setItem("range", this.value);
    font.innerHTML = "<b>" + this.value + "px";
};

function checkFontSize() {
    var fontSize = window.localStorage.getItem("fontSize");
    var rangeValue = window.localStorage.getItem("range");

    if (fontSize !== null) {
        body.style.setProperty("font-size", fontSize);
        range.value = rangeValue;
        font.innerHTML = "<b>" + fontSize;
    } else {
        body.style.setProperty("font-size", "15px");
        range.value = 15;
        font.innerHTML = "<b>" + range.value + "px";
    }
}


// Theme Changer

const select = document.getElementById("theme-select");
const lightText = document.querySelector(".bi-brightness-high-fill");
const darkText = document.querySelector(".bi-moon-stars-fill");
const customText = document.querySelector(".bi-palette-fill");

lightText.classList.add("show-light");
darkText.classList.remove("show-dark");
customText.classList.remove("show-custom");

select.addEventListener("change", () => {
    const selectedValue = select.value;

    if (selectedValue === "light") {
        lightText.classList.add("show-light");
        darkText.classList.remove("show-dark");
        customText.classList.remove("show-custom");
    } else if (selectedValue === "dark") {
        darkText.classList.add("show-dark");
        lightText.classList.remove("show-light");
        customText.classList.remove("show-custom");
    } else {
        customText.classList.add("show-custom");
        darkText.classList.remove("show-dark");
        lightText.classList.remove("show-light");
    }
});

const setTheme = (theme) => (document.documentElement.className = theme);
document.getElementById("theme-select").addEventListener("change", function () {
    setTheme(this.value);
});
