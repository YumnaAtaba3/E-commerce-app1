
// =========================
// HERO SLIDER
// =========================
const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".dots span");
const heroImg = document.getElementById("hero-image");

const images = [
  "./assets/jbl660nc-1.png",
  "./assets/boat131-3.png",
  "./assets/boat518-1.png",
];


let index = 0;


function showSlide(i) {
  index = i;
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
  heroImg.src = images[index];
}


dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));



setInterval(() => {
  index = (index + 1) % images.length;
  showSlide(index);
}, 3000);

// =========================
// SEARCH BOX TOGGLE
// =========================
const searchBox = document.querySelector(".search-box");
const searchIcon = document.querySelector(".search-icon");

searchIcon.addEventListener("click", () => {
  searchBox.classList.toggle("active");
  const input = searchBox.querySelector("input");

  if (searchBox.classList.contains("active")) {
    input.focus();

    // Smooth scroll to Top Products section
    document.querySelector(".top-products").scrollIntoView({
      behavior: "smooth",
    });
  }
});

// =========================
// USER MENU TOGGLE
// =========================
const userMenu = document.querySelector(".user-menu");
const userIcon = document.querySelector(".user-icon");

userIcon.addEventListener("click", () => userMenu.classList.toggle("active"));


document.addEventListener("click", (e) => {
  if (!userMenu.contains(e.target)) userMenu.classList.remove("active");

});



// =========================
// LANGUAGE DROPDOWN
// =========================
const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
];

const langSelect = document.querySelector(".lang-select");
const selected = langSelect.querySelector(".selected");
const optionsContainer = langSelect.querySelector(".options");


languages.forEach((lang) => {
  const li = document.createElement("li");
  li.dataset.lang = lang.code;
  li.textContent = lang.name;
  optionsContainer.appendChild(li);

  li.addEventListener("click", () => {
    selected.textContent = lang.name;
    langSelect.classList.remove("active");
    console.log("Language changed to:", lang.code);
  });
});

selected.addEventListener("click", () => langSelect.classList.toggle("active"));


document.addEventListener("click", (e) => {
  if (!langSelect.contains(e.target)) langSelect.classList.remove("active");
});

// =========================
// PRODUCTS DATA
// =========================
const productsData = [
  {
    name: "JBL Live 660NC",
    desc: "Wireless Over-Ear NC Headphones",
    price: 9999,
    oldPrice: 14999,
    image: "./assets/jbl660nc-1.png",
    category: "headphones",
  },
  {
    name: "boAt Rockerz 518",
    desc: "On-Ear Wireless Headphones",
    price: 1299,
    oldPrice: 3990,
    image: "./assets/jbl-endu-1.png",
    category: "headphones",
  },
  {
    name: "boAt Airdopes 131",
    desc: "Wireless In-Ear Earbuds",
    price: 1099,
    oldPrice: 2990,
    image: "./assets/boat203-1 (1).png",
    category: "earbuds",
  },
  {
    name: "boAt BassHeads 110",
    desc: "In-Ear Wired Earphones",
    price: 449,
    oldPrice: 999,
    image: "./assets/jbl660nc-1.png",
    category: "earphones",
  },
  {
    name: "JBL Endurance Run",
    desc: "Sports In-Ear Wired Earphones",
    price: 999,
    oldPrice: 1599,
    image: "./assets/jbl760nc-1.png",
    category: "earphones",
  },
  {
    name: "boAt Rockerz 255",
    desc: "Bluetooth Neckband",
    price: 899,
    oldPrice: 2990,
    image: "./assets/boat518-1.png",
    category: "neckbands",
  },
];

// FEATURED PRODUCTS
const featuredProducts = [
  {
    name: "boAt Rockerz 518",
    price: 299,
    oldPrice: 3990,
    image: "./assets/jbl660nc-1.png",
  },
  {
    name: "JBL Tune 760NC",
    price: 5999,
    oldPrice: 7999,
    image: "./assets/boat203-1 (1).png",
  },
  {
    name: "boAt Rockerz 255",
    price: 899,
    oldPrice: 2990,
    image: "./assets/jbl-endu-1.png",
  },
  {
    name: "JBL Endurance Run",
    price: 999,
    oldPrice: 1599,
    image: "./assets/jbl760nc-1.png",
  },
  {
    name: "boAt Airdopes 281",
    price: 1074,
    oldPrice: 3599,
    image: "./assets/boat203-1 (1).png",
  },
  {
    name: "boAt Rockerz 518",
    price: 299,
    oldPrice: 3990,
    image: "./assets/jbl660nc-1.png",
  },
  {
    name: "JBL Tune 760NC",
    price: 5999,
    oldPrice: 7999,
    image: "./assets/boat203-1 (1).png",
  },
  {
    name: "boAt Rockerz 255",
    price: 899,
    oldPrice: 2990,
    image: "./assets/boat518-1.png",
  },
  {
    name: "JBL Endurance Run",
    price: 999,
    oldPrice: 1599,
    image: "./assets/jbl760nc-1.png",
  },
  {
    name: "boAt Airdopes 281",
    price: 1074,
    oldPrice: 3599,
    image: "./assets/boat203-1 (1).png",
  },
];

