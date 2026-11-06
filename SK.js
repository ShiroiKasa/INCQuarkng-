//蚀刻脚本
//初始化
function initSK() {
    var btn = document.getElementById('SK_1');
    if (!btn) return;
    if (sk_1_ing === 1) {
        btn.classList.add('etching');
    } else {
        btn.classList.remove('etching');
    }

    var btn2 = document.getElementById('SK_2');
    if (btn2) {
        if (sk_2_ing === 1) {
            btn2.classList.add('etching');
        } else {
            btn2.classList.remove('etching');
        }
    }

    var btn3 = document.getElementById('SK_3');
    if (btn3) {
        if (sk_3_ing === 1) {
            btn3.classList.add('etching');
        } else {
            btn3.classList.remove('etching');
        }
    }

    var btn4 = document.getElementById('SK_4');
    if (btn4) {
        if (sk_4_ing === 1) {
            btn4.classList.add('etching');
        } else {
            btn4.classList.remove('etching');
        }
    }

    var btn5 = document.getElementById('SK_5');
    if (btn5) {
        if (sk_5_ing === 1) {
            btn5.classList.add('etching');
        } else {
            btn5.classList.remove('etching');
        }
    }

    sk_ing_hans();
    sk_start_hans();
    UIvisible_SK();
}

//蚀刻状态同步:五种蚀刻互相独立,可同时进行
function sk_ing_hans(){
    sk_ing = (sk_1_ing === 1 || sk_2_ing === 1 || sk_3_ing === 1 || sk_4_ing === 1 || sk_5_ing === 1) ? 1 : 0;
}

//蚀刻背景:保证每段进行中的蚀刻都有一个合法的开始时间
//旧存档没有 sk_X_start 字段、或导入的存档开始时间比当前游戏时间还晚,都按当前时间补
function sk_start_hans(){
    let gt = (typeof game_time === 'number' && isFinite(game_time) && game_time > 0) ? game_time : 0;
    sk_1_start = sk_start_fix(sk_1_ing === 1, sk_1_start, gt);
    sk_2_start = sk_start_fix(sk_2_ing === 1, sk_2_start, gt);
    sk_3_start = sk_start_fix(sk_3_ing === 1, sk_3_start, gt);
    sk_4_start = sk_start_fix(sk_4_ing === 1, sk_4_start, gt);
    sk_5_start = sk_start_fix(sk_5_ing === 1, sk_5_start, gt);
}
function sk_start_fix(ing, start, gt){
    let s = (typeof start === 'number' && isFinite(start) && start > 0) ? start : (ing ? gt : 0);
    (s > gt) && (s = gt);
    return s;
}

//可见性:钇解锁蚀刻·夸克II与蚀刻·元素,银解锁蚀刻·时间,氙解锁蚀刻·星辰
function UIvisible_SK(){
    let b2 = document.getElementById('SK_2');
    let b3 = document.getElementById('SK_3');
    if (!b2 || !b3) return;
    h2_up39.gte(1) ? b2.style.display = 'block' : b2.style.display = 'none';
    h2_up39.gte(1) ? b3.style.display = 'block' : b3.style.display = 'none';

    let b4 = document.getElementById('SK_4');
    if (b4){
        h2_up47.gte(1) ? b4.style.display = 'block' : b4.style.display = 'none';
    }

    let b5 = document.getElementById('SK_5');
    if (b5){
        h2_up54.gte(1) ? b5.style.display = 'block' : b5.style.display = 'none';
    }
}

