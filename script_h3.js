function updateUI_h3(){
    document.getElementById("h3_ziyuan_txt").innerHTML = "引力子:" + formatDecimal(h3_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h3_ziyuan.plus(1)).log(9))).plus(1)) + ")";
    if (h2_ziyuan.gte(5e4) && h2_up18.gte(1)){
        document.getElementById("h3_ziyuans").innerHTML = formatDecimal(h3_ziyuan_js.times(10)) + "/s";
    }else{
        document.getElementById("h3_ziyuans").innerHTML = "0/s";
    }

    
    let b3_re = document.getElementById('h3_re_b');
    b3_re.style.visibility = h3_BH.gte(1e6) ? 'visible' : 'hidden';
    b3_re.style.opacity = h3_BH.gte(1e6) ? '1' : '0.5';
    document.getElementById("h3_re_b").innerHTML = h3_BH.gte(1e6) ? "黑洞蒸发|暗物质+" + formatDecimal(h4_ziyuan_js) : "黑洞蒸发|暗物质+0";

    let h3_up1_cost = Decimal.pow(2.33, h3_up1)
    let b3_1_b = document.getElementById('h3_mass_b');
    b3_1_b.style.opacity = h3_ziyuan.gte(h3_up1_cost) ? '1' : '0.5';
    document.getElementById("h3_mass_b").innerHTML = "质量发生器" + h3_up1 + "级 费用:" + formatDecimal(h3_up1_cost) +"引力子<br>质量:" + formatDecimal(h3_mass) + "+" + formatDecimal(h3_mass_js) + "/s";

    if (h3_mass.gte(1e4)){
        document.getElementById("h3_txt1").innerHTML = "质量加成:<br>夸克产量*" + formatDecimal(new Decimal(h3_mass.plus(666).div(666))) + "<br>质子产量*" + formatDecimal(new Decimal(h3_mass.log(11)));
    }else{
        document.getElementById("h3_txt1").innerHTML = "质量加成:<br>夸克产量*" + formatDecimal(new Decimal(h3_mass.plus(666).div(666)));
    }

    let h3_up2_cost = Decimal.pow(3, h3_up2)
    let b3_2_b = document.getElementById('h3_BH_b');
    b3_2_b.style.opacity = h3_ziyuan.gte(h3_up2_cost) ? '1' : '0.5';
    document.getElementById("h3_BH_b").innerHTML = "黑洞催化器" + h3_up2 + "级 费用:" + formatDecimal(h3_up2_cost) +"引力子<br>黑洞:" + formatDecimal(h3_BH) + "+" + formatDecimal(h3_BH_js) + "/s";
    if (h3_BH.gte(1e4)){
        document.getElementById("h3_txt2").innerHTML = "黑洞加成:<br>中子产量*" + formatDecimal(new Decimal(h3_BH.plus(2333).div(2333))) + "<br>电子产量*" + formatDecimal(new Decimal(h3_BH.log(10)));
    }else{
        document.getElementById("h3_txt2").innerHTML = "黑洞加成:<br>中子产量*" + formatDecimal(new Decimal(h3_BH.plus(2333).div(2333)));
    }

    let h3_up3_cost = Decimal.pow(3.33, h3_up3);
    let b3_3_b = document.getElementById('h3_up3_b');
    b3_3_b.style.opacity = h3_BH.gte(h3_up3_cost) ? '1' : '0.5';
    document.getElementById("h3_up3_b").innerHTML = "类地行星" + h3_up3 + "级 费用:" + formatDecimal(h3_up3_cost) +"黑洞<br>数量:" + formatDecimal(h3_up3q) + "+" + formatDecimal(h3_up3q_js) + "/s 黑洞产量*" + formatDecimal(new Decimal(h3_up3q.plus(11).log(11)));

    let h3_up4_cost = Decimal.pow(3.99, h3_up4);
    let b3_4_b = document.getElementById('h3_up4_b');
    b3_4_b.style.opacity = h3_BH.gte(h3_up4_cost) ? '1' : '0.5';
    document.getElementById("h3_up4_b").innerHTML = "类海王星" + h3_up4 + "级 费用:" + formatDecimal(h3_up4_cost) +"黑洞<br>数量:" + formatDecimal(h3_up4q) + "+" + formatDecimal(h3_up4q_js) + "/s 类地行星、黑洞产量*" + formatDecimal(new Decimal(h3_up4q.plus(10).log(10)));

    let h3_up5_cost = Decimal.pow(5.33, h3_up5);
    let b3_5_b = document.getElementById('h3_up5_b');
    b3_5_b.style.opacity = h3_BH.gte(h3_up5_cost) ? '1' : '0.5';
    document.getElementById("h3_up5_b").innerHTML = "类木行星" + h3_up5 + "级 费用:" + formatDecimal(h3_up5_cost) +"黑洞<br>数量:" + formatDecimal(h3_up5q) + "+" + formatDecimal(h3_up5q_js) + "/s 类海王星、黑洞产量*" + formatDecimal(new Decimal(h3_up5q.plus(9).log(9)));

    let h3_up6_cost = Decimal.pow(6.66, h3_up6).times(1e6);
    let b3_6_b = document.getElementById('h3_up6_b');
    b3_6_b.style.opacity = h3_BH.gte(h3_up6_cost) ? '1' : '0.5';
    document.getElementById("h3_up6_b").innerHTML = "M型恒星" + h3_up6 + "级 费用:" + formatDecimal(h3_up6_cost) +"黑洞<br>数量:" + formatDecimal(h3_up6q) + "+" + formatDecimal(h3_up6q_js) + "/s 行星、黑洞、引力子产量*" + formatDecimal(new Decimal(h3_up6q.plus(8).log(8)));

    let h3_up7_cost = Decimal.pow(7.99, h3_up7).times(1e7);
    let b3_7_b = document.getElementById('h3_up7_b');
    b3_7_b.style.opacity = h3_BH.gte(h3_up7_cost) ? '1' : '0.5';
    document.getElementById("h3_up7_b").innerHTML = "K型恒星" + h3_up7 + "级 费用:" + formatDecimal(h3_up7_cost) +"黑洞<br>数量:" + formatDecimal(h3_up7q) + "+" + formatDecimal(h3_up7q_js) + "/s M型恒星、黑洞产量*" + formatDecimal(new Decimal(h3_up7q.plus(5).log(5)));

    let h3_up8_cost = Decimal.pow(9, h3_up8).times(1e8);
    let b3_8_b = document.getElementById('h3_up8_b');
    b3_8_b.style.opacity = h3_BH.gte(h3_up8_cost) ? '1' : '0.5';
    document.getElementById("h3_up8_b").innerHTML = "G型恒星" + h3_up8 + "级 费用:" + formatDecimal(h3_up8_cost) +"黑洞<br>数量:" + formatDecimal(h3_up8q) + "+" + formatDecimal(h3_up8q_js) + "/s K型恒星、黑洞产量*" + formatDecimal(new Decimal(h3_up8q.plus(4.5).log(4.5)));

}

