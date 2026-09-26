//h6:弦论
//购买规则:购买时该维数量<=10 则数量+1(上限11),用于给每一维点火
//UI刷新
//注意:每秒产量显示统一乘 h5_time_buff(游戏速度倍率),与 global_inc 的实际累加保持一致
function updateUI_h6(){
    //奇点与膜
    document.getElementById("h6_ziyuan_txt").innerHTML = "奇点:" + formatDecimal(h6_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h6_ziyuan.plus(1)).log(6))).plus(1)) + ")";
    //document.getElementById("h6_ziyuans").innerHTML = formatDecimal(h6_ziyuan_js) + "/s";
    //当有相关升级时再显示秒产
    document.getElementById("h6_brane_txt").innerHTML = "膜:" + formatDecimal(h6_brane) + "(对夸克加成:" + formatDecimal(h6_brane) + ") +" + formatDecimal(h6_brane_js.times(h5_time_buff)) + "/s";

    //一维(消耗膜)
    let h6_up1_cots = new Decimal(1).plus(Decimal.pow(1 + 1,h6_up1));
    let b6_up1 = document.getElementById('h6_up1');
    let h6_up1_pd = h6_brane.gte(h6_up1_cots);
    b6_up1.style.opacity = h6_up1_pd ? '1' : '0.5';
    b6_up1.classList.toggle('upgradable', h6_up1_pd);
    document.getElementById("h6_up1").innerHTML = "一维" + formatDecimal(h6_up1) + "级 数量:" + formatDecimal(h6_up1q) + "+" + formatDecimal(h6_up1q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up1_cots) + "膜";

    //二维(消耗一维数量)
    let h6_up2_cots = new Decimal(2).plus(Decimal.pow(2 + 1,h6_up2));
    let b6_up2 = document.getElementById('h6_up2');
    let h6_up2_pd = h6_up1q.gte(h6_up2_cots);
    b6_up2.style.opacity = h6_up2_pd ? '1' : '0.5';
    b6_up2.classList.toggle('upgradable', h6_up2_pd);
    document.getElementById("h6_up2").innerHTML = "二维" + formatDecimal(h6_up2) + "级 数量:" + formatDecimal(h6_up2q) + "+" + formatDecimal(h6_up2q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up2_cots) + "一维数量(全部)";

    //三维(消耗二维数量)
    let h6_up3_cots = new Decimal(3).plus(Decimal.pow(3 + 1,h6_up3));
    let b6_up3 = document.getElementById('h6_up3');
    let h6_up3_pd = h6_up2q.gte(h6_up3_cots);
    b6_up3.style.opacity = h6_up3_pd ? '1' : '0.5';
    b6_up3.classList.toggle('upgradable', h6_up3_pd);
    document.getElementById("h6_up3").innerHTML = "三维" + formatDecimal(h6_up3) + "级 数量:" + formatDecimal(h6_up3q) + "+" + formatDecimal(h6_up3q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up3_cots) + "二维数量(全部)";

    //四维(消耗三维数量)
    let h6_up4_cots = new Decimal(4).plus(Decimal.pow(4 + 1,h6_up4));
    let b6_up4 = document.getElementById('h6_up4');
    let h6_up4_pd = h6_up3q.gte(h6_up4_cots);
    b6_up4.style.opacity = h6_up4_pd ? '1' : '0.5';
    b6_up4.classList.toggle('upgradable', h6_up4_pd);
    document.getElementById("h6_up4").innerHTML = "四维" + formatDecimal(h6_up4) + "级 数量:" + formatDecimal(h6_up4q) + "+" + formatDecimal(h6_up4q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up4_cots) + "三维数量(全部)";

    //五维(消耗四维数量)
    let h6_up5_cots = new Decimal(5).plus(Decimal.pow(5 + 1,h6_up5));
    let b6_up5 = document.getElementById('h6_up5');
    let h6_up5_pd = h6_up4q.gte(h6_up5_cots);
    b6_up5.style.opacity = h6_up5_pd ? '1' : '0.5';
    b6_up5.classList.toggle('upgradable', h6_up5_pd);
    document.getElementById("h6_up5").innerHTML = "五维" + formatDecimal(h6_up5) + "级 数量:" + formatDecimal(h6_up5q) + "+" + formatDecimal(h6_up5q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up5_cots) + "四维数量(全部)";

    //六维(消耗五维数量)
    let h6_up6_cots = new Decimal(6).plus(Decimal.pow(6 + 1,h6_up6));
    let b6_up6 = document.getElementById('h6_up6');
    let h6_up6_pd = h6_up5q.gte(h6_up6_cots);
    b6_up6.style.opacity = h6_up6_pd ? '1' : '0.5';
    b6_up6.classList.toggle('upgradable', h6_up6_pd);
    document.getElementById("h6_up6").innerHTML = "六维" + formatDecimal(h6_up6) + "级 数量:" + formatDecimal(h6_up6q) + "+" + formatDecimal(h6_up6q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up6_cots) + "五维数量(全部)";

    //七维(消耗六维数量)
    let h6_up7_cots = new Decimal(7).plus(Decimal.pow(7 + 1,h6_up7));
    let b6_up7 = document.getElementById('h6_up7');
    let h6_up7_pd = h6_up6q.gte(h6_up7_cots);
    b6_up7.style.opacity = h6_up7_pd ? '1' : '0.5';
    b6_up7.classList.toggle('upgradable', h6_up7_pd);
    document.getElementById("h6_up7").innerHTML = "七维" + formatDecimal(h6_up7) + "级 数量:" + formatDecimal(h6_up7q) + "+" + formatDecimal(h6_up7q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up7_cots) + "六维数量(全部)";

    //八维(消耗七维数量)
    let h6_up8_cots = new Decimal(8).plus(Decimal.pow(8 + 1,h6_up8));
    let b6_up8 = document.getElementById('h6_up8');
    let h6_up8_pd = h6_up7q.gte(h6_up8_cots);
    b6_up8.style.opacity = h6_up8_pd ? '1' : '0.5';
    b6_up8.classList.toggle('upgradable', h6_up8_pd);
    document.getElementById("h6_up8").innerHTML = "八维" + formatDecimal(h6_up8) + "级 数量:" + formatDecimal(h6_up8q) + "+" + formatDecimal(h6_up8q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up8_cots) + "七维数量(全部)";

    //九维(消耗八维数量)
    let h6_up9_cots = new Decimal(9).plus(Decimal.pow(9 + 1,h6_up9));
    let b6_up9 = document.getElementById('h6_up9');
    let h6_up9_pd = h6_up8q.gte(h6_up9_cots);
    b6_up9.style.opacity = h6_up9_pd ? '1' : '0.5';
    b6_up9.classList.toggle('upgradable', h6_up9_pd);
    document.getElementById("h6_up9").innerHTML = "九维" + formatDecimal(h6_up9) + "级 数量:" + formatDecimal(h6_up9q) + "+" + formatDecimal(h6_up9q_js.times(h5_time_buff)) + "/s<br>费用:" + formatDecimal(h6_up9_cots) + "八维数量(全部)";

    //十维(消耗九维数量,数量仅通过购买获得)
    let h6_up10_cots = new Decimal(10).plus(Decimal.pow(10 + 1,h6_up10));
    let b6_up10 = document.getElementById('h6_up10');
    let h6_up10_pd = h6_up9q.gte(h6_up10_cots);
    b6_up10.style.opacity = h6_up10_pd ? '1' : '0.5';
    b6_up10.classList.toggle('upgradable', h6_up10_pd);
    document.getElementById("h6_up10").innerHTML = "十维" + formatDecimal(h6_up10) + "级 数量:" + formatDecimal(h6_up10q) + "<br>费用:" + formatDecimal(h6_up10_cots) + "九维数量(全部)";

    //弦(第二子选项卡)
    //各弦自身加成(等级0时为1)
    let h6_1_up2_buff = Decimal.pow(1.15,h6_1_up2);
    let h6_1_up3_buff = Decimal.pow(1.1,h6_1_up3);
    let h6_1_up4_buff = Decimal.pow(1.15,h6_1_up4);
    let h6_1_up5_buff = Decimal.pow(1.1,h6_1_up5);
    let h6_1_up6_buff = h6_1_jian(h6_1_up6);
    let h6_1_up7_buff = Decimal.pow(1.2,h6_1_up7);
    let h6_1_up8_buff = Decimal.pow(2,h6_1_up8);
    let h6_1_up9_buff = h6_1_jian(h6_1_up9);
    let h6_1_up10_buff = h6_1_jian(h6_1_up10);

    //奇点弦(显示奇点弦综合后的时间碎片产量倍率)
    let h6_1_up1_cots = h6_1_cots(h6_1_up1).times(h6_1_up6_buff);
    let b6_1_up1 = document.getElementById('h6_1_up1');
    let h6_1_up1_pd = h6_ziyuan.gte(h6_1_up1_cots);
    b6_1_up1.style.opacity = h6_1_up1_pd ? '1' : '0.5';
    b6_1_up1.classList.toggle('upgradable', h6_1_up1_pd);
    document.getElementById("h6_1_up1").innerHTML = "奇点弦" + formatDecimal(h6_1_up1.times(h6_1_up3_buff).times(h6_1_up7_buff)) + "级 时间碎片产量*" + formatDecimal(h6_1_zhonghe_buff) + "<br>费用:" + formatDecimal(h6_1_up1_cots) + "奇点";

    //开弦
    let h6_1_up2_cots = h6_1_cots(h6_1_up2).times(h6_1_up9_buff);
    let b6_1_up2 = document.getElementById('h6_1_up2');
    let h6_1_up2_pd = h6_ziyuan.gte(h6_1_up2_cots);
    b6_1_up2.style.opacity = h6_1_up2_pd ? '1' : '0.5';
    b6_1_up2.classList.toggle('upgradable', h6_1_up2_pd);
    document.getElementById("h6_1_up2").innerHTML = "开弦" + formatDecimal(h6_1_up2) + "级 奇点弦效果*" + formatDecimal(h6_1_up2_buff) + "<br>费用:" + formatDecimal(h6_1_up2_cots) + "奇点";

    //闭弦
    let h6_1_up3_cots = h6_1_cots(h6_1_up3).times(h6_1_up9_buff);
    let b6_1_up3 = document.getElementById('h6_1_up3');
    let h6_1_up3_pd = h6_ziyuan.gte(h6_1_up3_cots);
    b6_1_up3.style.opacity = h6_1_up3_pd ? '1' : '0.5';
    b6_1_up3.classList.toggle('upgradable', h6_1_up3_pd);
    document.getElementById("h6_1_up3").innerHTML = "闭弦" + formatDecimal(h6_1_up3) + "级 奇点弦等级*" + formatDecimal(h6_1_up3_buff) + "<br>费用:" + formatDecimal(h6_1_up3_cots) + "奇点";

    //基态
    let h6_1_up4_cots = h6_1_cots(h6_1_up4).times(h6_1_up10_buff);
    let b6_1_up4 = document.getElementById('h6_1_up4');
    let h6_1_up4_pd = h6_ziyuan.gte(h6_1_up4_cots);
    b6_1_up4.style.opacity = h6_1_up4_pd ? '1' : '0.5';
    b6_1_up4.classList.toggle('upgradable', h6_1_up4_pd);
    document.getElementById("h6_1_up4").innerHTML = "基态" + formatDecimal(h6_1_up4) + "级 开弦效果*" + formatDecimal(h6_1_up4_buff) + "<br>费用:" + formatDecimal(h6_1_up4_cots) + "奇点";

    //激发态
    let h6_1_up5_cots = h6_1_cots(h6_1_up5).times(h6_1_up10_buff);
    let b6_1_up5 = document.getElementById('h6_1_up5');
    let h6_1_up5_pd = h6_ziyuan.gte(h6_1_up5_cots);
    b6_1_up5.style.opacity = h6_1_up5_pd ? '1' : '0.5';
    b6_1_up5.classList.toggle('upgradable', h6_1_up5_pd);
    document.getElementById("h6_1_up5").innerHTML = "激发态" + formatDecimal(h6_1_up5) + "级 闭弦效果*" + formatDecimal(h6_1_up5_buff) + "<br>费用:" + formatDecimal(h6_1_up5_cots) + "奇点";

    //TypeI弦
    let h6_1_up6_cots = Decimal.pow(7,h6_1_up6);
    let b6_1_up6 = document.getElementById('h6_1_up6');
    let h6_1_up6_pd = h6_ziyuan.gte(h6_1_up6_cots);
    b6_1_up6.style.opacity = h6_1_up6_pd ? '1' : '0.5';
    b6_1_up6.classList.toggle('upgradable', h6_1_up6_pd);
    document.getElementById("h6_1_up6").innerHTML = "TypeI弦" + formatDecimal(h6_1_up6) + "级 奇点弦费用*" + formatDecimal(h6_1_up6_buff) + "<br>费用:" + formatDecimal(h6_1_up6_cots) + "奇点";

    //TypeIIA弦
    let h6_1_up7_cots = Decimal.pow(7,h6_1_up7);
    let b6_1_up7 = document.getElementById('h6_1_up7');
    let h6_1_up7_pd = h6_ziyuan.gte(h6_1_up7_cots);
    b6_1_up7.style.opacity = h6_1_up7_pd ? '1' : '0.5';
    b6_1_up7.classList.toggle('upgradable', h6_1_up7_pd);
    document.getElementById("h6_1_up7").innerHTML = "TypeIIA弦" + formatDecimal(h6_1_up7) + "级 奇点弦等级*" + formatDecimal(h6_1_up7_buff) + "<br>费用:" + formatDecimal(h6_1_up7_cots) + "奇点";

    //TypeIIB弦
    let h6_1_up8_cots = Decimal.pow(11,h6_1_up8);
    let b6_1_up8 = document.getElementById('h6_1_up8');
    let h6_1_up8_pd = h6_ziyuan.gte(h6_1_up8_cots);
    b6_1_up8.style.opacity = h6_1_up8_pd ? '1' : '0.5';
    b6_1_up8.classList.toggle('upgradable', h6_1_up8_pd);
    document.getElementById("h6_1_up8").innerHTML = "TypeIIB弦" + formatDecimal(h6_1_up8) + "级 奇点获取量*" + formatDecimal(h6_1_up8_buff) + "<br>费用:" + formatDecimal(h6_1_up8_cots) + "奇点";

    //杂化弦SO(32)
    let h6_1_up9_cots = Decimal.pow(7,h6_1_up9);
    let b6_1_up9 = document.getElementById('h6_1_up9');
    let h6_1_up9_pd = h6_ziyuan.gte(h6_1_up9_cots);
    b6_1_up9.style.opacity = h6_1_up9_pd ? '1' : '0.5';
    b6_1_up9.classList.toggle('upgradable', h6_1_up9_pd);
    document.getElementById("h6_1_up9").innerHTML = "杂化弦SO(32)" + formatDecimal(h6_1_up9) + "级 开弦、闭弦费用*" + formatDecimal(h6_1_up9_buff) + "<br>费用:" + formatDecimal(h6_1_up9_cots) + "奇点";

    //杂化弦E8XE8
    let h6_1_up10_cots = Decimal.pow(7,h6_1_up10);
    let b6_1_up10 = document.getElementById('h6_1_up10');
    let h6_1_up10_pd = h6_ziyuan.gte(h6_1_up10_cots);
    b6_1_up10.style.opacity = h6_1_up10_pd ? '1' : '0.5';
    b6_1_up10.classList.toggle('upgradable', h6_1_up10_pd);
    document.getElementById("h6_1_up10").innerHTML = "杂化弦E8XE8" + formatDecimal(h6_1_up10) + "级 基态、激发态费用*" + formatDecimal(h6_1_up10_buff) + "<br>费用:" + formatDecimal(h6_1_up10_cots) + "奇点";

    //牛顿万有引力公式(第三子选项卡)、爱因斯坦场方程(第四子选项卡)
    //用 typeof 判断:script_h6_3.js 未加载或未解析成功时只跳过这一步,不让整个刷新崩掉
    (document.getElementById('h6_3_1').style.display !== 'none' && typeof updateUI_h6_3_1 === 'function') && updateUI_h6_3_1();
    (document.getElementById('h6_3_2').style.display !== 'none' && typeof updateUI_h6_3_2 === 'function') && updateUI_h6_3_2();
}

