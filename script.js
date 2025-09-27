let presses = 0;
const WIN_TARGET = 100;

const WEIGHTS = {
    legendary: 1,
    rare: 5,
    uncommon: 10,
    common: 50
};

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

// GENERAL FUNCTIONS
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
        addDestructTime(DESTRUCT_ADD_ON_CLICK);
    }

    if (!destructStarted) {
        destructStarted = true;
        destructInterval = setInterval(() => {
            destructRemaining = Math.max(0, destructRemaining -1);
            destructTimeEl.textContent = destructRemaining;

            if (destructRemaining === 0) {
                clearInterval(destructInterval);
                selfDestruct();
            }
        }, 1000)
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
    btn.textContent = `Disabled (${remaining}s)`;  

    const cdTimer = setInterval(() => {
    remaining -= 1;
    if (remaining > 0) {
        btn.textContent = `Disabled (${remaining}s)`; 
    } else {
        clearInterval(cdTimer);
        btn.disabled = false;
        btn.textContent = originalLabel;

        btn.classList.add("flash");
        btn.addEventListener("animationend", () => {
            btn.classList.remove("flash");
        }, { once: true});
    }
    }, 1000);
});


const destructTimeEl = document.getElementById("destructTime");
let destructRemaining = 30;
const DESTRUCT_ADD_ON_CLICK = 20;
let destructInterval = null;
let destructStarted = false;

function addDestructTime(sec) {
    destructRemaining += sec;
    destructTimeEl.textContent = destructRemaining;
}

function selfDestruct() {
    const overlay = document.createElement("div");
    overlay.className = "self-destruct-overlay";
    overlay.textContent = "GOODBYE";
    document.body.appendChild(overlay);

    setTimeout(() => {
        location.reload();
    }, 100);
}