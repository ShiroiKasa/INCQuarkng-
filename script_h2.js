//UI刷新
function updateUI_h2(){
    let b2_re = document.getElementById('h2_re_b');
    b2_re.style.visibility = h2_ziyuan_max.gte(5e4) ? 'visible' : 'hidden';
    b2_re.style.opacity = h2_ziyuan.gte(5e4) ? '1' : '0.5';
    document.getElementById("h2_re_b").innerHTML = h2_ziyuan.gte(5e4) ? "引力激发|引力子+" + formatDecimal(h3_ziyuan_js) : "引力激发|引力子+0";

    if (h2_up26.eq(1)){
        document.getElementById("h2_ziyuan_txt").innerHTML = "原子:" + formatDecimal(h2_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h2_ziyuan.plus(1)).log(1.0001))).plus(1)) + ")";
    }else{
        document.getElementById("h2_ziyuan_txt").innerHTML = "原子:" + formatDecimal(h2_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h2_ziyuan.plus(1)).log(10))).plus(1)) + ")";
    };
    let h2_up3_buff = new Decimal(1);
    h2_up3.gte(1) && (h2_up3_buff = new Decimal(quark_max.log(10)));
    if (Quark.gte(1000) && h2_up9.gte(1)){
        document.getElementById("h2_ziyuans").innerHTML = formatDecimal(h2_ziyuan_js.times(10)) + "/s";
    }else{
        document.getElementById("h2_ziyuans").innerHTML = "0/s";
    }

    let h2_upe_cost = Decimal.pow(2, h2_upe).times(1000)
    let h2_upp_cost = Decimal.pow(2, h2_upp).times(1000)
    let h2_upn_cost = Decimal.pow(2, h2_upn).times(1000)
    document.getElementById("h2_up5buff_b").innerHTML = "电子生成器" + formatDecimal(h2_upe) + "级 费用:" + formatDecimal(h2_upe_cost) +"原子<br>电子:" + formatDecimal(h2_e) + "+" + formatDecimal(h2_e_js) + "/s" + " 夸克指数+" + formatDecimal(new Decimal(h2_e.plus(10).log(10)).div(10));
    document.getElementById("h2_up6buff_b").innerHTML = "质子生成器" + formatDecimal(h2_upp) + "级 费用:" + formatDecimal(h2_upp_cost) +"原子<br>质子:" + formatDecimal(h2_p) + "+" + formatDecimal(h2_p_js) + "/s" + " 原子产量*" + formatDecimal(new Decimal(h2_p.plus(10).log(10)));
    document.getElementById("h2_up7buff_b").innerHTML = "中子生成器" + formatDecimal(h2_upn) + "级 费用:" + formatDecimal(h2_upn_cost) +"原子<br>中子:" + formatDecimal(h2_n) + "+" + formatDecimal(h2_n_js) + "/s" + " 电子/质子产量*" + formatDecimal(new Decimal(h2_n.plus(10).log(10)));
    let b2_e_b = document.getElementById('h2_up5buff_b');
    b2_e_b.style.opacity = h2_ziyuan.gte(h2_upe_cost) ? '1' : '0.5';
    let b2_p_b = document.getElementById('h2_up6buff_b');
    b2_p_b.style.opacity = h2_ziyuan.gte(h2_upp_cost) ? '1' : '0.5';
    let b2_n_b = document.getElementById('h2_up7buff_b');
    b2_n_b.style.opacity = h2_ziyuan.gte(h2_upn_cost) ? '1' : '0.5';
    
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

    let b2_8 = document.getElementById('h2_up8_b');
    b2_8.style.opacity = (h2_up8.eq(1)) ? '1' : (h2_ziyuan.gte(2e4) ? '0.5' : '0.2');

    let b2_9 = document.getElementById('h2_up9_b');
    b2_9.style.opacity = (h2_up9.eq(1)) ? '1' : (h3_ziyuan.gte(10) ? '0.5' : '0.2');

    let b2_10 = document.getElementById('h2_up10_b');
    b2_10.style.opacity = (h2_up10.eq(1)) ? '1' : (h3_ziyuan.gte(50) ? '0.5' : '0.2');

    let b2_11 = document.getElementById('h2_up11_b');
    b2_11.style.opacity = (h2_up11.eq(1)) ? '1' : (h3_ziyuan.gte(100) ? '0.5' : '0.2');

    let b2_12 = document.getElementById('h2_up12_b');
    b2_12.style.opacity = (h2_up12.eq(1)) ? '1' : (h3_ziyuan.gte(200) ? '0.5' : '0.2');

    let b2_13 = document.getElementById('h2_up13_b');
    b2_13.style.opacity = (h2_up13.eq(1)) ? '1' : (h3_ziyuan.gte(500) ? '0.5' : '0.2');

    let b2_14 = document.getElementById('h2_up14_b');
    b2_14.style.opacity = (h2_up14.eq(1)) ? '1' : (h3_ziyuan.gte(1000) ? '0.5' : '0.2');

    let b2_15 = document.getElementById('h2_up15_b');
    b2_15.style.opacity = (h2_up15.eq(1)) ? '1' : (h3_ziyuan.gte(3000) ? '0.5' : '0.2');

    let b2_16 = document.getElementById('h2_up16_b');
    b2_16.style.opacity = (h2_up16.eq(1)) ? '1' : (h3_ziyuan.gte(1e4) ? '0.5' : '0.2');

    let b2_17 = document.getElementById('h2_up17_b');
    b2_17.style.opacity = (h2_up17.eq(1)) ? '1' : (h3_ziyuan.gte(2e4) ? '0.5' : '0.2');

    let b2_18 = document.getElementById('h2_up18_b');
    b2_18.style.opacity = (h2_up18.eq(1)) ? '1' : (h4_ziyuan.gte(1) ? '0.5' : '0.2');

    let b2_19 = document.getElementById('h2_up19_b');
    b2_19.style.opacity = (h2_up19.eq(1)) ? '1' : (h4_ziyuan.gte(10) ? '0.5' : '0.2');

    let b2_20 = document.getElementById('h2_up20_b');
    b2_20.style.opacity = (h2_up20.eq(1)) ? '1' : (h4_ziyuan.gte(500) ? '0.5' : '0.2');

    let b2_21 = document.getElementById('h2_up21_b');
    b2_21.style.opacity = (h2_up21.eq(1)) ? '1' : (h4_ziyuan.gte(1000) ? '0.5' : '0.2');

    let b2_22 = document.getElementById('h2_up22_b');
    b2_22.style.opacity = (h2_up22.eq(1)) ? '1' : (h4_ziyuan.gte(3000) ? '0.5' : '0.2');

    let b2_23 = document.getElementById('h2_up23_b');
    b2_23.style.opacity = (h2_up23.eq(1)) ? '1' : (h4_ziyuan.gte(1e4) ? '0.5' : '0.2');

    let b2_24 = document.getElementById('h2_up24_b');
    b2_24.style.opacity = (h2_up24.eq(1)) ? '1' : (Quark.gte(1e100) ? '0.5' : '0.2');

    let b2_25 = document.getElementById('h2_up25_b');
    b2_25.style.opacity = (h2_up25.eq(1)) ? '1' : (Quark.gte(1e125) ? '0.5' : '0.2');

    let b2_26 = document.getElementById('h2_up26_b');
    b2_26.style.opacity = (h2_up26.eq(1)) ? '1' : (Quark.gte(1e127) ? '0.5' : '0.2');

    let b2_27 = document.getElementById('h2_up27_b');
    b2_27.style.opacity = (h2_up27.eq(1)) ? '1' : (Quark.gte(1e135) ? '0.5' : '0.2');

    let b2_28 = document.getElementById('h2_up28_b');
    b2_28.style.opacity = (h2_up28.eq(1)) ? '1' : (Quark.gte(1e145) ? '0.5' : '0.2');

    let b2_29 = document.getElementById('h2_up29_b');
    b2_29.style.opacity = (h2_up29.eq(1)) ? '1' : (h5_ziyuan.gte(50) ? '0.5' : '0.2');

    let b2_30 = document.getElementById('h2_up30_b');
    b2_30.style.opacity = (h2_up30.eq(1)) ? '1' : (h5_ziyuan.gte(150) ? '0.5' : '0.2');

    let b2_31 = document.getElementById('h2_up31_b');
    b2_31.style.opacity = (h2_up31.eq(1)) ? '1' : (h5_ziyuan.gte(200) ? '0.5' : '0.2');

    let b2_32 = document.getElementById('h2_up32_b');
    b2_32.style.opacity = (h2_up32.eq(1)) ? '1' : (h5_ziyuan.gte(500) ? '0.5' : '0.2');
}

