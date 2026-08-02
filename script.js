let lastCalcTime = performance.now();

// 存储回调，供事件委托使用
let modalConfirmCallback = null;
let modalCancelCallback = null;

/**
 * 显示自定义弹窗
 * @param {string} title          - 标题
 * @param {string} content        - 内容（支持HTML）
 * @param {function} onConfirm    - 确认回调（可选）
 * @param {function} onCancel     - 取消回调（可选）
 * @param {boolean} singleButton  - true=只显示确认按钮
 */
function showModal(title, content, onConfirm, onCancel, singleButton = false) {
    const modal = document.getElementById('myCustomModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;

    const confirmBtn = document.getElementById('modalConfirmBtn');
    const cancelBtn = document.getElementById('modalCancelBtn');

    // 控制取消按钮显隐
    cancelBtn.style.display = singleButton ? 'none' : 'inline-block';

    // 存储回调函数
    modalConfirmCallback = onConfirm || null;
    modalCancelCallback = onCancel || null;

    // 使用 onclick 覆盖之前的监听器（避免重复绑定）
    modal.onclick = function(event) {
        const target = event.target;
        // 确认按钮
        if (target.id === 'modalConfirmBtn') {
            if (modalConfirmCallback) modalConfirmCallback();
            modal.style.display = 'none';
        }
        // 取消按钮（仅在双按钮模式下才响应）
        else if (target.id === 'modalCancelBtn' && !singleButton) {
            if (modalCancelCallback) modalCancelCallback();
            modal.style.display = 'none';
        }
    };

    modal.style.display = 'flex';
}

//辅助函数，将Decimal对象格式化为友好的字符串
function formatDecimal(value){
    let v = (value instanceof Decimal) ? value : new Decimal(value);

    //处理0或负数
    if(v.eq(0)) return "0.00";
    if(v.lt(0)) return v.toFixed(2); //若真有负数，保留两位小数

    //小于1000时，区分极小值
    if(v.lt(1000)){
        if (v.lt(0.01)){
            return v.toExponential(2); //极小值用科学计数法
        }
        return v.toFixed(2); //普通小数保留两位
    }

    //layer=0科学计数法逻辑
    if(v.layer > 0){
        return v.toStringWithDecimalPlaces(2);
    }

    let log10 = v.log10();
    let exponent = Decimal.floor(log10);
    let mantissa = v.div(Decimal.pow(10, exponent));

    if(exponent.gte(1000)){
        let expStr = exponent.toExponential(2).replace('+', '');
        return "e" + expStr;
    }

    let mantissaStr = mantissa.toFixed(2);
    let expStr = exponent.toString().replace('+', '');
    return mantissaStr + "e" + expStr;
}

//界面更新函数
//UI刷新
function jiemian_re(){
    updateUI_cut();//界面按钮可见性
    (UI_re === "stat") && updateUI_stat();//统计
    (UI_re === "cp") && updateUI_cp();
    (UI_re === "h1") && (updateUI_h1(), UIvisible_h1());//h1
    (UI_re === "h2") && (updateUI_h2(), UIvisible_h2());//h2
    (UI_re === "h3") && (updateUI_h3(), UIvisible_h3());//h3
    (UI_re === "h4") && (updateUI_h4(), UIvisible_h4());//h4
    (UI_re === "h5") && (updateUI_h5(), UIvisible_h5());//h5
    (UI_re === "SK") && updateUI_SK();
}
//stat
function updateUI_stat(){
    let Game_time_bl_txt = document.getElementById('Game_time_bl');
    h4_re.gte(1) ? Game_time_bl_txt.style.display = 'block' : Game_time_bl_txt.style.display = 'none';

    document.getElementById("Game_time").innerHTML = "实际游戏时间:" + formatGameTime(game_time);
    document.getElementById("Game_time_bl").innerHTML = "游戏内时间:" + formatGameTime(game_time_bl);
    document.getElementById("Quarks_MAX").innerHTML = "最大夸克数量:" + formatDecimal(quark_max);
    document.getElementById("h1_re_stat").innerHTML = "夸克禁闭次数:" + formatDecimal(h1_re);
    document.getElementById("h2_ziyuan_MAX").innerHTML = "最大原子数量:" + formatDecimal(h2_ziyuan_max);
    document.getElementById("h2_re_stat").innerHTML = "引力激发次数:" + formatDecimal(h2_re);
    document.getElementById("h3_ziyuan_MAX").innerHTML = "最大引力子数量:" + formatDecimal(h3_ziyuan_max);
    document.getElementById("h3_re_stat").innerHTML = "黑洞蒸发次数:" + formatDecimal(h3_re);
    document.getElementById("h4_ziyuan_MAX").innerHTML = "最大暗物质数量:" + formatDecimal(h4_ziyuan_max);
    document.getElementById("h4_re_stat").innerHTML = "时间扭曲次数:" + formatDecimal(h4_re);
    document.getElementById("h5_ziyuan_MAX").innerHTML = "最大时间点数量:" + formatDecimal(h5_ziyuan_max);
    document.getElementById("h5_re_stat").innerHTML = "理论重构次数:" + formatDecimal(h5_re);
}
//可见性
//总可见性
function UIvisible(){
    UIvisible_h1();
    UIvisible_h2();
    UIvisible_h3();
    UIvisible_h4();
    UIvisible_h5();
}
//h1
function UIvisible_h1(){
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

    let h1_up4_b = document.getElementById('h1_up4_button');
    let b2_4_auto = document.getElementById('h1_up4auto_b');
    if (h2_up15.gte(1)){
        h1_up4_b.style.display = 'block';
        b2_4_auto.style.display = 'block';
    }else{
        h1_up4_b.style.display = 'none';
        b2_4_auto.style.display = 'none';
    }
    document.getElementById("h1_up4auto_b").innerHTML = (h1_up4_auto === 1) ? "自动:开" : "自动:关";
}

//h2
function UIvisible_h2(){
    let b3_1_auto = document.getElementById('h3_upauto_b');
    let b3_2_auto = document.getElementById('h3_up1_8auto_b');
    let b3_4_auto = document.getElementById('h3_up9_17auto_b');
    let b_auto8 = document.getElementById('auto8_b');
    if (h2_up13.gte(1)){
        b3_1_auto.style.display = 'block';
        b3_2_auto.style.display = 'block';
    }else{
        b3_1_auto.style.display = 'none';
        b3_2_auto.style.display = 'none';
    }
    if (h2_up23.gte(1)){
        b3_4_auto.style.display = 'block';
    }else{
        b3_4_auto.style.display = 'none';
    }
    if (h2_up30.gte(1)){
        b_auto8.style.display = 'block';
    }else{
        b_auto8.style.display = 'none';
    }
    document.getElementById("h3_upauto_b").innerHTML = (h3_up1_auto === 1) ? "生成器自动:开" : "生成器自动:关";
    document.getElementById("h3_up1_8auto_b").innerHTML = (h3_up2_auto === 1) ? "氢~氧自动:开" : "氢~氧自动:关";
    document.getElementById("h3_up9_17auto_b").innerHTML = (h3_up4_auto === 1) ? "氟~氯自动:开" : "氟~氯自动:关";
    document.getElementById("auto8_b").innerHTML = (auto8 === 1) ? "氩~镍自动:开" : "氩~镍自动:关";

    let b2_up5_b = document.getElementById('h2_up5buff_b');
    let b2_up6_b = document.getElementById('h2_up6buff_b');
    let b2_up7_b = document.getElementById('h2_up7buff_b');
    h2_up5.gte(1) ? b2_up5_b.style.display = 'block' : b2_up5_b.style.display = 'none';
    h2_up6.gte(1) ? b2_up6_b.style.display = 'block' : b2_up6_b.style.display = 'none';
    h2_up7.gte(1) ? b2_up7_b.style.display = 'block' : b2_up7_b.style.display = 'none';

    let b2_9_b = document.getElementById('h2_up9_b');
    let b2_10_b = document.getElementById('h2_up10_b');
    let b2_11_b = document.getElementById('h2_up11_b');
    let b2_12_b = document.getElementById('h2_up12_b');
    let b2_13_b = document.getElementById('h2_up13_b');
    let b2_14_b = document.getElementById('h2_up14_b');
    let b2_15_b = document.getElementById('h2_up15_b');
    let b2_16_b = document.getElementById('h2_up16_b');
    let b2_17_b = document.getElementById('h2_up17_b');
    h2_re.gte(1) ? b2_9_b.style.display = 'block' : b2_10_b.style.display = 'none';
    h2_re.gte(1) ? b2_10_b.style.display = 'block' : b2_10_b.style.display = 'none';
    h2_re.gte(1) ? b2_11_b.style.display = 'block' : b2_11_b.style.display = 'none';
    h2_re.gte(1) ? b2_12_b.style.display = 'block' : b2_12_b.style.display = 'none';
    h2_re.gte(1) ? b2_13_b.style.display = 'block' : b2_13_b.style.display = 'none';
    h2_re.gte(1) ? b2_14_b.style.display = 'block' : b2_14_b.style.display = 'none';
    h2_re.gte(1) ? b2_15_b.style.display = 'block' : b2_15_b.style.display = 'none';
    h2_re.gte(1) ? b2_16_b.style.display = 'block' : b2_16_b.style.display = 'none';
    h2_re.gte(1) ? b2_17_b.style.display = 'block' : b2_17_b.style.display = 'none';

    let b2_18_b = document.getElementById('h2_up18_b');
    let b2_19_b = document.getElementById('h2_up19_b');
    let b2_20_b = document.getElementById('h2_up20_b');
    let b2_21_b = document.getElementById('h2_up21_b');
    let b2_22_b = document.getElementById('h2_up22_b');
    let b2_23_b = document.getElementById('h2_up23_b');
    let b2_24_b = document.getElementById('h2_up24_b');
    let b2_25_b = document.getElementById('h2_up25_b');
    let b2_26_b = document.getElementById('h2_up26_b');
    let b2_27_b = document.getElementById('h2_up27_b');
    let b2_28_b = document.getElementById('h2_up28_b');
    h3_re.gte(1) ? b2_18_b.style.display = 'block' : b2_18_b.style.display = 'none';
    h3_re.gte(1) ? b2_19_b.style.display = 'block' : b2_19_b.style.display = 'none';
    h3_re.gte(1) ? b2_20_b.style.display = 'block' : b2_20_b.style.display = 'none';
    h3_re.gte(1) ? b2_21_b.style.display = 'block' : b2_21_b.style.display = 'none';
    h3_re.gte(1) ? b2_22_b.style.display = 'block' : b2_22_b.style.display = 'none';
    h3_re.gte(1) ? b2_23_b.style.display = 'block' : b2_23_b.style.display = 'none';
    h3_re.gte(1) ? b2_24_b.style.display = 'block' : b2_24_b.style.display = 'none';
    h3_re.gte(1) ? b2_25_b.style.display = 'block' : b2_25_b.style.display = 'none';
    h3_re.gte(1) ? b2_26_b.style.display = 'block' : b2_26_b.style.display = 'none';
    h3_re.gte(1) ? b2_27_b.style.display = 'block' : b2_27_b.style.display = 'none';
    h3_re.gte(1) ? b2_28_b.style.display = 'block' : b2_28_b.style.display = 'none';
    
    let b2_29_b = document.getElementById('h2_up29_b');
    let b2_30_b = document.getElementById('h2_up30_b');
    let b2_31_b = document.getElementById('h2_up31_b');
    let b2_32_b = document.getElementById('h2_up32_b');
    h4_re.gte(1) ? b2_29_b.style.display = 'block' : b2_29_b.style.display = 'none';
    h4_re.gte(1) ? b2_30_b.style.display = 'block' : b2_30_b.style.display = 'none';
    h4_re.gte(1) ? b2_31_b.style.display = 'block' : b2_31_b.style.display = 'none';
    h4_re.gte(1) ? b2_32_b.style.display = 'block' : b2_32_b.style.display = 'none';
}
//h3
function UIvisible_h3(){
    let b3_3_auto = document.getElementById('h3_up_all_auto_b');
    if (h2_up22.gte(1)){
        b3_3_auto.style.display = 'block';
    }else{
        b3_3_auto.style.display = 'none';
    }
    document.getElementById("h3_up_all_auto_b").innerHTML = (h3_up3_auto === 1) ? "自动:开" : "自动:关";

    let b3_7_b = document.getElementById('h3_up7_b');
    let b3_8_b = document.getElementById('h3_up8_b');
    h2_up20.gte(1) ? b3_7_b.style.display = 'block' : b3_7_b.style.display = 'none';
    h2_up20.gte(1) ? b3_8_b.style.display = 'block' : b3_8_b.style.display = 'none';

    let b3_9_b = document.getElementById('h3_up9_b');
    let b3_10_b = document.getElementById('h3_up10_b');
    h2_up29.gte(1) ? b3_9_b.style.display = 'block' : b3_9_b.style.display = 'none';
    h2_up29.gte(1) ? b3_10_b.style.display = 'block' : b3_10_b.style.display = 'none';
}

//h4
function UIvisible_h4(){

}

//h5
function UIvisible_h5(){
    let b5_up3_b = document.getElementById('h5_up3');
    let b5_up4_b = document.getElementById('h5_up4');
    let b5_up6_b = document.getElementById('h5_up6');
    let b5_up7_b = document.getElementById('h5_up7');
    let b5_up9_b = document.getElementById('h5_up9');
    let b5_up10_b = document.getElementById('h5_up10');
    h5_up2.gte(10) ? b5_up3_b.style.display = 'block' : b5_up3_b.style.display = 'none';
    h5_up3.gte(10) ? b5_up4_b.style.display = 'block' : b5_up4_b.style.display = 'none';
    h5_up5.gte(10) ? b5_up6_b.style.display = 'block' : b5_up6_b.style.display = 'none';
    h5_up6.gte(10) ? b5_up7_b.style.display = 'block' : b5_up7_b.style.display = 'none';
    h5_up8.gte(10) ? b5_up9_b.style.display = 'block' : b5_up9_b.style.display = 'none';
    h5_up9.gte(10) ? b5_up10_b.style.display = 'block' : b5_up10_b.style.display = 'none';
}

//计算函数
//全局增量函数
function global_inc(dt) {
    Quark = Quark.plus(Quark_js.times(dt).times(h5_time_buff));
    if (Quark.lt(0)) Quark = new Decimal(0);

    h2_e = h2_e.plus(h2_e_js.times(dt).times(h5_time_buff));
    h2_p = h2_p.plus(h2_p_js.times(dt).times(h5_time_buff));
    h2_n = h2_n.plus(h2_n_js.times(dt).times(h5_time_buff));

    if (Quark.gte(1000) && h2_up9.gte(1)) {
        h2_ziyuan = h2_ziyuan.plus(h2_ziyuan_js.times(10).times(dt).times(h5_time_buff));
        if (h2_ziyuan.lt(0)) h2_ziyuan = new Decimal(0);
    }
    if (h2_ziyuan.gte(5e4) && h2_up18.gte(1)) {
        h3_ziyuan = h3_ziyuan.plus(h3_ziyuan_js.times(10).times(dt).times(h5_time_buff));
        if (h3_ziyuan.lt(0)) h3_ziyuan = new Decimal(0);
    }
    if (h3_ziyuan.gte(1e6) && h2_up31.gte(1)) {
        h4_ziyuan = h4_ziyuan.plus(h4_ziyuan_js.times(10).times(dt).times(h5_time_buff));
        if (h4_ziyuan.lt(0)) h4_ziyuan = new Decimal(0);
    }

    h3_mass = h3_mass.plus(h3_mass_js.times(dt).times(h5_time_buff));
    if (h3_mass.lt(0)) h3_mass = new Decimal(0);
    h3_BH = h3_BH.plus(h3_BH_js.times(dt).times(h5_time_buff));
    if (h3_BH.lt(0)) h3_BH = new Decimal(0);
    h3_up3q = h3_up3q.plus(h3_up3q_js.times(dt).times(h5_time_buff));
    h3_up4q = h3_up4q.plus(h3_up4q_js.times(dt).times(h5_time_buff));
    h3_up5q = h3_up5q.plus(h3_up5q_js.times(dt).times(h5_time_buff));
    h3_up6q = h3_up6q.plus(h3_up6q_js.times(dt).times(h5_time_buff));
    h3_up7q = h3_up7q.plus(h3_up7q_js.times(dt).times(h5_time_buff));
    h3_up8q = h3_up8q.plus(h3_up8q_js.times(dt).times(h5_time_buff));
    h3_up9q = h3_up9q.plus(h3_up9q_js.times(dt).times(h5_time_buff));
    h3_up10q = h3_up10q.plus(h3_up10q_js.times(dt).times(h5_time_buff));

    h4_up1q = h4_up1q.plus(h4_up1_js.times(dt).times(h5_time_buff));
    h4_up2q = h4_up2q.plus(h4_up2_js.times(dt).times(h5_time_buff));
    h4_up3q = h4_up3q.plus(h4_up3_js.times(dt).times(h5_time_buff));

    h5_time_confetti = h5_time_confetti.plus(h5_time_confetti_js.times(dt));//时间碎片本身，切记不要“临时起意”加上h5_time_buff
}
//统计
function stat_hans(dt){
    game_time += dt;
    game_time_bl = game_time_bl.plus(new Decimal(dt).times(h5_time_buff));
    new Decimal(game_time).gt(game_time_bl) && (game_time_bl = new Decimal(game_time));

    Quark.gte(quark_max) && (quark_max = Quark , h1_js_re = 1);
    h2_ziyuan.gte(h2_ziyuan_max) && (h2_ziyuan_max = h2_ziyuan , h2_js_re = 1);
    h3_ziyuan.gte(h3_ziyuan_max) && (h3_ziyuan_max = h3_ziyuan , h3_js_re = 1);
    h4_ziyuan.gte(h4_ziyuan_max) && (h4_ziyuan_max = h4_ziyuan , h4_js_re = 1);
    h5_ziyuan.gte(h5_ziyuan_max) && (h5_ziyuan_max = h5_ziyuan , h5_js_re = 1);
}
function formatGameTime(totalSeconds){
    //统一转换为 Decimal 实例，支持 number / string / Decimal 输入
    let s = Decimal.fromValue(totalSeconds);

    //处理负数（归零）
    if (s.lt(0)) s = new Decimal(0);

    //时间常量（单位：秒）
    const YEAR_SEC = 31536000; //365 * 24 * 3600
    const DAY_SEC  = 86400;
    const HOUR_SEC = 3600;
    const MIN_SEC  = 60;

    //分层提取各个时间单位
    const years = s.div(YEAR_SEC).floor();
    let rem = s.minus(years.mul(YEAR_SEC));

    const days = rem.div(DAY_SEC).floor();
    rem = rem.minus(days.mul(DAY_SEC));

    const hours = rem.div(HOUR_SEC).floor();
    rem = rem.minus(hours.mul(HOUR_SEC));

    const minutes = rem.div(MIN_SEC).floor();
    rem = rem.minus(minutes.mul(MIN_SEC));

    //格式化各个部分（年不补零，其他补零到指定位数）
    const yearStr = years.toString();
    const dayStr   = days.toString().padStart(3, '0');
    const hourStr  = hours.toString().padStart(2, '0');
    const minStr   = minutes.toString().padStart(2, '0');

    //秒保留一位小数，整数部分补零到2位
    const secFixed = rem.toFixed(1);
    const [secInt, secDec] = secFixed.split('.');
    const secStr = secInt.padStart(2, '0') + '.' + secDec;

    //按层级拼接（从最大非零单位开始）
    if(years.gt(0)){
        return `${yearStr}年${dayStr}天${hourStr}小时${minStr}分钟${secStr}秒`;
    }else if(days.gt(0) || s.gte(DAY_SEC)) {
        return `${dayStr}天${hourStr}小时${minStr}分钟${secStr}秒`;
    }else if(hours.gt(0) || s.gte(HOUR_SEC)) {
        return `${hourStr}小时${minStr}分钟${secStr}秒`;
    }else if(minutes.gt(0) || s.gte(MIN_SEC)) {
        return `${minStr}分钟${secStr}秒`;
    }else{
        return `${secStr}秒`;
    }
}

//时钟
let autoInterval;
function startAutoProduction(){
    if (autoInterval) clearInterval(autoInterval);
    lastCalcTime = performance.now();
    autoInterval = setInterval(() => {
        const now = performance.now();
        let dt = (now - lastCalcTime) / 1000;
        lastCalcTime = now;
        dt = Math.min(dt, 300); // 限制最大值，防止跳跃

        //强制刷新
        if (gl_js_re <= 5){
            (gl_js_re === 0) && (SK_hans());
            (gl_js_re === 1) && (h1_js_re = 1);
            (gl_js_re === 2) && (h2_js_re = 1);
            (gl_js_re === 3) && (h3_js_re = 1);
            (gl_js_re === 4) && (h4_js_re = 1);
            (gl_js_re === 5) && (h5_js_re = 1);
            gl_js_re += 1;
        }else{
            gl_js_re = 0;
        };


        // 先刷新 UI
        jiemian_re(); 

        // 自动化
        global_auto();

        // 计算
        stat_hans(dt);        // 传入 dt
        (sk_ing === 1) && (SK_hans());
        (h1_js_re === 1) && (h1_hans(), h1_js_re -= 1);
        (h2_js_re === 1) && (h2_hans(), h2_js_re -= 1);
        (h3_js_re === 1) && (h3_hans(), h3_js_re -= 1);
        (h4_js_re === 1) && (h4_hans(), h4_js_re -= 1);
        (h5_js_re === 1) && (h5_hans(), h5_js_re -= 1);
        cp_ds_sj();
        global_inc(dt);       // 传入 dt
    }, 16);
}


//设置相关
//存档
document.getElementById('manualSaveBtn').addEventListener('click', () => {
    saveGame();
    alert('已存档');
});

//导入与导出
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const base64 = e.target.result; // 读取到的 Base64 字符串
            const json = decodeURIComponent(atob(base64)); // 解码
            const state = JSON.parse(json);
            applyGameState(state);
            saveGame();

            // 重启定时器
            if (autoInterval) {
                clearInterval(autoInterval);
                autoInterval = null;
            }
            startAutoProduction();

            // 刷新 UI
            UIvisible();
            if (UI_re === "h1") updateUI_h1();
            else if (UI_re === "h2") updateUI_h2();
            else if (UI_re === "h3") updateUI_h3();
            else if (UI_re === "h4") updateUI_h4();
            else if (UI_re === "h5") updateUI_h5();
            else if (UI_re === "cp") updateUI_cp();
            else if (UI_re === "stat") updateUI_stat();

            alert('存档导入成功');
        } catch (err) {
            alert('导入失败，文件内容无效。\n错误信息：' + err.message);
            console.error(err);
        }
        document.getElementById('fileInput').value = '';
    };
    reader.readAsText(file);
});

