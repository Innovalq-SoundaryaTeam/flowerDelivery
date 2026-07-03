/*=====================================
    DARK MODE TOGGLE
=====================================*/

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    // Load saved theme

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

    // Toggle Theme

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "light");

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    });

}

/*=====================================
    RTL / LANGUAGE DIRECTION TOGGLE
=====================================*/

const rtlToggle = document.getElementById("rtlToggle");

const savedDirection = localStorage.getItem("direction");

if (savedDirection === "rtl") {

    document.documentElement.setAttribute("dir", "rtl");

}

if (rtlToggle) {

    rtlToggle.addEventListener("click", () => {

        const isRtl = document.documentElement.getAttribute("dir") === "rtl";

        if (isRtl) {

            document.documentElement.removeAttribute("dir");

            localStorage.setItem("direction", "ltr");

        } else {

            document.documentElement.setAttribute("dir", "rtl");

            localStorage.setItem("direction", "rtl");

        }

    });

}

/*=====================================
    FORM VALIDATION
=====================================*/

const forms = document.querySelectorAll("form");

forms.forEach((form) => {

    form.addEventListener("submit", (event) => {

        let isValid = true;

        const requiredFields = form.querySelectorAll("[required]");

        requiredFields.forEach((field) => {

            if (field.value.trim() === "") {

                field.classList.add("is-invalid");
                isValid = false;

            } else {

                field.classList.remove("is-invalid");
                field.classList.add("is-valid");

            }

            // Email Validation

            if (field.type === "email") {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(field.value.trim())) {

                    field.classList.add("is-invalid");
                    field.classList.remove("is-valid");
                    isValid = false;

                }

            }

        });

        if (!isValid) {

            event.preventDefault();

        }

    });

});

/*=====================================
    REMOVE ERROR WHILE TYPING
=====================================*/

const inputs = document.querySelectorAll("input, textarea, select");

inputs.forEach((input) => {

    input.addEventListener("input", () => {

        if (input.value.trim() !== "") {

            input.classList.remove("is-invalid");
            input.classList.add("is-valid");

        }

    });

});

/*=====================================
    COUNTDOWN TIMER
=====================================*/

const countdown = document.getElementById("countdown");

if (countdown) {

    const targetDate = new Date("December 31, 2026 23:59:59").getTime();

    const timer = setInterval(() => {

        const now = new Date().getTime();

        const distance = targetDate - now;

        if (distance <= 0) {

            clearInterval(timer);

            countdown.innerHTML = "Coming Soon";

            return;

        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;

    }, 1000);

}

/*=====================================
    QUANTITY PICKER
=====================================*/

const decreaseBtn = document.getElementById("decreaseQty");
const increaseBtn = document.getElementById("increaseQty");
const quantityInput = document.getElementById("quantity");

if (decreaseBtn && increaseBtn && quantityInput) {

    decreaseBtn.addEventListener("click", () => {

        let quantity = parseInt(quantityInput.value);

        if (quantity > 1) {

            quantity--;

            quantityInput.value = quantity;

        }

    });

    increaseBtn.addEventListener("click", () => {

        console.log("Increase Button Clicked");

        let quantity = parseInt(quantityInput.value);

        quantity++;

        quantityInput.value = quantity;
        console.log(quantityInput.value);

    });
}

/*=====================================
    SMOOTH SCROLL
=====================================*/

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

        event.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*=====================================
    ACTIVE NAVIGATION
=====================================*/

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach((link) => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});

/*=====================================
    NEWSLETTER FORM
=====================================*/

const newsletterForm = document.querySelector(".newsletter form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value.trim())) {

            emailInput.classList.add("is-invalid");

            return;

        }

        emailInput.classList.remove("is-invalid");

        window.location.href = "404.html";

    });

}

/*=====================================
        HOME ORDER NOW
=====================================*/

const orderButtons = document.querySelectorAll(".order-now");

orderButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product = {

            name: button.dataset.name,
            price: button.dataset.price,
            image: button.dataset.image,
            description: button.dataset.description,
            fullDescription: button.dataset.fullDescription

        };

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(product)
        );

    });

});


/*=====================================
    BACK Tquan TOP BUTTON
=====================================*/

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop.style.display = "flex";

        } else {

            backToTop.style.display = "none";

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

/*=====================================
    SHOP SEARCH, FILTER & SORT
=====================================*/

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");

const selectedCategory =
    localStorage.getItem("selectedCategory");

const productContainer = document.querySelector(".featured-products .row");

if (searchInput && categoryFilter && sortProducts && productContainer) {

    const products = Array.from(productContainer.querySelectorAll(".product-item"));

    function updateProducts() {

        const searchValue = searchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;
        const sortValue = sortProducts.value;

        // Filter Products

        products.forEach((product) => {

            const name = product.dataset.name.toLowerCase();
            const category = product.dataset.category;

            const searchMatch = name.includes(searchValue);
            const categoryMatch =
                categoryValue === "all" || category === categoryValue;

            if (searchMatch && categoryMatch) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

        // Visible Products

        const visibleProducts = products.filter(
            product => product.style.display !== "none"
        );

        // Sorting

        visibleProducts.sort((a, b) => {

            if (sortValue === "low-high") {

                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);

            }

            if (sortValue === "high-low") {

                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);

            }

            if (sortValue === "popular") {

                return parseInt(b.dataset.popular) - parseInt(a.dataset.popular);

            }

            if (sortValue === "newest") {

                return parseInt(b.dataset.newest) - parseInt(a.dataset.newest);

            }

            return 0;

        });

        visibleProducts.forEach((product) => {

            productContainer.appendChild(product);

        });

    }
    if (selectedCategory) {

        categoryFilter.value = selectedCategory;

        updateProducts();

        localStorage.removeItem("selectedCategory");

    }

    searchInput.addEventListener("input", updateProducts);

    categoryFilter.addEventListener("change", updateProducts);

    sortProducts.addEventListener("change", updateProducts);

}


/*=====================================
    ADD TO CART
=====================================*/

const addToCartBtn = document.getElementById("addToCart");

if (addToCartBtn) {

    addToCartBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const name = document.getElementById("productTitle").innerText;

        const price = document.getElementById("productPrice").innerText.replace("$", "");

        const image = document.getElementById("productImage").src;

        const quantityValue = parseInt(document.getElementById("quantity").value);

        const quantity = (!quantityValue || quantityValue < 1) ? 1 : quantityValue;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.name === name);

        if (existing) {

            existing.quantity = (existing.quantity || 1) + quantity;

        } else {

            cart.push({ name, price, image, quantity });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert("Product added to cart successfully!");

    });

}


/*=====================================
    PRODUCT DETAILS
=====================================*/

const viewButtons = document.querySelectorAll(".view-product");

viewButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".card");

        const wishlistBtn = card ? card.querySelector(".wishlist-btn") : null;

        const product = {

            id: wishlistBtn ? wishlistBtn.dataset.id : button.dataset.id,
            name: button.dataset.name,
            price: button.dataset.price,
            image: button.dataset.image,
            description: button.dataset.description,
            fullDescription: button.dataset.fullDescription

        };

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(product)
        );

    });

});

const selectedProduct =
    JSON.parse(localStorage.getItem("selectedProduct"));

if (
    selectedProduct &&
    document.getElementById("productTitle")
) {

    document.getElementById("productTitle").innerText =
        selectedProduct.name;

    document.getElementById("productPrice").innerText =
        selectedProduct.price;

    document.getElementById("productImage").src =
        selectedProduct.image;

    document.getElementById("productImage").alt =
        selectedProduct.name;

    document.getElementById("productDescription").innerText =
        selectedProduct.description;

    document.getElementById("productFullDescription").innerText =
        selectedProduct.fullDescription;

}

/*=====================================
     BUY NOW
=====================================*/

const buyNowBtn = document.getElementById("buyNow");

if (buyNowBtn) {

    buyNowBtn.addEventListener("click", () => {

        const order = {

            name: document.getElementById("productTitle").innerText,

            price: document.getElementById("productPrice").innerText,

            image: document.getElementById("productImage").src,

            quantity: parseInt(document.getElementById("quantity").value)

        };

        localStorage.setItem(
            "buyNowProduct",
            JSON.stringify(order)
        );

        window.location.href = "checkout.html";

    });

}

/*=====================================
    OCCASION FILTER
=====================================*/

const occasionButtons = document.querySelectorAll(".occasion-btn");

occasionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        localStorage.setItem(

            "selectedCategory",

            button.dataset.category

        );
    });
});

/*=====================================
    BLOG SEARCH
=====================================*/

const blogSearch = document.getElementById("blogSearch");

if (blogSearch) {

    const blogItems = document.querySelectorAll(".blog-item");

    function filterBlogItems(term) {

        const search = term.toLowerCase();

        blogItems.forEach((item) => {

            const title = item.dataset.title.toLowerCase();

            const category = (item.dataset.category || "").toLowerCase();

            if (title.includes(search) || category.includes(search)) {

                item.classList.remove("d-none");

            } else {

                item.classList.add("d-none");

            }
        });

    }

    blogSearch.addEventListener("input", () => {

        filterBlogItems(blogSearch.value);

    });

    /* Support ?q= and ?category= links coming from the blog sidebar */

    const blogUrlParams = new URLSearchParams(window.location.search);

    const blogQueryParam = blogUrlParams.get("q") || blogUrlParams.get("category");

    if (blogQueryParam) {

        blogSearch.value = blogQueryParam;

        filterBlogItems(blogQueryParam);

    }

}
/*=====================================
    SERVICE CARDS -> SELECTED SERVICE
=====================================*/

