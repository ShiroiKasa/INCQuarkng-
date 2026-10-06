//DLC1:修仙除邪祟
//说明:数值与公式全部照搬 Godot 原型(需要移植的内容/Godot_DLC_1.txt),包括其中已知的边界行为
//时间基准:原型是1秒一次的Timer,script.js 的主循环用 dlc1_time_re 累加,每满1秒调用一次 dlc1_hans()
//与主游戏完全独立:不消耗、也不加成夸克等任何主游戏资源

//数值显示:小于1e15按整数原样显示(原型用 str(int),该范围内与原型一致),超出后交给 formatDecimal 兜底
function dlc1_fmt(value){
    let v = (value instanceof Decimal) ? value : new Decimal(value);
    if (v.lt(0)) return formatDecimal(v);
    return v.lt(1e15) ? Decimal.floor(v).toString() : formatDecimal(v);
}

//倍率显示:保留两位后去掉末尾多余的0(原型 str(12.0)="12"、str(10.2)="10.2")
function dlc1_fmt_dec(value){
    let v = (value instanceof Decimal) ? value : new Decimal(value);
    if (v.gte(1e15)) return formatDecimal(v);
    let s = v.toFixed(2);
    (s.indexOf('.') !== -1) && (s = s.replace(/0+$/,'').replace(/\.$/,''));
    return s;
}

//进度条百分比(0~100,直接给 CSS 的 width 用)
function dlc1_bar_rate(cur, max){
    let c = (cur instanceof Decimal) ? cur : new Decimal(cur);
    let m = (max instanceof Decimal) ? max : new Decimal(max);
    if (m.lte(0)) return 0;
    let r = c.div(m).times(100).toNumber();
    r = (r < 0) ? 0 : ((r > 100) ? 100 : r);
    return Math.round(r * 1e6) / 1e6;//去掉浮点尾巴(99.55375000000001%),顺便让CSS值更干净
}

//小整数次幂:break_eternity 的 pow 走对数路径,2^3 会得到 7.999999999999999,
//再接 floor 就会把敌人血量 4e9 显示成 3999999999(参考图是整数),故指数为10以内整数时用连乘精确求解
//(原型的 pow 是 float64 精确整数运算,这里连乘才能与原型一致;超出范围仍退回 Decimal.pow)
function dlc1_pow_int(base, exp){
    let e = (exp instanceof Decimal) ? exp : new Decimal(exp);
    if (e.gte(0) && e.lte(10) && e.eq(e.floor())){
        let n = e.toNumber();
        let r = new Decimal(1);
        for (let i = 0; i < n; i++){
            r = r.times(base);
        }
        return r;
    }
    return Decimal.pow(base, exp);
}

