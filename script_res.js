//核心资源条
//资源项配置:id=变量名后缀(与 global_var.js 对应),name=显示名,color=层级主题色
const res_defs = [
    { id: "Quark",            name: "夸克",     color: "#ff6600" },
    { id: "h2_ziyuan",        name: "原子",     color: "#f78ae5" },
    { id: "h3_ziyuan",        name: "引力子",   color: "#65a6c9" },
    { id: "h4_ziyuan",        name: "暗物质",   color: "#2db3fb" },
    { id: "h5_ziyuan",        name: "时间点",   color: "#edc1fb" },
    { id: "h5_time_confetti", name: "时间碎片", color: "#edc1fb" },
    { id: "h6_ziyuan",        name: "奇点",     color: "#ecbe02" },
    { id: "h6_brane",         name: "膜",       color: "#ecbe02" },
    { id: "cp_ds",            name: "藏品点数", color: "#ffa807" },
];

//缓存的DOM引用(启动时创建一次,之后每帧只改 textContent 与显隐)
let res_dom = {};
let res_bar = null;

//数值区预留宽度(px,约可容纳10位紧凑数值,如 1.23e45678)
const res_value_width = 88;

//紧凑数值格式化(仅用于核心资源条,不改动 formatDecimal)
function formatDecimalCompact(value){
    let v = (value instanceof Decimal) ? value : new Decimal(value);

    //无效值保护,避免出现 (e^Infinity)NaN 这类字符串
    if (v.isNan()) return "NaN";
    if (!v.isFinite()) return "INF";

    //零与负数
    if (v.eq(0)) return "0";
    if (v.lt(0)) return "-" + formatDecimalCompact(v.times(-1));

    //小于1000:普通小数,去掉末尾多余的0
    if (v.lt(1000)){
        if (v.lt(0.01)) return res_trim(v.toExponential(2));//极小值用科学计数法
        return res_trim(v.toFixed(2));//523.00 -> 523
    }

    //不小于1000:统一科学计数法,1.00e100 -> 1e100
    return res_trim(v.toExponential(2)).replace('+','');
}

//去掉小数末尾多余的0(科学计数法只处理尾数部分,避免误删指数末尾的0)
function res_trim(str){
    let parts = str.split('e');
    let mantissa = parts[0];
    (mantissa.indexOf('.') !== -1) && (mantissa = mantissa.replace(/0+$/,'').replace(/\.$/,''));
    return parts.length > 1 ? mantissa + "e" + parts[1] : mantissa;
}

//读取资源当前数量文本
function res_value_text(id){
    switch (id){
        //夸克在未解锁h5时会被钳制在1.01e308,与h1界面保持一致显示INF
        case "Quark": return (Quark.gte(1e308) && h5_re.eq(0)) ? "INF" : formatDecimalCompact(Quark);
        case "h2_ziyuan": return formatDecimalCompact(h2_ziyuan);
        case "h3_ziyuan": return formatDecimalCompact(h3_ziyuan);
        case "h4_ziyuan": return formatDecimalCompact(h4_ziyuan);
        case "h5_ziyuan": return formatDecimalCompact(h5_ziyuan);
        case "h5_time_confetti": return formatDecimalCompact(h5_time_confetti);
        case "h6_ziyuan": return formatDecimalCompact(h6_ziyuan);
        case "h6_brane": return formatDecimalCompact(h6_brane);
        case "cp_ds": return formatDecimalCompact(cp_ds);
    }
    return "0";
}

//资源解锁判断(与各层级解锁条件保持一致)
function res_unlock(id){
    switch (id){
        case "Quark": return 1;//夸克始终解锁
        case "h2_ziyuan": return h1_re.gte(1) ? 1 : 0;
        case "h3_ziyuan": return h2_re.gte(1) ? 1 : 0;
        case "h4_ziyuan": return h3_re.gte(1) ? 1 : 0;
        case "h5_ziyuan": return h4_re.gte(1) ? 1 : 0;
        case "h5_time_confetti": return h4_re.gte(1) ? 1 : 0;
        case "h6_ziyuan": return h5_re.gte(1) ? 1 : 0;
        case "h6_brane": return h5_re.gte(1) ? 1 : 0;
        case "cp_ds": return 1;//藏品点数始终解锁
    }
    return 0;
}

