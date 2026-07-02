/*=====================================
        WISHLIST COUNT / CART COUNT
        (defined in main.js, called here
        so counts are correct on load)
=====================================*/

updateWishlistCount();
updateCartCount();


/*=====================================
        ORDERS COUNT
=====================================*/

const ordersCount =
    document.getElementById("ordersCount");

if (ordersCount) {

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    ordersCount.innerText =
        orders.length;

}


/*=====================================
        TRACKING COUNT
=====================================*/

const trackingCount =
    document.getElementById("trackingCount");

if (trackingCount) {

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const activeOrders =
        orders.filter(order => order.status !== "Delivered");

    trackingCount.innerText =
        activeOrders.length;

}


/*=====================================
        PROFILE PAGE
======================================*/

const profileName = document.getElementById("profileName");

const fullName = document.getElementById("fullName");

const email = document.getElementById("email");

const phone = document.getElementById("phone");

const dob = document.getElementById("dob");

const updateBtn = document.getElementById("updateProfile");



// Load Saved Profile

if (fullName) {

    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile) {

        fullName.value = profile.fullName || "";

        email.value = profile.email || "";

        phone.value = profile.phone || "";

        dob.value = profile.dob || "";

        profileName.textContent = profile.fullName || "Customer";

    }

}



// Save Profile

if (updateBtn) {

    updateBtn.addEventListener("click", () => {

        const profile = {

            fullName: fullName.value,

            email: email.value,

            phone: phone.value,

            dob: dob.value

        };

        localStorage.setItem("profile", JSON.stringify(profile));

        profileName.textContent = profile.fullName || "Customer";

        alert("✅ Profile Updated Successfully!");

    });

}

/*=====================================
        PROFILE IMAGE
======================================*/

const profileUpload = document.getElementById("profileUpload");

const profileAvatar = document.getElementById("profileAvatar");

if (profileUpload) {

    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {

        profileAvatar.src = savedImage;

    }

    profileUpload.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            profileAvatar.src = e.target.result;

            localStorage.setItem("profileImage", e.target.result);

        }

        reader.readAsDataURL(file);

    });

}

/*=====================================
        CHANGE PASSWORD
======================================*/

const changePasswordBtn = document.getElementById("changePasswordBtn");

