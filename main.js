const marquee = document.querySelector(".marquee");
const content = marquee.innerHTML;

while (marquee.scrollWidth < window.innerWidth * 2) {
  marquee.innerHTML += content;
}

let pos = 0;

function animate() {
  pos -= 0.5;
  if (Math.abs(pos) >= marquee.scrollWidth / 2) {
    pos = 0;
  }
  marquee.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animate);
}

animate();

const track = document.querySelector(".track");
const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
let slidesPerView = getSlidesPerView();

function getSlidesPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 600) return 2;
  return 1;
}

function updateCarousel() {
  slidesPerView = getSlidesPerView();
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= slides.length - slidesPerView;
}

function animateNavButton(button) {
  button.classList.remove("is-animating");
  void button.offsetWidth; // força reflow
  button.classList.add("is-animating");
}

nextBtn.addEventListener("click", () => {
  if (index < slides.length - slidesPerView) {
    index++;
    updateCarousel();
    animateNavButton(nextBtn);
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
    animateNavButton(prevBtn);
  }
});

window.addEventListener("resize", () => {
  index = 0;
  updateCarousel();
});

updateCarousel();
