// Sample data for hotels
const hotels = [
    {
        id: 1,
        name: "Spice Garden",
        address: "Mirpur 10, Dhaka",
        contact: "+880 1234 567890",
        types: ["biriyani", "rice"],
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        delivery: true,
        priceRange: "$$",
        openingHours: "9:00 AM - 11:00 PM"
    },
    {
        id: 2,
        name: "Burger Hub",
        address: "Savar, Dhaka",
        contact: "+880 1234 567891",
        types: ["burger", "pizza"],
        rating: 4.2,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        delivery: true,
        priceRange: "$$",
        openingHours: "10:00 AM - 12:00 AM"
    },
    {
        id: 3,
        name: "Pizza Palace",
        address: "Ashulia, Dhaka",
        contact: "+880 1234 567892",
        types: ["pizza", "dessert"],
        rating: 4.7,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        delivery: true,
        priceRange: "$$$",
        openingHours: "11:00 AM - 11:00 PM"
    },
    {
        id: 4,
        name: "Royal Biriyani",
        address: "Mirpur 1, Dhaka",
        contact: "+880 1234 567893",
        types: ["biriyani", "rice"],
        rating: 4.8,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        delivery: false,
        priceRange: "$$",
        openingHours: "8:00 AM - 10:00 PM"
    },
    {
        id: 5,
        name: "Sweet Delight",
        address: "Savar, Dhaka",
        contact: "+880 1234 567894",
        types: ["dessert"],
        rating: 4.3,
        reviews: 87,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        delivery: true,
        priceRange: "$",
        openingHours: "12:00 PM - 10:00 PM"
    },
    {
        id: 6,
        name: "Rice Paradise",
        address: "Ashulia, Dhaka",
        contact: "+880 1234 567895",
        types: ["rice"],
        rating: 4.4,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        delivery: true,
        priceRange: "$$",
        openingHours: "9:00 AM - 9:00 PM"
    }
];

// Sample data for reviews
const reviews = [
    {
        id: 1,
        userId: 1,
        userName: "Rahim Khan",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        hotelId: 1,
        hotelName: "Spice Garden",
        rating: 5,
        comment: "The biriyani here is absolutely amazing! The flavors are rich and authentic. Highly recommended for biriyani lovers!",
        date: "2023-05-15",
        helpful: 12
    },
    {
        id: 2,
        userId: 2,
        userName: "Fatima Begum",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        hotelId: 2,
        hotelName: "Burger Hub",
        rating: 4,
        comment: "Great burgers and friendly service. The cheese burst burger is a must-try. Will visit again soon!",
        date: "2023-05-12",
        helpful: 8
    },
    {
        id: 3,
        userId: 3,
        userName: "Karim Ahmed",
        userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
        hotelId: 3,
        hotelName: "Pizza Palace",
        rating: 5,
        comment: "Best pizza in town! The crust is perfectly crispy and the toppings are always fresh. Great ambiance too!",
        date: "2023-05-10",
        helpful: 15
    },
    {
        id: 4,
        userId: 4,
        userName: "Sadia Rahman",
        userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
        hotelId: 4,
        hotelName: "Royal Biriyani",
        rating: 5,
        comment: "Authentic biriyani with rich flavors. The chicken is always tender and the rice is perfectly cooked. Loved it!",
        date: "2023-05-08",
        helpful: 20
    }
];

