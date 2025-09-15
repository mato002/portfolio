var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");

function openTab(tabName){
for(tabLink of tabLinks){
tabLink.classList.remove("active-link");
}

    for(tabContent of tabContents){
    tabContent.classList.remove("active-tab");
    }

    event.target.classList.add("active-link");
 document.getElementById(tabName).classList.add("active-tab");
}
var sideMenu = document.getElementById("sideMenu");
function openMenu(){
    sideMenu.style.right = "0";
    }
function closeMenu(){
    sideMenu.style.right = "-200px";
}




// Contact Form Handling
const form = document.forms['submit-to-google-sheet'];
const msg = document.querySelector(".msg");

// Initialize EmailJS
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_3f1hams"; // e.g., "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_qnuno0t"; // e.g., "template_xyz789"
const EMAILJS_PUBLIC_KEY = "RBLQC1t5BLQc0K7GC"; // e.g., "user_abcdef123456"

// Initialize EmailJS with your public key
emailjs.init(EMAILJS_PUBLIC_KEY);

if (form) {
        form.addEventListener('submit', e => {
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
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: name,
            from_email: email,
            message: message,
        }).then(() => {
            showMessage("Message sent successfully! I'll get back to you soon.", 'success');
            form.reset();
        }).catch((error) => {
            showMessage("Error sending message. Please try again.", 'error');
            console.error('EmailJS Error:', error);
        });
    });
}

// Helper function to show messages
function showMessage(text, type) {
    msg.innerHTML = text;
    msg.className = 'msg';
    if (type === 'error') {
        msg.classList.add('error');
    }
    
    if (text !== "Sending message...") {
        setTimeout(() => {
            msg.innerHTML = "";
            msg.className = 'msg';
        }, 5000);
    }
}

// Scroll Progress Bar
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
});

// Smooth scrolling for navigation links
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