//h7:理论(第七层级)
//入口:弦论页的"理论重构"按钮(属于弦论层的重置,实现在 script_h6.js:h6_re_button/h6_re_hans)
//本文件只保留函数与增幅器两部分,与重置相关的界面也不在这里
//函数选项卡:五个数学函数,各自按等级给出"对夸克的加成",五者相乘=总加成
//增幅器选项卡:增幅器点数每秒+当前剩余算子(锡:按夸克微弱放大该产量),四类增幅器分别放大重置次数/夸克/元素/星辰的等级
//约定:函数与增幅器的等级0=未购买(数值/倍率均为1,即无加成)

//------------------------------ 函数数值 ------------------------------
//五条序列的第1级都恰好等于1(对应"1级时夸克*1"),之后各自增长;0级(未购买)一律按1处理
//小等级用整数/精确循环(便于显示成漂亮的整数),大等级改用对数+10^x,避免上万次的循环
//阶乘的对数:ln(n!)
function h7_ln_fact(n){
    if (n.lt(200)){
        let k = n.toNumber();
        let s = 0;
        for (let i = 2;i <= k;i++) s += Math.log(i);
        return new Decimal(s);
    }
    //斯特林级数:ln(n!) ≈ n*ln(n) - n + 0.5*ln(2πn) + 1/(12n)
    return n.times(n.ln()).minus(n).plus(n.times(2 * Math.PI).ln().div(2)).plus(new Decimal(1).div(n.times(12)));
}

//F(n):斐波那契数列,第L级=Fib(L+2),即 2,3,5,8,13...
//(1级从"大于1的第一项"起算,0级=未购买=1)
function h7_fun1_value(L){
    if (L.lt(1)) return new Decimal(1);
    if (L.lt(75)){
        //小等级直接迭代(整数精确,不丢末位)
        let k = L.toNumber() + 2;
        let a = new Decimal(1);
        let b = new Decimal(1);
        for (let i = 3;i <= k;i++){ let c = a.plus(b); a = b; b = c; }
        return b;
    }
    //比内公式:Fib(n)=φ^n/√5,大等级的相对误差远小于显示精度(尾数只保留2位小数)
    return Decimal.pow(10, L.plus(2).times(0.20898764024997873).minus(0.34948500216800943));
}

//a_n:中心二项系数,第L级=C(2L,L),即 2,6,20,70,252...
function h7_fun2_value(L){
    if (L.lt(1)) return new Decimal(1);
    if (L.lt(60)){
        let k = L.toNumber();
        let r = new Decimal(1);
        for (let i = 1;i <= k;i++) r = r.times(k + i).div(i);
        return r;
    }
    let ln = h7_ln_fact(L.times(2)).minus(h7_ln_fact(L).times(2));
    return Decimal.pow(10, ln.div(Math.LN10));
}

//n!:阶乘,第L级=(L+1)!,即 2,6,24,120...
function h7_fun3_value(L){
    if (L.lt(1)) return new Decimal(1);
    if (L.lt(169)){
        let k = L.toNumber() + 1;
        let r = new Decimal(1);
        for (let i = 2;i <= k;i++) r = r.times(i);
        return r;
    }
    return Decimal.pow(10, h7_ln_fact(L.plus(1)).div(Math.LN10));
}

//(2n-1)!!:配对数(双阶乘),第L级=(2L+1)!!,即 3,15,105,945...
function h7_fun4_value(L){
    if (L.lt(1)) return new Decimal(1);
    if (L.lt(120)){
        let k = L.toNumber() + 1;
        let r = new Decimal(1);
        for (let i = 1;i <= k;i++) r = r.times(i * 2 - 1);
        return r;
    }
    //(2L+1)!!=(2L+2)!/(2^(L+1)*(L+1)!)
    let ln = h7_ln_fact(L.plus(1).times(2)).minus(L.plus(1).times(Math.LN2)).minus(h7_ln_fact(L.plus(1)));
    return Decimal.pow(10, ln.div(Math.LN10));
}

