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

    sk_ing_hans();
    UIvisible_SK();
}

//蚀刻状态同步:三种蚀刻互相独立,可同时进行
function sk_ing_hans(){
    sk_ing = (sk_1_ing === 1 || sk_2_ing === 1 || sk_3_ing === 1) ? 1 : 0;
}

//可见性:钇解锁蚀刻·夸克II与蚀刻·元素
function UIvisible_SK(){
    let b2 = document.getElementById('SK_2');
    let b3 = document.getElementById('SK_3');
    if (!b2 || !b3) return;
    h2_up39.gte(1) ? b2.style.display = 'block' : b2.style.display = 'none';
    h2_up39.gte(1) ? b3.style.display = 'block' : b3.style.display = 'none';
}

//UI刷新
function updateUI_SK(){
    let sk_1_txt = "蚀刻·夸克<br><br>立即进行一次黑洞蒸发重置<br>夸克产量^0.3<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_1_MAX) + "<br>对夸克产量加成(蚀刻时不生效):*" + formatDecimal(sk_1_buff1.times(sk_1_buff2)) + "<br><br>";
    document.getElementById("SK_1").innerHTML = sk_1_txt + ((sk_1_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_2_txt = "蚀刻·夸克II<br><br>立即进行一次奇点坍塌重置<br>log<sub>2</sub>夸克产量<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_2_MAX) + "<br>对夸克产量加成(蚀刻中不生效):*" + formatDecimal(sk_2_buff1) + "<br><br>";
    document.getElementById("SK_2").innerHTML = sk_2_txt + ((sk_2_ing === 0) ? "开始蚀刻" : "结束蚀刻");

    let sk_3_txt = "蚀刻·元素<br><br>立即进行一次奇点坍塌重置<br>元素层级生成器等级固定为0<br>原子产量^0.6<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_3_MAX) + "<br>对电子产量加成(蚀刻中不生效):" + formatDecimal(sk_3_buff1) + "<br><br>";
    document.getElementById("SK_3").innerHTML = sk_3_txt + ((sk_3_ing === 0) ? "开始蚀刻" : "结束蚀刻");
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
};

//绑定事件
document.getElementById('SK_1').addEventListener('click', SK_1_hans);
document.getElementById('SK_2').addEventListener('click', SK_2_hans);
document.getElementById('SK_3').addEventListener('click', SK_3_hans);
