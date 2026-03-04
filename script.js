// script.js for VentePC

// --------- Données produits ----------
const products = [
    { id: 1, name: "PC Gamer RTX 4070", price: 1699, image: "image/2.jpg" },
    { id: 2, name: "Ultrabook 14\" Pro", price: 1299, image: "image/3.jpg" },
    { id: 3, name: "Écran 27\" 144Hz", price: 329, image: "image/4.jpg" }
];

// --------- Rendu des produits ----------
function createProductCard(product, onAddToCart) {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR"
        })}</p>
        <button type="button" class="primary-button">Ajouter au panier</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => onAddToCart(product.id));

    return card;
}

function renderProducts(container, items, onAddToCart) {
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    items.forEach((product) => {
        fragment.appendChild(createProductCard(product, onAddToCart));
    });

    container.appendChild(fragment);
}

// --------- Panier (en mémoire + localStorage) ----------
let cart = [];

function loadCartFromStorage() {
    try {
        const stored = localStorage.getItem("cart");
        cart = stored ? JSON.parse(stored) : [];
    } catch {
        cart = [];
    }
}

function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    cart.push(product);
    saveCartToStorage();
    alert(`${product.name} a été ajouté à votre panier.`);
}

// --------- Utilitaires UI ----------
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetSelector = link.getAttribute("href");
            const target = targetSelector && document.querySelector(targetSelector);

            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

function setupNavigationToggle() {
    const navToggle = document.querySelector(".nav-toggle");
    const navList = document.getElementById("nav-list");

    if (!navToggle || !navList) return;

    function closeMenu() {
        navToggle.classList.remove("is-open");
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    }

    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.classList.toggle("is-open");
        navList.classList.toggle("is-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navList.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLAnchorElement) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

function setupScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    if (!elementsToAnimate.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("fade-in");
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.1
    });

    elementsToAnimate.forEach((element) => observer.observe(element));
}

function setupContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();

        alert(
            name
                ? `Merci ${name}, nous reviendrons vers vous rapidement.`
                : "Merci, nous reviendrons vers vous rapidement."
        );

        contactForm.reset();
    });
}

// --------- Initialisation globale ----------
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-list");
    if (productContainer) {
        loadCartFromStorage();
        renderProducts(productContainer, products, addToCart);
    }

    setupSmoothScroll();
    setupNavigationToggle();
    setupScrollAnimations();
    setupContactForm();
});
