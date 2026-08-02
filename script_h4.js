function updateUI_h4(){
    document.getElementById("h4_ziyuan_txt").innerHTML = "暗物质:" + formatDecimal(h4_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h4_ziyuan.plus(1)).log(8))).plus(1)) + ")";

    if (h3_ziyuan.gte(1e6) && h2_up31.gte(1)){
        document.getElementById("h4_ziyuans").innerHTML = formatDecimal(h4_ziyuan_js.times(10)) + "/s";
    }else{
        document.getElementById("h4_ziyuans").innerHTML = "0/s";
    }

    let b4_re = document.getElementById('h4_re_b');
    let h4_re_pd = Decimal.min(h4_N, Decimal.min(h4_DMH, h4_GN));
    b4_re.style.visibility = h4_re_pd.gte(42) ? 'visible' : 'hidden';
    b4_re.style.opacity = h4_re_pd.gte(42) ? '1' : '0.5';
    document.getElementById("h4_re_b").innerHTML = h4_re_pd.gte(42) ? "时间扭曲|时间点+" + formatDecimal(h5_ziyuan_js) : "时间扭曲|时间点+0";

    let h4_N_cots = new Decimal.pow(1e3,h4_N);
    let b4_N_b = document.getElementById('h4_N');
    b4_N_b.style.opacity = Quark.gte(h4_N_cots) ? '1' : '0.5';
    document.getElementById("h4_N").innerHTML = "星云 数量:" + formatDecimal(h4_N) + " 费用:" + formatDecimal(h4_N_cots) + "夸克";

    let h4_DMH_cots = new Decimal.pow(1.5,h4_DMH);
    let h4_DMH_b = document.getElementById('h4_DMH');
    h4_DMH_b.style.opacity = h4_ziyuan.gte(h4_DMH_cots) ? '1' : '0.5';
    document.getElementById("h4_DMH").innerHTML = "暗物质晕 数量:" + formatDecimal(h4_DMH) + " 费用:" + formatDecimal(h4_DMH_cots) + "暗物质";

    let h4_GN_cots = new Decimal.pow(1.9,h4_GN);
    let b4_GN_b = document.getElementById('h4_GN');
    b4_GN_b.style.opacity = h3_BH.gte(h4_GN_cots) ? '1' : '0.5';
    document.getElementById("h4_GN").innerHTML = "星系核 数量:" + formatDecimal(h4_GN) + " 费用:" + formatDecimal(h4_GN_cots) + "黑洞";

    let h4_up1_cots = new Decimal.pow(2,h4_up1);
    let b4_up1_b = document.getElementById('h4_up1');
    b4_up1_b.style.opacity = (h4_N.gte(h4_up1_cots) && h4_DMH.gte(h4_up1_cots) && h4_GN.gte(h4_up1_cots)) ? '1' : '0.5';
    document.getElementById("h4_up1").innerHTML = "不规则星系" + formatDecimal(h4_up1) + " 数量:" + formatDecimal(h4_up1q) + "+" + formatDecimal(h4_up1_js) + "/s 费用:" + formatDecimal(h4_up1_cots) + "<br>星系 对夸克加成:" + formatDecimal(h4_up1q.plus(1));

    let h4_up2_cots = new Decimal.pow(3,h4_up2).plus(2);
    let b4_up2_b = document.getElementById('h4_up2');
    b4_up2_b.style.opacity = (h4_N.gte(h4_up2_cots) && h4_DMH.gte(h4_up2_cots) && h4_GN.gte(h4_up2_cots)) ? '1' : '0.5';
    document.getElementById("h4_up2").innerHTML = "矮星系" + formatDecimal(h4_up2) + " 数量:" + formatDecimal(h4_up2q) + "+" + formatDecimal(h4_up2_js) + "/s 费用:" + formatDecimal(h4_up2_cots) + "<br>星系 对原子加成:" + formatDecimal(h4_up2q.plus(1));

    let h4_up3_cots = new Decimal.pow(4,h4_up3).plus(10);
    let b4_up3_b = document.getElementById('h4_up3');
    b4_up3_b.style.opacity = (h4_N.gte(h4_up3_cots) && h4_DMH.gte(h4_up3_cots) && h4_GN.gte(h4_up3_cots)) ? '1' : '0.5';
    document.getElementById("h4_up3").innerHTML = "旋涡星系" + formatDecimal(h4_up3) + " 数量:" + formatDecimal(h4_up3q) + "+" + formatDecimal(h4_up3_js) + "/s 费用:" + formatDecimal(h4_up3_cots) + "<br>星系 对质量加成:" + formatDecimal(h4_up3q.plus(1));
}

