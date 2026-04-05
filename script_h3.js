function updateUI_h3(){
    document.getElementById("h3_ziyuan_txt").innerHTML = "引力子:" + formatDecimal(h3_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h3_ziyuan.plus(1)).log(9))).plus(1)) + ")";

    let h3_up1_cost = Decimal.pow(2.33, h3_up1)
    let b3_1_b = document.getElementById('h3_mass_b');
    b3_1_b.style.opacity = h3_ziyuan.gte(h3_up1_cost) ? '1' : '0.5';
    document.getElementById("h3_mass_b").innerHTML = "质量发生器" + h3_up1 + "级 费用:" + formatDecimal(h3_up1_cost) +"引力子<br>质量:" + formatDecimal(h3_mass) + "+" + formatDecimal(h3_mass_js.times(10)) + "/s";

    if (h3_mass.gte(1e4)){
        document.getElementById("h3_txt1").innerHTML = "质量加成:<br>夸克产量*" + formatDecimal(new Decimal(h3_mass.plus(666).div(666))) + "<br>质子产量*" + formatDecimal(new Decimal(h3_mass.log(11)));
    }else{
        document.getElementById("h3_txt1").innerHTML = "质量加成:<br>夸克产量*" + formatDecimal(new Decimal(h3_mass.plus(666).div(666)));
    }

    let h3_up2_cost = Decimal.pow(3, h3_up2)
    let b3_2_b = document.getElementById('h3_BH_b');
    b3_2_b.style.opacity = h3_ziyuan.gte(h3_up2_cost) ? '1' : '0.5';
    document.getElementById("h3_BH_b").innerHTML = "黑洞催化器" + h3_up2 + "级 费用:" + formatDecimal(h3_up2_cost) +"引力子<br>黑洞:" + formatDecimal(h3_BH) + "+" + formatDecimal(h3_BH_js.times(10)) + "/s";
    if (h3_BH.gte(1e4)){
        document.getElementById("h3_txt2").innerHTML = "黑洞加成:<br>中子产量*" + formatDecimal(new Decimal(h3_BH.plus(2333).div(2333))) + "<br>电子产量*" + formatDecimal(new Decimal(h3_BH.log(10)));
    }else{
        document.getElementById("h3_txt2").innerHTML = "黑洞加成:<br>中子产量*" + formatDecimal(new Decimal(h3_BH.plus(2333).div(2333)));
    }

    let h3_up3_cost = Decimal.pow(3.33, h3_up3);
    let b3_3_b = document.getElementById('h3_up3_b');
    b3_3_b.style.opacity = h3_BH.gte(h3_up3_cost) ? '1' : '0.5';
    document.getElementById("h3_up3_b").innerHTML = "类地行星" + h3_up3 + "级 费用:" + formatDecimal(h3_up3_cost) +"黑洞<br>数量:" + formatDecimal(h3_up3q) + "+" + formatDecimal(h3_up3q_js.times(10)) + "/s 黑洞产量*" + formatDecimal(new Decimal(h3_up3q.plus(11).log(11)));

    let h3_up4_cost = Decimal.pow(3.99, h3_up4);
    let b3_4_b = document.getElementById('h3_up4_b');
    b3_4_b.style.opacity = h3_BH.gte(h3_up4_cost) ? '1' : '0.5';
    document.getElementById("h3_up4_b").innerHTML = "类海王星" + h3_up4 + "级 费用:" + formatDecimal(h3_up4_cost) +"黑洞<br>数量:" + formatDecimal(h3_up4q) + "+" + formatDecimal(h3_up4q_js.times(10)) + "/s 类地行星、黑洞产量*" + formatDecimal(new Decimal(h3_up4q.plus(10).log(10)));

    let h3_up5_cost = Decimal.pow(5.33, h3_up5);
    let b3_5_b = document.getElementById('h3_up5_b');
    b3_5_b.style.opacity = h3_BH.gte(h3_up5_cost) ? '1' : '0.5';
    document.getElementById("h3_up5_b").innerHTML = "类木行星" + h3_up4 + "级 费用:" + formatDecimal(h3_up5_cost) +"黑洞<br>数量:" + formatDecimal(h3_up5q) + "+" + formatDecimal(h3_up5q_js.times(10)) + "/s 类海王星、黑洞产量*" + formatDecimal(new Decimal(h3_up5q.plus(9).log(9)));

}

function h3_hans(){
    let h2_up14_buff = new Decimal(1);
    h2_up14.gte(1) && (h2_up14_buff = new Decimal(h3_mass.plus(3).log(3)));
    h3_mass_js = Decimal.pow(2, h3_up1).times(h2_up14_buff).minus(1).minus(h3_BH_js);

    let h3_up3_buff = new Decimal(1);
    h3_up3q.gte(1) && (h3_up3_buff = new Decimal(h3_up3q.plus(11).log(11)));
    let h3_up4_buff = new Decimal(1);
    h3_up4q.gte(1) && (h3_up4_buff = new Decimal(h3_up4q.plus(10).log(10)));
    let h3_up5_buff = new Decimal(1);
    h3_up5q.gte(1) && (h3_up5_buff = new Decimal(h3_up5q.plus(9).log(9)));
    let h3_up_BHbuff = new Decimal(1);
    h3_up_BHbuff = h3_up3_buff.times(h3_up4_buff).times(h3_up5_buff)

    h3_BH_js = Decimal.min(Decimal.pow(1.2, h3_up2).minus(1).times(h3_up_BHbuff),h3_mass.div(100));

    h3_up3q_js = Decimal.pow(1.2, h3_up3).minus(1).times(h3_up4_buff);

    h3_up4q_js = Decimal.pow(1.3, h3_up4).minus(1).times(h3_up5_buff);

    h3_up5q_js = Decimal.pow(1.4, h3_up5).minus(1);
}

function h3_up1_button(){
    let cost = Decimal.pow(2.33, h3_up1);
    if (h3_ziyuan.gte(cost)){
        h3_ziyuan = h3_ziyuan.minus(cost);
        h3_up1 = h3_up1.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}
function h3_up2_button(){
    let cost = Decimal.pow(3, h3_up2);
    if (h3_ziyuan.gte(cost)){
        h3_ziyuan = h3_ziyuan.minus(cost);
        h3_up2 = h3_up2.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}
function h3_up3_button(){
    let cost = Decimal.pow(3.33, h3_up3);
    if (h3_BH.gte(cost)){
        h3_BH = h3_BH.minus(cost);
        h3_up3 = h3_up3.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}
function h3_up4_button(){
    let cost = Decimal.pow(3.99, h3_up4);
    if (h3_BH.gte(cost)){
        h3_BH = h3_BH.minus(cost);
        h3_up4 = h3_up4.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}
function h3_up5_button(){
    let cost = Decimal.pow(5.33, h3_up5);
    if (h3_BH.gte(cost)){
        h3_BH = h3_BH.minus(cost);
        h3_up5 = h3_up5.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}

document.getElementById('h3_mass_b').addEventListener('click', h3_up1_button);
document.getElementById('h3_BH_b').addEventListener('click', h3_up2_button);
document.getElementById('h3_up3_b').addEventListener('click', h3_up3_button);
document.getElementById('h3_up4_b').addEventListener('click', h3_up4_button);
document.getElementById('h3_up5_b').addEventListener('click', h3_up5_button);