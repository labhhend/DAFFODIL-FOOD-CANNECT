// DSC Food Directory JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const tableRows = document.querySelectorAll('.food-table tbody tr');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Add interactive effects to table rows
    tableRows.forEach(row => {
        // Hover effects
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Click effect to show more details
        row.addEventListener('click', function() {
            const placeName = this.querySelector('.place-name').textContent;
            const placeType = this.querySelector('.type-badge').textContent;
            const location = this.querySelector('.location').textContent;
            
            showFoodPlaceDetails(placeName, placeType, location);
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.getAttribute('data-filter');
            
            // Filter table rows
            filterFoodPlaces(filterType);
        });
    });
    
    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show all rows
            tableRows.forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        let foundResults = false;
        
        tableRows.forEach(row => {
            const placeName = row.querySelector('.place-name').textContent.toLowerCase();
            const placeType = row.querySelector('.type-badge').textContent.toLowerCase();
            const location = row.querySelector('.location').textContent.toLowerCase();
            
            if (placeName.includes(searchTerm) || placeType.includes(searchTerm) || location.includes(searchTerm)) {
                row.style.display = '';
                foundResults = true;
                
                // Add highlight effect
                row.style.backgroundColor = '#f0f8ff';
                setTimeout(() => {
                    row.style.backgroundColor = '';
                }, 1000);
            } else {
                row.style.display = 'none';
            }
        });
        
        // Show message if no results found
        if (!foundResults) {
            showNotification('No food places found for: ' + searchTerm, 'warning');
        }
    }
    
    // Function to filter food places by type
    function filterFoodPlaces(filterType) {
        let foundResults = false;
        
        tableRows.forEach(row => {
            if (filterType === 'all') {
                row.style.display = '';
                foundResults = true;
                return;
            }
            
            const badge = row.querySelector('.type-badge');
            const badgeType = badge.className.includes(filterType);
            
            if (badgeType) {
                row.style.display = '';
                foundResults = true;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Show message if no results found for a specific filter
        if (!foundResults && filterType !== 'all') {
            showNotification('No ' + filterType + ' places found', 'info');
        }
    }
    
    // Function to show food place details
    function showFoodPlaceDetails(name, type, location) {
        // In a real application, this would show a modal with more details
        // For now, we'll use a simple alert
        const message = `
            🍽️ ${name}
            Type: ${type}
            Location: ${location}
            
            Opening Hours: 8:00 AM - 10:00 PM
            Contact: +880 XXXX-XXXXXX
            Rating: ⭐⭐⭐⭐☆
        `;
        
        showNotification(message, 'info');
    }
    
    // Function to show notifications
    function showNotification(message, type) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'warning' ? '#fff3cd' : '#d1ecf1'};
            color: ${type === 'warning' ? '#856404' : '#0c5460'};
            border: 1px solid ${type === 'warning' ? '#ffeaa7' : '#bee5eb'};
            border-radius: 10px;
            padding: 15px;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            float: right;
            margin-left: 10px;
        `;
        
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Add to document
        document.body.appendChild(notification);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize with all food places visible
    filterFoodPlaces('all');
});