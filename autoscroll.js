(function() {
    const log = (msg) => console.log(`%c[Gemini Force] ${msg}`, "color: #00ff00; font-weight: bold;");

    const findAndScroll = () => {
        if (window.ytSettings?.autoScroll === false) return;

        const allShorts = document.querySelectorAll('ytd-reel-video-renderer');
        let activeVideo = null;
        let activeContainer = null;

        allShorts.forEach(container => {
            const rect = container.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= 100) {
                activeVideo = container.querySelector('video');
                activeContainer = container;
            }
        });

        if (activeVideo && !activeVideo.paused) {
            activeVideo.loop = false; 

            if (activeVideo.duration > 0 && (activeVideo.duration - activeVideo.currentTime < 0.5)) {
                if (!activeVideo.dataset.scrolled) {
                    activeVideo.dataset.scrolled = "true";
                    log("Video finished. Executing Multi-Method Scroll...");

                    // Method 1: Arrow Down on Video Container (Most Reliable for Desktop)
                    const downEvent = new KeyboardEvent('keydown', {
                        bubbles: true,
                        cancelable: true,
                        key: "ArrowDown",
                        keyCode: 40,
                        code: "ArrowDown",
                        which: 40
                    });
                    (activeContainer || document).dispatchEvent(downEvent);

                    // Method 2: YouTube's internal Scroll function (Agar available ho)
                    const shortsContainer = document.getElementById('shorts-container');
                    if (shortsContainer) {
                        shortsContainer.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                    }

                    // Method 3: Click Next Button (Sabse safe backup)
                    const nextButton = document.querySelector('#navigation-button-down button, [aria-label="Next video"]');
                    if (nextButton) nextButton.click();
                }
            } else if (activeVideo.currentTime < 1) {
                activeVideo.dataset.scrolled = ""; 
            }
        }
    };

    setInterval(findAndScroll, 500);
    log("Force Engine Active with Multi-Scroll fix.");
})();