//读取显示开关(对应 global_var.js 中的 res_show_* 变量)
function res_show_read(id){
    switch (id){
        case "Quark": return res_show_Quark;
        case "h2_ziyuan": return res_show_h2_ziyuan;
        case "h3_ziyuan": return res_show_h3_ziyuan;
        case "h4_ziyuan": return res_show_h4_ziyuan;
        case "h5_ziyuan": return res_show_h5_ziyuan;
        case "h5_time_confetti": return res_show_h5_time_confetti;
        case "h6_ziyuan": return res_show_h6_ziyuan;
        case "h6_brane": return res_show_h6_brane;
        case "cp_ds": return res_show_cp_ds;
    }
    return 0;
}

//写入显示开关
function res_show_write(id, val){
    switch (id){
        case "Quark": res_show_Quark = val; break;
        case "h2_ziyuan": res_show_h2_ziyuan = val; break;
        case "h3_ziyuan": res_show_h3_ziyuan = val; break;
        case "h4_ziyuan": res_show_h4_ziyuan = val; break;
        case "h5_ziyuan": res_show_h5_ziyuan = val; break;
        case "h5_time_confetti": res_show_h5_time_confetti = val; break;
        case "h6_ziyuan": res_show_h6_ziyuan = val; break;
        case "h6_brane": res_show_h6_brane = val; break;
        case "cp_ds": res_show_cp_ds = val; break;
    }
}

//初始化:一次性创建资源条与设置开关的DOM结构并缓存引用
function initResBar(){
    let bar = document.getElementById('res_bar');
    let set_group = document.getElementById('res_set_group');
    if (!bar || !set_group) return;
    res_bar = bar;

    let bar_inner = document.createElement('div');
    bar_inner.className = 'res-bar-inner';
    bar.appendChild(bar_inner);

    for (let i = 0; i < res_defs.length; i++){
        let def = res_defs[i];

        //资源项:名称+数值
        let item = document.createElement('div');
        item.className = 'res-item';
        item.id = 'res_item_' + def.id;

        let name = document.createElement('span');
        name.className = 'res-name';
        name.textContent = def.name + ":";
        name.style.color = def.color;//资源名使用层级主题色

        let value = document.createElement('span');
        value.className = 'res-value';
        value.id = 'res_value_' + def.id;
        value.textContent = "0";//数值颜色继承 body,自动适应深浅背景

        item.appendChild(name);
        item.appendChild(value);
        bar_inner.appendChild(item);

        //名称宽度固定+数值区定宽=容器宽度不变,数值变化不会挤动相邻资源
        (name.offsetWidth > 0) && (item.style.width = (name.offsetWidth + res_value_width) + 'px');

        //设置页开关
        let row = document.createElement('div');
        row.className = 'res-set-row';

        let box = document.createElement('input');
        box.type = 'checkbox';
        box.className = 'res-set-box';
        box.id = 'res_set_' + def.id;
        box.checked = res_show_read(def.id) === 1;
        box.style.accentColor = def.color;

        let label = document.createElement('span');
        label.className = 'res-set-label';
        label.textContent = def.name;//文字颜色继承 body,避免浅色主题色在浅色背景上看不清
        row.style.borderLeftColor = def.color;//层级主题色改用左侧色条标识

        box.addEventListener('change', function(){
            res_show_write(def.id, box.checked ? 1 : 0);
            saveGame();//开关立即写入存档,避免刷新丢失
            updateUI_res();//开关变化后资源条立即更新
        });

        row.appendChild(box);
        row.appendChild(label);
        set_group.appendChild(row);

        //缓存引用
        res_dom[def.id] = { item: item, value: value, set_row: row, set_box: box };
    }

    updateUI_res();
}

//同步设置开关的勾选状态(读档/导入存档后调用)
function updateUI_res_set(){
    for (let i = 0; i < res_defs.length; i++){
        let dom = res_dom[res_defs[i].id];
        if (!dom) continue;
        dom.set_box.checked = res_show_read(res_defs[i].id) === 1;
    }
    updateUI_res();
}

//刷新资源条(每帧只更新 textContent 与显隐,不重建DOM)
function updateUI_res(){
    if (!res_bar) return;

    let any_show = 0;
    for (let i = 0; i < res_defs.length; i++){
        let def = res_defs[i];
        let dom = res_dom[def.id];
        if (!dom) continue;

        let unlocked = res_unlock(def.id);
        //未解锁的资源:资源条与设置开关都不显示
        dom.set_row.style.display = (unlocked === 1) ? 'flex' : 'none';

        let show = (unlocked === 1) && (res_show_read(def.id) === 1);
        dom.item.style.display = show ? 'block' : 'none';//block:名称与数值保持同一行盒基线
        if (show){
            any_show = 1;
            dom.value.textContent = res_value_text(def.id);
        }
    }

    //没有任何资源可显示时隐藏整条,避免留下空白
    res_bar.style.display = (any_show === 1) ? 'flex' : 'none';
}
