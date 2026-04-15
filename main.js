// Utility functions
function showMainContent() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('navbar').style.display = 'block';
}

function showLogin() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('mainContent').style.display = 'none';
}

// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('urbanfix_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        document.getElementById('welcomeMsg') && (document.getElementById('welcomeMsg').textContent = `Welcome, ${user.name}`);
        showMainContent();
        updateLogoutBtn();
    }

    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('userName').value.trim();
        if (name.length < 2) {
            alert('Please enter a valid name');
            return;
        }
        
        localStorage.setItem('urbanfix_user', JSON.stringify({ name }));
        showMainContent();
        updateLogoutBtn();
        // Update welcome message if exists
        const welcomeMsg = document.getElementById('welcomeMsg');
        if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${name}`;
    });

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        localStorage.removeItem('urbanfix_user');
        showLogin();
    });
});

// Update logout button visibility
function updateLogoutBtn() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = localStorage.getItem('urbanfix_user') ? 'block' : 'none';
}

// Modal functionality
function openBookingModal(workerName, service) {
    document.getElementById('workerName').value = workerName;
    document.getElementById('modalTitle').textContent = `Book ${workerName}`;
    document.getElementById('bookingModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('bookingForm').reset();
}

// Booking form
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const worker = document.getElementById('workerName').value;
        const address = document.getElementById('address').value;
        const date = document.getElementById('bookingDate').value;
        
        if (!address || !date) {
            alert('Please fill all fields');
            return;
        }
        
        const user = JSON.parse(localStorage.getItem('urbanfix_user'));
        alert(`🎉 Booking Confirmed!\n\nWorker: ${worker}\nAddress: ${address}\nDate: ${new Date(date).toLocaleDateString()}\nCustomer: ${user.name}`);
        
        closeModal();
    });

    // Close modal on outside click
    window.onclick = function(event) {
        const modal = document.getElementById('bookingModal');
        if (event.target === modal) {
            closeModal();
        }
    }
});

// Mobile nav toggle
document.getElementById('navToggle')?.addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

document.querySelector('.close')?.addEventListener('click', closeModal);

// Workers data for service pages
const WORKERS_DATA = {
    electrician: [
        { name: 'Ramesh.', experience: '5 years', price: '₹350/visit', rating: 4.8 },
        { name: 'Suresh.', experience: '8 years', price: '₹450/visit', rating: 4.6 },
        { name: 'Vikram.', experience: '3 years', price: '₹300/visit', rating: 4.9 }
    ],
    plumber: [
        { name: 'Rajesh.', experience: '6 years', price: '₹400/visit', rating: 4.7 },
        { name: 'Mohan.', experience: '4 years', price: '₹350/visit', rating: 4.8 },
        { name: 'Kiran.', experience: '7 years', price: '₹450/visit', rating: 4.5 }
    ],
    carpenter: [
        { name: 'Anil.', experience: '9 years', price: '₹500/visit', rating: 4.9 },
        { name: 'Deepak.', experience: '5 years', price: '₹400/visit', rating: 4.7 },
        { name: 'Prakash.', experience: '6 years', price: '₹450/visit', rating: 4.8 }
    ],
    painter: [
        { name: 'Sunil.', experience: '4 years', price: '₹300/sqft', rating: 4.6 },
        { name: 'Ravi', experience: '7 years', price: '₹350/sqft', rating: 4.9 },
        { name: 'Vijay ', experience: '5 years', price: '₹320/sqft', rating: 4.7 }
    ]
};

// Service page worker list generator
function generateWorkers(service) {
    const container = document.getElementById('workersContainer');
    if (!container) return;
    
    const workers = WORKERS_DATA[service] || [];
    container.innerHTML = workers.map(worker => `
        <div class="worker-card">
            <div class="worker-avatar">${worker.name.charAt(0)}</div>
            <div class="worker-name">${worker.name}</div>
            <div class="worker-meta">
                <span>${worker.experience}</span>
                <span class="rating">⭐ ${worker.rating}</span>
                <span class="price">${worker.price}</span>
            </div>
            <button class="book-btn" onclick="openBookingModal('${worker.name}', '${service}')">
                Book Now
            </button>
        </div>
    `).join('');
}

// Navbar toggle for mobile
function toggleNav() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Export functions for service pages
window.showMainContent = showMainContent;
window.showLogin = showLogin;
window.updateLogoutBtn = updateLogoutBtn;
window.openBookingModal = openBookingModal;
window.closeModal = closeModal;
window.toggleNav = toggleNav;
window.generateWorkers = generateWorkers;
