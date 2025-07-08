// Modern JavaScript for Portfolio Interactions

document.addEventListener("DOMContentLoaded", function () {
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

// Add some interactive hover effects

if(window.innerWidth >= 700){
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
}

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
        typeWriter(titleElement, originalText, 200);
    }
}, 1000);

// Enhanced Contact Form JavaScript

document.addEventListener("DOMContentLoaded", function () {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const inputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = contactForm.querySelector('.submit-btn');

    

    // Submit button interactions
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        handleFormSubmission();
    });


    // Initialize intersection observer for scroll animations
    initializeScrollAnimations();
}

function handleFormSubmission() {
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');

    // Validate form
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            animateValidationError(input);
        }
    });

    if (!isValid) {
        animateSubmitError(submitBtn);
        return;
    }

    // Animate successful submission
    animateSubmitSuccess(submitBtn, btnText, btnIcon);
}

function animateValidationError(input) {
    input.style.borderColor = '#ff4757';
    input.style.animation = 'shake 0.5s ease-in-out';

    setTimeout(() => {
        input.style.borderColor = '';
        input.style.animation = '';
    }, 500);
}

function animateSubmitError(btn) {
    btn.style.background = 'linear-gradient(135deg, #ff4757, #ff3742)';
    btn.style.animation = 'shake 0.5s ease-in-out';

    setTimeout(() => {
        btn.style.background = '';
        btn.style.animation = '';
    }, 500);
}

function animateSubmitSuccess(btn, btnText, btnIcon) {
    // Change button state
    btnText.textContent = 'Sending...';
    btnIcon.textContent = '⟳';
    btnIcon.style.animation = 'spin 1s linear infinite';
    btn.disabled = true;

    // Simulate sending
    setTimeout(() => {
        btnText.textContent = 'I will contact you in a bit!';
        btnIcon.textContent = '✓';
        btnIcon.style.animation = '';
        btn.style.background = 'linear-gradient(135deg, #2ed573, #1e90ff)';

        // Reset after 3 seconds
        setTimeout(() => {
            btnText.textContent = 'Send Message';
            btnIcon.textContent = '→';
            btn.style.background = '';
            btn.disabled = false;

            // Clear form
            document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
                input.value = '';
                input.parentElement.classList.remove('focused');
            });
        }, 3000);
    }, 2000);
}

function initializeScrollAnimations() {
    const contactSection = document.querySelector('#contact-form');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFormEntrance();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (contactSection) {
        observer.observe(contactSection);
    }
}

function animateFormEntrance() {
    const heading = document.querySelector('#contact-form h2');
    const inputGroups = document.querySelectorAll('.input-group');
    const submitBtn = document.querySelector('.submit-btn');

    // Animate heading
    heading.style.animation = 'titleSlideDown 0.8s ease-out';

    // Animate input groups with stagger
    inputGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
            group.style.animation = 'inputSlideIn 0.6s ease-out';
        }, index * 150);
    });

    // Animate submit button last
    setTimeout(() => {
        submitBtn.style.opacity = '1';
        submitBtn.style.transform = 'translateY(0)';
        submitBtn.style.animation = 'buttonBounceIn 0.8s ease-out';
    }, inputGroups.length * 150 + 200);
}

// Initialize form elements as hidden for entrance animation
document.addEventListener('DOMContentLoaded', function () {
    const inputGroups = document.querySelectorAll('.input-group');
    const submitBtn = document.querySelector('.submit-btn');

    inputGroups.forEach(group => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    if (submitBtn) {
        submitBtn.style.opacity = '0';
        submitBtn.style.transform = 'translateY(20px)';
        submitBtn.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
});

document.querySelector('.submit-btn').addEventListener('click', async () => {
    const name = document.querySelector('.input-name').value;
    const mobile = document.querySelector('.input-mobile').value;
    const project_name = document.querySelector('.input-project-name').value;

    const project_description = document.querySelector('.input-project-description').value;
    if (name != '', mobile != '', project_name != '', project_description != '') {
        const response = await fetch('https://n8n-prudvi.onrender.com/webhook/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, mobile, project_name, project_description
            })
        });

        const result = await response.json();
    }
});

