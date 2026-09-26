//h6_3:弦论层级的第三、第四子选项卡
//第三子选项卡"牛顿万有引力公式"(12项升级,锝解锁):F=(G*m1*m2)/r
//第四子选项卡"爱因斯坦场方程"(7项升级,钌解锁):Tμν*(8πG/c⁴)=Rμν-(1/2)Rgμν+Λgμν
//两套升级均消耗奇点,可无限升级,不计入任何重置(奇点坍塌亦不清空)
//等级n从0开始:费用公式中的n为当前等级,效果公式中的n为购买后的等级

//效果公式中的指数系数(以 Godot 的 h6_3 为准)
//up9/up10/up11 每级+0.1(说明文字为"指数+0.1"),但G实际值的指数用的是0.01,与原文件一致
const h6_3_1_up9_exp = 0.01;//G实际值指数=1+up9*0.01
const h6_3_1_up10_exp = 0.1;//m1实际值指数=1+up10*0.1
const h6_3_1_up11_exp = 0.1;//m2实际值指数=1+up11*0.1
const h6_3_1_up12_exp = 0.02;//r实际值指数=1+up12*0.02

//计算函数:牛顿万有引力公式
//G实际=(up1+1)*(up5+1)的(1+up9*0.01)次方
//m1实际=(up2+1)*(up6+1)的(1+up10*0.1)次方
//m2实际=(up3+1)*(up7+1)的(1+up11*0.1)次方
//r实际=0.9^[(up4*(up8+1))^(1+up12*0.02)]
function h6_3_1_hans(){
    h6_3_1_G_buff = h6_3_1up1.plus(1).times(h6_3_1up5.plus(1)).pow(h6_3_1up9.times(h6_3_1_up9_exp).plus(1));
    h6_3_1_m1_buff = h6_3_1up2.plus(1).times(h6_3_1up6.plus(1)).pow(h6_3_1up10.times(h6_3_1_up10_exp).plus(1));
    h6_3_1_m2_buff = h6_3_1up3.plus(1).times(h6_3_1up7.plus(1)).pow(h6_3_1up11.times(h6_3_1_up11_exp).plus(1));
    h6_3_1_r_buff = Decimal.pow(0.9,h6_3_1up4.times(h6_3_1up8.plus(1)).pow(h6_3_1up12.times(h6_3_1_up12_exp).plus(1)));
    //r实际小于1时反而放大F,这是该公式的设计(距离越近引力越强)
    h6_3_1buff = h6_3_1_G_buff.times(h6_3_1_m1_buff).times(h6_3_1_m2_buff).div(h6_3_1_r_buff);
}

//计算函数:爱因斯坦场方程
//部分1=8*up1*(up2+1)
//部分2=(0.9^up3)^4
//部分3=(0.5+up4)+0.5*(up5+1)*(up6+1)
//部分4=(up6+1)*(up7+1)
//原始值=(部分1/部分2)*部分3+部分4:七项全0时为 0/1*1 + 1 = 1,正好是"无加成"中性点
//故生效倍率直接取原始值并加下限1(与牛顿F的0级=1口径一致),不做任何平移
function h6_3_2_hans(){
    h6_3_2_js1 = new Decimal(8).times(h6_3_2up1).times(h6_3_2up2.plus(1));
    h6_3_2_js2 = Decimal.pow(0.9,h6_3_2up3).pow(4);//=(0.9^up3)^4
    h6_3_2_js3 = h6_3_2up4.plus(0.5).plus(h6_3_2up5.plus(1).times(h6_3_2up6.plus(1)).times(0.5));
    h6_3_2_js4 = h6_3_2up6.plus(1).times(h6_3_2up7.plus(1));
    h6_3_2_raw = h6_3_2_js1.div(h6_3_2_js2).times(h6_3_2_js3).plus(h6_3_2_js4);
    h6_3_2buff = Decimal.max(h6_3_2_raw,1);
}

//费用公式:牛顿万有引力公式
//up4:基础1e8;n<30时3^n;30≤n<40时(n/10)^(n²/30);n≥40时(n/5)^(n²/10)
function h6_3_1_costs1(n){
    let js = new Decimal(0);
    (n.lt(30)) && (js = new Decimal(3).pow(n));
    (n.gte(30) && n.lt(40)) && (js = n.div(10).pow(n.pow(2).div(30)));
    n.gte(40) && (js = n.div(5).pow(n.pow(2).div(10)));
    return Decimal.pow(10,8).times(js);
}