//计算函数
function h2_hans(){
    let h3_BH_buff2 = new Decimal(1);
    h3_BH_buff2 = (h3_BH.gte(1e4)) ? new Decimal(h3_BH.plus(1).log(10)) : new Decimal(1);
    h2_e_js = (h2_upe.times(h2_n.plus(10).log(10))).times(h3_BH_buff2);

    let h3_mass_buff = new Decimal(1);
    h3_mass_buff = (h3_mass.gte(1e4)) ? new Decimal(h3_mass.log(9)) : new Decimal(1);
    h2_p_js = (h2_upp.times(h2_n.plus(10).log(10))).times(h3_mass_buff);
    let h2_up10_buff = new Decimal(1);

    h2_up10_buff = (h2_up10.gte(1) && h2_ziyuan_max.gte(10)) ? h2_ziyuan_max.log(10) : new Decimal(1);
    let h3_BH_buff = new Decimal(1);
    h3_BH_buff = (h3_BH.gte(1)) ? new Decimal(h3_BH.plus(2333).div(2333)) : new Decimal(1);
    h2_n_js = (h2_upn.times(h2_up10_buff).times(h3_BH_buff));

    let h2_up27_buff = new Decimal(1);
    h2_up27.gte(1) && (h2_up27_buff = Decimal.pow(Quark,0.05));

    let cp_up3_buff = cp_up3 + 1;
    let h2_up12_buff = new Decimal(1);
    h2_up12.gte(1) && (h2_up12_buff = new Decimal(quark_max.log(10)));
    let h3_up6_buff = new Decimal(1);
    h3_up6q.gte(1) && (h3_up6_buff = new Decimal(h3_up6q.plus(8).log(8)));

    if (h2_ziyuan.gt(5e4)){
        h3_ziyuan_js = new Decimal(h2_ziyuan.log(10)).times(h2_up12_buff).times(h3_up6_buff).times(cp_up3_buff).times(h2_up27_buff);
    } else {
        h3_ziyuan_js = new Decimal(0);
    }
}

