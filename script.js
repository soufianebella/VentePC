// script.js for VentePC

// Product data array
const products = [
    { id: 1, name: 'Laptop', price: 999, image: 'laptop.jpg' },
    { id: 2, name: 'Smartphone', price: 599, image: 'smartphone.jpg' },
    { id: 3, name: 'Tablet', price: 399, image: 'tablet.jpg' }
];

// Function to dynamically render products
function renderProducts() {
    const productContainer = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src='${product.image}' alt='${product.name}' />
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick='addToCart(${product.id})'>Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Shopping cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartInLocalStorage();
        alert(`${product.name} has been added to your cart!`);
    }
}

function updateCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Smooth scrolling navigation
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
});

const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    // Here, you should handle the form data, e.g., send it to a server.
    alert('Form submitted successfully!');
    contactForm.reset();
});

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imgObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imgObserver.observe(img);
});

// Initial rendering of products
renderProducts();
