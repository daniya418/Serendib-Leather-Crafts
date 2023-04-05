let cardNumField = document.getElementById("cardNumber");
let holdersNameField = document.getElementById("holderName");
let expireDateField = document.getElementById("expireDate");
let cvvField = document.getElementById("cvv");
let makePaymentBtn = document.getElementById("makePaymentBtn");
let cardType = document.getElementById("cardType");
let cardTypeImg = document.querySelector(".card-type-img");

let billingAddressTxt = document.getElementById("billingAddressTxt");

let nameTxt = document.getElementById("nameTxt");
let emailTxt = document.getElementById("emailTxt");
let contactNumTxt = document.getElementById("contactNumTxt");

let personName = document.getElementById("personName");
let email = document.getElementById("email");
let contactNum = document.getElementById("contactNum");

nameTxt.innerText = localStorage.getItem("name");
emailTxt.innerText = localStorage.getItem("email");
personName.value = localStorage.getItem("name");
email.value = localStorage.getItem("email");

cardType.addEventListener("change", () => {
  const selectedValue = cardType.value;
  if (selectedValue === "visa") {
    cardTypeImg.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png?20170118154621";
  } else if (selectedValue === "master") {
    cardTypeImg.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1158px-Mastercard-logo.svg.png?20210817144358";
  } else if (selectedValue === "americanExpress") {
    cardTypeImg.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/902px-American_Express_logo_%282018%29.svg.png?20191022102801";
  }
});

const imgURLs = JSON.parse(localStorage.getItem("imgURLs"));
const names = JSON.parse(localStorage.getItem("itemNames"));
const prices = JSON.parse(localStorage.getItem("itemPrices"));
const itemQty = JSON.parse(localStorage.getItem("itemQty"));

for (var i = 0; i < names.length; i++) {
  appendCartItems(imgURLs[i], names[i], prices[i], itemQty[i]);
}

getTotal();

function appendCartItems(imageURL, itemName, itemPrice, Qty) {
  let cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  let cart = document.querySelector(".cart");

  let cartItemContent = `<img
src="${imageURL}"
alt=""
class="cart-img"
/>
<div class="cart-content">
<p class="cart-item-name">${itemName}</p>
<p class="cart-item-price">${itemPrice} x ${Qty}</p>
</div>`;

  cartItem.innerHTML = cartItemContent;
  // console.log(cartItem);
  cart.append(cartItem);
}

// Calculates total of the cart
function getTotal() {
  let totalText = document.querySelector(".total");
  const totPrice = localStorage.getItem("cartPrice");
  totalText.innerText = "Total : " + totPrice;
}

// Cancel Payment Button
document.querySelector("#cancelPaymentBtn").addEventListener("click", () => {
  let confirmation = confirm("Are you sure you want to cancel payment?");
  if (confirmation === true) {
    localStorage.clear();
    alert("Cancellation success");
    window.location.href = "shop.html";
  }
});

// Error Message Fields
let cardError = document.getElementById("cardErrorMsg");
let cvvError = document.getElementById("cvvErrorMsg");
let dateError = document.getElementById("dateErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let contactErrorMsg = document.getElementById("contactErrorMsg");

// Form Validation
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  const date = new Date(expireDateField.value);
  const d = date.getMonth();
  const d2 = new Date().getMonth();
  if (d < d2) {
    expireDateField.style.border = "1px solid #ff0000";
    dateError.innerText = "* Invalid Date!";
    e.preventDefault();
  }
  if (billingAddressTxt.innerText === "Your address comes here") {
    addressErrorMsg.innerText = "Cannot be empty!";
    e.preventDefault();
  }
  if (contactNumTxt.innerText === "Ex: +(00)-0000-0000") {
    contactErrorMsg.innerText = "Update the contact number!";
    e.preventDefault();
  }
});

let billingAddressPopup = document.getElementById("addressPopup");

let addressEditBtn = document.getElementById("addressEditBtn");
addressEditBtn.addEventListener("click", () => {
  billingAddressPopup.style.display = "initial";
});

let closeBillingPopup = document.getElementById("closeBillingPopup");
closeBillingPopup.addEventListener("click", () => {
  billingAddressPopup.style.display = " none";
});

let cancelBillingPopup = document.getElementById("cancelBtn");
cancelBillingPopup.addEventListener("click", () => {
  billingAddressPopup.style.display = " none";
});

// Get Inputs from Billing Address Form
let addressL1 = document.getElementById("addressLine1");
let addressL2 = document.getElementById("addressLine2");
let addressL3 = document.getElementById("addressLine3");
let townCity = document.getElementById("townCity");
let stateRegion = document.getElementById("stateRegion");
let postalZipCode = document.getElementById("postalZipCode");
let country = document.getElementById("country");

let billingAddressForm = document.getElementById("addressForm");
billingAddressForm.addEventListener("submit", (e) => {
  let billingAddressDetails = [
    addressL1.value,
    addressL2.value,
    addressL3.value,
    townCity.value,
    stateRegion.value,
    postalZipCode.value,
    country.value,
  ];
  let txt = "";
  billingAddressDetails.forEach((detail) => {
    if (detail !== "" || detail !== null) {
      txt += detail + "/";
    }
  });
  billingAddressTxt.innerText = txt;
  addressErrorMsg.innerText = "";
  alert("Billing address updated");
  e.preventDefault();
  billingAddressPopup.style.display = " none";
});

// Contact Form Validation

let editContactDetailsBtn = document.getElementById("contactEditBtn");
let contactDetailsPopup = document.getElementById("contactPopup");
editContactDetailsBtn.addEventListener("click", () => {
  contactDetailsPopup.style.display = "initial";
});

let closeContactPopUp = document.getElementById("closeContactPopup");
closeContactPopUp.addEventListener("click", () => {
  contactDetailsPopup.style.display = "none";
});

let cancelContactPopUp = document.getElementById("cancelBtn2");
cancelContactPopUp.addEventListener("click", () => {
  contactDetailsPopup.style.display = "none";
});

contactDetailsPopup.addEventListener("submit", (e) => {
  nameTxt.innerText = personName.value;
  emailTxt.innerText = email.value;
  contactNumTxt.innerText = contactNum.value;
  contactErrorMsg.innerText = "";
  alert("Contact details updated");
  e.preventDefault();
  contactDetailsPopup.style.display = "none";
});
