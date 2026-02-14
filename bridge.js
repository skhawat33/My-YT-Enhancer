(function() {
    window.ytSettings = {
        autoScroll: true,
        customButtons: true,
        shortsVolume: true,
        normalVolume: true
    };

    const log = (msg) => console.log(`%c[Gemini Bridge] ${msg}`, "color: #00ff00; font-weight: bold;");

    window.addEventListener("message", (event) => {
        if (event.data.type === 'GEMINI_SYNC') {
            window.ytSettings = Object.assign({}, window.ytSettings, event.data.settings);
            log("Settings Synced: " + JSON.stringify(window.ytSettings));
            window.dispatchEvent(new CustomEvent('gemini-refresh'));
        }
    });

    if (typeof chrome !== 'undefined' && chrome.storage) {
        const sync = () => {
            chrome.storage.local.get(null, (data) => {
                window.postMessage({ type: 'GEMINI_SYNC', settings: data }, "*");
            });
        };
        chrome.storage.onChanged.addListener(sync);
        sync();
    }
})();