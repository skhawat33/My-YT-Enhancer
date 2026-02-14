(function() {
    const manageButtons = () => {
        const existingGroup = document.getElementById('gemini-seek-group');
        const controls = document.querySelector('.ytp-left-controls');

        if (window.ytSettings?.customButtons === false) {
            if (existingGroup) existingGroup.remove();
            return;
        }

        if (!existingGroup && controls) {
            const group = document.createElement('span');
            group.id = 'gemini-seek-group';
            group.style.cssText = "display:inline-flex; align-items:center; margin-left:5px;";
            
            const createBtn = (isForward) => {
                const btn = document.createElement('button');
                btn.className = 'ytp-button';
                btn.textContent = isForward ? '⏩' : '⏪'; 
                btn.style.fontSize = "20px";
                btn.onclick = (e) => {
                    e.preventDefault();
                    const v = document.querySelector('video');
                    if (v) v.currentTime += (isForward ? 10 : -10);
                };
                return btn;
            };

            group.appendChild(createBtn(false));
            group.appendChild(createBtn(true));
            controls.appendChild(group);
        }
    };

    window.addEventListener('gemini-refresh', manageButtons);
    setInterval(manageButtons, 2000);
})();