document.querySelector('.float-chat-trigger').addEventListener('click', () => {
    const overlay = document.querySelector('.overlay');
    const chatContainer = document.querySelector('.chat-bot-container');
    
    // Show overlay
    overlay.style.display = 'block';
    
    // Trigger opening animation
    chatContainer.style.display = 'flex';
    chatContainer.classList.add('opening');
    
    // Add open class after animation starts
    setTimeout(() => {
        chatContainer.classList.add('open');
    }, 100);
    
    // Prevent body scroll
    document.body.style.overflowY = 'hidden';
    
    // Remove opening class after animation completes
    setTimeout(() => {
        chatContainer.classList.remove('opening');
    }, 500);
});

document.querySelector('.clear-btn>img').addEventListener('click', () => {
    const overlay = document.querySelector('.overlay');
    const chatContainer = document.querySelector('.chat-bot-container');
    
    // Remove open class and trigger closing animation
    chatContainer.classList.remove('open');
    
    // Hide after animation completes
    setTimeout(() => {
        overlay.style.display = 'none';
        chatContainer.style.display = 'none';
        chatContainer.classList.remove('opening');
        document.body.style.overflowY = 'auto';
    }, 400);
});

document.querySelector('.input-section .img-con').addEventListener('click', callQuery);

async function callQuery() {
    let query = document.querySelector('.query-inp').value;
    if (query != '')
        document.querySelector('.query-inp').value = '';
    await handleQuery(query);
}

document.querySelector('.query-inp').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let query = document.querySelector('.query-inp').value;
        if (query == '')
            return;
        handleQuery(query);
        document.querySelector('.query-inp').value = '';
    }
});


let resultContainer = document.querySelector('.result-container');