const serviceButtons = document.querySelectorAll(".view-service");

serviceButtons.forEach((button) => {

    button.addEventListener("click", () => {

        localStorage.setItem(

            "selectedService",

            button.dataset.id

        );

    });

});

/*=====================================
    BLOG DETAILS
=====================================*/

const blogButtons = document.querySelectorAll(".read-blog");

blogButtons.forEach((button) => {

    button.addEventListener("click", () => {

        localStorage.setItem(

            "selectedBlog",

            button.dataset.id

        );

    });

});

/*=====================================
    BLOG ARTICLES
=====================================*/

const blogArticles = {

    1: {

        title: "How to Keep Fresh Flowers Blooming Longer",

        author: "Emma Wilson",

        date: "12 June 2026",

        category: "Flower Care",

        image: "../assets/images/blog-1.webp",

        content: `

<h2>Introduction</h2>

<p>
Fresh flowers have a unique way of bringing life, beauty, and warmth into any space. Whether they are gifted for a birthday, anniversary, wedding, or simply purchased to brighten your home, everyone wants their flowers to remain fresh for as long as possible. While flowers naturally have a limited lifespan, the right care can extend their freshness by several days. Professional florists follow simple yet effective practices that anyone can use at home.
</p>

<p>
Taking a few minutes each day to care for your bouquet not only helps preserve its beauty but also allows you to enjoy its fragrance and vibrant colors for much longer. The good news is that flower care does not require expensive products or complicated techniques.
</p>

<h2>Why Do Fresh Flowers Wilt?</h2>

<p>
Flowers absorb water through their stems, but over time bacteria begin to grow inside the vase, blocking the stems and reducing water absorption. Heat, direct sunlight, dirty water, and improper trimming also speed up the wilting process. Understanding these common causes helps you avoid mistakes and keep your flowers looking their best.
</p>

<h2>Five Simple Ways to Keep Flowers Fresh</h2>

<ul class="blog-list">

<li>Trim each stem at a 45-degree angle before placing the bouquet into water.</li>

<li>Replace the vase water every two days using clean, room-temperature water.</li>

<li>Remove any leaves that remain below the water line to prevent bacterial growth.</li>

<li>Keep flowers away from direct sunlight, heaters, televisions, and other heat-producing appliances.</li>

<li>Use flower food whenever available, or prepare a simple homemade solution using a small amount of sugar and lemon juice.</li>

</ul>

<h2>Extra Tips from Professional Florists</h2>

<p>
Different flowers require slightly different care. Roses benefit from fresh cuts every few days, while lilies last longer when their pollen is removed after blooming. Tulips continue growing after being placed in water, so rotating the vase regularly helps maintain a balanced arrangement. Avoid placing flowers near ripening fruits, as fruits release ethylene gas that accelerates aging.
</p>

<h2>Conclusion</h2>

<p>
Fresh flowers require only a little daily attention to remain beautiful for much longer. By trimming stems, changing the water regularly, keeping the bouquet in a cool location, and following a few professional care techniques, you can enjoy your flowers for up to a week or more. At FloraDaily, every bouquet is handcrafted using fresh premium blooms and carefully prepared to ensure lasting beauty from the moment it arrives at your doorstep.
</p>

`
    },

    2: {

        title: "Easy Flower Care Tips for Every Home",

        author: "Sophia Green",

        date: "18 June 2026",

        category: "Flower Care",

        image: "../assets/images/blog-2.webp",

        content: `

<h2>Introduction</h2>

<p>
Fresh flowers bring elegance, color, and positive energy into every home. Whether placed in your living room, dining area, bedroom, or workspace, a beautiful bouquet instantly creates a warm and welcoming atmosphere. While fresh flowers naturally have a limited lifespan, following a few simple care practices can help them stay vibrant and fragrant for much longer. The secret lies in understanding their basic needs and providing consistent care.
</p>

<p>
At FloraDaily, every bouquet is carefully handcrafted using premium-quality flowers selected for their freshness and beauty. Once your flowers arrive, a few minutes of daily care is all it takes to preserve their appearance and enjoy them for several extra days.
</p>

<h2>Choose the Perfect Vase</h2>

<p>
A clean vase is the foundation of healthy flowers. Before arranging your bouquet, wash the vase thoroughly with warm water and mild soap to remove any bacteria. Select a vase that comfortably supports the stems without overcrowding them. Fill it with fresh, room-temperature water so the flowers can absorb moisture effectively from the very beginning.
</p>

<h2>Simple Flower Care Tips</h2>

<ul class="blog-list">

<li>Trim approximately one inch from each stem at a 45-degree angle before placing the flowers in water.</li>

<li>Replace the vase water every two days and clean the vase each time to prevent bacterial growth.</li>

<li>Remove any leaves that remain below the water line to keep the water fresh and clean.</li>

<li>Place flowers in a cool area with indirect sunlight, away from heaters, televisions, and air conditioners.</li>

<li>Avoid placing bouquets near ripening fruits because they release ethylene gas, which causes flowers to age more quickly.</li>

</ul>

<h2>Creating the Ideal Environment</h2>

<p>
Fresh flowers thrive in cool, well-ventilated spaces with moderate natural light. Rotating the vase every day helps ensure that each side of the arrangement receives equal light, allowing the bouquet to maintain its balanced appearance. During warmer seasons, moving flowers to a cooler room at night can significantly extend their freshness. Removing wilted petals or damaged flowers also helps preserve the beauty of the remaining blooms.
</p>

<h2>Enjoy Flowers Every Day</h2>

<p>
Flowers are more than decorative pieces—they create a peaceful atmosphere, improve the appearance of your home, and brighten everyday moments. Regular care not only extends their lifespan but also allows you to appreciate their fragrance and vibrant colors for much longer. With just a few minutes of attention every couple of days, your bouquet can continue looking fresh and elegant throughout the week.
</p>

<h2>Conclusion</h2>

<p>
Taking care of fresh flowers is simple when you follow a consistent routine. Clean water, proper stem trimming, the right placement, and a clean vase all contribute to longer-lasting blooms. At FloraDaily, we believe every bouquet should continue bringing happiness long after it arrives. By following these easy flower care tips, you can enjoy beautiful floral arrangements that brighten your home and create lasting memories every single day.
</p>

`

    },

    3: {

        title: "Choosing Flowers for Your Dream Wedding",

        author: "Olivia Carter",

        date: "20 June 2026",

        category: "Wedding",

        image: "../assets/images/blog-3.webp",

        content: `

<h2>Introduction</h2>

<p>
Flowers play a meaningful role in every wedding celebration. They symbolize love, happiness, new beginnings, and everlasting memories. From the bridal bouquet to the ceremony backdrop and reception tables, floral arrangements help define the atmosphere of your special day. Choosing the right flowers is not only about selecting beautiful blooms but also about finding arrangements that reflect your personality, wedding theme, and season.
</p>

<p>
At FloraDaily, we believe every wedding deserves floral designs that tell a unique story. With thoughtful planning and the right flower selection, you can create elegant decorations that leave a lasting impression on both you and your guests.
</p>

<h2>Choose Flowers That Match Your Wedding Theme</h2>

<p>
Your wedding theme should guide your floral choices. Classic weddings often feature timeless roses, lilies, and orchids, while rustic celebrations look stunning with sunflowers, daisies, and wildflowers. Modern weddings pair beautifully with tulips, hydrangeas, and minimalist greenery. Selecting flowers that complement your venue and color palette creates a harmonious and visually appealing celebration.
</p>

<h2>Wedding Flower Planning Tips</h2>

<ul class="blog-list">

<li>Select flowers that match your wedding season for better availability, freshness, and value.</li>

<li>Coordinate your bouquet colors with your wedding attire, decorations, and venue theme.</li>

<li>Include elegant greenery to add texture, volume, and a natural appearance to floral arrangements.</li>

<li>Discuss your budget with your florist early to create beautiful designs without unnecessary expenses.</li>

<li>Order your flowers in advance to ensure your preferred blooms are available for your wedding day.</li>

</ul>

<h2>Don't Forget the Small Floral Details</h2>

<p>
While bridal bouquets often receive the most attention, smaller floral arrangements contribute just as much to the overall experience. Boutonnieres, bridesmaid bouquets, ceremony arches, table centerpieces, aisle decorations, and welcome signs all work together to create a cohesive wedding atmosphere. Even simple floral accents can transform an ordinary venue into a romantic and unforgettable setting.
</p>

<h2>Creating Lasting Memories</h2>

<p>
Wedding flowers become part of your photographs, your ceremony, and the memories you will cherish for years to come. Choosing high-quality blooms and professional floral arrangements ensures that every detail looks fresh and beautiful throughout the celebration. Investing in carefully designed flowers is an investment in the overall experience of your wedding day.
</p>

<h2>Conclusion</h2>

<p>
Selecting wedding flowers should be an exciting and enjoyable part of your planning journey. By choosing blooms that reflect your style, complement your venue, and fit your budget, you can create elegant floral arrangements that enhance every moment of your celebration. At FloraDaily, our experienced florists carefully design each bouquet and decoration to help couples celebrate one of life's most memorable occasions with timeless beauty and elegance.
</p>

`

    },

    4: {

        title: "Top Birthday Flower Gift Ideas",

        author: "Emma Wilson",

        date: "22 June 2026",

        category: "Birthday",

        image: "../assets/images/blog-4.webp",

        content: `

<h2>Introduction</h2>

<p>
Birthdays are special milestones that deserve thoughtful celebrations, and flowers remain one of the most meaningful gifts you can give. A beautifully arranged bouquet expresses love, appreciation, friendship, and heartfelt wishes without saying a single word. Whether you're surprising a family member, a close friend, or a colleague, choosing the right flowers can make their birthday even more memorable.
</p>

<p>
At FloraDaily, we believe every birthday bouquet should reflect the personality of the recipient. From vibrant mixed arrangements to elegant roses and cheerful lilies, the perfect floral gift creates lasting memories and brings genuine smiles to every celebration.
</p>

<h2>Choosing Flowers for Different Recipients</h2>

<p>
Different flowers convey different emotions, making it important to choose blooms that suit the recipient. Bright sunflowers and gerberas are perfect for friends who enjoy cheerful surprises, while elegant roses and orchids make thoughtful gifts for partners and loved ones. Lilies, carnations, and mixed seasonal flowers are ideal for parents and family members because they represent admiration, gratitude, and affection.
</p>

<h2>Birthday Flower Gifting Tips</h2>

<ul class="blog-list">

<li>Choose flowers in the recipient's favorite colors to make the gift more personal and meaningful.</li>

<li>Add chocolates, teddy bears, greeting cards, or balloons to create a complete birthday surprise.</li>

<li>Select fresh seasonal flowers for longer-lasting beauty and better value.</li>

<li>Include a handwritten message expressing your wishes to make the bouquet even more memorable.</li>

<li>Schedule your flower delivery early so the bouquet arrives fresh and on time for the celebration.</li>

</ul>

<h2>The Meaning Behind Popular Birthday Flowers</h2>

<p>
Each flower carries its own unique symbolism. Roses represent love and appreciation, lilies symbolize happiness and positivity, sunflowers reflect joy and optimism, while orchids express elegance and admiration. Mixed bouquets combine multiple flowers to create colorful arrangements that suit recipients of all ages. Understanding these meanings helps you choose a bouquet that perfectly matches the occasion.
</p>

<h2>Personalize Every Gift</h2>

<p>
Adding a personal touch makes any birthday gift even more special. Pairing flowers with a favorite dessert, personalized greeting card, scented candle, or small keepsake transforms a simple bouquet into a memorable gifting experience. These thoughtful details show extra care and make the recipient feel truly valued on their special day.
</p>

<h2>Conclusion</h2>

<p>
A birthday bouquet is more than just a beautiful arrangement—it is a heartfelt expression of love, gratitude, and celebration. By choosing flowers that match the recipient's personality and adding meaningful personal touches, you can create unforgettable moments that will be cherished for years to come. At FloraDaily, our expert florists design every birthday bouquet with creativity, freshness, and care, ensuring every celebration becomes even more joyful and memorable.
</p>

`

    },

    5: {

        title: "Why Same-Day Flower Delivery Matters",

        author: "Daniel Brown",

        date: "24 June 2026",

        category: "Delivery",

        image: "../assets/images/blog-5.webp",

        content: `

<h2>Introduction</h2>

<p>
Life is full of unexpected moments, and sometimes the best surprises are the ones planned at the last minute. Whether it's a forgotten birthday, a wedding anniversary, a graduation celebration, or simply an opportunity to brighten someone's day, same-day flower delivery makes it possible to express your emotions without delay. Fresh flowers delivered on the very same day create unforgettable memories and ensure your thoughtful gesture arrives exactly when it matters most.
</p>

<p>
At FloraDaily, we understand that every occasion is special. That's why our same-day flower delivery service is designed to combine speed, freshness, and reliability, allowing customers to send beautiful bouquets with complete confidence.
</p>

<h2>Why Same-Day Delivery Makes a Difference</h2>

<p>
Flowers are at their most beautiful when they are fresh. Same-day delivery ensures bouquets spend less time in transit and reach the recipient while their colors, fragrance, and appearance are at their best. It is also the perfect solution for busy schedules, unexpected invitations, or those moments when you simply want to make someone's day extra special without advance planning.
</p>

<h2>Benefits of Same-Day Flower Delivery</h2>

<ul class="blog-list">

<li>Ensures flowers arrive fresh, vibrant, and ready to impress.</li>

<li>Perfect for last-minute birthdays, anniversaries, celebrations, and special occasions.</li>

<li>Saves valuable time while still delivering a thoughtful and meaningful gift.</li>

<li>Allows customers to surprise loved ones even with a busy schedule.</li>

<li>Provides peace of mind through reliable delivery and professionally arranged bouquets.</li>

</ul>

<h2>Our Delivery Process</h2>

<p>
Every FloraDaily bouquet is handcrafted by experienced florists using carefully selected fresh flowers. Once an order is received, our team prepares the arrangement with attention to every detail before securely packaging it for delivery. Our delivery partners ensure each bouquet reaches its destination safely and on time, maintaining its freshness throughout the journey. This careful process guarantees that every customer receives a premium floral experience from start to finish.
</p>

<h2>Making Every Occasion Memorable</h2>

<p>
Flowers have the unique ability to create emotional connections and lasting memories. A same-day delivery transforms an ordinary day into an unforgettable surprise, reminding loved ones that they are appreciated and cared for. Whether it's celebrating success, offering congratulations, expressing sympathy, or simply saying "thank you," flowers always leave a lasting impression.
</p>

<h2>Conclusion</h2>

<p>
Same-day flower delivery combines convenience, speed, and freshness to make every special moment even more meaningful. With reliable service, premium-quality blooms, and beautifully handcrafted arrangements, FloraDaily helps customers celebrate life's important occasions without worrying about time. Whenever you need a thoughtful gift delivered quickly, you can count on FloraDaily to deliver happiness, elegance, and unforgettable floral experiences right to your loved one's doorstep.
</p>

`

    },

    6: {

        title: "Trending Floral Styles for 2026",

        author: "Sophia Green",

        date: "26 June 2026",

        category: "Floral Trends",

        image: "../assets/images/blog-6.webp",

        content: `

<h2>Introduction</h2>

<p>
Floral design continues to evolve every year, bringing fresh ideas, creative color combinations, and elegant arrangements that transform ordinary spaces into memorable experiences. In 2026, flower trends are centered around natural beauty, sustainable practices, and personalized designs that reflect individual style. Whether you're decorating your home, planning a wedding, or selecting a bouquet for a loved one, understanding the latest floral trends can help you choose arrangements that feel modern, stylish, and timeless.
</p>

<p>
At FloraDaily, our florists stay inspired by global floral trends while creating handcrafted bouquets that combine elegance with creativity. Every arrangement is designed to celebrate life's special moments with fresh blooms and thoughtful craftsmanship.
</p>

<h2>Popular Floral Trends for 2026</h2>

<p>
This year's floral designs focus on soft pastel shades, earthy tones, and natural textures. Bouquets featuring blush pink roses, white lilies, lavender carnations, eucalyptus leaves, and seasonal greenery continue to gain popularity. Modern arrangements also embrace asymmetrical designs that appear effortless while maintaining a luxurious and sophisticated appearance.
</p>

<h2>Top Floral Styling Ideas</h2>

<ul class="blog-list">

<li>Choose pastel-colored bouquets featuring blush pink, peach, cream, and lavender flowers for a timeless and elegant look.</li>

<li>Incorporate fresh greenery such as eucalyptus and fern leaves to add depth, texture, and a natural finish.</li>

<li>Select eco-friendly wrapping materials like kraft paper, reusable fabric wraps, or biodegradable packaging.</li>

<li>Mix classic flowers such as roses and lilies with seasonal blooms to create unique and eye-catching arrangements.</li>

<li>Use minimalist floral designs for modern interiors while choosing fuller arrangements for weddings and grand celebrations.</li>

</ul>

<h2>Sustainability in Floral Design</h2>

<p>
Sustainable floristry continues to influence the floral industry in 2026. Many customers now prefer locally sourced flowers, recyclable packaging, and environmentally friendly floral foam alternatives. Choosing seasonal flowers not only supports local growers but also ensures better freshness and reduces environmental impact. These thoughtful choices allow customers to enjoy beautiful flowers while contributing to a greener future.
</p>

<h2>Personalized Arrangements</h2>

<p>
One of the biggest trends this year is personalization. Customers increasingly choose bouquets that reflect the recipient's personality, favorite colors, and special occasions. Adding greeting cards, premium chocolates, scented candles, or decorative gift boxes creates complete gifting experiences that feel meaningful and memorable. Personalized floral arrangements leave a lasting impression and strengthen emotional connections between the sender and the recipient.
</p>

<h2>Conclusion</h2>

<p>
The floral trends of 2026 celebrate creativity, sustainability, and timeless elegance. From soft pastel bouquets and eco-friendly packaging to personalized gift combinations, modern floral arrangements continue to evolve while preserving the beauty of traditional flowers. At FloraDaily, we combine the latest design trends with premium-quality blooms to create handcrafted bouquets that inspire joy, celebrate special occasions, and make every moment unforgettable.
</p>

`

    }

};


