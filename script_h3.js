function updateUI_h3(){
    document.getElementById("h3_ziyuan_txt").innerHTML = "引力子:" + formatDecimal(h3_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h3_ziyuan.plus(1)).log(9))).plus(1)) + ")";

    let h3_up1_cost = Decimal.pow(2.33, h3_up1)
    let b3_1_b = document.getElementById('h3_mass_b');
    b3_1_b.style.opacity = h3_ziyuan.gte(h3_up1_cost) ? '1' : '0.5';
    document.getElementById("h3_mass_b").innerHTML = "质量发生器" + h3_up1 + "级 费用:" + formatDecimal(h3_up1_cost) +"引力子<br>质量:" + formatDecimal(h3_mass) + "+" + formatDecimal(h3_mass_js.times(10)) + "/s";

    document.getElementById("h3_txt1").innerHTML = "质量加成:<br>夸克产量*:" + formatDecimal(new Decimal(h3_mass.plus(666).div(666)));
}

function h3_hans(){
    h3_mass_js = Decimal.pow(2, h3_up1).minus(1)
}

function h3_up1_button(){
    let cost = Decimal.pow(2.33, h3_up1)
    if (h3_ziyuan.gte(cost)){
        h3_ziyuan = h3_ziyuan.minus(cost);
        h3_up1 = h3_up1.plus(1);
        h3_js_re = 1;
        updateUI_h3();
    }
}

document.getElementById('h3_mass_b').addEventListener('click', h3_up1_button);