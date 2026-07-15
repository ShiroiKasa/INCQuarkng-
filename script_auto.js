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
function h1_up4_auto_cut(){
    toggleAuto('h1_up4_auto', 'h1_up4auto_b');
}
function h3_up1_auto_cut(){
    toggleAuto('h3_up1_auto', 'h3_upauto_b',"生成器自动:开","生成器自动:关");
}
function h3_up2_auto_cut(){
    toggleAuto('h3_up2_auto', 'h3_up1_8auto_b',"氢~氧自动:开","氢~氧自动:关");
}
function h3_up3_auto_cut(){
    toggleAuto('h3_up3_auto', 'h3_up_all_auto_b');
}
function h3_up4_auto_cut(){
    toggleAuto('h3_up4_auto', 'h3_up9_17auto_b',"氟~氯自动:开","氟~氯自动:关");
}
//全局自动化
function global_auto(){
    if (h2_up8.gte(1)){
        let h1_up1_max = Decimal.floor(Quark.div(10).log(1.2)).plus(1);
        (h1_up2_auto === 1 && h1_up1_max.gt(h1_up1)) && (h1_up1 = h1_up1_max , h1_js_re = 1);

        let h1_up3_max = Decimal.floor(Quark.div(100).log(1.5)).plus(1);
        (h1_up3_auto === 1 && h1_up3_max.gt(h1_up3)) && (h1_up3 = h1_up3_max , h1_js_re = 1);

        let h1_up4_max = Decimal.floor(new Decimal(Quark.log(1e3)).log(1.2)).plus(1);
        (h1_up4_auto === 1 && h1_up4_max.gt(h1_up4)) && (h1_up4 = h1_up4_max , h1_js_re = 1);
    }else if((h2_up4.gte(1))){
        (h1_up2_auto === 1) && (h1_up2_button());
        (h1_up3_auto === 1) && (h1_up3_button());
        (h1_up4_auto === 1) && (h1_up4_button());
    }

    if (h2_up13.gte(1)){
        if (h2_up16.gte(1)){
            let h2_upe_max = Decimal.floor(h2_ziyuan.div(1000).log(2)).plus(1);
            (h3_up1_auto === 1 && h2_upe_max.gt(h2_upe)) && (h2_upe = h2_upe_max , h2_js_re = 1);

            let h2_upp_max = Decimal.floor(h2_ziyuan.div(1000).log(2)).plus(1);
            (h3_up1_auto === 1 && h2_upp_max.gt(h2_upp)) && (h2_upp = h2_upp_max , h2_js_re = 1);

            let h2_upn_max = Decimal.floor(h2_ziyuan.div(1000).log(2)).plus(1);
            (h3_up1_auto === 1 && h2_upn_max.gt(h2_upn)) && (h2_upn = h2_upn_max , h2_js_re = 1);
        }else{
            (h3_up1_auto === 1) && (h2_upe_button(),h2_upp_button(),h2_upn_button());
        }
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

    if (h2_up22.gte(1)){
        let h3_up1_max = Decimal.floor(h3_ziyuan.log(2.33)).plus(1);
        (h3_up3_auto === 1 && h3_up1_max.gt(h3_up1)) && (h3_up1 = h3_up1_max , h3_js_re = 1);

        let h3_up2_max = Decimal.floor(h3_ziyuan.log(3)).plus(1);
        (h3_up3_auto === 1 && h3_up2_max.gt(h3_up2)) && (h3_up2 = h3_up2_max , h3_js_re = 1);

        let h3_up3_max = Decimal.floor(h3_BH.log(3.33)).plus(1);
        (h3_up3_auto === 1 && h3_up3_max.gt(h3_up3)) && (h3_up3 = h3_up3_max , h3_js_re = 1);

        let h3_up4_max = Decimal.floor(h3_BH.log(3.99)).plus(1);
        (h3_up3_auto === 1 && h3_up4_max.gt(h3_up4)) && (h3_up4 = h3_up4_max , h3_js_re = 1);

        let h3_up5_max = Decimal.floor(h3_BH.log(5.33)).plus(1);
        (h3_up3_auto === 1 && h3_up5_max.gt(h3_up5)) && (h3_up5 = h3_up5_max , h3_js_re = 1);

        let h3_up6_max = Decimal.floor(h3_BH.div(1e6).log(6.66)).plus(1);
        (h3_up3_auto === 1 && h3_up6_max.gt(h3_up6)) && (h3_up6 = h3_up6_max , h3_js_re = 1);

        let h3_up7_max = Decimal.floor(h3_BH.div(1e7).log(7.99)).plus(1);
        (h3_up3_auto === 1 && h3_up7_max.gt(h3_up7)) && (h3_up7 = h3_up7_max , h3_js_re = 1);

        let h3_up8_max = Decimal.floor(h3_BH.div(1e8).log(9)).plus(1);
        (h3_up3_auto === 1 && h3_up8_max.gt(h3_up8)) && (h3_up8 = h3_up8_max , h3_js_re = 1);
    }

    if (h2_up23.gte(1)){
        if (h3_up4_auto === 1){
            autoPurchaseOneTime('h2_up9', new Decimal(0), 'h2_ziyuan');
            autoPurchaseOneTime('h2_up10', new Decimal(0), 'h2_ziyuan');
            autoPurchaseOneTime('h2_up11', new Decimal(0), 'h2_ziyuan');
            autoPurchaseOneTime('h2_up12', new Decimal(0), 'h2_ziyuan');
            autoPurchaseOneTime('h2_up13', new Decimal(0), 'h2_ziyuan');
            autoPurchaseOneTime('h2_up14', new Decimal(0), 'h2_ziyuan');
            autoPurchaseOneTime('h2_up15', new Decimal(0), 'h2_ziyuan');
            autoPurchaseOneTime('h2_up16', new Decimal(0), 'h2_ziyuan');
            autoPurchaseOneTime('h2_up17', new Decimal(0), 'h2_ziyuan');
        }
    }
}

//绑定按钮事件
document.getElementById('h1_up2auto_b').addEventListener('click', h1_up2_auto_cut);
document.getElementById('h1_up3auto_b').addEventListener('click', h1_up3_auto_cut);
document.getElementById('h1_up4auto_b').addEventListener('click', h1_up4_auto_cut);
document.getElementById('h3_upauto_b').addEventListener('click', h3_up1_auto_cut);
document.getElementById('h3_up1_8auto_b').addEventListener('click', h3_up2_auto_cut);
document.getElementById('h3_up_all_auto_b').addEventListener('click', h3_up3_auto_cut);
document.getElementById('h3_up9_17auto_b').addEventListener('click', h3_up4_auto_cut);