//辅助函数：将 Decimal 对象格式化为友好的字符串（例如保留两位小数，自动科学计数）
function formatDecimal(value) {
    //确保 value 是 Decimal 对象
    let v = (value instanceof Decimal) ? value : new Decimal(value);
    
    //数值小于 1000 时，直接保留两位小数
    if (v.lt(1000)) {
        return v.toFixed(2);
    }

    //获取科学记数法所需的对数和指数
    let log10 = v.log10();//Decimal 对象
    let exponent = Decimal.floor(log10);//指数部分（整数）
    let mantissa = v.div(Decimal.pow(10, exponent));//尾数

    //如果指数 ≥ 1000，进入“双层”模式，只显示 e + 指数的科学记数法
    if (exponent.gte(1000)) {
        //将指数自身格式化为科学记数法，并去掉加号
        let expStr = exponent.toExponential(2).replace('+', '');
        return "e" + expStr;
    }

    //普通科学记数法（指数 < 1000）
    let mantissaStr = mantissa.toFixed(2);
    let expStr = exponent.toString().replace('+', '');
    return mantissaStr + "e" + expStr;
}

//界面更新函数
//stat
function updateUI_stat(){
    document.getElementById("Quarks_MAX").innerHTML = "最大夸克数量:" + formatDecimal(quark_max);
    document.getElementById("Game_time").innerHTML = "游戏时间:" + formatGameTime(game_time);
    document.getElementById("h1_re_stat").innerHTML = "夸克禁闭次数:" + formatDecimal(h1_re);
    document.getElementById("h2_ziyuan_MAX").innerHTML = "最大原子数量:" + formatDecimal(h2_ziyuan_max);
    document.getElementById("h2_re_stat").innerHTML = "引力激发次数:" + formatDecimal(h2_re);
}
//可见性
//总可见性
function UIvisible(){
    UIvisible_h2();
    UIvisible_h3();
}
//h2
function UIvisible_h2(){
    let b2_2_auto = document.getElementById('h1_up2auto_b');
    let b2_3_auto = document.getElementById('h1_up3auto_b');
    if (h2_up4.gte(1)){
        b2_2_auto.style.display = 'block';
        b2_3_auto.style.display = 'block';
    }else{
        b2_2_auto.style.display = 'none';
        b2_3_auto.style.display = 'none';
    }
    document.getElementById("h1_up2auto_b").innerHTML = (h1_up2_auto === 1) ? "自动:开" : "自动:关";
    document.getElementById("h1_up3auto_b").innerHTML = (h1_up3_auto === 1) ? "自动:开" : "自动:关";

    let b3_1_auto = document.getElementById('h3_upauto_b');
    let b3_2_auto = document.getElementById('h3_up1_8auto_b');
    if (h2_up13.gte(1)){
        b3_1_auto.style.display = 'block';
        b3_2_auto.style.display = 'block';
    }else{
        b3_1_auto.style.display = 'none';
        b3_2_auto.style.display = 'none';
    }
    document.getElementById("h3_upauto_b").innerHTML = (h3_up1_auto === 1) ? "生成器自动:开" : "生成器自动:关";
    document.getElementById("h3_up1_8auto_b").innerHTML = (h3_up2_auto === 1) ? "氢~氧自动:开" : "氢~氧自动:关";

    let b2_up5_b = document.getElementById('h2_up5buff_b');
    let b2_up6_b = document.getElementById('h2_up6buff_b');
    let b2_up7_b = document.getElementById('h2_up7buff_b');
    h2_up5.gte(1) ? b2_up5_b.style.display = 'block' : b2_up5_b.style.display = 'none';
    h2_up6.gte(1) ? b2_up6_b.style.display = 'block' : b2_up6_b.style.display = 'none';
    h2_up7.gte(1) ? b2_up7_b.style.display = 'block' : b2_up7_b.style.display = 'none';
}
//h3
function UIvisible_h3(){
    let b2_9_b = document.getElementById('h2_up9_b');
    let b2_10_b = document.getElementById('h2_up10_b');
    let b2_11_b = document.getElementById('h2_up11_b');
    let b2_12_b = document.getElementById('h2_up12_b');
    let b2_13_b = document.getElementById('h2_up13_b');
    h2_re.gte(1) ? b2_9_b.style.display = 'block' : b2_10_b.style.display = 'none';
    h2_re.gte(1) ? b2_10_b.style.display = 'block' : b2_10_b.style.display = 'none';
    h2_re.gte(1) ? b2_11_b.style.display = 'block' : b2_11_b.style.display = 'none';
    h2_re.gte(1) ? b2_12_b.style.display = 'block' : b2_12_b.style.display = 'none';
    h2_re.gte(1) ? b2_13_b.style.display = 'block' : b2_13_b.style.display = 'none';
}


