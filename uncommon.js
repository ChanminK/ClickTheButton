//EVENTS: musicStart, confettiExplosion, multiButtons, randomCursor, invertColor
const MUSIC_TRACKS = [
    { src: "assets/music/song1.mp3", title: "RICKROLL"},
    { src: "assets/music/song2.mp3", title: "MikuMiku"},
    { src: "assets/music/song3.mp3", title: "Iris Out"},
    { src: "assets/music/song4.mp3", title: "Big Shot"},
    { src: "assets/music/song5.mp3", title: "BANG BANG BANG"},
];

const PNGS = [
    { src: "assets/cursor1", title: "rock"},
    { src: "assets/cursor2", title: "cheese"},
    { src: "assets/cursor3", title: "amognus"},
    { src: "assets/cursor4", title: "dorito"},
    { src: "assets/cursor5", title: "sus"},
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

    const pick = MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)];
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
    piece.addEventListener("animationend", () => piece.remove(), { once: true});
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
    }, durationMs);
}

function confettiExplosion() {
    showRarity("uncommon", "Confetti Explosion");

    playOnce(POPPER_SFX, 0.95);
    setTimeout(() => playOnce(YAY_SFX, 0.9), 120);

    const btn = document.getElementById("clickBtn");
    if (!btn) return;

    const r = btn.getBoundingClientRect();
    const originX = r.left + r.width /2;
    const originY = r.top + r.height /2;

    const BURST_WAVES = 3;
    const PER_WAVE = 36;
    for (let w = 0; w < BURST_WAVES; w++) {
        setTimeout(() => {
            for (let i = 0; i < PER_WAVE; i++) spawnFlyingConfetti(originX, originY);
        }, w * 90);
    }

    spawnFloorConfettiLayer(60_000);
}

window._multiButtons = {
    active: false,
    targetTotal: 4,
    decoyClass: `btn-decoy`,
    realAttr: `data-real`,
}

function showTryAgainToast(msg = "try again~") {
    const t = document.createElement('div');
    t.className = 'now-playing-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => t.classList.remove('show'), 900);
    setTimeout(() => t.remove(), 1200);
}

function createDecoyButton() {
    const base = document.getElementById('clickBtn');
    if (!base) return null;

    const decoy = base.cloneNode(true);
    decoy.id = `decoy_${Date.now()}_${(Math.random()*1e5|0)}`;
    decoy.classList.add(window._multiButtons.decoyClass);
    decoy.setAttribute(window._multiButtons.realAttr, 'false');

    decoy.style.position = 'fixed';
    decoy.style.left = '-9999px';
    decoy.style.top = '-9999px';

    decoy.disabled = false;

    document.body.appendChild(decoy);
    return decoy;
}

function makeReal(btnEl) {
    const realAttr = window._multiButtons.realAttr;
    document.querySelectorAll('.btn').forEach(b => {
        b.setAttribute(realAttr, 'false');
        b.onclick = null;
        b.addEventListener('click', onFakeClick, { passive: true });
    });

    btnEl.setAttribute(realAttr, 'true');
    btnEl.onclick = null;
    btnEl.removeEventListener('click', onFakeClick);

    const original = document.getElementById('clickBtn');
    btnEl.addEventListener('click', (e) => {
        if (btnEl !== original) {
            original.click();
        }
    }, { passive: true });
}

function onFakeClick(e) {
    const isReal = e.currentTarget.getAttribute(window._multiButtons.realAttr) === 'true';
    if (!isReal) showTryAgainToast("try again~");
}

function reassignRandomReal() {
    const buttons = Array.from(document.querySelectorAll('.btn'));
    if (!buttons.length) return;
    const pick = buttons[(Math.random() * buttons.length)|0];
    makeReal(pick);
}

function scatterAllButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(b => placeRandom(b));
}

function multiButtons(total = 4) {
    window._multiButtons.active = true;
    window._multiButtons.targetTotal = Math.max(2, total);

    const original = document.getElementById('clickBtn');
    if (!original) return;

    original.classList.add('btn');
    if (!/absolute|fixed/i.test(getComputedStyle(original).position)) {
        original.style.position = 'fixed';
    }

    const exisitng = document.querySelectorAll('.btn').length;
    const needed = window._multiButtons.targetTotal - existing;
    
    for (let i=0; i < needed; i++) {
        const decoy = createDecoyButton();
        if (decoy) decoy.classList.add('btn');
    }

    scatterAllButtons();
    reassignRandomReal();
}

window.multiButtons = multiButtons;

function randomCursor(duration = 6000, interval = 500) {
    const original = document.body.style.cursor;

    let timer = setInterval(() => {
        const pick = PNGS[(Math.random() * PNGS.length) | 0];
        document.body.style.cursor = `url(${pick.src}), auto`
    }, interval);

    setTimeout(() => {
        clearInterval(timer);
        document.body.style.cursor = original || "auto";
    }, duration);

    showRarity("uncommon", "Random Cursor")
}

function invertColor() {
    const root = document.documentElement;
    const ON = 'invert-on';

    if (root.classList.contains(ON)) {
        root.classList.remove(ON);
        root.style.filter = '';
        showRarity("uncommon", "InvertColors: OFF");
    } else {
        root.classList.add(ON);
        root.style.filter = "invert(1) hue-rotate(180deg)";
        showRarirty("uncommon", "Invert Colors: ON");
    }
}

