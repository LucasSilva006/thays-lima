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
