function updateUI_h5(){
    document.getElementById("h5_ziyuan_txt").innerHTML = "时间点:" + formatDecimal(h5_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h5_ziyuan.plus(1)).log(7))).plus(1)) + ")";

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
}

function h5_hans(){
    let h5_time_buff_js1 = Decimal.pow(new Decimal(h5_time_confetti.plus(2).log(2)).plus(h5_up5).times(h5_up6.plus(1)),h5_up7.div(15).plus(1));
    let h5_time_buff_js2 = Decimal.max(h2_2_up1.times(10),1);
    let h5_time_buff_js = h5_time_buff_js1.times(h5_time_buff_js2);
    h5_time_buff = Decimal.max(h5_time_buff_js,1);

    let h3_up10_buff = new Decimal(1);
    h3_up10q.gte(1) && (h3_up10_buff = new Decimal(h3_up10q.plus(3.6).log(3.6)));
    let h5_time_confetti_js1 = Decimal.pow(3.94453,h5_up1).minus(1).times((Decimal.pow(h5_up2.times(h5_up3.plus(1)),h5_up4.div(10).plus(1))).plus(1));
    let h5_time_confetti_js2 = h3_up10_buff;
    h5_time_confetti_js = h5_time_confetti_js1.times(h5_time_confetti_js2);

    h5_time_buff_quark = Decimal.pow(Decimal.pow(h5_up8.plus(1),h5_up9.plus(1)),Decimal.pow(h5_up10.div(5).plus(1),Decimal.pow(h5_up10.div(5).plus(1),h5_up10.div(5).plus(1))));

    h5_quark_max = new Decimal(1e180).times(Decimal.pow(1e3,h5_up11)).times(Decimal.pow(4.2,h5_up12));
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