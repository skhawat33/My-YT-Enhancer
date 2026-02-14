document.addEventListener('DOMContentLoaded', () => {
    // keys array mein speedControl add kiya
    const keys = ['autoScroll', 'customButtons', 'speedControl', 'shortsVolume', 'normalVolume'];
    
    chrome.storage.local.get(keys, (data) => {
        keys.forEach(key => {
            const el = document.getElementById(key);
            if (el) el.checked = data[key] ?? true;
        });
    });

    keys.forEach(key => {
        document.getElementById(key).addEventListener('change', (e) => {
            chrome.storage.local.set({ [key]: e.target.checked });
        });
    });
});