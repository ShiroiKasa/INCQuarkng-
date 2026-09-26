function updateUI_h5(){
    document.getElementById("h5_ziyuan_txt").innerHTML = "时间点:" + formatDecimal(h5_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h5_ziyuan.plus(1)).log(7))).plus(1)) + ")";

    //锶(奇点元素):无需时间扭曲也可以获得时间点,秒产不受游戏倍率加成
    if (h2_up38.gte(1)){
        document.getElementById("h5_ziyuans").innerHTML = formatDecimal(h5_ziyuan_js.times(10)) + "/s";
    }else{
        document.getElementById("h5_ziyuans").innerHTML = "0/s";
    }

    document.getElementById("h5_buff").innerHTML = "时间碎片:" + formatDecimal(h5_time_confetti)+ " +" + formatDecimal(h5_time_confetti_js) + "/s   对游戏速度倍率加成:" + formatDecimal(h5_time_buff) + "   对夸克额外倍率:" + formatDecimal(h5_time_buff_quark);

    let b5_up11_txt = document.getElementById('h5_Quark_yc');
    Quark_js.gte(h5_quark_max) ? b5_up11_txt.style.display = 'block' : b5_up11_txt.style.display = 'none';
    document.getElementById("h5_Quark_yc").innerHTML = "夸克超过" + formatDecimal(h5_quark_max) + "的部分因溢出而^" + h5_overflow_exponent.toString().slice(0,10);
    
    let h5_up1_cots = new Decimal.pow(5.2,h5_up1).div(5);
    let b5_up1_b = document.getElementById('h5_up1');
    b5_up1_b.style.opacity = h5_ziyuan.gte(h5_up1_cots) ? '1' : '0.5';
    document.getElementById("h5_up1").innerHTML = "时间粉碎机:" + formatDecimal(h5_up1) + " 费用:" + formatDecimal(h5_up1_cots) + "时间点";

    let h5_up2_cots = new Decimal.pow(2.3,h5_up2);
    let b5_up2_b = document.getElementById('h5_up2');
    b5_up2_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up2_cots));
    document.getElementById("h5_up2").innerHTML = "时间碎片产量+" + formatDecimal(h5_up2) + " 费用:" + formatDecimal(h5_up2_cots) + "时间碎片";

    let h5_up3_cots = new Decimal.pow(3.95153,h5_up3).times(10);
    let b5_up3_b = document.getElementById('h5_up3');
    b5_up3_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up3_cots));
    document.getElementById("h5_up3").innerHTML = "时间碎片产量*" + formatDecimal(h5_up3.plus(1)) + " 费用:" + formatDecimal(h5_up3_cots) + "时间碎片";

    let h5_up4_cots = new Decimal.pow(9,h5_up4).times(1e4);
    let b5_up4_b = document.getElementById('h5_up4');
    b5_up4_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up4_cots));
    document.getElementById("h5_up4").innerHTML = "时间碎片产量^" + formatDecimal(h5_up4.div(10).plus(1)) + " 费用:" + formatDecimal(h5_up4_cots) + "时间碎片";

    let h5_up5_cots = new Decimal.pow(2,h5_up5);
    let b5_up5_b = document.getElementById('h5_up5');
    b5_up5_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up5_cots));
    document.getElementById("h5_up5").innerHTML = "游戏速度倍率+" + formatDecimal(h5_up5) + " 费用:" + formatDecimal(h5_up5_cots) + "时间碎片";

    let h5_up6_cots = new Decimal.pow(3.95132,h5_up6).times(10);
    let b5_up6_b = document.getElementById('h5_up6');
    b5_up6_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up6_cots));
    document.getElementById("h5_up6").innerHTML = "游戏速度倍率*" + formatDecimal(h5_up6.plus(1)) + " 费用:" + formatDecimal(h5_up6_cots) + "时间碎片";

    let h5_up7_cots = new Decimal.pow(11,h5_up7).times(5e6);
    let b5_up7_b = document.getElementById('h5_up7');
    b5_up7_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up7_cots));
    document.getElementById("h5_up7").innerHTML = "游戏速度倍率^" + formatDecimal(h5_up7.div(15).plus(1)) + " 费用:" + formatDecimal(h5_up7_cots) + "时间碎片";

    let h5_up8_cots = new Decimal.pow(2.33,h5_up8);
    let b5_up8_b = document.getElementById('h5_up8');
    b5_up8_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up8_cots));
    document.getElementById("h5_up8").innerHTML = "夸克额外倍率*" + formatDecimal(h5_up8.plus(1)) + " 费用:" + formatDecimal(h5_up8_cots) + "时间碎片";

    let h5_up9_cots = new Decimal.pow(6.66,h5_up9).times(15);
    let b5_up9_b = document.getElementById('h5_up9');
    b5_up9_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up9_cots));
    document.getElementById("h5_up9").innerHTML = "夸克额外倍率^" + formatDecimal(h5_up9.plus(1)) + " 费用:" + formatDecimal(h5_up9_cots) + "时间碎片";

    let h5_up10_cots = new Decimal.pow(3,Decimal.pow(h5_up10,h5_up10)).times(1e7);
    let b5_up10_b = document.getElementById('h5_up10');
    b5_up10_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up10_cots));
    document.getElementById("h5_up10").innerHTML = "夸克额外倍率^" + formatDecimal(h5_up10.div(5).plus(1)) + "↑↑3 费用:" + formatDecimal(h5_up10_cots) + "时间碎片";

    let h5_up11_cots = new Decimal.pow(42,h5_up11).times(1e8);
    let b5_up11_b = document.getElementById('h5_up11');
    b5_up11_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up11_cots));
    document.getElementById("h5_up11").innerHTML = "宇宙大小1e180*" + formatDecimal(Decimal.pow(1e3,h5_up11)) + " 费用:" + formatDecimal(h5_up11_cots) + "时间碎片";

    let h5_up12_cots = new Decimal.pow(4.32,h5_up12).times(1e9);
    let b5_up12_b = document.getElementById('h5_up12');
    b5_up12_b.classList.toggle('upgradable', h5_time_confetti.gte(h5_up12_cots));
    document.getElementById("h5_up12").innerHTML = "夸克溢出减慢*" + formatDecimal(Decimal.pow(4.2,h5_up12)) + " 溢出基数:" + formatDecimal(Decimal.div(0.05,Decimal.plus(1,Decimal.pow(h5_up12,5)))) + " 费用:" + formatDecimal(h5_up12_cots) + "时间碎片";

    let h5_re_cots = new Decimal(1e308);
    let b5_re_b_b = document.getElementById('h5_re_b');
    b5_re_b_b.classList.toggle('upgradable', Quark.gte(h5_re_cots));
    document.getElementById("h5_re_b").innerHTML = "奇点坍塌<br>获得:" + formatDecimal(h6_ziyuan_js) + "奇点<br>费用:INF夸克";
}

