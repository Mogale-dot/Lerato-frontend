document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const socials = document.querySelector('.socials');
    const logo = document.querySelector('.logo');
    const stickyBg = document.createElement('div');
    stickyBg.className = 'sticky-background';
    header.appendChild(stickyBg);
    let lastScroll = 0;
    const headerHeight = header.offsetHeight;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            // Scrolling down
            mobileBtn.classList.add('sticky');
            socials.classList.add('sticky');
            stickyBg.classList.add('active');
        } else {
            // Scrolling up or at top
            if (currentScroll <= headerHeight) {
                mobileBtn.classList.remove('sticky');
                socials.classList.remove('sticky');
                stickyBg.classList.remove('active');
            }
        }
        
        lastScroll = currentScroll;
    });
// ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.createElement('div');
    closeBtn.className = 'menu-close-btn';
    mobileMenu.prepend(closeBtn); // Add close button to menu

    function toggleMenu() {
        mobileBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Open/close menu with hamburger button
    mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering document click
        toggleMenu();
    });

    // Close with X button
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !e.target.closest('.mobile-menu') && 
            !e.target.closest('.mobile-menu-btn')) {
            toggleMenu();
        }
    });

    // Close when clicking menu links
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});
document.addEventListener('DOMContentLoaded', function() {
  const reviewBtn = document.querySelector('.review-more-btn');
  const moreReviews = document.querySelectorAll('.review-container .review:nth-child(n+2)');
  let reviewsVisible = false;
  
  // Initially hide extra reviews
  moreReviews.forEach(review => {
    review.style.display = 'none';
  });
  
  // Toggle reviews on button click
  if (reviewBtn) {
    reviewBtn.addEventListener('click', function() {
      reviewsVisible = !reviewsVisible;
      
      moreReviews.forEach(review => {
        review.style.display = reviewsVisible ? 'block' : 'none';
      });
      
      this.textContent = reviewsVisible ? 'Show Less' : 'View More Reviews';
    });
  }
  
  // Smooth hover effects for cards
  const cards = document.querySelectorAll('.flip-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

       
        document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;
  
  // Initialize slideshow
  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  
  // Go to next slide
  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }
  
  // Go to specific slide
  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  // Dot click event
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      goToSlide(index);
      startSlideShow();
    });
  });
  
  // Start the slideshow
  startSlideShow();
  
  // Pause on hover (optional)
  const container = document.querySelector('.slideshow-container');
  container.addEventListener('mouseenter', () => clearInterval(slideInterval));
  container.addEventListener('mouseleave', startSlideShow);
});  

  document.addEventListener("DOMContentLoaded", function () { 
    function showLoader() {
      document.getElementById("loader").classList.add("show");
      }
    function hideLoader() {
    document.getElementById("loader").classList.remove("show");
    }
    document.getElementById("subscribeForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        name:document.getElementById("name").value,
        
        email:document.getElementById("email").value,
        
      };
      showLoader();
      fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(result => { 
          hideLoader();
          showCustomAlert(result.message || result.error);
          document.getElementById("subscribeForm").reset();
        })
        .catch(error => console.error("Error:", error));
    });
  });

  function showCustomAlert(message) {
    let alertBox = document.getElementById("custom-alert");
    let messageBox = document.getElementById("alert-message");

    messageBox.innerText = message;
    alertBox.classList.add("show");

    
   setTimeout(() => {
     closeAlert();
   }, 9000);
  }

  function closeAlert() {
    document.getElementById("custom-alert").classList.remove("show");
  }