// =========================
// RENDER PRODUCTS (with filter + search)
// =========================
const productGrid = document.getElementById("productGrid");
let searchQuery = "";

function renderProducts(filter = "all") {
  productGrid.innerHTML = "";
  const filtered = productsData.filter((p) => {
    const matchesCategory = filter === "all" || p.category === filter;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `<p class="no-results">No products found</p>`;
    return;
  }

  filtered.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card", "products_card");
    card.setAttribute("data-category", p.category);
    card.innerHTML = `
      <figure class="products_img">
        <img src="${p.image}" alt="${p.name}">
      </figure>
      <div class="products_details">
        <h3 class="products_title">${p.name}</h3>
        <h5 class="products_info">${p.desc}</h5>
        <h2 class="products_price">$${p.price} &nbsp; <small><del>$${p.oldPrice}</del></small></h2>
        <button type="button" class="btn products_btn">Add to cart</button>
      </div>`;
    productGrid.appendChild(card);
  });

  attachAddToCartEvents();
}

// FILTER BUTTONS
const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.getAttribute("data-filter"));
  });
});

// HEADER SEARCH
const headerSearchInput = document.querySelector(".search-box input");
headerSearchInput.addEventListener("input", function () {
  searchQuery = this.value;
  renderProducts();
});

renderProducts();
// =========================
// FEATURED PRODUCTS SLIDER
// =========================
const featuredSlider = document.getElementById("featuredSlider");
const sliderDots = document.getElementById("sliderDots");
let currentSlide = 0;
const itemsPerSlide = 5;

