//所有数值都使用 Decimal 对象
//背景颜色预设（全局）
const bgColors = ["#ffffff", "#1e1e2f", "#f5f0e6", "#d9e8f5","#000000"];
let bgIndex = 0;  //当前背景索引，0=白色

let version = 5.3;

let game_tc = 0;

let UI_re = "h1";
let gl_js_re = 0;

let game_time = 0;
let game_time_bl = new Decimal(0);
let quark_max = new Decimal(0);

var Quark = new Decimal(0);

let Quark_h1_js = new Decimal(0);
let Quark_h2_buff1 = new Decimal(0);
let Quark_h2_buff2 = new Decimal(0);
let Quark_js = new Decimal(0);

//藏品
let cp_version = 1.0;

let cp_ds = 0;
let cp_ds_cs = 0;

let cp_up1 = 0;
let cp_up2 = 0;
let cp_up3 = 0;
let cp_up4 = 0;
let cp_up5 = 0;
let cp_up6 = 0;
//auto
var h1_up2_auto = 0;
var h1_up3_auto = 0;
var h1_up4_auto = 0;
var h1_up5_auto = 0;//铑解锁的费米子+自动化(0/1)

var h3_up1_auto = 0;
var h3_up2_auto = 0;

var h3_up3_auto = 0;
var h3_up4_auto = 0;

var auto8 = 0;
var auto9 = 0;
var auto11 = 0;//铌解锁的铜~溴自动化(0/1)
var h5_up_auto = 0;

//h1
let h1_js_re = 1;

let h1_up1 = new Decimal(0);//夸克产量+
let h1_up1_1 = new Decimal(0);
let h1_up3 = new Decimal(0);//夸克产量*
let h1_up4 = new Decimal(0);//夸克产量^
let h1_up5 = new Decimal(0);//费米子+(铑解锁)

let h1_2_fermion = new Decimal(0);//费米子
let h1_2_fermion_js = new Decimal(0);//每秒费米子产量(派生值)
let h1_2_ratio = 0.01;//费米子转化比例(0.01=1%)

let h1_2_up1 = new Decimal(0);//上夸克
let h1_2_up2 = new Decimal(0);//下夸克
let h1_2_up3 = new Decimal(0);//粲夸克
let h1_2_up4 = new Decimal(0);//奇夸克

//四种夸克加成(派生值,由 script_h1.js 的 h1_2_buff_hans 计算)
let h1_2_up1_buff = new Decimal(1);//上夸克:费米子产量*(1+log10(上夸克))
let h1_2_up2_buff = new Decimal(1);//下夸克:夸克数量自增*(1+1e-6*log10(下夸克))
let h1_2_up3_buff = new Decimal(1);//粲夸克:最大夸克数量*10^(0.1*log2(粲夸克))
let h1_2_up4_buff = new Decimal(1);//奇夸克:夸克层级升级费用/(1+奇夸克)

let h1_re = new Decimal(0);

//h2
let h2_js_re = 1;

var h2_ziyuan = new Decimal(0);
let h2_ziyuan_js = new Decimal(0);
let h2_ziyuan_max = new Decimal(0);
let h2_upe = new Decimal(0);
let h2_upp = new Decimal(0);
let h2_upn = new Decimal(0);
let h2_e_js = new Decimal(0);
let h2_p_js = new Decimal(0);
let h2_n_js = new Decimal(0);
let h2_e = new Decimal(0);
let h2_p = new Decimal(0);
let h2_n = new Decimal(0);

var h2_cx = "";
var h2_up1 = new Decimal(0);
var h2_up2 = new Decimal(0);
var h2_up3 = new Decimal(0);
var h2_up4 = new Decimal(0);
var h2_up5 = new Decimal(0);
var h2_up6 = new Decimal(0);
var h2_up7 = new Decimal(0);
var h2_up8 = new Decimal(0);

var h2_up9 = new Decimal(0);
var h2_up10 = new Decimal(0);
var h2_up11 = new Decimal(0);
var h2_up12 = new Decimal(0);
var h2_up13 = new Decimal(0);
var h2_up14 = new Decimal(0);
var h2_up15 = new Decimal(0);
var h2_up16 = new Decimal(0);
var h2_up17 = new Decimal(0);

var h2_up18 = new Decimal(0);
var h2_up19 = new Decimal(0);
var h2_up20 = new Decimal(0);
var h2_up21 = new Decimal(0);
var h2_up22 = new Decimal(0);
var h2_up23 = new Decimal(0);
var h2_up24 = new Decimal(0);
var h2_up25 = new Decimal(0);
var h2_up26 = new Decimal(0);
var h2_up27 = new Decimal(0);
var h2_up28 = new Decimal(0);

