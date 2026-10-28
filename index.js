function openTab(tabName, button){
    document.querySelectorAll('.tab-btn').forEach(function(tabButton) {
        const isActive = tabButton === button;
        tabButton.classList.toggle('active', isActive);
        tabButton.setAttribute('aria-selected', String(isActive));
    });

    document.querySelectorAll('.tab-contents').forEach(function(tabContent) {
        const isActive = tabContent.id === tabName;
        tabContent.classList.toggle('active-tab', isActive);
        tabContent.hidden = !isActive;
    });
}
var sideMenu = document.getElementById("sideMenu");
var menuToggle = document.querySelector('.menu-toggle');
var isMenuOpen = false;

// Menu link handler - clean and simple
function navigateToSection(href) {
    closeMenu();
    setTimeout(function() {
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, 300);
}

function openMenu(){
    if (sideMenu && menuToggle) {
        isMenuOpen = true;
        sideMenu.style.right = "0";
        sideMenu.style.display = 'flex';
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
}

function closeMenu(e){
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    if (sideMenu && menuToggle) {
        isMenuOpen = false;
        sideMenu.style.right = "-300px";
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    }
}

// Mobile menu navigation - COMPLETELY REWRITTEN FOR RELIABILITY
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = document.getElementById('current-year');
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    const footerAccordionQuery = window.matchMedia('(max-width: 768px)');
    const syncFooterAccordions = function() {
        document.querySelectorAll('.footer-accordion').forEach(function(section) {
            section.open = !footerAccordionQuery.matches;
        });
    };
    syncFooterAccordions();

    const serviceCards = Array.from(document.querySelectorAll('[data-service-category]'));
    const serviceFilters = Array.from(document.querySelectorAll('[data-service-filter]'));
    const serviceResultText = document.getElementById('serviceResultText');
    const serviceLabels = {
        all: 'Showing all business systems',
        commerce: 'Showing retail & production systems',
        people: 'Showing finance & community systems',
        operations: 'Showing property & network systems',
        digital: 'Showing platforms & integrations'
    };
    function filterServices(category) {
        serviceCards.forEach(function(card) {
            card.hidden = category !== 'all' && card.dataset.serviceCategory !== category;
        });
        serviceFilters.forEach(function(button) {
            const active = button.dataset.serviceFilter === category;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        if (serviceResultText) serviceResultText.textContent = serviceLabels[category] || serviceLabels.all;
    }
    if (serviceFilters.length) {
        serviceFilters.forEach(function(button) {
            button.addEventListener('click', function() { filterServices(button.dataset.serviceFilter); });
        });
        filterServices(document.querySelector('[data-service-filter].active')?.dataset.serviceFilter || 'all');
    }

    const projectCards = Array.from(document.querySelectorAll('[data-project-category]'));
    const projectFilters = Array.from(document.querySelectorAll('[data-project-filter]'));
    const projectResultText = document.getElementById('projectResultText');
    function filterProjects(category) {
        projectCards.forEach(function(card) {
            card.hidden = category !== 'all' && card.dataset.projectCategory !== category;
        });
        projectFilters.forEach(function(button) {
            const active = button.dataset.projectFilter === category;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        if (projectResultText) {
            const count = projectCards.filter(function(card) { return !card.hidden; }).length;
            projectResultText.textContent = category === 'all' ? 'Showing all ' + count + ' projects' : 'Showing ' + count + ' selected projects';
        }
    }
    if (projectFilters.length) {
        projectFilters.forEach(function(button) {
            button.addEventListener('click', function() { filterProjects(button.dataset.projectFilter); });
        });
        filterProjects(document.querySelector('[data-project-filter].active')?.dataset.projectFilter || 'all');
    }

    if (footerAccordionQuery.addEventListener) {
        footerAccordionQuery.addEventListener('change', syncFooterAccordions);
    } else {
        footerAccordionQuery.addListener(syncFooterAccordions);
    }

    const closeBtn = document.querySelector('.menu-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    document.querySelectorAll('#sideMenu a').forEach(function(link) {
        link.addEventListener('click', function() { closeMenu(); });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) closeMenu();
    });
});




// Contact Form Handling - Wait for DOM and EmailJS to load
document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.querySelector(".msg");

    // EmailJS Configuration
    const EMAILJS_SERVICE_ID = "service_3f1hams";
    const EMAILJS_TEMPLATE_ID = "template_gn3n04j";
    const EMAILJS_PUBLIC_KEY = "RBLQC1t5BLQc0K7GC";

    // Initialize EmailJS when available
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.warn('EmailJS library not loaded');
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('Name');
            const email = formData.get('Email');
            const message = formData.get('Message');
            
            // Basic validation
            if (!name || !email || !message) {
                showMessage("Please fill in all fields.", 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage("Please enter a valid email address.", 'error');
                return;
            }
            
            // Show loading state
            showMessage("Sending message...", '');
            
            // Disable submit button to prevent double submission
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                // Fallback: Use mailto link if EmailJS is not available
                showMessage("Email service unavailable. Please contact me directly at matechodhis@gmail.com", 'error');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit';
                }
                return;
            }
            
            // Send email using EmailJS
            const emailData = {
                from_name: name,
                from_email: email,
                email: email, // For template that uses {{email}}
                message: message,
                reply_to: email, // This allows you to reply directly to the sender
                date: new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            
            // Debug: Log what we're sending
            console.log('EmailJS Configuration:', {
                service: EMAILJS_SERVICE_ID,
                template: EMAILJS_TEMPLATE_ID,
                publicKey: EMAILJS_PUBLIC_KEY.substring(0, 10) + '...'
            });
            console.log('Sending email data:', emailData);
            
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData)
                .then(function(response) {
                    console.log('✅ EmailJS Success Response:', response);
                    console.log('Status:', response.status);
                    console.log('Text:', response.text);
                    showMessage("Message sent successfully! I'll get back to you soon.", 'success');
                    form.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Submit';
                    }
                })
                .catch(function(error) {
                    console.error('❌ EmailJS Error Details:', error);
                    console.error('Error Status:', error.status);
                    console.error('Error Text:', error.text);
                    console.error('Error Message:', error.message);
                    
                    // Show more detailed error message
                    let errorMessage = "Error sending message. ";
                    
                    if (error.status === 400) {
                        errorMessage += "Invalid request. Please check template variables.";
                    } else if (error.status === 401) {
                        errorMessage += "Authentication failed. Please check your EmailJS Public Key.";
                    } else if (error.status === 404) {
                        errorMessage += "Template or Service not found. Please verify your Template ID and Service ID.";
                    } else if (error.text) {
                        errorMessage += "Error: " + error.text;
                    } else if (error.message) {
                        errorMessage += error.message;
                    } else {
                        errorMessage += "Please check your EmailJS configuration.";
                    }
                    
                    errorMessage += " You can also email me directly at matechodhis@gmail.com";
                    
                    showMessage(errorMessage, 'error');
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Submit';
                    }
                });
        });
    } else {
        console.error('Contact form not found');
    }
});

