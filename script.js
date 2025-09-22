let presses = 0;
const WIN_TARGET = 100;

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
const progressFill = document.getElementById("progressFill");
const rarityCard = document.getElementById("rarityCard");
const rarityTierEl = document.getElementById("rarityTier");
const rarityNameEl = document.getElementById("rarityName");

const EVENT_POOLS = {
    common: [evColorSwitch, "Button Switch", "Text Scramble", "Emoji Rain", "Shake effect"],
    uncommon: ["Music Start", "Confetti Explosion", "Duplicate Button", "Cursed Cursor", "Invert Colors"],
    rare: ["Youtube Background", "Screensaver", "180 Spin", "Matrix", "Messages"],
    legendary: ["YOU WIN", "CHAOS", "Self-Destruct"]
};


let _lastColor = "";
function evColorSwitch() {
    let color;
    for (let i = 0; i < 5; i++) {
        color = CSS_COLORS[Math.floor(Math.random() * CSS_COLORS.length)];
        if (color !== _lastColor) break;
    }
    _lastColor = color;

    document.body.style.backgroundColor = color;
    showRarity("common", `Color Switch (${color})`);
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
    const rarities = Object.keys(EVENT_POOLS);
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const name = EVENT_POOLS[rarity];
    const choice = pool[Math.floor(Math.random() * pool.length)];

    if (typeof choice === "function") {
        choice();
        return null;
    } else {
        return { rarity, name: choice };
    }
}


btn.addEventListener("click", () => {
    if (presses < WIN_TARGET) {
        presses+=1;
        updateProgress();
    }

    if (presses === 1) {
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
});