function h4_hans(){
    h4_up1_js = new Decimal.pow(1.05,h4_up1).minus(1).times(10).times(h4_up2q.plus(1));

    h4_up2_js = new Decimal.pow(1.1,h4_up2).minus(1).times(10).times(h4_up3q.plus(1));

    h4_up3_js = new Decimal.pow(1.15,h4_up3).minus(1).times(10);

    let h2_up32_buff = new Decimal(1);
    h2_up32.gte(1) && (h2_up32_buff = h4_re.plus(2).log(2));

    h5_ziyuan_js = Decimal.min(h4_N, Decimal.min(h4_DMH, h4_GN)).times(Quark.plus(1).log(10)).div(7000).times((cp_up5 + 1)).times(h2_up32_buff);
}

function h4_N_button(){
    let cost = new Decimal.pow(1e3,h4_N);
    if (Quark.gte(cost)){
        h4_N = h4_N.plus(1);
        Quark = Quark.minus(cost);
        updateUI_h4();
    }
}
function h4_DMH_button(){
    let cost = new Decimal.pow(1.5,h4_DMH);
    if (h4_ziyuan.gte(cost)){
        h4_DMH = h4_DMH.plus(1);
        h4_ziyuan = h4_ziyuan.minus(cost);
        updateUI_h4();
    }
}
function h4_GN_button(){
    let cost = new Decimal.pow(1.9,h4_GN);
    if (h3_BH.gte(cost)){
        h4_GN = h4_GN.plus(1);
        h3_BH = h3_BH.minus(cost);
        updateUI_h4();
    }
}

function h4_up1_button(){
    let cost = new Decimal.pow(2,h4_up1);
    if (h4_N.gte(cost) && h4_DMH.gte(cost) && h4_GN.gte(cost)){
        h4_up1 = h4_up1.plus(1);
        h4_N = h4_N.minus(cost);
        h4_DMH = h4_DMH.minus(cost);
        h4_GN = h4_GN.minus(cost);
        updateUI_h4();
    }
}
function h4_up2_button(){
    let cost = new Decimal.pow(3,h4_up2).plus(2);
    if (h4_N.gte(cost) && h4_DMH.gte(cost) && h4_GN.gte(cost)){
        h4_up2 = h4_up2.plus(1);
        h4_N = h4_N.minus(cost);
        h4_DMH = h4_DMH.minus(cost);
        h4_GN = h4_GN.minus(cost);
        updateUI_h4();
    }
}
function h4_up3_button(){
    let cost = new Decimal.pow(4,h4_up3).plus(10);
    if (h4_N.gte(cost) && h4_DMH.gte(cost) && h4_GN.gte(cost)){
        h4_up3 = h4_up3.plus(1);
        h4_N = h4_N.minus(cost);
        h4_DMH = h4_DMH.minus(cost);
        h4_GN = h4_GN.minus(cost);
        updateUI_h4();
    }
}

function h4_re_button(){
    let h4_re_pd = Decimal.min(h4_N, Decimal.min(h4_DMH, h4_GN));
    h4_re_pd.gte(42) && (h5_ziyuan = h5_ziyuan.plus(h5_ziyuan_js) , h4_re_hans());
}

function h4_re_hans(){
    if (h4_re.eq(0)){
        h5_cut_hans()
        showModal('层级五:时间', '巨量物质的引力已经足以撕裂时间，时间的力量将为您所用', () => {}, null, true);
    }
    h4_ziyuan = new Decimal(0);
    h4_N = new Decimal(0);
    h4_DMH = new Decimal(0);
    h4_GN = new Decimal(0);
    h4_up1 = new Decimal(0);
    h4_up1q = new Decimal(0);
    h4_up2 = new Decimal(0);
    h4_up2q = new Decimal(0);
    h4_up3 = new Decimal(0);
    h4_up3q = new Decimal(0);

    h3_up7 = new Decimal(0);
    h3_up7q = new Decimal(0);
    h3_up8 = new Decimal(0);
    h3_up8q = new Decimal(0);

    h2_up18 = new Decimal(0);
    h2_up19 = new Decimal(0);
    h2_up21 = new Decimal(0);
    h2_up25 = new Decimal(0);
    h2_up26 = new Decimal(0);
    h2_up27 = new Decimal(0);
    h2_up28 = new Decimal(0);

    h4_re = h4_re.plus(1);
    h4_js_re = 1;

    updateUI_h4();
    h3_re_hans();
}

document.getElementById('h4_N').addEventListener('click', h4_N_button);
document.getElementById('h4_DMH').addEventListener('click', h4_DMH_button);
document.getElementById('h4_GN').addEventListener('click', h4_GN_button);

document.getElementById('h4_up1').addEventListener('click', h4_up1_button);
document.getElementById('h4_up2').addEventListener('click', h4_up2_button);
document.getElementById('h4_up3').addEventListener('click', h4_up3_button);

document.getElementById('h4_re_b').addEventListener('click', h4_re_button);