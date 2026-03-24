//所有数值都使用 Decimal 对象
//背景颜色预设（全局）
const bgColors = ["#ffffff", "#1e1e2f", "#f5f0e6", "#d9e8f5"];
let bgIndex = 0;  //当前背景索引，0=白色

let UI_re = "h1";

let game_time = 0;
let quark_max = new Decimal(0);

let h1_js_re = 1;

let Quark = new Decimal(0);

let Quark_h1_js = new Decimal(0);
let Quark_h2_buff = new Decimal(0);
let Quark_js = Quark_h1_js;

let h1_up1 = new Decimal(0);//+1点击产量
let h1_up1_1 = new Decimal(0);//夸克产量+
let h1_up3 = new Decimal(0);//夸克产量*
let h1_re = 0;

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
}
//h1
function updateUI_h1() {
    let b1_re = document.getElementById('h1_re_b');
    b1_re.style.visibility = quark_max.gte(1000) ? 'visible' : 'hidden';
    b1_re.style.opacity = Quark.gte(1000) ? '1' : '0.5';

    document.getElementById("Quarks").innerHTML = "夸克:" + formatDecimal(Quark);
    document.getElementById("h1_up1s").innerHTML = formatDecimal(Quark_js.times(10)) + "/s";

    //点击按钮文字
    let clickBase = new Decimal(1);
    let clickBonus = h1_up1_1;
    let clickTotal = clickBase.plus(clickBonus);
    document.getElementById("Quark+").innerHTML = "夸克+" + formatDecimal(clickTotal);

    //点击产量升级按钮（费用 = (等级)^2 + 1）
    let b1_1_1 = document.getElementById('h1_up1_1_button');
    let clickCost = h1_up1_1.pow(2).plus(1);
    b1_1_1.style.opacity = Quark.gte(clickCost) ? '1' : '0.5';
    document.getElementById("h1_up1_1_button").innerHTML = "+1点击产量" + h1_up1_1.toString() + "级 费用:" + formatDecimal(clickCost) + "夸克";

    //自动生成器升级按钮（费用 = 2^等级 × 10）
    let b1_2 = document.getElementById('h1_up2_button');
    let genCost = Decimal.pow(1.2, h1_up1).times(10);
    b1_2.style.opacity = Quark.gte(genCost) ? '1' : '0.5';
    document.getElementById("h1_up2_button").innerHTML = "夸克产量+" + h1_up1.toString() + " 费用:" + formatDecimal(genCost) + "夸克";

    let b1_3 = document.getElementById("h1_up3_button");
    let h1_up3_cost = Decimal.pow(1.5, h1_up3).times(100);
    b1_3.style.opacity = Quark.gte(h1_up3_cost) ? '1' : '0.5';
    document.getElementById("h1_up3_button").innerHTML = "夸克产量*" + h1_up3.plus(1).toString() + " 费用:" + formatDecimal(h1_up3_cost) + "夸克";
}

//计算函数
//统计
function stat_hans(){
    game_time += 0.1;
    Quark.gte(quark_max) && (quark_max = Quark);
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
//h1
function h1_hans(){
    Quark_h1_js = h1_up1.times(0.1).times(h1_up3.plus(1));
    Quark_h2_buff = new Decimal(((h2_ziyuan.plus(1)).log(10))).plus(1)

    Quark_js = Quark_h1_js.times(Quark_h2_buff);
}

//夸克+
function h1_up1_button() {
    let gain = new Decimal(1).plus(h1_up1_1);
    Quark = Quark.plus(gain);
    updateUI_h1();
}

//+1点击产量
function h1_up1_1_button() {
    let cost = h1_up1_1.pow(2).plus(1);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up1_1 = h1_up1_1.plus(1);
        updateUI_h1();
    }
}

//夸克产量+
function h1_up2_button() {
    let cost = Decimal.pow(1.2, h1_up1).times(10);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up1 = h1_up1.plus(1);
        updateUI_h1();
        h1_js_re = 1;
    }
}
//夸克产量*
function h1_up3_button() {
    let cost = Decimal.pow(1.5, h1_up3).times(100);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up3 = h1_up3.plus(1);
        updateUI_h1();
        h1_js_re = 1;
    }
}

function h1_re_button(){
    Quark.gte(1000) && (h2_ziyuan = h2_ziyuan.plus(Quark.log(10)) , h1_re_hans());
}

function h1_re_hans(){
    Quark = new Decimal(0);

    Quark_h1_js = new Decimal(0);
    Quark_js = Quark_h1_js;

    h1_up1 = new Decimal(0);
    h1_up1_1 = new Decimal(0);
    h1_up3 = new Decimal(0);

    h1_re += 1
    h1_js_re = 1;
}

