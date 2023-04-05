var count = 10; // set the countdown time in seconds

var countdown = setInterval(function () {
  count--;
  document.getElementById("countdown").innerHTML =
    "Redirecting in " + count + " seconds...";

  if (count == 0) {
    clearInterval(countdown);
    window.location.href = "shop.html"; // redirect to second page
  }
}, 1000);
