//DLC中枢(主界面)
//DLC清单:新增一个DLC只需在这里加一行,并在 dlc_enter 里补一个入口
//lock=1 表示尚未实装:中枢里显示为"???"且不可点击
const dlc_defs = [
    { id: "dlc_1", icon: "仙", title: "2026年春节", name: "修仙除邪祟", lock: 0 },
    { id: "dlc_2", icon: "?", title: "???", name: "???", lock: 1 },
];
//中枢卡片DOM缓存
let dlc_dom = {};

//刷新中枢:未开始的DLC显示"点击进入",已开始的显示当前境界
function updateUI_DLC(){
    let dom = dlc_dom['dlc_1'];
    if (!dom) return;
    let started = dlc1_xiuwei.gt(0) || dlc1_jd_Cob.gt(1) || dlc1_jd_Coi.gt(1) || dlc1_zy_MAX.gt(1) || dlc1_xl_MAX.gt(100);
    dom.note.textContent = started ? ("当前境界:" + dlc1_jingjie_name()) : "点击进入";
}

//进入指定DLC的子界面
function dlc_enter(id){
    switch (id){
        case "dlc_1": DLC_1_cut_hans(); break;
    }
}

//初始化:按 dlc_defs 生成卡片(与 script_res.js 的 initResBar 同款做法)
function initDLC(){
    let list = document.getElementById('dlc_list');
    if (!list) return;

    for (let i = 0; i < dlc_defs.length; i++){
        let def = dlc_defs[i];

        let card = document.createElement('button');
        card.className = (def.lock === 1) ? 'dlc-card dlc-card-lock' : 'dlc-card';
        card.id = 'dlc_card_' + def.id;

        let icon = document.createElement('span');
        icon.className = 'dlc-card-icon';
        icon.textContent = def.icon;

        let info = document.createElement('span');
        info.className = 'dlc-card-info';

        let title = document.createElement('span');
        title.className = 'dlc-card-title';
        title.textContent = def.title;

        let name = document.createElement('span');
        name.className = 'dlc-card-name';
        name.textContent = def.name;

        let note = document.createElement('span');
        note.className = 'dlc-card-note';
        note.textContent = (def.lock === 1) ? "???" : "点击进入";

        info.appendChild(title);
        info.appendChild(name);
        info.appendChild(note);
        card.appendChild(icon);
        card.appendChild(info);
        list.appendChild(card);

        //锁定项不可点击,也不绑定入口
        if (def.lock === 1){
            card.disabled = true;
        }else{
            card.addEventListener('click', function(){ dlc_enter(def.id); });
        }

        dlc_dom[def.id] = { card: card, note: note };
    }

    updateUI_DLC();
}

initDLC();