//计算函数
//全局增量函数
function global_inc(){
    Quark_js.gte(0.1) && (Quark = Quark.plus(Quark_js));

    h2_e_js.gte(0.1) && (h2_e = h2_e.plus(h2_e_js));
    h2_p_js.gte(0.1) && (h2_p = h2_p.plus(h2_p_js));
    h2_n_js.gte(0.1) && (h2_n = h2_n.plus(h2_n_js));
    (Quark.gte(1000) && h2_up9.gte(1)) && (h2_ziyuan = h2_ziyuan.plus(h2_ziyuan_js));
    h3_mass_js.gte(0.1) && (h3_mass = h3_mass.plus(h3_mass_js));
    h3_BH_js.gte(0.1) && (h3_BH = h3_BH.plus(h3_BH_js));
    h3_up3q_js.gte(0.1) && (h3_up3q = h3_up3q.plus(h3_up3q_js));
    h3_up4q_js.gte(0.1) && (h3_up4q = h3_up4q.plus(h3_up4q_js));
    h3_up5q_js.gte(0.1) && (h3_up5q = h3_up5q.plus(h3_up5q_js));
}
//统计
function stat_hans(){
    game_time += 0.1;
    Quark.gte(quark_max) && (quark_max = Quark , h1_js_re = 1);
    h2_ziyuan.gte(h2_ziyuan_max) && (h2_ziyuan_max = h2_ziyuan , h2_js_re = 1);
}
function formatGameTime(totalSeconds) {
    //处理负数情况
    if (totalSeconds < 0) totalSeconds = 0;
    //计算各时间单位
    let seconds = totalSeconds;
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const secsFormatted = secs.toFixed(1);
    //根据总秒数决定显示格式
    if (totalSeconds >= 86400) {
        return `${days}天${hours}小时${minutes}分钟${secsFormatted}秒`;
    } else if (totalSeconds >= 3600) {
        return `${hours}小时${minutes}分钟${secsFormatted}秒`;
    } else if (totalSeconds >= 60) {
        return `${minutes}分钟${secsFormatted}秒`;
    } else {
        return `${secsFormatted}秒`;
    }
}

//100时钟
let autoInterval;
function startAutoProduction(){
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        //强制重新计算
        function gl_js_hans(){
            h1_js_re = 1;
            h2_js_re = 1;
            h3_js_re = 1;
        }
        gl_js_re >= 6 ? (gl_js_hans(), gl_js_re = 0) : gl_js_re += 1;
        //自动化
        global_auto()

        //计算
        stat_hans();//统计
        (h1_js_re === 1) && (h1_hans(), h1_js_re -= 1);//h1
        (h2_js_re === 1) && (h2_hans(), h2_js_re -= 1);
        (h3_js_re === 1) && (h3_hans(), h3_js_re -= 1);
        global_inc()//全局增量函数，必须位于计算模块最后（避免依赖问题）

        //UI刷新
        updateUI_cut();//界面按钮可见性
        (UI_re === "stat") && (updateUI_stat());//统计
        (UI_re === "h1") && updateUI_h1();//h1
        (UI_re === "h2") && updateUI_h2();//h2
        (UI_re === "h3") && updateUI_h3();//h3
    }, 100);
}

