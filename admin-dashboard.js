 document.addEventListener("DOMContentLoaded", function() {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "index.html";
      }
      
      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const sidebar = document.getElementById('sidebar');
      
      mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
      });
      
      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && !sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
          sidebar.classList.remove('open');
        }
      });
      
      // Navigation
      const navItems = document.querySelectorAll('.nav-item');
      const contentSections = document.querySelectorAll('.content-section');
      
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          const section = this.getAttribute('data-section');
          
          // Update active nav item
          navItems.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');
          
          // Show corresponding section
          contentSections.forEach(sec => sec.classList.remove('active'));
          document.getElementById(`${section}-section`).classList.add('active');
          
          // Close mobile menu
          if (window.innerWidth <= 992) {
            sidebar.classList.remove('open');
          }
          
          // Load data for the section
          if (section === 'events') loadEvents();
          else if (section === 'media') loadMedia();
          else if (section === 'messages') loadMessages();
          else if (section === 'subscribers') loadSubscribers();
        });
      });
      
      // Logout
      document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
      });
      
      // Event Modal
      const eventModal = document.getElementById('eventModal');
      const addEventBtn = document.getElementById('addEventBtn');
      const closeModalBtn = document.getElementById('closeModal');
      const cancelEventBtn = document.getElementById('cancelEventBtn');
      
      addEventBtn.addEventListener('click', function() {
        eventModal.style.display = 'block';
      });
      
      closeModalBtn.addEventListener('click', function() {
        eventModal.style.display = 'none';
      });
      
      cancelEventBtn.addEventListener('click', function() {
        eventModal.style.display = 'none';
      });
      
      // Event Form Submission
      document.getElementById('eventForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', document.getElementById('eventTitle').value);
        formData.append('description', document.getElementById('eventDescription').value);
        formData.append('event_date', document.getElementById('eventDate').value);
        
        const imageFile = document.getElementById('eventImage').files[0];
        if (imageFile) {
          formData.append('eventImage', imageFile);
        }
        
       fetch("https://lerato-r5fw.onrender.com/admin/events", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert('Error: ' + data.error);
          } else {
            alert('Event added successfully!');
            eventModal.style.display = 'none';
            document.getElementById('eventForm').reset();
            loadEvents();
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to add event');
        });
      });
      
      // Media Modal
      const mediaModal = document.getElementById('mediaModal');
      const addMediaBtn = document.getElementById('addMediaBtn');
      const closeMediaModalBtn = document.getElementById('closeMediaModal');
      const cancelMediaBtn = document.getElementById('cancelMediaBtn');
      
      addMediaBtn.addEventListener('click', function() {
        mediaModal.style.display = 'block';
      });
      
      closeMediaModalBtn.addEventListener('click', function() {
        mediaModal.style.display = 'none';
      });
      
      cancelMediaBtn.addEventListener('click', function() {
        mediaModal.style.display = 'none';
      });
      
      // Media Form Submission
      document.getElementById('mediaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = document.getElementById('mediaMessage').value;
        
       fetch("https://lerato-r5fw.onrender.com/admin/media", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert('Error: ' + data.error);
          } else {
            alert('Media message added successfully!');
            mediaModal.style.display = 'none';
            document.getElementById('mediaForm').reset();
            loadMedia();
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to add media message');
        });
      }); 
      // DELETE ALL MESSAGES BUTTON - NEW CODE ADDED HERE
  document.getElementById('deleteAllMessagesBtn')?.addEventListener('click', deleteAllMessages);

  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === eventModal) {
      eventModal.style.display = 'none';
    }
    if (e.target === mediaModal) {
      mediaModal.style.display = 'none';
    }
  });
  
  // Load initial data
  loadStats();

  // Function to delete all messages
  function deleteAllMessages() {
    if (!confirm('WARNING: This will permanently delete ALL messages. Continue?')) return;
    
    fetch("https://lerato-r5fw.onrender.com/admin/contact-messages-delete", {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'All messages deleted successfully');
      loadMessages(); // Refresh the messages list
    })
    .catch(err => {
      console.error('Delete all failed:', err);
      alert('Failed to delete all messages');
    });
  }
      
      // Close modals when clicking outside
      window.addEventListener('click', function(e) {
        if (e.target === eventModal) {
          eventModal.style.display = 'none';
        }
        if (e.target === mediaModal) {
          mediaModal.style.display = 'none';
        }
      });
      
      // Load initial data
      loadStats();
      
      // Functions to load data
      function loadStats() {
        // Subscriber count
        fetch("https://lerato-r5fw.onrender.com/admin/subscribers/count", {

          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
          document.getElementById('subscriberCount').textContent = data.total || 0;
        })
        .catch(err => {
          console.error('Error loading subscriber count:', err);
          document.getElementById('subscriberCount').textContent = '0';
        });
        
        // Event count
       fetch("https://lerato-r5fw.onrender.com/admin/events/count", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
          document.getElementById('eventCount').textContent = data.total || 0;
        })
        .catch(err => {
          console.error('Error loading event count:', err);
          document.getElementById('eventCount').textContent = '0';
        });
        
        // Message count
       fetch("https://lerato-r5fw.onrender.com/admin/messages/count", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
          document.getElementById('messageCount').textContent = data.total || 0;
        })
        .catch(err => {
          console.error('Error loading message count:', err);
          document.getElementById('messageCount').textContent = '0';
        });
      }
      
      function loadSubscribers() {
        fetch("https://lerato-r5fw.onrender.com/admin/subscribers", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(subscribers => {
          const tbody = document.getElementById('subscribersTable');
          tbody.innerHTML = '';
          
          if (subscribers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No subscribers found</td></tr>';
            return;
          }
          
          subscribers.forEach(sub => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${sub.name || 'N/A'}</td>
              <td>${sub.email || 'N/A'}</td>
              <td>${sub.created_at ? new Date(sub.created_at).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button class="btn btn-delete" onclick="deleteSubscriber(${sub.id})">
                  <i class="fas fa-trash"></i>
                  Delete
                </button>
              </td>
            `;
            tbody.appendChild(row);
          });
        })
        .catch(err => {
          console.error('Error loading subscribers:', err);
          document.getElementById('subscribersTable').innerHTML = 
            '<tr><td colspan="4" style="text-align: center;">Error loading subscribers</td></tr>';
        });
      }
      
      function loadEvents() {
      fetch("https://lerato-r5fw.onrender.com/admin/events", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(events => {
          const tbody = document.getElementById('eventsTable');
          tbody.innerHTML = '';
          
          if (events.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No events found</td></tr>';
            return;
          }
          
          events.forEach(event => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${event.title || 'N/A'}</td>
              <td>${event.event_date ? new Date(event.event_date).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button class="btn btn-delete" onclick="deleteEvent(${event.id})">
                  <i class="fas fa-trash"></i>
                  Delete
                </button>
              </td>
            `;
            tbody.appendChild(row);
          });
        })
        .catch(err => {
          console.error('Error loading events:', err);
          document.getElementById('eventsTable').innerHTML = 
            '<tr><td colspan="3" style="text-align: center;">Error loading events</td></tr>';
        });
      }
      
      function loadMedia() {
        fetch("https://lerato-r5fw.onrender.com/admin/media", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(media => {
          const tbody = document.getElementById('mediaTable');
          tbody.innerHTML = '';
          
          if (media.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No media found</td></tr>';
            return;
          }
          
          media.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${item.message || 'N/A'}</td>
              <td>${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button class="btn btn-delete" onclick="deleteMedia(${item.id})">
                  <i class="fas fa-trash"></i>
                  Delete
                </button>
              </td>
            `;
            tbody.appendChild(row);
          });
        })
        .catch(err => {
          console.error('Error loading media:', err);
          document.getElementById('mediaTable').innerHTML = 
            '<tr><td colspan="3" style="text-align: center;">Error loading media</td></tr>';
        });
      }
      
      function loadMessages() {
    fetch("https://lerato-r5fw.onrender.com/admin/contact-messages", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(messages => {
          const tbody = document.getElementById('messagesTable');
          tbody.innerHTML = '';
          
          if (messages.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No messages found</td></tr>';
            return;
          }
          
          messages.forEach(msg => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${msg.first_name || ''} ${msg.second_name || ''}</td>
              <td>${msg.email || 'N/A'}</td>
              <td>${msg.message ? msg.message.substring(0, 50) + (msg.message.length > 50 ? '...' : '') : 'N/A'}</td>
              <td>${msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'N/A'}</td>
            `;
            tbody.appendChild(row);
          });
        })
        .catch(err => {
          console.error('Error loading messages:', err);
          document.getElementById('messagesTable').innerHTML = 
            '<tr><td colspan="4" style="text-align: center;">Error loading messages</td></tr>';
        });
      }
    });
    
    // Global functions
    function deleteSubscriber(id) {
      if (!confirm('Are you sure you want to delete this subscriber?')) return;
      
    fetch(`https://lerato-r5fw.onrender.com/admin/subscribers/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Subscriber deleted successfully');
        location.reload();
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert('Failed to delete subscriber');
      });
    }
    
    function deleteEvent(id) {
      if (!confirm('Are you sure you want to delete this event?')) return;
      
     fetch(`https://lerato-r5fw.onrender.com/admin/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Event deleted successfully');
        location.reload();
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert('Failed to delete event');
      });
    }
    
    function deleteMedia(id) {
      if (!confirm('Are you sure you want to delete this media item?')) return;
      
   fetch(`https://lerato-r5fw.onrender.com/admin/media/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Media deleted successfully');
        location.reload();
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert('Failed to delete media');
      });
    } 
