// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const modal = document.getElementById('celebrationModal');
const closeModalBtn = document.getElementById('closeModal');
const attemptCounter = document.getElementById('attemptCounter');
const attemptCount = document.getElementById('attemptCount');
const pleadingMessage = document.getElementById('pleadingMessage');
const mainQuestion = document.getElementById('mainQuestion');
const noBtnText = document.getElementById('noBtnText');

// Track attempts and state
let attempts = 0;
let isNearNoButton = false;

// Funny messages based on attempts
const pleadingMessages = [
    "Please Didi... I promise I'll be good! 😇",
    "Come on Didi! You know you want to! 🥺",
    "I'll do all the dishes for a month! 🍽️",
    "Pretty please with a cherry on top! 🍒",
    "I'll even clean my room! 🧹 (maybe)",
    "You're the best Didi in the world! 💖",
    "I'll share my snacks with you! 🍫",
    "Fine, I'll stop asking for WiFi password! 📶",
    "I'll laugh at all your jokes! 😂",
    "Okay this is getting ridiculous now... 😅",
    "You're really testing my patience here! 😤",
    "DIDI PLEASEEEEE! 😭😭😭",
    "I'm not giving up! Never! 💪",
    "You know I'll keep asking forever! ♾️",
    "Just click YES already! It's right there! 👈"
];

const noBtnTexts = [
    "No",
    "Nope",
    "No way!",
    "Never!",
    "Not happening",
    "In your dreams",
    "Nice try",
    "Nah",
    "Absolutely not",
    "Keep dreaming",
    "Still no",
    "Really? No!",
    "NOPE!",
    "Try harder",
    "Just say YES!"
];

const questionTexts = [
    "Will you buy me a GPU? 🥺👉👈",
    "Pretty please? 🥺💖",
    "What about now? 🎮✨",
    "Changed your mind yet? 😊",
    "How about YES? 🎯",
    "Come on Didi! 🙏💎",
    "You know you want to! 😄",
    "Just say YES! 🚀",
    "Please please please? 🥺🥺🥺",
    "I really need this! 💻⚡",
    "You're the best Didi! 💖🎮",
    "One GPU please? 🎁",
    "Make me happy? 😊✨",
    "GPU = Happy me! 😄🎮",
    "YES is the answer! ✅💚"
];

// Function to toggle reason details
function toggleReason(element) {
    element.classList.toggle('expanded');
}

// Function to update messages based on attempts
function updateMessages() {
    if (attempts > 0) {
        attemptCounter.style.display = 'block';
        attemptCount.textContent = attempts;

        const messageIndex = Math.min(attempts - 1, pleadingMessages.length - 1);
        pleadingMessage.textContent = pleadingMessages[messageIndex];

        const btnTextIndex = Math.min(attempts - 1, noBtnTexts.length - 1);
        noBtnText.textContent = noBtnTexts[btnTextIndex];

        const questionIndex = Math.min(Math.floor(attempts / 2), questionTexts.length - 1);
        mainQuestion.textContent = questionTexts[questionIndex];
    }
}

// Function to create warning emoji near cursor
function createWarningEmoji(x, y) {
    const warnings = ['❌', '🚫', '⛔', '🙅‍♂️', '🙅‍♀️', '👎', '😤', '💢'];
    const warning = document.createElement('div');
    warning.textContent = warnings[Math.floor(Math.random() * warnings.length)];
    warning.style.position = 'fixed';
    warning.style.left = x + 'px';
    warning.style.top = y + 'px';
    warning.style.fontSize = '3rem';
    warning.style.pointerEvents = 'none';
    warning.style.zIndex = '9999';
    warning.style.animation = 'shake 0.3s ease';
    warning.style.filter = 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5))';

    document.body.appendChild(warning);

    // Fade out and remove
    setTimeout(() => {
        warning.style.transition = 'all 0.5s ease-out';
        warning.style.opacity = '0';
        warning.style.transform = 'translateY(-50px) scale(0.5)';
    }, 100);

    setTimeout(() => {
        warning.remove();
    }, 600);
}

