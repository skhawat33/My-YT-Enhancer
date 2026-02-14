(function() {
    window.addEventListener("wheel", (e) => {
        // Sirf shorts page par kaam kare
        if (!window.location.pathname.includes('/shorts/')) return;
        // Check agar settings mein enabled hai
        if (window.ytSettings?.shortsVolume === false) return;

        // Check karein ke mouse video player ke upar hai ya nahi
        // YouTube Shorts mein player container ka selector aksar 'ytd-reel-video-renderer' ya '.video-stream' hota hai
        const isOverPlayer = e.target.closest('ytd-reel-video-renderer, .video-stream, #player-container');

        if (!isOverPlayer) return; // Agar mouse video ke upar nahi hai, to kuch mat karo (default scroll chalne do)

        const allVideos = document.querySelectorAll('video');
        let activeVideo = null;

        allVideos.forEach(v => {
            const rect = v.getBoundingClientRect();
            // Active video wahi hai jo screen par nazar aa rahi hai
            if (rect.top >= -100 && rect.top < window.innerHeight / 2) {
                activeVideo = v;
            }
        });
        
        if (activeVideo) {
            e.preventDefault(); // Default scroll ko roko kyunki mouse video par hai
            const step = 0.05;
            activeVideo.volume = Math.max(0, Math.min(1, activeVideo.volume + (e.deltaY < 0 ? step : -step)));
            showHUD(Math.round(activeVideo.volume * 100));
        }
    }, { passive: false });

    function showHUD(vol) {
        let hud = document.getElementById("v-hud-shorts") || (function() {
            const h = document.createElement('div');
            h.id = "v-hud-shorts";
            h.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:rgba(0,0,0,0.8); color:#00ffff; padding:20px 40px; border-radius:100px; z-index:99999; font-size:32px; border:2px solid #00ffff; pointer-events:none; transition: opacity 0.2s; font-family: sans-serif;";
            document.body.appendChild(h);
            return h;
        })();
        hud.textContent = `🔊 ${vol}%`;
        hud.style.opacity = "1";
        clearTimeout(window.sVT);
        window.sVT = setTimeout(() => hud.style.opacity = "0", 800);
    }
})();