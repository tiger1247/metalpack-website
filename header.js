// Header HTML content (embedded for reliability)
const headerHTML = `<!-- Top Bar -->
<div class="top-bar">
    <div class="top-bar-content">
        <div class="top-bar-email">info@metalpack.com.py</div>
        <div class="top-bar-phone">+595 (21) 229 0828</div>
    </div>
</div>

<!-- Main Navigation -->
<nav class="main-nav">
    <div class="nav-content">
        <div class="nav-left">
            <div class="logo-container">
                <a href="index.html" class="logo-link">
                    <img src="images/logo.svg" alt="METALPACK PROYECTOS Y MONTAJES INDUSTRIALES Logo" class="logo-img" style="height: 56px; width: auto; display: block;">
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="nosotros.html">Nosotros</a></li>
                <li><a href="servicios.html">Servicios</a></li>
                <li><a href="proyectos.html">Nuestros proyectos</a></li>
                <li><a href="contacto.html">Contacto</a></li>
            </ul>
        </div>
        <a href="https://wa.me/595212290828" class="whatsapp-btn">Contactanos en WhatsApp</a>
        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
    <div class="mobile-nav" id="mobileNav">
        <div class="mobile-nav-header">
            <a href="index.html" class="mobile-nav-logo-link">
                <div class="mobile-nav-logo">
                    <div class="mobile-nav-logo-icon"></div>
                    <div class="mobile-nav-logo-text">
                        <div class="mobile-nav-logo-main">METALPACK</div>
                        <div class="mobile-nav-logo-sub">PROYECTOS Y MONTAJES INDUSTRIALES</div>
                    </div>
                </div>
            </a>
            <button class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">×</button>
        </div>
        <ul class="nav-links">
            <li><a href="nosotros.html">Nosotros</a></li>
            <li><a href="servicios.html">Servicios</a></li>
            <li><a href="proyectos.html">Nuestros proyectos</a></li>
            <li><a href="contacto.html">Contacto</a></li>
        </ul>
        <a href="https://wa.me/595212290828" class="whatsapp-btn">Contactanos en WhatsApp</a>
    </div>
</nav>`;

// Load header HTML and CSS
function loadHeader() {
    // Load header CSS
    const headerCSS = document.createElement('link');
    headerCSS.rel = 'stylesheet';
    headerCSS.href = 'header.css';
    document.head.appendChild(headerCSS);

    // Find or create placeholder div for the header
    let headerPlaceholder = document.getElementById('header-placeholder');
    
    if (!headerPlaceholder) {
        // Create placeholder if it doesn't exist at the top of body
        headerPlaceholder = document.createElement('div');
        headerPlaceholder.id = 'header-placeholder';
        document.body.insertBefore(headerPlaceholder, document.body.firstChild);
    }
    
    headerPlaceholder.innerHTML = headerHTML;

    // Highlight active page
    highlightActivePage();

    // Initialize mobile menu after header is loaded
    initMobileMenu();
}

// Highlight active page in navigation
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Check if this is the current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');

    function openMobileMenu() {
        if (mobileNav) {
            mobileNav.classList.add('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.add('active');
            }
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        }
    }

    function closeMobileMenu() {
        if (mobileNav) {
            mobileNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.style.overflow = ''; // Restore body scroll
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileNav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    if (mobileNav) {
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                closeMobileMenu();
            }
        });
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    // DOM is already ready
    loadHeader();
}

