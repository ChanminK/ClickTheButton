function win() {
    presses = WIN_TARGET;
    updateProgress();

    showRarity("legendary", "YOU WIN");

    if (typeof showOutroWin === "function") showOutroWin();
}

let _chaosRunning = false;

function chaos() {
    if (_chaosRunning) return;
    _chaosRunning = true;
    showRarity("legendary", "CHAOS!");

    const tryCall = (fn, ...arge) => {
        try {
            if (typeof fn === "function") fn(...args);
        } catch (e) {
            console.error("[CHAOS] error: ", e);
        }
    };

    const steps = [
        () => tryCall(colorSwitch),
        () => tryCall(ytBackground),                    
        () => tryCall(screenSaver, 0.35, "multiply"),       
        () => tryCall(invertColor),                          
        () => tryCall(flipScreen, 60000),                   
        () => tryCall(multiButtons, 6),                    
        () => tryCall(randomCursor, 8000, 250),            
        () => tryCall(musicStart),                         
        () => tryCall(confettiExplosion),                    
        () => tryCall(emojiRain),                         
        () => tryCall(cameraShake),                        
        () => tryCall(buttonSwitch),                         
        () => tryCall(txtScramble),                         
        () => tryCall(msg),         
    ];

    const SPACING_MS = 300;
    let i = 0;
    (function runNext() {
        if (i >= steps.length) {_chaosRunning = false; return;}
        steps[i++]();
        setTimeout(runNext, SPACING_MS);
    })();
}

function calmDown() {
    document.querySelectorAll(".yt-bg").forEach(el => el.remove());
    document.querySelectorAll(".screensaver-overlay").forEach(el => el.remove());

    const root = document.documentElement;
    root.classList.remove("invert-on");
    root.style.filter = "";
    root.style.transform = "";

    document.body.style.cursor = "auto";

    try {
        if(typeof currentAudio !== "undefined" && currentAudio) {
            currentAudio.currentTime = 0;
        }
    } catch {}

    document.body.classList.remove("quake-shake");
    document.querySelectorAll(".quake-bubble").forEach(el => el.remove());

    document.querySelectorAll(".confetti-piece, .floor-confetti").forEach(el => el.remove());

    try {
        if(typeof emojiTimer !== "undefined" && emojiTimer) {
            clearInterval(emojiTimer);
            emojiTimer = null;
        }
        if (typeof emojiRainActive !== "undefined") emojiRainActive = false;
        if (typeof emojiCount !== "undefined") emojiCount = 0;
    } catch {}
    document.querySelectorAll(".emoji-drop").forEach(el => el.remove());

    document.querySelectorAll(".typed-msg").forEach(el => el.remove());

    try {
        document.querySelectorAll(`.btn[id^="decoy_"], .btn[data-real="false"]`).forEach(el => {
            if(el.if !== "clickBtn") el.remove();
        });

        const original = document.getElementById("clickBtn");
        if (original){
            original.classList.add("btn");
            original.setAttribute(window._multiButtons?.realAttr || "data-real", "true");
            original.onclick = null;
        }

        if (window._multiButtons) {
            window._multiButtons.active = false;
            window._multiButtons.targetTotal = 4;
        }
    } catch {}
}

let _selfDestructRunning = false;

function selfDestruct(countdown = 10) {
    if(_selfDestructRunning) return;
    _selfDestructRunning = true;

    showRarity("legendary", "SELF DESTRUCT");

    const overlay = document.getElementById("selfDestructOverlay");
    const counter = document.getElementById("sdCountdown");

    overlay.style.display = "grid";
    counter.textContent = countdown;

    const btn = document.getElementById("clickBtn");
    const prevDisabled = btn?.disabled;
    if (btn) btn.disabled = true;

    let remaining = countdown;
    const tick = setInterval(() => {
        remaining -= 1;
        counter.textContent = remaining;

        if (remaining <= 0) {
            clearInterval(tick);
            if (typeof showOutroLoss === "funciton") {
                showOutroLoss();
            } else {
                location.reload(); 
            }
        }
    }, 1000);

    window.addEventListener("beforeunload", () => {
        if (btn) btn.disabled = prevDisabled ?? false;
    }, { once: true});
}