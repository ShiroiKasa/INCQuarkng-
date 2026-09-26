//费米子四种夸克加成(派生值)
//粲夸克加成的 h5_quark_max 在 script_h5.js 的 h5_hans 中读取本函数算出的 h1_2_up3_buff
function h1_2_buff_hans(){
    //上夸克:费米子产量*(1+log10(上夸克))
    h1_2_up1_buff = h1_2_up1.gte(1) ? new Decimal(1).plus(h1_2_up1.log(10)) : new Decimal(1);
    //下夸克:夸克数量自身每秒自增*(1+1e-6*log10(下夸克))
    //不再参与夸克产量,h1_2_up2_buff 现在只在 global_inc 里当自增倍率用
    h1_2_up2_buff = h1_2_up2.gte(1) ? new Decimal(1).plus(h1_2_up2.log(10).times(1e-7)) : new Decimal(1);
    //粲夸克:最大夸克数量*10^(0.1*log2(粲夸克))
    h1_2_up3_buff = h1_2_up3.gte(1) ? Decimal.pow(10, h1_2_up3.log(2).times(0.1)) : new Decimal(1);
    //奇夸克:夸克层级所有升级费用/(1+奇夸克)
    h1_2_up4_buff = Decimal.max(1, new Decimal(1).plus(h1_2_up4));
}

