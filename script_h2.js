//UI刷新
function updateUI_h2(){
    document.getElementById("h2_ziyuan_txt").innerHTML = "原子:" + formatDecimal(h2_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h2_ziyuan.plus(1)).log(10))).plus(1)) + ")";

    let h2_upe_cost = Decimal.pow(2, h2_upe).times(1000)
    let h2_upp_cost = Decimal.pow(2, h2_upp).times(1000)
    let h2_upn_cost = Decimal.pow(2, h2_upn).times(1000)
    document.getElementById("h2_up5buff_b").innerHTML = "电子生成器" + h2_upe + "级 费用:" + h2_upe_cost +"原子<br>电子:" + formatDecimal(h2_e) + "+" + formatDecimal(h2_upe.times(h2_n.plus(10).log(10))) + "/s" + " 夸克指数+" + formatDecimal(new Decimal(h2_e.plus(10).log(10)).div(10));
    document.getElementById("h2_up6buff_b").innerHTML = "质子生成器" + h2_upp + "级 费用:" + h2_upp_cost +"原子<br>质子:" + formatDecimal(h2_p) + "+" + formatDecimal(h2_upp.times(h2_n.plus(10).log(10))) + "/s" + " 原子产量*" + formatDecimal(new Decimal(h2_p.plus(10).log(10)));
    document.getElementById("h2_up7buff_b").innerHTML = "中子生成器" + h2_upn + "级 费用:" + h2_upn_cost +"原子<br>中子:" + formatDecimal(h2_n) + "+" + formatDecimal(h2_n_js.times(10)) + "/s" + " 电子/质子产量*" + formatDecimal(new Decimal(h2_n.plus(10).log(10)));
    let b2_1 = document.getElementById('h2_up1_b');
    b2_1.style.opacity = (h2_up1.eq(1)) ? '1' : (h2_ziyuan.gte(10) ? '0.5' : '0.2');

    let b2_2 = document.getElementById('h2_up2_b');
    b2_2.style.opacity = (h2_up2.eq(1)) ? '1' : (h2_ziyuan.gte(50) ? '0.5' : '0.2');

    let b2_3 = document.getElementById('h2_up3_b');
    b2_3.style.opacity = (h2_up3.eq(1)) ? '1' : (h2_ziyuan.gte(100) ? '0.5' : '0.2');

    let b2_4 = document.getElementById('h2_up4_b');
    b2_4.style.opacity = (h2_up4.eq(1)) ? '1' : (h2_ziyuan.gte(500) ? '0.5' : '0.2');

    let b2_5 = document.getElementById('h2_up5_b');
    b2_5.style.opacity = (h2_up5.eq(1)) ? '1' : (h2_ziyuan.gte(1000) ? '0.5' : '0.2');

    let b2_6 = document.getElementById('h2_up6_b');
    b2_6.style.opacity = (h2_up6.eq(1)) ? '1' : (h2_ziyuan.gte(3000) ? '0.5' : '0.2');

    let b2_7 = document.getElementById('h2_up7_b');
    b2_7.style.opacity = (h2_up7.eq(1)) ? '1' : (h2_ziyuan.gte(1e4) ? '0.5' : '0.2');
}

//计算函数
function h2_hans(){
    h2_e_js = (h2_upe.times(h2_n.plus(10).log(10))).div(10);
    h2_p_js = (h2_upp.times(h2_n.plus(10).log(10))).div(10);
    h2_n_js = h2_upn.div(10);
}

//购买函数
/**通用函数
 * @param {string} upgradeVarName - 全局变量名，例如 'h2_up1'
 * @param {number|Decimal} price - 购买所需原子数
 * @param {string} title - 升级名称，用于弹窗按钮显示
 * @param {string} description - 升级描述
 * @param {number} maxLevel - 最大购买次数，默认 1（一次性升级）
 */