//up8:基础1e11;n<20时4^n;20≤n<30时(4+n/4)^n;n≥30时4^(1.2^n)
function h6_3_1_costs2(n){
    let js = new Decimal(0);
    (n.lt(20)) && (js = new Decimal(4).pow(n));
    (n.gte(20) && n.lt(30)) && (js = n.div(4).plus(4).pow(n));
    n.gte(30) && (js = new Decimal(4).pow(Decimal.pow(1.2,n)));
    return Decimal.pow(10,11).times(js);
}

//up12:基础1e18;n<10时(n*6+1)^(n*2);n≥10时(n*6+1)^(1.4^n)
function h6_3_1_costs3(n){
    let js = new Decimal(0);
    (n.lt(10)) && (js = n.times(6).plus(1).pow(n.times(2)));
    n.gte(10) && (js = n.times(6).plus(1).pow(Decimal.pow(1.4,n)));
    return Decimal.pow(10,18).times(js);
}

function h6_3_1up1_costs(){return Decimal.pow(10,6).times(Decimal.pow(2,h6_3_1up1));}
function h6_3_1up2_costs(){return Decimal.pow(10,7).times(Decimal.pow(2.33,h6_3_1up2));}
function h6_3_1up3_costs(){return Decimal.pow(10,7).times(Decimal.pow(2.33,h6_3_1up3));}
function h6_3_1up4_costs(){return h6_3_1_costs1(h6_3_1up4);}
function h6_3_1up5_costs(){return Decimal.pow(10,9).times(Decimal.pow(3,h6_3_1up5));}
function h6_3_1up6_costs(){return Decimal.pow(10,10).times(Decimal.pow(3,h6_3_1up6));}
function h6_3_1up7_costs(){return Decimal.pow(10,10).times(Decimal.pow(3,h6_3_1up7));}
function h6_3_1up8_costs(){return h6_3_1_costs2(h6_3_1up8);}
function h6_3_1up9_costs(){return Decimal.pow(10,16).times(h6_3_1up9.plus(1).pow(h6_3_1up9));}
function h6_3_1up10_costs(){return Decimal.pow(10,17).times(h6_3_1up10.times(2.33).plus(1).pow(h6_3_1up10));}
function h6_3_1up11_costs(){return Decimal.pow(10,17).times(h6_3_1up11.times(2.33).plus(1).pow(h6_3_1up11));}
function h6_3_1up12_costs(){return h6_3_1_costs3(h6_3_1up12);}

//费用公式:爱因斯坦场方程
//在 Godot 原式基础上把费用起点整体÷1e10(即指数18→8、19→9、20→10、22→12、23→13),n的成长曲线不变
function h6_3_2up1_costs(){return Decimal.pow(10,8).times(Decimal.pow(2,h6_3_2up1));}
function h6_3_2up2_costs(){return Decimal.pow(10,8).times(Decimal.pow(2,h6_3_2up2));}
function h6_3_2up3_costs(){return Decimal.pow(10,9).times(h6_3_2up3.plus(2).pow(h6_3_2up3));}
function h6_3_2up4_costs(){return Decimal.pow(10,10).times(Decimal.pow(2.33,h6_3_2up4));}
function h6_3_2up5_costs(){return Decimal.pow(10,12).times(Decimal.pow(3,h6_3_2up5));}
function h6_3_2up6_costs(){return Decimal.pow(10,13).times(Decimal.pow(3.2,h6_3_2up6));}
function h6_3_2up7_costs(){return Decimal.pow(10,13).times(Decimal.pow(3.5,h6_3_2up7));}