// Current user state
let currentUser = null;

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
const hotelModal = new bootstrap.Modal(document.getElementById('hotelModal'));
const reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const reviewForm = document.getElementById('reviewForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const hotelList = document.getElementById('hotelList');
const allHotelList = document.getElementById('allHotelList');
const reviewList = document.getElementById('reviewList');
const foodCategories = document.querySelectorAll('.food-category');
const areaSearch = document.getElementById('areaSearch');
const searchBtn = document.getElementById('searchBtn');
const navLinks = document.querySelectorAll('.nav-link[data-tab]');
const tabContents = document.querySelectorAll('.tab-content');
const addReviewFAB = document.getElementById('addReviewFAB');

// Initialize the application
function init() {
    renderHotels(hotels, hotelList);
    renderHotels(hotels, allHotelList);
    renderReviews(reviews);
    populateHotelSelect();
    setupEventListeners();
    addLoadingAnimations();
}

// Set up event listeners
function setupEventListeners() {
    // Navigation tabs
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = e.target.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Login/Register buttons
    loginBtn.addEventListener('click', () => loginModal.show());
    registerBtn.addEventListener('click', () => registerModal.show());
    
    // Show register form from login modal
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.hide();
        registerModal.show();
    });
    
    // Show login form from register modal
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.hide();
        loginModal.show();
    });

    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    reviewForm.addEventListener('submit', handleReviewSubmit);

    // Food category filters
    foodCategories.forEach(category => {
        category.addEventListener('click', (e) => {
            const type = e.currentTarget.getAttribute('data-type');
            filterHotels(type);
            
            // Update active category
            foodCategories.forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // Area search
    searchBtn.addEventListener('click', handleAreaSearch);
    areaSearch.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            handleAreaSearch();
        }
    });

    // Rating stars in review form
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = parseInt(e.target.getAttribute('data-rating'));
            setRating(stars, rating);
            document.getElementById('ratingValue').value = rating;
        });
        
        // Add hover effect for stars
        star.addEventListener('mouseover', (e) => {
            const rating = parseInt(e.target.getAttribute('data-rating'));
            highlightStars(stars, rating);
        });
        
        star.addEventListener('mouseout', () => {
            const currentRating = parseInt(document.getElementById('ratingValue').value);
            setRating(stars, currentRating);
        });
    });

    // Floating action button
    addReviewFAB.addEventListener('click', () => {
        if (currentUser) {
            reviewModal.show();
        } else {
            loginModal.show();
        }
    });

    // Add scroll animations
    window.addEventListener('scroll', handleScroll);
}

// Switch between tabs
function switchTab(tab) {
    // Hide all tab contents
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show selected tab content
    const targetTab = document.getElementById(`${tab}-tab`);
    targetTab.classList.remove('hidden');
    targetTab.classList.add('fade-in');
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active-tab');
        if (link.getAttribute('data-tab') === tab) {
            link.classList.add('active-tab');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render hotel cards
function renderHotels(hotels, container) {
    container.innerHTML = '';
    
    if (hotels.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-utensils fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No restaurants found</h4>
                <p class="text-muted">Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    hotels.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-4 slide-up';
        card.innerHTML = `
            <div class="card hotel-card h-100">
                <div class="position-relative">
                    <img src="${hotel.image}" class="card-img-top" alt="${hotel.name}">
                    <div class="position-absolute top-0 end-0 m-3">
                        <span class="badge bg-success bg-opacity-90 px-3 py-2">
                            <i class="fas fa-star me-1"></i>${hotel.rating}
                        </span>
                    </div>
                    ${hotel.delivery ? 
                        '<div class="position-absolute top-0 start-0 m-3"><span class="badge bg-primary px-3 py-2"><i class="fas fa-motorcycle me-1"></i>Delivery</span></div>' : 
                        ''
                    }
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title mb-0">${hotel.name}</h5>
                        <span class="badge bg-warning text-dark">${hotel.priceRange}</span>
                    </div>
                    <p class="card-text text-muted small">
                        <i class="fas fa-map-marker-alt me-1"></i> ${hotel.address}
                    </p>
                    <div class="mb-3">
                        ${hotel.types.map(type => `<span class="food-type-badge">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`).join('')}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="rating-stars small">
                            ${renderStars(hotel.rating)}
                            <span class="text-muted ms-1">(${hotel.reviews})</span>
                        </div>
                        <button class="btn btn-sm btn-outline-primary view-hotel" data-id="${hotel.id}">
                            <i class="fas fa-eye me-1"></i> View
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Add event listeners to view hotel buttons
    document.querySelectorAll('.view-hotel').forEach(button => {
        button.addEventListener('click', (e) => {
            const hotelId = parseInt(e.target.closest('button').getAttribute('data-id'));
            showHotelDetails(hotelId);
        });
    });
}

// Render star ratings
function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Highlight stars on hover
function highlightStars(stars, rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Set rating stars
function setRating(stars, rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Render reviews
function renderReviews(reviews) {
    reviewList.innerHTML = '';
    
    if (reviews.length === 0) {
        reviewList.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-comment-slash fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No reviews yet</h4>
                <p class="text-muted">Be the first to write a review!</p>
                <button class="btn btn-primary mt-2" onclick="reviewModal.show()">
                    <i class="fas fa-pen me-1"></i> Write Review
                </button>
            </div>
        `;
        return;
    }
    
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'col-12 mb-4 slide-up';
        reviewCard.innerHTML = `
            <div class="card review-card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${review.userAvatar}" class="user-avatar me-3" alt="${review.userName}">
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${review.userName}</h6>
                            <small class="text-muted">Reviewed ${review.hotelName}</small>
                        </div>
                        <div class="text-end">
                            <div class="rating-stars mb-1">
                                ${renderStars(review.rating)}
                            </div>
                            <small class="text-muted">${new Date(review.date).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <p class="card-text mb-3">${review.comment}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-sm btn-outline-secondary helpful-btn" data-review-id="${review.id}">
                            <i class="fas fa-thumbs-up me-1"></i> Helpful (${review.helpful})
                        </button>
                        <small class="text-muted">Was this review helpful?</small>
                    </div>
                </div>
            </div>
        `;
        reviewList.appendChild(reviewCard);
    });
    
    // Add event listeners to helpful buttons
    document.querySelectorAll('.helpful-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const reviewId = parseInt(e.target.closest('button').getAttribute('data-review-id'));
            markReviewHelpful(reviewId, e.target.closest('button'));
        });
    });
}