if (changePasswordBtn) {

    changePasswordBtn.addEventListener("click", () => {

        const currentPassword =
            document.getElementById("currentPassword").value.trim();

        const newPassword =
            document.getElementById("newPassword").value.trim();

        const confirmPassword =
            document.getElementById("confirmNewPassword").value.trim();

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            alert("Please fill in all password fields.");

            return;

        }

        if (newPassword.length < 8) {

            alert("New password must be at least 8 characters.");

            return;

        }

        if (newPassword !== confirmPassword) {

            alert("New passwords do not match.");

            return;

        }

        const loggedInUser = getLoggedInUser();

        if (!loggedInUser) {

            alert("User not found.");

            return;

        }

        if (loggedInUser.password !== currentPassword) {

            alert("Current password is incorrect.");

            return;

        }

        loggedInUser.password = newPassword;

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        users = users.map(user => {

            if (user.email === loggedInUser.email) {

                user.password = newPassword;

            }

            return user;

        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("✅ Password changed successfully.");

        document.getElementById("currentPassword").value = "";

        document.getElementById("newPassword").value = "";

        document.getElementById("confirmNewPassword").value = "";

    });

}

/*=====================================
        PASSWORD TOGGLE
======================================*/

document.querySelectorAll(".password-toggle").forEach(icon => {

    icon.addEventListener("click", function () {

        const input = document.getElementById(this.dataset.target);

        if (input.type === "password") {

            input.type = "text";

            this.classList.remove("fa-eye");

            this.classList.add("fa-eye-slash");

        } else {

            input.type = "password";

            this.classList.remove("fa-eye-slash");

            this.classList.add("fa-eye");

        }

    });

});

/*=====================================
        WISHLIST PAGE
======================================*/

const wishlistContainer = document.getElementById("wishlistContainer");
const emptyWishlist = document.getElementById("emptyWishlist");

if (wishlistContainer) {

    renderWishlist();

}

function renderWishlist() {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.classList.add("d-none");

        emptyWishlist.classList.remove("d-none");

        return;

    }

    wishlistContainer.classList.remove("d-none");

    emptyWishlist.classList.add("d-none");

    wishlist.forEach((product, index) => {

        wishlistContainer.innerHTML += `

        <div class="col-lg-4 col-md-6">

            <div class="wishlist-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="wishlist-content">

                    <h5>${product.name}</h5>

                    <div class="wishlist-price">

    ${product.price.startsWith("$") ? product.price : "$" + product.price}

</div>

                    <div class="wishlist-actions">

                        <button class="btn btn-success move-cart"

                            data-index="${index}">

                            <i class="fa-solid fa-cart-shopping me-2"></i>

                            Move To Cart

                        </button>

                        <a href="#"
   class="btn btn-primary view-product"
   data-index="${index}">

                            <i class="fa-solid fa-eye me-2"></i>

                            View Details

                        </a>

                        <button class="btn btn-outline-danger remove-wishlist"

                            data-index="${index}">

                            <i class="fa-solid fa-trash me-2"></i>

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    attachWishlistEvents();

}

/*=====================================
        REMOVE PRODUCT
======================================*/

function attachWishlistEvents() {

    document.querySelectorAll(".remove-wishlist").forEach(button => {

        button.addEventListener("click", function () {

            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            wishlist.splice(this.dataset.index, 1);

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            renderWishlist();

            updateWishlistCount();

        });

    });

    /*=====================================
            MOVE TO CART
    ======================================*/

    document.querySelectorAll(".move-cart").forEach(button => {

        button.addEventListener("click", function () {

            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const product = wishlist[this.dataset.index];

            const exists = cart.some(item => item.name === product.name);

            if (!exists) {

                cart.push({

                    ...product,

                    quantity: product.quantity || 1

                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            wishlist.splice(this.dataset.index, 1);

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            renderWishlist();

            updateWishlistCount();

            updateCartCount();

            alert("Moved to Cart!");

        });

    });

    /*=====================================
         VIEW DETAILS
 ======================================*/

    document.querySelectorAll(".view-product").forEach(button => {

        button.addEventListener("click", function (e) {

            e.preventDefault();

            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            const product = wishlist[this.dataset.index];

            localStorage.setItem(
                "selectedProduct",
                JSON.stringify(product)
            );

            window.location.href = "product-details.html";

        });

    });
}

/*=====================================
            CART PAGE
======================================*/

const cartContainer = document.getElementById("cartContainer");

const emptyCart = document.getElementById("emptyCart");

if (cartContainer) {

    renderCart();

}

function renderCart() {

    console.log("renderCart is running");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.classList.add("d-none");

        emptyCart.classList.remove("d-none");

        updateSummary([]);

        return;

    }

    cartContainer.classList.remove("d-none");

    emptyCart.classList.add("d-none");

    cart.forEach((product, index) => {

        if (!product.quantity) {

            product.quantity = 1;

        }

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div class="row align-items-center">

                <div class="col-lg-3">

                    <img src="${product.image}"

                        class="img-fluid"

                        alt="${product.name}">

                </div>

                <div class="col-lg-5">

                    <h4 class="cart-title">

                        ${product.name}

                    </h4>

                    <div class="cart-price">

                        $${parseFloat(product.price.replace("$", "")).toFixed(2)}

                    </div>

                    <div class="quantity-box">

                        <button class="quantity-btn decrease"

                            data-index="${index}">

                            -

                        </button>

                        <span class="quantity">

                            ${product.quantity}

                        </span>

                        <button class="quantity-btn increase"

                            data-index="${index}">

                            +

                        </button>

                    </div>

                </div>

                <div class="col-lg-4 text-end">

                    <h5>

                        $${(product.quantity * parseFloat(product.price.replace("$", ""))).toFixed(2)}
                    </h5>

                    <button

                        class="btn btn-outline-danger rounded-pill remove-cart"

                        data-index="${index}">

                        <i class="fa-solid fa-trash me-2"></i>

                        Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    attachCartEvents();

    updateSummary(cart);

}

/*=====================================
        CART EVENTS
======================================*/

function attachCartEvents() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".increase").forEach(button => {

        button.addEventListener("click", function () {

            cart[this.dataset.index].quantity++;

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();

        });

    });

    document.querySelectorAll(".decrease").forEach(button => {

        button.addEventListener("click", function () {

            if (cart[this.dataset.index].quantity > 1) {

                cart[this.dataset.index].quantity--;

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();

        });

    });

    document.querySelectorAll(".remove-cart").forEach(button => {

        button.addEventListener("click", function () {

            cart.splice(this.dataset.index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();

            updateCartCount();

        });

    });

}

/*=====================================
        ORDER SUMMARY
======================================*/

function updateSummary(cart) {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.quantity * parseFloat(item.price.replace("$", ""));

    });

    const delivery = cart.length ? 10 : 0;

    const tax = subtotal * 0.05;

    const total = subtotal + delivery + tax;

    document.getElementById("subtotal").innerText =

        "$" + subtotal.toFixed(2);

    document.getElementById("tax").innerText =

        "$" + tax.toFixed(2);

    document.getElementById("grandTotal").innerText =

        "$" + total.toFixed(2);

}

/*=====================================
        CHECKOUT
======================================*/

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }

        window.location.href = "checkout.html";

    });

}

/*=====================================
        CHECKOUT PAGE
======================================*/

const checkoutName = document.getElementById("checkoutName");
const checkoutEmail = document.getElementById("checkoutEmail");
const checkoutPhone = document.getElementById("checkoutPhone");

if (checkoutName) {

    const user = getLoggedInUser();

    if (user) {

        checkoutName.value = user.name || "";

        checkoutEmail.value = user.email || "";

        checkoutPhone.value = user.phone || "";

    }

}

const checkoutProducts = document.getElementById("checkoutProducts");

const subtotalElement = document.getElementById("checkoutSubtotal");

const deliveryElement = document.getElementById("checkoutDelivery");

const taxElement = document.getElementById("checkoutTax");

const totalElement = document.getElementById("checkoutTotal");

let deliveryCharge = 0;

function loadCheckoutSummary() {

    if (!checkoutProducts) return;

    let buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));

    let cart = buyNowProduct ? [buyNowProduct] : (JSON.parse(localStorage.getItem("cart")) || []);
    checkoutProducts.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        let price = parseFloat(item.price.replace("$", ""));

        subtotal += price * item.quantity;

        checkoutProducts.innerHTML += `

        <div class="checkout-product">

            <div>

                <div class="checkout-product-name">

                    ${item.name}

                </div>

                <small>

                    Qty : ${item.quantity}

                </small>

            </div>

            <div class="checkout-product-price">

                $${(price * item.quantity).toFixed(2)}

            </div>

        </div>

        `;

    });

    const tax = subtotal * 0.05;

    subtotalElement.innerText = "$" + subtotal.toFixed(2);

    deliveryElement.innerText = "$" + deliveryCharge.toFixed(2);

    taxElement.innerText = "$" + tax.toFixed(2);

    totalElement.innerText = "$" + (subtotal + tax + deliveryCharge).toFixed(2);

}

loadCheckoutSummary();

document.querySelectorAll(".delivery-option").forEach(option => {

    option.addEventListener("change", function () {

        deliveryCharge = parseFloat(this.value);

        loadCheckoutSummary();

    });

});

function showCheckoutError(inputId, errorId, message) {

    document.getElementById(inputId).classList.add("is-invalid");

    const error = document.getElementById(errorId);

    error.innerText = message;

    error.classList.remove("d-none");

}

function clearCheckoutErrors() {

    document.querySelectorAll(".is-invalid").forEach(field => {

        field.classList.remove("is-invalid");

    });

    document.querySelectorAll("[id$='Error']").forEach(error => {

        error.classList.add("d-none");

        error.innerText = "";

    });

}

/*=====================================
        CARD PAYMENT DETAILS
======================================*/

const cardPaymentDetails = document.getElementById("cardPaymentDetails");
const cardNumberInput = document.getElementById("cardNumber");
const cardExpiryInput = document.getElementById("cardExpiry");
const cardCvvInput = document.getElementById("cardCvv");

if (cardPaymentDetails) {

    document.querySelectorAll("input[name='payment']").forEach(option => {

        option.addEventListener("change", function () {

            if (document.getElementById("paymentCard").checked) {

                cardPaymentDetails.classList.remove("d-none");

            } else {

                cardPaymentDetails.classList.add("d-none");

            }

        });

    });

}

/* Auto-format card number + detect brand */

if (cardNumberInput) {

    cardNumberInput.addEventListener("input", function () {

        const digits = this.value.replace(/\D/g, "").slice(0, 16);

        this.value = digits.replace(/(.{4})/g, "$1 ").trim();

        let brand = "";

        if (/^4/.test(digits)) brand = "visa";
        else if (/^5[1-5]/.test(digits)) brand = "mastercard";
        else if (/^3[47]/.test(digits)) brand = "amex";

        document.querySelectorAll(".card-brand-icons i").forEach(icon => {

            icon.classList.toggle("active", icon.dataset.brand === brand);

        });

    });

}

/* Auto-format expiry as MM/YY */

if (cardExpiryInput) {

    cardExpiryInput.addEventListener("input", function () {

        const digits = this.value.replace(/\D/g, "").slice(0, 4);

        this.value = digits.length >= 3
            ? digits.slice(0, 2) + "/" + digits.slice(2)
            : digits;

    });

}

/* Restrict CVV to digits only */

if (cardCvvInput) {

    cardCvvInput.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "").slice(0, 4);

    });

}

const placeOrderBtn = document.getElementById("placeOrderBtn");

if (placeOrderBtn) {

    /* Auth Guard: checkout requires login */

    requireCustomerLogin("Please login to place your order.");

    placeOrderBtn.addEventListener("click", function () {

        const loggedInUser = requireCustomerLogin("Please login to place your order.");

        if (!loggedInUser) return;

        clearCheckoutErrors();

        let valid = true;

        if (checkoutName.value.trim() === "") {

            showCheckoutError(

                "checkoutName",

                "checkoutNameError",

                "Full Name is required."

            );

            valid = false;

        }

        if (checkoutEmail.value.trim() === "") {

            showCheckoutError(

                "checkoutEmail",

                "checkoutEmailError",

                "Email is required."

            );

            valid = false;

        }

        const phone = document.getElementById("checkoutPhone").value.trim();

        if (!/^[6-9]\d{9}$/.test(phone)) {

            showCheckoutError(

                "checkoutPhone",

                "checkoutPhoneError",

                "Enter a valid phone number."

            );

            valid = false;

        }

        if (document.getElementById("checkoutAddress").value.trim() === "") {

            showCheckoutError(

                "checkoutAddress",

                "checkoutAddressError",

                "Address is required."

            );

            valid = false;

        }

        if (document.getElementById("checkoutCity").value.trim() === "") {

            showCheckoutError(

                "checkoutCity",

                "checkoutCityError",

                "City is required."

            );

            valid = false;

        }

        if (document.getElementById("checkoutState").value.trim() === "") {

            showCheckoutError(

                "checkoutState",

                "checkoutStateError",

                "State is required."

            );

            valid = false;

        }

        const pin = document.getElementById("checkoutPincode").value.trim();

        if (!/^\d{6}$/.test(pin)) {

            showCheckoutError(

                "checkoutPincode",

                "checkoutPincodeError",

                "Enter a valid 6-digit pincode."

            );

            valid = false;

        }

        /* Card Payment Validation */

        const paymentCardOption = document.getElementById("paymentCard");

        if (paymentCardOption && paymentCardOption.checked) {

            const cardNumberDigits =
                document.getElementById("cardNumber").value.replace(/\D/g, "");

            const cardName =
                document.getElementById("cardName").value.trim();

            const cardExpiry =
                document.getElementById("cardExpiry").value.trim();

            const cardCvv =
                document.getElementById("cardCvv").value.trim();

            if (cardNumberDigits.length !== 16) {

                showCheckoutError(
                    "cardNumber",
                    "cardNumberError",
                    "Enter a valid 16-digit card number."
                );

                valid = false;

            }

            if (cardName === "") {

                showCheckoutError(
                    "cardName",
                    "cardNameError",
                    "Name on card is required."
                );

                valid = false;

            }

            const expiryMatch = /^(\d{2})\/(\d{2})$/.exec(cardExpiry);

            if (!expiryMatch) {

                showCheckoutError(
                    "cardExpiry",
                    "cardExpiryError",
                    "Enter expiry as MM/YY."
                );

                valid = false;

            } else {

                const expMonth = parseInt(expiryMatch[1], 10);
                const expYear = parseInt(expiryMatch[2], 10) + 2000;

                const now = new Date();
                const currentYear = now.getFullYear();
                const currentMonth = now.getMonth() + 1;

                if (
                    expMonth < 1 || expMonth > 12 ||
                    expYear < currentYear ||
                    (expYear === currentYear && expMonth < currentMonth)
                ) {

                    showCheckoutError(
                        "cardExpiry",
                        "cardExpiryError",
                        "Card has expired or date is invalid."
                    );

                    valid = false;

                }

            }

            if (!/^\d{3,4}$/.test(cardCvv)) {

                showCheckoutError(
                    "cardCvv",
                    "cardCvvError",
                    "Enter a valid CVV."
                );

                valid = false;

            }

        }

        if (!valid) {

            return;

        }

        let buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));

        let cart = buyNowProduct
            ? [buyNowProduct]
            : (JSON.parse(localStorage.getItem("cart")) || []);

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }

        const order = {

            id: "FD" + Math.floor(1000 + Math.random() * 9000),

            userEmail: loggedInUser.email,

            customer: checkoutName.value,

            email: checkoutEmail.value,

            phone: checkoutPhone.value,

            address: document.getElementById("checkoutAddress").value,

            city: document.getElementById("checkoutCity").value,

            state: document.getElementById("checkoutState").value,

            pincode: document.getElementById("checkoutPincode").value,

            delivery: document.querySelector(".delivery-option:checked").nextElementSibling.innerText,

            payment: document.querySelector("input[name='payment']:checked").nextElementSibling.innerText,

            paymentDetail: (paymentCardOption && paymentCardOption.checked)
                ? "Card ending in " + document.getElementById("cardNumber").value.replace(/\D/g, "").slice(-4)
                : "",

            date: new Date().toLocaleDateString(),

            status: "Processing",

            items: cart,

            subtotal: subtotalElement.innerText,

            deliveryCharge: deliveryElement.innerText,

            tax: taxElement.innerText,

            total: totalElement.innerText

        };

        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        orders.unshift(order);

        localStorage.setItem("orders", JSON.stringify(orders));

        localStorage.removeItem("cart");
        localStorage.removeItem("buyNowProduct");

        alert("Order placed successfully!");

        window.location.href = "dash-orders.html";

    });

}

/*=====================================
            ORDERS PAGE
======================================*/

const ordersContainer = document.getElementById("ordersContainer");

const emptyOrders = document.getElementById("emptyOrders");

function loadOrders() {

    if (!ordersContainer) return;

    const loggedInUser = getLoggedInUser();

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const orders = loggedInUser
        ? allOrders.filter(order => order.userEmail === loggedInUser.email)
        : [];

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {

        ordersContainer.classList.add("d-none");

        emptyOrders.classList.remove("d-none");

        return;

    }

    ordersContainer.classList.remove("d-none");

    emptyOrders.classList.add("d-none");

    orders.forEach(order => {

        let items = "";

        order.items.forEach(item => {

            items += `
                <li>${item.name} × ${item.quantity}</li>
            `;

        });

        ordersContainer.innerHTML += `

        <div class="order-card">

            <div class="row align-items-center">

                <div class="col-lg-8">

                    <div class="order-id">

                        Order ID : <strong>${order.id}</strong>

                    </div>

                    <div class="order-date mt-2">

                        <i class="fa-regular fa-calendar me-2"></i>

                        ${order.date}

                    </div>

                    <ul class="mt-3">

                        ${items}

                    </ul>

                </div>

                <div class="col-lg-4 text-lg-end">

                    <h4 class="mb-3">

                        ${order.total}

                    </h4>

                    <span class="status-badge ${order.status.toLowerCase().replace(/\s/g, '-')}">

                        ${order.status}

                    </span>

                    <div class="mt-4">

                        <a href="order-details.html"

                            class="btn btn-primary rounded-pill view-order"

                            data-order="${order.id}">

                            <i class="fa-solid fa-eye me-2"></i>

                            View Details

                        </a>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}

loadOrders();

const searchOrder = document.getElementById("searchOrder");

if (searchOrder) {

    searchOrder.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        document.querySelectorAll(".order-card").forEach(card => {

            if (card.innerText.toLowerCase().includes(keyword)) {

                card.style.display = "";

            }

            else {

                card.style.display = "none";

            }

        });

    });

}