//计算函数
function h6_hans(){
    //膜产量:奇点每秒生产1膜(每个奇点),另加一维等级*一维数量
    //B型恒星(钼解锁):加成膜产量
    h6_brane_js = h6_up1.times(h6_up1q).plus(h6_ziyuan).times(h3_up11_buff);

    //维度产量:高一维的等级*高一维数量的平方根(每秒产量,十维数量仅通过购买获得)
    h6_up1q_js = h6_up2.times(h6_up2q.pow(0.5));
    h6_up2q_js = h6_up3.times(h6_up3q.pow(0.5));
    h6_up3q_js = h6_up4.times(h6_up4q.pow(0.5));
    h6_up4q_js = h6_up5.times(h6_up5q.pow(0.5));
    h6_up5q_js = h6_up6.times(h6_up6q.pow(0.5));
    h6_up6q_js = h6_up7.times(h6_up7q.pow(0.5));
    h6_up7q_js = h6_up8.times(h6_up8q.pow(0.5));
    h6_up8q_js = h6_up9.times(h6_up9q.pow(0.5));
    h6_up9q_js = h6_up10.times(h6_up10q.pow(0.5));
}

//计算函数:弦(第二子选项卡)
//主弦基础费用:10^(1.15^n)
function h6_1_cots(n){
    return Decimal.pow(10,Decimal.pow(1.15,n));
}
//辅助弦费用减免系数:max(0.1,0.95^n)
function h6_1_jian(n){
    return Decimal.max(0.1,Decimal.pow(0.95,n));
}
//弦加成(派生值,必须在 h5_hans() 使用前算好,故由 h5_hans() 与各弦按钮调用)
function h6_1_hans(){
    //各弦自身加成(等级0时为1)
    let h6_1_up1_buff = Decimal.pow(1.15,h6_1_up1);//奇点弦:时间碎片产量
    let h6_1_up2_buff = Decimal.pow(1.15,h6_1_up2);//开弦:奇点弦效果
    let h6_1_up3_buff = Decimal.pow(1.1,h6_1_up3);//闭弦:奇点弦数量
    let h6_1_up4_buff = Decimal.pow(1.15,h6_1_up4);//基态:开弦效果
    let h6_1_up5_buff = Decimal.pow(1.1,h6_1_up5);//激发态:闭弦效果
    let h6_1_up7_buff = Decimal.pow(1.2,h6_1_up7);//TypeIIA弦:奇点弦数量

    //奇点弦效果=开弦效果*基态效果
    h6_1_xiaoguo_buff = h6_1_up2_buff.times(h6_1_up4_buff);
    //奇点弦数量=闭弦效果*激发态效果*TypeIIA弦效果
    h6_1_shuliang_buff = h6_1_up3_buff.times(h6_1_up5_buff).times(h6_1_up7_buff);
    //时间碎片产量倍率=1.15^(n1+n2+n4)*1.1^(n3+n5)*1.2^n7
    h6_1_zhonghe_buff = h6_1_up1_buff.times(h6_1_xiaoguo_buff).times(h6_1_shuliang_buff);
    //奇点获取量倍率=2^n8
    h6_1_ziyuan_buff = Decimal.pow(2,h6_1_up8);
}

