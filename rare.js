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

    showRarity?.("uncommon", "Youtube Background");

    setTimeout(() => iframe.remove(), duration);
}

function screenSaver() {
    const color = CSS_COLORS[(Math.random() * CSS_COLORS)]
}

function flipScreen() {
    // 180spin -> flipscreen
}
function matrix() {
    // matrix - okay i think i should change this
}

function msg() {
    // msg
}

