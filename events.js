 
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
      // Helper function to get proper image URL
      function getImageSrc(url) {
        if (!url) return "";
        if (!url.startsWith("/") && !url.startsWith("http")) {
          return "/" + url;
        }
        return url;
      }

      // Global variable to store current event ID
      let currentEventId = null;

      // Load Upcoming Event
      function loadUpcomingEvent() {
        fetch("http://localhost:5000/events" , {
          headers: { "Authorization": "Bearer " }
        })
        .then(response => response.json())
        .then(events => {
          if (Array.isArray(events) && events.length > 0) {
            const event = events[0];  // Assuming newest event first
            currentEventId = event.id;
            const imageSrc = getImageSrc(event.image_url);
            let imageHtml = imageSrc ? `<img class="event-image" src="${imageSrc}" alt="${event.title}">` : `<p>No image available.</p>`; 
            let titleHtml = `<p > ${event.title}</p> `;
            let detailsHtml = 
                               `<p> ${event.description}</p>
                               <p> ${event.event_date}</p>`;
            document.getElementById("eventitleContainer").innerHTML = titleHtml;                   
            document.getElementById("eventImageContainer").innerHTML = imageHtml;
            document.getElementById("eventDetailsContainer").innerHTML = detailsHtml;
           
          } else {
            document.getElementById("eventSection").innerHTML = "<p>No upcoming events available.</p>";
          }
        })
        .catch(err => {
          console.error("Error loading event:", err);
          document.getElementById("eventSection").innerHTML = "<p>Error loading event.</p>";
        });
           }

      
      function loadParentMedia() {
    // We use the parent endpoint that returns the latest media message
    fetch("http://localhost:5000/media", {
      headers: { "Authorization": "Bearer " }
    })
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("mediaContainer");
        if (data.error) {
          container.textContent = data.error;
          return;
        }
        if (!data.message) {
          container.innerHTML = "<p>No media updates available.</p>";
          return;
        }
        let html = `<div>
        
                      <p>${data.message}</p>
                      <p>${data.created_at}</p> 
                    </div>`;
        container.innerHTML = html;
      })
      .catch(err => console.error("Error loading media update:", err));
  }

      // ---- Load Data on Page Load ----
      loadUpcomingEvent();
      loadParentMedia();
    });    
    function toggleDropdown() {
            const dropdown = document.getElementById('dropdownMenu');
            const button = document.querySelector('.toggle-btn');
            
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
                button.textContent = 'Show Universities';
            } else {
                dropdown.style.display = 'block';
                button.textContent = 'Show Less';
            }
        } 

        

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
    