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