const statusFilter = document.getElementById("statusFilter");

if (statusFilter) {

    statusFilter.addEventListener("change", function () {

        const value = this.value;

        document.querySelectorAll(".order-card").forEach(card => {

            if (value === "all") {

                card.style.display = "";

            }

            else if (card.innerText.includes(value)) {

                card.style.display = "";

            }

            else {

                card.style.display = "none";

            }

        });

    });

}

document.addEventListener("click", function (e) {

    if (e.target.closest(".view-order")) {

        const orderId = e.target.closest(".view-order").dataset.order;

        localStorage.setItem("selectedOrder", orderId);

    }

});

/*=====================================
        ORDER DETAILS PAGE
======================================*/

const orderSummary = document.getElementById("orderSummary");

const orderedProducts = document.getElementById("orderedProducts");

const customerInfo = document.getElementById("customerInfo");

function loadOrderDetails() {

    if (!orderSummary) return;

    const selectedOrderId = localStorage.getItem("selectedOrder");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const order = orders.find(item => item.id === selectedOrderId);

    if (!order) {

        orderSummary.innerHTML = `

            <div class="alert alert-danger">

                Order not found.

            </div>

        `;

        return;

    }

    orderSummary.innerHTML = `

        <div class="row">

            <div class="col-md-6 mb-3">

                <strong>Order ID</strong><br>

                ${order.id}

            </div>

            <div class="col-md-6 mb-3">

                <strong>Order Date</strong><br>

                ${order.date}

            </div>

            <div class="col-md-6 mb-3">

                <strong>Status</strong><br>

                <span class="status-badge ${order.status.toLowerCase().replace(/\s/g, '-')}">

                    ${order.status}

                </span>

            </div>

            <div class="col-md-6 mb-3">

                <strong>Payment Method</strong><br>

                ${order.payment}${order.paymentDetail ? " (" + order.paymentDetail + ")" : ""}

            </div>

            <div class="col-md-6 mb-3">

                <strong>Delivery Method</strong><br>

                ${order.delivery}

            </div>

            <div class="col-md-6 mb-3">

                <strong>Subtotal</strong><br>

                ${order.subtotal}

            </div>

            <div class="col-md-6 mb-3">

                <strong>Delivery Charge</strong><br>

                ${order.deliveryCharge}

            </div>

            <div class="col-md-6 mb-3">

                <strong>Tax</strong><br>

                ${order.tax}

            </div>

            <div class="col-md-12">

                <h4 class="text-primary">

                    Total : ${order.total}

                </h4>

            </div>

        </div>

    `;

    orderedProducts.innerHTML = "";

    order.items.forEach(product => {

        orderedProducts.innerHTML += `

        <div class="product-row">

            <div class="row align-items-center">

                <div class="col-lg-2">

                    <img

                        src="${product.image}"

                        class="img-fluid rounded-4">

                </div>

                <div class="col-lg-4">

                    <h5>

                        ${product.name}

                    </h5>

                </div>

                <div class="col-lg-2">

                    ${product.price}

                </div>

                <div class="col-lg-2">

                    Qty : ${product.quantity}

                </div>

                <div class="col-lg-2 text-end">

                    <strong>

                        $${(

                parseFloat(product.price.replace("$", ""))

                * product.quantity

            ).toFixed(2)}

                    </strong>

                </div>

            </div>

        </div>

        `;

    });

    customerInfo.innerHTML = `

    <p>

        <strong>Name</strong><br>

        ${order.customer}

    </p>

    <p>

        <strong>Email</strong><br>

        ${order.email}

    </p>

    <p>

        <strong>Phone</strong><br>

        ${order.phone}

    </p>

    <p>

        <strong>Address</strong><br>

        ${order.address}

    </p>

    <p>

        <strong>City</strong><br>

        ${order.city}

    </p>

    <p>

        <strong>State</strong><br>

        ${order.state}

    </p>

    <p>

        <strong>Pincode</strong><br>

        ${order.pincode}

    </p>

`;

}