//UI刷新
//h1
function updateUI_h1(){
    //先算好四种夸克加成(下夸克影响本界面产量,奇夸克影响本界面费用)
    h1_2_buff_hans();

    let b1_re = document.getElementById('h1_re_b');
    b1_re.style.visibility = quark_max.gte(1000) ? 'visible' : 'hidden';
    b1_re.style.opacity = Quark.gte(1000) ? '1' : '0.5';
    let h2_up3_buff = new Decimal(1)
    h2_up3.gte(1) && (h2_up3_buff = new Decimal(quark_max.log(10)));
    document.getElementById("h1_re_b").innerHTML = Quark.gte(1000) ? "夸克禁闭|原子+" + formatDecimal(h2_ziyuan_js) : "夸克禁闭|原子+0";

    if (Quark.gte(1e308) && h5_re.eq(0)){
        document.getElementById("Quarks").innerHTML = "夸克:INF";
    }else{
        document.getElementById("Quarks").innerHTML = "夸克:" + formatDecimal(Quark);
    }

    if (Quark_js.gte(1e308) && h5_re.eq(0)){
        document.getElementById("h1_up1s").innerHTML = "INF/s";
    }else{
        document.getElementById("h1_up1s").innerHTML = formatDecimal(Quark_js.times(h5_time_buff)) + "/s";
    }

    //点击按钮文字
    let clickBase = new Decimal(1);
    let clickBonus = h1_up1_1;
    let clickTotal = clickBase.plus(clickBonus);
    document.getElementById("Quark+").innerHTML = "夸克+" + formatDecimal(clickTotal);

    //夸克层级升级费用统一除以(1+奇夸克)
    let h1_cost_div = h1_2_up4_buff;

    //点击产量升级按钮（费用 = ((等级)^2 + 1) / (1+奇夸克)）
    let b1_1_1 = document.getElementById('h1_up1_1_button');
    let clickCost = h1_up1_1.pow(2).plus(1).div(h1_cost_div);
    b1_1_1.style.opacity = Quark.gte(clickCost) ? '1' : '0.5';
    document.getElementById("h1_up1_1_button").innerHTML = "+1点击产量" + formatDecimal(h1_up1_1) + "级 费用:" + formatDecimal(clickCost) + "夸克";

    //自动生成器升级按钮（费用 = 2^等级 × 10）
    let b1_2 = document.getElementById('h1_up2_button');
    let genCost = Decimal.pow(1.2, h1_up1).times(10).div(h1_cost_div);
    b1_2.style.opacity = Quark.gte(genCost) ? '1' : '0.5';
    document.getElementById("h1_up2_button").innerHTML = "夸克产量+" + formatDecimal(h1_up1) + " 费用:" + formatDecimal(genCost) + "夸克";

    let b1_3 = document.getElementById("h1_up3_button");
    let h1_up3_cost = Decimal.pow(1.5, h1_up3).times(100).div(h1_cost_div);
    b1_3.style.opacity = Quark.gte(h1_up3_cost) ? '1' : '0.5';
    document.getElementById("h1_up3_button").innerHTML = "夸克产量*" + formatDecimal(h1_up3.plus(1)) + " 费用:" + formatDecimal(h1_up3_cost) + "夸克";

    let b1_4 = document.getElementById("h1_up4_button");
    let h1_up4_cost = Decimal.pow(1e3, Decimal.pow(1.2, h1_up4)).div(h1_cost_div);
    b1_4.style.opacity = Quark.gte(h1_up4_cost) ? '1' : '0.5';
    document.getElementById("h1_up4_button").innerHTML = "夸克产量^" + formatDecimal(h1_up4.div(10).plus(1)) + " 费用:" + formatDecimal(h1_up4_cost) + "夸克";

    //费米子+(铑解锁)
    let h1_up5_cost = Decimal.pow(1e10, Decimal.pow(1.3, h1_up5)).div(h1_cost_div);
    let b1_5 = document.getElementById("h1_up5");
    b1_5.style.opacity = Quark.gte(h1_up5_cost) ? '1' : '0.5';
    document.getElementById("h1_up5").innerHTML = "费米子+" + formatDecimal(h1_up5) + " 费用:" + formatDecimal(h1_up5_cost) + "夸克";

    //费米子界面(钯解锁)
    document.getElementById("h1_2_fermion_txt").innerHTML = "费米子:" + formatDecimal(h1_2_fermion) + " +" + formatDecimal(h1_2_fermion_js.times(h5_time_buff)) + "/s";

    //转化按钮:本次转化量不足时置灰
    let b1_2_zhuanhua = h1_2_fermion.times(h1_2_ratio).gt(0) ? '1' : '0.5';
    let b1_2_up1 = document.getElementById('h1_2_up1_b');
    b1_2_up1.style.opacity = b1_2_zhuanhua;
    b1_2_up1.innerHTML = "上夸克:" + formatDecimal(h1_2_up1) + "<br>费米子产量*" + formatDecimal(h1_2_up1_buff);
    let b1_2_up2 = document.getElementById('h1_2_up2_b');
    b1_2_up2.style.opacity = b1_2_zhuanhua;
    b1_2_up2.innerHTML = "下夸克:" + formatDecimal(h1_2_up2) + "<br>夸克自增*" + formatDecimal(h1_2_up2_buff);
    let b1_2_up3 = document.getElementById('h1_2_up3_b');
    b1_2_up3.style.opacity = b1_2_zhuanhua;
    b1_2_up3.innerHTML = "粲夸克:" + formatDecimal(h1_2_up3) + "<br>最大夸克数量*" + formatDecimal(h1_2_up3_buff);
    let b1_2_up4 = document.getElementById('h1_2_up4_b');
    b1_2_up4.style.opacity = b1_2_zhuanhua;
    b1_2_up4.innerHTML = "奇夸克:" + formatDecimal(h1_2_up4) + "<br>夸克升级费用/" + formatDecimal(h1_2_up4_buff);

    //转化比例按钮
    let h1_2_ratio_bts = [
        ['h1_2_ratio1_b', 0.01],
        ['h1_2_ratio5_b', 0.05],
        ['h1_2_ratio10_b', 0.1],
        ['h1_2_ratio50_b', 0.5],
        ['h1_2_ratio100_b', 1]
    ];
    for (let i = 0; i < h1_2_ratio_bts.length; i++){
        document.getElementById(h1_2_ratio_bts[i][0]).style.opacity = (h1_2_ratio === h1_2_ratio_bts[i][1]) ? '1' : '0.5';
    }
}
//h1
function h1_hans(){
    if (quark_max.eq(1) && game_tc === 0){
        showModal('第一个夸克', '您获得了第一个夸克！接下来只需要想办法获取更多的夸克就好，祝您游戏愉快!', () => {game_tc = 1}, null, true);
    }
    //费米子四种夸克加成(上夸克参与费米子产量,下夸克改为在 global_inc 里让夸克数量自增)
    h1_2_buff_hans();

    //buff判断
    let cp_up1_buff = cp_up1 + 1;

    let h2_up1_buff = new Decimal(1)
    h2_up1.gte(1) && (h2_up1_buff = h1_re);
    let h2_up2_buff = new Decimal(1)
    //quark_max为0时log10为NaN(铌自动化会在没有夸克时直接买下氦),按1算
    h2_up2.gte(1) && (h2_up2_buff = Decimal.max(quark_max,1).log(10));
    let h2_e_buff = new Decimal(1)
    h2_e.gte(0.1) && (h2_e_buff = (new Decimal(h2_e.plus(10).log(10)).div(10)).plus(1));

    let h2_up17_buff = new Decimal(1);
    h2_up17.gte(1) && (h2_up17_buff = new Decimal(Quark.plus(1.2).log(1.2)));

    let h2_up21_buff = new Decimal(1);
    h2_up21.gte(1) && (h2_up21_buff = Decimal.max(Decimal.pow(h4_ziyuan, 3), 1));

    //正式计算
    Quark_h1_js = Decimal.pow(h1_up1.times(h1_up3.plus(1)),h1_up4.div(10).plus(1));
    if (h2_up26.eq(1)){
        Quark_h2_buff1 = new Decimal(((h2_ziyuan.plus(1)).log(1.0001))).plus(1);
    }else{
        Quark_h2_buff1 = new Decimal(((h2_ziyuan.plus(1)).log(10))).plus(1);
    };
    Quark_h2_buff2 = (Quark_h2_buff1.times(h2_up1_buff)).times(h2_up2_buff).times(h2_up17_buff).times(h2_up21_buff);
    let Quark_h3_buff1 = new Decimal(((h3_ziyuan.plus(1)).log(9))).plus(1);
    let Quark_h3_buff2 = new Decimal(h3_mass.plus(666).div(666));
    let Quark_h3_buff = new Decimal(Quark_h3_buff1.times(Quark_h3_buff2));

    let Quark_h4_buff1 = new Decimal(((h4_ziyuan.plus(1)).log(8))).plus(1);
    let Quark_h4_buff2 = h4_up1q.plus(1);
    let Quark_h4_buff = Quark_h4_buff1.times(Quark_h4_buff2);

    let Quark_h5_buff = new Decimal(((h5_ziyuan.plus(1)).log(7))).plus(1).times(h5_time_buff_quark);

    let Quark_h6_buff = new Decimal(((h6_ziyuan.plus(1)).log(6))).plus(1);

    let Quark_h6_brane_buff = Decimal.max(h6_brane,1);//膜数量直接加成夸克产量(膜为0时按1算,避免前期夸克产量归零)

    //F₂(纯净物):夸克产量*1e500
    //注意:不能用 new Decimal(1e500)。JS 数字字面量 1e500 本身就已溢出为 Infinity,
    //交给 Decimal 会得到一个无效值,进而把 Quark_js 污染成 NaN/(e^Infinity)NaN。
    //必须用 Decimal.pow 在 Decimal 域内构造。
    let h2_2_up6_buff = new Decimal(1);
    h2_2_up6.eq(1) && (h2_2_up6_buff = Decimal.pow(10, 500));

    let Quark_js1 = (Decimal.pow((Quark_h1_js.times(Quark_h2_buff2)),h2_e_buff)).times(Quark_h3_buff).times(Quark_h4_buff).times(Quark_h5_buff).times(Quark_h6_buff).times(Quark_h6_brane_buff).times(h2_2_up6_buff);
    let Quark_js2 = Quark_js1.times(cp_up1_buff);

    Quark_js = Quark_js2;

    if (sk_1_ing === 1){
        Quark_js = Decimal.pow(Quark_js,0.3);
    }else{
        Quark_js = Quark_js.times(sk_1_buff1);
    };

    //蚀刻·夸克II:产量取以2为底的对数,加成(蚀刻中不生效)=蚀刻中的最大夸克数量
    if (sk_2_ing === 1){
        //产量不足1时按0处理(0的对数为NaN,小于1的对数为负)
        Quark_js = (Quark_js.gte(1)) ? Quark_js.log(2) : new Decimal(0);
    }else{
        Quark_js = Quark_js.times(sk_2_buff1);
    };

    //弦论:牛顿万有引力公式(公式F,即h6_3_1buff)直接加成夸克秒产
    Quark_js = Quark_js.times(h6_3_1buff);

    //注:下夸克的加成已从"夸克产量"改为"夸克数量自增",见 script.js 的 global_inc


    //溢出函数
    if (Quark_js.gte(h5_quark_max)){
        let ratio = Quark_js.div(h5_quark_max);
        let logRatio = ratio.log10();
        //控制指数c，由h5_up12决定
        let c = Decimal.div(20,Decimal.plus(1,Decimal.pow(h5_up12,2.2)));
        //计算压缩指数p
        let exponent = Decimal.div(1,Decimal.plus(1,Decimal.pow(logRatio,c)));
        //下限0.01
        exponent = Decimal.max(exponent,0.01);

        //Ne(纯净物):夸克溢出次方+0.2(上限为1)
        (h2_2_up5.eq(1)) && (exponent = Decimal.min(exponent.plus(0.2), 1));
        
        //UI显示
        h5_overflow_exponent = exponent;
        
        Quark_js = h5_quark_max.times(Decimal.pow(ratio,exponent));
    } else {
        h5_overflow_exponent = new Decimal(1);
    }

    if (Quark_js.gte(1.01e308) && h5_re.eq(0)){
        Quark_js = new Decimal(1.01e308);
    }
    if (Quark.gte(1.01e308) && h5_re.eq(0)){
        Quark = new Decimal(1.01e308);
    }

    //原子自动获取
    let cp_up2_buff = cp_up2 + 1;

    let h2_up3_buff = new Decimal(1);
    //quark_max为0时log10为NaN(铌自动化会在没有夸克时直接买下锂),按1算
    h2_up3.gte(1) && (h2_up3_buff = Decimal.max(quark_max,1).log(10));
    let h2_up11_buff = new Decimal(1);
    h2_up11.gte(1) && (h2_up11_buff = new Decimal(h2_re.pow(0.5)));

    let h4_up2_buff = new Decimal(1);
    h4_up2q.gte(1) && (h4_up2_buff = h4_up2q);

    if (Quark.gte(1000)){
        let Quark_h2_ziyuan = Quark.log(10);
        if (h2_up25.eq(1)){
            Quark_h2_ziyuan = Decimal.pow(Quark_js,0.12);
        };
        h2_ziyuan_js = h2_up3_buff.times(Quark_h2_ziyuan).times(new Decimal(h2_p.plus(10).log(10))).times(cp_up2_buff).times(h4_up2_buff);
        //蚀刻·元素:原子产量^0.6
        (sk_3_ing === 1) && (h2_ziyuan_js = Decimal.pow(h2_ziyuan_js,0.6));
    }else{
        h2_ziyuan_js = new Decimal(0);
    }

    //费米子:每秒产量=max(slog₃(夸克),0)*0.1*费米子+等级,最后乘上夸克加成
    //夸克不足1时slog₃为负,按0处理
    h1_2_fermion_js = Decimal.max(Quark.slog(3), 0).times(0.1).times(h1_up5).times(h1_2_up1_buff);
}

