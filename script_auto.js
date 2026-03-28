//通用的自动切换函数
function toggleAuto(autoVarName, buttonId) {
    //根据变量名获取当前值
    const current = window[autoVarName];
    if (current === 1) {
        window[autoVarName] = 0;
        document.getElementById(buttonId).innerHTML = "自动:关";
    } else {
        window[autoVarName] = 1;
        document.getElementById(buttonId).innerHTML = "自动:开";
    }
}
//切换
function h1_up2_auto_cut() {
    toggleAuto('h1_up2_auto', 'h1_up2auto_b');
}
function h1_up3_auto_cut() {
    toggleAuto('h1_up3_auto', 'h1_up3auto_b');
}
//全局自动化
function global_auto(){
    if (h2_up8.gte(1)){
        let h1_up1_max = Decimal.floor(Quark.div(10).log(1.2)).plus(1);
        (h1_up2_auto === 1 && h1_up1_max.gt(h1_up1)) && (h1_up1 = h1_up1_max , h1_js_re = 1);

        let h1_up3_max = Decimal.floor(Quark.div(100).log(1.5)).plus(1);
        (h1_up3_auto === 1 && h1_up3_max.gt(h1_up3)) && (h1_up3 = h1_up3_max , h1_js_re = 1);
    }else if((h2_up4.gte(1))){
        (h1_up2_auto === 1) && (h1_up2_button());
        (h1_up3_auto === 1) && (h1_up3_button());
    }
}

//绑定按钮事件
document.getElementById('h1_up2auto_b').addEventListener('click', h1_up2_auto_cut);
document.getElementById('h1_up3auto_b').addEventListener('click', h1_up3_auto_cut);