loadOrderDetails();


const trackOrderBtn = document.getElementById("trackOrderBtn");

if (trackOrderBtn) {

    trackOrderBtn.addEventListener("click", function (e) {

        e.preventDefault();

        window.location.href = "dash-track.html";

    });

}


/*  Tracking */

const trackingTimeline = document.getElementById("trackingTimeline");

const trackSummary = document.getElementById("trackSummary");

const selectedOrderId = localStorage.getItem("selectedOrder");

const orders = JSON.parse(localStorage.getItem("orders")) || [];

const order = orders.find(item => item.id === selectedOrderId);

if (!order) {

    console.log("Order not found");

}

if (trackSummary && order) {

    trackSummary.innerHTML = `

<div class="summary-row">

    <div class="summary-left">

        <div class="summary-icon">

            <i class="fa-solid fa-hashtag"></i>

        </div>

        <div class="summary-title">

            Order ID

        </div>

    </div>

    <div class="summary-value">

        ${order.id}

    </div>

</div>

<div class="summary-row">

    <div class="summary-left">

        <div class="summary-icon">

            <i class="fa-solid fa-user"></i>

        </div>

        <div class="summary-title">

            Customer

        </div>

    </div>

    <div class="summary-value">

        ${order.customer}

    </div>

</div>

<div class="summary-row">

    <div class="summary-left">

        <div class="summary-icon">

            <i class="fa-solid fa-envelope"></i>

        </div>

        <div class="summary-title">

            Email

        </div>

    </div>

    <div class="summary-value">

        ${order.email}

    </div>

</div>

<div class="summary-row">

    <div class="summary-left">

        <div class="summary-icon">

            <i class="fa-solid fa-phone"></i>

        </div>

        <div class="summary-title">

            Phone

        </div>

    </div>

    <div class="summary-value">

        ${order.phone}

    </div>

</div>

<div class="summary-row">

    <div class="summary-left">

        <div class="summary-icon">

            <i class="fa-solid fa-location-dot"></i>

        </div>

        <div class="summary-title">

            Delivery Address

        </div>

    </div>

    <div class="summary-value">

        ${order.city}

    </div>

</div>

<div class="summary-row">

    <div class="summary-left">

        <div class="summary-icon">

            <i class="fa-solid fa-credit-card"></i>

        </div>

        <div class="summary-title">

            Payment

        </div>

    </div>

    <div class="summary-value">

        ${order.payment}

    </div>

</div>

<div class="summary-row">

    <div class="summary-left">

        <div class="summary-icon">

            <i class="fa-solid fa-truck"></i>

        </div>

        <div class="summary-title">

            Delivery Type

        </div>

    </div>

    <div class="summary-value">

        ${order.delivery}

    </div>

</div>

<div class="track-total">

    <span>Total Amount</span>

    <h2>${order.total}</h2>

</div>

`;
}


