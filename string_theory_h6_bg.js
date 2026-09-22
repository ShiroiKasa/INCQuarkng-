// string_theory_h6_bg.js
(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.prepend(canvas);

    let width, height;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    function updateVisibility() {
        const h6 = document.getElementById('h6');
        const shouldShow = (UI_re === 'h6' && h6 && h6.style.display !== 'none');
        canvas.style.display = shouldShow ? 'block' : 'none';
    }

    const formulas = [
        "F = G * (m1*m2)/(r^2)",
        "(8πG/c^4) * Tμν = Rμν - (1/2) * Rgμν + Λgμν",
        "F = Ke * (q1*q2)/(r^2)",
        "F = q * (E+v×B)",
        "Cx = Vy * Bz - Vz * By",
        "Cy = Vz * Bx - Vx * Bz",
        "Cz = Vx * By - Vy * Bx",
        "Dx = Ex + Cx",
        "Dy = Ey + Cy",
        "Dz = Ez + Cz",
        "Fx = qDx",
        "Fy = qDy",
        "Fz = qDz",
        "F = α/(r^2) + σ",
        "F = g^2 * (e^(-r/r0))/r^2 * (1 + r/r0)",
        "F = gw^2/4π * (e^(-r/rw))/r^2 * (1 + r/rw)",
        "F = F0"
    ];

    let chars = [];

    function createChar(ch) {
        const speed = 30 + Math.random() * 50; //30~80 像素/秒
        const angle = Math.random() * 2 * Math.PI;
        return {
            text: ch,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            scale: 0.8 + Math.random() * 0.4,
            alpha: 0.3 + Math.random() * 0.3
        };
    }

    function initChars() {
        chars = [];
        for (let formula of formulas) {
            for (let ch of formula) {
                if (ch !== ' ') chars.push(createChar(ch));
            }
        }
    }
    initChars();

    function updateChars(dt) {
        for (let c of chars) {
            c.x += c.vx * dt;
            c.y += c.vy * dt;
            if (c.x < -50) c.x = width + 50;
            else if (c.x > width + 50) c.x = -50;
            if (c.y < -50) c.y = height + 50;
            else if (c.y > height + 50) c.y = -50;
        }
    }

    function draw() {
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, width, height);

        const baseFontSize = 24;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        //光晕偏移
        const glowOffsets = [
            [1,0],[-1,0],[0,1],[0,-1],
            [1,1],[1,-1],[-1,1],[-1,-1]
        ];

        for (let c of chars) {
            //字体大小取整，避免子像素字体抖动
            const size = Math.round(baseFontSize * c.scale);
            ctx.font = `${size}px "Times New Roman", serif`;

            //坐标不取整，保持浮点，让浏览器平滑抗锯齿
            const x = c.x;
            const y = c.y;

            //光晕
            const glowAlpha = c.alpha * 0.1;
            ctx.fillStyle = `rgba(255, 255, 255, ${glowAlpha})`;
            for (let off of glowOffsets) {
                ctx.fillText(c.text, x + off[0], y + off[1]);
            }

            //主字符
            ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
            ctx.fillText(c.text, x, y);
        }
    }

    let lastTime = performance.now();

    function animate(currentTime) {
        const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        updateVisibility();
        if (canvas.style.display === 'none') {
            requestAnimationFrame(animate);
            return;
        }

        resize();
        updateChars(delta);
        draw();
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();