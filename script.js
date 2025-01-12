// Create canvas and context
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('matrix').appendChild(canvas);

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix properties
const columns = Math.floor(canvas.width / 20); // Number of columns
const drops = Array(columns).fill(0); // Initial Y positions for each column
const languages = ['J', 'A', 'V', 'A', ' ', 'P', 'Y', 'T', 'H', 'O', 'N', ' ', 'C', '+', '+', ' ', 'S', 'Q', 'L', ' ', 'H', 'T', 'M', 'L', ' ', 'C', 'S', 'S', ' '];
const purpleShades = Array.from({ length: columns }, (_, i) => `hsl(${270 + i * (30 / columns)}, 100%, 50%)`);
const speed = 150; // Adjust this value for slower/faster animation

// Draw matrix effect
function drawMatrixEffect() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '16px monospace';

    drops.forEach((y, x) => {
        ctx.fillStyle = purpleShades[x];
        const text = languages[y % languages.length];
        ctx.fillText(text, x * 20, y * 20);

        if (y * 20 > canvas.height || Math.random() > 0.975) {
            drops[x] = 0;
        } else {
            drops[x]++;
        }
    });
}

// Overlay name in multiple languages
function animateOverlayName() {
    const names = {
        English: 'SIVA SHANKAR EPPALAPALLI',
        Hindi: 'सिवा शंकर एपलापल्ली',
        Telugu: 'శివ శంకర్ ఎప్పలపల్లి',
    };
    const languages = ['English', 'Hindi', 'Telugu'];
    const positions = [100, 200, 300];
    let frame = 0;

    function animateOverlay() {
        ctx.clearRect(0, 0, canvas.width, positions[0] + 50);

        languages.forEach((lang, index) => {
            ctx.fillStyle = `hsl(${(270 + frame + index * 40) % 360}, 100%, 50%)`;
            ctx.font = '25px monospace';
            ctx.fillText(`${lang}:`, 50, positions[index]);

            const translatedName = names[lang];
            translatedName.split('').forEach((char, charIndex) => {
                const x = 150 + charIndex * 20;
                const y = positions[index];
                const delay = charIndex * 150;

                setTimeout(() => {
                    ctx.fillStyle = `hsl(${(270 + frame + charIndex * 15) % 360}, 100%, 50%)`;
                    ctx.fillText(char, x, y);
                }, delay);
            });
        });

        frame += 2;
        setTimeout(animateOverlay, 3000);
    }

    animateOverlay();
}

// Handle window resize
function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / 20);
    drops.fill(0);

    purpleShades.length = drops.length;
    purpleShades.forEach((_, i) => {
        purpleShades[i] = `hsl(${270 + i * (30 / purpleShades.length)}, 100%, 50%)`;
    });
}

// Adjust canvas size dynamically on window resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Call on page load and resize
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


// Typing effect for About Me section
function startTypingEffect() {
    const aboutText = `
        Hi! I'm Siva Shankar Eppalapalli, a passionate software engineer with expertise in creating innovative solutions.
        I thrive on solving complex challenges, building impactful projects, and redefining research and development through BeMyZero0.
    `;
    const typingContainer = document.createElement('div');
    typingContainer.style.fontSize = '1.2rem';
    typingContainer.style.color = '#d8bfd8';
    typingContainer.style.fontFamily = "'Poppins', sans-serif";
    typingContainer.style.whiteSpace = 'pre-wrap';
    typingContainer.style.textAlign = 'center';

    const aboutSection = document.querySelector('#about');
    aboutSection.innerHTML = ''; // Clear existing content
    aboutSection.appendChild(typingContainer);

    let index = 0;

    function type() {
        if (index < aboutText.length) {
            typingContainer.innerHTML += aboutText.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}

// Trigger About Animation when visible
function observeAboutSection() {
    const aboutSection = document.querySelector('#about');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startTypingEffect();
                observer.disconnect();
            }
        });
    });

    observer.observe(aboutSection);
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    observeAboutSection();
    setInterval(drawMatrixEffect, speed);
    setTimeout(animateOverlayName, 2000);
    window.addEventListener('resize', handleResize);
});

document.querySelectorAll('a[href="#top"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Course Details Object
const courseDetails = {
    techniquesInResearch: "An exploration of methodologies for effective research in computer science.",
    fundamentalsOfCS: "Mathematical logic and coding principles fundamental to computer science.",
    systemAdmin: "Hands-on experience with Linux commands and securing systems.",
    virtualReality: "Creating immersive VR experiences using Unity and cutting-edge technologies.",
    interactionDesign: "Designing user-friendly and accessible interfaces for web and apps.",
    dataAnalytics: "Techniques for analyzing, interpreting, and visualizing large datasets.",
    machineLearning: "Development of predictive models and exploration of ML algorithms.",
    storytelling: "Effective data presentation through engaging dashboards and blogs.",
    softwareEngineering: "Applying modern practices to develop scalable software systems.",
    dbms: "Optimizing and managing databases for efficiency and scalability."
};

// Function to Show Course Details
function showCourseDetails(courseKey) {
    const modal = document.getElementById("educationModal");
    const modalContent = document.getElementById("educationModalDetails");
    const details = courseDetails[courseKey];

    if (details) {
        modalContent.innerHTML = `<p>${details}</p>`;
    } else {
        modalContent.innerHTML = `<p>Details not found for the selected course.</p>`;
    }

    modal.style.display = "flex"; // Display the modal
}

// Function to Close Modal
function closeEducationModal() {
    const modal = document.getElementById("educationModal");
    modal.style.display = "none"; // Hide the modal
}

// Close modal when clicking outside the modal content
document.getElementById("educationModal").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        closeEducationModal();
    }
});

// Close modal when clicking outside the modal content
document.getElementById("projectsModal").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        closeProjectsModal();
    }
});

// Project Details Object
const projectDetails = {
    matrixPortfolio: "An interactive personal portfolio with a Matrix-style animated background.",
    vrCampusTour: "A VR Campus Tour using Unity and Infinadeck, featuring unrestricted movement.",
    dataLake: "Integrated multiple databases into a data lake with querying capabilities.",
    dataDashboard: "Designed an interactive dashboard to visualize and interact with large datasets.",
    vehicleNav: "Developed real-time route calculation for vehicles with efficient navigation.",
    dataStory: "Created blogs that combine analytics with visual storytelling techniques.",
    gamerBot: "Built an intelligent chatbot delivering detailed gaming recommendations.",
    laundryApp: "Real-time notification system for campus laundry availability.",
};

// Function to Show Project Details
function showProjectDetails(key) {
    const modal = document.getElementById("projectsModal");
    const modalContent = document.getElementById("projectsModalDetails");

    // Check if key exists in projectDetails
    if (projectDetails[key]) {
        modalContent.innerHTML = `<p>${projectDetails[key]}</p>`;
    } else {
        modalContent.innerHTML = `<p>Details not found for the selected project.</p>`;
    }
    modal.style.display = "flex";
}

// Function to Close Project Modal
function closeProjectsModal() {
    const modal = document.getElementById("projectsModal");
    modal.style.display = "none";
}
