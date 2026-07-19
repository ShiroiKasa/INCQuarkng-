//UI刷新
function updateUI_cut(){
    let b2_cut = document.getElementById('h2_cut');
    b2_cut.style.display = h1_re > 0 ? 'block' : 'none';
    let b3_cut = document.getElementById('h3_cut');
    b3_cut.style.display = h2_re > 0 ? 'block' : 'none';
    let b4_cut = document.getElementById('h4_cut');
    b4_cut.style.display = h3_re > 0 ? 'block' : 'none';

    let bSK_cut = document.getElementById('SK_cut');
    bSK_cut.style.display = h2_up24 > 0 ? 'block' : 'none';
}

//界面切换
//切换函数
function xs_hans(){
    h2_cx = "";
    document.getElementById('cx_xs').style.display = 'none';
    document.getElementById('h1').style.display = 'none';
    document.getElementById('h2').style.display = 'none';
    document.getElementById('h3').style.display = 'none';
    document.getElementById('h4').style.display = 'none';
    document.getElementById('SK').style.display = 'none';
    document.getElementById('cp').style.display = 'none';
    document.getElementById('set').style.display = 'none';
    document.getElementById('stat').style.display = 'none';
}

function h1_cut_hans(){
    xs_hans()
    UI_re = "h1"
    document.getElementById('h1').style.display = 'block';
}

function h2_cut_hans(){
    xs_hans()
    UI_re = "h2"
    document.getElementById('h2').style.display = 'block';
}

function h3_cut_hans(){
    xs_hans()
    UI_re = "h3"
    document.getElementById('h3').style.display = 'block';
}

function h4_cut_hans(){
    xs_hans()
    UI_re = "h4"
    document.getElementById('h4').style.display = 'block';
}

function SK_cut_hans(){
    xs_hans()
    UI_re = "SK"
    document.getElementById('SK').style.display = 'block';
}

function cp_cut_hans(){
    xs_hans()
    UI_re = "cp"
    document.getElementById('cp').style.display = 'block';
}

function set_cut_hans(){
    xs_hans()
    UI_re = "set"
    document.getElementById('set').style.display = 'block';
}

function stat_cut_hans(){
    xs_hans()
    UI_re = "stat"
    document.getElementById('stat').style.display = 'block';
}

//绑定按钮事件
document.getElementById('h1_cut').addEventListener('click', h1_cut_hans);
document.getElementById('h2_cut').addEventListener('click', h2_cut_hans);
document.getElementById('h3_cut').addEventListener('click', h3_cut_hans);
document.getElementById('h4_cut').addEventListener('click', h4_cut_hans);
document.getElementById('SK_cut').addEventListener('click', SK_cut_hans);
document.getElementById('cp_cut').addEventListener('click', cp_cut_hans);
document.getElementById('set_cut').addEventListener('click', set_cut_hans);
document.getElementById('stat_cut').addEventListener('click', stat_cut_hans);