//UI刷新
function updateUI_SK(){
    let sk_1_txt = "蚀刻·夸克<br><br>立即进行一次黑洞蒸发重置<br>夸克产量^0.3<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_1_MAX) + "<br>对夸克产量加成(蚀刻中不生效):*" + formatDecimal(sk_1_buff1.times(sk_1_buff2)) + "<br>加成软上限:1e6000<br><br>";
    document.getElementById("SK_1").innerHTML = sk_1_txt + ((sk_1_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_2_txt = "蚀刻·夸克II<br><br>立即进行一次奇点坍塌重置<br>log<sub>2</sub>夸克产量<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_2_MAX) + "<br>对夸克产量加成(蚀刻中不生效):*" + formatDecimal(sk_2_buff1) + "<br><br>";
    document.getElementById("SK_2").innerHTML = sk_2_txt + ((sk_2_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_3_txt = "蚀刻·元素<br><br>立即进行一次奇点坍塌重置<br>元素层级生成器等级固定为0<br>原子产量^0.6<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_3_MAX) + "<br>对电子产量加成(蚀刻中不生效):*" + formatDecimal(sk_3_buff1) + "<br>加成软上限:1e600<br><br>";
    document.getElementById("SK_3").innerHTML = sk_3_txt + ((sk_3_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_4_txt = "蚀刻·时间<br><br>立即进行一次奇点坍塌重置<br>蚀刻中游戏倍率降低为1e-10<br>(或许有什么技巧……)<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_4_MAX) + "<br>对游戏倍率加成(蚀刻中不生效):*" + formatDecimal(sk_4_buff) + "<br><br>";
    document.getElementById("SK_4").innerHTML = sk_4_txt + ((sk_4_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_5_txt = "蚀刻·星辰<br><br>立即进行一次理论重构重置<br>质量发生器和黑洞催化器等级固定为1<br>质量、黑洞产量除以1e5<br>蚀刻中的最大可获得暗物质数量:" + formatDecimal(sk_5_MAX) + "<br>对黑洞产量加成(蚀刻中不生效):*" + formatDecimal(sk_5_buff1) + "<br><br>";
    document.getElementById("SK_5").innerHTML = sk_5_txt + ((sk_5_ing === 0) ? "开始蚀刻" : "结束蚀刻");
};

//软上限:value 不超过 cap 时原样返回;超过时记为 cap*lg(value/cap),且不低于 cap
//例:cap=1e600 时,1e650 记为 1e600*lg(1e50)=1e600*50
function sk_softcap(value, cap){
    if (value.lte(cap)) return value;
    return Decimal.max(cap, cap.times(value.div(cap).log10()));
}

//计算函数
//各蚀刻的加成只在自己进行中时被压制,不影响其它蚀刻
function SK_hans(){
    //蚀刻·夸克:加成(蚀刻中不生效)=(蚀刻中的最大夸克数量)^0.666(软上限 1e6000)
    if (sk_1_ing === 1){
        sk_1_buff1 = new Decimal(1);
        Quark.gte(sk_1_MAX) && (sk_1_MAX = Quark);
    }else{
        if (sk_1_MAX.gte(1)){
            sk_1_buff1 = sk_softcap(Decimal.pow(sk_1_MAX,0.666), sk_1_buff_cap);
        }else{
            sk_1_buff1 = new Decimal(1);
        };
    };

    //蚀刻·夸克II:加成(蚀刻中不生效)=蚀刻中的最大夸克数量
    if (sk_2_ing === 1){
        sk_2_buff1 = new Decimal(1);
        Quark.gte(sk_2_MAX) && (sk_2_MAX = Quark);
    }else{
        sk_2_buff1 = (sk_2_MAX.gte(1)) ? sk_2_MAX : new Decimal(1);
    };

    //蚀刻·元素:加成(蚀刻中不生效)=(蚀刻中的最大夸克数量)^0.1(软上限 1e600)
    if (sk_3_ing === 1){
        sk_3_buff1 = new Decimal(1);
        Quark.gte(sk_3_MAX) && (sk_3_MAX = Quark);
        //元素层级生成器(电子/质子/中子)等级固定为0
        if (h2_upe.gt(0) || h2_upp.gt(0) || h2_upn.gt(0)){
            h2_upe = new Decimal(0);
            h2_upp = new Decimal(0);
            h2_upn = new Decimal(0);
            h2_js_re = 1;//强制重算电子/质子/中子产量
        }
    }else{
        sk_3_buff1 = (sk_3_MAX.gte(1)) ? sk_softcap(Decimal.pow(sk_3_MAX,0.1), sk_3_buff_cap) : new Decimal(1);
    };

    //蚀刻·时间:蚀刻中只记录最大夸克数量,奖励在结束时结算
    //游戏倍率在 script_h5.js 的 h5_hans 中按固定顺序处理
    if (sk_4_ing === 1){
        Quark.gte(sk_4_MAX) && (sk_4_MAX = Quark);
    };

    //蚀刻·星辰:质量发生器、黑洞催化器等级固定为1
    //加成(蚀刻中不生效)=蚀刻中的最大可获得暗物质数量,记录在 script_h3.js 的 h3_hans
    if (sk_5_ing === 1){
        sk_5_buff1 = new Decimal(1);
        if (!h3_up1.eq(1) || !h3_up2.eq(1)){
            h3_up1 = new Decimal(1);
            h3_up2 = new Decimal(1);
            h3_js_re = 1;
        }
    }else{
        sk_5_buff1 = Decimal.max(1, sk_5_MAX);
    };
}

//蚀刻状态一变就立即重算:受蚀刻状态影响的派生值当场算出来
//否则本帧的界面与实际结算仍会读到"蚀刻前"的旧值(帧残留)
//顺序不能改:SK_hans 先定 sk_*_buff1,h5_hans 里的 h5_quark_max 依赖 h1_hans 算出的 h1_2_up3_buff
function SK_js_hans(){
    SK_hans();//sk_*_buff1(蚀刻中为1)、sk_*_MAX
    h1_2_buff_hans();//四种夸克加成(粲夸克影响 h5_quark_max)
    h1_hans();//夸克产量(蚀刻·夸克^0.3、蚀刻·夸克II取log2)、原子产量(蚀刻·元素^0.6)
    h2_hans();//电子产量(蚀刻·元素时 sk_3_buff1=1)
    h5_hans();//游戏倍率(蚀刻·时间固定为1e-10)与夸克溢出上限
    h3_hans();//星辰层:蚀刻·星辰的黑洞/质量产量与暗物质可获得量
    h1_js_re = 1;
    h2_js_re = 1;
    h3_js_re = 1;
    h5_js_re = 1;
}

//按钮函数
function SK_1_hans(){
    var btn = document.getElementById('SK_1');
    if (sk_1_ing === 0){
        h3_re_hans();
        sk_1_ing = 1;
        sk_1_start = game_time;//蚀刻背景:从这一刻开始生长
        btn.classList.add('etching');
    }else{
        h3_re_hans();
        sk_1_ing = 0;
        btn.classList.remove('etching');
    };
    sk_ing_hans();
    SK_js_hans();//立即按新的蚀刻状态重算
};

function SK_2_hans(){
    var btn = document.getElementById('SK_2');
    if (sk_2_ing === 0){
        h5_re_hans();
        sk_2_ing = 1;
        sk_2_start = game_time;//蚀刻背景:从这一刻开始生长
        btn.classList.add('etching');
    }else{
        h5_re_hans();
        sk_2_ing = 0;
        btn.classList.remove('etching');
    };
    sk_ing_hans();
    SK_js_hans();//立即按新的蚀刻状态重算
};

function SK_3_hans(){
    var btn = document.getElementById('SK_3');
    if (sk_3_ing === 0){
        h5_re_hans();
        sk_3_ing = 1;
        sk_3_start = game_time;//蚀刻背景:从这一刻开始生长
        btn.classList.add('etching');
    }else{
        h5_re_hans();
        sk_3_ing = 0;
        btn.classList.remove('etching');
    };
    sk_ing_hans();
    SK_js_hans();//立即按新的蚀刻状态重算
};

//蚀刻·时间(银解锁):开始时重置,结束时按蚀刻中的最大夸克数量结算奖励倍率
function SK_4_hans(){
    var btn = document.getElementById('SK_4');
    if (sk_4_ing === 0){
        h5_re_hans();
        sk_4_ing = 1;
        sk_4_start = game_time;//蚀刻背景:从这一刻开始生长
        btn.classList.add('etching');
    }else{
        sk_4_ing = 0;
        //奖励=max(1,log10(蚀刻中的最大夸克数量))
        sk_4_buff = (sk_4_MAX.gte(1)) ? Decimal.max(1, sk_4_MAX.log(10)) : new Decimal(1);
        btn.classList.remove('etching');
    };
    sk_ing_hans();
    SK_js_hans();//立即按新的蚀刻状态重算(含游戏倍率,不再等 gl_js_re 轮询)
    updateUI_SK();
};

//蚀刻·星辰(氙解锁):开始时理论重构,结束时按蚀刻中的最大可获得暗物质数量给出黑洞产量加成
function SK_5_hans(){
    var btn = document.getElementById('SK_5');
    if (sk_5_ing === 0){
        h6_re_hans();//立即进行一次理论重构重置
        sk_5_ing = 1;
        sk_5_start = game_time;//蚀刻背景:从这一刻开始生长
        sk_5_MAX = new Decimal(1);
        sk_5_buff1 = new Decimal(1);
        h3_up1 = new Decimal(1);//质量发生器等级固定为1
        h3_up2 = new Decimal(1);//黑洞催化器等级固定为1
        btn.classList.add('etching');
    }else{
        sk_5_ing = 0;
        sk_5_buff1 = Decimal.max(1, sk_5_MAX);
        btn.classList.remove('etching');
    };
    sk_ing_hans();
    SK_js_hans();//立即按新的蚀刻状态重算
    updateUI_SK();
};

//绑定事件
document.getElementById('SK_1').addEventListener('click', SK_1_hans);
document.getElementById('SK_2').addEventListener('click', SK_2_hans);
document.getElementById('SK_3').addEventListener('click', SK_3_hans);
document.getElementById('SK_4').addEventListener('click', SK_4_hans);
document.getElementById('SK_5').addEventListener('click', SK_5_hans);