// 绑定导入按钮：触发文件选择
document.getElementById('importSaveBtn').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});
//导出
document.getElementById('exportSaveBtn').addEventListener('click', exportSave);

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
    if (bgIndex === 1 || bgIndex === 4) { //深色模式
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
function saveGame() {
    const gameState = getGameState();
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

// 获取当前游戏状态（所有变量）
function getGameState() {
    return {
        game_tc: game_tc,

        Quark: Quark.toString(),
        quark_max: quark_max.toString(),
        game_time: game_time,
        game_time_bl: game_time_bl,

        cp_version: cp_version,
        cp_ds: cp_ds,
        cp_ds_cs: cp_ds_cs,
        cp_up1: cp_up1,
        cp_up2: cp_up2,
        cp_up3: cp_up3,
        cp_up4: cp_up4,
        cp_up5: cp_up5,

        h1_up2_auto: h1_up2_auto,
        h1_up3_auto: h1_up3_auto,
        h1_up4_auto: h1_up4_auto,
        h3_up1_auto: h3_up1_auto,
        h3_up2_auto: h3_up2_auto,
        h3_up3_auto: h3_up3_auto,
        h3_up4_auto: h3_up4_auto,
        auto8: auto8,

        sk_ing: sk_ing,
        sk_1_ing: sk_1_ing,
        sk_1_MAX: sk_1_MAX.toString(),

        h1_up1: h1_up1.toString(),
        h1_up1_1: h1_up1_1.toString(),
        h1_up3: h1_up3.toString(),
        h1_up4: h1_up4.toString(),
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
        h2_up14: h2_up14.toString(),
        h2_up15: h2_up15.toString(),
        h2_up16: h2_up16.toString(),
        h2_up17: h2_up17.toString(),
        h2_up18: h2_up18.toString(),
        h2_up19: h2_up19.toString(),
        h2_up20: h2_up20.toString(),
        h2_up21: h2_up21.toString(),
        h2_up22: h2_up22.toString(),
        h2_up23: h2_up23.toString(),
        h2_up24: h2_up24.toString(),
        h2_up25: h2_up25.toString(),
        h2_up26: h2_up26.toString(),
        h2_up27: h2_up27.toString(),
        h2_up28: h2_up28.toString(),
        h2_up29: h2_up29.toString(),
        h2_up30: h2_up30.toString(),
        h2_up31: h2_up31.toString(),
        h2_up32: h2_up32.toString(),
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
        h3_up6: h3_up6.toString(),
        h3_up6q: h3_up6q.toString(),
        h3_up7: h3_up7.toString(),
        h3_up7q: h3_up7q.toString(),
        h3_up8: h3_up8.toString(),
        h3_up8q: h3_up8q.toString(),
        h3_up9: h3_up9.toString(),
        h3_up9q: h3_up9q.toString(),
        h3_up10: h3_up10.toString(),
        h3_up10q: h3_up10q.toString(),
        h3_re: h3_re.toString(),

        h4_ziyuan: h4_ziyuan.toString(),
        h4_ziyuan_max: h4_ziyuan_max.toString(),
        h4_N: h4_N.toString(),
        h4_DMH: h4_DMH.toString(),
        h4_GN: h4_GN.toString(),
        h4_up1: h4_up1.toString(),
        h4_up1q: h4_up1q.toString(),
        h4_up2: h4_up2.toString(),
        h4_up2q: h4_up2q.toString(),
        h4_up3: h4_up3.toString(),
        h4_up3q: h4_up3q.toString(),
        h4_re: h4_re.toString(),

        h5_ziyuan: h5_ziyuan.toString(),
        h5_ziyuan_max: h5_ziyuan_max.toString(),
        h5_time_confetti: h5_time_confetti.toString(),
        h5_up1: h5_up1.toString(),
        h5_up2: h5_up2.toString(),
        h5_up3: h5_up3.toString(),
        h5_up4: h5_up4.toString(),
        h5_up5: h5_up5.toString(),
        h5_up6: h5_up6.toString(),
        h5_up7: h5_up7.toString(),
        h5_up8: h5_up8.toString(),
        h5_up9: h5_up9.toString(),
        h5_up10: h5_up10.toString(),
        h5_up11: h5_up11.toString(),
        h5_up12: h5_up12.toString(),

        bgIndex: bgIndex,
    };
}

function loadGame() {
    const saved = localStorage.getItem("quarkGameSave");
    if (saved) {
        try {
            const state = JSON.parse(saved);
            applyGameState(state);
            console.log("加载存档成功");
        } catch (e) {
            console.warn("存档解析失败，使用初始值", e);
            bgIndex = 0;
            applyBackground();
        }
    } else {
        console.log("没有找到存档，使用初始值");
        bgIndex = 0;
        applyBackground();
    };
    initSK();
    if (!localStorage.getItem('quarkGameSave')) {
        showModal('欢迎游玩', '在本游戏中您的目标是尽可能的获取更多的夸克，试着点击“夸克+1.00”获得您的第一个夸克吧！',null,null,true);
    }
}

function applyGameState(state) {
    if (!state) return;

    game_tc = state.game_tc !== undefined && !isNaN(state.game_tc) ? state.game_tc : 0;

    Quark = sanitizeDecimal(state.Quark);
    quark_max = sanitizeDecimal(state.quark_max);
    game_time = state.game_time !== undefined && !isNaN(state.game_time) ? state.game_time : 0;
    game_time_bl = sanitizeDecimal(state.game_time_bl);

    cp_version = state.cp_version !== undefined && !isNaN(state.cp_version) ? state.cp_version : 1.0;
    cp_ds = state.cp_ds !== undefined && !isNaN(state.cp_ds) ? state.cp_ds : 0;
    cp_ds_cs = state.cp_ds_cs !== undefined && !isNaN(state.cp_ds_cs) ? state.cp_ds_cs : 0;
    cp_up1 = state.cp_up1 !== undefined && !isNaN(state.cp_up1) ? state.cp_up1 : 0;
    cp_up2 = state.cp_up2 !== undefined && !isNaN(state.cp_up2) ? state.cp_up2 : 0;
    cp_up3 = state.cp_up3 !== undefined && !isNaN(state.cp_up3) ? state.cp_up3 : 0;
    cp_up4 = state.cp_up4 !== undefined && !isNaN(state.cp_up4) ? state.cp_up4 : 0;
    cp_up5 = state.cp_up5 !== undefined && !isNaN(state.cp_up5) ? state.cp_up5 : 0;

    h1_up2_auto = (state.h1_up2_auto === 1) ? 1 : 0;
    h1_up3_auto = (state.h1_up3_auto === 1) ? 1 : 0;
    h1_up4_auto = (state.h1_up4_auto === 1) ? 1 : 0;
    h3_up1_auto = (state.h3_up1_auto === 1) ? 1 : 0;
    h3_up2_auto = (state.h3_up2_auto === 1) ? 1 : 0;
    h3_up3_auto = (state.h3_up3_auto === 1) ? 1 : 0;
    h3_up4_auto = (state.h3_up4_auto === 1) ? 1 : 0;
    auto8 = (state.auto8 === 1) ? 1 : 0;

    sk_ing = (state.sk_ing === 1) ? 1 : 0;
    sk_1_ing = (state.sk_1_ing === 1) ? 1 : 0;
    sk_1_MAX = sanitizeDecimal(state.sk_1_MAX);

    h1_up1 = sanitizeDecimal(state.h1_up1);
    h1_up1_1 = sanitizeDecimal(state.h1_up1_1);
    h1_up3 = sanitizeDecimal(state.h1_up3);
    h1_up4 = sanitizeDecimal(state.h1_up4);
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
    h2_up14 = sanitizeDecimal(state.h2_up14);
    h2_up15 = sanitizeDecimal(state.h2_up15);
    h2_up16 = sanitizeDecimal(state.h2_up16);
    h2_up17 = sanitizeDecimal(state.h2_up17);
    h2_up18 = sanitizeDecimal(state.h2_up18);
    h2_up19 = sanitizeDecimal(state.h2_up19);
    h2_up20 = sanitizeDecimal(state.h2_up20);
    h2_up21 = sanitizeDecimal(state.h2_up21);
    h2_up22 = sanitizeDecimal(state.h2_up22);
    h2_up23 = sanitizeDecimal(state.h2_up23);
    h2_up24 = sanitizeDecimal(state.h2_up24);
    h2_up25 = sanitizeDecimal(state.h2_up25);
    h2_up26 = sanitizeDecimal(state.h2_up26);
    h2_up27 = sanitizeDecimal(state.h2_up27);
    h2_up28 = sanitizeDecimal(state.h2_up28);
    h2_up29 = sanitizeDecimal(state.h2_up29);
    h2_up30 = sanitizeDecimal(state.h2_up30);
    h2_up31 = sanitizeDecimal(state.h2_up31);
    h2_up32 = sanitizeDecimal(state.h2_up32);
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
    h3_up6 = sanitizeDecimal(state.h3_up6);
    h3_up6q = sanitizeDecimal(state.h3_up6q);
    h3_up7 = sanitizeDecimal(state.h3_up7);
    h3_up7q = sanitizeDecimal(state.h3_up7q);
    h3_up8 = sanitizeDecimal(state.h3_up8);
    h3_up8q = sanitizeDecimal(state.h3_up8q);
    h3_up9 = sanitizeDecimal(state.h3_up9);
    h3_up9q = sanitizeDecimal(state.h3_up9q);
    h3_up10 = sanitizeDecimal(state.h3_up10);
    h3_up10q = sanitizeDecimal(state.h3_up10q);
    h3_re = sanitizeDecimal(state.h3_re);

    h4_ziyuan = sanitizeDecimal(state.h4_ziyuan);
    h4_ziyuan_max = sanitizeDecimal(state.h4_ziyuan_max);
    h4_N = sanitizeDecimal(state.h4_N);
    h4_DMH = sanitizeDecimal(state.h4_DMH);
    h4_GN = sanitizeDecimal(state.h4_GN);
    h4_up1 = sanitizeDecimal(state.h4_up1);
    h4_up1q = sanitizeDecimal(state.h4_up1q);
    h4_up2 = sanitizeDecimal(state.h4_up2);
    h4_up2q = sanitizeDecimal(state.h4_up2q);
    h4_up3 = sanitizeDecimal(state.h4_up3);
    h4_up3q = sanitizeDecimal(state.h4_up3q);
    h4_re = sanitizeDecimal(state.h4_re);

    h5_ziyuan = sanitizeDecimal(state.h5_ziyuan);
    h5_ziyuan_max = sanitizeDecimal(state.h5_ziyuan_max);
    h5_time_confetti = sanitizeDecimal(state.h5_time_confetti);
    h5_up1 = sanitizeDecimal(state.h5_up1);
    h5_up2 = sanitizeDecimal(state.h5_up2);
    h5_up3 = sanitizeDecimal(state.h5_up3);
    h5_up4 = sanitizeDecimal(state.h5_up4);
    h5_up5 = sanitizeDecimal(state.h5_up5);
    h5_up6 = sanitizeDecimal(state.h5_up6);
    h5_up7 = sanitizeDecimal(state.h5_up7);
    h5_up8 = sanitizeDecimal(state.h5_up8);
    h5_up9 = sanitizeDecimal(state.h5_up9);
    h5_up10 = sanitizeDecimal(state.h5_up10);
    h5_up11 = sanitizeDecimal(state.h5_up11);
    h5_up12 = sanitizeDecimal(state.h5_up12);

    bgIndex = (state.bgIndex >= 0 && state.bgIndex < bgColors.length) ? state.bgIndex : 0;
    applyBackground();

    // 重置 JS 刷新标志
    h1_js_re = 1;
    h2_js_re = 1;
    h3_js_re = 1;
    h4_js_re = 1;
    h5_js_re = 1;
}

function exportSave() {
    try {
        const gameState = getGameState();
        const json = JSON.stringify(gameState);
        const base64 = btoa(encodeURIComponent(json)); // 转为 Base64

        // 创建文本文件（内容为 Base64 字符串）
        const blob = new Blob([base64], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `INC:Quark_save_${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('存档已导出为文件');
    } catch (e) {
        alert('导出失败：' + e.message);
        console.error(e);
    }
}

function importSave() {
    const input = prompt("请输入要导入的存档文件：");
    if (input === null) return;

    try {
        const json = decodeURIComponent(atob(input));
        const state = JSON.parse(json);
        applyGameState(state);
        saveGame(); // 保存到 localStorage

        // 重启定时器
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
        startAutoProduction();

        // 刷新当前界面
        UIvisible();
        initSK();
        jiemian_re();

        alert("存档导入成功！");
    } catch (e) {
        alert("导入失败，请检查存档是否有效。\n错误信息：" + e.message);
        console.error(e);
    }
}

//启动游戏
loadGame();
h1_cut_hans();//界面切换
UIvisible();//可见性刷新
startAutoProduction();
setInterval(saveGame, 300000);

window.addEventListener('beforeunload', () => {
    if (autoInterval) clearInterval(autoInterval);
});