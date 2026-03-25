//UI刷新
function updateUI_h2(){
    document.getElementById("h2_ziyuan_txt").innerHTML = "原子:" + formatDecimal(h2_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h2_ziyuan.plus(1)).log(10))).plus(1)) + ")";

    let b2_1 = document.getElementById('h2_up1_b');
    b2_1.style.opacity = (h2_up1.eq(1)) ? '1' : (h2_ziyuan.gte(10) ? '0.5' : '0.2');

    let b2_2 = document.getElementById('h2_up2_b');
    b2_2.style.opacity = (h2_up2.eq(1)) ? '1' : (h2_ziyuan.gte(50) ? '0.5' : '0.2');
}

//购买函数
function h2_up1_button(){
    document.getElementById('cx_xs').style.display = 'block';
    document.getElementById("cx_bt").innerHTML = "氢(点击两次购买)";
    document.getElementById("cx_nr").innerHTML = "夸克禁闭次数加成夸克获取\n费用:10原子";
    if (h2_cx === "h2_up1" && h2_up1.lt(1)){
        (h2_ziyuan.gte(10)) && (h2_up1 = new Decimal(1), h2_ziyuan = h2_ziyuan.minus(10));
    }else if (h2_up1.lt(1)){
        h2_cx = "h2_up1";
    }else{
        document.getElementById("cx_bt").innerHTML = "氢(已购买)";
    }
}
function h2_up2_button(){
    document.getElementById('cx_xs').style.display = 'block';
    document.getElementById("cx_bt").innerHTML = "氦(点击两次购买)";
    document.getElementById("cx_nr").innerHTML = "最大夸克数量加成夸克获取\n费用:50原子";
    if (h2_cx === "h2_up2" && h2_up2.lt(1)){
        (h2_ziyuan.gte(50)) && (h2_up2 = new Decimal(1), h2_ziyuan = h2_ziyuan.minus(50));
    }else if (h2_up2.lt(1)){
        h2_cx = "h2_up2";
    }else{
        document.getElementById("cx_bt").innerHTML = "氦(已购买)";
    }
}

//绑定按钮事件
document.getElementById('h2_up1_b').addEventListener('click', h2_up1_button);
document.getElementById('h2_up2_b').addEventListener('click', h2_up2_button);