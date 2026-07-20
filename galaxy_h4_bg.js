// galaxy_bg.js (粒子大小固定版)
(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
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
        const h4 = document.getElementById('h4');
        const shouldShow = (UI_re === 'h4' && h4 && h4.style.display !== 'none');
        canvas.style.display = shouldShow ? 'block' : 'none';
    }

    // ========== 配置常量 ==========
    const MAX_PARTICLES = 300;
    const LINE_SPEED = 10;          // 旋转速度（像素/秒）
    const MIN_RADIUS = 100;          // 最小半径（像素）
    const MAX_RADIUS_LIMIT = 450;   // 最大半径上限
    const PARTICLE_SIZE = 1.0;      // 固定粒子大小（像素）

    let particles = [];
    let currentMaxRadius = MIN_RADIUS;

    function calcTargetRadius() {
        if (typeof h4_up1q !== 'undefined' && h4_up1q instanceof Decimal) {
            let log2Val = h4_up1q.plus(1).log10() / Math.LN2;
            if (!isFinite(log2Val)) log2Val = 300;
            let raw = MIN_RADIUS + log2Val;
            return Math.min(raw, MAX_RADIUS_LIMIT);
        }
        return MIN_RADIUS;
    }

    function randomColor() {
        const hue = 200 + Math.random() * 100;
        const sat = 60 + Math.random() * 30;
        const lig = 60 + Math.random() * 30;
        return `hsl(${hue}, ${sat}%, ${lig}%)`;
    }

    function generateParticlesInRing(oldR, newR, count) {
        for (let i = 0; i < count; i++) {
            const r = oldR + Math.random() * (newR - oldR);
            const angle = Math.random() * 2 * Math.PI;
            const size = PARTICLE_SIZE;
            const color = randomColor();
            particles.push({ angle, radius: r, size, color });
        }
    }

    function expandTo(newR) {
        if (newR <= currentMaxRadius) return;
        const oldArea = currentMaxRadius * currentMaxRadius;
        const newArea = newR * newR;
        let targetCount = Math.min(MAX_PARTICLES, Math.floor(MAX_PARTICLES * (newArea / (MAX_RADIUS_LIMIT * MAX_RADIUS_LIMIT))));
        targetCount = Math.max(targetCount, 20);
        let toAdd = targetCount - particles.length;
        if (toAdd > 0) {
            toAdd = Math.min(toAdd, 40);
            generateParticlesInRing(currentMaxRadius, newR, toAdd);
        }
        currentMaxRadius = newR;
    }

    function shrinkTo(newR) {
        if (newR >= currentMaxRadius) return;
        particles = particles.filter(p => p.radius <= newR);
        currentMaxRadius = newR;
    }

    function ensureInitialParticles() {
        if (particles.length > 0) return;
        const targetR = calcTargetRadius();
        const count = 40 + Math.floor(Math.random() * 20);
        const lower = Math.max(10, MIN_RADIUS * 0.1);
        for (let i = 0; i < count; i++) {
            const r = lower + Math.random() * (targetR - lower);
            const angle = Math.random() * 2 * Math.PI;
            const size = PARTICLE_SIZE;
            const color = randomColor();
            particles.push({ angle, radius: r, size, color });
        }
        currentMaxRadius = targetR;
    }

    function updateParticles(deltaTime) {
        const targetR = calcTargetRadius();
        ensureInitialParticles();

        if (targetR > currentMaxRadius) {
            expandTo(targetR);
        } else if (targetR < currentMaxRadius) {
            shrinkTo(targetR);
        }

        while (particles.length > MAX_PARTICLES) {
            const idx = Math.floor(Math.random() * particles.length);
            particles.splice(idx, 1);
        }

        for (let p of particles) {
            if (p.radius > 0.1) {
                const omega = LINE_SPEED / p.radius;
                p.angle += omega * deltaTime;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        if (particles.length === 0) return;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentMaxRadius * 0.3);
        grad.addColorStop(0, 'rgba(45, 179, 251, 0.10)');
        grad.addColorStop(1, 'rgba(45, 179, 251, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        for (let p of particles) {
            const x = cx + p.radius * Math.cos(p.angle);
            const y = cy + p.radius * Math.sin(p.angle);
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();
        }

        if (currentMaxRadius > MIN_RADIUS) {
            ctx.beginPath();
            ctx.arc(cx, cy, currentMaxRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(45, 179, 251, 0.06)';
            ctx.lineWidth = 1;
            ctx.stroke();
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
        updateParticles(delta);
        draw();

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resize(); });
    requestAnimationFrame(animate);

})();