//设置相关
//存档
document.getElementById('manualSaveBtn').addEventListener('click', () => {
    saveGame();
    alert('已存档');     //或者显示临时提示
});

//重置
function resetGame(){
    if (confirm('确定清空所有数据吗？')) {
        localStorage.removeItem('quarkGameSave');
        location.reload();   // 刷新页面，回到初始状态
    }
}

document.getElementById('clearSaveBtn').addEventListener('click', resetGame);

//根据bgIndex设置背景和文字颜色
function applyBackground(){
    document.body.style.backgroundColor = bgColors[bgIndex];
    if (bgIndex === 1) { //深色模式
        document.body.style.color = "#f0f0f0";
    } else {
        document.body.style.color = "";
    }
}
//背景颜色切换（定义几种预设色）
function switchBackground(){
    bgIndex = (bgIndex + 1) % bgColors.length;
    applyBackground();
}

//绑定按钮事件
document.getElementById('bgColorBtn').addEventListener('click', switchBackground);


//存档
function saveGame(){
    const gameState = {
        Quark: Quark.toString(),

        quark_max: quark_max.toString(),
        game_time: game_time,

        h1_up2_auto: h1_up2_auto,
        h1_up3_auto: h1_up3_auto,
        h3_up1_auto: h1_up2_auto,
        h3_up2_auto: h1_up3_auto,

        h1_up1: h1_up1.toString(),
        h1_up1_1: h1_up1_1.toString(),
        h1_up3: h1_up3.toString(),
        h1_re: h1_re.toString(),

        h2_ziyuan: h2_ziyuan.toString(),
        h2_ziyuan_max: h2_ziyuan_max.toString(),
        h2_upe: h2_upe.toString(),
        h2_upp: h2_upp.toString(),
        h2_upn: h2_upn.toString(),
        h2_e: h2_e.toString(),
        h2_p: h2_p.toString(),
        h2_n: h2_n.toString(),
        h2_up1: h2_up1.toString(),
        h2_up2: h2_up2.toString(),
        h2_up3: h2_up3.toString(),
        h2_up4: h2_up4.toString(),
        h2_up5: h2_up5.toString(),
        h2_up6: h2_up6.toString(),
        h2_up7: h2_up7.toString(),
        h2_up8: h2_up8.toString(),
        h2_up9: h2_up9.toString(),
        h2_up10: h2_up10.toString(),
        h2_up11: h2_up11.toString(),
        h2_up12: h2_up12.toString(),
        h2_up13: h2_up13.toString(),
        h2_re: h2_re.toString(),

        h3_ziyuan: h3_ziyuan.toString(),
        h3_ziyuan_max: h3_ziyuan_max.toString(),
        h3_mass: h3_mass.toString(),
        h3_BH: h3_BH.toString(),
        h3_up1: h3_up1.toString(),
        h3_up2: h3_up2.toString(),
        h3_up3: h3_up3.toString(),
        h3_up3q: h3_up3q.toString(),
        h3_up4: h3_up4.toString(),
        h3_up4q: h3_up4q.toString(),
        h3_up5: h3_up5.toString(),
        h3_up5q: h3_up5q.toString(),
        
        bgIndex: bgIndex,
    };
    localStorage.setItem("quarkGameSave", JSON.stringify(gameState));
    console.log("游戏已自动保存");
}
function sanitizeDecimal(value, defaultValue = 0){
    // 先确保是 Decimal 对象
    let dec = value instanceof Decimal ? value : new Decimal(value);
    
    // 通过字符串判断 NaN 或 Infinity（因为 toNumber 可能返回特殊值）
    let str = dec.toString();
    if (str === "NaN" || str === "Infinity" || str === "-Infinity") {
        console.warn("检测到无效数值（NaN/Infinity），重置为", defaultValue);
        return new Decimal(defaultValue);
    }
    
    // 检查是否为负数（-0 是有效的，不需要重置）
    if (dec.lt(0)) {
        console.warn("检测到负数，重置为", defaultValue);
        return new Decimal(defaultValue);
    }
    
    return dec;
}
function loadGame(){
    const saved = localStorage.getItem("quarkGameSave");
    if (saved) {
        const state = JSON.parse(saved);
        
        Quark = sanitizeDecimal(state.Quark);
        quark_max = sanitizeDecimal(state.quark_max);
        game_time = state.game_time !== undefined && !isNaN(state.game_time) ? state.game_time : 0;
        
        h1_up2_auto = (state.h1_up2_auto === 1) ? 1 : 0;
        h1_up3_auto = (state.h1_up3_auto === 1) ? 1 : 0;
        h3_up1_auto = (state.h3_up1_auto === 1) ? 1 : 0;
        h3_up2_auto = (state.h3_up2_auto === 1) ? 1 : 0;
        
        h1_up1 = sanitizeDecimal(state.h1_up1);
        h1_up1_1 = sanitizeDecimal(state.h1_up1_1);
        h1_up3 = sanitizeDecimal(state.h1_up3);
        h1_re = sanitizeDecimal(state.h1_re);
        
        h2_ziyuan = sanitizeDecimal(state.h2_ziyuan);
        h2_ziyuan_max = sanitizeDecimal(state.h2_ziyuan_max);
        h2_upe = sanitizeDecimal(state.h2_upe);
        h2_upp = sanitizeDecimal(state.h2_upp);
        h2_upn = sanitizeDecimal(state.h2_upn);
        h2_e = sanitizeDecimal(state.h2_e);
        h2_p = sanitizeDecimal(state.h2_p);
        h2_n = sanitizeDecimal(state.h2_n);
        h2_up1 = sanitizeDecimal(state.h2_up1);
        h2_up2 = sanitizeDecimal(state.h2_up2);
        h2_up3 = sanitizeDecimal(state.h2_up3);
        h2_up4 = sanitizeDecimal(state.h2_up4);
        h2_up5 = sanitizeDecimal(state.h2_up5);
        h2_up6 = sanitizeDecimal(state.h2_up6);
        h2_up7 = sanitizeDecimal(state.h2_up7);
        h2_up8 = sanitizeDecimal(state.h2_up8);
        h2_up9 = sanitizeDecimal(state.h2_up9);
        h2_up10 = sanitizeDecimal(state.h2_up10);
        h2_up11 = sanitizeDecimal(state.h2_up11);
        h2_up12 = sanitizeDecimal(state.h2_up12);
        h2_up13 = sanitizeDecimal(state.h2_up13);
        h2_re = sanitizeDecimal(state.h2_re);
        
        h3_ziyuan = sanitizeDecimal(state.h3_ziyuan);
        h3_ziyuan_max = sanitizeDecimal(state.h3_ziyuan_max);
        h3_mass = sanitizeDecimal(state.h3_mass);
        h3_BH = sanitizeDecimal(state.h3_BH);
        h3_up1 = sanitizeDecimal(state.h3_up1);
        h3_up2 = sanitizeDecimal(state.h3_up2);
        h3_up3 = sanitizeDecimal(state.h3_up3);
        h3_up3q = sanitizeDecimal(state.h3_up3q);
        h3_up4 = sanitizeDecimal(state.h3_up4);
        h3_up4q = sanitizeDecimal(state.h3_up4q);
        h3_up5 = sanitizeDecimal(state.h3_up5);
        h3_up5q = sanitizeDecimal(state.h3_up5q);

        
        bgIndex = (state.bgIndex >= 0 && state.bgIndex < bgColors.length) ? state.bgIndex : 0;
        applyBackground();
        
        console.log("加载存档成功，已自动修复无效数值");
    } else {
        console.log("没有找到存档，使用初始值");
        bgIndex = 0;
        applyBackground();
    }
    h1_js_re = 1;
    h2_js_re = 1;
}

//启动游戏
loadGame();
h1_cut_hans();//界面切换
UIvisible();//可见性刷新
startAutoProduction();
setInterval(saveGame, 60000);

window.addEventListener('beforeunload', () => {
    if (autoInterval) clearInterval(autoInterval);
});