function updateUI_h3(){
    document.getElementById("h3_ziyuan_txt").innerHTML = "引力子:" + formatDecimal(h3_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h3_ziyuan.plus(1)).log(9))).plus(1)) + ")";
}

function h3_hans(){
    
}