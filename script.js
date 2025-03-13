document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoConstrainedView({
                behavior: 'smooth'
            });
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    // Set initial position
    updateCarousel();

    // Handle next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    // Handle previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    function updateCarousel() {
        carousel.scrollTo({
            left: carouselItems[currentIndex].offsetLeft,
            behavior: 'smooth'
        });
    }

    // Auto play carousel
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000); // Change slide every 5 seconds

    // Countdown timer
    const countdownDate = new Date("April 12, 2026 00:00:00").getTime(); // Set your anniversary date
    
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results
        document.getElementById("days").textContent = formatTime(days);
        document.getElementById("hours").textContent = formatTime(hours);
        document.getElementById("minutes").textContent = formatTime(minutes);
        document.getElementById("seconds").textContent = formatTime(seconds);
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
        }
    }, 1000);
    
    // Format time to always display two digits
    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }

    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Form submission
    const commentForm = document.querySelector('.comment-form');
    const commentsContainer = document.querySelector('.comments-container');
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');
        
        if (nameInput.value && messageInput.value) {
            // Create a new comment
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <div class="comment-header">
                    <span class="comment-name">${nameInput.value}</span>
                    <span class="comment-date">${getCurrentDate()}</span>
                </div>
                <p>${messageInput.value}</p>
            `;
            
            // Add the new comment to the container
            commentsContainer.prepend(newComment);
            
            // Reset form
            nameInput.value = '';
            messageInput.value = '';
            
            // Animate new comment
            newComment.style.opacity = 0;
            newComment.style.transform = 'translateY(20px)';
            setTimeout(() => {
                newComment.style.opacity = 1;
                newComment.style.transform = 'translateY(0)';
                newComment.style.transition = 'all 0.5s ease';
            }, 10);
        }
    });
    
    // Get current date formatted
    function getCurrentDate() {
        const date = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
});