/*=====================================
    LOAD BLOG DETAILS
=====================================*/

const blogId = localStorage.getItem("selectedBlog");

if (

    blogId &&
    document.getElementById("blogTitle")

) {

    const blog = blogArticles[blogId];

    if (blog) {

        document.getElementById("blogImage").src =
            blog.image;

        document.getElementById("blogImage").alt =
            blog.title;

        document.getElementById("blogTitle").innerText =
            blog.title;

        document.getElementById("blogAuthor").innerText =
            blog.author;

        document.getElementById("blogDate").innerText =
            blog.date;

        document.getElementById("blogCategory").innerText =
            blog.category;

        document.getElementById("blogContent").innerHTML =
            blog.content;

    }

}

/*=====================================
    SERVICE DETAILS DATA
=====================================*/

const serviceDetailsData = {

    1: {
        badge: "Featured Service",
        title: "Same-Day Flower Delivery",
        heroImage: "../assets/images/same-day-delivery-banner.webp",
        intro: "Order before the daily cut-off and we'll hand-deliver fresh, hand-tied flowers to your recipient's doorstep the very same day — no advance planning required.",
        descImage: "../assets/images/flower-sourcing.webp",
        descHeading: "How Same-Day Delivery Works",
        descParagraphs: [
            "Life doesn't always give advance notice, and neither should sending flowers. Our same-day delivery service is built around a simple promise: order before the daily cut-off time and your fresh, hand-arranged bouquet will reach its destination before the day is over.",
            "Every order is prepared by an experienced florist on the morning of delivery, using flowers sourced fresh from local growers, then handed to our delivery partners who follow optimized routes to make sure your gift arrives on time, every time."
        ],
        highlights: [
            "Order cut-off at 2:00 PM local time",
            "Coverage across all major city zones",
            "Live order tracking from your dashboard",
            "Contactless doorstep delivery available"
        ],
        features: [
            { icon: "fa-leaf", title: "Fresh Blooms", desc: "Hand-picked flowers sourced the same morning." },
            { icon: "fa-user-tie", title: "Expert Florists", desc: "Every bouquet is hand-arranged by a trained florist." },
            { icon: "fa-location-crosshairs", title: "Live Tracking", desc: "Follow your delivery rider in real time from checkout to doorstep." },
            { icon: "fa-box-open", title: "Eco Packaging", desc: "Recyclable wraps and biodegradable packaging on every order." }
        ],
        pricing: [
            { name: "Basic", price: "$9", suffix: "/ delivery", desc: "Ideal for casual, everyday sends.", features: ["Standard bouquet sizes", "Delivery within city zone", "Order tracking", "Email delivery confirmation"], featured: false, cta: "Choose Basic", link: "catalog.html" },
            { name: "Standard", price: "$19", suffix: "/ delivery", desc: "Our most-loved same-day plan.", features: ["Premium bouquet sizes", "Priority delivery slot", "Live rider tracking", "Personalized greeting card"], featured: true, cta: "Choose Standard", link: "catalog.html" },
            { name: "Premium", price: "$35", suffix: "/ delivery", desc: "For milestone moments that matter most.", features: ["Luxury bouquet sizes", "2-hour delivery window", "Complimentary gift wrap", "Dedicated support line"], featured: false, cta: "Choose Premium", link: "catalog.html" }
        ],
        faqs: [
            { q: "What is the cut-off time for same-day delivery?", a: "Orders placed before 2:00 PM local time qualify for same-day delivery. Orders placed after the cut-off are automatically scheduled for the next available day." },
            { q: "Which areas are covered by same-day delivery?", a: "We currently cover all major city zones. Enter your delivery pincode at checkout and we'll confirm same-day availability automatically." },
            { q: "Can I choose a specific delivery time?", a: "Standard and Premium plans let you pick a preferred delivery window at checkout. Basic plan deliveries arrive any time before end of day." },
            { q: "What happens if the recipient isn't home?", a: "Our rider will attempt contact and, where safe, leave the bouquet with a neighbor, reception desk or in a shaded doorway, then send you a photo confirmation." },
            { q: "Can I cancel or reschedule my order?", a: "Orders can be changed or cancelled free of charge any time before they enter preparation. Once a florist has started your bouquet, changes may no longer be possible." }
        ],
        ctaTitle: "Ready to Send Flowers Today?",
        ctaText: "Browse our same-day eligible bouquets and get them delivered before the day is over.",
        ctaBtn: "Shop Now",
        ctaLink: "catalog.html"
    },

    2: {
        badge: "Flexible Plans",
        title: "Subscription Bouquets",
        heroImage: "../assets/images/occasion-banner.webp",
        intro: "Weekly or monthly flower plans delivered automatically, so your home or office always feels fresh — pause, skip or cancel any time.",
        descImage: "../assets/images/product-6.webp",
        descHeading: "How Subscriptions Work",
        descParagraphs: [
            "Choose a delivery frequency that fits your life — weekly, biweekly or monthly — and we'll take care of the rest. Each cycle, our florists select the best seasonal blooms and prepare a fresh arrangement just for you.",
            "You're always in control: skip a delivery before a trip, change the address for a gift recipient, or upgrade your plan for a bigger occasion, all from your dashboard."
        ],
        highlights: [
            "Weekly, biweekly or monthly delivery",
            "Skip or pause any time, no penalties",
            "Seasonal blooms picked by our florists",
            "Manage everything from your dashboard"
        ],
        features: [
            { icon: "fa-calendar-check", title: "Flexible Schedule", desc: "Pick weekly, biweekly or monthly delivery." },
            { icon: "fa-rotate", title: "Pause Anytime", desc: "Skip a cycle in one click, no fees." },
            { icon: "fa-seedling", title: "Seasonal Picks", desc: "Fresh, in-season blooms chosen by our florists." },
            { icon: "fa-gauge", title: "Dashboard Control", desc: "Manage address, frequency and plan in one place." }
        ],
        pricing: [
            { name: "Starter", price: "$29", suffix: "/ month", desc: "One bouquet delivered monthly.", features: ["1 bouquet / month", "Standard sizes", "Order tracking", "Email support"], featured: false, cta: "View Plans", link: "pricing.html" },
            { name: "Growth", price: "$59", suffix: "/ month", desc: "Our most popular subscription tier.", features: ["2 bouquets / month", "Priority delivery", "Live rider tracking", "Priority phone support"], featured: true, cta: "View Plans", link: "pricing.html" },
            { name: "Elite", price: "$99", suffix: "/ month", desc: "Weekly blooms for flower lovers.", features: ["Weekly delivery", "Premium blooms", "Dedicated florist & gift wrap", "24/7 priority support"], featured: false, cta: "View Plans", link: "pricing.html" }
        ],
        faqs: [
            { q: "Can I skip a delivery cycle?", a: "Yes, skip any upcoming delivery from your dashboard up to 48 hours before it ships, no fees or penalties." },
            { q: "Can I send my subscription to someone else?", a: "Absolutely. Update the delivery address any time to send a cycle as a gift to a friend or family member." },
            { q: "What if I want to change my plan?", a: "You can upgrade or downgrade your plan at any time; changes apply from your next billing cycle." },
            { q: "Do unused deliveries roll over?", a: "Subscriptions are delivery-based, not credit-based, so cycles don't roll over, but you can pause instead of losing a delivery." },
            { q: "How do I cancel my subscription?", a: "Cancel any time from your dashboard with no cancellation fees; you'll keep any deliveries already scheduled." }
        ],
        ctaTitle: "Ready for Fresh Flowers on Repeat?",
        ctaText: "Start a subscription today and never run out of fresh blooms.",
        ctaBtn: "View Plans",
        ctaLink: "pricing.html"
    },

    3: {
        badge: "For Businesses",
        title: "Corporate & Office Gifting",
        heroImage: "../assets/images/admin-banner.webp",
        intro: "Bulk orders, client gifts and office arrangements handled with dedicated account support, consolidated invoicing and reliable scheduling.",
        descImage: "../assets/images/orders-banner.webp",
        descHeading: "Built for Business Needs",
        descParagraphs: [
            "From welcoming a new hire to thanking a major client, thoughtful flowers make a lasting impression. Our corporate gifting program is designed for recurring or one-time bulk orders with the reliability businesses need.",
            "A dedicated account manager helps you plan recipient lists, delivery windows and branding touches, while consolidated monthly invoicing keeps your finance team happy."
        ],
        highlights: [
            "Dedicated account manager",
            "Consolidated monthly invoicing",
            "Bulk and recurring order support",
            "Custom branding on cards & wrap"
        ],
        features: [
            { icon: "fa-user-tie", title: "Account Manager", desc: "A single point of contact for every order." },
            { icon: "fa-file-invoice-dollar", title: "Simple Invoicing", desc: "One consolidated invoice, not dozens of receipts." },
            { icon: "fa-boxes-stacked", title: "Bulk Ready", desc: "Send to 10 or 500 recipients in a single order." },
            { icon: "fa-stamp", title: "Custom Branding", desc: "Add your logo or message to cards and wrapping." }
        ],
        pricing: [
            { name: "Starter", price: "$499", suffix: "/ month", desc: "For small teams sending occasional gifts.", features: ["Up to 10 recipients / month", "Standard arrangements", "Email invoicing", "Standard delivery"], featured: false, cta: "Get Started", link: "contact.html" },
            { name: "Business", price: "$1,499", suffix: "/ month", desc: "For growing teams with regular gifting needs.", features: ["Up to 50 recipients / month", "Premium arrangements", "Dedicated account manager", "Priority delivery"], featured: true, cta: "Get Started", link: "contact.html" },
            { name: "Enterprise", price: "Custom", suffix: "pricing", desc: "For large organizations at scale.", features: ["Unlimited recipients", "Custom branding", "Volume discounts", "SLA-backed delivery"], featured: false, cta: "Contact Sales", link: "contact.html" }
        ],
        faqs: [
            { q: "Can we set up recurring monthly gifting?", a: "Yes, we support recurring schedules for birthdays, anniversaries or milestone dates pulled from a recipient list you provide." },
            { q: "How does invoicing work?", a: "All orders within a billing cycle are combined into one consolidated invoice, sent monthly to your finance team." },
            { q: "Can we add our company branding?", a: "Yes, Business and Enterprise plans include custom branded cards and gift wrap with your logo or message." },
            { q: "What's the minimum order size?", a: "There's no strict minimum — even single gifts are welcome — but bulk pricing applies from 10 recipients upward." },
            { q: "Do you offer a dedicated contact?", a: "Business and Enterprise plans include a dedicated account manager to help plan and coordinate every order." }
        ],
        ctaTitle: "Let's Talk About Your Gifting Program",
        ctaText: "Our team will put together a plan tailored to your business.",
        ctaBtn: "Contact Sales",
        ctaLink: "contact.html"
    },

    4: {
        badge: "For Your Big Day",
        title: "Wedding & Event Florals",
        heroImage: "../assets/images/wedding.webp",
        intro: "Bridal bouquets, ceremony arches and reception centerpieces — designed around your theme and timeline by our dedicated event florists.",
        descImage: "../assets/images/company-story.webp",
        descHeading: "Florals Styled Around Your Story",
        descParagraphs: [
            "Your wedding or event deserves flowers as unique as the occasion itself. We start with a consultation to understand your theme, palette and venue, then design a complete floral concept — from bridal bouquet to reception centerpieces.",
            "On the day itself, our team handles delivery and on-site setup, so everything is in place exactly when and where you need it."
        ],
        highlights: [
            "Free initial consultation",
            "Custom concept & sampling",
            "On-site delivery & setup",
            "Dedicated event florist"
        ],
        features: [
            { icon: "fa-spa", title: "Bridal Bouquets", desc: "Signature bouquets matched to your gown and theme." },
            { icon: "fa-archway", title: "Ceremony Arches", desc: "Statement floral arches and aisle décor." },
            { icon: "fa-champagne-glasses", title: "Reception Centerpieces", desc: "Table arrangements that carry your theme all evening." },
            { icon: "fa-truck-fast", title: "On-Site Setup", desc: "Delivery and installation handled for you on the day." }
        ],
        pricing: [
            { name: "Essential", price: "$499", suffix: "/ event", desc: "Intimate ceremonies and small gatherings.", features: ["Bridal bouquet", "2 bridesmaid bouquets", "Ceremony arch florals", "Delivery included"], featured: false, cta: "Book Essential", link: "contact.html" },
            { name: "Premium", price: "$1,299", suffix: "/ event", desc: "Our most popular full wedding package.", features: ["Bridal + 4 bridesmaid bouquets", "Ceremony & aisle décor", "6 reception centerpieces", "On-site setup team"], featured: true, cta: "Book Premium", link: "contact.html" },
            { name: "Luxury", price: "$2,999", suffix: "/ event", desc: "Full-scale styling for grand celebrations.", features: ["Unlimited bouquets", "Statement floral installations", "Full reception styling", "Dedicated event florist on-site"], featured: false, cta: "Book Luxury", link: "contact.html" }
        ],
        faqs: [
            { q: "How far in advance should we book?", a: "We recommend booking 3-6 months ahead for weddings, especially during peak season, to guarantee your preferred blooms and date." },
            { q: "Can we get a custom quote outside these packages?", a: "Yes, every package can be customized — reach out and our event florist will build a tailored proposal." },
            { q: "Do you handle setup and teardown at the venue?", a: "Premium and Luxury packages include on-site setup; teardown can be added for an additional fee." },
            { q: "Can we see samples before the big day?", a: "Premium and Luxury packages include a design consultation with sample arrangements before final approval." },
            { q: "What if our venue changes flowers last minute?", a: "We keep in touch with your venue coordinator and can adjust arrangements up to 2 weeks before the event, availability permitting." }
        ],
        ctaTitle: "Let's Design Your Wedding Florals",
        ctaText: "Book a free consultation with one of our event florists.",
        ctaBtn: "Book a Consultation",
        ctaLink: "contact.html"
    },

    5: {
        badge: "Made For You",
        title: "Custom Bouquet Design",
        heroImage: "../assets/images/gift-3.webp",
        intro: "Tell us the occasion, colors and budget — our florists build a one-of-a-kind arrangement designed just for you.",
        descImage: "../assets/images/product-1.webp",
        descHeading: "From Idea to Arrangement",
        descParagraphs: [
            "Sometimes off-the-shelf bouquets just don't capture what you're trying to say. Our custom design service starts with a short brief — favorite colors, flower types, budget and occasion — and our florists sketch a concept for your approval.",
            "Once approved, your bouquet is hand-built using premium seasonal blooms, then delivered fresh on your chosen date."
        ],
        highlights: [
            "Personal design brief & concept",
            "Choice of premium seasonal blooms",
            "Florist consultation included",
            "Delivered fresh on your date"
        ],
        features: [
            { icon: "fa-palette", title: "Your Palette", desc: "Choose colors and flower types that mean something to you." },
            { icon: "fa-comments", title: "Florist Consultation", desc: "A quick chat to fine-tune your concept before we start." },
            { icon: "fa-star", title: "Premium Blooms", desc: "Only the freshest, highest-grade seasonal flowers used." },
            { icon: "fa-box", title: "Made to Order", desc: "Every custom bouquet is built specifically for your order." }
        ],
        pricing: [
            { name: "Signature", price: "$39", suffix: "/ bouquet", desc: "A personalized twist on a classic bouquet.", features: ["Choice of 3 flower types", "Custom color palette", "Standard size", "Greeting card included"], featured: false, cta: "Design Yours", link: "contact.html" },
            { name: "Deluxe", price: "$69", suffix: "/ bouquet", desc: "Our most requested custom design tier.", features: ["Choice of 5 flower types", "Florist consultation call", "Premium size", "Gift wrap included"], featured: true, cta: "Design Yours", link: "contact.html" },
            { name: "Masterpiece", price: "$129", suffix: "/ bouquet", desc: "A statement arrangement for unforgettable moments.", features: ["Unlimited flower choices", "Dedicated design sketch", "Luxury size", "Same-day delivery eligible"], featured: false, cta: "Design Yours", link: "contact.html" }
        ],
        faqs: [
            { q: "How do I start a custom design?", a: "Fill out our contact form with your occasion, colors and budget, and a florist will follow up within one business day." },
            { q: "Can I see a preview before it's made?", a: "Deluxe and Masterpiece tiers include a concept sketch or photo preview for your approval before we begin." },
            { q: "How long does a custom order take?", a: "Most custom bouquets are ready within 2-3 days; rush and same-day options are available for select designs." },
            { q: "Can I request specific flowers that are out of season?", a: "We'll always try to source what you love, but out-of-season flowers may affect price and availability — your florist will advise alternatives." },
            { q: "Is delivery included in the price?", a: "Standard delivery is included; same-day or scheduled delivery windows can be added at checkout." }
        ],
        ctaTitle: "Design a Bouquet That's Truly Yours",
        ctaText: "Share your vision and let our florists bring it to life.",
        ctaBtn: "Start Designing",
        ctaLink: "contact.html"
    },

    6: {
        badge: "The Finishing Touch",
        title: "Gift Wrapping & Personalization",
        heroImage: "../assets/images/gift-1.webp",
        intro: "Premium wraps, handwritten cards and add-on gifts to make every delivery feel handpicked, not just ordered.",
        descImage: "../assets/images/gift-2.webp",
        descHeading: "Every Detail, Considered",
        descParagraphs: [
            "Presentation matters. Our gift wrapping service adds premium paper, ribbon and packaging to any bouquet or gift, so it looks as thoughtful as it feels when it arrives.",
            "Add a handwritten card, chocolates, a candle or a keepsake box to turn a simple bouquet into a complete gifting experience."
        ],
        highlights: [
            "Premium wrap & ribbon options",
            "Handwritten greeting cards",
            "Add-on gifts & keepsake boxes",
            "Available on any order"
        ],
        features: [
            { icon: "fa-gift", title: "Premium Wraps", desc: "Kraft paper, satin ribbon and eco-friendly options." },
            { icon: "fa-pen-fancy", title: "Handwritten Cards", desc: "A personal note written by hand, not printed." },
            { icon: "fa-candy-cane", title: "Add-On Gifts", desc: "Chocolates, candles and keepsakes to pair with flowers." },
            { icon: "fa-box-open", title: "Works With Any Order", desc: "Add wrapping to any bouquet at checkout." }
        ],
        pricing: [
            { name: "Classic Wrap", price: "$5", suffix: "/ order", desc: "A simple, elegant finishing touch.", features: ["Kraft paper wrap", "Ribbon tie", "Printed gift tag", "Add at checkout"], featured: false, cta: "Add to Order", link: "catalog.html" },
            { name: "Premium Wrap", price: "$12", suffix: "/ order", desc: "Our most popular presentation upgrade.", features: ["Satin wrap & ribbon", "Handwritten card", "Tissue lining", "Add at checkout"], featured: true, cta: "Add to Order", link: "catalog.html" },
            { name: "Luxury Box", price: "$25", suffix: "/ order", desc: "A complete gifting experience in a keepsake box.", features: ["Rigid keepsake gift box", "Handwritten card", "Choice of add-on gift", "Add at checkout"], featured: false, cta: "Add to Order", link: "catalog.html" }
        ],
        faqs: [
            { q: "Can I add gift wrapping to any bouquet?", a: "Yes, wrapping options can be added to any product at checkout, regardless of which bouquet or gift you order." },
            { q: "Can I write my own message?", a: "Absolutely — add your message at checkout and our team will handwrite it exactly as you'd like." },
            { q: "What add-on gifts are available?", a: "Popular add-ons include chocolates, scented candles and small keepsake boxes; availability may vary by season." },
            { q: "Does gift wrapping delay delivery?", a: "No, wrapping is prepared alongside your bouquet and doesn't add extra delivery time." },
            { q: "Are your wrapping materials eco-friendly?", a: "Yes, we offer recyclable kraft paper and biodegradable packaging options across all wrap tiers." }
        ],
        ctaTitle: "Make Your Gift Unforgettable",
        ctaText: "Add premium wrapping and a personal touch to your next order.",
        ctaBtn: "Shop Now",
        ctaLink: "catalog.html"
    }

};

