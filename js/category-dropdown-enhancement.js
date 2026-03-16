// Category Dropdown Enhancement - Pure Hover Dropdown, No Scroll
document.addEventListener('DOMContentLoaded', function() {
    const categoryNav = document.querySelector('.shop-category-nav');
    const categoryItems = document.querySelectorAll('.category-item');
    
    if (!categoryNav || !categoryItems.length) return;
    
    // Ensure no horizontal scroll
    function preventHorizontalScroll() {
        const navItems = document.querySelector('.category-nav-items');
        if (navItems) {
            navItems.style.overflowX = 'visible';
            navItems.style.overflowY = 'visible';
        }
        
        const container = categoryNav.querySelector('.container');
        if (container) {
            container.style.overflowX = 'visible';
            container.style.overflowY = 'visible';
        }
    }
    
    // Enhanced dropdown positioning
    function positionDropdowns() {
        categoryItems.forEach((item, index) => {
            const dropdown = item.querySelector('.category-dropdown');
            if (!dropdown) return;
            
            // For items on the right side, align dropdown to the right
            if (index >= Math.floor(categoryItems.length / 2)) {
                dropdown.style.left = 'auto';
                dropdown.style.right = '0';
                dropdown.style.transform = 'translateX(0)';
            } else {
                dropdown.style.left = '50%';
                dropdown.style.right = 'auto';
                dropdown.style.transform = 'translateX(-50%)';
            }
        });
    }
    
    // Smooth hover effects
    function enhanceHoverEffects() {
        categoryItems.forEach(item => {
            const link = item.querySelector('.category-link');
            const dropdown = item.querySelector('.category-dropdown');
            
            if (!link || !dropdown) return;
            
            let hoverTimeout;
            
            // Mouse enter
            item.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                dropdown.style.display = 'block';
                
                // Small delay for smooth animation
                setTimeout(() => {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.transform = dropdown.style.transform.replace('translateY(-10px)', 'translateY(0)');
                }, 10);
            });
            
            // Mouse leave
            item.addEventListener('mouseleave', () => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = dropdown.style.transform.replace('translateY(0)', 'translateY(-10px)');
                
                // Hide after animation completes
                hoverTimeout = setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 300);
            });
            
            // Prevent dropdown from closing when hovering over it
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = dropdown.style.transform.replace('translateY(0)', 'translateY(-10px)');
                
                hoverTimeout = setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 300);
            });
        });
    }
    
    // Handle window resize
    function handleResize() {
        positionDropdowns();
        preventHorizontalScroll();
    }
    
    // Initialize
    preventHorizontalScroll();
    positionDropdowns();
    enhanceHoverEffects();
    
    // Handle resize
    window.addEventListener('resize', handleResize);
    
    // Ensure dropdowns are hidden initially
    categoryItems.forEach(item => {
        const dropdown = item.querySelector('.category-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        }
    });
    
    console.log('Category dropdown enhancement initialized');
});