var h2_up29 = new Decimal(0);
var h2_up30 = new Decimal(0);
var h2_up31 = new Decimal(0);
var h2_up32 = new Decimal(0);
var h2_up33 = new Decimal(0);
var h2_up34 = new Decimal(0);
var h2_up35 = new Decimal(0);

//奇点元素(消耗奇点)
var h2_up36 = new Decimal(0);//氪
var h2_up37 = new Decimal(0);//铷
var h2_up38 = new Decimal(0);//锶
var h2_up39 = new Decimal(0);//钇:解锁蚀刻·夸克II、蚀刻·元素
var h2_up40 = new Decimal(0);//锆:解锁纯净物O₂、O₃、Ne、F₂
var h2_up41 = new Decimal(0);//铌:解锁元素升级自动化(自动升到1级,不消耗资源、无门槛)
var h2_up42 = new Decimal(0);//钼:解锁B型恒星、巨星系
var h2_up43 = new Decimal(0);//锝:解锁弦论层级"牛顿万有引力公式"子选项卡
var h2_up44 = new Decimal(0);//钌:解锁弦论层级"爱因斯坦场方程"子选项卡
var h2_up45 = new Decimal(0);//铑:解锁夸克层级"费米子+"升级
var h2_up46 = new Decimal(0);//钯:解锁夸克层级"费米子"子选项卡
var h2_up47 = new Decimal(0);//银:解锁蚀刻层级"蚀刻·时间"

var h2_2_ziyuan = new Decimal(0);

var h2_2_up1 = new Decimal(0);
var h2_2_up2 = new Decimal(0);
var h2_2_up3 = new Decimal(0);//O₂:奇点产量*2
var h2_2_up4 = new Decimal(0);//O₃:每秒产出1个十维(不受游戏倍率加成)
var h2_2_up5 = new Decimal(0);//Ne:夸克溢出次方+0.2(上限为1)
var h2_2_up6 = new Decimal(0);//F₂:夸克产量*1e500,全局游戏倍率^0.1

let h2_re = new Decimal(0);

//h3
let h3_js_re = 1; 

var h3_ziyuan = new Decimal(0);
let h3_ziyuan_js = new Decimal(0);
var h3_ziyuan_max = new Decimal(0);
let h3_mass = new Decimal(0);
let h3_mass_js = new Decimal(0);
let h3_BH = new Decimal(0);
let h3_BH_js = new Decimal(0);
let h3_up3q = new Decimal(0);
let h3_up3q_js = new Decimal(0);
let h3_up4q = new Decimal(0);
let h3_up4q_js = new Decimal(0);
let h3_up5q = new Decimal(0);
let h3_up5q_js = new Decimal(0);

let h3_up6q = new Decimal(0);
let h3_up6q_js = new Decimal(0);
let h3_up7q = new Decimal(0);
let h3_up7q_js = new Decimal(0);
let h3_up8q = new Decimal(0);
let h3_up8q_js = new Decimal(0);

let h3_up9q = new Decimal(0);
let h3_up9q_js = new Decimal(0);
let h3_up10q = new Decimal(0);
let h3_up10q_js = new Decimal(0);

let h3_up1 = new Decimal(0);
let h3_up2 = new Decimal(0);
let h3_up3 = new Decimal(0);
let h3_up4 = new Decimal(0);
let h3_up5 = new Decimal(0);

let h3_up6 = new Decimal(0);
let h3_up7 = new Decimal(0);
let h3_up8 = new Decimal(0);

let h3_up9 = new Decimal(0);
let h3_up10 = new Decimal(0);

//B型恒星(钼解锁)
let h3_up11 = new Decimal(0);
let h3_up11q = new Decimal(0);
let h3_up11q_js = new Decimal(0);
let h3_up11_buff = new Decimal(1);//加成A型恒星产量与膜产量

let h3_re = new Decimal(0);

//h4
let h4_js_re = 1;

var h4_ziyuan = new Decimal(0);
let h4_ziyuan_js = new Decimal(0);
let h4_ziyuan_max = new Decimal(0);

let h4_N = new Decimal(0);
let h4_DMH = new Decimal(0);
let h4_GN = new Decimal(0);

