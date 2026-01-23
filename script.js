// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Add scroll animation on page load
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.info-card, .amenity-item, .room-card, .trust-item');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
});

// Lightbox functionality
(function() {
    // Create lightbox HTML structure
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <span class="lightbox-close" id="lightboxClose">&times;</span>
            <div class="lightbox-nav prev" id="lightboxPrev">&#8249;</div>
            <div class="lightbox-nav next" id="lightboxNext">&#8250;</div>
            <div class="lightbox-content">
                <img class="lightbox-image" id="lightboxImage" src="" alt="">
            </div>
        </div>
    `;
    
    // Insert lightbox into body
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Get all gallery images
    function getAllGalleryImages() {
        return Array.from(document.querySelectorAll('.gallery-image, .room-image, .content-image img'));
    }
    
    // Open lightbox
    function openLightbox(index) {
        currentImages = getAllGalleryImages();
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Update lightbox image
    function updateLightboxImage() {
        if (currentImages.length === 0) return;
        
        const img = currentImages[currentIndex];
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || 'Gallery Image';
        
        // Show/hide navigation arrows
        lightboxPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
        lightboxNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
    }
    
    // Navigate to previous image
    function prevImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }
    
    // Navigate to next image
    function nextImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }
    
    // Add click event to all gallery images
    function initLightbox() {
        const images = getAllGalleryImages();
        images.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        });
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Initialize lightbox when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
    
    // Re-initialize when images are loaded (for lazy loading)
    window.addEventListener('load', () => {
        setTimeout(initLightbox, 100);
    });
})();

