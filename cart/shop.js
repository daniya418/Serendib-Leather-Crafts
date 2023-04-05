let cartIcn = document.getElementById("cartIcn");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

var cartIndicator = document.getElementById("cartItemIndicator");

var itemCount = 0;

var cartItems;

updateTotal();

// Open Cart
cartIcn.onclick = () => {
  cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Card Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  // Remove Items From Cart
  var removeCartBtns = document.getElementsByClassName("bi-trash-fill");
  for (var i = 0; i < removeCartBtns.length; i++) {
    var button = removeCartBtns[i];
    button.addEventListener("click", removeCartItem);
  }
  //   Quantity Changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var j = 0; j < quantityInputs.length; j++) {
    var input = quantityInputs[j];
    input.addEventListener("change", quantityChanged);
  }
  //   Add to Cart
  var addCart = document.getElementsByClassName("add-to-cart-btn");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", (event) => {
      var shopProducts = event.target.parentElement;
      var title =
        shopProducts.getElementsByClassName("card-title")[0].innerText;
      var price =
        shopProducts.getElementsByClassName("card-price")[0].innerText;
      var productImages = event.target.parentElement.parentElement;
      var productImg =
        productImages.getElementsByClassName("product-img")[0].src;
      addProductToCart(title, price, productImg);
      updateTotal();
      cartIndicator.innerText = itemCount;
    });
  }
}

//   Buy Button Work
let buyBtn = document.querySelector(".btn-buy");

let contactPopup = document.getElementById("contactPopup");

document.getElementById("cancelBtn2").addEventListener("click", () => {
  contactPopup.style.display = "none";
});

document.getElementById("closeContactPopup").addEventListener("click", () => {
  contactPopup.style.display = "none";
});

buyBtn.addEventListener("click", () => {
  let items = cartItems.getElementsByClassName("cart-box");
  if (items.length === 0) {
    buyBtn.disabled = true;
  } else {
    buyBtn.disabled = false;
    contactPopup.style.display = "initial";
    document.getElementById("contactPopup").addEventListener("submit", () => {
      let name = document.querySelector("#personName");
      let email = document.querySelector("#email");

      let cartPrice = document.querySelector(".total-price");
      localStorage.setItem("cartPrice", cartPrice.innerText);

      localStorage.setItem("name", name.value);
      localStorage.setItem("email", email.value);
      saveToLocalStorage();
      alert("Order placed successfully");
      document.location.href = "payment.html";
    });
  }
});

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to cart");
      return;
    }
  }

  var cartBoxContent = `<img
src="${productImg}"
alt=""
class="cart-img"
/>
<div class="detail-box">
<div class="cart-product-title">${title}</div>
<div class="cart-price">${price}</div>
<input type="number" value="1" min="1" class="cart-quantity" />
</div>
<!-- Remove Cart -->
<i class="bi bi-trash-fill"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("bi-trash-fill")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  itemCount++;
}

// Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 1) {
    input.value = 1;
  }
  updateTotal();
}

// Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
  itemCount--;
  cartIndicator.innerText = itemCount;
}

// Update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var k = 0; k < cartBoxes.length; k++) {
    var cartBox = cartBoxes[k];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

let clearBtn = document
  .getElementsByClassName("btn-clear")[0]
  .addEventListener("click", () => {
    let items = cartItems.getElementsByClassName("cart-box");
    console.log(items.length);
    for (var i = items.length - 1; i >= 0; i--) {
      items[i].remove();
      updateTotal();
      // items[i].parentNode.removeChild(items[i]);
    }
    console.log(items);
  });

function saveToLocalStorage() {
  let imgURLs = [];
  let itemNames = [];
  let itemPrices = [];
  let itemQty = [];

  let imgs = cartItems.getElementsByClassName("cart-img");
  for (var i = 0; i < imgs.length; i++) {
    imgURLs.push(imgs[i].src);
  }
  localStorage.setItem("imgURLs", JSON.stringify(imgURLs));
  let names = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < names.length; i++) {
    itemNames.push(names[i].innerText);
  }
  localStorage.setItem("itemNames", JSON.stringify(itemNames));
  let prices = cartItems.getElementsByClassName("cart-price");
  for (var i = 0; i < prices.length; i++) {
    itemPrices.push(prices[i].innerText);
  }
  localStorage.setItem("itemPrices", JSON.stringify(itemPrices));
  let itemQtys = cartItems.getElementsByClassName("cart-quantity");
  for (var i = 0; i < itemQtys.length; i++) {
    itemQty.push(itemQtys[i].value);
  }
  localStorage.setItem("itemQty", JSON.stringify(itemQty));
}