/*tracking section*/

if (trackingTimeline && trackSummary && order) {

    trackingTimeline.innerHTML = `

<div class="track-step completed">

    <div class="track-icon">

        <i class="fa-solid fa-check"></i>

    </div>

    <div class="track-content">

        <h5>Order Placed</h5>

        <small>${order.date}</small>

        <p>Your order has been placed successfully.</p>

    </div>

</div>

<div class="track-step active">

    <div class="track-icon">

        <i class="fa-solid fa-box"></i>

    </div>

    <div class="track-content">

        <h5>${order.status}</h5>

        <small>Current Status</small>

        <p>Your order is currently ${order.status.toLowerCase()}.</p>

    </div>

</div>

<div class="track-step pending">

    <div class="track-icon">

        <i class="fa-solid fa-truck-fast"></i>

    </div>

    <div class="track-content">

        <h5>Out For Delivery</h5>

        <small>Waiting...</small>

        <p>Your bouquet will be dispatched soon.</p>

    </div>

</div>

<div class="track-step pending">

    <div class="track-icon">

        <i class="fa-solid fa-location-dot"></i>

    </div>

    <div class="track-content">

        <h5>Delivered</h5>

        <small>Waiting...</small>

        <p>Your flowers will arrive soon.</p>

    </div>

</div>

`;
}

