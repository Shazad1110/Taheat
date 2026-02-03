// Get all elements
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
const cardWrapper = document.querySelector('.card-wrapper');

let currentSlide = 0;
let startX = 0;
let isDragging = false;

// Initialize
showSlide(currentSlide);

// Function to show specific slide
function showSlide(index) {
    // Remove all active and prev classes
    cards.forEach(card => {
        card.classList.remove('active', 'prev');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Add active class to current card
    cards[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Add prev class to previous cards
    for (let i = 0; i < index; i++) {
        cards[i].classList.add('prev');
    }
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % cards.length;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + cards.length) % cards.length;
    showSlide(currentSlide);
}

// Touch events for mobile swipe
cardWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

cardWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    // Optional: Add visual feedback during swipe
    // You can add transform to the active card here for smoother feel
});

cardWrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    // Swipe threshold: 50 pixels
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            // Swiped right to left - go to next slide
            nextSlide();
        } else {
            // Swiped left to right - go to previous slide
            prevSlide();
        }
    }
    
    isDragging = false;
});

// Mouse events for desktop
cardWrapper.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    cardWrapper.style.cursor = 'grabbing';
});

cardWrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

cardWrapper.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    const endX = e.clientX;
    const diff = startX - endX;
    
    // Swipe threshold: 50 pixels
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            // Swiped right to left - go to next slide
            nextSlide();
        } else {
            // Swiped left to right - go to previous slide
            prevSlide();
        }
    }
    
    isDragging = false;
    cardWrapper.style.cursor = 'grab';
});

cardWrapper.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        cardWrapper.style.cursor = 'grab';
    }
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (e.key === 'ArrowRight') {
            prevSlide(); // RTL: Right arrow goes to previous
        } else {
            nextSlide(); // RTL: Left arrow goes to next
        }
    }
});

// Prevent text selection during drag
cardWrapper.style.userSelect = 'none';
cardWrapper.style.cursor = 'grab';