//n^n:双指数,第L级=(L+1)^(L+1),即 4,27,256,3125...
function h7_fun5_value(L){
    if (L.lt(1)) return new Decimal(1);
    let k = L.plus(1);
    //小等级直接连乘(k^k 是整数,连乘可避开 Decimal.pow 走对数路径带来的 27.000000000000004 噪声)
    if (k.lt(1000)){
        let kk = k.toNumber();
        let r = new Decimal(1);
        for (let i = 0;i < kk;i++) r = r.times(kk);
        return r;
    }
    return k.pow(k);
}

//------------------------------ 费用 ------------------------------
//函数升级费用(消耗算子):以"当前等级"代入公式,故0级买1级的费用就是公式里的0级费用
//底夸克(费米子,铈解锁):理论函数费用除以 max(1,log7(底夸克+7)),其余口径不变
function h7_fun1_cost(){ return Decimal.pow(1.2, h7_fun1).div(h1_2_up6_buff); }//1.2^等级
function h7_fun2_cost(){ return Decimal.pow(1.5, h7_fun2).times(10).div(h1_2_up6_buff); }//10*1.5^等级
function h7_fun3_cost(){ return Decimal.pow(2.3, h7_fun3).times(100).div(h1_2_up6_buff); }//100*2.3^等级
function h7_fun4_cost(){ return Decimal.pow(3.6, h7_fun4).times(1e3).div(h1_2_up6_buff); }//1e3*3.6^等级
function h7_fun5_cost(){ return Decimal.pow(h7_fun5.times(0.3).plus(4), h7_fun5).times(1e5).div(h1_2_up6_buff); }//1e5*(4+0.3*等级)^等级

//增幅器升级费用(消耗增幅器点数)
function h7_amp1_cost(){ return Decimal.pow(9, h7_amp1); }//9^等级
function h7_amp2_cost(){ return Decimal.pow(11, h7_amp2).times(10); }//10*11^等级
function h7_amp3_cost(){ return Decimal.pow(14, h7_amp3).times(100); }//100*14^等级
function h7_amp4_cost(){ return Decimal.pow(18, h7_amp4).times(1e3); }//1e3*18^等级

//------------------------------ 计算 ------------------------------
//增幅器点数每秒产量=当前剩余算子数量×锡的夸克微弱加成×星系群加成
//锡(理论元素):公式*lg(lg(夸克+10)+9),夸克=0时为1倍(无影响)
//碘(理论元素):星系群对增幅器点数加成,公式*(星系群数量+1)
function h7_amp_gain(){
    let gain = h7_suanzi;
    if (h2_up50.gte(1)){
        gain = gain.times(Quark.plus(10).log10().plus(9).log10());
    }
    if (h2_up53.gte(1)){
        gain = gain.times(h4_up6q.plus(1));
    }
    return gain;
}

function h7_hans(){
    //五个函数的数值与总加成(五者相乘后直接乘在夸克秒产上)
    h7_fun1_v = h7_fun1_value(h7_fun1);
    h7_fun2_v = h7_fun2_value(h7_fun2);
    h7_fun3_v = h7_fun3_value(h7_fun3);
    h7_fun4_v = h7_fun4_value(h7_fun4);
    h7_fun5_v = h7_fun5_value(h7_fun5);
    h7_fun_buff = h7_fun1_v.times(h7_fun2_v).times(h7_fun3_v).times(h7_fun4_v).times(h7_fun5_v);

    //增幅器倍率
    //重置次数增幅器=1+等级^2:0级=1(未购买无影响),1级=2,2级=5,3级=10
    h7_amp1_buff = h7_amp1.pow(2).plus(1);
    h7_amp2_buff = h7_amp2.times(0.1).plus(1);
    h7_amp3_buff = h7_amp3.plus(1);
    h7_amp4_buff = h7_amp4.times(0.2).plus(1);

    //增幅器点数每秒产量=当前剩余算子数量(花掉算子会降低增速,这是算子作为货币的代价)
    //锡(理论元素)会让夸克微弱加成这个产量
    h7_amp_js = h7_amp_gain();
}