function showLoadingAnimation() {
    const loadingHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">Thinking<span class="loading-dots"></span></div>
        </div>
    `;
    resultContainer.insertAdjacentHTML('beforeend', loadingHTML);
    scrollChatToBottom();
}

function hideLoadingAnimation() {
    const loadingContainer = resultContainer.querySelector('.loading-container');
    if (loadingContainer) {
        loadingContainer.remove();
    }
}

function getQueryIcon(query) {
    const iconMap = {
        'How much did you cost for a website?': '💰',
        'How can I get started?': '🚀',
        'What kind of projects do you take on?': '🛠️',
        'Can you redesign my existing website?': '♻️',
        'Send your live projects link?': '🌐',
        'What technologies do you use?': '💻',
        'Can you integrate APIs or external services?': '🔌',
        'Will you help me after the project is done?': '🙋‍♂️',
        'Is my data safe with you?': '🔐',
        'What did you studied?': '🎓',
        'Your all services list?': '🧾',
        'How much time did you take for completing a project?': '⏳'
    };
    return iconMap[query] || '💬';
}

async function handleQuery(query = '') {
    let resultHTML = '';
    if (query) {
        // Add user message with animation
        const userMessageHTML = `
            <div class="input-aligning-container">
                <div class="user-input new-message">${getQueryIcon(query)} ${query}</div>
            </div>
        `;
        resultContainer.insertAdjacentHTML('beforeend', userMessageHTML);
        scrollChatToBottom();

        // Show loading animation
        showLoadingAnimation();
        if (query == 'How much did you cost for a website?') {
            // Simulate thinking time
            await new Promise(resolve => setTimeout(resolve, 1000));
            hideLoadingAnimation();
            
            resultHTML = `
            <div class="ai-output new-response">
                💵 My pricing depends on the type of website:
                <br>• 🧱 Static site: starts from ₹7000
                <br>• ⚙️ Dynamic site: starts form ₹12000
                <br>• 🤖 AI-integrated site: starts form ₹17000
                <br>📞 Let's discuss your exact needs for a clear estimate.
            </div>
        `;
        }

        else if (query == 'How can I get started?') {
            await new Promise(resolve => setTimeout(resolve, 800));
            hideLoadingAnimation();
            
            resultHTML = `
            <div class="ai-output new-response">
                🧭 Getting started is easy!
                <br>📨 Just fill the form below.
                <br>📅 We'll schedule a quick call or chat to finalize it.
            </div>
        `;
        }

        else if (query == 'What kind of projects do you take on?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">🛠️ ${query}</div>
            </div>
            <div class="ai-output">
                I work on:
                <br>• 🧑‍💼 Portfolio websites
                <br>• 🛒 Business & eCommerce sites
                <br>• 📊 Web dashboards & admin panels & landing pages
                <br>• 🔗 API-based integrations and more.
            </div>
        `;
        }

        else if (query == 'Can you redesign my existing website?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">♻️ ${query}</div>
            </div>
            <div class="ai-output">
                ✅ Absolutely! I can improve your current site’s UI/UX, performance, SEO, or rebuild it from scratch to give it a modern touch.
            </div>
        `;
        }

        else if (query == 'Send your live projects link?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">🌐 ${query}</div>
            </div>
            <div class="ai-output">
                🔗 Sure! Here's a sample:
                <br>👉 <a href="https://starterwave.xyz" target="_blank">Starter Wave</a>
                <br>👉 <a href="https://citrixltd.com" target="_blank">CitrixLtd</a>
                <br>📌 I'll keep adding more soon!
            </div>
        `;
        }

        else if (query == 'What technologies do you use?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">💻 ${query}</div>
            </div>
            <div class="ai-output">
                I mainly use:
                <br>• 🧱 HTML, CSS, JavaScript
                <br>• 🟢 Node.js, 🖥️ Express.js, 🐘 PHP
                <br>• 🍃 MongoDB, 🐬 MySQL
            </div>
        `;
        }

        else if (query == 'Can you integrate APIs or external services?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">🔌 ${query}</div>
            </div>
            <div class="ai-output">
                🔄 Yes, I specialize in API integration — whether it's:
                <br>• 💳 Payment gateways
                <br>• 🗺️ Google services
                <br>• 🤖 Telegram bots and web bots
                <br>• ⚙️ Or any third-party tool.
            </div>
        `;
        }

        else if (query == 'Will you help me after the project is done?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">🙋‍♂️ ${query}</div>
            </div>
            <div class="ai-output">
                💡 Yes, I offer post-launch support for bug fixes, updates, and maintenance — your site stays in good hands.
            </div>
        `;
        }

        else if (query == 'Is my data safe with you?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">🔐 ${query}</div>
            </div>
            <div class="ai-output">
                🛡️ 100%. I follow strict security practices and never share or misuse client data. Your privacy is a top priority.
            </div>
        `;
        }

        else if (query == 'What did you studied?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">🎓 ${query}</div>
            </div>
            <div class="ai-output">
                📘 I'm currently pursuing a diploma with a strong focus on web development, coding, and real-world project experience.
            </div>
        `;
        }

        else if (query == 'Your all services list?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">🧾 ${query}</div>
            </div>
            <div class="ai-output">
                Here's what I offer:
                <br>• 🖌️ Website design & development
                <br>• 📱 Responsive UI/UX
                <br>• 📊 Web app dashboards
                <br>• 🔍 SEO-friendly setup
                <br>• 🔌 API integration & automation
                <br>• 🧰 Maintenance & support
            </div>
        `;
        }

        else if (query == 'How much time did you take for completing a project?') {
            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">⏳ ${query}</div>
            </div>
            <div class="ai-output">
                ⏱️ It depends on the project:
                <br>• 🧱 Simple site: 1-2 week
                <br>• ⚙️ Dynamic site: 1-2 months
                <br>• 🧠 Larger projects: 1-2 months
                <br>📅 We'll finalize timelines after understanding your scope.
            </div>
        `;
        }

        else {
            let request = await fetch(`https://n8n-prudvi.onrender.com/webhook/chatbot-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            let response = await request.text();
            console.log(response);

            resultHTML = `
            <div class="input-aligning-container">
                <div class="user-input">⏳ ${query}</div>
            </div>
            <div class="ai-output">
                <pre>${response}</pre>
            </div>
        `;
        }

        let queries = [];
        let pastQueries = JSON.parse(localStorage.getItem('pastQueries')) || [];
        queries = pastQueries;

        queries.push({ answer: `${resultHTML}` });
        localStorage.setItem('pastQueries', JSON.stringify(queries));
        renderQueries();
    }
}

function renderQueries() {
    let queries = JSON.parse(localStorage.getItem('pastQueries')) || [];
    let resultHTML = '';
    queries.forEach((query) => {
        resultHTML += query.answer;
    });
    document.querySelector('.result-container').innerHTML = `
        <div class="ai-output">💬 I'm your AI-powered dev assistant!<br>
        Ask me anything i am here to solve your doubts...</div>
        </div>
    `;
    document.querySelector('.result-container').innerHTML += resultHTML;
}

