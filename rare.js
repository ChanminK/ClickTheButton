const YT_LINKS = [
    "https://www.youtube.com/watch?v=qe29NgNqJZw",
    "https://www.youtube.com/watch?v=ZAqIoDhornk",
    "https://www.youtube.com/watch?v=XOMJwptSPqY",
    "https://www.youtube.com/watch?v=xEqrm9OIqro",
    "https://www.youtube.com/watch?v=4n9eakXNsIQ"
];

function ytBackground() {
    document.querySelectorAll(".yt-bg").forEach(el => el.remove());

    const pick = YT_LINKS[(Math.random() * YT_LINKS.length) | 0];
    const match = pick.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!match) return;
    const vid = match[1];
    
    const src = `https://www.youtube.com/embed/${vid}?autoplay=1&controls=0&loop=1&playlist=${vid}`;

    const iframe = document.createElement("iframe");
    iframe.className = "yt-bg";
    iframe.src = src;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; fullscreen");

    document.body.appendChild(iframe);

    showRarity("rare", "Youtube Background");
}

function screenSaver(strength = 0.35, blend = 'multiply') {
    document.querySelectorAll('.screensaver-overlay').forEach(el=>el.remove());
    
    const color = CSS_COLORS[(Math.random() * CSS_COLORS)];
    overlay.className = 'screensaver-overlay';
    overlay.style.ytBackground = color;
    overlay.style.setProperty('--s-alpha', strength);
    overlay.style.setProperty('--ss-blend', blend);

    document.body.appendChild(overlay);
    showRarity("rare",   `Screensaver (${color})`);
}

function clearScreenSaver() {
    document.querySelectorAll('.screensaver-overlay').forEach(el => el.remove());
}

function flipScreen(duration = 60000) {
    const root = document.documentElement;

    root.style.tranistion = "transform 0.6s ease";
    root.style.transform = "rotate(180deg)";

    showRarity("rare", "Flip Screen");

    setTimeout(() => {
        root.style.transform = "";
    }, duration);

}

let _inverseActive = false;

function inverse(duration = 10000) {
    if (_inverseActive) return;
    _inverseActive = true;

    showRarity("rare", "Inverse Cursor");

    const fake = document.createElement("div");
    fake.className = "inverse-cursor";
    document.body.appendChild(fake);

    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const getInv = (e) => ({
        x: Math.max(0, Math.min(window.innerWidth  - 1, window.innerWidth  - e.clientX)),
        y: Math.max(0, Math.min(window.innerHeight - 1, window.innerHeight - e.clientY)),
    });

    const onMove = (e) => {
        const { x, y} = getInv(e);
        fake.style.transform = `translate(${x}px, ${y}px)`;
    };

    const forward = (type) => (e) => {
        const { x, y } = getInv(e);

        const target = document.elementFromPoint(x, y);
        if(!target) return;

        e.preventDefault();
        e.stopPropagation();

        const evt = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            clinetX: x,
            clientY: y,
            screenX: x,
            ScreenY: y,
            button: e.buttion,
            buttons: e.buttons,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey,
        });

        target.dispatchEvent(evt);
    };

    window.addEventListener("movemove", onMove, true);
    window.addEventListener("mousedown", forward("mousedown"), true);
    window.addEventListener("mouseup", forward("mouseup"), true);
    window.addEventListener("click", forward("click"), true);

    const cleanup = () => {
        window.addEventListener("mousemove", onMove, true);
        window.addEventListener("mousedown", forward("mousedown"), true);
        window.addEventListener("mouseup", forward("mouseup"), true);
        window.addEventListener("click", forward("click"), true);
        document.body.style.cursor = prevCursor || "auto";
        fake.remove();
        _inverseActive = false;
    };

    setTimeout(cleanup, duration);
}