//按变量名读取升级等级:两套升级都用 let 声明,不会挂载到 window 上,
//故不能用 window["h6_3_1up1"](会拿到 undefined),这里统一用 switch 取
function h6_3_lv(name){
    switch (name){
        case "h6_3_1up1": return h6_3_1up1;
        case "h6_3_1up2": return h6_3_1up2;
        case "h6_3_1up3": return h6_3_1up3;
        case "h6_3_1up4": return h6_3_1up4;
        case "h6_3_1up5": return h6_3_1up5;
        case "h6_3_1up6": return h6_3_1up6;
        case "h6_3_1up7": return h6_3_1up7;
        case "h6_3_1up8": return h6_3_1up8;
        case "h6_3_1up9": return h6_3_1up9;
        case "h6_3_1up10": return h6_3_1up10;
        case "h6_3_1up11": return h6_3_1up11;
        case "h6_3_1up12": return h6_3_1up12;
        case "h6_3_2up1": return h6_3_2up1;
        case "h6_3_2up2": return h6_3_2up2;
        case "h6_3_2up3": return h6_3_2up3;
        case "h6_3_2up4": return h6_3_2up4;
        case "h6_3_2up5": return h6_3_2up5;
        case "h6_3_2up6": return h6_3_2up6;
        case "h6_3_2up7": return h6_3_2up7;
    }
    return new Decimal(0);
}

//按变量名写入升级等级:与 h6_3_lv 一一对应
function h6_3_set(name,val){
    switch (name){
        case "h6_3_1up1": h6_3_1up1 = val; break;
        case "h6_3_1up2": h6_3_1up2 = val; break;
        case "h6_3_1up3": h6_3_1up3 = val; break;
        case "h6_3_1up4": h6_3_1up4 = val; break;
        case "h6_3_1up5": h6_3_1up5 = val; break;
        case "h6_3_1up6": h6_3_1up6 = val; break;
        case "h6_3_1up7": h6_3_1up7 = val; break;
        case "h6_3_1up8": h6_3_1up8 = val; break;
        case "h6_3_1up9": h6_3_1up9 = val; break;
        case "h6_3_1up10": h6_3_1up10 = val; break;
        case "h6_3_1up11": h6_3_1up11 = val; break;
        case "h6_3_1up12": h6_3_1up12 = val; break;
        case "h6_3_2up1": h6_3_2up1 = val; break;
        case "h6_3_2up2": h6_3_2up2 = val; break;
        case "h6_3_2up3": h6_3_2up3 = val; break;
        case "h6_3_2up4": h6_3_2up4 = val; break;
        case "h6_3_2up5": h6_3_2up5 = val; break;
        case "h6_3_2up6": h6_3_2up6 = val; break;
        case "h6_3_2up7": h6_3_2up7 = val; break;
    }
}

//购买函数:先扣奇点,再升级,buff由 h6_3_1_hans/h6_3_2_hans 重算
//括号内为对应的效果
function h6_3_buy(name){
    let cost = window[name + "_costs"]();//费用函数是 function 声明,挂在 window 上
    let lv = h6_3_lv(name);
    if (h6_ziyuan.lt(cost)) return;
    h6_ziyuan = h6_ziyuan.minus(cost);
    h6_3_set(name,lv.plus(1));
    h6_3_1_hans();
    h6_3_2_hans();
    h6_js_re = 1;//下一帧重算弦论层级
    h5_js_re = 1;//下一帧重算游戏倍率与奇点获取量
    h1_js_re = 1;//下一帧重算夸克秒产(牛顿buff)
    updateUI_h6();
}

function h6_3_1up1_button(){h6_3_buy("h6_3_1up1");}//G值:基础值+1
function h6_3_1up2_button(){h6_3_buy("h6_3_1up2");}//m1值:基础值+1
function h6_3_1up3_button(){h6_3_buy("h6_3_1up3");}//m2值:基础值+1
function h6_3_1up4_button(){h6_3_buy("h6_3_1up4");}//r值:基础值*0.9
function h6_3_1up5_button(){h6_3_buy("h6_3_1up5");}//G值+1等级:G值等级乘数+1
function h6_3_1up6_button(){h6_3_buy("h6_3_1up6");}//m1值+1等级:m1值等级乘数+1
function h6_3_1up7_button(){h6_3_buy("h6_3_1up7");}//m2值+1等级:m2值等级乘数+1
function h6_3_1up8_button(){h6_3_buy("h6_3_1up8");}//r值*0.9等级:r值等级乘数+1
function h6_3_1up9_button(){h6_3_buy("h6_3_1up9");}//G值指数:G值指数+0.1
function h6_3_1up10_button(){h6_3_buy("h6_3_1up10");}//m1值指数:m1值指数+0.1
function h6_3_1up11_button(){h6_3_buy("h6_3_1up11");}//m2值指数:m2值指数+0.1
function h6_3_1up12_button(){h6_3_buy("h6_3_1up12");}//r值指数:r值等级指数+0.01