renderQueries();

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    sidebar.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
        overlay.style.display = 'block';
    } else {
        overlay.style.display = 'none';
    }
}

// Close sidebar when clicking overlay
document.querySelector('.sidebar-overlay').addEventListener('click', function () {
    toggleSidebar();
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar-overlay').style.display = 'none';
        document.getElementById('sidebar').classList.remove('active');
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeResponsiveChatbot();
});

function initializeResponsiveChatbot() {
    // Create hamburger menu button if it doesn't exist
    createHamburgerMenu();

    // Create sidebar overlay if it doesn't exist
    createSidebarOverlay();

    // Initialize sidebar toggle functionality
    initializeSidebarToggle();

    // Fix result container scrolling
    fixResultContainerScrolling();

    // Enhance list item animations
    enhanceListItemAnimations();

    // Add keyboard navigation
    addKeyboardNavigation();
}

function createHamburgerMenu() {
    // Check if hamburger menu already exists
    if (document.querySelector('.sidebar-toggle')) return;

    const botHeader = document.querySelector('.bot-header');
    if (!botHeader) return;

    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'sidebar-toggle';
    hamburgerBtn.innerHTML = '☰';
    hamburgerBtn.setAttribute('aria-label', 'Toggle sidebar menu');

    // Insert at the beginning of bot-header
    botHeader.insertBefore(hamburgerBtn, botHeader.firstChild);
}

function createSidebarOverlay() {
    // Check if overlay already exists
    if (document.querySelector('.sidebar-overlay')) return;

    const chatContainer = document.querySelector('.chat-bot-container');
    if (!chatContainer) return;

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';

    // Insert overlay into chat container
    chatContainer.appendChild(overlay);
}

function initializeSidebarToggle() {
    const toggleBtn = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.common-doubts-section');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!toggleBtn || !sidebar || !overlay) return;

    // Toggle sidebar function
    function toggleSidebar() {
        const isActive = sidebar.classList.contains('active');

        if (isActive) {
            // Hide sidebar
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            overlay.style.display = 'none';
            toggleBtn.innerHTML = '☰';
            toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
            // Show sidebar
            sidebar.classList.add('active');
            overlay.classList.add('active');
            overlay.style.display = 'block';
            toggleBtn.innerHTML = '✕';
            toggleBtn.setAttribute('aria-expanded', 'true');
        }
    }

    // Event listeners
    toggleBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Close sidebar on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    // Handle window resize - close sidebar on desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
}

function fixResultContainerScrolling() {
    const resultContainer = document.querySelector('.result-container');
    if (!resultContainer) return;

    // Ensure proper scrolling behavior
    resultContainer.style.overflowY = 'auto';
    resultContainer.style.overflowX = 'hidden';
    resultContainer.style.scrollBehavior = 'smooth';

    // Auto-scroll to bottom when new content is added
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Small delay to ensure content is rendered
                setTimeout(() => {
                    resultContainer.scrollTop = resultContainer.scrollHeight;
                }, 100);
            }
        });
    });

    observer.observe(resultContainer, {
        childList: true,
        subtree: true
    });
}

function enhanceListItemAnimations() {
    const listItems = document.querySelectorAll('.common-doubts-section li');

    listItems.forEach(function (item, index) {
        // Enhanced click animation
        item.addEventListener('click', function (e) {
            // Add click animation
            this.style.transform = 'translateX(3px) scale(0.98)';
            this.style.transition = 'all 0.1s ease';

            // Reset animation after short delay
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'all 0.3s ease';
            }, 150);

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const sidebar = document.querySelector('.common-doubts-section');
                    const overlay = document.querySelector('.sidebar-overlay');
                    const toggleBtn = document.querySelector('.sidebar-toggle');

                    if (sidebar && sidebar.classList.contains('active')) {
                        sidebar.classList.remove('active');
                        overlay.classList.remove('active');
                        overlay.style.display = 'none';
                        toggleBtn.innerHTML = '☰';
                        toggleBtn.setAttribute('aria-expanded', 'false');
                    }
                }, 300);
            }
        });
    });
}