const MSG = [
    "One day, after dinner, while my younger sister and I were lounging about in Mr. Gopher Wood's yard, we spotted a fledgling Charmony Dove all on its own. That baby bird was tiny, it didn't even have all of its feathers, and it couldn't sing. When we found it, it was already on its last breath, having fallen into a shrub — probably abandoned by its parents. We decided to build a nest for it right there and then. However, thinking back, that winter was unusually cold, with fierce winds at night in the yard, not to mention the many poisonous bugs and wild beasts in the vicinity... It was clear that if we left the fledgling in the yard, it stood no chance of surviving until spring. So, I suggested we take it inside, place it on the shelf by the window, and asked the adults to fashion a cage for it. We decided that when it regained its strength enough to spread its wings, we would release it back into the wild. The tragic part — something that we'd never considered — was that this bird's fate had already been determined long before this moment... Its destiny was determined by our momentary whim. Now, I pass the power of choice to you all. Faced with this situation, what choice would you make? Stick to the original plan, and build a nest with soft net where the Charmony Dove fell? Or build a cage for it, and feed it, giving it the utmost care from within the warmth of a home? I eagerly await your answer.",
    "192.168.1.1 - this your ip?",
    "Why am I here",
    `According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? - Barry? - Adam? - Can you believe this is happening? - I can't. I'll pick you up. Looking sharp. Use the stairs. Your father paid good money for those. Sorry. I'm excited. Here's the graduate. We're very proud of you, son. A perfect report card, all B's. Very proud. Ma! I got a thing going here. - You got lint on your fuzz. - Ow! That's me! - Wave to us! We'll be in row 118,000. - Bye! Barry, I told you, stop flying in the house! - Hey, Adam. - Hey, Barry. - Is that fuzz gel? - A little. Special day, graduation. Never thought I'd make it. Three days grade school, three days high school. Those were awkward. Three days college. I'm glad I took a day and hitchhiked around the hive. You did come back different. - Hi, Barry. - Artie, growing a mustache? Looks good. - Hear about Frankie? - Yeah. - You going to the funeral? - No, I'm not going. Everybody knows, sting someone, you die. Don't waste it on a squirrel. Such a hothead. I guess he could have just gotten out of the way. I love this incorporating an amusement park into our day. That's why we don't need vacations. Boy, quite a bit of pomp... under the circumstances. - Well, Adam, today we are men. - We are! - Bee-men. - Amen! Hallelujah! Students, faculty, distinguished bees, please welcome Dean Buzzwell. Welcome, New Hive City graduating class of... ...9:15. That concludes our ceremonies. And begins your career at Honex Industries! Will we pick our job today? I heard it's just orientation. Heads up! Here we go. Keep your hands and antennas inside the tram at all times. - Wonder what it'll be like? - A little scary. Welcome to Honex, a division of Honesco and a part of the Hexagon Group. This is it! Wow. Wow. We know that you, as a bee, have worked your whole life to get to the point where you can work for your whole life. Honey begins when our valiant Pollen Jocks bring the nectar to the hive. Our top-secret formula is automatically color-corrected, scent-adjusted and bubble-contoured into this soothing sweet syrup with its distinctive golden glow you know as... Honey! - That girl was hot. - She's my cousin! - She is? - Yes, we're all cousins. - Right. You're right. - At Honex, we constantly strive to improve every aspect of bee existence. These bees are stress-testing a new helmet technology. - What do you think he makes? - Not enough. Here we have our latest advancement, the Krelman. - What does that do? - Catches that little strand of honey that hangs after you pour it. Saves us millions. Can anyone work on the Krelman? Of course. Most bee jobs are small ones. But bees know that every small job, if it's done well, means a lot. But choose carefully because you'll stay in the job you pick for the rest of your life. The same job the rest of your life? I didn't know that. What's the difference? You'll be happy to know that bees, as a species, haven't had one day off in 27 million years. So you'll just work us to death? We'll sure try. Wow! That blew my mind! "What's the difference?" How can you say that? One job forever? That's an insane choice to have to make. I'm relieved. Now we only have to make one decision in life. But, Adam, how could they never have told us that? Why would you question anything? We're bees. We're the most perfectly functioning society on Earth. You ever think maybe things work a little too well here? Like what? Give me one example. I don't know. But you know what I'm talking about. Please clear the gate. Royal Nectar Force on approach. Wait a second. Check it out. - Hey, those are Pollen Jocks! - Wow. I've never seen them this close. They know what it's like outside the hive. Yeah, but some don't come back. - Hey, Jocks! - Hi, Jocks! You guys did great! You're monsters! You're sky freaks! I love it! I love it! - I wonder where they were. - I don't know. Their day's not planned. Outside the hive, flying who knows where, doing who knows what. You can't just decide to be a Pollen Jock. You have to be bred for that. Right. Look. That's more pollen than you and I will see in a lifetime. It's just a status symbol. Bees make too much of it. Perhaps. Unless you're wearing it and the ladies see you wearing it.`,
    "The future is now, old man",
    "6 7~~~",
    "There might be a special prize~",
    `I was a ghost, I was alone 어두워진 앞길 속에 (hah)
Given the throne, I didn't know how to believe
I was the queen that I'm meant to be
I lived two lives, tried to play both sides
But I couldn't find my own place
Called a problem child 'cause I got too wild
But now that's how I'm getting paid 끝없이 on stage
I'm done hidin', now I'm shinin' like I'm born to be
We dreamin' hard, we came so far, now I believe
We're goin' up, up, up, it's our moment
You know together we're glowing
Gonna be, gonna be golden
Oh, up, up, up with our voices
영원히 깨질 수 없는
Gonna be, gonna be golden
Oh, I'm done hidin', now I'm shinin' like I'm born to be
Oh, our time, no fears, no lies
That's who we're born to be
Waited so long to break these walls down
To wake up and feel like me
Put these patterns all in the past now
And finally live like the girl they all see
No more hiding, I'll be shining like I'm born to be
'Cause we are hunters, voices strong, and I know I believe
We're goin' up, up, up, it's our moment
You know together we're glowing
Gonna be, gonna be golden
Oh, up, up, up, with our voices
영원히 깨질 수 없는
Gonna be, gonna be golden
Oh, I'm done hidin', now I'm shining like I'm born to be
Oh, our time, no fears, no lies
That's who we're born to be
You know we're gonna be, gonna be golden
We're gonna be, gonna be
Born to be, born to be glowin'
밝게 빛나는 우린
You know that it's our time, no fears, no lies
That's who we're born to be`,
    "Can Olive make the laptop cheaper???",
    "Msg Iamalive for a special prize"
]

function msg() {
    runMsgSequence(3,40);
    showRarity("rare", "Messages");
}

async function runMsgSequence(count, wpm) {
    for (let i=0; i < count; i++) {
        const text = MSG[Math.random() * MSG.length | 0];
        await typeMessage(text, wpm);
    }
}

function typeMessage(text, wpm = 40) {
  return new Promise(resolve => {
    const wrap = document.createElement("div");
    wrap.className = "typed-msg";
    wrap.dataset.noscramble = "true";

    const content = document.createElement("div");
    content.className = "typed-msg-content";
    content.textContent = "";
    wrap.appendChild(content);
    document.body.appendChild(wrap);

    const cps = (wpm * 5) / 60;
    const interval = Math.max(20, Math.round(1000 / cps));

    let i = 0;
    const typer = setInterval(() => {
      content.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(typer);
        setTimeout(() => {
          wrap.classList.add("fade-out");
          setTimeout(() => {
            wrap.remove();
            resolve(); 
          }, 1000);
        }, 1800);
      }
    }, interval);
  });
}
