// Create canvas and context
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('matrix').appendChild(canvas);

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix properties
const columns = Math.floor(canvas.width / 20);
const drops = Array(columns).fill(1);
const languages = ['1', '0', 'Java', 'Python', 'C++', 'SQL', 'HTML', 'CSS'];

// Draw matrix effect
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font = '16px monospace';

    drops.forEach((y, x) => {
        const text = languages[Math.floor(Math.random() * languages.length)];
        ctx.fillText(text, x * 20, y * 20);

        if (y * 20 > canvas.height || Math.random() > 0.975) {
            drops[x] = 0;
        }
        drops[x]++;
    });
}

// Overlay name in multiple languages
function overlayName() {
    const name = 'SIVA SHANKAR EPPALAPALLI';
    const languages = ['English', 'Hindi', 'Telugu'];
    const positions = [100, 200, 300];

    languages.forEach((lang, index) => {
        ctx.fillStyle = '#00ff00';
        ctx.font = '25px monospace';
        ctx.fillText(`${lang}:`, 50, positions[index]);

        name.split('').forEach((char, charIndex) => {
            setTimeout(() => {
                ctx.fillText(char, 150 + charIndex * 20, positions[index]);
            }, charIndex * 150);
        });
    });
}

// Start animation
setInterval(draw, 100);
setTimeout(overlayName, 2000);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / 20);
    drops.fill(1);
});