function addKeyboardNavigation() {
    const listItems = document.querySelectorAll('.common-doubts-section li');
    let currentIndex = -1;

    document.addEventListener('keydown', function (e) {
        const sidebar = document.querySelector('.common-doubts-section');

        // Only handle navigation if sidebar is visible
        if (window.innerWidth > 768 || sidebar.classList.contains('active')) {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    currentIndex = Math.min(currentIndex + 1, listItems.length - 1);
                    highlightItem(currentIndex);
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    currentIndex = Math.max(currentIndex - 1, 0);
                    highlightItem(currentIndex);
                    break;

                case 'Enter':
                    if (currentIndex >= 0 && currentIndex < listItems.length) {
                        e.preventDefault();
                        listItems[currentIndex].click();
                    }
                    break;
            }
        }
    });

    function highlightItem(index) {
        // Remove previous highlight
        listItems.forEach(item => item.classList.remove('keyboard-focus'));

        // Add highlight to current item
        if (index >= 0 && index < listItems.length) {
            listItems[index].classList.add('keyboard-focus');
            listItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Utility function to scroll result container to bottom
window.scrollChatToBottom = function () {
    const resultContainer = document.querySelector('.result-container');
    if (resultContainer) {
        resultContainer.scrollTop = resultContainer.scrollHeight;
    }
};
// Section Animation System
function initializeSectionAnimations() {
    // Add animation classes to sections
    const sections = document.querySelectorAll('#home, #skills, #projects, #contact-form, #contact');
    sections.forEach(section => {
        section.classList.add('section-animate');
    });

    // Create intersection observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for hero section
                if (entry.target.id === 'home') {
                    setTimeout(() => {
                        initializeHeroAnimations();
                    }, 200);
                }
                
                // Special handling for skills section
                if (entry.target.id === 'skills') {
                    setTimeout(() => {
                        initializeSkillsAnimations();
                    }, 400);
                }
                
                // Special handling for projects section
                if (entry.target.id === 'projects') {
                    setTimeout(() => {
                        initializeProjectsAnimations();
                    }, 300);
                }
                
                // Don't unobserve to allow re-triggering if needed
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function initializeHeroAnimations() {
    const heroSection = document.querySelector('#home');
    if (heroSection && !heroSection.classList.contains('hero-animated')) {
        heroSection.classList.add('hero-animated');
        
        // Animate hero elements with stagger
        const heroImage = heroSection.querySelector('.hero-image');
        const heroText = heroSection.querySelector('.hero-text');
        
        if (heroImage) {
            setTimeout(() => {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0) scale(1)';
            }, 100);
        }
        
        if (heroText) {
            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateX(0)';
            }, 300);
        }
    }
}

function initializeSkillsAnimations() {
    const skillsSection = document.querySelector('#skills');
    if (skillsSection && !skillsSection.classList.contains('skills-animated')) {
        skillsSection.classList.add('skills-animated');
        
        const skillCategories = skillsSection.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });
    }
}

function initializeProjectsAnimations() {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection && !projectsSection.classList.contains('projects-animated')) {
        projectsSection.classList.add('projects-animated');
        
        const projectItems = projectsSection.querySelectorAll('.project-item');
        projectItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
}

// Enhanced scroll animations for individual elements
function initializeEnhancedScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-item, .contact-item');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // Add a subtle bounce effect
                entry.target.style.animation = "bounceIn 0.6s ease-out";
                
                // Remove animation class after completion
                setTimeout(() => {
                    entry.target.style.animation = "";
                }, 600);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        elementObserver.observe(element);
    });
}

// Add bounce animation keyframes via JavaScript
function addBounceAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            60% {
                opacity: 1;
                transform: translateY(-5px) scale(1.02);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Add bounce animation styles
    addBounceAnimation();
    
    // Initialize section animations
    initializeSectionAnimations();
    
    // Initialize enhanced scroll animations
    initializeEnhancedScrollAnimations();
    
    // Trigger hero section animation immediately if it's in view
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            heroSection.classList.add('animate-in');
            setTimeout(() => {
                initializeHeroAnimations();
            }, 200);
        }
    }
});

// Smooth scroll enhancement for better animation timing
function enhancedSmoothScroll() {
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                // Smooth scroll with animation preparation
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
                
                // Pre-trigger animation for better UX
                setTimeout(() => {
                    if (!targetSection.classList.contains('animate-in')) {
                        targetSection.classList.add('animate-in');
                    }
                }, 300);
            }
        });
    });
}

// Initialize enhanced smooth scroll
document.addEventListener("DOMContentLoaded", enhancedSmoothScroll);
