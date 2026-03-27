//UI刷新
//h1
function updateUI_h1(){
    let b1_re = document.getElementById('h1_re_b');
    b1_re.style.visibility = quark_max.gte(1000) ? 'visible' : 'hidden';
    b1_re.style.opacity = Quark.gte(1000) ? '1' : '0.5';
    let h2_up3_buff = new Decimal(1)
    h2_up3.gte(1) && (h2_up3_buff = new Decimal(quark_max.log(10)));
    document.getElementById("h1_re_b").innerHTML = Quark.gte(1000) ? "夸克禁闭|原子+" + formatDecimal(h2_up3_buff.times(Quark.log(10)).times(new Decimal(h2_p.plus(10).log(10)))) : "夸克禁闭|原子+0";

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
//h1
function h1_hans(){
    //buff判断
    let h2_up1_buff = new Decimal(1)
    h2_up1.gte(1) && (h2_up1_buff = h1_re);
    let h2_up2_buff = new Decimal(1)
    h2_up2.gte(1) && (h2_up2_buff = quark_max.log(10));
    let h2_e_buff = new Decimal(1)
    h2_e.gte(0.1) && (h2_e_buff = (new Decimal(h2_e.plus(10).log(10)).div(10)).plus(1));

    //正式计算
    Quark_h1_js = h1_up1.times(0.1).times(h1_up3.plus(1));
    Quark_h2_buff1 = new Decimal(((h2_ziyuan.plus(1)).log(10))).plus(1);
    Quark_h2_buff2 = (Quark_h2_buff1.times(h2_up1_buff)).times(h2_up2_buff);
    let Quark_h3_buff1 = new Decimal(((h3_ziyuan.plus(1)).log(9))).plus(1);

    let Quark_js1 = (Decimal.pow((Quark_h1_js.times(Quark_h2_buff2)),h2_e_buff)).times(Quark_h3_buff1);

    Quark_js = Quark_js1;
}

//夸克+
function h1_up1_button(){
    let gain = new Decimal(1).plus(h1_up1_1);
    Quark = Quark.plus(gain);
    updateUI_h1();
}

//+1点击产量
function h1_up1_1_button(){
    let cost = h1_up1_1.pow(2).plus(1);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up1_1 = h1_up1_1.plus(1);
        updateUI_h1();
    }
}

//夸克产量+
function h1_up2_button(){
    let cost = Decimal.pow(1.2, h1_up1).times(10);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up1 = h1_up1.plus(1);
        updateUI_h1();
        h1_js_re = 1;
    }
}
//夸克产量*
function h1_up3_button(){
    let cost = Decimal.pow(1.5, h1_up3).times(100);
    if (Quark.gte(cost)) {
        Quark = Quark.minus(cost);
        h1_up3 = h1_up3.plus(1);
        updateUI_h1();
        h1_js_re = 1;
    }
}

function h1_re_button(){
    let h2_up3_buff = new Decimal(1)
    h2_up3.gte(1) && (h2_up3_buff = new Decimal(quark_max.log(10)));
    Quark.gte(1000) && (h2_ziyuan = h2_ziyuan.plus(h2_up3_buff.times(Quark.log(10)).times(new Decimal(h2_p.plus(10).log(10)))) , h1_re_hans());
}

function h1_re_hans(){
    Quark = h2_up4.times(10);

    Quark_h1_js = new Decimal(0);
    Quark_js = Quark_h1_js;

    h1_up1 = new Decimal(0);
    h1_up1_1 = new Decimal(0);
    h1_up3 = new Decimal(0);

    h1_re = h1_re.plus(1);
    h1_js_re = 1;
    updateUI_h1();
    UIvisible();
}

document.getElementById('h1_up1_1_button').addEventListener('click', h1_up1_1_button);
document.getElementById('h1_up2_button').addEventListener('click', h1_up2_button);
document.getElementById('h1_up3_button').addEventListener('click', h1_up3_button);

document.getElementById('h1_re_b').addEventListener('click', h1_re_button);