//前五层的"重置次数"在参与加成计算时,统一乘上重置次数增幅器
//(等级0/1时倍率为1,与原口径完全一致;原始次数本身不变,统计页仍显示真实次数)
function h7_amp1_count(re){
    return re.times(h7_amp1_buff);
}

//------------------------------ 界面刷新 ------------------------------
//理论页(函数/增幅器两个子选项卡)的刷新
function updateUI_h7(){
    h7_hans();

    document.getElementById("h7_suanzi_txt").innerHTML = "算子:" + formatDecimal(h7_suanzi) + "(增幅器点数+" + formatDecimal(h7_amp_js) + "/s)";
    document.getElementById("h7_amp_txt").innerHTML = "增幅器点数:" + formatDecimal(h7_amp);
    document.getElementById("h7_fun_txt").innerHTML = "函数总加成:对夸克*" + formatDecimal(h7_fun_buff);

    //函数:名称+等级+当前数值+序列名+费用,算子足够时高亮为可升级
    let funs = [
        ["h7_fun1_b", "F(n) ", "斐波那契数列", h7_fun1, h7_fun1_v, h7_fun1_cost()],
        ["h7_fun2_b", "a_n ", "中心二项系数", h7_fun2, h7_fun2_v, h7_fun2_cost()],
        ["h7_fun3_b", "n! ", "阶乘", h7_fun3, h7_fun3_v, h7_fun3_cost()],
        ["h7_fun4_b", "(2n-1)!! ", "配对数", h7_fun4, h7_fun4_v, h7_fun4_cost()],
        ["h7_fun5_b", "n^n ", "双指数", h7_fun5, h7_fun5_v, h7_fun5_cost()]
    ];
    for (let i = 0;i < funs.length;i++){
        let it = funs[i];
        let b = document.getElementById(it[0]);
        let pd = h7_suanzi.gte(it[5]);
        b.style.opacity = pd ? '1' : '0.5';
        b.classList.toggle('upgradable', pd);
        b.innerHTML = it[1] + formatDecimal(it[3]) + "级 对夸克*" + formatDecimal(it[4]) + "<br>" + it[2] + "<br>费用:" + formatDecimal(it[5]) + "算子";
    }

    //增幅器:名称+等级+当前倍率+费用,增幅器点数足够时高亮
    let amps = [
        ["h7_amp1_b", "重置次数增幅器", "全部层级重置次数*" + formatDecimal(h7_amp1_buff), h7_amp1, h7_amp1_cost()],
        ["h7_amp2_b", "夸克增幅器", "全部夸克升级等级*" + formatDecimal(h7_amp2_buff), h7_amp2, h7_amp2_cost()],
        ["h7_amp3_b", "元素增幅器", "全部元素生成器等级*" + formatDecimal(h7_amp3_buff), h7_amp3, h7_amp3_cost()],
        ["h7_amp4_b", "星辰增幅器", "全部星辰升级等级*" + formatDecimal(h7_amp4_buff), h7_amp4, h7_amp4_cost()]
    ];
    for (let i = 0;i < amps.length;i++){
        let it = amps[i];
        let b = document.getElementById(it[0]);
        let pd = h7_amp.gte(it[4]);
        b.style.opacity = pd ? '1' : '0.5';
        b.classList.toggle('upgradable', pd);
        b.innerHTML = it[1] + formatDecimal(it[3]) + "级<br>" + it[2] + "<br>费用:" + formatDecimal(it[4]) + "增幅器点数";
    }
}

