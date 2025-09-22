let presses = 0;
const WIN_TARGET = 100;

const btn = document.getElementById("clickBtn");
const progressFill = document.getElementById("progressFill");

btn.addEventListener("click", () => {
    if (presses < WIN_TARGET) {
        presses+=1;
        updateProgress();
    }

    if (presses === 1) alert("Do you know what you've started?");
    if (presses == WIN_TARGET) alert("YOU WIN!!!");
});

function updateProgress() {
    const pct = (presses / WIN_TARGET) * 100;
    progressFill.style.width = pct + "%";
}