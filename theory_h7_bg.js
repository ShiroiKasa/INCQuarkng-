// theory_h7_bg.js
// h7「理论」页背景:把文件夹里的「参考.html」(方案B 华丽版:发光网络)搬过来当背景,
// 去掉预览用的控制面板,并把面板上的三个滑块固定成:速度 0.25、旋转 0.25、浓度 2.5(最大)
// 纯视觉层:画布不铺底色,深/浅配色跟随游戏「切换背景色」的 bgIndex(与 script.js 的判定一致)
(function(){
    'use strict';

    // ---------- 画布 ----------
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

    //固定倍率(对应参考.html 面板上的三个滑块)
    const SPEED_SCALE = 0.25;   //速度
    const SPIN_SCALE = 0.25;    //旋转
    const ALPHA_SCALE = 2.5;    //浓度(滑块最大值 250/100)

    let W = 0, H = 0, cx = 0, cy = 0, baseR = 0, dpr = 0;

    function resize(){
        const w = window.innerWidth, h = window.innerHeight;
        const d = Math.min(window.devicePixelRatio || 1, 2);
        if (w === W && h === H && d === dpr) return;
        W = w;
        H = h;
        dpr = d;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cx = W / 2;
        cy = H / 2;
        baseR = Math.min(W, H) * 0.38;
    }
    window.addEventListener('resize', resize);
    resize();

    // ---------- 可见性:只在 h7 显示 ----------
    function updateVisibility(){
        const h7 = document.getElementById('h7');
        const shouldShow = (UI_re === 'h7' && h7 && h7.style.display !== 'none');
        canvas.style.display = shouldShow ? 'block' : 'none';
        return shouldShow;
    }

    //深色背景(1=深灰紫 4=纯黑)用亮色叠加;浅色背景用深紫正片叠底
    function isDarkTheme(){
        return bgIndex === 1 || bgIndex === 4;
    }

    // ---------- 预渲染发光 sprite ----------
    const SPRITE_SIZE = 96;
    const HUES = [248, 262, 278, 295, 312];
    const spritesDark = {};
    const spritesLight = {};

    function makeSprite(hue, isDark){
        const c = document.createElement('canvas');
        c.width = c.height = SPRITE_SIZE;
        const g = c.getContext('2d');
        const m = SPRITE_SIZE / 2;
        const grad = g.createRadialGradient(m, m, 0, m, m, m);
        if (isDark){
            grad.addColorStop(0.00, 'hsla(' + hue + ', 100%, 97%, 1)');
            grad.addColorStop(0.10, 'hsla(' + hue + ', 100%, 86%, 0.95)');
            grad.addColorStop(0.28, 'hsla(' + hue + ', 95%, 72%, 0.50)');
            grad.addColorStop(0.55, 'hsla(' + hue + ', 90%, 62%, 0.14)');
            grad.addColorStop(1.00, 'hsla(' + hue + ', 90%, 62%, 0)');
        } else {
            grad.addColorStop(0.00, 'hsla(' + hue + ', 85%, 42%, 0.95)');
            grad.addColorStop(0.14, 'hsla(' + hue + ', 85%, 40%, 0.55)');
            grad.addColorStop(0.38, 'hsla(' + hue + ', 85%, 36%, 0.20)');
            grad.addColorStop(1.00, 'hsla(' + hue + ', 85%, 36%, 0)');
        }
        g.fillStyle = grad;
        g.beginPath();
        g.arc(m, m, m, 0, Math.PI * 2);
        g.fill();
        return c;
    }

    for (let i = 0; i < HUES.length; i++){
        spritesDark[HUES[i]] = makeSprite(HUES[i], true);
        spritesLight[HUES[i]] = makeSprite(HUES[i], false);
    }

    function pickSprite(hue, dark){
        const map = dark ? spritesDark : spritesLight;
        let best = HUES[0], bd = Math.abs(hue - HUES[0]);
        for (let i = 1; i < HUES.length; i++){
            const d = Math.abs(hue - HUES[i]);
            if (d < bd){
                bd = d;
                best = HUES[i];
            }
        }
        return map[best];
    }

    // ---------- 节点 ----------
    const N = 60;
    const BOX = 1;
    const LINK = 0.66;

    const nodes = [];
    for (let i = 0; i < N; i++){
        nodes.push({
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * 2 - 1,
            vx: (Math.random() - 0.5) * 0.09,
            vy: (Math.random() - 0.5) * 0.09,
            vz: (Math.random() - 0.5) * 0.09,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.6 + Math.random() * 1.4,
            baseSize: 1.4 + Math.random() * 1.2,
            hub: i < 5
        });
    }

    // ---------- 尘埃 ----------
    const DUST = 140;
    const dust = [];
    for (let i = 0; i < DUST; i++){
        dust.push({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.022,
            vy: (Math.random() - 0.5) * 0.022,
            size: 0.5 + Math.random() * 1.4,
            phase: Math.random() * Math.PI * 2,
            twinkle: 0.5 + Math.random() * 1.6
        });
    }

    // ---------- 时间 ----------
    let t = 0;
    let aAngle = 0;

    // ---------- 背景光晕 ----------
    function drawHalo(dark){
        const r = baseR * 1.7;
        if (!(r > 0)) return;
        const breathe = 0.5 + 0.5 * Math.sin(t * 0.7);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        if (dark){
            g.addColorStop(0.00, 'hsla(272, 90%, 70%, ' + (0.17 + 0.05 * breathe) + ')');
            g.addColorStop(0.42, 'hsla(268, 90%, 62%, ' + (0.06 + 0.02 * breathe) + ')');
            g.addColorStop(1.00, 'hsla(268, 90%, 62%, 0)');
        } else {
            g.addColorStop(0.00, 'hsla(272, 70%, 55%, ' + (0.11 + 0.03 * breathe) + ')');
            g.addColorStop(0.42, 'hsla(268, 70%, 50%, 0.04)');
            g.addColorStop(1.00, 'hsla(268, 70%, 50%, 0)');
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
    }

    // ---------- 脉冲环 ----------
    function drawPulseRing(dark){
        const period = 4.5;
        let pt = (t % period) / period;
        if (!(pt >= 0 && pt <= 1)) return;
        const ringR = pt * baseR * 1.9;
        if (!(ringR > 0)) return;
        const ringA = (1 - pt) * 0.16 * ALPHA_SCALE;
        if (ringA < 0.01) return;
        ctx.strokeStyle = dark
            ? 'hsla(272, 90%, 78%, ' + ringA + ')'
            : 'hsla(272, 65%, 52%, ' + (ringA * 0.9) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.stroke();
    }

    // ---------- 尘埃 ----------
    function drawDust(dt, dark){
        for (let i = 0; i < DUST; i++){
            const d = dust[i];
            d.x += d.vx * dt * SPEED_SCALE;
            d.y += d.vy * dt * SPEED_SCALE;
            if (d.x < 0) d.x += 1; else if (d.x > 1) d.x -= 1;
            if (d.y < 0) d.y += 1; else if (d.y > 1) d.y -= 1;

            const tw = 0.5 + 0.5 * Math.sin(t * d.twinkle + d.phase);
            const a = Math.min(1, tw * 0.5 * ALPHA_SCALE);
            if (a < 0.02) continue;

            ctx.fillStyle = dark
                ? 'hsla(282, 92%, 84%, ' + a + ')'
                : 'hsla(270, 60%, 52%, ' + (a * 0.65) + ')';
            ctx.beginPath();
            ctx.arc(d.x * W, d.y * H, d.size * (0.6 + 0.4 * tw), 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // ---------- 网络 ----------
    function drawNetwork(dt, dark){
        for (let i = 0; i < N; i++){
            const p = nodes[i];
            p.x += p.vx * dt * SPEED_SCALE;
            p.y += p.vy * dt * SPEED_SCALE;
            p.z += p.vz * dt * SPEED_SCALE;
            if (p.x > BOX) p.x -= 2 * BOX; else if (p.x < -BOX) p.x += 2 * BOX;
            if (p.y > BOX) p.y -= 2 * BOX; else if (p.y < -BOX) p.y += 2 * BOX;
            if (p.z > BOX) p.z -= 2 * BOX; else if (p.z < -BOX) p.z += 2 * BOX;
        }

        const ca = Math.cos(aAngle), sa = Math.sin(aAngle);
        const fov = 2.6;
        const R = baseR * 1.22;

        const px = new Array(N), py = new Array(N), pd = new Array(N);
        for (let i = 0; i < N; i++){
            const p = nodes[i];
            const rx = p.x * ca - p.z * sa;
            const rz = p.x * sa + p.z * ca;
            const s = fov / (fov + rz);
            px[i] = cx + rx * R * s;
            py[i] = cy + p.y * R * s;
            pd[i] = (1 - rz) * 0.5;
        }

        const link2 = LINK * LINK;
        const BUCKETS = 10;
        const buckets = [];
        for (let b = 0; b < BUCKETS; b++) buckets.push([]);

        const flows = [];

        for (let i = 0; i < N; i++){
            for (let j = i + 1; j < N; j++){
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                const d2 = dx * dx + dy * dy + dz * dz;
                if (d2 >= link2) continue;

                const d = Math.sqrt(d2);
                const near = (pd[i] + pd[j]) * 0.5;
                const a = (1 - d / LINK) * (0.12 + 0.88 * near) * 0.55;
                if (a < 0.022) continue;

                const bi = Math.min(BUCKETS - 1, Math.floor(a / 0.55 * BUCKETS));
                buckets[bi].push(px[i], py[i], px[j], py[j]);

                if (((i * 131 + j * 197) % 100) < 18){
                    flows.push(px[i], py[i], px[j], py[j], a, 262 + near * 42);
                }
            }
        }

        //连线:亮度也受浓度倍率控制
        ctx.lineWidth = 1;
        for (let b = 0; b < BUCKETS; b++){
            const arr = buckets[b];
            if (!arr.length) continue;
            const a = Math.min(1, ((b + 0.5) / BUCKETS) * 0.55 * ALPHA_SCALE);
            if (a < 0.01) continue;
            ctx.strokeStyle = dark
                ? 'hsla(270, 92%, 78%, ' + a + ')'
                : 'hsla(270, 62%, 44%, ' + Math.min(1, a * 1.25) + ')';
            ctx.beginPath();
            for (let k = 0; k < arr.length; k += 4){
                ctx.moveTo(arr[k], arr[k + 1]);
                ctx.lineTo(arr[k + 2], arr[k + 3]);
            }
            ctx.stroke();
        }

        //流动光点
        const fSpeed = 0.55 * SPEED_SCALE;
        for (let k = 0; k < flows.length; k += 6){
            const x1 = flows[k], y1 = flows[k + 1];
            const x2 = flows[k + 2], y2 = flows[k + 3];
            const a = flows[k + 4], hue = flows[k + 5];

            let prog = (t * fSpeed + (k * 0.137)) % 1;
            if (!(prog >= 0 && prog <= 1)) prog = 0;
            if (prog < 0) prog += 1;

            const fx = x1 + (x2 - x1) * prog;
            const fy = y1 + (y2 - y1) * prog;
            const rr = 3.6;
            const spr = pickSprite(hue, dark);

            ctx.globalAlpha = Math.min(1, a * 2.4 * ALPHA_SCALE);
            ctx.drawImage(spr, fx - rr, fy - rr, rr * 2, rr * 2);
        }
        ctx.globalAlpha = 1;

        //节点
        for (let i = 0; i < N; i++){
            const p = nodes[i];
            const depth = pd[i];
            const pulse = 1 + 0.22 * Math.sin(t * p.pulseSpeed + p.phase);
            const size = p.baseSize * (0.5 + 1.1 * depth) * pulse;
            if (!(size > 0)) continue;
            const hue = 252 + depth * 48;
            const spr = pickSprite(hue, dark);

            ctx.globalAlpha = Math.min(1, (0.55 + 0.45 * depth) * ALPHA_SCALE);
            const ds = size * 6;
            ctx.drawImage(spr, px[i] - ds / 2, py[i] - ds / 2, ds, ds);

            if (p.hub){
                const len = 8 + 10 * depth + 4 * Math.sin(t * 1.3 + p.phase);
                ctx.globalAlpha = Math.min(1, 0.55 * depth * ALPHA_SCALE);
                ctx.strokeStyle = dark
                    ? 'hsla(' + hue + ', 100%, 90%, 0.9)'
                    : 'hsla(' + hue + ', 75%, 42%, 0.8)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(px[i] - len, py[i]);
                ctx.lineTo(px[i] + len, py[i]);
                ctx.moveTo(px[i], py[i] - len);
                ctx.lineTo(px[i], py[i] + len);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1;
    }

    // ---------- 主循环 ----------
    let lastTime = performance.now();

    function frame(now){
        //不在 h7 时停笔(但仍保留 rAF,切回 h7 立刻继续)
        if (!updateVisibility()){
            lastTime = now;
            requestAnimationFrame(frame);
            return;
        }
        resize();

        let dt = (now - lastTime) / 1000;
        lastTime = now;
        if (!(dt > 0)) dt = 0;
        if (dt > 0.1) dt = 0.1;

        const dark = isDarkTheme();

        t += dt;
        aAngle += dt * 0.14 * SPEED_SCALE * SPIN_SCALE;

        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over';

        drawHalo(dark);
        drawPulseRing(dark);
        drawDust(dt, dark);
        drawNetwork(dt, dark);

        ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
})();