function h5_hans(){
    //弦论:弦加成必须在使用前算好(奇点弦同时影响时间碎片产量与奇点获取量)
    h6_1_hans();
    //弦论:两套新公式的buff(牛顿F、爱因斯坦Rμν)必须在下面读取之前算好
    //用 typeof 判断:script_h6_3.js 未加载时只跳过,不打断每帧计算
    (typeof h6_3_1_hans === 'function') && h6_3_1_hans();
    (typeof h6_3_2_hans === 'function') && h6_3_2_hans();

    let h5_time_buff_js1 = Decimal.pow(new Decimal(h5_time_confetti.plus(2).log(2)).plus(h5_up5).times(h5_up6.plus(1)),h5_up7.div(15).plus(1));
    let h5_time_buff_js2 = Decimal.max(h2_2_up1.times(10),1);
    let h5_time_buff_js = h5_time_buff_js1.times(h5_time_buff_js2);
    if (sk_4_ing === 1){
        //蚀刻·时间:蚀刻中游戏倍率强制为1e-10
        //必须放在所有加成之后:爱因斯坦Rμν是多项式增长的(动辄1e10以上),
        h5_time_buff_js = new Decimal(1e-10);
    }else{
        //弦论:爱因斯坦场方程(公式Rμν)加成游戏倍率
        h5_time_buff_js = h5_time_buff_js.times(h6_3_2buff);
        //蚀刻·时间:奖励倍率(蚀刻中不生效)
        h5_time_buff_js = h5_time_buff_js.times(sk_4_buff);
    }
    //F₂(纯净物):全局游戏倍率^0.1
    //基数来自 log/加法/乘法,恒为非负,故取 0.1 次方不会产生 NaN
    h2_2_up6.eq(1) && (h5_time_buff_js = h5_time_buff_js.pow(0.1));
    //不设下限:游戏倍率允许小于1(F₂ 会让它降到1以下,这是该纯净物的代价)
    h5_time_buff = h5_time_buff_js;

    let h3_up10_buff = new Decimal(1);
    h3_up10q.gte(1) && (h3_up10_buff = new Decimal(h3_up10q.plus(3.6).log(3.6)));
    let h5_time_confetti_js1 = Decimal.pow(3.94453,h5_up1).minus(1).times((Decimal.pow(h5_up2.times(h5_up3.plus(1)),h5_up4.div(10).plus(1))).plus(1));
    let h5_time_confetti_js2 = h3_up10_buff;
    //弦论:奇点弦综合倍率加成时间碎片产量
    h5_time_confetti_js = h5_time_confetti_js1.times(h5_time_confetti_js2).times(h6_1_zhonghe_buff);

    h5_time_buff_quark = Decimal.pow(Decimal.pow(h5_up8.plus(1),h5_up9.plus(1)),Decimal.pow(h5_up10.div(5).plus(1),Decimal.pow(h5_up10.div(5).plus(1),h5_up10.div(5).plus(1))));

    //粲夸克(费米子):最大夸克数量*10^(0.1*log2(粲夸克))
    h5_quark_max = new Decimal(1e180).times(Decimal.pow(1e3,h5_up11)).times(Decimal.pow(4.2,h5_up12)).times(h1_2_up3_buff);

    //铷(奇点元素):奇点坍塌次数加成奇点获取量
    let h2_up37_buff = new Decimal(1);
    h2_up37.gte(1) && (h2_up37_buff = h5_re.plus(2).log(2));

    //弦论:TypeIIB弦加成奇点获取量
    h6_ziyuan_js = (Quark.plus(1).log(10)).times(h5_time_confetti.plus(1).log(10)).div(500).times((cp_up6 + 1)).times(h6_1_ziyuan_buff).times(h2_up37_buff);

    //O₂(纯净物):奇点产量*2
    h2_2_up3.eq(1) && (h6_ziyuan_js = h6_ziyuan_js.times(2));
    //弦论:爱因斯坦场方程(公式Rμν)加成奇点获取量
    //h6_3_2buff 已是"0级=1"的净倍率,故直接相乘(与牛顿F加成夸克产量的口径一致)
    //注:原设计为 log10(Rμν)*π,但那样0级只有0.55倍(等于减益),与"0级无加成"冲突,故改为直接相乘
    h6_ziyuan_js = h6_ziyuan_js.times(h6_3_2buff);
}

