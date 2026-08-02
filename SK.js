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
}

//UI刷新
function updateUI_SK(){
    if (sk_1_ing === 0){
        document.getElementById("SK_1").innerHTML = "蚀刻·夸克<br><br>立即进行一次黑洞蒸发重置<br>夸克产量^0.3<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_1_MAX) + "<br>对夸克产量加成(蚀刻时不生效):*" + formatDecimal(sk_1_buff1.times(sk_1_buff2)) + "<br><br>开始蚀刻";
        
    }else{
        document.getElementById("SK_1").innerHTML = "蚀刻·夸克<br><br>立即进行一次黑洞蒸发重置<br>夸克产量^0.3<br>蚀刻中的最大夸克数量:" + formatDecimal(sk_1_MAX) + "<br>对夸克产量加成(蚀刻时不生效):*" + formatDecimal(sk_1_buff1.times(sk_1_buff2)) + "<br><br>结束蚀刻";
    };
};

//计算函数
function SK_hans(){
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
}

//按钮函数
function SK_1_hans(){
    var btn = document.getElementById('SK_1');
    if (sk_1_ing === 0){
        h3_re_hans();
        sk_ing = 1;
        sk_1_ing = 1;
        btn.classList.add('etching');
    }else{
        h3_re_hans();
        sk_ing = 0;
        sk_1_ing = 0;
        btn.classList.remove('etching');
    };
};

//绑定事件
document.getElementById('SK_1').addEventListener('click', SK_1_hans);