//购买函数
/**通用函数
 * @param {string} upgradeVarName - 全局变量名，例如 'h2_up1'
 * @param {number|Decimal} price - 购买所需原子数
 * @param {string} title - 升级名称，用于弹窗按钮显示
 * @param {string} description - 升级描述
 * @param {number} maxLevel - 最大购买次数，默认 1（一次性升级）
 * @param {string} resourceName - 消耗资源的显示名称，默认 "原子"
 * @param {string} resourceVar - 消耗资源的全局变量名，默认 "h2_ziyuan"
 */
function handleUpgrade(upgradeVarName, price, title, description, maxLevel = 1, resourceName = "原子", resourceVar = "h2_ziyuan") {
    const upgradeVar = window[upgradeVarName];
    const resource = window[resourceVar];

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
    document.getElementById("cx_nr").innerHTML = `${description}\n费用:${formatDecimal(price)}${resourceName}`;

    //二次确认
    if (h2_cx === upgradeVarName) {
        if (resource.gte(price)) {
            window[upgradeVarName] = upgradeVar.plus(1);
            window[resourceVar] = resource.minus(price);
            updateUI_h2();
            UIvisible_h2();
        }
    } else {
        h2_cx = upgradeVarName;
    }
}
/**
 * 自动购买一次性升级（如氢、氦、锂...）
 * @param {string} upgradeVarName - 升级变量名（如 'h2_up1'）
 * @param {Decimal} price - 价格（Decimal 对象或数字）
 * @param {string} resourceVarName - 消耗的资源变量名（如 'h2_ziyuan'）
 * @param {number|Decimal} maxLevel - 最大等级，默认 1（一次性）
 */