/*=====================================
    LOAD SERVICE DETAILS
=====================================*/

if (document.getElementById("serviceTitle")) {

    const serviceId = localStorage.getItem("selectedService") || "1";

    const service = serviceDetailsData[serviceId] || serviceDetailsData[1];

    if (service) {

        document.getElementById("pageTitle").innerText =
            service.title + " Service | FloraDaily";

        const pageDescriptionTag = document.getElementById("pageDescription");

        if (pageDescriptionTag) {
            pageDescriptionTag.setAttribute("content", service.intro);
        }

        document.getElementById("serviceBadge").innerHTML =
            '<i class="fa-solid fa-star me-2"></i>' + service.badge;

        document.getElementById("serviceTitle").innerText = service.title;

        document.getElementById("serviceIntro").innerText = service.intro;

        document.getElementById("serviceHeroImage").src = service.heroImage;
        document.getElementById("serviceHeroImage").alt = service.title;

        document.getElementById("serviceDescImage").src = service.descImage;
        document.getElementById("serviceDescImage").alt = service.descHeading;

        document.getElementById("serviceDescHeading").innerText = service.descHeading;

        document.getElementById("serviceDescParagraphs").innerHTML =
            service.descParagraphs.map(function (p) {
                return "<p>" + p + "</p>";
            }).join("");

        document.getElementById("serviceHighlights").innerHTML =
            service.highlights.map(function (h) {
                return '<li class="mb-2"><i class="fa-solid fa-circle-check text-primary me-2"></i>' + h + "</li>";
            }).join("");

        document.getElementById("serviceFeatures").innerHTML =
            service.features.map(function (f) {
                return '<div class="col-lg-3 col-md-6">' +
                    '<div class="card border-0 shadow-sm h-100 p-4">' +
                    '<div class="mb-3"><i class="fa-solid ' + f.icon + ' fa-3x text-primary"></i></div>' +
                    "<h5>" + f.title + "</h5>" +
                    "<p>" + f.desc + "</p>" +
                    "</div></div>";
            }).join("");

        document.getElementById("servicePricingHeading").innerText =
            service.title + " Plans";

        document.getElementById("servicePricing").innerHTML =
            service.pricing.map(function (p) {
                const cardClass = p.featured ? "card border-0 shadow pricing-card featured" : "card border-0 shadow-sm h-100 pricing-card";

                const badgeHtml = p.featured ? '<span class="pricing-badge">Most Popular</span>' : "";

                const featureItems = p.features.map(function (feat) {
                    return "<li><i class=\"fa-solid fa-check\"></i> " + feat + "</li>";
                }).join("");

                return '<div class="col-lg-4 col-md-6">' +
                    '<div class="' + cardClass + '">' +
                    badgeHtml +
                    '<div class="plan-name">' + p.name + "</div>" +
                    '<div class="plan-price">' + p.price + "<span>" + p.suffix + "</span></div>" +
                    '<div class="plan-desc">' + p.desc + "</div>" +
                    '<ul class="list-unstyled">' + featureItems + "</ul>" +
                    '<a href="' + p.link + '" class="btn btn-outline-primary rounded-pill w-100">' + p.cta + "</a>" +
                    "</div></div>";
            }).join("");

        document.getElementById("serviceFaqs").innerHTML =
            service.faqs.map(function (f, i) {
                const faqId = "sfaq-" + serviceId + "-" + i;

                const buttonClass = i === 0 ? "accordion-button" : "accordion-button collapsed";

                const collapseClass = i === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse";

                return '<div class="accordion-item">' +
                    '<h2 class="accordion-header">' +
                    '<button class="' + buttonClass + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + faqId + '">' +
                    f.q +
                    "</button></h2>" +
                    '<div id="' + faqId + '" class="' + collapseClass + '" data-bs-parent="#serviceFaqAccordion">' +
                    '<div class="accordion-body">' + f.a + "</div>" +
                    "</div></div>";
            }).join("");

        document.getElementById("serviceCtaTitle").innerText = service.ctaTitle;

        document.getElementById("serviceCtaText").innerText = service.ctaText;

        const serviceCtaBtn = document.getElementById("serviceCtaBtn");

        if (serviceCtaBtn) {
            serviceCtaBtn.innerText = service.ctaBtn;
            serviceCtaBtn.href = service.ctaLink;
        }

        const serviceOrderNowBtn = document.getElementById("serviceOrderNowBtn");

        if (serviceOrderNowBtn) {
            serviceOrderNowBtn.href = service.ctaLink;
        }

    }

}