// Mark review as helpful
function markReviewHelpful(reviewId, button) {
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
        review.helpful += 1;
        button.innerHTML = `<i class="fas fa-thumbs-up me-1"></i> Helpful (${review.helpful})`;
        button.classList.remove('btn-outline-secondary');
        button.classList.add('btn-success');
        button.disabled = true;
        
        // Show success message
        showToast('Thanks for your feedback!', 'success');
    }
}

// Filter hotels by food type
function filterHotels(type) {
    let filteredHotels;
    
    if (type === 'all') {
        filteredHotels = hotels;
    } else {
        filteredHotels = hotels.filter(hotel => 
            hotel.types.includes(type)
        );
    }
    
    // Add loading effect
    hotelList.innerHTML = '<div class="col-12 text-center py-5"><div class="loading-spinner mx-auto"></div></div>';
    
    setTimeout(() => {
        renderHotels(filteredHotels, hotelList);
    }, 500);
}

// Handle area search
function handleAreaSearch() {
    const area = areaSearch.value.trim().toLowerCase();
    
    if (area === '') {
        renderHotels(hotels, hotelList);
        return;
    }
    
    const filteredHotels = hotels.filter(hotel => 
        hotel.address.toLowerCase().includes(area)
    );
    
    // Add loading effect
    hotelList.innerHTML = '<div class="col-12 text-center py-5"><div class="loading-spinner mx-auto"></div></div>';
    
    setTimeout(() => {
        renderHotels(filteredHotels, hotelList);
        
        // Switch to hotels tab if not already there
        switchTab('hotels');
        
        // Show search results count
        if (filteredHotels.length > 0) {
            showToast(`Found ${filteredHotels.length} restaurants in ${area}`, 'info');
        } else {
            showToast('No restaurants found in this area', 'warning');
        }
    }, 500);
}