//夸克+
function h1_up1_button(){
    let gain = new Decimal(1).plus(h1_up1_1);
    Quark = Quark.plus(gain);
    updateUI_h1();
}

//+1点击产量
function h1_up1_1_button(){
    let cost = h1_up1_1.pow(2).plus(1).div(h1_2_up4_buff);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up1_1 = h1_up1_1.plus(1);
        updateUI_h1();
    }
}

//夸克产量+
function h1_up2_button(){
    let cost = Decimal.pow(1.2, h1_up1).times(10).div(h1_2_up4_buff);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up1 = h1_up1.plus(1);
        updateUI_h1();
        h1_js_re = 1;
    }
}
//夸克产量*
function h1_up3_button(){
    let cost = Decimal.pow(1.5, h1_up3).times(100).div(h1_2_up4_buff);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up3 = h1_up3.plus(1);
        updateUI_h1();
        h1_js_re = 1;
    }
}

//夸克产量^
function h1_up4_button(){
    let cost = Decimal.pow(1e3, Decimal.pow(1.2, h1_up4)).div(h1_2_up4_buff);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up4 = h1_up4.plus(1);
        updateUI_h1();
        h1_js_re = 1;
    }
}

//费米子+(铑解锁)
function h1_up5_button(){
    let cost = Decimal.pow(1e10, Decimal.pow(1.3, h1_up5)).div(h1_2_up4_buff);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up5 = h1_up5.plus(1);
        updateUI_h1();
        h1_js_re = 1;
    }
}

