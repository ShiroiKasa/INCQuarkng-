//所有数值都使用 Decimal 对象
//背景颜色预设（全局）
const bgColors = ["#ffffff", "#1e1e2f", "#f5f0e6", "#d9e8f5"];
let bgIndex = 0;  //当前背景索引，0=白色

let UI_re = "h1";

let game_time = 0;
let quark_max = new Decimal(0);

let Quark = new Decimal(0);

let Quark_h1_js = new Decimal(0);
let Quark_h2_buff1 = new Decimal(0);
let Quark_h2_buff2 = new Decimal(0);
let Quark_js = new Decimal(0);

//auto
var h1_up2_auto = 0;
var h1_up3_auto = 0;

//h1
let h1_js_re = 1;

let h1_up1 = new Decimal(0);//+1点击产量
let h1_up1_1 = new Decimal(0);//夸克产量+
let h1_up3 = new Decimal(0);//夸克产量*

let h1_re = new Decimal(0);

//h2
let h2_ziyuan = new Decimal(0);

var h2_cx = "";
var h2_up1 = new Decimal(0);
var h2_up2 = new Decimal(0);
var h2_up3 = new Decimal(0);
var h2_up4 = new Decimal(0);