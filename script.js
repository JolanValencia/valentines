const pages = {
  page1: document.getElementById("page1"),
  page2: document.getElementById("page2"),
  page3: document.getElementById("page3"),
  finalPage: document.getElementById("finalPage")
};

const catchBtn = document.getElementById("catchBtn");
const envelope = document.getElementById("envelope");
const heartsBurst = document.getElementById("heartsBurst");
const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");
const toPage3 = document.getElementById("toPage3");
const toFinal = document.getElementById("toFinal");
const backTo1 = document.getElementById("backTo1");
const backTo2 = document.getElementById("backTo2");
const backTo3 = document.getElementById("backTo3");
const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");
const galleryImages = Array.from(document.querySelectorAll(".memory"));

let moveCount = 0;
const positions = [
  { x: 18, y: 68 },
  { x: 78, y: 72 },
  { x: 25, y: 33 },
  { x: 70, y: 42 },
  { x: 50, y: 58 }
];

function showPage(pageKey) {
  Object.values(pages).forEach((page) => page.classList.remove("active"));
  pages[pageKey].classList.add("active");
}

function spawnHearts() {
  heartsBurst.innerHTML = "";
  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = ["💖", "💗", "💕", "💘"][Math.floor(Math.random() * 4)];
    heart.style.left = `${5 + Math.random() * 90}%`;
    heart.style.animationDelay = `${Math.random() * 1.4}s`;
    heart.style.fontSize = `${1 + Math.random() * 1.3}rem`;
    heartsBurst.appendChild(heart);
  }
}

catchBtn.addEventListener("mouseenter", () => {
  if (moveCount >= positions.length) return;

  const pos = positions[moveCount];
  catchBtn.style.left = `${pos.x}%`;
  catchBtn.style.top = `${pos.y}%`;
  moveCount += 1;

  if (moveCount === 5) catchBtn.classList.add("final-move");
});

catchBtn.addEventListener("click", () => {
  showPage("page2");
});

function openLetter() {
  envelope.classList.add("open");
  spawnHearts();
  letterModal.classList.remove("hidden");
  music1.play().catch(() => {});
}

envelope.addEventListener("click", openLetter);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") openLetter();
});

closeLetter.addEventListener("click", () => {
  letterModal.classList.add("hidden");
});

backTo1.addEventListener("click", () => {
  letterModal.classList.add("hidden");
  showPage("page1");
});

backTo2.addEventListener("click", () => {
  showPage("page2");
  music2.pause();
  music2.currentTime = 0;
  music1.play().catch(() => {});
});

backTo3.addEventListener("click", () => {
  showPage("page3");
  music2.play().catch(() => {});
});

toPage3.addEventListener("click", () => {
  letterModal.classList.add("hidden");
  showPage("page3");
  revealGallery();
  music1.pause();
  music1.currentTime = 0;
  music2.play().catch(() => {});
});

function revealGallery() {
  galleryImages.forEach((img, index) => {
    const tilt = index % 2 === 0 ? -7 : 7;
    img.style.setProperty("--tilt", `${tilt}deg`);
    setTimeout(() => {
      img.classList.add("show");
    }, 900 * index);
  });
}

toFinal.addEventListener("click", () => {
  showPage("finalPage");
  music2.pause();
  music2.currentTime = 0;
});