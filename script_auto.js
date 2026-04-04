//通用的自动切换函数
function toggleAuto(autoVarName, buttonId, onText = "自动:开", offText = "自动:关"){
    const current = window[autoVarName];
    const newValue = current === 1 ? 0 : 1;
    window[autoVarName] = newValue;
    document.getElementById(buttonId).innerHTML = newValue === 1 ? onText : offText;
}
//切换
function h1_up2_auto_cut(){
    toggleAuto('h1_up2_auto', 'h1_up2auto_b');
}
function h1_up3_auto_cut(){
    toggleAuto('h1_up3_auto', 'h1_up3auto_b');
}
function h3_up1_auto_cut(){
    toggleAuto('h3_up1_auto', 'h3_upauto_b',"生成器自动:开","生成器自动:关");
}
function h3_up2_auto_cut(){
    toggleAuto('h3_up2_auto', 'h3_up1_8auto_b',"氢~氧自动:开","氢~氧自动:关");
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

    if (h2_up13.gte(1)){
        (h3_up1_auto === 1) && (h2_upe_button(),h2_upp_button(),h2_upn_button());
        if (h3_up2_auto === 1){
             autoPurchaseOneTime('h2_up1', new Decimal(10), 'h2_ziyuan');
             autoPurchaseOneTime('h2_up2', new Decimal(50), 'h2_ziyuan');
             autoPurchaseOneTime('h2_up3', new Decimal(100), 'h2_ziyuan');
             autoPurchaseOneTime('h2_up4', new Decimal(500), 'h2_ziyuan');
             autoPurchaseOneTime('h2_up5', new Decimal(1000), 'h2_ziyuan');
             autoPurchaseOneTime('h2_up6', new Decimal(3000), 'h2_ziyuan');
             autoPurchaseOneTime('h2_up7', new Decimal(1e4), 'h2_ziyuan');
             autoPurchaseOneTime('h2_up8', new Decimal(2e4), 'h2_ziyuan');
        }
    }
}

//绑定按钮事件
document.getElementById('h1_up2auto_b').addEventListener('click', h1_up2_auto_cut);
document.getElementById('h1_up3auto_b').addEventListener('click', h1_up3_auto_cut);
document.getElementById('h3_upauto_b').addEventListener('click', h3_up1_auto_cut);
document.getElementById('h3_up1_8auto_b').addEventListener('click', h3_up2_auto_cut);