function showError(inputId, errorId, message) {

    document.getElementById(inputId).classList.add("is-invalid");

    const error = document.getElementById(errorId);

    error.innerText = message;

    error.classList.remove("d-none");

}

function clearErrors() {

    const fields = [

        ["contactName", "nameError"],

        ["contactEmail", "emailError"],

        ["contactPhone", "phoneError"],

        ["contactSubject", "subjectError"],

        ["contactMessage", "messageError"]

    ];

    fields.forEach(field => {

        document.getElementById(field[0]).classList.remove("is-invalid");

        document.getElementById(field[1]).innerText = "";

        document.getElementById(field[1]).classList.add("d-none");

    });

}

/*=====================================
    CONTACT FORM
=====================================*/

const contactForm = document.getElementById("contactFormElement");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();
        clearErrors();

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const phone = document.getElementById("contactPhone").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        /* Validation */

        let valid = true;

        if (name === "") {

            showError("contactName", "nameError", "Full Name is required.");

            valid = false;

        }

        if (email === "") {

            showError("contactEmail", "emailError", "Email is required.");

            valid = false;

        }

        if (phone === "") {

            showError("contactPhone", "phoneError", "Phone Number is required.");

            valid = false;

        }

        if (subject === "") {

            showError("contactSubject", "subjectError", "Subject is required.");

            valid = false;

        }

        if (message === "") {

            showError("contactMessage", "messageError", "Message is required.");

            valid = false;

        }

        if (!valid) return;

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showError(

                "contactEmail",

                "emailError",

                "Please enter a valid email address."

            );

            return;

        }

        const phonePattern =
            /^[6-9]\d{9}$/;

        if (!phonePattern.test(phone)) {

            showError(

                "contactPhone",

                "phoneError",

                "Please enter a valid 10-digit phone number."

            );

            return;

        }

        /* Store Message */

        const contactMessage = {

            name,

            email,

            phone,

            subject,

            message,

            submittedOn: new Date().toLocaleString()

        };

        const messages =
            JSON.parse(localStorage.getItem("contactMessages")) || [];

        messages.push(contactMessage);

        localStorage.setItem(

            "contactMessages",

            JSON.stringify(messages)

        );

        document
            .getElementById("contactSuccess")
            .classList.remove("d-none");

        contactForm.reset();

        setTimeout(() => {

            const success =
                document.getElementById("contactSuccess");

            success.classList.add("d-none");

        }, 4000);

    });

}