// Show hotel details in modal
function showHotelDetails(hotelId) {
    const hotel = hotels.find(h => h.id === hotelId);
    
    if (!hotel) return;
    
    document.getElementById('hotelModalTitle').textContent = hotel.name;
    
    const modalBody = document.getElementById('hotelModalBody');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${hotel.image}" class="img-fluid rounded-3 shadow" alt="${hotel.name}">
            </div>
            <div class="col-md-6">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h4 class="mb-0">${hotel.name}</h4>
                    <span class="badge bg-warning text-dark fs-6">${hotel.priceRange}</span>
                </div>
                
                <div class="mb-3">
                    <div class="rating-stars fs-5 mb-2">
                        ${renderStars(hotel.rating)}
                        <span class="text-muted ms-2">${hotel.rating} (${hotel.reviews} reviews)</span>
                    </div>
                </div>
                
                <div class="mb-4">
                    <p class="mb-2"><strong><i class="fas fa-map-marker-alt me-2 text-primary"></i>Address:</strong> ${hotel.address}</p>
                    <p class="mb-2"><strong><i class="fas fa-phone me-2 text-primary"></i>Contact:</strong> ${hotel.contact}</p>
                    <p class="mb-2"><strong><i class="fas fa-clock me-2 text-primary"></i>Opening Hours:</strong> ${hotel.openingHours}</p>
                    <p class="mb-0"><strong><i class="fas fa-utensils me-2 text-primary"></i>Food Types:</strong> ${hotel.types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</p>
                </div>
                
                <div class="d-flex gap-2 mb-4">
                    ${hotel.delivery ? 
                        '<span class="badge bg-success px-3 py-2"><i class="fas fa-motorcycle me-1"></i>Delivery Available</span>' : 
                        '<span class="badge bg-secondary px-3 py-2"><i class="fas fa-store me-1"></i>Dine-in Only</span>'
                    }
                </div>
                
                ${currentUser ? 
                    `<button class="btn btn-primary me-2" id="addReviewBtn" data-hotel-id="${hotel.id}">
                        <i class="fas fa-pen me-1"></i> Write a Review
                    </button>` : 
                    `<p class="text-muted mb-3"><i class="fas fa-info-circle me-1"></i>Please login to write a review</p>`
                }
                <button class="btn btn-outline-primary" onclick="shareRestaurant('${hotel.name}', '${hotel.address}')">
                    <i class="fas fa-share-alt me-1"></i> Share
                </button>
            </div>
        </div>
        <div class="mt-4">
            <h5 class="mb-3"><i class="fas fa-comments me-2 text-primary"></i>Customer Reviews</h5>
            <div id="hotelReviews">
                ${renderHotelReviews(hotel.id)}
            </div>
        </div>
    `;
    
    hotelModal.show();
    
    // Add event listener to write review button if user is logged in
    if (currentUser) {
        document.getElementById('addReviewBtn').addEventListener('click', () => {
            hotelModal.hide();
            document.getElementById('reviewHotel').value = hotel.id;
            reviewModal.show();
        });
    }
}

// Render reviews for a specific hotel
function renderHotelReviews(hotelId) {
    const hotelReviews = reviews.filter(review => review.hotelId === hotelId);
    
    if (hotelReviews.length === 0) {
        return `
            <div class="text-center py-4">
                <i class="fas fa-comment-slash fa-2x text-muted mb-3"></i>
                <p class="text-muted mb-0">No reviews yet. Be the first to write one!</p>
            </div>
        `;
    }
    
    return hotelReviews.map(review => `
        <div class="card mb-3 border-0 bg-light">
            <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                    <img src="${review.userAvatar}" class="user-avatar me-3" style="width: 40px; height: 40px;" alt="${review.userName}">
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${review.userName}</h6>
                        <div class="rating-stars small">
                            ${renderStars(review.rating)}
                        </div>
                    </div>
                    <small class="text-muted">${new Date(review.date).toLocaleDateString()}</small>
                </div>
                <p class="card-text mb-2">${review.comment}</p>
                <button class="btn btn-sm btn-outline-secondary helpful-btn" data-review-id="${review.id}">
                    <i class="fas fa-thumbs-up me-1"></i> Helpful (${review.helpful})
                </button>
            </div>
        </div>
    `).join('');
}

// Share restaurant function
function shareRestaurant(name, address) {
    if (navigator.share) {
        navigator.share({
            title: name,
            text: `Check out ${name} at ${address} on Daffodil Food Connect!`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `${window.location.origin}${window.location.pathname}?restaurant=${encodeURIComponent(name)}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast('Restaurant link copied to clipboard!', 'success');
        });
    }
}

// Populate hotel select in review form
function populateHotelSelect() {
    const select = document.getElementById('reviewHotel');
    select.innerHTML = '<option value="">Select a restaurant</option>';
    
    hotels.forEach(hotel => {
        const option = document.createElement('option');
        option.value = hotel.id;
        option.textContent = hotel.name;
        select.appendChild(option);
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (email && password) {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading-spinner mx-auto" style="width: 20px; height: 20px;"></div>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Simulate successful login
            currentUser = {
                id: 1,
                name: 'John Doe',
                email: email,
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
            };
            
            // Update UI for logged in user
            loginBtn.innerHTML = `<img src="${currentUser.avatar}" class="user-avatar me-2" style="width: 30px; height: 30px;"> ${currentUser.name}`;
            registerBtn.textContent = 'Logout';
            registerBtn.classList.remove('btn-primary');
            registerBtn.classList.add('btn-outline-light');
            
            // Add event listener for logout
            registerBtn.removeEventListener('click', () => registerModal.show());
            registerBtn.addEventListener('click', handleLogout);
            
            // Close modal
            loginModal.hide();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showToast('Login successful! Welcome back!', 'success');
        }, 1500);
    } else {
        showToast('Please fill in all fields', 'error');
    }
}