//------------------------------ 购买 ------------------------------
//函数:消耗算子,等级+1
//函数总加成直接乘在夸克秒产上,故买完置 h1_js_re
function h7_fun1_button(){
    let cost = h7_fun1_cost();
    if (h7_suanzi.gte(cost)){
        h7_suanzi = h7_suanzi.minus(cost);
        h7_fun1 = h7_fun1.plus(1);
        h7_hans();
        h1_js_re = 1;
        updateUI_h7();
    }
}
function h7_fun2_button(){
    let cost = h7_fun2_cost();
    if (h7_suanzi.gte(cost)){
        h7_suanzi = h7_suanzi.minus(cost);
        h7_fun2 = h7_fun2.plus(1);
        h7_hans();
        h1_js_re = 1;
        updateUI_h7();
    }
}
function h7_fun3_button(){
    let cost = h7_fun3_cost();
    if (h7_suanzi.gte(cost)){
        h7_suanzi = h7_suanzi.minus(cost);
        h7_fun3 = h7_fun3.plus(1);
        h7_hans();
        h1_js_re = 1;
        updateUI_h7();
    }
}
function h7_fun4_button(){
    let cost = h7_fun4_cost();
    if (h7_suanzi.gte(cost)){
        h7_suanzi = h7_suanzi.minus(cost);
        h7_fun4 = h7_fun4.plus(1);
        h7_hans();
        h1_js_re = 1;
        updateUI_h7();
    }
}
function h7_fun5_button(){
    let cost = h7_fun5_cost();
    if (h7_suanzi.gte(cost)){
        h7_suanzi = h7_suanzi.minus(cost);
        h7_fun5 = h7_fun5.plus(1);
        h7_hans();
        h1_js_re = 1;
        updateUI_h7();
    }
}

//增幅器:消耗增幅器点数,等级+1
//四类增幅器分别影响不同层级,买完把相关层级的 js_re 全部置1,下一帧重算
function h7_amp1_button(){
    let cost = h7_amp1_cost();
    if (h7_amp.gte(cost)){
        h7_amp = h7_amp.minus(cost);
        h7_amp1 = h7_amp1.plus(1);
        h7_hans();
        h1_js_re = 1;
        h2_js_re = 1;
        h3_js_re = 1;
        h4_js_re = 1;
        h5_js_re = 1;
        updateUI_h7();
    }
}
function h7_amp2_button(){
    let cost = h7_amp2_cost();
    if (h7_amp.gte(cost)){
        h7_amp = h7_amp.minus(cost);
        h7_amp2 = h7_amp2.plus(1);
        h7_hans();
        h1_js_re = 1;
        updateUI_h7();
    }
}
function h7_amp3_button(){
    let cost = h7_amp3_cost();
    if (h7_amp.gte(cost)){
        h7_amp = h7_amp.minus(cost);
        h7_amp3 = h7_amp3.plus(1);
        h7_hans();
        h1_js_re = 1;
        h2_js_re = 1;
        updateUI_h7();
    }
}
function h7_amp4_button(){
    let cost = h7_amp4_cost();
    if (h7_amp.gte(cost)){
        h7_amp = h7_amp.minus(cost);
        h7_amp4 = h7_amp4.plus(1);
        h7_hans();
        h1_js_re = 1;
        h2_js_re = 1;
        h3_js_re = 1;
        updateUI_h7();
    }
}

//绑定按钮事件:元素缺失时只跳过该按钮,不影响整个脚本
function h7_bind(id, fn){
    let b = document.getElementById(id);
    b && b.addEventListener('click', fn);
}

h7_bind('h7_fun1_b', h7_fun1_button);
h7_bind('h7_fun2_b', h7_fun2_button);
h7_bind('h7_fun3_b', h7_fun3_button);
h7_bind('h7_fun4_b', h7_fun4_button);
h7_bind('h7_fun5_b', h7_fun5_button);

h7_bind('h7_amp1_b', h7_amp1_button);
h7_bind('h7_amp2_b', h7_amp2_button);
h7_bind('h7_amp3_b', h7_amp3_button);
h7_bind('h7_amp4_b', h7_amp4_button);

//读档后立即按存档里的等级重算一次(script.js 的 loadGame 在本文件之前执行,
//那时 h7_hans 还不存在,只能在这里补算;否则首帧的夸克产量会漏掉函数总加成)
h7_hans();