function h6_3_2up1_button(){h6_3_buy("h6_3_2up1");}//π值:基础值+1
function h6_3_2up2_button(){h6_3_buy("h6_3_2up2");}//G值:基础值+1
function h6_3_2up3_button(){h6_3_buy("h6_3_2up3");}//c值:基础值*0.9
function h6_3_2up4_button(){h6_3_buy("h6_3_2up4");}//Tμν值:基础值+1(初始0.5)
function h6_3_2up5_button(){h6_3_buy("h6_3_2up5");}//T值:基础值+1
function h6_3_2up6_button(){h6_3_buy("h6_3_2up6");}//gμν值:基础值+1
function h6_3_2up7_button(){h6_3_buy("h6_3_2up7");}//Λ值:基础值+1

//UI刷新:按按钮统一填充"效果/费用/等级/说明",费用足够时高亮为可升级
//items=[按钮id,名称,当前效果,费用函数名,说明]
function h6_3_ui(items){
    for (let i = 0;i < items.length;i++){
        let it = items[i];
        let b = document.getElementById(it[0]);
        let cost = window[it[3]]();
        let pd = h6_ziyuan.gte(cost);
        b.style.opacity = pd ? '1' : '0.5';
        b.classList.toggle('upgradable', pd);
        b.innerHTML = it[1] + ":" + it[2] + "<br>" + formatDecimal(cost) + "奇点<br>等级:" + formatDecimal(h6_3_lv(it[0])) + "<br>" + it[4];
    }
}

//牛顿万有引力公式的UI刷新
function updateUI_h6_3_1(){
    //先按当前等级重算一次buff,保证F永远反映实际生效值
    h6_3_1_hans();

    //各派生值,与 h6_3_1_hans 保持同一套公式(指数系数共用同一组常量)
    let G_buff = h6_3_1up1.plus(1).times(h6_3_1up5.plus(1)).pow(h6_3_1up9.times(h6_3_1_up9_exp).plus(1));
    let m1_buff = h6_3_1up2.plus(1).times(h6_3_1up6.plus(1)).pow(h6_3_1up10.times(h6_3_1_up10_exp).plus(1));
    let m2_buff = h6_3_1up3.plus(1).times(h6_3_1up7.plus(1)).pow(h6_3_1up11.times(h6_3_1_up11_exp).plus(1));
    let r_buff = Decimal.pow(0.9,h6_3_1up4.times(h6_3_1up8.plus(1)).pow(h6_3_1up12.times(h6_3_1_up12_exp).plus(1)));

    document.getElementById("h6_3_1buff").innerHTML = "F = " + formatDecimal(h6_3_1buff);

    h6_3_ui([
        ["h6_3_1up1","G值",formatDecimal(G_buff),"h6_3_1up1_costs","值+1"],
        ["h6_3_1up2","m1值",formatDecimal(m1_buff),"h6_3_1up2_costs","值+1"],
        ["h6_3_1up3","m2值",formatDecimal(m2_buff),"h6_3_1up3_costs","值+1"],
        ["h6_3_1up4","r值",formatDecimal(r_buff),"h6_3_1up4_costs","值*0.9"],
        ["h6_3_1up5","G值等级",formatDecimal(h6_3_1up5),"h6_3_1up5_costs","等级乘数+1"],
        ["h6_3_1up6","m1值等级",formatDecimal(h6_3_1up6),"h6_3_1up6_costs","等级乘数+1"],
        ["h6_3_1up7","m2值等级",formatDecimal(h6_3_1up7),"h6_3_1up7_costs","等级乘数+1"],
        ["h6_3_1up8","r值等级",formatDecimal(h6_3_1up8),"h6_3_1up8_costs","等级乘数+1"],
        ["h6_3_1up9","G值指数",formatDecimal(h6_3_1up9.times(0.1).plus(1)),"h6_3_1up9_costs","G值指数+0.1"],
        ["h6_3_1up10","m1值指数",formatDecimal(h6_3_1up10.times(0.1).plus(1)),"h6_3_1up10_costs","m1值指数+0.1"],
        ["h6_3_1up11","m2值指数",formatDecimal(h6_3_1up11.times(0.1).plus(1)),"h6_3_1up11_costs","m2值指数+0.1"],
        ["h6_3_1up12","r值等级指数",formatDecimal(h6_3_1up12.times(0.01).plus(1)),"h6_3_1up12_costs","r值等级指数+0.01"],
    ]);
}