// Helper function to show messages (defined globally)
function showMessage(text, type) {
    const msgElement = document.querySelector(".msg");
    if (!msgElement) {
        console.error('Message element not found');
        return;
    }
    
    msgElement.innerHTML = text;
    msgElement.className = 'msg';
    
    if (type === 'error') {
        msgElement.classList.add('error');
        msgElement.style.display = 'block';
    } else if (type === 'success') {
        msgElement.style.color = '#4CAF50';
        msgElement.style.borderColor = '#4CAF50';
        msgElement.style.background = 'rgba(76, 175, 80, 0.1)';
        msgElement.style.display = 'block';
    } else {
        msgElement.style.display = 'block';
    }
    
    // Auto-hide message after 5 seconds (unless it's loading message)
    if (text !== "Sending message...") {
        setTimeout(function() {
            msgElement.innerHTML = "";
            msgElement.className = 'msg';
            msgElement.style.display = 'none';
        }, 5000);
    }
}

// Scroll Progress Bar and Navigation Visibility
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
    
    // Show/hide navigation based on scroll position
    const mainNav = document.getElementById('mainNav');
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 600;
    
    if (mainNav) {
        if (scrollTop > headerHeight * 0.7) {
            mainNav.classList.remove('nav-hidden');
            mainNav.classList.add('nav-visible');
        } else {
            mainNav.classList.remove('nav-visible');
            mainNav.classList.add('nav-hidden');
        }
    }
});