//费米子转化:把当前费米子的 h1_2_ratio 比例转化为指定夸克
function h1_2_convert(upgradeVarName){
    let amount = h1_2_fermion.times(h1_2_ratio);
    if (amount.lte(0)) return;

    h1_2_fermion = h1_2_fermion.minus(amount);
    switch (upgradeVarName){
        case "h1_2_up1": h1_2_up1 = h1_2_up1.plus(amount); break;
        case "h1_2_up2": h1_2_up2 = h1_2_up2.plus(amount); break;
        case "h1_2_up3": h1_2_up3 = h1_2_up3.plus(amount); break;
        case "h1_2_up4": h1_2_up4 = h1_2_up4.plus(amount); break;
    }

    h1_2_buff_hans();//立即重算四种夸克加成
    h1_js_re = 1;//上夸克/奇夸克影响夸克层级计算(下夸克改为夸克数量自增,在 global_inc 里生效)
    h5_js_re = 1;//粲夸克影响 h5_quark_max
    updateUI_h1();
}

function h1_2_up1_button(){
    h1_2_convert('h1_2_up1');
}
function h1_2_up2_button(){
    h1_2_convert('h1_2_up2');
}
function h1_2_up3_button(){
    h1_2_convert('h1_2_up3');
}
function h1_2_up4_button(){
    h1_2_convert('h1_2_up4');
}

