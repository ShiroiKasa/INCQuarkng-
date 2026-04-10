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
    
    let cp_up1_cost = Math.pow(1.05,cp_up1);
    let cp_1_b = document.getElementById('cp_up1_b');
    cp_1_b.style.opacity = (cp_ds >= cp_up1_cost) ? '1' : '0.5';
    document.getElementById("cp_up1_b").innerHTML = "夸克*" + (cp_up1 + 1) + " 点数需达到:" + formatDecimal(cp_up1_cost);

    let cp_up2_cost = Math.pow(1.2,cp_up2);
    let cp_2_b = document.getElementById('cp_up2_b');
    cp_2_b.style.opacity = (cp_ds >= cp_up2_cost) ? '1' : '0.5';
    h1_re.gte(1) ? cp_2_b.style.display = 'block' : cp_2_b.style.display = 'none';
    document.getElementById("cp_up2_b").innerHTML = "原子*" + (cp_up2 + 1) + " 点数需达到:" + formatDecimal(cp_up2_cost);

    let cp_up3_cost = Math.pow(1.3,cp_up3);
    let cp_3_b = document.getElementById('cp_up3_b');
    cp_3_b.style.opacity = (cp_ds >= cp_up3_cost) ? '1' : '0.5';
    h2_re.gte(1) ? cp_3_b.style.display = 'block' : cp_3_b.style.display = 'none';
    document.getElementById("cp_up3_b").innerHTML = "引力子*" + (cp_up3 + 1) + " 点数需达到:" + formatDecimal(cp_up3_cost);
}

function cp_up1_button(){
    let cost = Math.pow(1.05,cp_up1);
    if (cp_ds >= cost){
        cp_up1 += 1;
        updateUI_cp();
    }
}
function cp_up2_button(){
    let cost = Math.pow(1.2,cp_up2);
    if (cp_ds >= cost){
        cp_up2 += 1;
        updateUI_cp();
    }
}
function cp_up3_button(){
    let cost = Math.pow(1.3,cp_up3);
    if (cp_ds >= cost){
        cp_up3 += 1;
        updateUI_cp();
    }
}

document.getElementById('cp_up1_b').addEventListener('click', cp_up1_button);
document.getElementById('cp_up2_b').addEventListener('click', cp_up2_button);
document.getElementById('cp_up3_b').addEventListener('click', cp_up3_button);