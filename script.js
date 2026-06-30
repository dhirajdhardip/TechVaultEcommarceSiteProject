// Product Data with High-Quality Unsplash Images
const products = [
    { id: 1, name: 'Pro Ultra Smartphone', category: 'smartphones', price: 999, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', description: 'Latest flagship with 5G support', rating: 4.8 },
    { id: 2, name: 'Power Max Laptop', category: 'laptops', price: 1599, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop', description: 'High-performance computing machine', rating: 4.9 },
    { id: 3, name: 'Wireless Earbuds', category: 'accessories', price: 199, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop', description: 'Premium sound quality with active noise cancellation', rating: 4.5 },
    { id: 4, name: 'Smart Watch Pro', category: 'wearables', price: 349, image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop', description: 'Track your fitness goals and daily activities', rating: 4.7 },
    { id: 5, name: 'Pro Tablet Plus', category: 'smartphones', price: 799, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop', description: 'Perfect for productivity, drawing, and entertainment', rating: 4.6 },
    { id: 6, name: 'Gaming Laptop X', category: 'laptops', price: 1999, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop', description: 'Extreme performance gaming laptop with RGB keyboard', rating: 5.0 },
    { id: 7, name: 'Camera Pro 4K', category: 'accessories', price: 599, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', description: 'Professional 4K video recording camera', rating: 4.4 },
    { id: 8, name: 'Fitness Band Plus', category: 'wearables', price: 129, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=600&auto=format&fit=crop', description: 'Daily activity tracking and sleep monitor', rating: 4.2 },
    { id: 9, name: 'Portable Charger', category: 'accessories', price: 79, image: 'https://images.unsplash.com/photo-1585995603413-eb35b5f4a50b?q=80&w=600&auto=format&fit=crop', description: 'Fast charging technology on the go', rating: 4.3 },
    { id: 10, name: 'Budget Smartphone', category: 'smartphones', price: 399, image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=600&auto=format&fit=crop', description: 'Great value option with amazing battery life', rating: 4.1 },
    { id: 11, name: 'Ultrabook Thin', category: 'laptops', price: 1299, image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=600&auto=format&fit=crop', description: 'Ultra-portable design for students and professionals', rating: 4.6 },
    { id: 12, name: 'AR Glasses', category: 'wearables', price: 799, image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600&auto=format&fit=crop', description: 'Next-generation augmented reality experience', rating: 4.7 },
    { id: 13, name: 'Pro Laptop Charger', category: 'accessories', price: 89, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D', description: 'Fast delivery 90W power adapter', rating: 4.5 }
];

// State
let cart = [];
let currentFilter = 'all';
let searchQuery = '';
let maxPrice = 2000;
let currentSort = 'default';

// Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const searchBox = document.getElementById('searchBox');
const filterBtns = document.querySelectorAll('.filter-btn');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortSelect = document.getElementById('sortSelect');
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const productDetailsContainer = document.getElementById('productDetailsContainer');

// Initialize
function init() {
    renderProducts();
    attachEventListeners();
    loadCart();
}

// Render Products
function renderProducts() {
    let filtered = products.filter(product => {
        const matchesCategory = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sort Logic (New Feature)
    if (currentSort === 'low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'high-low') {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <p>No products match your filters or budget.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image-container" onclick="openProductDetail(${product.id})">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
                <span class="product-category-tag">${product.category}</span>
            </div>
            <div class="product-info">
                <div class="product-name" onclick="openProductDetail(${product.id})">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open Product Detail Modal (New Feature)
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    productDetailsContainer.innerHTML = `
        <div class="product-detail-view">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <span class="detail-tag">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="detail-rating">⭐ ${product.rating} / 5.0</div>
                <p class="detail-desc">${product.description}. Premium build quality, designed for heavy daily usage and longevity.</p>
                <div class="detail-price">$${product.price}</div>
                <button class="checkout-btn" onclick="addToCart(${product.id}); productModal.classList.remove('active');">Add to Shopping Cart</button>
            </div>
        </div>
    `;
    productModal.classList.add('active');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

// Render Cart
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your shopping cart is empty</p>
            </div>
        `;
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotal = total;
    const tax = Math.round(subtotal * 0.1);
    const shipping = subtotal > 500 ? 0 : 50;
    const finalTotal = subtotal + tax + shipping;

    let html = '<div class="cart-items">';
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `;
    });
    html += '</div>';

    html += `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal}</span>
            </div>
            <div class="summary-row">
                <span>Tax (10%):</span>
                <span>$${tax}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'Free' : '$' + shipping}</span>
            </div>
            <div class="summary-row total">
                <span>Total Amount:</span>
                <span>$${finalTotal}</span>
            </div>
        </div>
        <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
    `;

    cartItemsContainer.innerHTML = html;
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
    showNotification('Item removed from cart');
}

// Checkout
function checkout() {
    if (cart.length === 0) return;
    showNotification('Order placed successfully! Thank you for your purchase.');
    cart = [];
    saveCart();
    updateCartCount();
    cartModal.classList.remove('active');
    renderProducts();
}

// Save/Load Cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
    }
}

// Event Listeners
function attachEventListeners() {
    searchBox.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            renderProducts();
        });
    });

    // Price Filter Event (New Feature)
    priceRange.addEventListener('input', (e) => {
        maxPrice = parseInt(e.target.value);
        priceValue.textContent = maxPrice;
        renderProducts();
    });

    // Sort Event (New Feature)
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        renderCart();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    closeProductModal.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.classList.remove('active');
        if (e.target === productModal) productModal.classList.remove('active');
    });
}

// Notification
function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

init();