//100时钟
let autoInterval;
function startAutoProduction() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        //计算
        stat_hans();//统计
        (h1_js_re === 1) && (h1_hans(), h1_js_re -= 1);//h1
        Quark = Quark.plus(Quark_js);

        //UI刷新
        updateUI_cut();
        (UI_re === "stat") && (updateUI_stat());//统计
        (UI_re === "h1") && updateUI_h1();//h1
        (UI_re === "h2") && updateUI_h2();//h2
    }, 100);
}

//设置相关
//存档
document.getElementById('manualSaveBtn').addEventListener('click', () => {
    saveGame();
    alert('已存档');     //或者显示临时提示
});

//重置
function resetGame() {
    if (confirm('确定清空所有数据吗？')) {
        localStorage.removeItem('quarkGameSave');
        location.reload();   // 刷新页面，回到初始状态
    }
}

document.getElementById('clearSaveBtn').addEventListener('click', resetGame);

//根据bgIndex设置背景和文字颜色
function applyBackground() {
    document.body.style.backgroundColor = bgColors[bgIndex];
    if (bgIndex === 1) { //深色模式
        document.body.style.color = "#f0f0f0";
    } else {
        document.body.style.color = "";
    }
}
//背景颜色切换（定义几种预设色）
function switchBackground() {
    bgIndex = (bgIndex + 1) % bgColors.length;
    applyBackground();
}

//绑定按钮事件
document.getElementById('bgColorBtn').addEventListener('click', switchBackground);

//界面切换
//切换函数
function xs_hans() {
    document.getElementById('h1').style.display = 'none';
    document.getElementById('h2').style.display = 'none';
    document.getElementById('set').style.display = 'none';
    document.getElementById('stat').style.display = 'none';
}

function h1_cut_hans() {
    xs_hans()
    UI_re = "h1"
    document.getElementById('h1').style.display = 'block';
}

function h2_cut_hans() {
    xs_hans()
    UI_re = "h2"
    document.getElementById('h2').style.display = 'block';
}

function set_cut_hans() {
    xs_hans()
    UI_re = "set"
    document.getElementById('set').style.display = 'block';
}

function stat_cut_hans() {
    xs_hans()
    UI_re = "stat"
    document.getElementById('stat').style.display = 'block';
}

//绑定按钮事件
document.getElementById('h1_up1_1_button').addEventListener('click', h1_up1_1_button);
document.getElementById('h1_up2_button').addEventListener('click', h1_up2_button);
document.getElementById('h1_up3_button').addEventListener('click', h1_up3_button);

document.getElementById('h1_re_b').addEventListener('click', h1_re_button);


document.getElementById('h1_cut').addEventListener('click', h1_cut_hans);
document.getElementById('h2_cut').addEventListener('click', h2_cut_hans);
document.getElementById('set_cut').addEventListener('click', set_cut_hans);
document.getElementById('stat_cut').addEventListener('click', stat_cut_hans);

//存档
function saveGame() {
    const gameState = {
        Quark: Quark.toString(),

        quark_max: quark_max.toString(),
        game_time: game_time,

        h1_up1: h1_up1.toString(),
        h1_up1_1: h1_up1_1.toString(),
        h1_up3: h1_up3.toString(),

        h2_ziyuan: h2_ziyuan.toString(),

        bgIndex: bgIndex
    };
    localStorage.setItem("quarkGameSave", JSON.stringify(gameState));
    console.log("游戏已自动保存");
}

function loadGame() {
    const saved = localStorage.getItem("quarkGameSave");
    if (saved) {
        const state = JSON.parse(saved);
        Quark = state.Quark !== undefined ? new Decimal(state.Quark) : new Decimal(0);

        quark_max = state.quark_max !== undefined ? new Decimal(state.quark_max) : new Decimal(0);
        game_time = state.game_time !== undefined ? state.game_time : 0;

        h1_up1 = state.h1_up1 !== undefined ? new Decimal(state.h1_up1) : new Decimal(0);
        h1_up1_1 = state.h1_up1_1 !== undefined ? new Decimal(state.h1_up1_1) : new Decimal(0);
        h1_up3 = state.h1_up3 !== undefined ? new Decimal(state.h1_up3) : new Decimal(0);

        h2_ziyuan = state.h2_ziyuan !== undefined ? new Decimal(state.h2_ziyuan) : new Decimal(0);

        bgIndex = state.bgIndex !== undefined ? state.bgIndex : 0;
        applyBackground();   //恢复背景色
        console.log("加载存档成功");
    } else {
        console.log("没有找到存档，使用初始值");
        bgIndex = 0;         //默认白色
        applyBackground();
    }
    updateUI_h1();
    h1_js_re = 1
}

//启动游戏
loadGame();
startAutoProduction();
setInterval(saveGame, 60000);

window.addEventListener('beforeunload', () => {
    if (autoInterval) clearInterval(autoInterval);
});