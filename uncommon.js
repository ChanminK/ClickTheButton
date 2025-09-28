//EVENTS: musicStart, confettiExplosion, multiButtons, randomCursor, invertColor
const MUSIC_TRACKS = [
    { src: "assets/music/song1.mp3", title: "RICKROLL"},
    { src: "assets/music/song2.mp3", title: "MikuMiku"},
    { src: "assets/music/song3.mp3", title: "Iris Out"},
    { src: "assets/music/song4.mp3", title: "Big Shot"},
    { src: "assets/music/song5.mp3", title: "BANG BANG BANG"},
];

let currentAudio = null;

function showNowPlaying(title) {
    const box = document.createElement("div");
    box.className = "now-playing-toast";
    box.textContent = `Now playing: ${title}`;
    document.body.appendChild(box);

    requestAnimationFrame(() => box.classList.add("show"));
    setTimeout(() => box.classList.remove("show"), 2200);
    setTimeout(() => box.remove(), 2800);
}


function musicStart() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }

    const pick = MUSIC_TRAKCS[Math.floor(Math.random() * MUSIC_TRACKS.length)];
    const audio = new Audio(pick.src);
    audio.loop = false;
    audio.volume = 1.0;

    audio.play().catch(() => {

    });

    currentAudio = audio;
    showRarity("uncommon", "Music Start");
    showNowPlaying(pick.title);

    audio.addEventListener("ended", () => {
        if (currentAudio === audio) currentAudio = null;
    }, { once: true});
}

function rand(min, max) { return Math.random() * (max-min) + min;}

const CONFETTI_COLORS = ["#ef4444","#f97316","#f59e0b","#22c55e","#06b6d4","#3b82f6","#a855f7","#ec4899","#10b981","#eab308"];

const POPPER_SFX = "assets/sfx/party_popper.mp3"
const YAY_SFX = "assets/sfx/yay.mp3"

function playOnce(src, vol=1) {
    const a = new Audio(src);
    a.volume = vol;
    a.play().catch(() =>{});
    a.addEventListener("ended", () => a.remove?.(), { once: true});
}

function spawnFlyingConfetti(x, y) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const color = CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0];
    piece.style.background = color;

    piece.style.width = `${rand(6,10)}px`;
    piece.style.height = `${rand(10,18)}px`;
    piece.style.borderRadius = Math.random() < 0.4 ? "50% 20% 50% 20%" : "2px";

    const angle = rand(-Math.PI, 0);
    const dist = rand(140, 280);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    piece.style.setProperty("--dx", `${dx}px`);
    piece.style.setProperty("--dy", `${dy}px`);
    piece.style.setProperty("--rot", `${rand(-540, 540)}deg`);
    piece.style.setProperty("--dur", `${rand(900, 1400)}ms`);

    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;

    document.body.appendChild(piece);
    piece.addEventListener("animationed", () => piece.remove(), { once: true});
}

function spawnFloorConfettiLayer(durationMs = 60_000) {
    const floorPieces = [];
    const count = Math.min(220, Math.floor(window.innerWidth / 6));

    for (let i=0; i < count; i++) {
        const f = document.createElement("div");
        f.className = "floor-confetti";
        const color = CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0];
        f.style.background = color;
        f.style.left =  `${rand(0, window.innerWidth)}px`;
        f.style.width = `${rand(5,10)}px`;
        f.style.height = `${rand(9,16)}px`;
        f.style.setProperty("--r", `${rand(-30,30)}deg`);
        document.body.appendChild(f);
        floorPieces.push(f);
    }

    setTimeout(() => {
        floorPieces.forEach(el => el.classList.add("fade-out"));
        setTimeout(() => floorPieces.forEach(el => el.remove()), 850)
    }, durationMS);
}

function confettiExplosion() {
    showRarity("uncommon", "Confetti Explosion");

    playOnce(POPPER_SFX, 0.95);
    setTimeout(() => playOnce(YAY_SFX, 0.9), 120);

    const btn = document.getElementById("clickBtn");
    const r = btn.getBoundingClientRect();
    const originX = r.left + r.width /2;
    const originY = r.top + r.height /2;

    const BURST_WAVES = 3;
    const PER_WAVE = 36;
    for (let w = 0; w < BURST_WAVES; w++) {
        setTimeout(() => {
            for (let i = 0; i < PER_WAVE; i++) spawnFloorConfetti(originX, originY);
        }, w * 90);
    }

    spawnFloorConfettiLayer(60_000);
}


function multiButtons() {
    
}

function randomCursor() {
    
}

function invertColor() {
    
}