function autoPurchaseOneTime(upgradeVarName, price, resourceVarName, maxLevel = 1) {
    const upgrade = window[upgradeVarName];
    const resource = window[resourceVarName];
    
    //未满级 且 资源足够
    if (upgrade.lt(maxLevel) && resource.gte(price)) {
        window[upgradeVarName] = upgrade.plus(1);
        window[resourceVarName] = resource.minus(price);
        updateUI_h2();
        UIvisible_h2();
        if (typeof updateUI_h2 === 'function') updateUI_h2();
        if (typeof h2_js_re !== 'undefined') h2_js_re = 1;
        return true;
    }
    return false;
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
    handleUpgrade('h2_up2', 50, '氦', '最大夸克数量加成夸克获取/公式*log<sub>10</sub>(最大夸克数量)');
}
function h2_up3_button(){
    handleUpgrade('h2_up3', 100, '锂', '最大夸克数量加成原子获取/公式*log<sub>10</sub>(最大夸克数量)');
}
function h2_up4_button(){
    handleUpgrade('h2_up4', 500, '铍', '解锁夸克层级升级自动化且夸克初始数量变为10');
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
function h2_up8_button(){
    handleUpgrade('h2_up8', 2e4, '氧', '夸克层级升级不再消耗资源');
}
function h2_up9_button(){
    handleUpgrade('h2_up9', 10, '氟', '无需夸克禁闭也可以获得原子', 1, '引力子', 'h3_ziyuan');
}
function h2_up10_button(){
    handleUpgrade('h2_up10', 50, '氖', '最大原子数量加成中子获取/公式*log<sub>10</sub>(最大原子数量)', 1, '引力子', 'h3_ziyuan');
}
function h2_up11_button(){
    handleUpgrade('h2_up11', 100, '钠', '引力激发次数加成原子获取/公式*(引力激发次数)^0.5', 1, '引力子', 'h3_ziyuan');
}
function h2_up12_button(){
    handleUpgrade('h2_up12', 200, '镁', '最大夸克数量加成引力子获取/公式*log<sub>10</sub>(最大夸克数量)', 1, '引力子', 'h3_ziyuan');
}
function h2_up13_button(){
    handleUpgrade('h2_up13', 500, '铝', '解锁元素层级生成器、氢~氧升级自动化且铍初始等级变为1', 1, '引力子', 'h3_ziyuan');
}
function h2_up14_button(){
    handleUpgrade('h2_up14', 1000, '硅', '质量加成质量获取/公式*log<sub>3</sub>(质量)', 1, '引力子', 'h3_ziyuan');
}
function h2_up15_button(){
    handleUpgrade('h2_up15', 3000, '磷', '夸克层级解锁夸克产量^', 1, '引力子', 'h3_ziyuan');
}
function h2_up16_button(){
    handleUpgrade('h2_up16', 1e4, '硫', '元素层级生成器升级不再消耗资源', 1, '引力子', 'h3_ziyuan');
}
function h2_up17_button(){
    handleUpgrade('h2_up17', 2e4, '氯', '夸克数量加成夸克获取/公式*log<sub>1.2</sub>(夸克)', 1, '引力子', 'h3_ziyuan');
}
function h2_up18_button(){
    handleUpgrade('h2_up18', 1, '氩', '无需引力激发也可以获得引力子', 1, '暗物质', 'h4_ziyuan');
}
function h2_up19_button(){
    handleUpgrade('h2_up19', 10, '钾', '黑洞蒸发次数加成暗物质获取/公式*黑洞蒸发次数', 1, '暗物质', 'h4_ziyuan');
}
function h2_up20_button(){
    handleUpgrade('h2_up20', 500, '钙', '星辰层级解锁K型、G型恒星', 1, '暗物质', 'h4_ziyuan');
}
function h2_up21_button(){
    handleUpgrade('h2_up21', 1000, '钪', '暗物质加成夸克获取/公式*暗物质<sup>3</sup>', 1, '暗物质', 'h4_ziyuan');
}
function h2_up22_button(){
    handleUpgrade('h2_up22', 3000, '钛', '解锁星辰层级自动化且自动升级不消耗资源', 1, '暗物质', 'h4_ziyuan');
}
function h2_up23_button(){
    handleUpgrade('h2_up23', 1e4, '钒', '解锁元素层级氟~氯升级自动化且自动升级不消耗资源', 1, '暗物质', 'h4_ziyuan');
}
function h2_up24_button(){
    handleUpgrade('h2_up24', 1e100, '铬', '解锁新选项卡 蚀刻', 1, '夸克', 'Quark');
}
function h2_up25_button(){
    handleUpgrade('h2_up25', 1e125, '锰', '大幅优化夸克禁闭获取原子公式 log<sub>10</sub>夸克 → 夸克<sup>0.12</sup>', 1, '夸克', 'Quark');
    h1_js_re === 1;
}
function h2_up26_button(){
    handleUpgrade('h2_up26', 1e127, '铁', '优化原子对夸克加成公式 (log<sub>10</sub>(原子+1))+1 → (log<sub>10<sup>-4</sup></sub>(原子+1))+1', 1, '夸克', 'Quark');
    h1_js_re === 1;
}
function h2_up27_button(){
    handleUpgrade('h2_up27', 1e135, '钴', '夸克加成引力子获取/公式*夸克<sup>0.05</sup>', 1, '夸克', 'Quark');
    h1_js_re === 1;
}
function h2_up28_button(){
    handleUpgrade('h2_up28', 1e145, '镍', '夸克加成暗物质获取/公式*log<sub>10</sub>(夸克)', 1, '夸克', 'Quark');
    h1_js_re === 1;
}
function h2_up29_button(){
    handleUpgrade('h2_up29', 50, '铜', '星辰层级解锁F型、A型恒星', 1, '时间点', 'h5_ziyuan');
}
function h2_up30_button(){
    handleUpgrade('h2_up30', 150, '锌', '解锁元素层级氩~镍升级自动化且自动升级不消耗资源', 1, '时间点', 'h5_ziyuan');
}
function h2_up31_button(){
    handleUpgrade('h2_up31', 200, '镓', '无需黑洞蒸发也可以获得暗物质', 1, '时间点', 'h5_ziyuan');
}
function h2_up32_button(){
    handleUpgrade('h2_up32', 500, '锗', '时间扭曲次数加成时间点获取/公式*log<sub>2</sub>(时间扭曲次数+2)', 1, '时间点', 'h5_ziyuan');
}

function h2_re_button(){
    h2_ziyuan.gte(5e4) && (h3_ziyuan = h3_ziyuan.plus(h3_ziyuan_js) , h2_re_hans());
}

function h2_re_hans(){
    if (h2_re.eq(0)){
        h3_cut_hans()
        showModal('层级三:星辰', '大量的元素聚集成星辰，行星与恒星自混沌中诞生<br>注意:黑洞催化器会消耗质量', () => {}, null, true);
    }
    h2_ziyuan = new Decimal(0);

    h2_upe = new Decimal(0);
    h2_upp = new Decimal(0);
    h2_upn = new Decimal(0);
    h2_e_js = new Decimal(0);
    h2_p_js = new Decimal(0);
    h2_n_js = new Decimal(0);
    h2_e = new Decimal(0);
    h2_p = new Decimal(0);
    h2_n = new Decimal(0);

    h2_cx = "";
    h2_up1 = new Decimal(0);
    h2_up2 = new Decimal(0);
    h2_up3 = new Decimal(0);
    h2_up4 = new Decimal(h2_up13);
    h2_up5 = new Decimal(0);
    h2_up6 = new Decimal(0);
    h2_up7 = new Decimal(0);
    h2_up8 = new Decimal(0);

    h2_re = h2_re.plus(1);
    h2_js_re = 1;
    updateUI_h2();
    h1_re_hans();
}

//绑定按钮事件
document.getElementById('h2_re_b').addEventListener('click', h2_re_button);

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
document.getElementById('h2_up8_b').addEventListener('click', h2_up8_button);
document.getElementById('h2_up9_b').addEventListener('click', h2_up9_button);
document.getElementById('h2_up10_b').addEventListener('click', h2_up10_button);
document.getElementById('h2_up11_b').addEventListener('click', h2_up11_button);
document.getElementById('h2_up12_b').addEventListener('click', h2_up12_button);
document.getElementById('h2_up13_b').addEventListener('click', h2_up13_button);
document.getElementById('h2_up14_b').addEventListener('click', h2_up14_button);
document.getElementById('h2_up15_b').addEventListener('click', h2_up15_button);
document.getElementById('h2_up16_b').addEventListener('click', h2_up16_button);
document.getElementById('h2_up17_b').addEventListener('click', h2_up17_button);
document.getElementById('h2_up18_b').addEventListener('click', h2_up18_button);
document.getElementById('h2_up19_b').addEventListener('click', h2_up19_button);
document.getElementById('h2_up20_b').addEventListener('click', h2_up20_button);
document.getElementById('h2_up21_b').addEventListener('click', h2_up21_button);
document.getElementById('h2_up22_b').addEventListener('click', h2_up22_button);
document.getElementById('h2_up23_b').addEventListener('click', h2_up23_button);
document.getElementById('h2_up24_b').addEventListener('click', h2_up24_button);
document.getElementById('h2_up25_b').addEventListener('click', h2_up25_button);
document.getElementById('h2_up26_b').addEventListener('click', h2_up26_button);
document.getElementById('h2_up27_b').addEventListener('click', h2_up27_button);
document.getElementById('h2_up28_b').addEventListener('click', h2_up28_button);
document.getElementById('h2_up29_b').addEventListener('click', h2_up29_button);
document.getElementById('h2_up30_b').addEventListener('click', h2_up30_button);
document.getElementById('h2_up31_b').addEventListener('click', h2_up31_button);
document.getElementById('h2_up32_b').addEventListener('click', h2_up32_button);