// Smooth scrolling for navigation links (desktop only - mobile menu handled separately)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip mobile menu links - they're handled separately
        if (anchor.closest('#sideMenu')) {
            return;
        }
        
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
    
    // Handle CV download - ensure it works properly
    const cvDownloadBtn = document.getElementById('cv-download-btn');
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function(e) {
            // Don't prevent default if download attribute works
            // But handle it properly to ensure download happens
            const cvPath = this.getAttribute('href');
            const cvName = this.getAttribute('download') || 'Mathias_Odhiambo_CV.pdf';
            
            // Try fetch-based download first (works better in some browsers)
            fetch(cvPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('File not found or cannot be accessed');
                    }
                    return response.blob();
                })
                .then(blob => {
                    // Create a temporary link and trigger download
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = cvName;
                    document.body.appendChild(a);
                    a.click();
                    
                    // Clean up
                    setTimeout(() => {
                        window.URL.revokeObjectURL(url);
                        if (document.body.contains(a)) {
                            document.body.removeChild(a);
                        }
                    }, 100);
                    
                    e.preventDefault(); // Only prevent default if fetch succeeds
                })
                .catch(error => {
                    console.error('Error downloading CV:', error);
                    // If fetch fails, let the browser handle it natively
                    // Don't prevent default - let the download attribute work
                });
        }, true); // Use capture phase to ensure this runs first
    }
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('#about');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Back to Top Button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Portfolio "See More" functionality
let projectsVisible = false;

function toggleProjects(event) {
    event.preventDefault(); // Prevent default link behavior
    
    const hiddenProjects = document.getElementById('hidden-projects');
    const seeMoreBtn = document.getElementById('see-more-btn');
    
    if (!projectsVisible) {
        // Show hidden projects
        hiddenProjects.style.display = 'flex';
        hiddenProjects.style.animation = 'fadeInUp 0.6s ease-out';
        seeMoreBtn.textContent = 'See Less';
        projectsVisible = true;
        
        // Smooth scroll to the newly visible projects
        setTimeout(() => {
            hiddenProjects.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 300);
    } else {
        // Hide projects
        hiddenProjects.style.animation = 'fadeOutDown 0.4s ease-out';
        setTimeout(() => {
            hiddenProjects.style.display = 'none';
        }, 400);
        seeMoreBtn.textContent = 'See More';
        projectsVisible = false;
    }
}

// Fictional-data AI Operations Copilot demo
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('aiDemoForm');
    if (!form) return;

    const endpoint = './api/ai-demo.php';
    const status = document.getElementById('aiDemoStatus');
    const questionField = document.getElementById('aiDemoQuestion');
    const submitButton = document.getElementById('aiDemoSubmit');
    const answerPanel = document.getElementById('aiDemoAnswer');
    const answerText = document.getElementById('aiDemoAnswerText');

    function setStatus(message, isError) {
        status.textContent = message;
        status.classList.toggle('is-error', Boolean(isError));
    }

    function formatKes(amount) {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            maximumFractionDigits: 0
        }).format(amount);
    }

    fetch(endpoint, { headers: { 'Accept': 'application/json' } })
        .then(function(response) {
            if (!response.ok) throw new Error('Sample data could not be loaded.');
            return response.json();
        })
        .then(function(data) {
            document.getElementById('demoSales').textContent = formatKes(data.period.gross_sales);
            document.getElementById('demoTransactions').textContent = new Intl.NumberFormat('en-KE').format(data.period.transactions);

            const rows = document.getElementById('demoInventoryRows');
            rows.replaceChildren();
            data.products.forEach(function(product) {
                const row = document.createElement('tr');
                [product.name, product.units_sold, product.stock_on_hand, product.reorder_at].forEach(function(value) {
                    const cell = document.createElement('td');
                    cell.textContent = String(value);
                    row.appendChild(cell);
                });
                rows.appendChild(row);
            });
            setStatus('Sample data loaded. Try a suggested question or write your own.', false);
        })
        .catch(function() {
            setStatus('Could not load the sample data. Open the portfolio through PHP-enabled Apache.', true);
            document.getElementById('demoInventoryRows').innerHTML = '<tr><td colspan="4">Sample data is unavailable.</td></tr>';
        });

    document.querySelectorAll('[data-ai-prompt]').forEach(function(button) {
        button.addEventListener('click', function() {
            questionField.value = button.getAttribute('data-ai-prompt') || '';
            questionField.focus();
        });
    });

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const question = questionField.value.trim();
        if (!question) return;

        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        answerPanel.hidden = true;
        setStatus('Thinking about the fictional sample data…', false);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: question })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'The assistant could not answer just now.');

            answerText.textContent = result.answer;
            answerPanel.hidden = false;
            setStatus('Answer generated from the fictional sample dataset.', false);
        } catch (error) {
            setStatus(error.message || 'The assistant could not answer just now.', true);
        } finally {
            submitButton.disabled = false;
            submitButton.removeAttribute('aria-busy');
        }
    });
});
