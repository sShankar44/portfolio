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

// Vertical display characters
const languages = [
    'J', 'A', 'V', 'A',' ',
    'P', 'Y', 'T', 'H', 'O', 'N',' ',
    'C', '+', '+',' ',
    'S', 'Q', 'L',' ',
    'H', 'T', 'M', 'L',' ',
    'C', 'S', 'S',' '
];

// Purple shades for the columns
const purpleShades = Array.from({ length: columns }, (_, i) => `hsl(${270 + i * (30 / columns)}, 100%, 50%)`);

// Animation speed (lower = slower)
const speed = 150; // Adjust this value for slower/faster animation

// Draw matrix effect
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Transparent black for fade effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '16px monospace'; // Font for the Matrix text

    drops.forEach((y, x) => {
        // Set unique purple color for each column
        ctx.fillStyle = purpleShades[x];

        // Display characters vertically
        const text = languages[y % languages.length];
        ctx.fillText(text, x * 20, y * 20);

        // Reset drop position to the top randomly
        if (y * 20 > canvas.height || Math.random() > 0.975) {
            drops[x] = 0;
        } else {
            drops[x]++; // Move downwards
        }
    });
}

// Overlay name in multiple languages
function overlayName() {
    // Names in different languages
    const names = {
        English: ' SIVA SHANKAR EPPALAPALLI',
        Hindi: ' सिवा शंकर एपलापल्ली',
        Telugu: ' శివ శంకర్ ఎప్పలపల్లి',
    };

    const languages = ['English', 'Hindi', 'Telugu'];
    const positions = [100, 200, 300];

    let frame = 0; // Animation frame counter

    function animateOverlay() {
        ctx.clearRect(0, 0, canvas.width, positions[0] + 50); // Clear overlay area

        languages.forEach((lang, index) => {
            ctx.fillStyle = `hsl(${(270 + frame + index * 40) % 360}, 100%, 50%)`; // Unique cycling purple color
            ctx.font = '25px monospace';
            ctx.fillText(`${lang}:`, 50, positions[index]); // Display the language name

            const translatedName = names[lang];
            translatedName.split('').forEach((char, charIndex) => {
                const x = 150 + charIndex * 20;
                const y = positions[index];
                const delay = charIndex * 150;

                setTimeout(() => {
                    ctx.fillStyle = `hsl(${(270 + frame + charIndex * 15) % 360}, 100%, 50%)`; // Cycling color for characters
                    ctx.fillText(char, x, y);
                }, delay);
            });
        });

        frame += 2; // Increment frame for color cycling
        setTimeout(animateOverlay, 3000); // Call animation function again after 3 seconds
    }

    animateOverlay(); // Start the animation loop
}

// Start animation with slower speed
setInterval(draw, speed);
setTimeout(overlayName, 2000);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / 20);
    drops.fill(0);

    // Recalculate purple shades for new column count
    purpleShades.length = Math.floor(canvas.width / 20);
    purpleShades.forEach((_, i) => (purpleShades[i] = `hsl(${270 + i * (30 / purpleShades.length)}, 100%, 50%)`));
});