function h3_hans(){
    let h2_up14_buff = new Decimal(1);
    h2_up14.gte(1) && (h2_up14_buff = new Decimal(h3_mass.plus(3).log(3)));
    let h4_up3_buff = new Decimal(1);
    h4_up3q.gte(1) && (h4_up3_buff = h4_up3q);

    let h3_up3_buff = new Decimal(1);
    h3_up3q.gte(1) && (h3_up3_buff = new Decimal(h3_up3q.plus(11).log(11)));
    let h3_up4_buff = new Decimal(1);
    h3_up4q.gte(1) && (h3_up4_buff = new Decimal(h3_up4q.plus(10).log(10)));
    let h3_up5_buff = new Decimal(1);
    h3_up5q.gte(1) && (h3_up5_buff = new Decimal(h3_up5q.plus(9).log(9)));
    let h3_up6_buff = new Decimal(1);
    h3_up6q.gte(1) && (h3_up6_buff = new Decimal(h3_up6q.plus(8).log(8)));
    let h3_up7_buff = new Decimal(1);
    h3_up7q.gte(1) && (h3_up7_buff = new Decimal(h3_up7q.plus(5).log(5)));
    let h3_up8_buff = new Decimal(1);
    h3_up8q.gte(1) && (h3_up8_buff = new Decimal(h3_up8q.plus(4.5).log(4.5)));
    let h3_up_BHbuff = new Decimal(1);
    h3_up_BHbuff = h3_up3_buff.times(h3_up4_buff).times(h3_up5_buff).times(h3_up6_buff).times(h3_up7_buff).times(h3_up8_buff);

    h3_BH_js = Decimal.min(Decimal.pow(1.2, h3_up2).minus(1).times(10).times(h3_up_BHbuff),h3_mass.div(100));

    h3_mass_js = Decimal.pow(2, h3_up1).times(h2_up14_buff).minus(1).times(10).times(h4_up3_buff).minus(h3_BH_js);

    h3_up3q_js = Decimal.pow(1.2, h3_up3).minus(1).times(10).times(h3_up4_buff).times(h3_up6_buff);

    h3_up4q_js = Decimal.pow(1.3, h3_up4).minus(1).times(10).times(h3_up5_buff).times(h3_up6_buff);

    h3_up5q_js = Decimal.pow(1.4, h3_up5).minus(1).times(10).times(h3_up6_buff);

    h3_up6q_js = Decimal.pow(1.5, h3_up6).minus(1).times(10).times(h3_up7_buff);

    h3_up7q_js = Decimal.pow(2, h3_up7).minus(1).times(20).times(h3_up8_buff);

    h3_up8q_js = Decimal.pow(3, h3_up8).minus(1).times(40);

    let h2_up19_buff = new Decimal(1);
    h2_up19.gte(1) && (h2_up19_buff = new Decimal(h3_re));
    h4_ziyuan_js = new Decimal(h3_BH.log(10)).times((cp_up4 + 1)).times(h2_up19_buff);
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
function h3_up6_button(){
    let cost = Decimal.pow(6.66, h3_up6).times(1e6);
    if (h3_BH.gte(cost)){
        h3_BH = h3_BH.minus(cost);
        h3_up6 = h3_up6.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}
function h3_up7_button(){
    let cost = Decimal.pow(7.99, h3_up7).times(1e7);
    if (h3_BH.gte(cost)){
        h3_BH = h3_BH.minus(cost);
        h3_up7 = h3_up7.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}
function h3_up8_button(){
    let cost = Decimal.pow(9, h3_up8).times(1e8);
    if (h3_BH.gte(cost)){
        h3_BH = h3_BH.minus(cost);
        h3_up8 = h3_up8.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}

function h3_re_button(){
    h3_BH.gte(1e6) && (h4_ziyuan = h4_ziyuan.plus(h4_ziyuan_js) , h3_re_hans());
}

function h3_re_hans(){
    h3_ziyuan = new Decimal(0);

    h3_mass = new Decimal(0);
    h3_BH = new Decimal(0);

    h3_up1 = new Decimal(0);
    h3_up2 = new Decimal(0);

    h3_up3 = new Decimal(0);
    h3_up3q = new Decimal(0);
    h3_up4 = new Decimal(0);
    h3_up4q = new Decimal(0);
    h3_up5 = new Decimal(0);
    h3_up5q = new Decimal(0);
    h3_up6 = new Decimal(0);
    h3_up6q = new Decimal(0);
    

    h2_up9 = new Decimal(0);
    h2_up10 = new Decimal(0);
    h2_up11 = new Decimal(0);
    h2_up12 = new Decimal(0);
    h2_up14 = new Decimal(0);
    h2_up15 = new Decimal(0);
    h2_up16 = new Decimal(0);
    h2_up17 = new Decimal(0);

    h3_re = h3_re.plus(1);
    h3_js_re = 1;
    updateUI_h3();
    h2_re_hans();
}

document.getElementById('h3_mass_b').addEventListener('click', h3_up1_button);
document.getElementById('h3_BH_b').addEventListener('click', h3_up2_button);
document.getElementById('h3_up3_b').addEventListener('click', h3_up3_button);
document.getElementById('h3_up4_b').addEventListener('click', h3_up4_button);
document.getElementById('h3_up5_b').addEventListener('click', h3_up5_button);
document.getElementById('h3_up6_b').addEventListener('click', h3_up6_button);
document.getElementById('h3_up7_b').addEventListener('click', h3_up7_button);
document.getElementById('h3_up8_b').addEventListener('click', h3_up8_button);

document.getElementById('h3_re_b').addEventListener('click', h3_re_button);