//转化比例切换
function h1_2_ratio_cut(ratio){
    h1_2_ratio = ratio;
    updateUI_h1();
}
function h1_2_ratio1_button(){
    h1_2_ratio_cut(0.01);
}
function h1_2_ratio5_button(){
    h1_2_ratio_cut(0.05);
}
function h1_2_ratio10_button(){
    h1_2_ratio_cut(0.1);
}
function h1_2_ratio50_button(){
    h1_2_ratio_cut(0.5);
}
function h1_2_ratio100_button(){
    h1_2_ratio_cut(1);
}

function h1_re_button(){
    let h2_up3_buff = new Decimal(1)
    h2_up3.gte(1) && (h2_up3_buff = new Decimal(quark_max.log(10)));
    Quark.gte(1000) && (h2_ziyuan = h2_ziyuan.plus(h2_ziyuan_js) , h1_re_hans());
}

function h1_re_hans(){
    if (h1_re.eq(0)){
        h2_cut_hans()
        showModal('层级二:元素', '各种各样的元素可以带来不同的加成，随着游戏的推进，会解锁越来越多的元素，记得随时回来看看', () => {}, null, true);
    }
    Quark = h2_up4.times(10);

    Quark_h1_js = new Decimal(0);
    Quark_js = Quark_h1_js;

    h1_up1 = new Decimal(0);
    h1_up1_1 = new Decimal(0);
    h1_up3 = new Decimal(0);
    h1_up4 = new Decimal(0);

    h1_re = h1_re.plus(1);
    h1_js_re = 1;
    updateUI_h1();
    UIvisible();

}

document.getElementById('h1_up1_1_button').addEventListener('click', h1_up1_1_button);
document.getElementById('h1_up2_button').addEventListener('click', h1_up2_button);
document.getElementById('h1_up3_button').addEventListener('click', h1_up3_button);
document.getElementById('h1_up4_button').addEventListener('click', h1_up4_button);
document.getElementById('h1_up5').addEventListener('click', h1_up5_button);

document.getElementById('h1_2_up1_b').addEventListener('click', h1_2_up1_button);
document.getElementById('h1_2_up2_b').addEventListener('click', h1_2_up2_button);
document.getElementById('h1_2_up3_b').addEventListener('click', h1_2_up3_button);
document.getElementById('h1_2_up4_b').addEventListener('click', h1_2_up4_button);

document.getElementById('h1_2_ratio1_b').addEventListener('click', h1_2_ratio1_button);
document.getElementById('h1_2_ratio5_b').addEventListener('click', h1_2_ratio5_button);
document.getElementById('h1_2_ratio10_b').addEventListener('click', h1_2_ratio10_button);
document.getElementById('h1_2_ratio50_b').addEventListener('click', h1_2_ratio50_button);
document.getElementById('h1_2_ratio100_b').addEventListener('click', h1_2_ratio100_button);

document.getElementById('h1_re_b').addEventListener('click', h1_re_button);