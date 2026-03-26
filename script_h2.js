//UI刷新
function updateUI_h2(){
    document.getElementById("h2_ziyuan_txt").innerHTML = "原子:" + formatDecimal(h2_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h2_ziyuan.plus(1)).log(10))).plus(1)) + ")";

    let b2_1 = document.getElementById('h2_up1_b');
    b2_1.style.opacity = (h2_up1.eq(1)) ? '1' : (h2_ziyuan.gte(10) ? '0.5' : '0.2');

    let b2_2 = document.getElementById('h2_up2_b');
    b2_2.style.opacity = (h2_up2.eq(1)) ? '1' : (h2_ziyuan.gte(50) ? '0.5' : '0.2');

    let b2_3 = document.getElementById('h2_up3_b');
    b2_3.style.opacity = (h2_up3.eq(1)) ? '1' : (h2_ziyuan.gte(100) ? '0.5' : '0.2');

    let b2_4 = document.getElementById('h2_up4_b');
    b2_4.style.opacity = (h2_up4.eq(1)) ? '1' : (h2_ziyuan.gte(500) ? '0.5' : '0.2');
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
    document.getElementById("cx_nr").innerHTML = `${description}\n费用:${price}原子`;

    //二次确认
    if (h2_cx === upgradeVarName) {
        if (h2_ziyuan.gte(price)) {
            window[upgradeVarName] = upgradeVar.plus(1);
            h2_ziyuan = h2_ziyuan.minus(price);
            updateUI_h2();
        }
    } else {
        h2_cx = upgradeVarName;
    }
}

function h2_up1_button() {
    handleUpgrade('h2_up1', 10, '氢', '夸克禁闭次数加成夸克获取/公式*夸克禁闭次数');
}
function h2_up2_button() {
    handleUpgrade('h2_up2', 50, '氦', '最大夸克数量加成夸克获取/公式*lg(最大夸克数量)');
}
function h2_up3_button() {
    handleUpgrade('h2_up3', 100, '锂', '最大夸克数量加成原子获取/公式*lg(最大夸克数量)');
}
function h2_up4_button() {
    handleUpgrade('h2_up4', 500, '铍', '解锁夸克层级自动化且夸克禁闭后夸克初始数量为10');
    UIvisible();
}

//绑定按钮事件
document.getElementById('h2_up1_b').addEventListener('click', h2_up1_button);
document.getElementById('h2_up2_b').addEventListener('click', h2_up2_button);
document.getElementById('h2_up3_b').addEventListener('click', h2_up3_button);
document.getElementById('h2_up4_b').addEventListener('click', h2_up4_button);