let h4_up1 = new Decimal(0);
let h4_up1q = new Decimal(0);
let h4_up1_js = new Decimal(0);
let h4_up2 = new Decimal(0);
let h4_up2q = new Decimal(0);
let h4_up2_js = new Decimal(0);
let h4_up3 = new Decimal(0);
let h4_up3q = new Decimal(0);
let h4_up3_js = new Decimal(0);
let h4_up4 = new Decimal(0);
let h4_up4q = new Decimal(0);
let h4_up4_js = new Decimal(0);
let h4_up5 = new Decimal(0);
let h4_up5q = new Decimal(0);
let h4_up5_js = new Decimal(0);

let h4_re = new Decimal(0);

//h5
let h5_js_re = 1;

var h5_ziyuan = new Decimal(0);
let h5_ziyuan_js = new Decimal(0);
let h5_ziyuan_max = new Decimal(0);

let h5_time_confetti = new Decimal(0);
let h5_time_confetti_js = new Decimal(0);
let h5_time_buff = new Decimal(1);
let h5_time_buff_quark = new Decimal(1);
let h5_quark_max = new Decimal(1e180);
let h5_overflow_exponent = new Decimal(1);

let h5_up1 = new Decimal(0);
let h5_up2 = new Decimal(0);
let h5_up3 = new Decimal(0);
let h5_up4 = new Decimal(0);
let h5_up5 = new Decimal(0);
let h5_up6 = new Decimal(0);
let h5_up7 = new Decimal(0);
let h5_up8 = new Decimal(0);
let h5_up9 = new Decimal(0);
let h5_up10 = new Decimal(0);
let h5_up11 = new Decimal(0);
let h5_up12 = new Decimal(0);

let h5_re = new Decimal(0);

//h6
let h6_js_re = 1;

var h6_ziyuan = new Decimal(0);
let h6_ziyuan_js = new Decimal(0);
let h6_ziyuan_max = new Decimal(0);

let h6_brane = new Decimal(0);
let h6_brane_js = new Decimal(0);

let h6_up1 = new Decimal(0);
let h6_up1q = new Decimal(0);
let h6_up2 = new Decimal(0);
let h6_up2q = new Decimal(0);
let h6_up3 = new Decimal(0);
let h6_up3q = new Decimal(0);
let h6_up4 = new Decimal(0);
let h6_up4q = new Decimal(0);
let h6_up5 = new Decimal(0);
let h6_up5q = new Decimal(0);
let h6_up6 = new Decimal(0);
let h6_up6q = new Decimal(0);
let h6_up7 = new Decimal(0);
let h6_up7q = new Decimal(0);
let h6_up8 = new Decimal(0);
let h6_up8q = new Decimal(0);
let h6_up9 = new Decimal(0);
let h6_up9q = new Decimal(0);
let h6_up10 = new Decimal(0);
let h6_up10q = new Decimal(0);

//h6维度每秒产量(十维为链条顶端,数量仅通过购买获得,故无产量变量)
let h6_up1q_js = new Decimal(0);
let h6_up2q_js = new Decimal(0);
let h6_up3q_js = new Decimal(0);
let h6_up4q_js = new Decimal(0);
let h6_up5q_js = new Decimal(0);
let h6_up6q_js = new Decimal(0);
let h6_up7q_js = new Decimal(0);
let h6_up8q_js = new Decimal(0);
let h6_up9q_js = new Decimal(0);

//h6弦(第二子选项卡"弦")
//等级n从0开始,费用中的n为当前等级,效果中的n为购买后的等级
let h6_1_up1 = new Decimal(0);//奇点弦:时间碎片产量*1.15^n,费用10^(1.15^n)
let h6_1_up2 = new Decimal(0);//开弦:奇点弦效果*1.15^n,费用10^(1.15^n)
let h6_1_up3 = new Decimal(0);//闭弦:奇点弦数量*1.1^n,费用10^(1.15^n)
let h6_1_up4 = new Decimal(0);//基态:开弦效果*1.15^n,费用10^(1.15^n)
let h6_1_up5 = new Decimal(0);//激发态:闭弦效果*1.1^n,费用10^(1.15^n)
let h6_1_up6 = new Decimal(0);//TypeI弦:奇点弦费用*max(0.1,0.95^n),费用7^n
let h6_1_up7 = new Decimal(0);//TypeIIA弦:奇点弦数量*1.2^n,费用7^n
let h6_1_up8 = new Decimal(0);//TypeIIB弦:奇点获取量*2^n,费用11^n
let h6_1_up9 = new Decimal(0);//杂化弦SO(32):开弦、闭弦费用*max(0.1,0.95^n),费用7^n
let h6_1_up10 = new Decimal(0);//杂化弦E8XE8:基态、激发态费用*max(0.1,0.95^n),费用7^n