function renderFeatured() {
  featuredSlider.innerHTML = "";
  sliderDots.innerHTML = "";
  const totalSlides = Math.ceil(featuredProducts.length / itemsPerSlide);

  for (let i = 0; i < totalSlides; i++) {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    const start = i * itemsPerSlide;
    const end = start + itemsPerSlide;
    const group = featuredProducts.slice(start, end);

    group.forEach((p) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <p>${p.name}</p>
        <span class="price">$${p.price} <del>$${p.oldPrice}</del></span>`;
      slide.appendChild(productDiv);
    });

    featuredSlider.appendChild(slide);

    if (totalSlides > 1) {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      sliderDots.appendChild(dot);
    }
  }
}

function goToSlide(index) {
  currentSlide = index;
  const offset = -index * 100;
  featuredSlider.style.transform = `translateX(${offset}%)`;

  document.querySelectorAll("#sliderDots button").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  // Highlight center product
  const visibleSlide = featuredSlider.children[index];
  const products = visibleSlide.querySelectorAll(".product");
  if (products.length > 0) {
    const centerIndex = Math.floor(products.length / 2);
    products.forEach((p) => p.classList.remove("active"));
    products[centerIndex].classList.add("active");
  }
}

function autoSlide() {
  const totalSlides = Math.ceil(featuredProducts.length / itemsPerSlide);
  if (totalSlides <= 1) return;
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

renderFeatured();
setInterval(autoSlide, 4000);

// =========================
// CART LOGIC
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCounter = document.querySelector(".cart span");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cartTotal");

// Update cart counter
function updateCartCounter() {
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounter.textContent = totalQuantity;
}

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render cart in sidebar
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartTotal.textContent = total;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    const discount = item.oldPrice ? item.oldPrice - item.price : 0;
    const totalItemPrice = item.price * item.quantity;

    div.innerHTML = `
  <img src="${item.img}" alt="${item.name}">
  <div class="item-info">
    <p><strong>${item.name}</strong></p>
    <small>
      <del>$${item.oldPrice || item.price}</del> 
      <span style="color:#0f0;"> $${discount}</span>
    </small>
    <p>Price: $${item.price} × ${
      item.quantity
    } = <strong>$${totalItemPrice}</strong></p>
    <div class="quantity-controls">
      <button class="decrease"><i class="fas fa-minus"></i></button>
      <span>${item.quantity}</span>
      <button class="increase"><i class="fas fa-plus"></i></button>
     
    </div>
  </div>
  <button class="remove"><i class="fas fa-trash"></i></button>

`;

    // Events for + - remove
    div.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveCart();
      updateCartCounter();
      renderCart();
    });
    div.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1);
      }
      saveCart();
      updateCartCounter();
      renderCart();
    });
    div.querySelector(".remove").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1);
      }
      saveCart();
      updateCartCounter();
      renderCart();
    });

    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = total;
}

// Add to cart
function addToCart(product, btn) {
  const existingItem = cart.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveCart();
  updateCartCounter();
  renderCart();

  // Button animation
  btn.textContent = "Added";
  btn.style.backgroundColor = "green";
  setTimeout(() => {
    btn.textContent = "Add to cart";
    btn.style.backgroundColor = "";
  }, 1500);
}

// Attach add-to-cart
function attachAddToCartEvents() {
  const buttons = document.querySelectorAll(".products_btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = btn.closest(".card");
      const name = card.querySelector(".products_title").textContent;
      const price = parseInt(
        card.querySelector(".products_price").textContent.replace(/[$,]/g, "")
      );
      const oldPrice = parseInt(
        card.querySelector("small del").textContent.replace(/[$,]/g, "")
      );
      const img = card.querySelector("img").src;

      const product = { name, price, oldPrice, img };
      addToCart(product, btn);
    });
  });
}

// Open cart sidebar
document.querySelector(".cart").addEventListener("click", () => {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
  renderCart();
});

// Close cart sidebar
document.querySelector(".close-cart").addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});
cartOverlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

// Restore counter
document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
  renderCart();
});

// Product Modal
const productModal = document.getElementById("productModal");
const closeModal = document.querySelector(".close-modal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalOldPrice = document.getElementById("modalOldPrice");
const modalDiscount = document.getElementById("modalDiscount");
const modalAddToCart = document.getElementById("modalAddToCart");

function attachProductModalEvents() {
  document.querySelectorAll(".products_title").forEach((titleEl) => {
    titleEl.addEventListener("click", () => {
      const card = titleEl.closest(".card");
      const name = card.querySelector(".products_title").textContent;
      const desc = card.querySelector(".products_info").textContent;
      const price = parseInt(
        card.querySelector(".products_price").textContent.replace(/[$,]/g, "")
      );
      const oldPrice = parseInt(
        card.querySelector("small del").textContent.replace(/[$,]/g, "")
      );
      const img = card.querySelector("img").src;

      // Fill modal
      modalName.textContent = name;
      modalDesc.textContent = desc;
      modalImage.src = img;
      modalPrice.textContent = `$${price}`;
      modalOldPrice.textContent = oldPrice ? `$${oldPrice}` : "";
      const discount = oldPrice ? oldPrice - price : 0;
      modalDiscount.textContent = discount
        ? `You save: $${discount} (${Math.round((discount / oldPrice) * 100)}%)`
        : "";

      // Open modal
      productModal.style.display = "flex";

      // Add to cart from modal
      modalAddToCart.onclick = () => {
        const product = { name, price, oldPrice, img };
        addToCart(product, modalAddToCart);
      };
    });
  });
}

// Close modal
closeModal.addEventListener("click", () => {
  productModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === productModal) productModal.style.display = "none";
});


renderProducts();
attachProductModalEvents();
// Clear Cart button logic with popup
const clearCartBtn = document.querySelector(".clear-cart-btn");
const clearCartPopup = document.getElementById("clearCartPopup");
const cancelBtn = clearCartPopup.querySelector(".cancel");
const confirmBtn = clearCartPopup.querySelector(".confirm");

// Open popup when clicking "Clear All"
clearCartBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  clearCartPopup.style.display = "flex";
});

// Cancel popup
cancelBtn.addEventListener("click", () => {
  clearCartPopup.style.display = "none";
});

// Confirm clear
confirmBtn.addEventListener("click", () => {
  cart = [];
  saveCart();
  updateCartCounter();
  renderCart();
  clearCartPopup.style.display = "none";
});

// Close popup when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === clearCartPopup) {
    clearCartPopup.style.display = "none";
  }
});
