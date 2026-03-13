// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {

    // 1. Manual Product Slider (Custom JS)
    const slider = document.getElementById('product-slider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // Only run if these elements exist to avoid errors
    if (slider && nextBtn && prevBtn) {
        let currentIndex = 0;
        const itemsToShow = 2;
        const totalItems = slider.children.length;
        const maxIndex = totalItems - itemsToShow;

        function updateSlider() {
            const percentage = (currentIndex * 50);
            slider.style.transform = `translateX(-${percentage}%)`;
            prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
            nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) { currentIndex++; updateSlider(); }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) { currentIndex--; updateSlider(); }
        });

        updateSlider();
    }

    // 2. Main Jewelry Carousel (Swiper)
    if (document.querySelector('.main-jewelry-carousel')) {
        const mainJewelrySwiper = new Swiper('.main-jewelry-carousel', {
            loop: true,
            speed: 1200,
            grabCursor: true,
            keyboard: { enabled: true },
            autoplay: { delay: 5000, disableOnInteraction: false },
        });
    }

    // 3. Category Swiper (Popular Category with Auto Slide)
    if (document.querySelector('.categorySwiper')) {
        const categorySwiper = new Swiper(".categorySwiper", {
            slidesPerView: "auto",
            spaceBetween: 0,
            grabCursor: true,
            freeMode: true,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            },
            speed: 600,
        });
    }

    // 4. Jewelry Product Section Swiper (RENAMED to jewelrySwiper)
    if (document.querySelector('.myJewelrySwiper')) {
        const jewelrySwiper = new Swiper('.myJewelrySwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            breakpoints: {
                480: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 30 }
            }
        });
    }

    // 5. Reels Section Swiper (RENAMED to reelsSwiper)
    if (document.querySelector('.reelSwiper')) {
        const reelsSwiper = new Swiper('.reelSwiper', {
            slidesPerView: 1,
            spaceBetween: 15,
            loop: true,
            freeMode: true,
            speed: 8000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: '.reel-next',
                prevEl: '.reel-prev',
            },
            breakpoints: {
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 }
            }
        });
    }

    // 6. Testimonials Swiper
    if (document.querySelector('.mySwiper')) {
        const testimonialSwiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 7. News Swiper
    if (document.querySelector('.newsSwiper')) {
        const newsSwiper = new Swiper('.newsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3 }
            }
        });
    }

    // 6. Countdown Timer Logic
    const targetDate = new Date("March 31, 2026 23:59:59").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const gap = targetDate - now;

        if (gap < 0) return; // Stop if date is passed

        const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        document.querySelectorAll('.js-days').forEach(el => el.innerText = d);
        document.querySelectorAll('.js-hours').forEach(el => el.innerText = h);
        document.querySelectorAll('.js-mins').forEach(el => el.innerText = m);
        document.querySelectorAll('.js-secs').forEach(el => el.innerText = s);
    };

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately so it doesn't wait 1 second to show numbers

    // Check if modal should be shown
    if (localStorage.getItem('hideNewsletter') !== 'true') {
        const modal = document.getElementById('newsletter-modal');
        if (modal) {
            setTimeout(() => {
                showModal();
            }, 500);
        }
    }

    // JELWO Store Logic

    // 1. Sync Quantities
    function changeQty(val) {
        const main = document.getElementById('qty');
        const sticky = document.getElementById('stickyQty');
        let current = parseInt(main.value);
        current += val;
        if (current < 1) current = 1;
        main.value = current;
        sticky.value = current;
    }

    // 2. Accordions
    document.querySelectorAll('.acc-trigger').forEach(trigger => {
        trigger.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            content.classList.toggle('hidden');
            if (content.classList.contains('hidden')) {
                icon.classList.replace('ri-subtract-line', 'ri-add-line');
            } else {
                icon.classList.replace('ri-add-line', 'ri-subtract-line');
            }
        });
    });

    // 3. Size Switcher
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.size-btn').forEach(b => {
                b.classList.remove('border-gray-800', 'text-gray-900', 'font-bold');
                b.classList.add('border-gray-200', 'text-gray-400');
            });
            this.classList.replace('border-gray-200', 'border-gray-800');
            this.classList.replace('text-gray-400', 'text-gray-900');
            this.classList.add('font-bold');
            document.getElementById('sizeVal').innerText = this.innerText;
        });
    });

    // 4. Sticky Bar Behavior
    window.addEventListener('scroll', () => {
        const bar = document.getElementById('stickyBar');
        const trigger = document.getElementById('buyBtnMain');
        if (!bar || !trigger) return;

        const pos = trigger.getBoundingClientRect().bottom + window.scrollY;
        if (window.scrollY > pos) {
            bar.classList.remove('translate-y-full');
        } else {
            bar.classList.add('translate-y-full');
        }
    });




    // Mobile Menu Sidebar Logic
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const searchToggle = document.getElementById('search-toggle');
    const mobileSearch = document.getElementById('mobile-search');

    if (menuToggle && mobileSidebar && sidebarOverlay && closeSidebar) {
        menuToggle.addEventListener('click', () => {
            mobileSidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
            sidebarOverlay.classList.add('opacity-100');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });

        const closeMenu = () => {
            mobileSidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.remove('opacity-100');
            sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = ''; // Restore scroll
        };

        closeSidebar.addEventListener('click', closeMenu);
        sidebarOverlay.addEventListener('click', closeMenu);
    }

    if (searchToggle && mobileSearch) {
        searchToggle.addEventListener('click', () => {
            mobileSearch.classList.toggle('hidden');
        });
    }

    // JELWO Nav Dropdown Functionality (Desktop Hover)
    document.querySelectorAll('.group').forEach(group => {
        const dropdown = group.querySelector('[class*="hidden"][class*="group-hover"]');
        if (dropdown) {
            group.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 768) {
                    dropdown.classList.remove('hidden');
                }
            });
            group.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 768) {
                    dropdown.classList.add('hidden');
                }
            });
        }
    });

    // 6. Thumbnail Image Click Handler
    // When clicking on small thumbnail images, update the main image
    document.querySelectorAll('.thumb').forEach(thumb => {
        thumb.addEventListener('click', function () {
            const mainImg = document.getElementById('mainImg');
            if (mainImg) {
                mainImg.src = this.src;
                // Reset zoom state when changing images
                mainImg.style.transform = 'scale(1)';
                mainImg.classList.remove('cursor-zoom-out');
                mainImg.classList.add('cursor-zoom-in');
            }
        });
    });

    // 7. Image Zoom Functionality
    // Click on main image to zoom in/out
    const mainImg = document.getElementById('mainImg');
    if (mainImg) {
        mainImg.addEventListener('click', function () {
            if (this.style.transform === 'scale(1.5)') {
                this.style.transform = 'scale(1)';
                this.classList.remove('cursor-zoom-out');
                this.classList.add('cursor-zoom-in');
            } else {
                this.style.transform = 'scale(1.5)';
                this.classList.remove('cursor-zoom-in');
                this.classList.add('cursor-zoom-out');
            }
        });
    }

    // 8. Wishlist & Cart Functionality
    // Initialize from localStorage or empty array
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl z-[9999] transform translate-y-20 opacity-0 transition-all duration-300 font-sans text-sm flex items-center gap-3';
        toast.innerHTML = `
            <i class="ri-checkbox-circle-fill text-green-400 text-lg"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        // Fade in
        setTimeout(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        }, 10);

        // Fade out and remove
        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Function to add item to wishlist
    function addToWishlist(product) {
        // Check if product already exists in wishlist
        const exists = wishlist.some(item => item.id === product.id);
        if (!exists) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistCount();
            showToast('Item added to wishlist!');
        } else {
            showToast('Item is already in your wishlist!');
        }
    }

    // Function to remove item from wishlist
    function removeFromWishlist(productId) {
        wishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        renderWishlist();
        showToast('Item removed from wishlist');
    }

    // Function to add item to cart
    function addToCart(product, quantity = 1) {
        const qty = parseInt(quantity) || 1;
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + qty;
        } else {
            cart.push({ ...product, quantity: qty });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showToast('Item added to cart!');
    }

    // Update wishlist count in navbar
    function updateWishlistCount() {
        const countElements = document.querySelectorAll('.wishlist-count');
        countElements.forEach(el => {
            el.textContent = `(${wishlist.length})`;
        });
    }

    // Update cart count in navbar
    function updateCartCount() {
        const countElements = document.querySelectorAll('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        countElements.forEach(el => {
            el.textContent = `(${totalItems})`;
        });
    }

    // Render wishlist items on wishlist page
    function renderWishlist() {
        const container = document.getElementById('wishlist-items');
        if (!container) return;

        if (wishlist.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fa-regular fa-heart text-6xl text-gray-200 mb-4"></i>
                    <p class="text-gray-500 mb-4">Your wishlist is empty</p>
                    <a href="index.html" class="inline-block bg-[#a77f66] hover:bg-[#222222] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
                        Continue Shopping
                    </a>
                </div>
            `;
            updateSummary();
            return;
        }

        container.innerHTML = wishlist.map(item => `
            <div class="group relative border border-gray-100 bg-white text-center transition-all hover:shadow-lg h-auto flex flex-col">
                <!-- Image Area -->
                <div class="relative aspect-square overflow-hidden bg-[#f9f9f9] p-4 flex items-center justify-center">
                    <span class="absolute left-2 top-2 z-20 bg-[#48bb78] px-2 py-1 text-[10px] text-white font-bold rounded-sm uppercase">45%</span>
                    <img src="${item.image}" alt="${item.name}" class="max-h-full object-contain transition-transform duration-500 group-hover:scale-105">
                    
                    <!-- Hover Overlay -->
                    <div class="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <button onclick="removeFromWishlist('${item.id}')" 
                            class="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white hover:text-red-500 hover:scale-110 transition-all shadow-lg"
                            title="Remove from wishlist">
                            <i class="fa-solid fa-trash-can text-sm"></i>
                        </button>
                        <button class="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white hover:text-[#a77f66] hover:scale-110 transition-all shadow-lg"
                            title="Quick view">
                            <i class="fa-solid fa-eye text-sm"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Content Area -->
                <div class="p-5 bg-gray-50/50 flex flex-col flex-1">
                    <div class="mb-4">
                        <h3 class="font-bold text-gray-800 text-sm truncate mb-1">${item.name}</h3>
                        <p class="text-[#a77f66] font-bold text-xs">${item.price}</p>
                    </div>

                    <div class="flex items-center gap-2 mb-6 mt-auto">
                        <select class="flex-1 bg-white border border-gray-200 text-[11px] p-2 outline-none text-gray-500 rounded-sm font-semibold cursor-pointer focus:border-[#a77f66] transition-colors">
                            <option>28</option>
                            <option>30</option>
                            <option>32</option>
                        </select>
                        <div class="flex border border-gray-200 bg-white items-center text-xs rounded-sm overflow-hidden">
                            <button class="px-2 py-1.5 text-gray-400 hover:text-black hover:bg-gray-50 transition-colors">-</button>
                            <span class="px-3 py-1.5 border-x border-gray-100 min-w-[30px] font-bold text-gray-700">1</span>
                            <button class="px-2 py-1.5 text-gray-400 hover:text-black hover:bg-gray-50 transition-colors">+</button>
                        </div>
                    </div>
                    
                    <button onclick="addToCart({id: '${item.id}', name: '${item.name.replace(/'/g, "\\'")}', price: '${item.price}', image: '${item.image}'})" 
                        class="inline-block self-center border-b-2 border-[#a77f66] text-[#a77f66] font-bold text-[11px] uppercase tracking-[0.2em] pb-0.5 hover:text-black hover:border-black transition-all duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        updateSummary();
    }

    // Update wishlist summary
    function updateSummary() {
        const totalItemsEl = document.querySelector('.wishlist-summary-count');
        const totalPriceEl = document.querySelector('.wishlist-summary-total');
        const addToCartBtn = document.querySelector('.wishlist-add-all');

        if (totalItemsEl) totalItemsEl.textContent = wishlist.length;
        if (totalPriceEl) {
            const total = wishlist.reduce((sum, item) => {
                const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
                return sum + (isNaN(price) ? 0 : price);
            }, 0);
            totalPriceEl.textContent = `Rs. ${total.toFixed(2)}`;
        }
        if (addToCartBtn) {
            addToCartBtn.disabled = wishlist.length === 0;
        }
    }

    // Add all items to cart from wishlist
    function addAllToCart() {
        if (wishlist.length === 0) return;

        wishlist.forEach(item => {
            const existingItem = cart.find(c => c.id === item.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                cart.push({ ...item, quantity: 1 });
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        showToast(`All ${wishlist.length} items added to cart!`);
    }

    // Render cart items on cart page
    function renderCart() {
        const container = document.getElementById('cart-items');
        if (!container) return;

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="p-12 text-center bg-white border border-gray-100 rounded-lg">
                    <i class="fa-solid fa-bag-shopping text-6xl text-gray-100 mb-4"></i>
                    <p class="text-gray-500 mb-4">Your cart is empty</p>
                    <a href="index.html" class="inline-block bg-[#a77f66] hover:bg-[#222222] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
                        Start Shopping
                    </a>
                </div>
            `;
            updateCartSummary();
            return;
        }

        container.innerHTML = `
            <!-- Desktop Table View -->
            <div class="hidden md:block bg-white border border-gray-100 rounded-lg overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 text-[11px] uppercase tracking-widest text-gray-400">
                        <tr>
                            <th class="px-6 py-4 font-semibold">Product</th>
                            <th class="px-6 py-4 font-semibold">Price</th>
                            <th class="px-6 py-4 font-semibold text-center">Quantity</th>
                            <th class="px-6 py-4 font-semibold text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${cart.map(item => {
            const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            const total = priceNum * (item.quantity || 1);
            return `
                                <tr>
                                    <td class="px-6 py-6">
                                        <div class="flex items-center gap-4">
                                            <img src="${item.image}" class="w-20 h-20 object-contain bg-gray-50 rounded" alt="${item.name}">
                                            <div>
                                                <h3 class="font-bold text-gray-800">${item.name}</h3>
                                                <button onclick="removeFromCart('${item.id}')" class="text-[11px] text-red-500 hover:text-red-700 uppercase tracking-widest mt-2">Remove</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-6 text-sm text-[#a77f66] font-bold">${item.price}</td>
                                    <td class="px-6 py-6">
                                        <div class="flex items-center justify-center">
                                            <div class="flex items-center border border-gray-200 rounded">
                                                <button onclick="updateQuantity('${item.id}', -1)" class="px-3 py-1 text-gray-400 hover:text-gray-800">-</button>
                                                <span class="px-3 py-1 text-sm font-bold border-x border-gray-200">${item.quantity || 1}</span>
                                                <button onclick="updateQuantity('${item.id}', 1)" class="px-3 py-1 text-gray-400 hover:text-gray-800">+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-6 text-right text-sm font-bold text-gray-800">Rs. ${total.toFixed(2)}</td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Mobile Card View -->
            <div class="md:hidden space-y-4">
                ${cart.map(item => {
            const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            const total = priceNum * (item.quantity || 1);
            return `
                        <div class="bg-white border border-gray-100 rounded-lg p-4">
                            <div class="flex gap-4">
                                <img src="${item.image}" class="w-24 h-24 object-contain bg-gray-50 rounded" alt="${item.name}">
                                <div class="flex-1">
                                    <div class="flex justify-between items-start">
                                        <h3 class="font-bold text-gray-800 text-sm">${item.name}</h3>
                                        <button onclick="removeFromCart('${item.id}')" class="text-gray-400 hover:text-red-500">
                                            <i class="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                    <p class="text-sm text-[#a77f66] font-bold mt-1">${item.price}</p>
                                    
                                    <div class="flex items-center justify-between mt-4">
                                        <div class="flex items-center border border-gray-200 rounded">
                                            <button onclick="updateQuantity('${item.id}', -1)" class="px-2 py-1 text-gray-400">-</button>
                                            <span class="px-3 py-1 text-xs font-bold border-x border-gray-200">${item.quantity || 1}</span>
                                            <button onclick="updateQuantity('${item.id}', 1)" class="px-2 py-1 text-gray-400">+</button>
                                        </div>
                                        <p class="text-sm font-bold text-gray-800">Total: Rs. ${total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
        updateCartSummary();
    }

    // Update cart summary
    function updateCartSummary() {
        const subtotalEl = document.querySelector('.cart-summary-subtotal');
        const totalEl = document.querySelector('.cart-summary-total');
        const checkoutBtn = document.querySelector('.cart-checkout-btn');

        if (subtotalEl || totalEl) {
            const total = cart.reduce((sum, item) => {
                const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
                return sum + (price * (item.quantity || 1));
            }, 0);
            const formattedTotal = `Rs. ${total.toFixed(2)}`;
            if (subtotalEl) subtotalEl.textContent = formattedTotal;
            if (totalEl) totalEl.textContent = formattedTotal;
        }

        if (checkoutBtn) {
            checkoutBtn.disabled = cart.length === 0;
        }
    }

    // Update quantity
    function updateQuantity(id, change) {
        const item = cart.find(c => c.id === id);
        if (item) {
            item.quantity = (item.quantity || 1) + change;
            if (item.quantity < 1) {
                removeFromCart(id);
                return;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    }

    // Remove from cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
        showToast('Item removed from cart');
    }

    // Event listener for checkout button
    const checkoutBtn = document.querySelector('.cart-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            }
        });
    }

    // Make functions globally available
    window.addToWishlist = addToWishlist;
    window.removeFromWishlist = removeFromWishlist;
    window.addAllToCart = addAllToCart;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;

    // Update counts on page load
    updateWishlistCount();
    updateCartCount();

    document.querySelectorAll('[data-collection-link]').forEach((card) => {
        card.addEventListener('click', function () {
            const href = this.dataset.collectionLink;
            if (href) {
                window.location.href = href;
            }
        });
    });

    // Render wishlist if on wishlist page
    if (document.getElementById('wishlist-items')) {
        renderWishlist();
    }

    // Render cart if on cart page
    if (document.getElementById('cart-items')) {
        renderCart();
    }

    const collectionPage = document.querySelector('[data-collection-page]');
    if (collectionPage) {
        const params = new URLSearchParams(window.location.search);
        const selectedCategory = params.get('category');
        const titleTargets = document.querySelectorAll('[data-collection-title]');
        const crumbTarget = document.querySelector('[data-collection-crumb]');
        const categoryCheckboxes = Array.from(document.querySelectorAll('[data-filter-category]'));
        const colorCheckboxes = Array.from(document.querySelectorAll('[data-filter-color]'));
        const availabilityCheckboxes = Array.from(document.querySelectorAll('[data-filter-availability]'));
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        const minOutput = document.getElementById('priceMinValue');
        const maxOutput = document.getElementById('priceMaxValue');
        const sortSelect = document.getElementById('collectionSort');
        const grid = document.getElementById('collectionGrid');
        const countLabel = document.getElementById('collectionCount');
        const gridBtn = document.getElementById('gridViewBtn');
        const listBtn = document.getElementById('listViewBtn');
        const items = Array.from(document.querySelectorAll('.collection-item'));

        const categoryMap = {
            '14k-58-3': '14K, 58.3%',
            '18k-75-0': '18K, 75.0%',
            '22k-91-7': '22K, 91.7%',
            '24k-99-9': '24K, 99.9%',
            'bangles': 'Bangles',
            'best-seller': 'Best seller',
            'bracelets': 'Bracelets',
            'brooch': 'Brooch',
            'chain': 'Chain',
            'diamond': 'Diamond',
            'diamonds': 'Diamonds',
            'earring': 'Earring',
            'nose-pins': 'Nose pins',
            'gold': 'Gold',
            'ring': 'Ring'
        };

        function updatePriceOutputs() {
            if (minOutput && maxOutput && priceMin && priceMax) {
                minOutput.textContent = priceMin.value;
                maxOutput.textContent = priceMax.value;
            }
        }

        function selectedValues(nodes) {
            return nodes.filter((node) => node.checked).map((node) => node.value);
        }

        function applyCollectionFilters() {
            if (!grid) return;

            const activeCategories = selectedValues(categoryCheckboxes);
            const activeColors = selectedValues(colorCheckboxes);
            const activeAvailability = selectedValues(availabilityCheckboxes);
            const min = priceMin ? Number(priceMin.value) : 0;
            const max = priceMax ? Number(priceMax.value) : 1000;

            items.forEach((item) => {
                const category = item.dataset.category;
                const color = item.dataset.color;
                const stock = item.dataset.stock;
                const price = Number(item.dataset.price);

                const categoryMatch = activeCategories.length === 0 || activeCategories.includes(category);
                const colorMatch = activeColors.length === 0 || activeColors.includes(color);
                const stockMatch = activeAvailability.length === 0 || activeAvailability.includes(stock);
                const priceMatch = price >= min && price <= max;

                item.classList.toggle('hidden', !(categoryMatch && colorMatch && stockMatch && priceMatch));
            });

            const visibleCount = items.filter((item) => !item.classList.contains('hidden')).length;
            if (countLabel) {
                countLabel.textContent = `${visibleCount} products`;
            }
        }

        function sortCollection() {
            if (!grid || !sortSelect) return;

            const sorted = [...items].sort((a, b) => {
                const sortBy = sortSelect.value;
                const priceA = Number(a.dataset.price);
                const priceB = Number(b.dataset.price);
                const nameA = a.dataset.name;
                const nameB = b.dataset.name;

                if (sortBy === 'price-low') return priceA - priceB;
                if (sortBy === 'price-high') return priceB - priceA;
                if (sortBy === 'name') return nameA.localeCompare(nameB);
                return Number(a.dataset.order) - Number(b.dataset.order);
            });

            sorted.forEach((item) => grid.appendChild(item));
        }

        function setView(mode) {
            if (!grid || !gridBtn || !listBtn) return;
            const isList = mode === 'list';
            grid.classList.toggle('list-view', isList);
            gridBtn.classList.toggle('filter-chip-active', !isList);
            listBtn.classList.toggle('filter-chip-active', isList);
        }

        if (selectedCategory && categoryMap[selectedCategory]) {
            titleTargets.forEach((target) => {
                target.textContent = categoryMap[selectedCategory];
            });
            if (crumbTarget) {
                crumbTarget.textContent = categoryMap[selectedCategory];
            }

            const matchingCategory = categoryCheckboxes.find((checkbox) => checkbox.value === selectedCategory);
            if (matchingCategory) {
                matchingCategory.checked = true;
            }
        }

        [...categoryCheckboxes, ...colorCheckboxes, ...availabilityCheckboxes].forEach((input) => {
            input.addEventListener('change', applyCollectionFilters);
        });

        if (priceMin && priceMax) {
            priceMin.addEventListener('input', function () {
                if (Number(priceMin.value) > Number(priceMax.value)) {
                    priceMax.value = priceMin.value;
                }
                updatePriceOutputs();
                applyCollectionFilters();
            });

            priceMax.addEventListener('input', function () {
                if (Number(priceMax.value) < Number(priceMin.value)) {
                    priceMin.value = priceMax.value;
                }
                updatePriceOutputs();
                applyCollectionFilters();
            });

            updatePriceOutputs();
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                sortCollection();
                applyCollectionFilters();
            });
        }

        if (gridBtn) gridBtn.addEventListener('click', () => setView('grid'));
        if (listBtn) listBtn.addEventListener('click', () => setView('list'));

        sortCollection();
        applyCollectionFilters();
    }

});

function closeModal() {
    const modal = document.getElementById('newsletter-modal');
    const modalContent = modal.querySelector('.relative');

    // Add fade-out classes
    modal.classList.add('opacity-0');
    modal.classList.remove('opacity-100');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    // After transition completes, set pointer-events to none
    setTimeout(() => {
        modal.classList.add('pointer-events-none');

        // Logic for "Don't show again"
        const checkbox = document.getElementById('dont-show');
        if (checkbox) {
            if (checkbox.checked) {
                localStorage.setItem('hideNewsletter', 'true');
            }
        }
    }, 300);
}

function showModal() {
    const modal = document.getElementById('newsletter-modal');
    if (!modal) return;
    const modalContent = modal.querySelector('.relative');

    // Remove hidden classes to show with fade-in
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
}

tailwind.config = {
    theme: {
        extend: {
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        }
    }
}

    document.addEventListener('DOMContentLoaded', function () {
        const product = {
            id: 'prod-drop-gold-earrings',
            name: 'Drop gold earrings',
            image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-7.jpg?v=1742442751&width=1920',
            variants: {
                brown: { label: 'Brown', price: 'Rs. 14.00' },
                gold: { label: 'Gold', price: 'Rs. 15.00' },
                orange: { label: 'Orange', price: 'Rs. 16.00' }
            }
        };

        const qtyInput = document.getElementById('qty');
        const stickyQtyInput = document.getElementById('stickyQty');
        const colorLabel = document.getElementById('selectedColorLabel');
        const priceLabel = document.getElementById('productPrice');
        const stickyVariantPrice = document.getElementById('stickyVariantPrice');
        const stickySelect = document.getElementById('stickyVariantSelect');
        const variantButtons = document.querySelectorAll('.variant-btn');
        const qtyDecButton = document.querySelector('[data-qty-dec]');
        const qtyIncButton = document.querySelector('[data-qty-inc]');
        const stickyDecButton = document.querySelector('[data-sticky-dec]');
        const stickyIncButton = document.querySelector('[data-sticky-inc]');
        const buyBtnMain = document.getElementById('buyBtnMain');
        const stickyAddToCart = document.getElementById('stickyAddToCart');
        const wishlistBtn = document.getElementById('wishlistBtn');

        if (!qtyInput || !stickyQtyInput || !colorLabel || !priceLabel || !stickyVariantPrice || !stickySelect ||
            !qtyDecButton || !qtyIncButton || !stickyDecButton || !stickyIncButton || !buyBtnMain ||
            !stickyAddToCart || !wishlistBtn) {
            return;
        }
        let activeVariant = 'orange';

        function normalizeQty(value) {
            const parsed = parseInt(value, 10);
            return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
        }

        function setQty(value) {
            const qty = normalizeQty(value);
            qtyInput.value = qty;
            stickyQtyInput.value = qty;
        }

        function updateVariant(variantKey) {
            const variant = product.variants[variantKey];
            if (!variant) return;

            activeVariant = variantKey;
            colorLabel.textContent = variant.label;
            priceLabel.textContent = variant.price;
            stickyVariantPrice.textContent = variant.label + ' - ' + variant.price;
            stickySelect.value = variantKey;

            variantButtons.forEach((button) => {
                const active = button.dataset.variant === variantKey;
                button.classList.toggle('border-gray-900', active);
                button.classList.toggle('text-gray-900', active);
                button.classList.toggle('border-gray-300', !active);
                button.classList.toggle('text-gray-500', !active);
            });
        }

        function cartPayload() {
            return {
                id: product.id + '-' + activeVariant,
                name: product.name + ' - ' + product.variants[activeVariant].label,
                price: product.variants[activeVariant].price,
                image: product.image
            };
        }

        qtyDecButton.addEventListener('click', function () {
            setQty(normalizeQty(qtyInput.value) - 1);
        });
        qtyIncButton.addEventListener('click', function () {
            setQty(normalizeQty(qtyInput.value) + 1);
        });
        stickyDecButton.addEventListener('click', function () {
            setQty(normalizeQty(stickyQtyInput.value) - 1);
        });
        stickyIncButton.addEventListener('click', function () {
            setQty(normalizeQty(stickyQtyInput.value) + 1);
        });

        qtyInput.addEventListener('input', function () {
            setQty(this.value);
        });
        stickyQtyInput.addEventListener('input', function () {
            setQty(this.value);
        });

        variantButtons.forEach((button) => {
            button.addEventListener('click', function () {
                updateVariant(this.dataset.variant);
            });
        });

        stickySelect.addEventListener('change', function () {
            updateVariant(this.value);
        });

        buyBtnMain.addEventListener('click', function () {
            window.addToCart(cartPayload(), normalizeQty(qtyInput.value));
        });

        stickyAddToCart.addEventListener('click', function () {
            window.addToCart(cartPayload(), normalizeQty(stickyQtyInput.value));
        });

        wishlistBtn.addEventListener('click', function () {
            window.addToWishlist(cartPayload());
        });

        setQty(1);
        updateVariant(activeVariant);
    });