//弦加成(派生值,由 script_h6.js 的 h6_1_hans 计算)
let h6_1_xiaoguo_buff = new Decimal(1);//奇点弦效果=开弦*基态
let h6_1_shuliang_buff = new Decimal(1);//奇点弦数量=闭弦*激发态*TypeIIA弦
let h6_1_zhonghe_buff = new Decimal(1);//时间碎片产量倍率=奇点弦综合
let h6_1_ziyuan_buff = new Decimal(1);//奇点获取量倍率=TypeIIB弦

//h6_3:牛顿万有引力公式(第三子选项卡,锝解锁)
//费用消耗奇点,等级n从0开始,均可无限升级
let h6_3_1up1 = new Decimal(0);//G值:基础值+1,费用1e6*2^n
let h6_3_1up2 = new Decimal(0);//m1值:基础值+1,费用1e7*2.33^n
let h6_3_1up3 = new Decimal(0);//m2值:基础值+1,费用1e7*2.33^n
let h6_3_1up4 = new Decimal(0);//r值:基础值*0.9,费用分段
let h6_3_1up5 = new Decimal(0);//G值+1等级:G值等级乘数+1,费用1e9*3^n
let h6_3_1up6 = new Decimal(0);//m1值+1等级:m1值等级乘数+1,费用1e10*3^n
let h6_3_1up7 = new Decimal(0);//m2值+1等级:m2值等级乘数+1,费用1e10*3^n
let h6_3_1up8 = new Decimal(0);//r值*0.9等级:r值等级乘数+1,费用分段
let h6_3_1up9 = new Decimal(0);//G值指数:G值指数+0.1,费用1e16*(n+1)^n
let h6_3_1up10 = new Decimal(0);//m1值指数:m1值指数+0.1,费用1e17*(n*2.33+1)^n
let h6_3_1up11 = new Decimal(0);//m2值指数:m2值指数+0.1,费用1e17*(n*2.33+1)^n
let h6_3_1up12 = new Decimal(0);//r值指数:r值等级指数+0.01,费用分段

//牛顿buff(派生值,即公式F,由 script_h6_3.js 的 h6_3_1_hans 计算)
let h6_3_1_G_buff = new Decimal(1);//G实际=(up1+1)*(up5+1)的(1+up9*0.1)次方
let h6_3_1_m1_buff = new Decimal(1);//m1实际=(up2+1)*(up6+1)的(1+up10*0.1)次方
let h6_3_1_m2_buff = new Decimal(1);//m2实际=(up3+1)*(up7+1)的(1+up11*0.1)次方
let h6_3_1_r_buff = new Decimal(1);//r实际=0.9^[(up4*(up8+1))^(1+up12*0.1)]
let h6_3_1buff = new Decimal(1);//F=(G*m1*m2)/r

//h6_3:爱因斯坦场方程(第四子选项卡,钌解锁)
//费用消耗奇点,等级n从0开始,均可无限升级
let h6_3_2up1 = new Decimal(0);//π值:基础值+1,费用1e18*2^n
let h6_3_2up2 = new Decimal(0);//G值:基础值+1,费用1e18*2^n
let h6_3_2up3 = new Decimal(0);//c值:基础值*0.9,费用1e19*(n+2)^n
let h6_3_2up4 = new Decimal(0);//Tμν值:基础值+1(初始0.5),费用1e20*2.33^n
let h6_3_2up5 = new Decimal(0);//T值:基础值+1,费用1e22*3^n
let h6_3_2up6 = new Decimal(0);//gμν值:基础值+1,费用1e23*3.2^n
let h6_3_2up7 = new Decimal(0);//Λ值:基础值+1,费用1e23*3.5^n

//爱因斯坦buff(派生值,即公式Rμν,由 script_h6_3.js 的 h6_3_2_hans 计算)
//说明:七个等级全为0时,部分3=1、部分4=1、部分1=0,故原式天然得到 Rμν=1,即"无加成"的中性点
let h6_3_2_js1 = new Decimal(0);//部分1=8*up1*(up2+1)
let h6_3_2_js2 = new Decimal(1);//部分2=(0.9^up3)^4
let h6_3_2_js3 = new Decimal(0);//部分3=(0.5+up4)+0.5*(up5+1)*(up6+1)
let h6_3_2_js4 = new Decimal(0);//部分4=(up6+1)*(up7+1)
let h6_3_2_raw = new Decimal(1);//原始公式值=(部分1/部分2)*部分3+部分4(0级=1)
let h6_3_2buff = new Decimal(1);//生效倍率,下限1(0级=1=无加成,与牛顿F的0级口径一致)

