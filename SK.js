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

    sk_ing_hans();
    UIvisible_SK();
}

//蚀刻状态同步:四种蚀刻互相独立,可同时进行
function sk_ing_hans(){
    sk_ing = (sk_1_ing === 1 || sk_2_ing === 1 || sk_3_ing === 1 || sk_4_ing === 1) ? 1 : 0;
}

//可见性:钇解锁蚀刻·夸克II与蚀刻·元素,银解锁蚀刻·时间
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
}

//UI刷新
function updateUI_SK(){
    let sk_1_txt = "蚀刻·夸克<br><br>立即进行一次黑洞蒸发重置<br>夸克产量^0.3<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_1_MAX) + "<br>对夸克产量加成(蚀刻时不生效):*" + formatDecimal(sk_1_buff1.times(sk_1_buff2)) + "<br><br>";
    document.getElementById("SK_1").innerHTML = sk_1_txt + ((sk_1_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_2_txt = "蚀刻·夸克II<br><br>立即进行一次奇点坍塌重置<br>log<sub>2</sub>夸克产量<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_2_MAX) + "<br>对夸克产量加成(蚀刻中不生效):*" + formatDecimal(sk_2_buff1) + "<br><br>";
    document.getElementById("SK_2").innerHTML = sk_2_txt + ((sk_2_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_3_txt = "蚀刻·元素<br><br>立即进行一次奇点坍塌重置<br>元素层级生成器等级固定为0<br>原子产量^0.6<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_3_MAX) + "<br>对电子产量加成(蚀刻中不生效):*" + formatDecimal(sk_3_buff1) + "<br><br>";
    document.getElementById("SK_3").innerHTML = sk_3_txt + ((sk_3_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_4_txt = "蚀刻·时间<br><br>立即进行一次奇点坍塌重置<br>蚀刻中游戏倍率降低为1e-10<br>(或许有什么技巧……)<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_4_MAX) + "<br>对游戏倍率加成(蚀刻中不生效):*" + formatDecimal(sk_4_buff) + "<br><br>";
    document.getElementById("SK_4").innerHTML = sk_4_txt + ((sk_4_ing === 0) ? "开始蚀刻" : "结束蚀刻");
};

//计算函数
//各蚀刻的加成只在自己进行中时被压制,不影响其它蚀刻
function SK_hans(){
    //蚀刻·夸克
    if (sk_1_ing === 1){
        sk_1_buff1 = new Decimal(1);
        Quark.gte(sk_1_MAX) && (sk_1_MAX = Quark);
    }else{
        if (sk_1_MAX.gte(1)){
            sk_1_buff1 = Decimal.pow(sk_1_MAX,0.666);
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

    //蚀刻·元素:加成(蚀刻中不生效)=(蚀刻中的最大夸克数量)^0.1
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
        sk_3_buff1 = (sk_3_MAX.gte(1)) ? Decimal.pow(sk_3_MAX,0.1) : new Decimal(1);
    };

    //蚀刻·时间:蚀刻中只记录最大夸克数量,奖励在结束时结算
    //游戏倍率在 script_h5.js 的 h5_hans 中按固定顺序处理
    if (sk_4_ing === 1){
        Quark.gte(sk_4_MAX) && (sk_4_MAX = Quark);
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
    h1_js_re = 1;
    h2_js_re = 1;
    h5_js_re = 1;
}

//按钮函数
function SK_1_hans(){
    var btn = document.getElementById('SK_1');
    if (sk_1_ing === 0){
        h3_re_hans();
        sk_1_ing = 1;
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

//绑定事件
document.getElementById('SK_1').addEventListener('click', SK_1_hans);
document.getElementById('SK_2').addEventListener('click', SK_2_hans);
document.getElementById('SK_3').addEventListener('click', SK_3_hans);
document.getElementById('SK_4').addEventListener('click', SK_4_hans);
