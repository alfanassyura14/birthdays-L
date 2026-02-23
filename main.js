onload = () => {
  // Hide all sections except gift initially
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
      if (section.id !== 'gift-section') {
          section.classList.remove('active');
      } else {
          section.classList.add('active');
      }
  });

  // Keep the original flower logic if needed, but we control it now
};

function openGift() {
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) bgMusic.play();

  const giftBox = document.querySelector('.gift-box');
  giftBox.classList.add('open');
  
  // Confetti effect
  if (typeof confetti === 'function') {
      confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff4757', '#ffd32a', '#2ed573', '#1e90ff']
      });
  }

  setTimeout(() => {
    // Start allowing animations when gift is opened
    document.body.classList.remove("not-loaded");
    transitionSection('gift-section', 'collage-section');
    loadCollage();
  }, 2000);
}

function loadCollage() {
  const collage = document.getElementById('collage');
  const nextBtn = document.getElementById('next-to-flowers');
  
  // Clear any existing content
  collage.innerHTML = '';

  // Add a title for the collage
  const title = document.createElement('h2');
  title.className = 'collage-title';
  title.textContent = 'Our Memories';
  collage.appendChild(title);
  
  // Create a track for the scrolling effect
  const track = document.createElement('div');
  track.className = 'collage-track';
  
  // Create photo list (assuming 14 images as found)
  const images = [];
  for (let i = 1; i <= 14; i++) {
    images.push(`img/${i}.jpeg`);
  }

  // Clone images to ensure enough for seamless scrolling
  // Tripling instead of doubling for better coverage on large screens
  const allImages = [...images, ...images, ...images];
  
  allImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    track.appendChild(img);
  });

  collage.appendChild(track);

  // Show next button after a short delay
  setTimeout(() => {
    nextBtn.classList.remove('hidden');
    nextBtn.style.zIndex = '1000';
  }, 2000);
}

function showFlowers() {
  transitionSection('collage-section', 'flower-section');
}

function showLetter() {
  transitionSection('flower-section', 'letter-section');
}

function showInvite() {
  transitionSection('letter-section', 'invite-section');
}

function sendWhatsApp() {
  const message = encodeURIComponent("Iya alpan!");
  const phoneNumber = "6285159011402";
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

function transitionSection(fromId, toId) {
  const fromSection = document.getElementById(fromId);
  const toSection = document.getElementById(toId);
  
  fromSection.style.opacity = '0';
  setTimeout(() => {
      fromSection.classList.remove('active');
      toSection.classList.add('active');
      toSection.style.opacity = '0';
      toSection.style.display = 'flex';
      setTimeout(() => {
          toSection.style.opacity = '1';
          toSection.style.transition = 'opacity 1s ease';
      }, 50);
  }, 1000);
}
