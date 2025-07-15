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
    document.addEventListener("DOMContentLoaded", function(){
      // Loader functions
      function showLoader() {
        document.getElementById("loader").classList.add("show");
      }
      
      function hideLoader() {
        document.getElementById("loader").classList.remove("show");
      }  
      
      // --- Sign In Form Submission ---
      document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        showLoader();
        fetch("https://lerato-r5fw.onrender.com/parents/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        })
          .then(response => response.json())
          .then(data => {
            hideLoader();
            if(data.token){
              localStorage.setItem("token", data.token);
              const payload = JSON.parse(atob(data.token.split('.')[1]));
              if(payload.role === "admin"){
                window.location.href = "admin-dashboard.html";
              } else {
                showAlert("Only admin access is allowed");
              }
            } else {
              showAlert(data.error || "Login failed");
            }
          })
          .catch(err => {
            hideLoader();
            console.error("Login Error:", err);
            showAlert("An error occurred during login");
          });
      }); 

      
    }); 
   
    function showAlert(message) {
      let alertBox = document.getElementById("custom-alert");
      let messageBox = document.getElementById("alert-message");
    
      messageBox.innerText = message;
      alertBox.classList.add("show");
    
      setTimeout(() => {
        closeAlert();
      }, 5000);
    }
    
    function closeAlert() {
      document.getElementById("custom-alert").classList.remove("show");
    }