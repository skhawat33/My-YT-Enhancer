// normal_yt.js
(function() {
    const log = (msg) => { if (typeof window.geminiLog === 'function') window.geminiLog(msg); };

    window.addEventListener("wheel", (e) => {
        if (window.location.pathname.includes('/shorts/') || window.ytSettings?.normalVolume === false) return;

        const video = document.querySelector("video");
        const isOverPlayer = e.target.closest("#movie_player, .ytd-player, .video-stream");

        if (video && isOverPlayer) {
            e.preventDefault();
            const sensitivity = 0.05;
            video.volume = Math.max(0, Math.min(1, video.volume + (e.deltaY < 0 ? sensitivity : -sensitivity)));
            updateNormalHUD(Math.round(video.volume * 100));
        }
    }, { passive: false });

    function updateNormalHUD(vol) {
        let hud = document.getElementById("yt-normal-volume-hud") || (function() {
            const h = document.createElement("div");
            h.id = "yt-normal-volume-hud";
            h.style.cssText = "position:fixed; top:15%; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.8); color:white; padding:12px 24px; border-radius:30px; font-size:22px; z-index:999999; pointer-events:none; border:1px solid #ff0000; transition: opacity 0.2s; font-family: sans-serif;";
            document.body.appendChild(h);
            return h;
        })();
        hud.textContent = `🔊 Volume: ${vol}%`;
        hud.style.opacity = "1";
        clearTimeout(window.normVolT);
        window.normVolT = setTimeout(() => { hud.style.opacity = "0"; }, 1000);
    }
})();