let presses = 0;
const WIN_TARGET = 100;

const WEIGHTS = {
    legendary: 1,
    rare: 5,
    uncommon: 10,
    common: 50
};

const EMOJI_ASSETS = [
    "assets/emoji1.jfif",
    "assets/emomji2.jfif",
    "assets/emomji3.jfif",
    "assets/emomji4.gif",
    "assets/emomji5.jfif",
]

let emojiRainActive = false;
let emojiCount = 0;
const EMOJI_MAX = 180;
let emojiTimer = null;

function pickRarityWeighted() {
    const total = WEIGHTS.legendary + WEIGHTS.rare + WEIGHTS.uncommon + WEIGHTS.common;
    const r = Math.random() * total;
    let acc = 0;

    acc += WEIGHTS.legendary;
    if (r < acc) return "legendary";

    acc += WEIGHTS.rare;
    if (r < acc) return "rare";

    acc += WEIGHTS.uncommon;
    if (r < acc) return "uncommon";

    acc += WEIGHTS.common;
    if (r < acc) return "common";

    return "common";
}

const CSS_COLORS = [
    "aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond",
  "blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue",
  "cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki",
  "darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen",
  "darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray",
  "dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold",
  "goldenrod","gray","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki",
  "lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow",
  "lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray",
  "lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine",
  "mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen",
  "mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite",
  "navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen",
  "paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple",
  "rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell",
  "sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal",
  "thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"
];

const btn = document.getElementById("clickBtn");
btn.classList.add("btn");

const progressFill = document.getElementById("progressFill");
const rarityCard = document.getElementById("rarityCard");
const rarityTierEl = document.getElementById("rarityTier");
const rarityNameEl = document.getElementById("rarityName");

const EVENT_POOLS = {
    common: [colorSwitch, buttonSwitch, txtScramble, emojiRain, cameraShake],
    uncommon: ["Music Start", "Confetti Explosion", "Duplicate Button", "Cursed Cursor", "Invert Colors"],
    rare: ["Youtube Background", "Screensaver", "180 Spin", "Matrix", "Messages"],
    legendary: ["YOU WIN", "CHAOS", "Self-Destruct"]
};


let _lastColor = "";
function colorSwitch() {
    let color;
    for (let i = 0; i < 5; i++) {
        color = CSS_COLORS[Math.floor(Math.random() * CSS_COLORS.length)];
        if (color !== _lastColor) break;
    }
    _lastColor = color;

    document.body.style.backgroundColor = color;
    showRarity("common", `Color Switch (${color})`);
}

function placeRandom(el, margin = 20) {
    const rect = el.getBoundingClientRect();
    const maxX = Math.max(0, window.innerWidth - rect.width - margin);
    const maxY = Math.max(0, window.innerHeight - rect.height - margin);
    const x = Math.floor(Math.random() * (maxX - margin + 1)) + margin;
    const y = Math.floor(Math.random() * (maxY - margin + 1)) + margin;
    el.style.left = x  + "px";
    el.style.top = y + "px";
}

function buttonSwitch() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(b => placeRandom(b));
    showRarity("common", "Button Switch")
}

function txtScramble() {
    const candidates = document.querySelectorAll("h1, h2, h3, p, span, div, button")

    const elements = Array.from(candidates).filter(el => {
        if (el.closest(".rarity-wrap")) return false;
        if (el.closest(".progress")) return false;

        if (el.dataset.noscramble === "true") return false;
        return true;
    });

    elements.forEach(el => {
        if (!el.dataset.origText) {
            el.dataset.origText = el.textContent;
        }
    });

    showRarity("common", "Text Scramble");

    const scrambleInterval = setInterval(() => {
        elements.forEach(el => {
            if (el.dataset.origText) {
                el.textContent = scrambleString(el.dataset.origText);
            }
        });
    }, 150);

    setTimeout(() => {
        clearInterval(scrambleInterval);
        elements.forEach(el => {
            if (el.dataset.origText) {
                el.textContent = el.dataset.origText;
                delete el.dataset.origText;
            }
        });
    }, 30*1000);
}