//爱因斯坦场方程的UI刷新
function updateUI_h6_3_2(){
    //先按当前等级重算一次buff,保证页签里的Rμν永远反映实际生效值(不依赖外部是否已调用计算函数)
    h6_3_2_hans();

    let pi_buff = h6_3_2up1;
    let G_buff = h6_3_2up2.plus(1);
    let c_buff = Decimal.pow(0.9,h6_3_2up3);
    let Tmn_buff = h6_3_2up4.plus(0.5);
    let T_buff = h6_3_2up5.plus(1);
    let gmn_buff = h6_3_2up6.plus(1);
    let L_buff = h6_3_2up7.plus(1);

    document.getElementById("h6_3_2buff").innerHTML = "Rμν = " + formatDecimal(h6_3_2buff);

    h6_3_ui([
        ["h6_3_2up1","π值",formatDecimal(pi_buff),"h6_3_2up1_costs","值+1"],
        ["h6_3_2up2","G值",formatDecimal(G_buff),"h6_3_2up2_costs","值+1"],
        ["h6_3_2up3","c值",formatDecimal(c_buff),"h6_3_2up3_costs","值*0.9"],
        ["h6_3_2up4","Tμν值",formatDecimal(Tmn_buff),"h6_3_2up4_costs","值+1"],
        ["h6_3_2up5","T值",formatDecimal(T_buff),"h6_3_2up5_costs","值+1"],
        ["h6_3_2up6","gμν值",formatDecimal(gmn_buff),"h6_3_2up6_costs","值+1"],
        ["h6_3_2up7","Λ值",formatDecimal(L_buff),"h6_3_2up7_costs","值+1"],
    ]);
}

//子选项卡按钮可见性:锝解锁牛顿,钌解锁爱因斯坦
//未解锁时若正停留在该子选项卡上,则退回"维度"
function UIvisible_h6_3(){
    let b1 = document.getElementById('h6_3_1_cut');
    let b2 = document.getElementById('h6_3_2_cut');
    let b1_ok = h2_up43.gte(1);
    let b2_ok = h2_up44.gte(1);
    b1.style.display = b1_ok ? 'block' : 'none';
    b2.style.display = b2_ok ? 'block' : 'none';

    let b1_xs = document.getElementById('h6_3_1');
    let b2_xs = document.getElementById('h6_3_2');
    (!b1_ok && b1_xs.style.display !== 'none') && h6_1_cut_hans();
    (!b2_ok && b2_xs.style.display !== 'none') && h6_1_cut_hans();
}

//绑定按钮事件:牛顿万有引力公式
//用 h6_3_bind 逐个绑定,元素缺失时只跳过该按钮,不影响整个脚本继续执行
function h6_3_bind(id,fn){
    let b = document.getElementById(id);
    b && b.addEventListener('click', fn);
}
h6_3_bind('h6_3_1up1', h6_3_1up1_button);
h6_3_bind('h6_3_1up2', h6_3_1up2_button);
h6_3_bind('h6_3_1up3', h6_3_1up3_button);
h6_3_bind('h6_3_1up4', h6_3_1up4_button);
h6_3_bind('h6_3_1up5', h6_3_1up5_button);
h6_3_bind('h6_3_1up6', h6_3_1up6_button);
h6_3_bind('h6_3_1up7', h6_3_1up7_button);
h6_3_bind('h6_3_1up8', h6_3_1up8_button);
h6_3_bind('h6_3_1up9', h6_3_1up9_button);
h6_3_bind('h6_3_1up10', h6_3_1up10_button);
h6_3_bind('h6_3_1up11', h6_3_1up11_button);
h6_3_bind('h6_3_1up12', h6_3_1up12_button);

//绑定按钮事件:爱因斯坦场方程
h6_3_bind('h6_3_2up1', h6_3_2up1_button);
h6_3_bind('h6_3_2up2', h6_3_2up2_button);
h6_3_bind('h6_3_2up3', h6_3_2up3_button);
h6_3_bind('h6_3_2up4', h6_3_2up4_button);
h6_3_bind('h6_3_2up5', h6_3_2up5_button);
h6_3_bind('h6_3_2up6', h6_3_2up6_button);
h6_3_bind('h6_3_2up7', h6_3_2up7_button);
