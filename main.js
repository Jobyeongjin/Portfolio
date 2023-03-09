const sliderImages = document.querySelectorAll('.slider-image');
const leftBtn = document.querySelector('#left-button');
const rightBtn = document.querySelector('#right-button');
const sliderContentWrapper = document.querySelector('.slider-content-wrapper');

const image0 = document.querySelector('.image0');
const image1 = document.querySelector('.image1');
const image2 = document.querySelector('.image2');

const darkModeToggleBtn = document.querySelector('.dark-mode-toggle-btn');

// dark mode
darkModeToggleBtn.addEventListener('click', () => {
  const body = document.querySelector('body');
  let moonIcon = darkModeToggleBtn.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    moonIcon.classList.replace('fa-regular', 'fa-solid');
  } else {
    document.body.classList.add('dark-mode');
    moonIcon.classList.replace('fa-solid', 'fa-regular');
  }
});

// go to github
image0.addEventListener('click', () => {
  window.open('https://github.com/Jobyeongjin/KDTFinalPJT');
});
image1.addEventListener('click', () => {
  window.open('https://github.com/Jobyeongjin/GoldenTicket');
});
image2.addEventListener('click', () => {
  window.open('https://github.com/Jobyeongjin');
});

// click slider
let currentImage = 0;
const handleSlideChange = (step) => {
  currentImage += step;

  if (currentImage < 0) {
    currentImage = sliderImages.length - 1;
  } else if (currentImage >= sliderImages.length) {
    currentImage = 0;
  }
  sliderContentWrapper.scrollLeft = sliderImages[currentImage].offsetLeft;
};

leftBtn.addEventListener('click', () => {
  handleSlideChange(-1);
});

rightBtn.addEventListener('click', () => {
  handleSlideChange(1);
});

// scroll slider
sliderContentWrapper.addEventListener('scroll', () => {
  const imageWidth = document.querySelectorAll('.slider-image')[0].offsetWidth;

  currentImage = Math.round(sliderContentWrapper.scrollLeft / imageWidth);
});

// auto slider
function autoSlider() {
  currentImage += 1;

  if (currentImage < 0) {
    currentImage = sliderImages.length - 1;
  } else if (currentImage >= sliderImages.length) {
    currentImage = 0;
  }
  sliderContentWrapper.scrollLeft = sliderImages[currentImage].offsetLeft;
}
setInterval(autoSlider, 5000);

// hide sections
let observer = new IntersectionObserver((e) => {
  e.forEach((section) => {
    if (section.isIntersecting) {
      section.target.style.opacity = 1;
    } else {
      section.target.style.opacity = 0;
    }
  });
});
const sectionAbout = document.querySelector('#about');
const sectionVisual = document.querySelector('#visual');
const sectionContact = document.querySelector('#contact');
observer.observe(sectionAbout);
observer.observe(sectionVisual);
observer.observe(sectionContact);

// go to sections
function goToScroll(id) {
  let location = document.querySelector('#' + id).offsetTop;
  window.scrollTo({ top: location - 100, behavior: 'smooth' });
}

// go to top
function goToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// top button
const topBtn = document.querySelector('.top-btn');
const scrollBtnDisplay = function () {
  window.scrollY > window.innerHeight
    ? topBtn.classList.add('show')
    : topBtn.classList.remove('show');
};
window.addEventListener('scroll', scrollBtnDisplay);

// Canvas
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;

let canvasWidth;
let canvasHeight;
let particles;

function init() {
  canvasWidth = document.body.clientWidth;
  canvasHeight = document.body.clientHeight;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  // 파티클 생성
  particles = [];
  const TOTAL = canvasWidth / 10;

  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const radius = randomNumBetween(1, 5);
    const vy = randomNumBetween(0.5, 1);
    const particle = new Particle(x, y, radius, vy);
    particles.push(particle);
  }
}

// Canvas / Particle
class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.00125;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  }
}

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

// Canvas / Animation
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(1, 5);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

window.addEventListener('load', () => {
  init();
  animate();
});
window.addEventListener('resize', () => {
  init();
});