function scrambleString(str) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    return str
        .split("")
        .map(ch => (ch === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
        .join("")
}

function emojiRain() {
    if (!emojiRainActive) {
        emojiRainActive = true;
        showRarity("common", "Emoji Rain");
        startEmojiRainSpawner();
    } else {
        showRarity("common", "Emoji Rain (MORE!!!) ")
    }
}

function startEmojiRainSpawner() {
    const BASE_INTERVAL = 110;

    emojiTimer = setInterval(() => {
        if (emojiCount >= EMOJI_MAX) return;
        spawnEmojiDrop();
    }, BASE_INTERVAL);
}

function spawnEmojiDrop() {
    const img = document.createElement("img");
    img.className = "emoji-drop";
    img.src = EMOJI_ASSETS[Math.floor(Math.random() * EMOJI_ASSETS.length)];

    const size = randInt(28, 60);
    img.style.width = size + "px";
    img.style.height = size + "px";

    const left = randInt(0, Math.max(0, window.innerWidth - size));
    img.style.left = left + "px";

    const dur = randInt(7000, 13000);
    img.style.animationDuration = dur + "ms";

    const spinDir = Math.random() < 0.5 ? -1 : 1;
    img.style.setProperty("--sping", spinDir);

    document.body.appendChild(img);
    emojiCount+=1;

    img.addEventListener("animationend", () => {
        img.remove();
        emojiCount--;
  }, { once: true });
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function cameraShake() {

}

function showRarity(rarity, name) {
    rarityTierEl.className = "rarity_tier";
    rarityCard.classList.remove("show");

    const map = {
        common: {cls:"tier-common", label:"COMMON"},
        uncommon: {cls:"tier-uncommon", label:"UNCOMMON"},
        rare: {cls:"tier-rare", label:"RARE"},
        legendary: {cls:"tier-legendary", label:"LEGENDARY"}
    };
    const cfg = map[rarity] || map.common;

    rarityTierEl.classList.add(cfg.cls);
    rarityTierEl.textContent = cfg.label;
    rarityNameEl.textContent = name;

    requestAnimationFrame(() => {
        rarityCard.classList.add("show");
        setTimeout(() => rarityCard.classList.remove("show"), 1500);
    });
}

function updateProgress() {
    const pct = (presses / WIN_TARGET) * 100;
    progressFill.style.width = pct + "%";
}

function rollEvent() {
    const rarity = pickRarityWeighted();
    const pool = EVENT_POOLS[rarity];
    const choice = pool[Math.floor(Math.random() * pool.length)];

    if (typeof choice === "function") {
        choice();
        return null;
    } else {
        return { rarity, name: choice };
    }
}

const titleEl = document.getElementById("title");

btn.addEventListener("click", () => {
    if (presses < WIN_TARGET) {
        presses+=1;
        updateProgress();
    }

    if (presses === 1) {
        titleEl.textContent = "GET TO 100 CLICKS OR ELSE";
        alert("Do you know what you've started?");
    }

    try {
        const ev = rollEvent();
        if (ev) showRarity(ev.rarity, ev.name);
    } catch (e) {
        console.error("Event error:", e)
    }

    if (presses == WIN_TARGET) {
        alert("YOU WIN!!!");
    }

    const COOLDOWN_SEC = 10;
    btn.disabled = true;
    
    const originalLabel = btn.textContent;
    let remaining = COOLDOWN_SEC;
    btn.textContent = `Disabled (${remaining}s)`;  // <-- backticks

    const cdTimer = setInterval(() => {
    remaining -= 1;
    if (remaining > 0) {
        btn.textContent = `Disabled (${remaining}s)`; // <-- backticks
    } else {
        clearInterval(cdTimer);
        btn.disabled = false;
        btn.textContent = originalLabel;
    }
    }, 1000);
});