/*=====================================
    LIVE VALIDATION
=====================================*/

const validationFields = [

    ["contactName", "nameError"],

    ["contactEmail", "emailError"],

    ["contactPhone", "phoneError"],

    ["contactSubject", "subjectError"],

    ["contactMessage", "messageError"]

];

validationFields.forEach(field => {

    const input = document.getElementById(field[0]);

    if (input) {

        input.addEventListener("input", () => {

            input.classList.remove("is-invalid");

            document
                .getElementById(field[1])
                .classList.add("d-none");

            document
                .getElementById(field[1])
                .innerText = "";

        });

    }

});

/*=====================================
    REGISTER HELPERS
=====================================*/

function showRegisterError(inputId, errorId, message) {

    const input = document.getElementById(inputId);

    const error = document.getElementById(errorId);

    if (input) {

        input.classList.add("is-invalid");

    }

    if (error) {

        error.innerText = message;

        error.classList.remove("d-none");

    }

}

function clearRegisterErrors() {

    const fields = [

        ["registerName", "registerNameError"],

        ["registerEmail", "registerEmailError"],

        ["registerPhone", "registerPhoneError"],

        ["registerPassword", "registerPasswordError"],

        ["confirmPassword", "confirmPasswordError"]

    ];

    fields.forEach(field => {

        const input = document.getElementById(field[0]);

        const error = document.getElementById(field[1]);

        if (input) {

            input.classList.remove("is-invalid");

        }

        if (error) {

            error.innerText = "";

            error.classList.add("d-none");

        }

    });

    const termsError = document.getElementById("termsError");

    if (termsError) {

        termsError.innerText = "";

        termsError.classList.add("d-none");

    }

}

