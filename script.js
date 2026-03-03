// script.js

// Function to dynamically render product cards
function renderProducts(products) {
    const productContainer = document.getElementById('product-container');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<h2>${product.name}</h2><p>${product.description}</p><p>Price: $${product.price}</p>`;
        productContainer.appendChild(card);
    });
}

// Smooth scrolling for anchor links
const smoothScroll = (target) => {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
};

// Intersection Observer for animations
const options = {
    root: null,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        } else {
            entry.target.classList.remove('fade-in');
        }
    });
}, options);

// Observe elements with the class 'animate'
document.querySelectorAll('.animate').forEach(element => {
    observer.observe(element);
});

// Event Handling Example
document.addEventListener('click', (event) => {
    if (event.target.matches('.nav-link')) {
        smoothScroll(event.target.getAttribute('href'));
    }
});