// Function to move the No button away from cursor
function moveNoButton(e) {
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate distance from mouse to button center
    const distanceX = mouseX - btnCenterX;
    const distanceY = mouseY - btnCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Increased detection radius to 200px to make it completely untouchable
    if (distance < 200) {
        if (!isNearNoButton) {
            attempts++;
            updateMessages();
            createFloatingEmoji();
            // Show warning emoji near cursor
            createWarningEmoji(mouseX - 20, mouseY - 40);
        }

        // Calculate direction to move (opposite to mouse)
        const angle = Math.atan2(distanceY, distanceX);
        const moveDistance = 200 - distance;

        // Calculate new position with more dramatic movement
        const newX = -Math.cos(angle) * moveDistance * 1.5;
        const newY = -Math.sin(angle) * moveDistance * 1.5;

        // Apply transform with smooth transition
        noBtn.style.transform = `translate(${newX}px, ${newY}px) rotate(${Math.random() * 30 - 15}deg)`;
        noBtn.style.transition = 'transform 0.15s ease-out';

        isNearNoButton = true;
    } else if (isNearNoButton) {
        // Reset position when mouse moves away
        noBtn.style.transform = 'translate(0, 0) rotate(0deg)';
        isNearNoButton = false;
    }
}

// Function to create floating emojis
function createFloatingEmoji() {
    const emojis = ['✨', '💎', '🎮', '⚡', '🚀', '💻', '🎯', '💖', '😢', '🥺', '😭'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.left = Math.random() * window.innerWidth + 'px';
    emoji.style.top = window.innerHeight + 'px';
    emoji.style.fontSize = (Math.random() * 30 + 20) + 'px';
    emoji.style.pointerEvents = 'none';
    emoji.style.zIndex = '999';
    emoji.style.transition = 'all 3s ease-out';

    document.body.appendChild(emoji);

    // Animate upwards
    setTimeout(() => {
        emoji.style.top = '-100px';
        emoji.style.opacity = '0';
        emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
    }, 100);

    // Remove after animation
    setTimeout(() => {
        emoji.remove();
    }, 3100);
}

// Function to create floating particles
function createParticle() {
    const particles = document.querySelector('.particles');
    const particle = document.createElement('div');
    particle.textContent = '✨';
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';

    particles.appendChild(particle);
}

// Function to create confetti
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    const colors = ['#f093fb', '#f5576c', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = '0.8';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear infinite`;
        confetti.style.animationDelay = Math.random() * 2 + 's';

        confettiContainer.appendChild(confetti);
    }

    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(600px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Function to show celebration
function celebrate() {
    modal.style.display = 'block';

    // Create confetti
    createConfetti();

    // Create multiple floating emojis
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingEmoji();
        }, i * 100);
    }

    // Play a fun animation on the modal
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'none';
    setTimeout(() => {
        modalContent.style.animation = 'bounceIn 0.5s ease';
    }, 10);
}

// Event Listeners
document.addEventListener('mousemove', moveNoButton);

// Touch support for mobile
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    moveNoButton(touch);
});

yesBtn.addEventListener('click', () => {
    celebrate();
});

// Prevent No button from being clicked
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    attempts++;
    updateMessages();

    // Move button away dramatically
    const randomX = (Math.random() - 0.5) * 400;
    const randomY = (Math.random() - 0.5) * 400;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 720}deg)`;

    // Create multiple emojis
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFloatingEmoji(), i * 100);
    }
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Add random twinkling stars
function createTwinklingStar() {
    const star = document.createElement('div');
    star.textContent = '✨';
    star.style.position = 'fixed';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.fontSize = (Math.random() * 15 + 10) + 'px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '0';
    star.style.animation = 'twinkle 3s infinite';
    star.style.animationDelay = Math.random() * 3 + 's';

    document.querySelector('.stars').appendChild(star);
}

// Create initial stars
for (let i = 0; i < 15; i++) {
    createTwinklingStar();
}

// Add hover effect to Yes button
yesBtn.addEventListener('mouseenter', () => {
    yesBtn.style.animation = 'pulse 0.5s ease-in-out';
});

yesBtn.addEventListener('animationend', () => {
    yesBtn.style.animation = '';
});

// Make the No button shake when hovered (if it can be reached!)
noBtn.addEventListener('mouseenter', () => {
    noBtn.style.animation = 'shake 0.3s ease';
});

noBtn.addEventListener('animationend', () => {
    noBtn.style.animation = '';
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        celebrate();
    }
});

// Initialize particles
for (let i = 0; i < 20; i++) {
    createParticle();
}

// Periodically create floating emojis
setInterval(() => {
    if (Math.random() > 0.7) {
        createFloatingEmoji();
    }
}, 3000);
