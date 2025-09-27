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

const EMOJI_ASSETS = [
    "assets/emoji1.jfif",
    "assets/emoji2.jfif",
    "assets/emoji3.jfif",
    "assets/emoji4.gif",
    "assets/emoji5.jfif",
]

let emojiRainActive = false;
let emojiCount = 0;
const EMOJI_MAX = 180;
let emojiTimer = null;

// COMMON EVENTS
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
    showRarity("common", "Camera Shake");

    document.body.classList.add("quake-shake");

    const quakeAudio = new Audio("assets/earthquake.mp3")
    quakeAudio.volume = 0.9;
    quakeAudio.loop = true;
    quakeAudio.play().catch(() => {});

    const messages = [
        "EARTHQUAKE!",
        "AFTERSHOCK!",
        "HOLD ON!",
        "BRACE!",
        "RUMBLE!",
        "SEISMIC ACTIVITY!"
    ];

    let running = true;
    const spawnEveryMs = 22;
    const spawner = setInterval(() => {
        if (!running) return;
        spawnQuakeBubble(messages[randInt(0, messages.length - 1)]);
        if(Math.random() < 0.18) spawnQuakeBubble("EARTHQUAKE!", true);
    }, spawnEveryMs);

    function spawnQuakeBubble(text, big = false) {
        const b = document.createElement("div");
        b.className = "quake-bubble";
        b.textContent = text;

        const pad = 16;
        const x = randInt(pad, Math.max(pad, window.innerWidth - 180));
        const y = randInt(pad + 80, Math.max(pad + 80, window.innerHeight - 80));
        b.style.left = x + "px";
        b.style.top = y + "px";

        b.style.fontSize = big ? "28px" : randInt(14, 20) + "px";

        document.body.appendChild(b);
        b.addEventListener("animationend", () => b.remove(), { once: true });
    }

    setTimeout(() => {
        running = false;
        clearInterval(spawner);
        document.body.classList.remove("quake-shake");
        quakeAudio.pause();
        quakeAudio.currentTime = 0;
    }, 10 * 1000);
}