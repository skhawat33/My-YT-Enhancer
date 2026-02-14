(function() {
    const manageSpeedButtons = () => {
        const existingGroup = document.getElementById('gemini-speed-group');
        const controls = document.querySelector('.ytp-left-controls');

        if (!controls || existingGroup) return;

        const group = document.createElement('span');
        group.id = 'gemini-speed-group';
        group.style.cssText = `
            display: inline-flex; 
            align-items: center; 
            vertical-align: top; 
            height: 40px; 
            margin-left: 12px; 
            margin-top: 8px; 
            padding: 0 6px;
            background: rgba(0, 0, 0, 0.4) !important; 
            border-radius: 25px;
        `;
        
        const showSpeedHUD = (speed) => {
            let hud = document.getElementById("v-speed-hud") || (function() {
                const h = document.createElement('div');
                h.id = "v-speed-hud";
                h.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:rgba(0,0,0,0.85); color:#ffff00; padding:15px 30px; border-radius:10px; z-index:99999; font-size:24px; pointer-events:none; transition: opacity 0.2s; font-family: sans-serif; font-weight: bold; border: 2px solid #ffff00; text-shadow: 2px 2px 0px #000;";
                document.body.appendChild(h);
                return h;
            })();
            hud.textContent = `⚡ Speed: ${speed}x`;
            hud.style.opacity = "1";
            clearTimeout(window.vSpeedT);
            window.vSpeedT = setTimeout(() => hud.style.opacity = "0", 800);
        };

        const createBtn = (isIncrease) => {
            const btn = document.createElement('button');
            btn.className = 'ytp-button'; 
            
            const symbol = document.createElement('span');
            symbol.textContent = isIncrease ? '+' : '−';
            symbol.style.cssText = "transition: transform 0.2s ease; display: inline-block;";
            btn.appendChild(symbol);
            
            btn.style.cssText = `
                background: rgba(0, 0, 0, 0.2) !important; 
                border: none !important;
                font-size: 24px !important; 
                font-weight: bold !important;
                cursor: pointer !important;
                width: 36px;   
                height: 34px;  
                margin: 0 3px;
                border-radius: 25px !important; 
                display: flex;
                align-items: center;
                justify-content: center;
                outline: none !important;
                transition: background 0.2s ease;
            `;
            btn.style.setProperty("color", "#ffffff", "important");

            btn.onmouseover = () => {
                symbol.style.transform = "scale(1.4)"; 
                btn.style.setProperty("color", "#ffff00", "important"); 
                btn.style.setProperty("text-shadow", "2px 2px 0 #000", "important");
                btn.style.setProperty("background", "rgba(255, 255, 255, 0.2)", "important");
            };
            
            btn.onmouseout = () => {
                symbol.style.transform = "scale(1)";
                btn.style.setProperty("color", "#ffffff", "important");
                btn.style.setProperty("text-shadow", "none", "important");
                btn.style.setProperty("background", "rgba(0, 0, 0, 0.2)", "important");
            };
            
            btn.onclick = (e) => {
                e.preventDefault();
                const v = document.querySelector('video');
                if (v) {
                    let newSpeed = isIncrease ? v.playbackRate + 0.25 : v.playbackRate - 0.25;
                    newSpeed = Math.max(0.25, Math.min(4, newSpeed));
                    v.playbackRate = newSpeed;
                    showSpeedHUD(newSpeed);
                }
            };
            return btn;
        };

        group.appendChild(createBtn(false)); 
        group.appendChild(createBtn(true));  
        controls.appendChild(group);
    };

    setInterval(manageSpeedButtons, 2000);
})();