function updateUI_h4(){
    document.getElementById("h4_ziyuan_txt").innerHTML = "暗物质:" + formatDecimal(h4_ziyuan) + "(对夸克加成:" + formatDecimal(new Decimal(((h4_ziyuan.plus(1)).log(8))).plus(1)) + ")";
}

function h4_hans(){
    
}