//大写数字(原型 int_to_chinese_upper,只处理到99999,超出按原型的 num %= 100000 取模)
function dlc1_int_to_chinese_upper(value){
    let n = Decimal.floor((value instanceof Decimal) ? value : new Decimal(value));
    //先取模:保证大数不会在 toNumber 时溢出为 Infinity
    let num = n.minus(n.div(100000).floor().times(100000)).toNumber();
    if (num === 0) return "零";
    if (num < 0) return "";

    //数字大写映射
    let digits = ["", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    //单位顺序:万、千、百、拾、个
    let units = ["万", "千", "百", "拾", ""];
    //分解万、千、百、十、个位
    let parts = [
        Math.floor(num / 10000),
        Math.floor((num % 10000) / 1000),
        Math.floor((num % 1000) / 100),
        Math.floor((num % 100) / 10),
        num % 10
    ];

    let result = "";
    let started = false;//是否已遇到第一个非零位
    let need_zero = false;//是否需要插入"零"

    for (let i = 0; i < 5; i++){
        let digit = parts[i];
        if (digit !== 0){
            if (!started){
                started = true;
                //十位为1且是最高非零位时只加"拾"不加数字(10 → 拾)
                if (i === 3 && digit === 1){
                    result += "拾";
                }else{
                    result += digits[digit] + units[i];
                }
            }else{
                if (need_zero){
                    result += "零";
                    need_zero = false;
                }
                result += digits[digit] + units[i];
            }
        }else{
            //当前位为0:已经开始读数且后面还有非零位时才需要补"零"
            if (started){
                let has_following = false;
                for (let j = i + 1; j < 5; j++){
                    if (parts[j] !== 0){
                        has_following = true;
                        break;
                    }
                }
                has_following && (need_zero = true);
            }
        }
    }
    return result;
}

//小境界名:新月/眉月/盈月/满月/曜日
function dlc1_yue_name(){
    let ci = dlc1_jd_Coi;
    if (ci.eq(1)) return "新月";
    if (ci.eq(2)) return "眉月";
    if (ci.eq(3)) return "盈月";
    if (ci.eq(4)) return "满月";
    return "曜日";
}

//大境界名:凡尘/入微/回溯/原初/化神/真仙
function dlc1_tier_name(){
    if (dlc1_jd_Cob.gte(6)) return "真仙";
    return ["", "凡尘", "入微", "回溯", "原初", "化神"][dlc1_jd_Cob.toNumber()] || "凡尘";
}

//境界全名:凡尘·新月 …… 化神·曜日,真仙为"真仙·X重"
function dlc1_jingjie_name(){
    if (dlc1_jd_Cob.lt(6)) return dlc1_tier_name() + "·" + dlc1_yue_name();
    return "真仙·" + dlc1_int_to_chinese_upper(dlc1_jd_Coi) + "重";
}

//仙诀名/武籍名:仙诀·凡尘 …… 仙诀·真仙
function dlc1_xianjue_name(){
    return "仙诀·" + dlc1_tier_name();
}
function dlc1_wuji_name(){
    return "武籍·" + dlc1_tier_name();
}

//仙诀/武籍等级上限:20/40/60/80/100,真仙为999
//原型在渲染里按大境界给 xianjue_max 赋值,这里改为纯函数(可到达的状态下完全等价,且不会因没打开界面而不同步)
function dlc1_xianjue_max_hans(){
    return dlc1_jd_Cob.lt(6) ? dlc1_jd_Cob.times(20) : new Decimal(999);
}

//邪祟名:祟·X劫 / 夕·X劫 / 年(无尽)·X劫
function dlc1_gw_name(){
    let jie = dlc1_int_to_chinese_upper(dlc1_gw_jd_Coi) + "劫";
    if (dlc1_gw_jd_Cob.eq(1)) return "祟·" + jie;
    if (dlc1_gw_jd_Cob.eq(2)) return "夕·" + jie;
    return "年(无尽)·" + jie;
}

//仙诀消耗真元(int(pow(6,jd_Cob)*xianjue/2.0))
function dlc1_xianjue_cost_hans(){
    return dlc1_pow_int(6,dlc1_jd_Cob).times(dlc1_xianjue).div(2).floor();
}

//仙诀伤害(int((xianjue*0.1+2)*fsgj))
function dlc1_xianjue_dmg_hans(){
    return dlc1_xianjue.times(0.1).plus(2).times(dlc1_fsgj).floor();
}

//武籍消耗血量(int(pow(4,jd_Cob)*wuji/2.0 + xl_MAX*0.2))
function dlc1_wuji_cost_hans(){
    return dlc1_pow_int(4,dlc1_jd_Cob).times(dlc1_wuji).div(2).plus(dlc1_xl_MAX.times(0.2)).floor();
}

//武籍伤害(int((wuji*0.05+1)*wlgj + int(xl_MAX*0.1)))
function dlc1_wuji_dmg_hans(){
    return dlc1_wuji.times(0.05).plus(1).times(dlc1_wlgj).plus(dlc1_xl_MAX.times(0.1).floor()).floor();
}

//1秒一次的结算(对应原型 xunhuan())
function dlc1_hans(){
    //敌人血量不为负
    dlc1_gw_xl.lt(0) && (dlc1_gw_xl = new Decimal(0));

    //冷却递减
    dlc1_xianjue_CD.gt(0) && (dlc1_xianjue_CD = dlc1_xianjue_CD.minus(1));
    dlc1_wuji_CD.gt(0) && (dlc1_wuji_CD = dlc1_wuji_CD.minus(1));

    //复活倒计时
    //原型把这段写在渲染函数里(不打开DLC界面就不走),网页版每帧都渲染会变成60倍速,故放到1秒结算里
    dlc1_fuhuojs.gt(0) && (dlc1_fuhuojs = dlc1_fuhuojs.minus(1));

    //击败邪祟持续获得经验:((gw_jd_Cob-1)*10 + gw_jd_Coi)/10
    dlc1_jingyan = dlc1_jingyan.plus(dlc1_gw_jd_Cob.minus(1).times(10).plus(dlc1_gw_jd_Coi).div(10));

    //突破所需修为:10*jd_Cob^5 + jd_Coi^jd_Coi
    dlc1_tupo = dlc1_pow_int(dlc1_jd_Cob,5).times(10).plus(dlc1_pow_int(dlc1_jd_Coi,dlc1_jd_Coi));

    //免伤(按大境界分段)
    dlc1_jd_Cob.eq(1) && (dlc1_ms = dlc1_jd_Coi);
    dlc1_jd_Cob.eq(2) && (dlc1_ms = dlc1_jd_Coi.times(2).plus(5));
    dlc1_jd_Cob.eq(3) && (dlc1_ms = dlc1_jd_Coi.times(3).plus(15));
    dlc1_jd_Cob.eq(4) && (dlc1_ms = dlc1_jd_Coi.times(4).plus(30));
    dlc1_jd_Cob.eq(5) && (dlc1_ms = dlc1_jd_Coi.times(5).plus(50));
    dlc1_jd_Cob.eq(6) && (dlc1_ms = dlc1_jd_Coi.times(8).plus(75));

    //修行:聚气(真元/法术攻击)与淬体(血量/物理攻击)
    if (dlc1_pd === "聚气"){
        dlc1_xiuwei = dlc1_xiuwei.plus(1);
        dlc1_zy_MAX = dlc1_zy_MAX.plus(10);
        dlc1_zy = dlc1_zy.plus(10);
        dlc1_fsgj = dlc1_fsgj.plus(1);
    }
    if (dlc1_pd === "淬体"){
        dlc1_xiuwei = dlc1_xiuwei.plus(1);
        dlc1_xl_MAX = dlc1_xl_MAX.plus(10);
        dlc1_xl = dlc1_xl.plus(10);
        dlc1_wlgj = dlc1_wlgj.plus(1);
    }

    //挑战:与当前邪祟对拼
    if (dlc1_pd === "挑战"){
        //武籍自动:在血量充足且挑战状态下自动释放
        let wuji_cost = dlc1_wuji_cost_hans();
        (dlc1_wuji_CD.lte(0) && dlc1_xl.gt(wuji_cost) && dlc1_wuji.gt(0) && dlc1_wujims === 1) && (
            dlc1_wuji_CD = new Decimal(30),
            dlc1_xl = dlc1_xl.minus(wuji_cost),
            dlc1_gw_xl = dlc1_gw_xl.minus(dlc1_wuji_dmg_hans())
        );

        //仙诀自动:在真元充足且挑战状态下自动释放
        let xianjue_cost = dlc1_xianjue_cost_hans();
        (dlc1_xianjue_CD.lte(0) && dlc1_zy.gt(xianjue_cost) && dlc1_xianjue.gt(0) && dlc1_xianjuems === 1) && (
            dlc1_xianjue_CD = new Decimal(30),
            dlc1_zy = dlc1_zy.minus(xianjue_cost),
            dlc1_gw_xl = dlc1_gw_xl.minus(dlc1_xianjue_dmg_hans())
        );

        //敌人属性(按当前劫数重算)
        dlc1_gw_jd_Cob.eq(1) && (dlc1_gw_gj = dlc1_gw_jd_Coi.times(1000) , dlc1_gw_xl_MAX = dlc1_gw_jd_Coi.times(10000) , dlc1_gw_ms = new Decimal(1));
        dlc1_gw_jd_Cob.eq(2) && (dlc1_gw_gj = dlc1_gw_jd_Coi.times(50000) , dlc1_gw_xl_MAX = dlc1_pow_int(dlc1_gw_jd_Coi,2).times(1e6) , dlc1_gw_ms = dlc1_gw_jd_Coi.plus(2));
        dlc1_gw_jd_Cob.eq(3) && (dlc1_gw_gj = dlc1_pow_int(dlc1_gw_jd_Coi,3).times(250000) , dlc1_gw_xl_MAX = dlc1_pow_int(dlc1_gw_jd_Coi,3).times(5e8) , dlc1_gw_ms = dlc1_gw_jd_Coi.times(9));

        //伤害结算:先写日志再扣血(日志用的是扣血前的数值,与原型一致)
        let shou_zy = dlc1_gw_gj.times(0.7).div(dlc1_ms).floor();//真元抵挡伤害
        let shou_xl = dlc1_gw_gj.times(0.2).div(dlc1_ms).floor();//有真元时受到伤害
        let shou_wu = dlc1_gw_gj.times(1.2).div(dlc1_ms).floor();//无真元时受到伤害
        let wo_fs = dlc1_fsgj.times(0.7).times(dlc1_jd_Cob).div(dlc1_gw_ms).floor();//造成的法术伤害
        let wo_wl = dlc1_wlgj.times(dlc1_jd_Cob).div(dlc1_gw_ms).floor();//造成的物理伤害

        if (dlc1_zy.gt(0)){
            dlc1_dmg_txt = "真元抵挡伤害:" + dlc1_fmt(shou_zy) + "<br>受到伤害:" + dlc1_fmt(shou_xl)
                + "<br>造成的法术伤害:" + dlc1_fmt(wo_fs) + "<br>造成的物理伤害:" + dlc1_fmt(wo_wl);
            dlc1_zy = dlc1_zy.minus(shou_zy);
            dlc1_xl = dlc1_xl.minus(shou_xl);
        }else{
            dlc1_dmg_txt = "受到伤害:" + dlc1_fmt(shou_wu)
                + "<br>造成的法术伤害:" + dlc1_fmt(wo_fs) + "<br>造成的物理伤害:" + dlc1_fmt(wo_wl);
            dlc1_xl = dlc1_xl.minus(shou_wu);
        }

        //我方对敌人造成的伤害(物理+法术)
        dlc1_gw_xl = dlc1_gw_xl.minus(dlc1_fsgj.times(0.7).plus(dlc1_wlgj).times(dlc1_jd_Cob).div(dlc1_gw_ms).floor());

        //击败邪祟:进入下一劫(祟3劫、夕9劫、年无尽)
        if (dlc1_gw_xl.lte(0)){
            if (dlc1_gw_jd_Cob.eq(1) && dlc1_gw_jd_Coi.lt(3)){
                dlc1_gw_jd_Coi = dlc1_gw_jd_Coi.plus(1);
            }else if (dlc1_gw_jd_Cob.eq(2) && dlc1_gw_jd_Coi.lt(9)){
                dlc1_gw_jd_Coi = dlc1_gw_jd_Coi.plus(1);
            }else if (dlc1_gw_jd_Cob.eq(3)){
                dlc1_gw_jd_Coi = dlc1_gw_jd_Coi.plus(1);
            }else{
                dlc1_gw_jd_Cob = dlc1_gw_jd_Cob.plus(1);
                dlc1_gw_jd_Coi = new Decimal(1);
            }

            dlc1_pd = "";
            //原型的敌人血量上限只在击败后更新,故新一劫的头一个tick显示可能对不上(原样保留)
            dlc1_gw_jd_Cob.eq(1) && (dlc1_gw_xl_MAX = dlc1_gw_jd_Coi.times(10000));
            dlc1_gw_jd_Cob.eq(2) && (dlc1_gw_xl_MAX = dlc1_pow_int(dlc1_gw_jd_Coi,2).times(1e6));
            dlc1_gw_jd_Cob.eq(3) && (dlc1_gw_xl_MAX = dlc1_pow_int(dlc1_gw_jd_Coi,3).times(5e8));

            dlc1_gw_xl = dlc1_gw_xl_MAX;
        }
    }

    //血量归零:停止当前行为,30秒后复活
    if (dlc1_xl.lte(0)){
        dlc1_pd = "";
        dlc1_fuhuojs = new Decimal(30);
    }

    //自然恢复:真元每秒2%、血量每秒1%
    dlc1_zy = dlc1_zy.plus(dlc1_zy_MAX.times(0.02).floor());
    dlc1_xl = dlc1_xl.plus(dlc1_xl_MAX.times(0.01).floor());

    //上限与下限钳制
    dlc1_xl.gt(dlc1_xl_MAX) && (dlc1_xl = dlc1_xl_MAX);
    dlc1_zy.gt(dlc1_zy_MAX) && (dlc1_zy = dlc1_zy_MAX);
    dlc1_xl.lt(0) && (dlc1_xl = new Decimal(0));
    dlc1_zy.lt(0) && (dlc1_zy = new Decimal(0));
}

//UI刷新(对应原型 xuanran())
function updateUI_DLC_1(){
    //敌人名与基础属性
    //注意:年(无尽)的"秒伤"沿用原型的 pow(gw_jd_Coi,2)(与结算用的 pow(...,3) 不一致,原样保留)
    document.getElementById("dlc1_gw_zd").innerHTML = dlc1_gw_name();

    let gw_attr = "";
    if (dlc1_gw_jd_Cob.eq(1)){
        gw_attr = "基础属性<br><br>劫数：三劫<br>秒伤：" + dlc1_fmt(dlc1_gw_jd_Coi.times(1000))
            + "<br>血量：" + dlc1_fmt(dlc1_gw_jd_Coi.times(10000)) + "<br>免伤：1";
    }else if (dlc1_gw_jd_Cob.eq(2)){
        gw_attr = "基础属性<br><br>劫数：九劫<br>秒伤：" + dlc1_fmt(dlc1_gw_jd_Coi.times(50000))
            + "<br>血量：" + dlc1_fmt(dlc1_pow_int(dlc1_gw_jd_Coi,2).times(1e6)) + "<br>免伤：" + dlc1_fmt(dlc1_gw_jd_Coi.plus(2));
    }else if (dlc1_gw_jd_Cob.eq(3)){
        gw_attr = "基础属性<br><br>劫数：无尽<br>秒伤：" + dlc1_fmt(dlc1_pow_int(dlc1_gw_jd_Coi,2).times(250000))
            + "<br>血量：" + dlc1_fmt(dlc1_pow_int(dlc1_gw_jd_Coi,3).times(5e8)) + "<br>免伤：" + dlc1_fmt(dlc1_gw_jd_Coi.times(9));
    }
    document.getElementById("dlc1_gw_attr").innerHTML = gw_attr;

    //敌人血条:整条血条贴图铺满,掉血从右端往里裁(clip-path),空出来的部分只留边框、透出页面背景
    let gw_rate = dlc1_bar_rate(dlc1_gw_xl, dlc1_gw_xl_MAX);
    document.getElementById("dlc1_gw_fill").style.clipPath = "inset(0 " + (100 - gw_rate) + "% 0 0)";
    document.getElementById("dlc1_gw_txt").innerHTML = dlc1_fmt(dlc1_gw_xl) + "/" + dlc1_fmt(dlc1_gw_xl_MAX);

    //战斗日志:原型只在挑战中刷新,未战斗时保留上一次的内容
    (dlc1_dmg_txt !== "") && (document.getElementById("dlc1_dmg").innerHTML = dlc1_dmg_txt);

    //三项属性与经验
    document.getElementById("dlc1_atk").innerHTML = "法术攻击:" + dlc1_fmt(dlc1_fsgj) + "<br>物理攻击:" + dlc1_fmt(dlc1_wlgj);
    document.getElementById("dlc1_extra").innerHTML = "免伤:" + dlc1_fmt(dlc1_ms) + " 伤害倍率:" + dlc1_fmt(dlc1_jd_Cob);
    document.getElementById("dlc1_exp").innerHTML = "经验:" + dlc1_fmt(dlc1_jingyan);

    //修为/境界/突破
    document.getElementById("dlc1_xiuwei_txt").innerHTML = dlc1_fmt(dlc1_xiuwei) + "/" + dlc1_fmt(dlc1_tupo);
    document.getElementById("dlc1_xiuwei_fill").style.width = dlc1_bar_rate(dlc1_xiuwei, dlc1_tupo) + "%";
    document.getElementById("dlc1_jingjie_txt").innerHTML = "境界·" + dlc1_jingjie_name();
    document.getElementById("dlc1_tupo").innerHTML = dlc1_xiuwei.gte(dlc1_tupo) ? "可突破" : "修行中";

    //真元条与血量条
    document.getElementById("dlc1_zy_fill").style.width = dlc1_bar_rate(dlc1_zy, dlc1_zy_MAX) + "%";
    document.getElementById("dlc1_zy_txt").innerHTML = "真元:" + dlc1_fmt(dlc1_zy) + "/" + dlc1_fmt(dlc1_zy_MAX);
    document.getElementById("dlc1_xl_fill").style.width = dlc1_bar_rate(dlc1_xl, dlc1_xl_MAX) + "%";
    document.getElementById("dlc1_xl_txt").innerHTML = "血量:" + dlc1_fmt(dlc1_xl) + "/" + dlc1_fmt(dlc1_xl_MAX);

    //仙诀面板(名字按钮本身就是"释放",详情由"？"按钮展开)
    let xianjue_max = dlc1_xianjue_max_hans();
    let xianjue_can = dlc1_xianjue_CD.lte(0) && dlc1_zy.gt(dlc1_xianjue_cost_hans()) && dlc1_xianjue.gt(0);
    document.getElementById("dlc1_xianjue_name_b").innerHTML = dlc1_xianjue_name();
    document.getElementById("dlc1_xianjue_name_b").style.opacity = xianjue_can ? '1' : '0.5';
    document.getElementById("dlc1_xianjue_panel").innerHTML =
        dlc1_fmt(dlc1_xianjue) + "/" + dlc1_fmt(xianjue_max) + "级<br><br>"
        + "仙诀法伤倍率:" + dlc1_fmt_dec(dlc1_xianjue.times(0.1).plus(2)) + "<br>"
        + "消耗真元:" + dlc1_fmt(dlc1_xianjue_cost_hans()) + "<br>"
        + "伤害:" + dlc1_fmt(dlc1_xianjue_dmg_hans());
    document.getElementById("dlc1_xianjue_up").innerHTML = "升级" + dlc1_fmt(dlc1_xianjue.times(20).plus(10)) + "经验";
    document.getElementById("dlc1_xianjue_onoff").innerHTML = (dlc1_xianjuems === 1) ? "自动中" : "自动关";
    document.getElementById("dlc1_xianjue_cd").style.width = dlc1_bar_rate(dlc1_xianjue_CD, 30) + "%";
    document.getElementById("dlc1_xianjue_body").style.display = (dlc1_xianjue_open === 1) ? 'flex' : 'none';
    document.getElementById("dlc1_xianjue_open_b").classList.toggle('open', dlc1_xianjue_open === 1);

    //武籍面板
    let wuji_can = dlc1_wuji_CD.lte(0) && dlc1_xl.gt(dlc1_wuji_cost_hans()) && dlc1_wuji.gt(0);
    document.getElementById("dlc1_wuji_name_b").innerHTML = dlc1_wuji_name();
    document.getElementById("dlc1_wuji_name_b").style.opacity = wuji_can ? '1' : '0.5';
    document.getElementById("dlc1_wuji_panel").innerHTML =
        dlc1_fmt(dlc1_wuji) + "/" + dlc1_fmt(xianjue_max) + "级<br><br>"
        + "武籍物伤倍率:" + dlc1_fmt_dec(dlc1_wuji.times(0.05).plus(1)) + "<br>"
        + "血转伤倍率:0.5(定值)<br>"
        + "消耗血量:" + dlc1_fmt(dlc1_wuji_cost_hans()) + "<br>"
        + "伤害:" + dlc1_fmt(dlc1_wuji_dmg_hans());
    document.getElementById("dlc1_wuji_up").innerHTML = "升级" + dlc1_fmt(dlc1_wuji.times(20).plus(10)) + "经验";
    document.getElementById("dlc1_wuji_onoff").innerHTML = (dlc1_wujims === 1) ? "自动中" : "自动关";
    document.getElementById("dlc1_wuji_cd").style.width = dlc1_bar_rate(dlc1_wuji_CD, 30) + "%";
    document.getElementById("dlc1_wuji_body").style.display = (dlc1_wuji_open === 1) ? 'flex' : 'none';
    document.getElementById("dlc1_wuji_open_b").classList.toggle('open', dlc1_wuji_open === 1);

    //修行/挑战按钮文案(原型用 xs_no 与按钮各自改文本,这里统一按状态推导)
    document.getElementById("dlc1_juqi").innerHTML = (dlc1_pd === "聚气") ? "正在聚气" : "开始聚气";
    document.getElementById("dlc1_cuiti").innerHTML = (dlc1_pd === "淬体") ? "正在淬体" : "开始淬体";
    if (dlc1_fuhuojs.gt(0)){
        document.getElementById("dlc1_tiaozhan").innerHTML = dlc1_fmt(dlc1_fuhuojs) + "秒";
    }else{
        document.getElementById("dlc1_tiaozhan").innerHTML = (dlc1_pd === "挑战") ? "正在挑战" : "开始挑战";
    }
}

//按钮:开始聚气
function dlc1_juqi_button(){
    dlc1_pd = "聚气";
    updateUI_DLC_1();
}

//按钮:开始淬体
function dlc1_cuiti_button(){
    dlc1_pd = "淬体";
    updateUI_DLC_1();
}

//按钮:开始挑战(复活倒计时中不能挑战)
function dlc1_tiaozhan_button(){
    dlc1_fuhuojs.lte(0) && (dlc1_pd = "挑战");
    updateUI_DLC_1();
}

//按钮:突破(修为达标时提升大境界/小境界,并把两个上限各加 min(1e6, 100*jd_Coi^jd_Cob))
function dlc1_tupo_button(){
    if (dlc1_xiuwei.lt(dlc1_tupo)) return;

    dlc1_xiuwei = new Decimal(0);
    let add = Decimal.min(new Decimal(1e6), dlc1_pow_int(dlc1_jd_Coi, dlc1_jd_Cob).floor().times(100));
    dlc1_zy_MAX = dlc1_zy_MAX.plus(add);
    dlc1_xl_MAX = dlc1_xl_MAX.plus(add);

    if (dlc1_jd_Cob.eq(1) && dlc1_jd_Coi.lt(5)){
        dlc1_jd_Coi = dlc1_jd_Coi.plus(1);
    }else if (dlc1_jd_Cob.eq(2) && dlc1_jd_Coi.lt(5)){
        dlc1_jd_Coi = dlc1_jd_Coi.plus(1);
    }else if (dlc1_jd_Cob.eq(3) && dlc1_jd_Coi.lt(5)){
        dlc1_jd_Coi = dlc1_jd_Coi.plus(1);
    }else if (dlc1_jd_Cob.eq(4) && dlc1_jd_Coi.lt(5)){
        dlc1_jd_Coi = dlc1_jd_Coi.plus(1);
    }else if (dlc1_jd_Cob.eq(5) && dlc1_jd_Coi.lt(5)){
        dlc1_jd_Coi = dlc1_jd_Coi.plus(1);
    }else if (dlc1_jd_Cob.eq(6)){
        dlc1_jd_Coi = dlc1_jd_Coi.plus(1);
    }else{
        dlc1_jd_Cob = dlc1_jd_Cob.plus(1);
        dlc1_jd_Coi = new Decimal(1);
    }

    updateUI_DLC_1();
}

//按钮:仙诀升级(消耗经验,上限由大境界决定)
function dlc1_xianjue_button(){
    let cost = dlc1_xianjue.times(20).plus(10);
    if (dlc1_jingyan.gte(cost) && dlc1_xianjue.lt(dlc1_xianjue_max_hans())){
        dlc1_jingyan = dlc1_jingyan.minus(cost);
        dlc1_xianjue = dlc1_xianjue.plus(1);
    }
    updateUI_DLC_1();
}

//按钮:武籍升级(消耗经验,上限与仙诀共用)
function dlc1_wuji_button(){
    let cost = dlc1_wuji.times(20).plus(10);
    if (dlc1_jingyan.gte(cost) && dlc1_wuji.lt(dlc1_xianjue_max_hans())){
        dlc1_jingyan = dlc1_jingyan.minus(cost);
        dlc1_wuji = dlc1_wuji.plus(1);
    }
    updateUI_DLC_1();
}

//按钮:仙诀自动开关
function dlc1_xianjue_auto_cut(){
    toggleAuto('dlc1_xianjuems', 'dlc1_xianjue_onoff', "自动中", "自动关");
}

//按钮:武籍自动开关
function dlc1_wuji_auto_cut(){
    toggleAuto('dlc1_wujims', 'dlc1_wuji_onoff', "自动中", "自动关");
}

//按钮:仙诀释放(手动,不限于挑战状态;折叠入口"仙诀·XXX"就是这颗按钮)
function dlc1_xianjue_fang_button(){
    let cost = dlc1_xianjue_cost_hans();
    if (dlc1_xianjue_CD.lte(0) && dlc1_zy.gt(cost) && dlc1_xianjue.gt(0)){
        dlc1_xianjue_CD = new Decimal(30);
        dlc1_zy = dlc1_zy.minus(cost);
        dlc1_gw_xl = dlc1_gw_xl.minus(dlc1_xianjue_dmg_hans());
    }
    updateUI_DLC_1();
}

//按钮:武籍释放(手动,不限于挑战状态;折叠入口"武籍·XXX"就是这颗按钮)
function dlc1_wuji_fang_button(){
    let cost = dlc1_wuji_cost_hans();
    if (dlc1_wuji_CD.lte(0) && dlc1_xl.gt(cost) && dlc1_wuji.gt(0)){
        dlc1_wuji_CD = new Decimal(30);
        dlc1_xl = dlc1_xl.minus(cost);
        dlc1_gw_xl = dlc1_gw_xl.minus(dlc1_wuji_dmg_hans());
    }
    updateUI_DLC_1();
}

//按钮:"？":展开/收起仙诀详情
function dlc1_xianjue_open_cut(){
    dlc1_xianjue_open = (dlc1_xianjue_open === 1) ? 0 : 1;
    updateUI_DLC_1();
}

//按钮:"？":展开/收起武籍详情
function dlc1_wuji_open_cut(){
    dlc1_wuji_open = (dlc1_wuji_open === 1) ? 0 : 1;
    updateUI_DLC_1();
}

//按钮:介绍(原型的 Up_cx 浮层,这里用项目统一的 showModal)
function dlc1_intro_button(){
    let steps = [
        "免伤机制:最终伤害结算除以免伤",
        "真元机制:真元以0.7的倍率吸收0.8的伤害,每秒恢复2%",
        "血量机制:有真元时以0.2的倍率吸收0.2的伤害,否则以1.2的倍率吸收1的伤害,每秒恢复1%",
        "法术伤害倍率0.7,物理伤害倍率1",
        "经验机制:击败邪祟可持续获得经验",
        "仙诀、武籍自动机制:在真元充足且挑战状态下自动释放",
        "突破可增加免伤、伤害倍率、真元和血量"
    ];
    showModal("修仙除邪祟 · 介绍", steps.join("<br><br>"), null, null, true);
}

//绑定事件
document.getElementById('dlc1_juqi').addEventListener('click', dlc1_juqi_button);
document.getElementById('dlc1_cuiti').addEventListener('click', dlc1_cuiti_button);
document.getElementById('dlc1_tiaozhan').addEventListener('click', dlc1_tiaozhan_button);
document.getElementById('dlc1_tupo').addEventListener('click', dlc1_tupo_button);
document.getElementById('dlc1_xianjue_up').addEventListener('click', dlc1_xianjue_button);
document.getElementById('dlc1_wuji_up').addEventListener('click', dlc1_wuji_button);
document.getElementById('dlc1_xianjue_onoff').addEventListener('click', dlc1_xianjue_auto_cut);
document.getElementById('dlc1_wuji_onoff').addEventListener('click', dlc1_wuji_auto_cut);
//折叠入口:点名就是释放,点"？"才是展开详情
document.getElementById('dlc1_xianjue_name_b').addEventListener('click', dlc1_xianjue_fang_button);
document.getElementById('dlc1_wuji_name_b').addEventListener('click', dlc1_wuji_fang_button);
document.getElementById('dlc1_xianjue_open_b').addEventListener('click', dlc1_xianjue_open_cut);
document.getElementById('dlc1_wuji_open_b').addEventListener('click', dlc1_wuji_open_cut);
document.getElementById('DLC_1_intro').addEventListener('click', dlc1_intro_button);