//SK
//三种蚀刻互相独立,可以同时进行;sk_ing=任意一种进行中
let sk_ing = 0;
let sk_1_ing = 0;
let sk_2_ing = 0;
let sk_3_ing = 0;

let sk_1_MAX = new Decimal(0);
let sk_1_buff1 = new Decimal(1);
let sk_1_buff2 = new Decimal(1);

//蚀刻·时间(银解锁):蚀刻中游戏倍率固定为0.001,奖励倍率=log10(蚀刻中最大夸克数量)
let sk_4_ing = 0;
let sk_4_MAX = new Decimal(0);
let sk_4_buff = new Decimal(1);

//蚀刻·夸克II
let sk_2_MAX = new Decimal(0);//蚀刻中的最大夸克数量
let sk_2_buff1 = new Decimal(1);//对夸克产量加成(蚀刻中不生效)

//蚀刻·元素
let sk_3_MAX = new Decimal(0);//蚀刻中的最大夸克数量
let sk_3_buff1 = new Decimal(1);//对电子产量加成(蚀刻中不生效)=(蚀刻中最大夸克数量)^0.1

//核心资源条(顶部资源摘要条)
//显示开关:1=显示,0=隐藏,默认全部显示
let res_show_Quark = 1;
let res_show_h1_2_fermion = 1;
let res_show_h2_ziyuan = 1;
let res_show_h3_ziyuan = 1;
let res_show_h4_ziyuan = 1;
let res_show_h5_ziyuan = 1;
let res_show_h5_time_confetti = 1;
let res_show_h6_ziyuan = 1;
let res_show_h6_brane = 1;
let res_show_cp_ds = 1;

//DLC1:修仙除邪祟
//说明:数值全部照搬 Godot 原型(Godot_DLC_1.txt)的初始值,含其中的边界行为
//时间基准:原型是1秒一次的Timer,script.js 的主循环用 dlc1_time_re 累加,每满1秒调用一次 dlc1_hans()
//玩家
let dlc1_zy = new Decimal(1);//真元
let dlc1_zy_MAX = new Decimal(1);//真元上限
let dlc1_xl = new Decimal(100);//血量
let dlc1_xl_MAX = new Decimal(100);//血量上限
let dlc1_xiuwei = new Decimal(0);//修为
let dlc1_jd_Cob = new Decimal(1);//大境界(1凡尘/2入微/3回溯/4原初/5化神/6真仙)
let dlc1_jd_Coi = new Decimal(1);//小境界(1~5,真仙时无限重)
let dlc1_tupo = new Decimal(150);//突破所需修为(每tick按境界重算)
let dlc1_ms = new Decimal(1);//免伤
let dlc1_fsgj = new Decimal(0);//法术攻击
let dlc1_wlgj = new Decimal(0);//物理攻击
let dlc1_jingyan = new Decimal(0);//经验(击败邪祟持续获得)
let dlc1_xianjue = new Decimal(0);//仙诀等级
let dlc1_xianjue_CD = new Decimal(30);//仙诀释放冷却(秒)
let dlc1_wuji = new Decimal(0);//武籍等级
let dlc1_wuji_CD = new Decimal(30);//武籍释放冷却(秒)
let dlc1_fuhuojs = new Decimal(0);//复活倒计时(秒),挑战中血量归零后置30
let dlc1_pd = "";//当前行为:""/"聚气"/"淬体"/"挑战"
//自动开关(沿用 script_auto.js 的 toggleAuto,必须用 var 才能挂到 window 上)
var dlc1_xianjuems = 0;//仙诀自动(0/1)
var dlc1_wujims = 0;//武籍自动(0/1)
//武籍/仙诀详情的折叠状态(0=只显示"武籍·凡尘"与"？",1=展开详情)
let dlc1_wuji_open = 0;
let dlc1_xianjue_open = 0;
//敌人(邪祟/劫)
let dlc1_gw_xl = new Decimal(10000);//敌人血量
let dlc1_gw_xl_MAX = new Decimal(10000);//敌人血量上限
let dlc1_gw_gj = new Decimal(1000);//敌人攻击
let dlc1_gw_jd_Cob = new Decimal(1);//敌人劫数档(1祟/2夕/3年(无尽))
let dlc1_gw_jd_Coi = new Decimal(1);//敌人档内重数
let dlc1_gw_ms = new Decimal(1);//敌人免伤
//瞬时值(不存档)
let dlc1_time_re = 0;//1秒tick累加器
let dlc1_dmg_txt = "";//战斗伤害日志(原型只在挑战中刷新,未战斗时保留上一次)