// Handle register
function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Simple validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading-spinner mx-auto" style="width: 20px; height: 20px;"></div>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Simulate successful registration
        currentUser = {
            id: Math.floor(Math.random() * 1000) + 100,
            name: `${firstName} ${lastName}`,
            email: email,
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50) + 1}.jpg`
        };
        
        // Update UI for logged in user
        loginBtn.innerHTML = `<img src="${currentUser.avatar}" class="user-avatar me-2" style="width: 30px; height: 30px;"> ${firstName}`;
        registerBtn.textContent = 'Logout';
        registerBtn.classList.remove('btn-primary');
        registerBtn.classList.add('btn-outline-light');
        
        // Add event listener for logout
        registerBtn.removeEventListener('click', () => registerModal.show());
        registerBtn.addEventListener('click', handleLogout);
        
        // Close modal
        registerModal.hide();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showToast('Registration successful! Welcome to Daffodil Food Connect!', 'success');
    }, 1500);
}

// Handle logout
function handleLogout() {
    currentUser = null;
    
    // Reset UI
    loginBtn.textContent = 'Login';
    registerBtn.textContent = 'Sign Up';
    registerBtn.classList.remove('btn-outline-light');
    registerBtn.classList.add('btn-primary');
    
    // Reset event listeners
    registerBtn.removeEventListener('click', handleLogout);
    registerBtn.addEventListener('click', () => registerModal.show());
    
    showToast('You have been logged out successfully', 'info');
}

// Handle review submission
function handleReviewSubmit(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showToast('Please login to submit a review', 'error');
        return;
    }
    
    const hotelId = parseInt(document.getElementById('reviewHotel').value);
    const rating = parseInt(document.getElementById('ratingValue').value);
    const comment = document.getElementById('reviewComment').value;
    
    if (!hotelId || !rating || !comment) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (rating === 0) {
        showToast('Please select a rating', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading-spinner mx-auto" style="width: 20px; height: 20px;"></div>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Create new review
        const newReview = {
            id: reviews.length + 1,
            userId: currentUser.id,
            userName: currentUser.name,
            userAvatar: currentUser.avatar,
            hotelId: hotelId,
            hotelName: hotels.find(h => h.id === hotelId).name,
            rating: rating,
            comment: comment,
            date: new Date().toISOString().split('T')[0],
            helpful: 0
        };
        
        // Add to reviews array
        reviews.unshift(newReview);
        
        // Update hotel review count and rating (simplified)
        const hotel = hotels.find(h => h.id === hotelId);
        hotel.reviews += 1;
        hotel.rating = ((hotel.rating * (hotel.reviews - 1)) + rating) / hotel.reviews;
        
        // Update UI
        renderReviews(reviews);
        renderHotels(hotels, hotelList);
        renderHotels(hotels, allHotelList);
        
        // Close modal and reset form
        reviewModal.hide();
        reviewForm.reset();
        document.getElementById('ratingValue').value = 0;
        
        // Reset stars
        const stars = document.querySelectorAll('.rating-stars i');
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showToast('Review submitted successfully! Thank you for your feedback!', 'success');
    }, 1500);
}

// Show toast notification
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.custom-toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `custom-toast alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        border: none;
        border-radius: 10px;
    `;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 type === 'warning' ? 'exclamation-triangle' : 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

// Add loading animations to elements
function addLoadingAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .section-title, .feature-icon').forEach(el => {
        observer.observe(el);
    });
}

// Handle scroll events for navbar
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, rgba(211, 84, 0, 0.95), rgba(230, 126, 34, 0.95))';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for global access (for onclick handlers in HTML)
window.shareRestaurant = shareRestaurant;