/*=====================================
    SHOW / HIDE PASSWORD
=====================================*/

const toggleRegisterPassword =
    document.getElementById("toggleRegisterPassword");

const registerPassword =
    document.getElementById("registerPassword");

if (toggleRegisterPassword && registerPassword) {

    toggleRegisterPassword.addEventListener("click", () => {

        const type =
            registerPassword.type === "password"
                ? "text"
                : "password";

        registerPassword.type = type;

        toggleRegisterPassword.innerHTML =
            type === "password"

                ? '<i class="fa-solid fa-eye"></i>'

                : '<i class="fa-solid fa-eye-slash"></i>';

    });

}

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

if (toggleConfirmPassword && confirmPassword) {

    toggleConfirmPassword.addEventListener("click", () => {

        const type =
            confirmPassword.type === "password"
                ? "text"
                : "password";

        confirmPassword.type = type;

        toggleConfirmPassword.innerHTML =
            type === "password"

                ? '<i class="fa-solid fa-eye"></i>'

                : '<i class="fa-solid fa-eye-slash"></i>';

    });

}


/*=====================================
    REGISTER
=====================================*/

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        clearRegisterErrors();

        const name = document.getElementById("registerName").value.trim();

        const email = document.getElementById("registerEmail").value.trim();

        const phone = document.getElementById("registerPhone").value.trim();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        const acceptTerms = document.getElementById("acceptTerms").checked;

        let valid = true;

        /* Name */

        if (name === "") {

            showRegisterError(
                "registerName",
                "registerNameError",
                "Full Name is required."
            );

            valid = false;

        }

        /* Email */

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            showRegisterError(
                "registerEmail",
                "registerEmailError",
                "Email is required."
            );

            valid = false;

        } else if (!emailPattern.test(email)) {

            showRegisterError(
                "registerEmail",
                "registerEmailError",
                "Enter a valid email address."
            );

            valid = false;

        }

        /* Phone */

        const phonePattern = /^[6-9]\d{9}$/;

        if (phone === "") {

            showRegisterError(
                "registerPhone",
                "registerPhoneError",
                "Phone Number is required."
            );

            valid = false;

        } else if (!phonePattern.test(phone)) {

            showRegisterError(
                "registerPhone",
                "registerPhoneError",
                "Enter a valid 10-digit phone number."
            );

            valid = false;

        }

        /* Password */

        if (password === "") {

            showRegisterError(
                "registerPassword",
                "registerPasswordError",
                "Password is required."
            );

            valid = false;

        } else if (password.length < 8) {

            showRegisterError(
                "registerPassword",
                "registerPasswordError",
                "Password must be at least 8 characters."
            );

            valid = false;

        }

        /* Confirm Password */

        if (confirmPassword === "") {

            showRegisterError(
                "confirmPassword",
                "confirmPasswordError",
                "Confirm your password."
            );

            valid = false;

        } else if (password !== confirmPassword) {

            showRegisterError(
                "confirmPassword",
                "confirmPasswordError",
                "Passwords do not match."
            );

            valid = false;

        }

        /* Terms */

        if (!acceptTerms) {

            const termsError =
                document.getElementById("termsError");

            termsError.innerText =
                "Please accept the Terms & Conditions.";

            termsError.classList.remove("d-none");

            valid = false;

        }

        if (!valid) return;

        /* Existing Users */

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = users.some(user => user.email === email);

        if (emailExists) {

            showRegisterError(

                "registerEmail",

                "registerEmailError",

                "Email already registered."

            );

            return;

        }

        /* Save User */

        const newUser = {

            name,

            email,

            phone,

            password,

            dob: ""

        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        document
            .getElementById("registerSuccess")
            .classList.remove("d-none");

        registerForm.reset();

        setTimeout(() => {

            window.location.href = "login.html";

        }, 2000);

    });

}

/*=====================================
    REGISTER LIVE VALIDATION
=====================================*/

const registerFields = [

    ["registerName", "registerNameError"],

    ["registerEmail", "registerEmailError"],

    ["registerPhone", "registerPhoneError"],

    ["registerPassword", "registerPasswordError"],

    ["confirmPassword", "confirmPasswordError"]

];

registerFields.forEach(field => {

    const input = document.getElementById(field[0]);

    if (input) {

        input.addEventListener("input", () => {

            input.classList.remove("is-invalid");

            const error =
                document.getElementById(field[1]);

            error.innerText = "";

            error.classList.add("d-none");

        });

    }

});

const acceptTerms = document.getElementById("acceptTerms");

if (acceptTerms) {

    acceptTerms.addEventListener("change", () => {

        const termsError =
            document.getElementById("termsError");

        termsError.innerText = "";

        termsError.classList.add("d-none");

    });

}

const passwordInput =
    document.getElementById("registerPassword");

const passwordGuide =
    document.getElementById("passwordGuide");

if (passwordInput && passwordGuide) {

    passwordInput.addEventListener("focus", () => {

        passwordGuide.classList.remove("d-none");

    });

    passwordInput.addEventListener("blur", () => {

        setTimeout(() => {

            passwordGuide.classList.add("d-none");

        }, 150);

    });

}

function updateRule(id, passed) {

    const rule =
        document.getElementById(id);

    if (!rule) return;

    if (passed) {

        rule.classList.remove("text-danger");

        rule.classList.add("text-success");

        rule.innerHTML =
            rule.innerHTML.replace("❌", "✅");

    } else {

        rule.classList.remove("text-success");

        rule.classList.add("text-danger");

        rule.innerHTML =
            rule.innerHTML.replace("✅", "❌");

    }

}

if (passwordInput) {

    passwordInput.addEventListener("input", () => {

        const password = passwordInput.value;

        updateRule(
            "ruleLength",
            password.length >= 8
        );

        updateRule(
            "ruleUpper",
            /[A-Z]/.test(password)
        );

        updateRule(
            "ruleLower",
            /[a-z]/.test(password)
        );

        updateRule(
            "ruleNumber",
            /\d/.test(password)
        );

        updateRule(
            "ruleSpecial",
            /[@$!%*?&.#^()_\-+=]/.test(password)
        );

    });

}


/*=====================================
    LOGIN SHOW / HIDE PASSWORD
=====================================*/

const toggleLoginPassword =
    document.getElementById("toggleLoginPassword");

const loginPassword =
    document.getElementById("loginPassword");

if (toggleLoginPassword && loginPassword) {

    toggleLoginPassword.addEventListener("click", () => {

        const type =
            loginPassword.type === "password"
                ? "text"
                : "password";

        loginPassword.type = type;

        toggleLoginPassword.innerHTML =
            type === "password"
                ? '<i class="fa-solid fa-eye"></i>'
                : '<i class="fa-solid fa-eye-slash"></i>';

    });

}

/*=====================================
    LOGIN HELPERS
=====================================*/

function showLoginError(inputId, errorId, message) {

    const input = document.getElementById(inputId);

    const error = document.getElementById(errorId);

    if (input) {

        input.classList.add("is-invalid");

    }

    if (error) {

        error.innerText = message;

        error.classList.remove("d-none");

    }

}

function clearLoginErrors() {

    const fields = [

        ["loginEmail", "loginEmailError"],

        ["loginPassword", "loginPasswordError"]

    ];

    fields.forEach(field => {

        const input = document.getElementById(field[0]);

        const error = document.getElementById(field[1]);

        if (input) {

            input.classList.remove("is-invalid");

        }

        if (error) {

            error.innerText = "";

            error.classList.add("d-none");

        }

    });

}

/*=====================================
    FIXED ADMIN CREDENTIALS
=====================================*/

const ADMIN_CREDENTIALS = {
    email: "admin@floradaily.com",
    password: "Admin@123",
    name: "Admin"
};

/*=====================================
    SEED DEMO CUSTOMER ACCOUNT
    (Ensures the demo login shown on
    the login page always works)
=====================================*/

const DEMO_CUSTOMER = {
    name: "Demo Customer",
    email: "customer@floradaily.com",
    phone: "9876543210",
    password: "Customer@123",
    dob: ""
};

(function seedDemoCustomer() {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(u => u.email === DEMO_CUSTOMER.email);

    if (!exists) {

        users.push(DEMO_CUSTOMER);

        localStorage.setItem("users", JSON.stringify(users));

    }

})();

/*=====================================
    LOGIN
=====================================*/

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        clearLoginErrors();

        const loginModeField = document.getElementById("loginMode");
        const mode = loginModeField ? loginModeField.value : "customer";

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const rememberMe =
            document.getElementById("rememberMe").checked;

        let valid = true;

        if (email === "") {

            showLoginError(

                "loginEmail",

                "loginEmailError",

                "Email is required."

            );

            valid = false;

        }

        if (password === "") {

            showLoginError(

                "loginPassword",

                "loginPasswordError",

                "Password is required."

            );

            valid = false;

        }

        if (!valid) return;

        /*=====================================
            ADMIN LOGIN
        =====================================*/

        if (mode === "admin") {

            if (
                email !== ADMIN_CREDENTIALS.email ||
                password !== ADMIN_CREDENTIALS.password
            ) {

                showLoginError(

                    "loginPassword",

                    "loginPasswordError",

                    "Invalid admin credentials."

                );

                return;

            }

            const adminSession = {
                name: ADMIN_CREDENTIALS.name,
                email: ADMIN_CREDENTIALS.email,
                role: "admin"
            };

            sessionStorage.setItem(
                "loggedInAdmin",
                JSON.stringify(adminSession)
            );

            if (rememberMe) {

                localStorage.setItem(
                    "loggedInAdmin",
                    JSON.stringify(adminSession)
                );

            }

            document
                .getElementById("loginSuccess")
                .classList.remove("d-none");

            loginForm.reset();

            setTimeout(() => {

                window.location.href = "admin-dashboard.html";

            }, 1500);

            return;

        }

        /*=====================================
            CUSTOMER LOGIN
        =====================================*/

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user =
            users.find(u => u.email === email);

        if (!user) {

            showLoginError(

                "loginEmail",

                "loginEmailError",

                "No account found with this email."

            );

            return;

        }

        if (user.password !== password) {

            showLoginError(

                "loginPassword",

                "loginPasswordError",

                "Incorrect password."

            );

            return;

        }

        if (rememberMe) {

            localStorage.setItem(

                "loggedInUser",

                JSON.stringify(user)

            );

        } else {

            sessionStorage.setItem(

                "loggedInUser",

                JSON.stringify(user)

            );

        }

        document
            .getElementById("loginSuccess")
            .classList.remove("d-none");

        loginForm.reset();

        setTimeout(() => {

            window.location.href = "dash-home.html";

        }, 1500);

    });

}

