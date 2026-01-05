// 1. Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      createFloatingHearts();
    }, 500);
  }, 1500); // Fake load time
});

// 2. Navigation
function nextSection(id) {
  // Hide current
  const current = document.querySelector('.active-screen');
  current.classList.remove('active-screen');
  current.classList.add('hidden-screen');

  // Show next
  const next = document.getElementById(id);
  next.classList.remove('hidden-screen');
  next.classList.add('active-screen');
}

// 3. Flip Cards
function flipCard(card) {
  card.classList.toggle('flipped');
}

// 4. Background Floating Hearts
function createFloatingHearts() {
  const container = document.getElementById('hearts-container');
  const symbols = ['❤️', '💖', '🌸', '✨', '🎀'];
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5-10s
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    container.appendChild(heart);
    
    // Cleanup
    setTimeout(() => {
      heart.remove();
    }, 10000);
  }, 800);
}

// 5. The Love Game
let loveScore = 0;
const MAX_SCORE = 100;
const PUMP_STEP = 10; // 10 clicks to win

function pumpLove() {
  if (loveScore >= MAX_SCORE) return;

  loveScore += PUMP_STEP;
  if (loveScore > MAX_SCORE) loveScore = MAX_SCORE;

  updateProgressBar();
  createHeartExplosion();

  if (loveScore === MAX_SCORE) {
    setTimeout(() => {
      alert("❤️ LOVE METER FULL! UNLOCKING... ❤️");
      nextSection('letter');
      startConfetti();
    }, 500);
  }
}

function updateProgressBar() {
  const bar = document.getElementById('love-bar');
  const text = document.getElementById('progress-text');
  bar.style.width = loveScore + '%';
  text.innerText = loveScore + '%';
}

function createHeartExplosion() {
  const btn = document.getElementById('pump-btn');
  const rect = btn.getBoundingClientRect();
  
  for(let i=0; i<5; i++) {
    const heart = document.createElement('div');
    heart.innerText = '💖';
    heart.style.position = 'fixed';
    heart.style.left = rect.left + rect.width/2 + 'px';
    heart.style.top = rect.top + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '20px';
    heart.style.transition = 'all 0.8s ease';
    
    document.body.appendChild(heart);

    // Random direction
    const x = (Math.random() - 0.5) * 100;
    const y = -Math.random() * 100 - 50;

    setTimeout(() => {
      heart.style.transform = `translate(${x}px, ${y}px)`;
      heart.style.opacity = '0';
    }, 10);

    setTimeout(() => heart.remove(), 800);
  }
}

// 6. Reason Generator
const reasons = [
  "U were there during my all major phases of life... U r the safest place for me like my home.",
  "U motivate me to become the best version of myself... U complete me in every way.",
  "U have the purest soul... most selfless person... U r so creative... U r a genius baby.",
  "U handle every difficult situation... patience to listen... U have the bestest dreams.",
  "U r the perfect combination of classy, sassy and the sexiest... best voice, hearing ur voice heals my heart."
];
let reasonIndex = 0;

function nextReason() {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  document.getElementById('reason-text').innerText = reasons[reasonIndex];
  document.getElementById('reason-num').innerText = reasonIndex + 1;
}

// 7. Confetti (Simple version)
function startConfetti() {
  setInterval(() => {
    const confetti = document.createElement('div');
    confetti.innerText = ['🎉', '💖', '✨'][Math.floor(Math.random()*3)];
    confetti.style.position = 'fixed';
    confetti.style.top = '-20px';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.fontSize = '20px';
    confetti.style.animation = 'fall 3s linear';
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
  }, 100);
  
  // Define animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fall {
      to { transform: translateY(100vh) rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
