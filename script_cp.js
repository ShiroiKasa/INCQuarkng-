function cp_ds_sj(){
    let a = Math.floor(Math.random() * 8128);
    if (a < (Math.log10(cp_ds_cs + 10))){
        cp_ds += 1;
        cp_ds_cs = 0;
    }else{
        cp_ds_cs += 1;
    }
}

function updateUI_cp(){
    document.getElementById("cp_ds_txt").innerHTML = "藏品点数:" + formatDecimal(cp_ds) + " 上次获得点数在" + formatDecimal(cp_ds_cs / 10) + "秒前";
}