/*=====================================
        LIVE RIDER MAP
======================================*/

const riderMapEl = document.getElementById("riderMap");

if (riderMapEl && order && typeof L !== "undefined") {

    /* Deterministic pseudo-random offset so each order gets a
       slightly different, but consistent, delivery route */

    function seededOffset(str, index) {

        let hash = 0;

        for (let i = 0; i < str.length; i++) {

            hash = (hash * 31 + str.charCodeAt(i) + index * 17) % 1000;

        }

        return (hash / 1000 - 0.5) * 0.06;

    }

    const storeLatLng = [40.7128, -74.0060];

    const destLatLng = [
        storeLatLng[0] + seededOffset(order.id, 1),
        storeLatLng[1] + seededOffset(order.id, 2)
    ];

    const midLatLng = [
        (storeLatLng[0] + destLatLng[0]) / 2 + seededOffset(order.id, 3) * 0.4,
        (storeLatLng[1] + destLatLng[1]) / 2 + seededOffset(order.id, 4) * 0.4
    ];

    const routePoints = [storeLatLng, midLatLng, destLatLng];

    const map = L.map("riderMap", {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false
    }).setView(storeLatLng, 13);

    const isDarkMap = document.body.classList.contains("dark-mode");

    const tileUrl = isDarkMap
        ? "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);

    const storeIcon = L.divIcon({
        html: '<div class="map-pin map-pin-store"><i class="fa-solid fa-store"></i></div>',
        className: "",
        iconSize: [34, 34],
        iconAnchor: [17, 34]
    });

    const homeIcon = L.divIcon({
        html: '<div class="map-pin map-pin-home"><i class="fa-solid fa-house"></i></div>',
        className: "",
        iconSize: [34, 34],
        iconAnchor: [17, 34]
    });

    const riderIcon = L.divIcon({
        html: '<div class="map-pin map-pin-rider"><i class="fa-solid fa-motorcycle"></i></div>',
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    L.marker(storeLatLng, { icon: storeIcon }).addTo(map).bindTooltip("FloraDaily Store");

    L.marker(destLatLng, { icon: homeIcon }).addTo(map).bindTooltip("Delivery Address");

    const routeLine = L.polyline(routePoints, {
        color: "#E91E8C",
        weight: 4,
        opacity: 0.8,
        dashArray: "8, 8"
    }).addTo(map);

    map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

    const riderMarker = L.marker(storeLatLng, { icon: riderIcon }).addTo(map);

    function pointAtProgress(t) {

        if (t <= 0.5) {

            const segT = t / 0.5;

            return [
                storeLatLng[0] + (midLatLng[0] - storeLatLng[0]) * segT,
                storeLatLng[1] + (midLatLng[1] - storeLatLng[1]) * segT
            ];

        }

        const segT = (t - 0.5) / 0.5;

        return [
            midLatLng[0] + (destLatLng[0] - midLatLng[0]) * segT,
            midLatLng[1] + (destLatLng[1] - midLatLng[1]) * segT
        ];

    }

    const riderEtaEl = document.getElementById("riderEta");

    const isDelivered = (order.status || "").toLowerCase().includes("deliver");

    const totalDurationMs = 90000;

    const startTime = Date.now();

    function animateRider() {

        const elapsed = Date.now() - startTime;

        const progress = isDelivered ? 1 : Math.min(elapsed / totalDurationMs, 1);

        riderMarker.setLatLng(pointAtProgress(progress));

        if (riderEtaEl) {

            if (progress >= 1) {

                riderEtaEl.innerHTML =
                    '<i class="fa-solid fa-circle-check"></i> Delivered to your address';

            } else {

                const remainingMinutes = Math.max(1, Math.round((1 - progress) * 25));

                riderEtaEl.innerHTML =
                    '<i class="fa-solid fa-motorcycle"></i> Rider arriving in ' +
                    remainingMinutes + " min";

            }

        }

        if (progress < 1) {

            requestAnimationFrame(animateRider);

        }

    }

    animateRider();

}

/*=====================================
        PURCHASE HISTORY
======================================*/

const historyContainer = document.getElementById("historyContainer");
const historySearch = document.getElementById("historySearch");
const historyFilter = document.getElementById("historyFilter");

if (historyContainer) {

    const historyLoggedInUser = getLoggedInUser();

    const allHistoryOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const orders = historyLoggedInUser
        ? allHistoryOrders.filter(order => order.userEmail === historyLoggedInUser.email)
        : [];

    function renderHistory(list) {

        historyContainer.innerHTML = "";

        if (list.length === 0) {

            historyContainer.innerHTML = `
                <div class="alert alert-warning">
                    No purchase history found.
                </div>
            `;

            return;
        }

        list.slice().reverse().forEach(order => {

            historyContainer.innerHTML += `

            <div class="history-card">

                <div class="row align-items-center">

                    <div class="col-lg-7">

                        <h3>Order ID : ${order.id}</h3>

                        <div class="history-date">

                            <i class="fa-regular fa-calendar me-2"></i>

                            ${order.date}

                        </div>

                        <div class="history-products">

                            ${order.items.map(item => `${item.name} × ${item.quantity}`).join("<br>")}

                        </div>

                    </div>

                    <div class="col-lg-5 text-lg-end">

                        <div class="history-total">

                            ${order.total}

                        </div>

                        <span class="badge bg-success rounded-pill px-3 py-2 mt-3">

                            ${order.status}

                        </span>

                        <div class="history-actions">

                            <button
                                class="btn btn-primary rounded-pill view-history"
                                data-order="${order.id}">

                                <i class="fa-solid fa-eye me-2"></i>

                                View Details

                            </button>

                            <button
                                class="btn btn-outline-primary rounded-pill reorder-btn ms-2"
                                data-order="${order.id}">

                                <i class="fa-solid fa-rotate-right me-2"></i>

                                Reorder

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            `;

        });

    }

    renderHistory(orders);

    function filterHistory() {

        const keyword = historySearch ? historySearch.value.toLowerCase() : "";
        const status = historyFilter ? historyFilter.value : "all";

        const filtered = orders.filter(order => {

            const searchText =
                (
                    order.id +
                    " " +
                    order.date +
                    " " +
                    order.status +
                    " " +
                    order.items.map(i => i.name).join(" ")
                ).toLowerCase();

            const searchMatch = searchText.includes(keyword);

            const statusMatch =
                status === "all" || order.status === status;

            return searchMatch && statusMatch;

        });

        renderHistory(filtered);

    }

    if (historySearch) {

        historySearch.addEventListener("input", filterHistory);

    }

    if (historyFilter) {

        historyFilter.addEventListener("change", filterHistory);

    }

}

document.addEventListener("click", function (e) {

    const viewBtn = e.target.closest(".view-history");

    if (viewBtn) {

        localStorage.setItem(
            "selectedOrder",
            viewBtn.dataset.order
        );

        window.location.href = "order-details.html";

        return;

    }

    const reorderBtn = e.target.closest(".reorder-btn");

    if (reorderBtn) {

        const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

        const order = allOrders.find(o => o.id === reorderBtn.dataset.order);

        if (!order) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        order.items.forEach(orderedItem => {

            const existing = cart.find(cartItem => cartItem.name === orderedItem.name);

            if (existing) {

                existing.quantity = (existing.quantity || 1) + (orderedItem.quantity || 1);

            } else {

                cart.push({
                    name: orderedItem.name,
                    price: orderedItem.price,
                    image: orderedItem.image,
                    quantity: orderedItem.quantity || 1
                });

            }

        });

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert("Items from this order have been added to your cart.");

        window.location.href = "cart.html";

    }

});

/*=====================================
        DASHBOARD USER NAME
======================================*/

const dashboardUserName = document.getElementById("dashboardUserName");

if (dashboardUserName) {

    const user = getLoggedInUser();

    if (user) {

        dashboardUserName.innerText = user.name;

    }

}

/*=====================================
        LOAD USER PROFILE
======================================*/

const user = getLoggedInUser();

if (user) {

    // Left side profile name
    document.getElementById("profileName").innerText = user.name;

    // Right side form
    document.getElementById("fullName").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("dob").value = user.dob || "";

}

/*=====================================
    ADMIN DASHBOARD
=====================================*/

const adminOrdersTableBody = document.getElementById("adminOrdersTableBody");

if (adminOrdersTableBody) {

    /* Auth Guard */

    const adminSession = requireAdminAuth();

    if (adminSession) {

        const adminDisplayName = document.getElementById("adminDisplayName");

        if (adminDisplayName) {

            adminDisplayName.innerText = adminSession.name || "Admin";

        }

        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const customers = JSON.parse(localStorage.getItem("users")) || [];

        /*=====================================
            STATUS BADGE CLASS MAP
        =====================================*/

        function getStatusClass(status) {

            const normalized = (status || "").toLowerCase();

            if (normalized.includes("deliver")) return "delivered";
            if (normalized.includes("cancel")) return "cancelled";
            if (normalized.includes("transit") || normalized.includes("out")) return "out-for-delivery";
            if (normalized.includes("pack")) return "packed";

            return "processing";

        }

        /*=====================================
            STORE OVERVIEW STATS
        =====================================*/

        function renderAdminStats() {

            const totalOrders = orders.length;
            const totalCustomers = customers.length;

            const pendingOrders = orders.filter(o => {
                const s = (o.status || "").toLowerCase();
                return !s.includes("deliver") && !s.includes("cancel");
            }).length;

            const revenue = orders.reduce((sum, o) => {

                const amount = parseFloat(
                    String(o.total || "0").replace(/[^0-9.]/g, "")
                );

                return sum + (isNaN(amount) ? 0 : amount);

            }, 0);

            document.getElementById("statTotalOrders").innerText = totalOrders;
            document.getElementById("statTotalCustomers").innerText = totalCustomers;
            document.getElementById("statPendingOrders").innerText = pendingOrders;
            document.getElementById("statRevenue").innerText =
                "$" + revenue.toFixed(2);

        }

        renderAdminStats();

        /*=====================================
            ALL ORDERS TABLE
        =====================================*/

        function renderAdminOrders(list) {

            const emptyState = document.getElementById("adminOrdersEmpty");

            if (!list.length) {

                adminOrdersTableBody.innerHTML = "";
                emptyState.classList.remove("d-none");
                return;

            }

            emptyState.classList.add("d-none");

            adminOrdersTableBody.innerHTML = list.map(order => {

                const productNames = (order.items || [])
                    .map(item => item.name)
                    .join(", ") || "—";

                return `
                    <tr>
                        <td>#${order.id}</td>
                        <td>${productNames}</td>
                        <td>${order.date || "—"}</td>
                        <td>${order.total || "—"}</td>
                        <td>
                            <span class="status-badge ${getStatusClass(order.status)}">
                                ${order.status || "Processing"}
                            </span>
                        </td>
                        <td>
                            <button
                                class="btn btn-sm btn-outline-primary rounded-pill admin-view-order"
                                data-order="${order.id}">
                                <i class="fa-solid fa-eye me-1"></i>
                                View
                            </button>
                        </td>
                    </tr>
                `;

            }).join("");

            document.querySelectorAll(".admin-view-order").forEach(btn => {

                btn.addEventListener("click", () => {

                    const order = orders.find(o => o.id === btn.dataset.order);

                    if (!order) return;

                    const productNames = (order.items || [])
                        .map(item => `${item.name} × ${item.quantity || 1}`)
                        .join("<br>") || "—";

                    document.getElementById("adminOrderModalBody").innerHTML = `
                        <h6 class="mb-3">Order #${order.id}</h6>
                        <p><strong>Customer:</strong> ${order.customer || "—"}</p>
                        <p><strong>Email:</strong> ${order.email || "—"}</p>
                        <p><strong>Phone:</strong> ${order.phone || "—"}</p>
                        <p><strong>Address:</strong> ${order.address || "—"}, ${order.city || ""} ${order.state || ""} ${order.pincode || ""}</p>
                        <p><strong>Items:</strong><br>${productNames}</p>
                        <p><strong>Date:</strong> ${order.date || "—"}</p>
                        <p><strong>Payment:</strong> ${order.payment || "—"}${order.paymentDetail ? " (" + order.paymentDetail + ")" : ""}</p>
                        <p class="mb-0"><strong>Total:</strong> ${order.total || "—"}</p>
                    `;

                    const modal = new bootstrap.Modal(
                        document.getElementById("adminOrderModal")
                    );

                    modal.show();

                });

            });

        }

        renderAdminOrders(orders);

        /*=====================================
            ORDERS SEARCH + FILTER
        =====================================*/

        const adminOrderSearch = document.getElementById("adminOrderSearch");
        const adminOrderFilter = document.getElementById("adminOrderFilter");

        function applyAdminOrderFilters() {

            const keyword = adminOrderSearch
                ? adminOrderSearch.value.toLowerCase()
                : "";

            const statusFilter = adminOrderFilter
                ? adminOrderFilter.value
                : "all";

            const filtered = orders.filter(order => {

                const productNames = (order.items || [])
                    .map(item => item.name)
                    .join(" ")
                    .toLowerCase();

                const matchesKeyword =
                    order.id.toLowerCase().includes(keyword) ||
                    productNames.includes(keyword);

                const matchesStatus =
                    statusFilter === "all" ||
                    (order.status || "").toLowerCase().includes(statusFilter);

                return matchesKeyword && matchesStatus;

            });

            renderAdminOrders(filtered);

        }

        if (adminOrderSearch) {

            adminOrderSearch.addEventListener("input", applyAdminOrderFilters);

        }

        if (adminOrderFilter) {

            adminOrderFilter.addEventListener("change", applyAdminOrderFilters);

        }

        /*=====================================
            CUSTOMERS TABLE
        =====================================*/

        function renderAdminCustomers() {

            const tbody = document.getElementById("adminCustomersTableBody");
            const emptyState = document.getElementById("adminCustomersEmpty");

            if (!customers.length) {

                tbody.innerHTML = "";
                emptyState.classList.remove("d-none");
                return;

            }

            emptyState.classList.add("d-none");

            tbody.innerHTML = customers.map(user => `
                <tr>
                    <td>${user.name || "—"}</td>
                    <td>${user.email || "—"}</td>
                    <td>${user.phone || "—"}</td>
                    <td>${user.joined || "—"}</td>
                </tr>
            `).join("");

        }

        renderAdminCustomers();

        /*=====================================
            CONTACT MESSAGES (PLACEHOLDER)
        =====================================*/

        function renderAdminMessages() {

            const messages = JSON.parse(localStorage.getItem("contactMessages")) || [
                {
                    name: "Sophia Green",
                    email: "sophia@example.com",
                    subject: "Delivery delay question",
                    message: "Hi, I wanted to check if same-day delivery is available in my area.",
                    date: "24 Jun 2026"
                },
                {
                    name: "Daniel Brown",
                    email: "daniel@example.com",
                    subject: "Bulk order enquiry",
                    message: "Do you offer discounts for corporate bulk flower orders?",
                    date: "22 Jun 2026"
                },
                {
                    name: "Olivia Carter",
                    email: "olivia@example.com",
                    subject: "Thank you!",
                    message: "Just wanted to say the bouquet I ordered was beautiful. Thank you!",
                    date: "20 Jun 2026"
                }
            ];

            const list = document.getElementById("adminMessagesList");

            list.innerHTML = messages.map(msg => `
                <div class="col-lg-4 col-md-6">
                    <div class="dashboard-card h-100">
                        <div class="dashboard-icon">
                            <i class="fa-solid fa-envelope-open-text"></i>
                        </div>
                        <h5>${msg.subject}</h5>
                        <p class="mb-2">${msg.message}</p>
                        <small class="text-muted d-block mb-1">
                            <i class="fa-regular fa-user me-1"></i>
                            ${msg.name} (${msg.email})
                        </small>
                        <small class="text-muted">
                            <i class="fa-regular fa-calendar me-1"></i>
                            ${msg.date}
                        </small>
                    </div>
                </div>
            `).join("");

        }

        renderAdminMessages();

    }

}