function h5_up1_button(){
    let cost = new Decimal.pow(5.2,h5_up1).div(5);
    if (h5_ziyuan.gte(cost)){
        h5_up1 = h5_up1.plus(1);
        h5_ziyuan = h5_ziyuan.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}
function h5_up2_button(){
    let cost = new Decimal.pow(2.3,h5_up2);
    if (h5_time_confetti.gte(cost)){
        h5_up2 = h5_up2.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}
function h5_up3_button(){
    let cost = new Decimal.pow(3.95153,h5_up3).times(10);
    if (h5_time_confetti.gte(cost)){
        h5_up3 = h5_up3.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}
function h5_up4_button(){
    let cost = new Decimal.pow(9,h5_up4).times(1e4);
    if (h5_time_confetti.gte(cost)){
        h5_up4 = h5_up4.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_up5_button(){
    let cost = new Decimal.pow(2,h5_up5);
    if (h5_time_confetti.gte(cost)){
        h5_up5 = h5_up5.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_up6_button(){
    let cost = new Decimal.pow(3.95153,h5_up6).times(10);
    if (h5_time_confetti.gte(cost)){
        h5_up6 = h5_up6.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_up7_button(){
    let cost = new Decimal.pow(11,h5_up7).times(5e6);
    if (h5_time_confetti.gte(cost)){
        h5_up7 = h5_up7.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_up8_button(){
    let cost = new Decimal.pow(2.33,h5_up8);
    if (h5_time_confetti.gte(cost)){
        h5_up8 = h5_up8.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_up9_button(){
    let cost = new Decimal.pow(6.66,h5_up9).times(15);
    if (h5_time_confetti.gte(cost)){
        h5_up9 = h5_up9.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_up10_button(){
    let cost = new Decimal.pow(3,Decimal.pow(h5_up10,h5_up10)).times(1e7);
    if (h5_time_confetti.gte(cost)){
        h5_up10 = h5_up10.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_up11_button(){
    let cost = new Decimal.pow(42,h5_up11).times(1e8);
    if (h5_time_confetti.gte(cost)){
        h5_up11 = h5_up11.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_up12_button(){
    let cost = new Decimal.pow(4.32,h5_up12).times(1e9);
    if (h5_time_confetti.gte(cost)){
        h5_up12 = h5_up12.plus(1);
        h5_time_confetti = h5_time_confetti.minus(cost);
        h5_js_re = 1;
        updateUI_h5();
    }
}

function h5_re_button(){
    Quark.gte(1e308) && (h6_ziyuan = h6_ziyuan.plus(h6_ziyuan_js) , h5_re_hans());
}

function h5_re_hans(){
    if (h5_re.eq(0)) {
        const steps = [
            '——现有的架构已经无法描述如此多的夸克——',
            '———————需要重构这一切———————',
            '———————掌控架构的力量———————',
            '———————万物将由弦组成———————',
        ];
        showSequenceModal(steps, '层级六：弦论', function() {
        });
        h6_cut_hans();
    };
    h5_ziyuan = new Decimal(0);
    h5_time_confetti = new Decimal(0);
    h5_up1 = new Decimal(0);
    h5_up2 = new Decimal(0);
    h5_up3 = new Decimal(0);
    h5_up4 = new Decimal(0);
    h5_up5 = new Decimal(0);
    h5_up6 = new Decimal(0);
    h5_up7 = new Decimal(0);
    h5_up8 = new Decimal(0);
    h5_up9 = new Decimal(0);
    h5_up10 = new Decimal(0);
    h5_up11 = new Decimal(0);
    h5_up12 = new Decimal(0);

    h4_up4 = new Decimal(0);
    h4_up4q = new Decimal(0);

    h3_up9 = new Decimal(0);
    h3_up9q = new Decimal(0);
    h3_up10 = new Decimal(0);
    h3_up10q = new Decimal(0);

    h2_up29 = new Decimal(0);
    h2_up31 = new Decimal(0);
    h2_up32 = new Decimal(0);
    h2_up35 = new Decimal(0);

    h5_re = h5_re.plus(1); 
    h5_js_re = 1;

    updateUI_h5();
    h4_re_hans();
}

document.getElementById('h5_up1').addEventListener('click', h5_up1_button);
document.getElementById('h5_up2').addEventListener('click', h5_up2_button);
document.getElementById('h5_up3').addEventListener('click', h5_up3_button);
document.getElementById('h5_up4').addEventListener('click', h5_up4_button);
document.getElementById('h5_up5').addEventListener('click', h5_up5_button);
document.getElementById('h5_up6').addEventListener('click', h5_up6_button);
document.getElementById('h5_up7').addEventListener('click', h5_up7_button);
document.getElementById('h5_up8').addEventListener('click', h5_up8_button);
document.getElementById('h5_up9').addEventListener('click', h5_up9_button);
document.getElementById('h5_up10').addEventListener('click', h5_up10_button);
document.getElementById('h5_up11').addEventListener('click', h5_up11_button);
document.getElementById('h5_up12').addEventListener('click', h5_up12_button);
document.getElementById('h5_re_b').addEventListener('click', h5_re_button);