//蚀刻页背景:时间驱动生长的蚀刻纹样
//移植自「蚀刻背景参考.html」,并按项目需要精化:
//1.生长进度=game_time-sk_X_start(本次蚀刻已持续的现实秒数),刷新页面、切走再切回都不丢进度
//2.去掉预览用的控制面板、时间倍速与镀层(项目暂无镀层);结束蚀刻时闪一下,再在60秒内淡出
//3.分枝按深度分桶、末梢更细并带端点亮点,根部有同色光晕;深浅配色跟随 bgIndex
//只在蚀刻页显示;纯视觉层,画布不铺底色,不拦截鼠标
(function(){
    'use strict';

    // ---------- 参数 ----------
    const GROW_TOTAL = 300;     //长满整棵树所需现实秒数(与 game_time 同源)
    const GROW_DUR = 0.5;       //单根分枝从出现到长满的时长
    const FADE_TOTAL = 60;      //结束蚀刻后的淡出时长
    const FLASH_DUR = 0.6;      //结束瞬间的闪光时长
    const BASE_SCALE = 0.37;    //主干长度占屏幕短边的比例(纹样的最大范围)

    //每层分枝的出场时间窗口(秒,0~GROW_TOTAL)
    const DEPTH_TIMES = [
        [0, 4],     //主干
        [3, 50],    //一级
        [40, 150],  //二级
        [130, 240], //三级
        [215, 295]  //末梢
    ];
    const DEPTH_MAX = DEPTH_TIMES.length - 1;

    //五种蚀刻的色相/饱和度(与蚀刻按钮的颜色对应)
    //用取值函数直接读全局变量:game_time、sk_*_ing、sk_*_start 都是 let 声明的,不在 window 上
    const ETCH_DEFS = [
        { id: 1, hue: 24,  sat: 95, ing: function(){ return sk_1_ing === 1; }, start: function(){ return sk_1_start; } },
        { id: 2, hue: 14,  sat: 95, ing: function(){ return sk_2_ing === 1; }, start: function(){ return sk_2_start; } },
        { id: 3, hue: 308, sat: 82, ing: function(){ return sk_3_ing === 1; }, start: function(){ return sk_3_start; } },
        { id: 4, hue: 282, sat: 85, ing: function(){ return sk_4_ing === 1; }, start: function(){ return sk_4_start; } },
        { id: 5, hue: 200, sat: 78, ing: function(){ return sk_5_ing === 1; }, start: function(){ return sk_5_start; } }
    ];

    // ---------- 画布 ----------
    const canvas = document.createElement('canvas');
    canvas.id = 'etch_bg_canvas';//只给自检/调试用
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.prepend(canvas);

    let W = 0, H = 0, cx = 0, cy = 0, dpr = 0, baseLen = 0;
    let shapeSerial = 0;//尺寸变化时+1,树形按新尺寸重建

    function resize(){
        const w = window.innerWidth, h = window.innerHeight;
        const d = Math.min(window.devicePixelRatio || 1, 2);
        if (w === W && h === H && d === dpr) return;
        W = w;
        H = h;
        dpr = d;
        canvas.width = Math.max(1, Math.round(W * dpr));
        canvas.height = Math.max(1, Math.round(H * dpr));
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cx = W / 2;
        cy = H / 2;
        baseLen = Math.min(W, H) * BASE_SCALE;
        shapeSerial += 1;
    }
    window.addEventListener('resize', resize);

    //只在蚀刻页显示
    function updateVisibility(){
        const sk = document.getElementById('SK');
        const show = (typeof UI_re !== 'undefined' && UI_re === 'SK' && sk && sk.style.display !== 'none');
        canvas.style.display = show ? 'block' : 'none';
        return show;
    }

    //深色背景(1=深灰紫 4=纯黑)用叠加发光;浅色背景用深色正片叠底
    function isDarkTheme(){
        return bgIndex === 1 || bgIndex === 4;
    }

    // ---------- 状态 ----------
    const states = ETCH_DEFS.map(function(def){
        return {
            def: def,
            lastIng: false,     //上一帧是否进行中
            elapsed: 0,         //本棵树的生长秒数(结束/淡出时定格)
            fading: false,
            fadeStart: 0,       //开始淡出时的 game_time
            flash: 0,           //结束闪光(1→0)
            alpha: 0,           //整棵树透明度(含淡出)
            shape: null
        };
    });

    // ---------- 确定性随机 ----------
    function seededRandom(seed){
        let s = seed | 0;
        return function(){
            s = s + 0x6D2B79F5 | 0;
            let t = Math.imul(s ^ s >>> 15, 1 | s);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    // ---------- 树形生成(每根分枝带自己的出场时间) ----------
    function buildShape(def){
        const total = ETCH_DEFS.length;
        const jitter = ((def.id * 0.618) % 1) * 0.16 - 0.08;
        const angle = -Math.PI / 2 + (Math.PI * 2 * (def.id - 1) / total) + jitter;
        const rng = seededRandom(def.id * 7919 + 104729);

        //按深度分桶:绘制时一个深度一次成路,不必每帧重新分配
        const buckets = [];
        for (let d = 0; d <= DEPTH_MAX; d++) buckets.push([]);

        function grow(x, y, a0, len, depth){
            const steps = 5;
            const pts = [{ x: x, y: y }];
            let px = x, py = y, a = a0;
            for (let i = 0; i < steps; i++){
                a += (rng() - 0.5) * 0.30;
                const sl = len / steps;
                px += Math.cos(a) * sl;
                py += Math.sin(a) * sl;
                pts.push({ x: px, y: py });
            }
            const win = DEPTH_TIMES[depth];
            buckets[depth].push({
                pts: pts,
                delay: win[0] + rng() * (win[1] - win[0]),
                r: 0
            });

            if (depth >= DEPTH_MAX) return;
            const n = depth === 0 ? 2 : (rng() < 0.55 ? 2 : 1);
            for (let i = 0; i < n; i++){
                const p = pts[1 + Math.floor(rng() * (pts.length - 1))];
                grow(p.x, p.y, a0 + (rng() - 0.5) * 1.15, len * (0.55 + rng() * 0.2), depth + 1);
            }
        }

        for (let k = 0; k < 3; k++){
            grow(cx, cy, angle + (k - 1) * 0.38, baseLen, 0);
        }
        return { buckets: buckets, serial: shapeSerial };
    }

    function ensureShape(s){
        if (s.shape && s.shape.serial === shapeSerial) return;
        s.shape = buildShape(s.def);
    }

    // ---------- 绘制辅助 ----------
    function clamp01(v){
        return v < 0 ? 0 : (v > 1 ? 1 : v);
    }

    //把一根分枝按 reveal(0~1)画成局部路径
    function addPartial(pts, reveal){
        const last = pts.length - 1;
        if (!(reveal > 0) || last <= 0) return;
        const segs = last * reveal;
        const full = Math.floor(segs);
        const frac = segs - full;
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i <= full; i++) ctx.lineTo(pts[i].x, pts[i].y);
        if (full < last && frac > 0){
            const p0 = pts[full], p1 = pts[full + 1];
            ctx.lineTo(p0.x + (p1.x - p0.x) * frac, p0.y + (p1.y - p0.y) * frac);
        }
    }

    function sampleAlong(pts, t){
        const last = pts.length - 1;
        if (last <= 0) return pts[0];
        const f = clamp01(t) * last;
        const i = Math.min(last - 1, Math.floor(f));
        const k = f - i;
        return {
            x: pts[i].x + (pts[i + 1].x - pts[i].x) * k,
            y: pts[i].y + (pts[i + 1].y - pts[i].y) * k
        };
    }

    //根部光晕:刚开蚀刻就能看到一点反馈,随进度扩散
    function drawRootGlow(s, dark, progress){
        const a = (dark ? 0.055 : 0.045) * s.alpha + progress * (dark ? 0.045 : 0.03);
        if (a < 0.004) return;
        const radius = Math.max(1, baseLen * (1.05 + 0.2 * progress));
        const hue = s.def.hue, sat = s.def.sat;
        const lit = dark ? 72 : 45;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0.00, 'hsla(' + hue + ',' + sat + '%,' + lit + '%,' + a + ')');
        g.addColorStop(0.45, 'hsla(' + hue + ',' + sat + '%,' + lit + '%,' + (a * 0.35) + ')');
        g.addColorStop(1.00, 'hsla(' + hue + ',' + sat + '%,' + lit + '%,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    //整棵活跃树:外发光→按深度分层主线→末梢亮点→主干流动光点
    function drawTree(s, dark, nowSec){
        if (!(s.alpha > 0.004)) return;
        if (!(s.elapsed > 0.02)) return;
        const shape = s.shape;
        if (!shape) return;

        const hue = s.def.hue, sat = s.def.sat;
        const progress = clamp01(s.elapsed / GROW_TOTAL);
        const lit = dark ? 50 + progress * 26 : 42 - progress * 10;
        const alphaBase = (dark ? 0.22 + progress * 0.36 : 0.14 + progress * 0.24) * s.alpha;

        //先算好每根分枝本帧的展开比例,后面几遍绘制复用
        let anyVisible = false;
        for (let d = 0; d <= DEPTH_MAX; d++){
            const arr = shape.buckets[d];
            for (let i = 0; i < arr.length; i++){
                const b = arr[i];
                const r = (s.elapsed - b.delay) / GROW_DUR;
                b.r = r > 0 ? (r > 1 ? 1 : r) : 0;
                b.r > 0 && (anyVisible = true);
            }
        }
        if (!anyVisible) return;

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        //外发光:整棵树一条宽路径
        ctx.beginPath();
        for (let d = 0; d <= DEPTH_MAX; d++){
            const arr = shape.buckets[d];
            for (let i = 0; i < arr.length; i++) addPartial(arr[i].pts, arr[i].r);
        }
        ctx.strokeStyle = 'hsla(' + hue + ',' + sat + '%,' + lit + '%,' + (alphaBase * 0.11) + ')';
        ctx.lineWidth = dark ? 6.5 : 5.5;
        ctx.stroke();

        //主线:越靠近末梢越细,颜色也略淡
        for (let d = 0; d <= DEPTH_MAX; d++){
            const arr = shape.buckets[d];
            let any = false;
            ctx.beginPath();
            for (let i = 0; i < arr.length; i++){
                if (arr[i].r > 0){
                    addPartial(arr[i].pts, arr[i].r);
                    any = true;
                }
            }
            if (!any) continue;
            const fade = 1 - d * 0.11;
            ctx.strokeStyle = 'hsla(' + hue + ',' + sat + '%,' + lit + '%,' + (alphaBase * fade) + ')';
            ctx.lineWidth = Math.max(0.65, (dark ? 1.75 : 1.45) - d * 0.24);
            ctx.stroke();
        }

        //末梢端点:长满的分枝点一颗小亮点
        const tips = shape.buckets[DEPTH_MAX];
        ctx.fillStyle = 'hsla(' + hue + ',100%,' + (dark ? 93 : 38) + '%,' + Math.min(1, alphaBase * 1.5) + ')';
        for (let i = 0; i < tips.length; i++){
            if (tips[i].r < 1) continue;
            const p = tips[i].pts[tips[i].pts.length - 1];
            ctx.beginPath();
            ctx.arc(p.x, p.y, dark ? 1.35 : 1.1, 0, Math.PI * 2);
            ctx.fill();
        }

        //主干上的流动光点:从根部流向末梢
        const trunks = shape.buckets[0];
        for (let i = 0; i < trunks.length; i++){
            const b = trunks[i];
            if (b.r < 1) continue;
            const prog = (nowSec * 0.42 + i * 0.19) % 1;
            const pt = sampleAlong(b.pts, prog);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2);
            ctx.fillStyle = 'hsla(' + hue + ',' + sat + '%,' + (dark ? 86 : 48) + '%,' + (alphaBase * 0.5) + ')';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.7, 0, Math.PI * 2);
            ctx.fillStyle = 'hsla(' + hue + ',100%,' + (dark ? 97 : 36) + '%,' + Math.min(1, alphaBase * 2) + ')';
            ctx.fill();
        }
    }

    //结束蚀刻的瞬间:整棵树亮一下,配合后续淡出
    function drawFlash(s, dark){
        if (!(s.flash > 0.01)) return;
        if (!(s.elapsed > 0.02)) return;
        const shape = s.shape;
        if (!shape) return;
        const f = s.flash;

        ctx.beginPath();
        for (let d = 0; d <= DEPTH_MAX; d++){
            const arr = shape.buckets[d];
            for (let i = 0; i < arr.length; i++){
                const b = arr[i];
                const r = (s.elapsed - b.delay) / GROW_DUR;
                addPartial(b.pts, r > 1 ? 1 : (r > 0 ? r : 0));
            }
        }
        ctx.strokeStyle = 'hsla(' + s.def.hue + ',100%,' + (dark ? 88 : 48) + '%,' + (0.5 * f * s.alpha) + ')';
        ctx.lineWidth = (1 - f) * 11 + 1.2;
        ctx.stroke();
    }

    //把当前背景色转成 rgba
    function bgRgba(a){
        const hex = bgColors[bgIndex];
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    //内容列后面轻轻压一层背景色:纹样在按钮文字底下只留淡淡一层,图案本身在两侧照旧
    //画布在内容下层,没法给文字加底,只能靠"把中间的纹样往背景色里压"来保证可读
    function drawContentVeil(alpha){
        const inner = Math.min(290, W * 0.32);
        const feather = Math.min(90, W * 0.06);
        const outer = inner + feather;
        const g = ctx.createLinearGradient(cx - outer, 0, cx + outer, 0);
        const stop = feather / (outer * 2);
        g.addColorStop(0, bgRgba(0));
        g.addColorStop(stop, bgRgba(alpha));
        g.addColorStop(1 - stop, bgRgba(alpha));
        g.addColorStop(1, bgRgba(0));
        ctx.fillStyle = g;
        ctx.fillRect(cx - outer, 0, outer * 2, H);
    }

    // ---------- 主循环 ----------
    let lastTime = performance.now();

    function frame(now){
        //不在蚀刻页就不画(生长进度由 game_time 推导,切回来会自动补上)
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
        const nowSec = now / 1000;
        const gt = (typeof game_time === 'number' && isFinite(game_time)) ? game_time : 0;

        let anyDraw = false;
        for (let i = 0; i < states.length; i++){
            const s = states[i];
            ensureShape(s);
            const ing = s.def.ing();
            const start = s.def.start();
            //开始时间可能是0(游戏时间从0起步),所以这里用 >=0 判断,不能当成"没开始"
            const elapsed = (typeof start === 'number' && start >= 0) ? Math.max(0, gt - start) : 0;

            if (ing){
                if (!s.lastIng){
                    //刚开始:清掉上一次的淡出与闪光
                    s.fading = false;
                    s.flash = 0;
                }
                s.elapsed = Math.min(GROW_TOTAL, elapsed);
                s.alpha = Math.min(1, s.alpha + dt * 3.2);
            }else{
                if (s.lastIng){
                    //刚结束:定格在结束时的进度,闪一下再淡出
                    s.elapsed = Math.min(GROW_TOTAL, Math.max(s.elapsed, elapsed));
                    s.fading = true;
                    s.fadeStart = gt;
                    s.flash = 1;
                }
                if (s.fading){
                    const k = 1 - Math.max(0, gt - s.fadeStart) / FADE_TOTAL;
                    s.alpha = k > 0 ? k : 0;
                    if (!(s.alpha > 0.002)){
                        s.fading = false;
                        s.alpha = 0;
                        s.elapsed = 0;
                    }
                }
            }
            s.lastIng = ing;
            s.flash = Math.max(0, s.flash - dt / FLASH_DUR);
            (s.alpha > 0.001) && (anyDraw = true);
        }

        ctx.clearRect(0, 0, W, H);
        if (!anyDraw){
            requestAnimationFrame(frame);
            return;
        }

        ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over';

        //中心雾:蚀刻越多、长得越满越亮
        let activeSum = 0;
        for (let i = 0; i < states.length; i++){
            activeSum += states[i].alpha * clamp01(states[i].elapsed / GROW_TOTAL);
        }
        if (activeSum > 0.01){
            const R = Math.min(W, H) * 0.55;
            const k = Math.min(1, activeSum / 2.5);
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
            if (dark){
                g.addColorStop(0, 'hsla(272,90%,62%,' + (0.03 + 0.05 * k) + ')');
                g.addColorStop(1, 'hsla(272,90%,62%,0)');
            }else{
                g.addColorStop(0, 'hsla(272,60%,52%,' + (0.015 + 0.025 * k) + ')');
                g.addColorStop(1, 'hsla(272,60%,52%,0)');
            }
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }

        //根晕先铺,再画树,最后画闪光
        for (let i = 0; i < states.length; i++){
            const s = states[i];
            (s.alpha > 0.004 && s.elapsed > 0.02) && drawRootGlow(s, dark, clamp01(s.elapsed / GROW_TOTAL));
        }
        for (let i = 0; i < states.length; i++) drawTree(states[i], dark, nowSec);
        for (let i = 0; i < states.length; i++) drawFlash(states[i], dark);

        //中间内容列压一层背景色:让按钮文字底下的纹样淡下去,两侧的图案保持不变
        ctx.globalCompositeOperation = 'source-over';
        drawContentVeil(dark ? 0.30 : 0.28);

        requestAnimationFrame(frame);
    }

    resize();
    requestAnimationFrame(frame);
})();
