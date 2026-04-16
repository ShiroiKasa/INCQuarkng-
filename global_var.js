//所有数值都使用 Decimal 对象
//背景颜色预设（全局）
const bgColors = ["#ffffff", "#1e1e2f", "#f5f0e6", "#d9e8f5","#000000"];
let bgIndex = 0;  //当前背景索引，0=白色

let UI_re = "h1";
let gl_js_re = 0;

let game_time = 0;
let quark_max = new Decimal(0);

let Quark = new Decimal(0);

let Quark_h1_js = new Decimal(0);
let Quark_h2_buff1 = new Decimal(0);
let Quark_h2_buff2 = new Decimal(0);
let Quark_js = new Decimal(0);

//藏品
let cp_ds = 0;
let cp_ds_cs = 0;

let cp_up1 = 0;
let cp_up2 = 0;
let cp_up3 = 0;
//auto
var h1_up2_auto = 0;
var h1_up3_auto = 0;
var h1_up4_auto = 0;

var h3_up1_auto = 0;
var h3_up2_auto = 0;

//h1
let h1_js_re = 1;

let h1_up1 = new Decimal(0);//夸克产量+
let h1_up1_1 = new Decimal(0);
let h1_up3 = new Decimal(0);//夸克产量*
let h1_up4 = new Decimal(0);//夸克产量^

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

let h3_up1 = new Decimal(0);
let h3_up2 = new Decimal(0);
let h3_up3 = new Decimal(0);
let h3_up4 = new Decimal(0);
let h3_up5 = new Decimal(0);

let h3_up6 = new Decimal(0);

let h3_re = new Decimal(0);

//h4
let h4_js_re = 1;

let h4_ziyuan = new Decimal(0);
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