function handleUpgrade(upgradeVarName, price, title, description, maxLevel = 1) {
    const upgradeVar = window[upgradeVarName];

    //已满级 → 显示“已购买”并终止，不进入二次确认
    if (upgradeVar && upgradeVar.gte(maxLevel)) {
        document.getElementById('cx_xs').style.display = 'block';
        document.getElementById("cx_bt").innerHTML = `${title}(已购买)`;
        document.getElementById("cx_nr").innerHTML = `${description}\n已购买，无法再次购买。`;
        return;   //直接返回，不进行后续购买流程
    }

    //未满级，显示确认弹窗
    document.getElementById('cx_xs').style.display = 'block';
    document.getElementById("cx_bt").innerHTML = `${title}(点击两次购买)`;
    document.getElementById("cx_nr").innerHTML = `${description}\n费用:${formatDecimal(price)}原子`;

    //二次确认
    if (h2_cx === upgradeVarName) {
        if (h2_ziyuan.gte(price)) {
            window[upgradeVarName] = upgradeVar.plus(1);
            h2_ziyuan = h2_ziyuan.minus(price);
            updateUI_h2();
            UIvisible_h2();
        }
    } else {
        h2_cx = upgradeVarName;
    }
}

function h2_upe_button(){
    let cost = Decimal.pow(2, h2_upe).times(1000)
    if (h2_ziyuan.gte(cost)){
        h2_ziyuan = h2_ziyuan.minus(cost);
        h2_upe = h2_upe.plus(1);
        updateUI_h2();
        h2_js_re = 1;
    }
}
function h2_upp_button(){
    let cost = Decimal.pow(2, h2_upp).times(1000)
    if (h2_ziyuan.gte(cost)){
        h2_ziyuan = h2_ziyuan.minus(cost);
        h2_upp = h2_upp.plus(1);
        updateUI_h2();
        h2_js_re = 1;
    }
}
function h2_upn_button(){
    let cost = Decimal.pow(2, h2_upn).times(1000)
    if (h2_ziyuan.gte(cost)){
        h2_ziyuan = h2_ziyuan.minus(cost);
        h2_upn = h2_upn.plus(1);
        updateUI_h2();
        h2_js_re = 1;
    }
}
function h2_up1_button(){
    handleUpgrade('h2_up1', 10, '氢', '夸克禁闭次数加成夸克获取/公式*夸克禁闭次数');
}
function h2_up2_button(){
    handleUpgrade('h2_up2', 50, '氦', '最大夸克数量加成夸克获取/公式*lg(最大夸克数量)');
}
function h2_up3_button(){
    handleUpgrade('h2_up3', 100, '锂', '最大夸克数量加成原子获取/公式*lg(最大夸克数量)');
}
function h2_up4_button(){
    handleUpgrade('h2_up4', 500, '铍', '解锁夸克层级自动化且夸克禁闭后夸克初始数量为10');
}
function h2_up5_button(){
    handleUpgrade('h2_up5', 1000, '硼', '解锁电子生成器');
}
function h2_up6_button(){
    handleUpgrade('h2_up6', 3000, '碳', '解锁质子生成器');
}
function h2_up7_button(){
    handleUpgrade('h2_up7', 1e4, '氮', '解锁中子生成器');
}

//绑定按钮事件
document.getElementById('h2_up5buff_b').addEventListener('click', h2_upe_button);
document.getElementById('h2_up6buff_b').addEventListener('click', h2_upp_button);
document.getElementById('h2_up7buff_b').addEventListener('click', h2_upn_button);

document.getElementById('h2_up1_b').addEventListener('click', h2_up1_button);
document.getElementById('h2_up2_b').addEventListener('click', h2_up2_button);
document.getElementById('h2_up3_b').addEventListener('click', h2_up3_button);
document.getElementById('h2_up4_b').addEventListener('click', h2_up4_button);
document.getElementById('h2_up5_b').addEventListener('click', h2_up5_button);
document.getElementById('h2_up6_b').addEventListener('click', h2_up6_button);
document.getElementById('h2_up7_b').addEventListener('click', h2_up7_button);