//按钮函数
//一维:消耗膜
function h6_up1_button(){
    let cost = new Decimal(1).plus(Decimal.pow(1 + 1,h6_up1));
    if (h6_brane.gte(cost)){
        h6_brane = h6_brane.minus(cost);
        h6_up1 = h6_up1.plus(1);
        h6_up1q.lte(10) && (h6_up1q = h6_up1q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//二维:消耗一维数量
function h6_up2_button(){
    let cost = new Decimal(2).plus(Decimal.pow(2 + 1,h6_up2));
    if (h6_up1q.gte(cost)){
        h6_up1q = new Decimal(0);
        h6_up2 = h6_up2.plus(1);
        h6_up2q.lte(10) && (h6_up2q = h6_up2q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//三维:消耗二维数量
function h6_up3_button(){
    let cost = new Decimal(3).plus(Decimal.pow(3 + 1,h6_up3));
    if (h6_up2q.gte(cost)){
        h6_up2q = new Decimal(0);
        h6_up3 = h6_up3.plus(1);
        h6_up3q.lte(10) && (h6_up3q = h6_up3q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//四维:消耗三维数量
function h6_up4_button(){
    let cost = new Decimal(4).plus(Decimal.pow(4 + 1,h6_up4));
    if (h6_up3q.gte(cost)){
        h6_up3q = new Decimal(0);
        h6_up4 = h6_up4.plus(1);
        h6_up4q.lte(10) && (h6_up4q = h6_up4q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//五维:消耗四维数量
function h6_up5_button(){
    let cost = new Decimal(5).plus(Decimal.pow(5 + 1,h6_up5));
    if (h6_up4q.gte(cost)){
        h6_up4q = new Decimal(0);
        h6_up5 = h6_up5.plus(1);
        h6_up5q.lte(10) && (h6_up5q = h6_up5q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//六维:消耗五维数量
function h6_up6_button(){
    let cost = new Decimal(6).plus(Decimal.pow(6 + 1,h6_up6));
    if (h6_up5q.gte(cost)){
        h6_up5q = new Decimal(0);
        h6_up6 = h6_up6.plus(1);
        h6_up6q.lte(10) && (h6_up6q = h6_up6q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//七维:消耗六维数量
function h6_up7_button(){
    let cost = new Decimal(7).plus(Decimal.pow(7 + 1,h6_up7));
    if (h6_up6q.gte(cost)){
        h6_up6q = new Decimal(0);
        h6_up7 = h6_up7.plus(1);
        h6_up7q.lte(10) && (h6_up7q = h6_up7q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//八维:消耗七维数量
function h6_up8_button(){
    let cost = new Decimal(8).plus(Decimal.pow(8 + 1,h6_up8));
    if (h6_up7q.gte(cost)){
        h6_up7q = new Decimal(0);
        h6_up8 = h6_up8.plus(1);
        h6_up8q.lte(10) && (h6_up8q = h6_up8q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//九维:消耗八维数量
function h6_up9_button(){
    let cost = new Decimal(9).plus(Decimal.pow(9 + 1,h6_up9));
    if (h6_up8q.gte(cost)){
        h6_up8q = new Decimal(0);
        h6_up9 = h6_up9.plus(1);
        h6_up9q.lte(10) && (h6_up9q = h6_up9q.plus(1));
        h6_js_re = 1;
        updateUI_h6();
    }
}

//十维:消耗九维数量
function h6_up10_button(){
    let cost = new Decimal(10).plus(Decimal.pow(10 + 1,h6_up10));
    if (h6_up9q.gte(cost)){
        h6_up9q = new Decimal(0);
        h6_up10 = h6_up10.plus(1);
        h6_up10q = h6_up10q.plus(1);
        h6_js_re = 1;
        updateUI_h6();
    }
}

//弦:奇点弦(时间碎片产量)
function h6_1_up1_button(){
    let cost = h6_1_cots(h6_1_up1).times(h6_1_jian(h6_1_up6));
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up1 = h6_1_up1.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:开弦(奇点弦效果)
function h6_1_up2_button(){
    let cost = h6_1_cots(h6_1_up2).times(h6_1_jian(h6_1_up9));
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up2 = h6_1_up2.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:闭弦(奇点弦数量)
function h6_1_up3_button(){
    let cost = h6_1_cots(h6_1_up3).times(h6_1_jian(h6_1_up9));
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up3 = h6_1_up3.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:基态(开弦效果)
function h6_1_up4_button(){
    let cost = h6_1_cots(h6_1_up4).times(h6_1_jian(h6_1_up10));
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up4 = h6_1_up4.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:激发态(闭弦效果)
function h6_1_up5_button(){
    let cost = h6_1_cots(h6_1_up5).times(h6_1_jian(h6_1_up10));
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up5 = h6_1_up5.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:TypeI弦(奇点弦费用)
function h6_1_up6_button(){
    let cost = Decimal.pow(7,h6_1_up6);
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up6 = h6_1_up6.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:TypeIIA弦(奇点弦数量)
function h6_1_up7_button(){
    let cost = Decimal.pow(7,h6_1_up7);
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up7 = h6_1_up7.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:TypeIIB弦(奇点获取量)
function h6_1_up8_button(){
    let cost = Decimal.pow(11,h6_1_up8);
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up8 = h6_1_up8.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:杂化弦SO(32)(开弦、闭弦费用)
function h6_1_up9_button(){
    let cost = Decimal.pow(7,h6_1_up9);
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up9 = h6_1_up9.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//弦:杂化弦E8XE8(基态、激发态费用)
function h6_1_up10_button(){
    let cost = Decimal.pow(7,h6_1_up10);
    if (h6_ziyuan.gte(cost)){
        h6_ziyuan = h6_ziyuan.minus(cost);
        h6_1_up10 = h6_1_up10.plus(1);
        h6_1_hans();
        h6_js_re = 1;
        h5_js_re = 1;
        updateUI_h6();
    }
}

//绑定按钮事件
document.getElementById('h6_up1').addEventListener('click', h6_up1_button);
document.getElementById('h6_up2').addEventListener('click', h6_up2_button);
document.getElementById('h6_up3').addEventListener('click', h6_up3_button);
document.getElementById('h6_up4').addEventListener('click', h6_up4_button);
document.getElementById('h6_up5').addEventListener('click', h6_up5_button);
document.getElementById('h6_up6').addEventListener('click', h6_up6_button);
document.getElementById('h6_up7').addEventListener('click', h6_up7_button);
document.getElementById('h6_up8').addEventListener('click', h6_up8_button);
document.getElementById('h6_up9').addEventListener('click', h6_up9_button);
document.getElementById('h6_up10').addEventListener('click', h6_up10_button);

//弦
document.getElementById('h6_1_up1').addEventListener('click', h6_1_up1_button);
document.getElementById('h6_1_up2').addEventListener('click', h6_1_up2_button);
document.getElementById('h6_1_up3').addEventListener('click', h6_1_up3_button);
document.getElementById('h6_1_up4').addEventListener('click', h6_1_up4_button);
document.getElementById('h6_1_up5').addEventListener('click', h6_1_up5_button);
document.getElementById('h6_1_up6').addEventListener('click', h6_1_up6_button);
document.getElementById('h6_1_up7').addEventListener('click', h6_1_up7_button);
document.getElementById('h6_1_up8').addEventListener('click', h6_1_up8_button);
document.getElementById('h6_1_up9').addEventListener('click', h6_1_up9_button);
document.getElementById('h6_1_up10').addEventListener('click', h6_1_up10_button);
