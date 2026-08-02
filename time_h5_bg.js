(function() {
    //创建全屏画布（固定背景层）
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    let W, H, cx, cy;

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        cx = W / 2;
        cy = H / 2;
    }
    window.addEventListener('resize', resize);
    resize();

    //可见性控制（仅在 h5 显示）
    function updateVisibility() {
        const h5 = document.getElementById('h5');
        const shouldShow = (UI_re === 'h5' && h5 && h5.style.display !== 'none');
        canvas.style.display = shouldShow ? 'block' : 'none';
    }

    //配置常量
    const MAX_RINGS = 30;                //主环数量上限
    const SATELLITES_PER_RING = 2;       //每个主环的卫星环数
    const BASE_RADIUS = 40;              //最小主环半径（像素）
    const RADIUS_STEP = 35;              //相邻主环半径增量
    const RING_SPEED_MIN = 0.1;          //最小旋转速度（弧度/秒）
    const RING_SPEED_MAX = 0.5;
    const ARC_MIN = 0.3 * Math.PI;       //最小弧长
    const ARC_MAX = 1.2 * Math.PI;       //最大弧长
    const SAT_RADIUS_MIN = 8;            //卫星环最小半径
    const SAT_RADIUS_MAX = 20;

    //数据结构
    let rings = [];            //每个元素：{ radius, startAngle, arcLength, speed, direction, angle }
    let satelliteRings = [];   //每个元素：{ ringIndex, angleOnMain, satRadius, angle }

    //计算目标主环数量
    function calcTargetRingCount() {
        if (typeof h5_time_confetti !== 'undefined' && h5_time_confetti instanceof Decimal) {
            let logVal = h5_time_confetti.plus(1).log10().div(2);
            if (!isFinite(logVal)) logVal = 0;
            let count = Math.floor(logVal);
            return Math.min(Math.max(count, 0), MAX_RINGS);
        }
        return 0;
    }

    //生成单个主环配置（随机参数）
    function createRing(radius) {
        return {
            radius: radius,
            startAngle: Math.random() * 2 * Math.PI,
            arcLength: ARC_MIN + Math.random() * (ARC_MAX - ARC_MIN),
            speed: RING_SPEED_MIN + Math.random() * (RING_SPEED_MAX - RING_SPEED_MIN),
            direction: Math.random() > 0.5 ? 1 : -1,
            angle: 0
        };
    }

    //根据主环生成两个卫星环（均匀分布在弧段上）
    function createSatellitesForRing(ringIndex, mainRing) {
        const sats = [];
        const total = SATELLITES_PER_RING;
        for (let i = 0; i < total; i++) {
            //均匀分布在 [startAngle, startAngle + arcLength] 区间内
            const t = (i + 1) / (total + 1);
            const angleOnMain = mainRing.startAngle + t * mainRing.arcLength;
            const satRadius = SAT_RADIUS_MIN + Math.random() * (SAT_RADIUS_MAX - SAT_RADIUS_MIN);
            sats.push({
                ringIndex: ringIndex,
                angleOnMain: angleOnMain,
                satRadius: satRadius,
                angle: Math.random() * 2 * Math.PI   //卫星环自身的初始角度
            });
        }
        return sats;
    }

    //重建整个环系统（用于首次或重置）
    function rebuildRings(targetCount) {
        rings = [];
        satelliteRings = [];
        if (targetCount <= 0) return;
        let radius = BASE_RADIUS;
        for (let i = 0; i < targetCount; i++) {
            const ring = createRing(radius);
            rings.push(ring);
            //生成卫星
            const sats = createSatellitesForRing(i, ring);
            satelliteRings.push(...sats);
            //下一个半径
            radius += RADIUS_STEP + (Math.random() - 0.5) * 10; //随机微调
            radius = Math.max(radius, BASE_RADIUS + i * RADIUS_STEP);
        }
    }

    //动态调整：增加或减少主环（仅在外层操作）
    function adjustRings(oldCount, newCount) {
        if (newCount > oldCount) {
            //增加：在最外层添加
            let lastRadius = BASE_RADIUS;
            if (rings.length > 0) {
                lastRadius = rings[rings.length - 1].radius + RADIUS_STEP + (Math.random() - 0.5) * 10;
                lastRadius = Math.max(lastRadius, rings[rings.length - 1].radius + 10);
            }
            for (let i = oldCount; i < newCount; i++) {
                const ring = createRing(lastRadius);
                rings.push(ring);
                const sats = createSatellitesForRing(rings.length - 1, ring);
                satelliteRings.push(...sats);
                lastRadius += RADIUS_STEP + (Math.random() - 0.5) * 10;
            }
        } else if (newCount < oldCount) {
            //减少：移除最外层
            const removeCount = oldCount - newCount;
            for (let i = 0; i < removeCount; i++) {
                if (rings.length === 0) break;
                //移除最后一个主环（最外层）
                const removedRing = rings.pop();
                const oldRingIndex = rings.length; //被移除前最后一个索引
                //移除该索引的卫星
                satelliteRings = satelliteRings.filter(sat => sat.ringIndex !== oldRingIndex);
                //更新所有 satellite.ringIndex > oldRingIndex 的索引减1
                satelliteRings = satelliteRings.map(sat => {
                    if (sat.ringIndex > oldRingIndex) {
                        return { ...sat, ringIndex: sat.ringIndex - 1 };
                    }
                    return sat;
                });
            }
        }
    }

    //每帧更新状态
    let targetCount = 0;
    let lastCount = 0;

    function updateRings(deltaTime) {
        targetCount = calcTargetRingCount();
        if (targetCount !== lastCount) {
            //检查是否需要重建或增量调整
            if (lastCount === 0 && targetCount > 0) {
                //首次创建
                rebuildRings(targetCount);
            } else if (targetCount > lastCount) {
                adjustRings(lastCount, targetCount);
            } else if (targetCount < lastCount) {
                adjustRings(lastCount, targetCount);
            }
            lastCount = targetCount;
        }

        //更新主环角度
        for (let i = 0; i < rings.length; i++) {
            const ring = rings[i];
            ring.angle += ring.speed * ring.direction * deltaTime;
        }

        //更新卫星环角度（自身旋转，以及主环位置变化会在绘制时实时计算）
        for (let sat of satelliteRings) {
            sat.angle += 0.2 * deltaTime; //卫星自转速度常数
        }
    }

    //绘制
    function draw() {
        ctx.clearRect(0, 0, W, H);
        if (rings.length === 0) return;

        const color = 'hsla(300, 50%, 80%, 0.7)';
        const satColor = 'hsla(300, 50%, 80%, 0.5)';

        //绘制主环（弧段）
        for (let i = 0; i < rings.length; i++) {
            const ring = rings[i];
            const start = ring.startAngle + ring.angle;
            const end = start + ring.arcLength;
            ctx.beginPath();
            ctx.arc(cx, cy, ring.radius, start, end);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        //绘制卫星环（完整圆，位置在主环上）
        //计算每个主环当前角度，以便定位卫星
        for (let sat of satelliteRings) {
            const mainRing = rings[sat.ringIndex];
            if (!mainRing) continue;
            //主环当前总角度
            const mainAngle = mainRing.startAngle + mainRing.angle;
            const satAngle = mainAngle + sat.angleOnMain;
            const satX = cx + mainRing.radius * Math.cos(satAngle);
            const satY = cy + mainRing.radius * Math.sin(satAngle);
            //绘制卫星环（完整圆，加上自身旋转）
            ctx.beginPath();
            ctx.arc(satX, satY, sat.satRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = satColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    //主循环
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
        updateRings(delta);
        draw();
        requestAnimationFrame(animate);
    }

    //窗口缩放时，重新计算中心
    window.addEventListener('resize', resize);

    //启动
    requestAnimationFrame(animate);
})();