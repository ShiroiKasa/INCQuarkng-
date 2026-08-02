// blackhole_h3_bg.js
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

    let width, height, cx, cy;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        cx = width / 2;
        cy = height / 2;
    }
    window.addEventListener('resize', resize);
    resize();

    function updateVisibility() {
        const h3 = document.getElementById('h3');
        const shouldShow = (UI_re === 'h3' && h3 && h3.style.display !== 'none');
        canvas.style.display = shouldShow ? 'block' : 'none';
    }

    const NUM_PARTICLES = 10;
    const GLOW_FRAMES = 12;
    let glowTimer = 0;
    let currentRadius = 30;

    let callCount = 0;
    function getRadius() {
        callCount++;
        if (typeof h3_BH !== 'undefined' && h3_BH instanceof Decimal) {
            let logVal = h3_BH.plus(1).log10().toNumber();
            let raw = 20 + logVal;
            let result = Math.max(20, Math.min(800, raw));
            return result;
        }
        return 30;
    }

    function createParticle() {
        const r = getRadius();
        const angle = Math.random() * 2 * Math.PI;
        const dist = r + 15 + Math.random() * 180;
        return {
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            speed: 0.4 + Math.random() * 0.9,
            size: 1.2 + Math.random() * 1.8
        };
    }

    let particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(createParticle());
    }

    function animate() {
        updateVisibility();

        if (canvas.style.display === 'none') {
            requestAnimationFrame(animate);
            return;
        }

        resize();
        
        currentRadius = getRadius();

        for (let p of particles) {
            const dx = cx - p.x;
            const dy = cy - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.1) {
                Object.assign(p, createParticle());
                continue;
            }
            const step = p.speed;
            p.x += (dx / dist) * step;
            p.y += (dy / dist) * step;

            const newDist = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
            if (newDist < currentRadius) {
                glowTimer = GLOW_FRAMES;
                Object.assign(p, createParticle());
            }
        }

        ctx.clearRect(0, 0, width, height);

        // 黑洞
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#000000';
        ctx.fill();

        // 粒子
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.fill();
        }

        // 高亮边缘
        if (glowTimer > 0) {
            const progress = glowTimer / GLOW_FRAMES;
            ctx.beginPath();
            ctx.arc(cx, cy, currentRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
            ctx.lineWidth = 2 + (1 - progress) * 6;
            ctx.stroke();
            glowTimer--;
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        resize();
        for (let i = 0; i < particles.length; i++) {
            Object.assign(particles[i], createParticle());
        }
    });
})();