/*=====================================
    LOGIN LIVE VALIDATION
=====================================*/

const loginFields = [

    ["loginEmail", "loginEmailError"],

    ["loginPassword", "loginPasswordError"]

];

loginFields.forEach(field => {

    const input =
        document.getElementById(field[0]);

    if (input) {

        input.addEventListener("input", () => {

            input.classList.remove("is-invalid");

            const error =
                document.getElementById(field[1]);

            error.innerText = "";

            error.classList.add("d-none");

        });

    }

});

/*=====================================
    NAVBAR AUTH
=====================================*/

const authContainer = document.getElementById("authContainer");

if (authContainer) {

    const loggedInUser =

        JSON.parse(localStorage.getItem("loggedInUser")) ||

        JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser) {

        authContainer.innerHTML = `

            <div class="dropdown">

               <button
    class="btn btn-outline-primary auth-user-btn dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown">

    <i class="fa-solid fa-user"></i>

    <span class="user-name">

        ${loggedInUser.name}

    </span>

</button>

                <ul class="dropdown-menu dropdown-menu-end shadow">

                    <li>

                        <a class="dropdown-item" href="dash-profile.html">

                            <i class="fa-solid fa-user me-2"></i>

                            My Profile

                        </a>

                    </li>

                    <li>

                        <a class="dropdown-item" href="dash-orders.html">

                            <i class="fa-solid fa-box me-2"></i>

                            My Orders

                        </a>

                    </li>

                    <li>
                        <a class="dropdown-item" href="cart.html">
                             <i class="fa-solid fa-cart-shopping me-2"></i>
                               Cart
                        </a>
                    </li>

                    <li>

                        <a class="dropdown-item" href="wishlist.html">

                            <i class="fa-solid fa-heart me-2"></i>

                            Wishlist

                        </a>

                    </li>

                    <li><hr class="dropdown-divider"></li>

                    <li>

                        <button
                            id="logoutBtn"
                            class="dropdown-item text-danger">

                            <i class="fa-solid fa-right-from-bracket me-2"></i>

                            Logout

                        </button>

                    </li>

                </ul>

            </div>

        `;

        document

            .getElementById("logoutBtn")

            .addEventListener("click", () => {

                localStorage.removeItem("loggedInUser");

                sessionStorage.removeItem("loggedInUser");

                window.location.href = "index.html";

            });

    }

}

/*=====================================
        WISHLIST
=====================================*/

const wishlistButtons = document.querySelectorAll(".wishlist-btn");

function markWishlistButtonState(button) {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(item => item.id == button.dataset.id);

    const icon = button.querySelector("i");

    if (exists) {

        button.classList.add("active");

        if (icon) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        }

    } else {

        button.classList.remove("active");

        if (icon) {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }

    }

}

wishlistButtons.forEach(button => {

    /* Set initial filled/unfilled state on page load */
    markWishlistButtonState(button);

    button.addEventListener("click", function () {

        const user = requireCustomerLogin("Please login to add items to your wishlist.");

        if (!user) return;

        const card = this.closest(".product-card");
        const viewButton = card.querySelector(".view-product");

        const product = {

            id: this.dataset.id || this.dataset.name,
            name: this.dataset.name,
            price: this.dataset.price,
            image: this.dataset.image,

            description: viewButton.dataset.description || "",
            fullDescription: viewButton.dataset.fullDescription || "",

            quantity: 1

        };

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const index = wishlist.findIndex(item => item.name === product.name);

        if (index === -1) {

            wishlist.push(product);

        } else {

            wishlist.splice(index, 1);

        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        markWishlistButtonState(this);

        updateWishlistCount();

    });

});

/*=====================================
    PRODUCT DETAILS WISHLIST
=====================================*/

const detailsWishlist = document.getElementById("detailsWishlist");

if (detailsWishlist) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    /* Get Current Product */

    const storedProduct =
        JSON.parse(localStorage.getItem("selectedProduct")) || {};

    const product = {

        id: storedProduct.id,

        name: storedProduct.name,

        price: storedProduct.price,

        image: storedProduct.image,

        description: storedProduct.description || "",

        fullDescription: storedProduct.fullDescription || "",

        quantity: 1,

        link: "product-details.html"

    };

    /* Check if already exists */

    function updateDetailsWishlist() {

        const exists = wishlist.some(item => item.id == product.id);

        const icon = detailsWishlist.querySelector("i");

        if (exists) {

            detailsWishlist.classList.add("active");

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

        }

        else {

            detailsWishlist.classList.remove("active");

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

        }

    }

    updateDetailsWishlist();

    detailsWishlist.addEventListener("click", function () {

        const user = requireCustomerLogin("Please login to add items to your wishlist.");

        if (!user) return;

        const index =
            wishlist.findIndex(item => item.id == product.id);

        if (index === -1) {

            wishlist.push(product);

        }

        else {

            wishlist.splice(index, 1);

        }

        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );

        updateDetailsWishlist();

        updateWishlistCount();

    });

}

/*=====================================
        FORGOT PASSWORD
======================================*/

const forgotForm = document.getElementById("forgotPasswordForm");

if (forgotForm) {

    forgotForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("forgotEmail");

        const error = document.getElementById("forgotEmailError");

        error.textContent = "";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === "") {

            error.textContent = "Email is required.";

            return;

        }

        if (!emailPattern.test(email.value.trim())) {

            error.textContent = "Please enter a valid email address.";

            return;

        }

        alert("Password reset link sent successfully!");

        forgotForm.reset();

    });

}

console.log("MAIN JS LOADED COMPLETELY");

/*=====================================
    CUSTOMER AUTH HELPERS
    (Used to require login before
    placing an order / using wishlist)
=====================================*/

function getLoggedInUser() {

    return (
        JSON.parse(localStorage.getItem("loggedInUser")) ||
        JSON.parse(sessionStorage.getItem("loggedInUser"))
    );

}

function requireCustomerLogin(message) {

    const user = getLoggedInUser();

    if (!user) {

        alert(message || "Please login to continue.");

        window.location.href = "login.html";

        return null;

    }

    return user;

}

/*=====================================
    WISHLIST / CART COUNT
    (Global helpers, called on every
    page load and after updates)
=====================================*/

function updateWishlistCount() {

    const wishlistCountEl = document.getElementById("wishlistCount");

    if (!wishlistCountEl) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlistCountEl.innerText = wishlist.length;

}

function updateCartCount() {

    const cartCountEl = document.getElementById("cartCount");
    const headerCartCountEl = document.getElementById("headerCartCount");

    if (!cartCountEl && !headerCartCountEl) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity || 1;

    });

    if (cartCountEl) cartCountEl.innerText = totalItems;

    if (headerCartCountEl) headerCartCountEl.innerText = totalItems;

}

updateWishlistCount();
updateCartCount();

/*=====================================
    ADMIN AUTH GUARD
    (Used on admin-dashboard.html)
=====================================*/

function requireAdminAuth() {

    const admin =
        JSON.parse(sessionStorage.getItem("loggedInAdmin")) ||
        JSON.parse(localStorage.getItem("loggedInAdmin"));

    if (!admin) {

        window.location.href = "login.html";

        return null;

    }

    return admin;

}

/*=====================================
    ADMIN LOGOUT
=====================================*/

const adminLogoutBtn = document.getElementById("adminLogoutBtn");

if (adminLogoutBtn) {

    adminLogoutBtn.addEventListener("click", () => {

        sessionStorage.removeItem("loggedInAdmin");
        localStorage.removeItem("loggedInAdmin");

        window.location.href = "login.html";

    });

}
