// Modern JavaScript for Portfolio Interactions

document.addEventListener("DOMContentLoaded", function() {
    // Initialize all animations and interactions
    initializeSkillBars();
    initializeProjectItems(); // Changed from initializeProjectCards
    initializeScrollAnimations();
    initializeNavigation();
});

// Skill Bar Animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute("data-progress");
            bar.style.width = progress + "%";
        });
    };

    // Trigger animation when skills section is in view
    const skillsSection = document.querySelector(".skills-section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Project Item Interactions (Changed from Project Card Interactions)
function initializeProjectItems() {
    const projectItems = document.querySelectorAll(".project-item"); // Changed from .project-card
    
    projectItems.forEach(item => {
        const header = item.querySelector(".project-header");
        
        header.addEventListener("click", () => {
            // Close other items
            projectItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });
            
            // Toggle current item
            item.classList.toggle("active");
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(".skill-category, .project-item, .contact-item"); // Changed .project-card to .project-item
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(element);
    });
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });
}

// Parallax effect for floating shapes
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll(".shape");
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add loading animation
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    
    // Animate hero elements
    const heroElements = document.querySelectorAll(".hero-title, .hero-description, .hero-cta");
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }, index * 200);
    });
});

// Add some interactive hover effects
document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) {
        const newCursor = document.createElement("div");
        newCursor.className = "cursor";
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector(".cursor");
    cursorElement.style.left = e.clientX - 10 + "px";
    cursorElement.style.top = e.clientY - 10 + "px";
});

// Enhanced button interactions
document.querySelectorAll(".cta-button, .project-btn").forEach(button => {
    button.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-3px) scale(1.05)";
    });
    
    button.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0) scale(1)";
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
setTimeout(() => {
    const titleElement = document.querySelector(".title-line");
    if (titleElement) {
        const originalText = titleElement.textContent;
        typeWriter(titleElement, originalText, 150);
    }
}, 1000);

