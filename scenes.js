( function () {
    const sceneLayer = document.getElementById("sceneLayer");
    const sceneIntro = document.getElementById("sceneIntro");
    const introTextEl = document.getElementById("introText");
    const introHint = document.getElementById("introHint");
    const sfxMail = document.getElementById("sfxMail");

    const sceneTable = document.getElementById("sceneTable");
    const letterHotspot = document.getElementById("letterHotspot");
    const letterModal = document.getElementById("letterModal");
    const letterText = document.getElementById("letterText");
    const letterOk = document.getElementById("letterOk");

    function setScene(mode) {
        document.body.setAttribute("data-scene", mode);

        if (mode === "intro" || mode === "outro") {
            sceneLayer.style.display = "grid";
        } else {
            sceneLayer.style.display = "none";
        }
    }

    function typeFast(el, text, cps = 20) {
        return new Promise((resolve) => {
            el.textContent = "";
            let i = 0;
            const interval = Math.max(10, Math.round(1000/cps));
            const timer = setInterval(() => {
                el.textContent = text.slice(0, i + 1);
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    resolve();
                }
            }, interval);
        });
    }

    async function startIntro() {
        setScene("intro");

        sceneIntro.style.display = "grid";
        sceneTable.style.display = "none";
        letterModal.style.display = "none";
        introHint.style.display = "none";

         const line1 = "You're just being a chill guy one day...";
        await typeFast(introTextEl, line1, 35); 

        await new Promise((r) => setTimeout(r, 3000)); 
        introHint.style.display = "block";

        await waitForEnter();

        try {
            sfxMail.currentTime = 0;
            await sfxMail.onplay();
        } catch {}

        await waitForEnter();

        await showTableWithLetter(
            "YOU MUST PRESS THIS BUTTON 100 TIMES... OR ELSE",
            "OK",
            startGame
        );
    }

    function waitForEnter() {
    return new Promise((resolve) => {
      const handler = (e) => {
        if (e.key === "Enter") {
          window.removeEventListener("keydown", handler, true);
          resolve();
        }
      };
      window.addEventListener("keydown", handler, true);
    });
  }

  function showTableWithLetter(text, btnLabel, onOk) {
    return new Promise((resolve) => {

        sceneIntro.style.display = "none";
        sceneTable.style.display = "grid";

        const openOnce = () => {
            letterHotspot.removeEventListener("click", openOnce);
            letterText.textContent = text;
            letterOk.textContent = btnLabel;
            letterModal.style.display = "grid";

            const onClick = () => {
                letterOk.removeEventListener("click", onClick);
                letterModal.style.display = "none";
                if (typeof onOk === "function") onOk();
                resolve();
            };
        letterOk.addEventListener("click", onClick, { once: true });
      };

      letterHotspot.addEventListener("click", openOnce, { once: true });
    });
  }

  function startGame() {
    sceneTable.style.display = "none";
    sceneIntro.style.display = "none";
    sceneLayer.style.display = "none";
    setScene("game");
  }

  window.showOutroWin = async function showOutroWin() {
    setScene("outro");

    sceneLayer.style.display = "grid";
    sceneIntro.style.display = "none";
    sceneTable.style.display = "grid";

    await showTableWithLetter(
        "Great job on pressing that button, hope it didn't cause any problems.\n\nHere's your money:",
        "Collect",
        () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
            restartToIntro();
        }
    );
}

window.showOutroLoss = async function showOutroLoss() {
    setScene("outro");
    sceneLayer.style.display = "grid";
    sceneIntro.style.display = "none";
    sceneTable.style.display = "grid";

    await showTableWithLetter(
      "Why did you fail? Now you can't get any money :/\n\nWell, I guess I can give you this:",
      "Consolation Prize",
      () => {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        restartToIntro();
      }
    );
  };

  function restartToIntro() {
    
    location.reload();
  }

  window.addEventListener("DOMContentLoaded", () => {
    setScene("intro");
    sceneLayer.style.display = "grid";
    startIntro();
  });
})();