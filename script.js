// ===================================================================
// DYNAMIC FEATURES: TYPING, PARTICLES, SCROLL, PROJECT LOADING, AOS
// ===================================================================

// --- 1. PROJECT DATA (Hardcoded for simplicity and performance) ---
const projectsData = [
    {
        "title": "Automated AWS Server Patching Pipeline (DevOps)",
        "description": "Developed a fully automated, agentless patching solution for EC2 instances using AWS Systems Manager (SSM) Patch Manager and Lambda functions, resulting in a 70% reduction in manual patch deployment time and achieving a 99.5% patch compliance rate.",
        "tech": ["AWS EC2", "AWS SSM", "AWS Lambda", "IAM", "Shell Scripting", "CloudWatch"],
        "link": "https://github.com/Lakshmanan1996/aws-patch-automation-repo",
        "image_path": "./assets/images/project_aws_patch_diagram.png"
    },
    {
        "title": "MECM/SCCM Task Sequence Migration and Optimization",
        "description": "Led the migration of Windows 10/11 operating system deployment (OSD) task sequences to a modern, unified environment. Optimized boot image size and reduced deployment failures by 25% through meticulous driver package management and PowerShell pre-flight checks.",
        "tech": ["MECM (SCCM)", "PowerShell", "Windows OSD", "Driver Management", "SQL (SCCM DB)"],
        "link": "https://github.com/Lakshmanan1996/sccm-ts-scripts",
        "image_path": "./assets/images/project_sccm_ts.png"
    },
    {
        "title": "Infrastructure as Code (IaC) for Staging Environment",
        "description": "Created repeatable, scalable infrastructure for a staging environment on AWS using Terraform. Deployed a VPC, public/private subnets, Security Groups, and two auto-scaling EC2 instances, ensuring consistency across development life cycles.",
        "tech": ["Terraform", "AWS VPC", "AWS EC2", "Auto Scaling", "GitHub Actions", "Security Groups"],
        "link": "https://github.com/Lakshmanan1996/terraform-aws-staging",
        "image_path": "./assets/images/project_terraform_aws.png"
    },
    {
        "title": "Containerized Application Deployment with Docker and Jenkins",
        "description": "Implemented a CI/CD pipeline in Jenkins to build, test, and deploy a simple web application into Docker containers. Configured webhooks for automatic build triggering on code commit, reducing deployment latency to under 5 minutes.",
        "tech": ["Docker", "Jenkins", "Git", "DevOps", "Linux", "CI/CD"],
        "link": "https://github.com/Lakshmanan1996/jenkins-docker-cicd",
        "image_path": "./assets/images/project_jenkins_docker.png"
    }
];

// --- 2. TYPING EFFECT LOGIC ---
const typingTextElement = document.querySelector('.typing-text');
const textToType = "Cloud Engineer";
const TYPING_SPEED = 50;
const BACK_SPEED = 25;
const PAUSE_DELAY = 1500;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingTextElement) return;

    const currentText = textToType;
    if (!isDeleting) {
        if (charIndex < currentText.length) {
            typingTextElement.textContent += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, TYPING_SPEED);
        } else {
            isDeleting = true;
            setTimeout(typeEffect, PAUSE_DELAY);
        }
    } else {
        if (charIndex > 0) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, BACK_SPEED);
        } else {
            isDeleting = false;
            setTimeout(typeEffect, TYPING_SPEED);
        }
    }
}
if (typingTextElement) {
    typeEffect();
}


// --- 3. MAIN DOM CONTENT LOADED LOGIC (Project Loading, Menu, AOS) ---
document.addEventListener('DOMContentLoaded', () => {

    // A. Project Card Rendering
    const projectList = document.getElementById('project-list');
    if (projectList) {
        projectsData.forEach((project, index) => {
            // Create Tech Stack Spans
            const techSpans = project.tech.map(t => `<span>${t}</span>`).join('');
            
            // Construct the full HTML for one card
            const cardHTML = `
                <div class="project-card" data-aos="zoom-in" data-aos-delay="${500 + (index * 100)}">
                    <div class="project-header">
                        <i class="fas fa-cubes"></i>
                        <h3>${project.title}</h3>
                    </div>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${techSpans}
                    </div>
                    <a href="${project.link}" class="view-repo-btn" target="_blank">View Repository <i class="fab fa-github"></i></a>
                </div>
            `;
            
            projectList.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // B. Mobile Menu Toggle Logic
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('header .navbar');
    const navLinks = document.querySelectorAll('header .navbar ul li a');

    const toggleMenu = () => {
        navbar.classList.toggle('nav-toggle');
        menuBtn.classList.toggle('fa-bars');
        menuBtn.classList.toggle('fa-times');
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('nav-toggle')) {
                toggleMenu();
            }
        });
    });


    // C. AOS INITIALIZATION (Set to REPEAT on scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            delay: 200,      // General delay for all animations
            duration: 800,   // How long the animation lasts
            once: false,     // 💥 KEY FIX: Animation happens every time the element comes into view
            mirror: true,    // Resets the animation when scrolling out of view
        });
    }


    // D. Load Particles.js background
    // NOTE: Ensure your HTML has <div id="particles-js"></div>
    if (typeof particlesJS !== 'undefined') {
        // You may need to update the path to your config file if you're not using the default one
        particlesJS.load("particles-js", "./assets/js/app.js", () => {
             // Reverted to your original app.js path
            console.log("particles.js config loaded");
        });
    }
});


// --- 4. SCROLL EVENT FOR ACTIVE LINK HIGHLIGHT ---
const sections = document.querySelectorAll(".section");
const navLinksArray = document.querySelectorAll(".navbar ul li a"); 

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        // Offset by ~100px to account for the fixed header
        const sectionTop = section.offsetTop - 100; 
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    // Check for the "home" section specifically
    if (window.scrollY < document.getElementById('about').offsetTop - 100) {
        current = "home";
    }

    navLinksArray.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// --- 5. jQuery Ready Function for Click Handlers ---
$(document).ready(function() {
    
    // Smooth scrolling for hash links (NAV LINKS & FOOTER LINKS)
    $('a[href*="#"]').on('click', function (e) {
        // Only prevent default if the link is a section ID
        if ($(this).attr('href').startsWith('#') && $(this).attr('href').length > 1) {
            e.preventDefault();
            
            // Get target position and adjust for fixed header (70px)
            const targetId = $(this).attr('href');
            const targetOffset = $(targetId).offset().top - 70;
            
            $('html, body').animate({
                scrollTop: targetOffset,
            }, 500, 'linear');
        }
    });

    // Scroll-to-Top Button Toggle and Animation
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });
    
    $('#scroll-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});
