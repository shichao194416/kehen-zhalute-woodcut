(function () {
"use strict";

const THREE = window.THREE;
if (!THREE) throw new Error("Three.js 未加载");

// First-person museum patterns referenced from the open-source Three.js gallery
// https://github.com/codezeroexe/virtual-art-museum, reworked for this site.
const IMG = "garden-gpt-image-2/image/";

const BASE_WORKS = [
  {
    title: "醉美草原", artist: "陈其木格", medium: "套色木刻", hall: 0,
    img: IMG + "real/work-04-zuimeicaoyuan.jpg",
    desc: "蒙古包、勒勒车与现代汽车出现在同一片草原上。人物围在炉灶旁劳作，远处仍保留着辽阔的地平线，日常生活的温度被木刻的硬边线条稳稳托住。",
    credit: "作品名与作者依据扎鲁特旗《非遗图文展》公开资料。"
  },
  {
    title: "唱不完的歌", artist: "张秀花", medium: "套色木刻", hall: 0,
    img: IMG + "real/work-05-changbuwandege.jpg",
    desc: "画面把赛马、歌舞、摔跤与草原生活组织成多个场景。中央圆形像一只持续转动的舞台，人物、动物和乐器在其中彼此呼应。",
    credit: "作品名与作者依据扎鲁特旗《非遗图文展》公开资料。"
  },
  {
    title: "秋原牧牛", artist: "馆藏原作 · 作者未标注", medium: "套色木刻 · 策展拟名", hall: 0,
    img: IMG + "jarud-years/13-autumn.jpg",
    desc: "一头花牛站在金黄的白桦林前。树干的直线、树冠的点状刀口与牛身的块面形成清楚层次，秋日草原因而显得安静而有重量。画面可理解为对季节轮回与牧野丰足的温和祝愿。",
    credit: "公开图源未标题名；展签使用描述性策展名。"
  },
  {
    title: "双马腾跃", artist: "馆藏原作 · 作者未标注", medium: "套色木刻 · 策展拟名", hall: 0,
    img: IMG + "jarud-years/18-hometown.jpg",
    desc: "一黑一白两匹马前蹄腾空、相向而立。鬃毛用密集短线扬起，身体则保留大块颜色，动势和力量都集中在相互对峙的一瞬间。画面可理解为力量、竞逐与草原生命精神的象征。",
    credit: "公开图源未标题名；展签使用描述性策展名。"
  },

  {
    title: "科尔沁婚礼", artist: "韩戴沁", medium: "套色木刻", hall: 1,
    img: IMG + "real/work-02-keerqinhunli.jpg",
    desc: "婚礼人群围绕中心人物展开，服饰、头饰和边饰被处理成密集而有节奏的色块。画面像一场仍在进行的仪式，人物之间没有真正的空白。",
    credit: "作品名与作者依据扎鲁特旗《非遗图文展》公开资料。"
  },
  {
    title: "幸福生活", artist: "安阿力古娜", medium: "套色木刻", hall: 1,
    img: IMG + "real/work-03-xingfushenghuo.jpg",
    desc: "人物、羊群、飞鸟和飘带共同构成热烈的日常图景。中心被高高举起的婴孩把视线聚拢，周围动作则向四面展开。",
    credit: "作品名与作者依据扎鲁特旗《非遗图文展》公开资料。"
  },
  {
    title: "长绸舞", artist: "馆藏原作 · 作者未标注", medium: "套色木刻 · 策展拟名", hall: 1,
    img: IMG + "jarud-years/23-work-four.jpg",
    desc: "两位舞者挥动长绸，红色线条在人物周围形成密集的背景。绸带的弧线与身体折线交错，使静止画面保留了舞蹈的速度。画面可理解为歌舞把个体连接成共同体的欢腾寓意。",
    credit: "公开图源未标题名；展签使用描述性策展名。"
  },
  {
    title: "红巾持杖", artist: "馆藏原作 · 作者未标注", medium: "套色木刻 · 策展拟名", hall: 1,
    img: IMG + "jarud-years/17-han-dream.jpg",
    desc: "红衣人物斜持长杖，背景以黄色和红色卷云纹展开。人物的正面姿态稳定，放射线与卷云则把画面推向更强的仪式感。画面可理解为守护、信念与族群记忆的象征表达。",
    credit: "公开图源未标题名；展签使用描述性策展名。"
  },

  {
    title: "守望相助", artist: "陈晓燕", medium: "套色木刻", hall: 2,
    img: IMG + "real/work-01-shouwangxiangzhu.jpg",
    desc: "干部与群众围坐交谈，人物衣着和面部以清楚的黑白排线刻画。红色背景让这一日常场景具有纪念性，也保留了木刻的直接力量。",
    credit: "作品名与作者依据扎鲁特旗《非遗图文展》公开资料。"
  },
  {
    title: "草原轻骑兵", artist: "斯琴达来（海纪）", medium: "套色木刻", hall: 2,
    img: IMG + "real/work-06-caoyuanqingqiibing.jpg",
    desc: "舞者在草地上起舞，红色长绸把人物连接起来。前景观众、远处蒙古包与车辆共同交代出当代草原演出的现场。",
    credit: "作品名与作者依据扎鲁特旗《非遗图文展》公开资料。"
  },
  {
    title: "共筑中国梦", artist: "佟金峰", medium: "套色木刻", hall: 2,
    img: IMG + "real/work-08-gongzhuzhongguomeng.jpg",
    desc: "华表、圆月、飞鸟、火箭、高铁和草原人物被组织在同一画面中。传统纹样与现代建设符号并列，呈现地方叙事与国家发展的连接。",
    credit: "作品名与作者依据扎鲁特旗《非遗图文展》公开资料。"
  },
  {
    title: "草原新路", artist: "馆藏原作 · 作者未标注", medium: "套色木刻 · 策展拟名", hall: 2,
    img: IMG + "jarud-years/19-small-stage.jpg",
    desc: "河流穿过草原，蒙古包、牛羊与公路上的车辆同时出现。传统牧场和现代交通被放在同一视野里，形成温和而清楚的时代切面。画面可理解为牧区生活在现代化进程中保持连续性的愿望。",
    credit: "公开图源未标题名；展签使用描述性策展名。"
  },

  {
    title: "朝尔传承", artist: "韩戴沁", medium: "套色木刻", hall: 3,
    img: IMG + "real/work-07-chaoerchuancheng.jpg",
    desc: "人物、服饰与器物以细密刀线组织，边缘纹饰把画面收拢成完整的叙事空间。作品把音乐与传承放进具体的人物关系里。",
    credit: "作品名与作者依据扎鲁特旗《非遗图文展》公开资料。"
  },
  {
    title: "驯马", artist: "馆藏原作 · 作者未标注", medium: "套色木刻 · 策展拟名", hall: 3,
    img: IMG + "jarud-years/09-new-work-a.jpg",
    desc: "骑手与大马在水中周旋，人物和动物的力量方向彼此拉扯。空白水面与密集人马形成对比，刀口把速度留在轮廓线上。画面可理解为人与野性力量从对抗走向驯服的紧张过程。",
    credit: "公开图源未标题名；展签使用描述性策展名。"
  },
  {
    title: "雪原牧马", artist: "馆藏原作 · 作者未标注", medium: "套色木刻 · 策展拟名", hall: 3,
    img: IMG + "jarud-years/11-new-work-c.jpg",
    desc: "雪原、山坡与三匹马构成简洁的横向结构。天空的层线和雪地的留白相互呼应，少量深色块面把寒冷中的体量压住。画面可理解为严寒环境中的耐力、自由与相互陪伴。",
    credit: "公开图源未标题名；展签使用描述性策展名。"
  },
  {
    title: "群羊归牧", artist: "馆藏原作 · 作者未标注", medium: "套色木刻 · 策展拟名", hall: 3,
    img: IMG + "jarud-years/22-new-art.jpg",
    desc: "羊群沿草地铺开，远处山峦、勒勒车和蒙古包逐层退远。大量重复的小刀口让羊毛具有质感，也形成画面细密的呼吸。画面可理解为牧业丰饶、归途秩序与生活安定的寓意。",
    credit: "公开图源未标题名；展签使用描述性策展名。"
  }
];

const HALLS = [
  { no: "01", name: "草原风物", en: "GRASSLAND", center: [0, -22], rotation: 0, accent: 0x2f4540, sign: "草原、季节与牧野生活" },
  { no: "02", name: "民族叙事", en: "NARRATIVE", center: [22, 0], rotation: -Math.PI / 2, accent: 0x4a2d2b, sign: "婚礼、歌舞与人物群像" },
  { no: "03", name: "时代印迹", en: "CHRONICLE", center: [0, 22], rotation: Math.PI, accent: 0x4a3d27, sign: "公共生活与时代现场" },
  { no: "04", name: "木刻语言", en: "FORM", center: [-22, 0], rotation: Math.PI / 2, accent: 0x2e3d4a, sign: "刀口、留白与版画结构" }
];

const EXTRA_IMAGES = [
  ["j01.jpg", "j05.jpg", "j08.jpg", "j11.jpg", "j12.jpg", "j20.jpg", "k10.jpg", "k12.jpg", "k20.jpg", "k23.jpg"],
  ["j06.jpg", "j07.jpg", "j14.jpg", "j16.jpg", "j17.jpg", "j19.jpg", "j21.jpg", "case-y1.jpg", "case-y2.jpg", "case-y3.jpg"],
  ["j02.jpg", "j04.jpg", "j09.jpg", "j10.jpg", "j18.jpg", "j22.jpg", "case-a1.jpg", "case-a2.jpg", "case-a3.jpg", "case-a4.jpg"],
  ["j03.jpg", "j13.jpg", "j15.jpg", "k05.jpg", "k06.jpg", "k07.jpg", "k08.jpg", "k11.jpg", "k13.jpg", "k14.jpg"]
];

const EXTRA_DESCRIPTIONS_BY_FILE = {
  "j01.jpg": "蜿蜒河道穿过深色丘陵，岸边树丛间有一群大雁掠过水面。画面可理解为静谧而带有迁徙意味的草原景象。",
  "j05.jpg": "人物扬臂起舞，头巾与衣袍被风带起，四周层叠云纹包围着低矮屋舍。画面可理解为在强风中舒展生命力与自由精神。",
  "j08.jpg": "雪地白桦林间，两只鹿低头觅食，修长树干与冷暖枝叶形成对照。画面可理解为寂静清寒中透出的温暖与生机。",
  "j11.jpg": "雪原群山间，一人牵牛拉着满载木轮车前行，两只狗随行。画面可理解为寒冷旅途中坚韧、安静而持续的生活力量。",
  "j12.jpg": "棕白马群结伴穿过雪地与白桦林，远处山脊层层退开。画面可理解为对自由、群居和生命耐力的含蓄赞颂。",
  "j20.jpg": "黑底金线中，一位长须老人抱着胡琴拉奏，圆脸孩童在旁随同握弓。画面可理解为民间技艺在祖孙之间温和传递。",
  "k10.jpg": "浓烈红色群山与男子面容叠加，前景人物持枪前行，河流从远处弯过。画面可理解为对牺牲、记忆与土地关系的沉郁表达。",
  "k12.jpg": "细密方格包围中央金色宫殿，鸟兽、纹样和放射线条相互穿插。画面可理解为传统符号共同构成的秩序感与宇宙想象。",
  "k20.jpg": "人物在画面中央拉奏长颈弦乐器，密集羊群围绕四周，黑黄对比强烈。画面可理解为牧人与牲畜彼此依存的宁静寓言。",
  "k23.jpg": "三只羊头并置，羊身轮廓中嵌入高楼、列车、飞机与风力机。画面可理解为传统牧区与现代发展相互交汇的象征。",

  "j06.jpg": "深红背景上，金色点线构成侧脸，右缘散作光点，下方有人举手敬礼。画面可理解为记忆、致敬与逐渐消逝的身影。",
  "j07.jpg": "数名骑马人物张口歌唱，群鸟掠过波浪状天空，橙红线条把人物与草原连成一体。画面可理解为对生命律动的赞颂。",
  "j14.jpg": "中央圆环内有人物持巾、演奏马头琴，四周环绕骑者、骆驼、羊群与毡房。画面可理解为婚礼或节庆生活的象征性呈现。",
  "j16.jpg": "蓝色曲流穿过金黄草原，近处马群涉水，远处丘陵与另一群马遥相呼应。画面可理解为对丰饶、宁静的牧野生活的赞颂。",
  "j17.jpg": "戴头饰的女子闭目立于青绿色调中，飞鸟与卷云围绕四周。画面可理解为对草原女性、族群记忆与精神守望的静穆表达。",
  "j19.jpg": "一位穿蓝色长袍、戴礼帽的男子在展厅侧身观看墙上的镶框版画。画面可理解为观看、回望与文化传递之间的安静时刻。",
  "j21.jpg": "三位华冠飘带的飞天人物凌空持物，下方一绿一红两马在云纹中奔驰。画面可理解为灵动欢腾、超越现实的想象景象。",
  "case-y1.jpg": "黑白木刻中，士兵剪影在强光前敬礼，棕榈树和暗色地面围绕四周。画面可理解为对纪念、守望与崇高精神的含蓄表达。",
  "case-y2.jpg": "数名包头巾、穿横纹衣的男子站在山岩之间，身后同伴与远山构成纵深。画面可理解为团结坚毅、共同迎向艰苦的群像。",
  "case-y3.jpg": "层叠山峦下横跨多孔石拱桥，桥上灯盏点亮，桥下水流以波纹短线展开。画面可理解为幽暗山水间的人间灯火与安宁。",

  "j02.jpg": "众人围聚，一位女子将婴儿高高举起，彩带、羊群与鹅围绕四周。画面可理解为对丰收、团圆与新生喜悦的祝愿。",
  "j04.jpg": "草原上数名骑手围控一匹腾跃的黑马，右侧人物紧拉缰绳。画面可理解为人与野性力量之间的角逐、驯服与相互成就。",
  "j09.jpg": "弯曲河流穿过绿色草场，羊群散布两岸，远处有毡房、红顶房屋与山峦。画面可理解为宁静丰饶的当代牧区生活。",
  "j10.jpg": "辽阔田野上密布细长植物，两只带斑纹的鸟低飞掠过，远处丘陵横亘天际。画面可理解为静谧中蕴含迁徙与季节变化。",
  "j18.jpg": "房舍、栅栏与道路层层交错，马匹、骆驼和羊群散布牧场，车辆与人物点缀其间。画面可理解为牧区日常的质朴秩序。",
  "j22.jpg": "多匹马头紧密挤在一起，笼头与鞍具细节清晰，背景由细密弧线环绕。画面可理解为拥挤、沉默而带有力量感的群像。",
  "case-a1.jpg": "巨大阴影笼罩天际，雪原上成群执旗人物列队前行，牲畜散布其间。画面可理解为人在巨大环境面前渺小却坚韧的跋涉。",
  "case-a2.jpg": "戴厚重毛皮帽的男子面部特写，密集刻线表现风雪生活的粗粝质感。画面可理解为北方生活留下的坚韧与沉静。",
  "case-a3.jpg": "带篷木船停在水面，船头与空中分布着多只鸽子，水边细杆投下倒影。画面可理解为归航、和平与安定生活的寓意。",
  "case-a4.jpg": "群山、云气与河流构成远景，牛群散布草坡，远处出现风力发电机。画面可理解为自然牧歌与现代生活印记的并置。",

  "j03.jpg": "带篷木船停泊岸边，船头与木桩上停着鸽子，空中另有数只展翅飞翔。画面可理解为寄托归航、安宁与和平的意味。",
  "j13.jpg": "蓝绿草地上，一个黄衣孩子蹲在黑狗身旁，上方巨大云团形似羊群。画面可理解为孤独与陪伴交织的梦境。",
  "j15.jpg": "老人面部以粗犷刀刻呈现，皱纹、耳饰与衣纹在密集线条中浮现。画面可理解为岁月、经验与坚韧的沉静象征。",
  "k05.jpg": "戴帽男子侧面像立于窗格前，紫褐色调中可见“坚持持久战”等题字。画面可理解为坚定沉着、充满信念的情绪表达。",
  "k06.jpg": "戴五角星军帽的人物居于画面中央，背景光芒与山峦展开，左下队伍涉水前行。画面可理解为对坚定信念与昂扬精神的描绘。",
  "k07.jpg": "满月、飞鸟、山顶古塔与多孔石桥共同构成远景，桥灯映在水流之间。画面可理解为故乡记忆与宁静悠远意境的交织。",
  "k08.jpg": "披斗篷人物立于高处，身后白色轮廓与持枪人群、战船剪影叠合。画面可理解为对抗争、责任与牺牲精神的象征表达。",
  "k11.jpg": "五名男子立于暗色山岗前，束头巾、缠腰带，前两人昂然挺立。画面可理解为团结、坚毅与共同面对困境的群像。",
  "k13.jpg": "人物戴厚重毛皮帽、着毛领衣，面容以密集线条刻出。画面可理解为北方风雪生活塑造出的坚韧与沧桑之感。",
  "k14.jpg": "戴护耳帽、穿军装的男子胸前挎枪，背景由红黑光芒和象征性符号构成。画面可理解为坚定、昂扬的时代情绪表达。"
};

const EXTRA_DESCRIPTIONS = [
  "画面以草原、牲畜或季节景观为主要对象。近景用重刀压出体量，远景以细线退远；颜色按版分层套印，保留手工对版的轻微偏移。",
  "作品以人物群像、服饰和仪式场景为核心。衣袖、头饰和边饰用不同方向的短刀区分层次，人物关系通过目光与动作连接。",
  "画面把公共生活、生产建设与时代符号组织在同一空间中。叙事依靠块面与刀线推进，前景重、远景轻，形成清楚的阅读顺序。",
  "作品以黑白关系与刀口方向为主要语言。留白承担光，密集排线承担阴影，局部断刀让木板的硬度保留在纸面上。"
];

const WORKS = [];
HALLS.forEach((hall, hallIndex) => {
  BASE_WORKS.filter(work => work.hall === hallIndex).forEach((work, slot) => {
    WORKS.push({ ...work, slot });
  });
  EXTRA_IMAGES[hallIndex].forEach((file, index) => {
    WORKS.push({
      title: "馆藏原作 " + String(index + 5).padStart(2, "0"),
      artist: "作者未标注",
      medium: hallIndex === 3 ? "黑白木刻 · 馆藏图像" : "套色木刻 · 馆藏图像",
      hall: hallIndex,
      slot: index + 4,
      img: IMG + "jarud/" + file,
      desc: EXTRA_DESCRIPTIONS_BY_FILE[file] || EXTRA_DESCRIPTIONS[hallIndex],
      credit: "扎鲁特版画公开图源；原图未标注作品名与作者。"
    });
  });
});

const GALLERY_WEB = IMG + "gallery-web/";
WORKS.forEach((work, index) => {
  work.originalImg = work.img;
  work.img = GALLERY_WEB + String(index + 1).padStart(2, "0") + ".webp";
});

const ROOM_SIZE = 20;
const ROOM_H = 5;
const HALF = ROOM_SIZE / 2;
const WALL_T = 0.26;
const DOOR_HALF = 2.35;
const PLAYER_R = 0.42;

function mulberry(seed) {
  return function random() {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function materialTexture(base, grain, seed, size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const random = mulberry(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 3800; i++) {
    const a = 0.018 + random() * 0.045;
    ctx.fillStyle = grain.replace("ALPHA", a.toFixed(3));
    const r = 0.4 + random() * 2.2;
    ctx.fillRect(random() * size, random() * size, r, r);
  }

  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    ctx.strokeStyle = grain.replace("ALPHA", (0.014 + random() * 0.03).toFixed(3));
    ctx.lineWidth = 0.5 + random() * 1.2;
    let x = random() * size;
    let y = random() * size;
    ctx.moveTo(x, y);
    for (let j = 0; j < 5; j++) {
      x += (random() - 0.5) * 90;
      y += (random() - 0.5) * 45;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function canvasTexture(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d"), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function textPlane(texture, width, height, materialOptions = {}) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      ...materialOptions
    })
  );
}

function makeRoomSign(hall) {
  const texture = canvasTexture(1024, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.fillStyle = "#e9dfcd";
    ctx.font = '500 78px "Noto Serif SC", "Songti SC", serif';
    ctx.fillText(hall.name, w / 2, 100);
    ctx.fillStyle = "rgba(233,223,205,.44)";
    ctx.font = '24px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(hall.sign, w / 2, 151);
    ctx.fillStyle = "rgba(211,161,86,.84)";
    ctx.font = '18px monospace';
    ctx.fillText(hall.no + "  /  " + hall.en, w / 2, 203);
    ctx.fillStyle = "rgba(233,223,205,.18)";
    ctx.fillRect(w / 2 - 160, 184, 320, 1);
  });
  const sign = textPlane(texture, 4.6, 1.15);
  sign.position.set(0, 4.08, -HALF + 0.16);
  return sign;
}

function makeDoorSign(hall) {
  const texture = canvasTexture(768, 180, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.fillStyle = "#eee5d4";
    ctx.font = '500 44px "Noto Serif SC", "Songti SC", serif';
    ctx.fillText(hall.name, w / 2, 73);
    ctx.fillStyle = "rgba(211,161,86,.78)";
    ctx.font = '18px monospace';
    ctx.fillText(hall.no + "  " + hall.en, w / 2, 117);
  });
  return textPlane(texture, 2.55, 0.6);
}

function makePortalBannerTexture(hall, index) {
  const colors = ["#45665c", "#794744", "#76603b", "#3f617a"];
  return canvasTexture(360, 980, (ctx, w, h) => {
    ctx.fillStyle = colors[index];
    ctx.fillRect(0, 0, w, h);
    const wash = ctx.createLinearGradient(0, 0, w, h);
    wash.addColorStop(0, "rgba(255,244,225,.12)");
    wash.addColorStop(0.5, "rgba(0,0,0,.04)");
    wash.addColorStop(1, "rgba(0,0,0,.2)");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(220,181,108,.72)";
    ctx.lineWidth = 3;
    ctx.strokeRect(16, 16, w - 32, h - 32);
    ctx.strokeStyle = "rgba(220,181,108,.28)";
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, w - 56, h - 56);

    ctx.strokeStyle = "rgba(236,221,194,.5)";
    ctx.lineWidth = 3;
    if (index === 0) {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(w / 2, 185 + i * 24, 48 - i * 8, 0, Math.PI * 1.45);
        ctx.stroke();
      }
    } else if (index === 1) {
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(68, 130 + i * 28);
        ctx.bezierCurveTo(130, 80 + i * 28, 230, 190 + i * 28, 292, 135 + i * 28);
        ctx.stroke();
      }
    } else if (index === 2) {
      ctx.beginPath();
      ctx.moveTo(54, 230);
      ctx.lineTo(112, 154);
      ctx.lineTo(164, 218);
      ctx.lineTo(222, 122);
      ctx.lineTo(306, 230);
      ctx.stroke();
    } else {
      for (let i = 0; i < 3; i++) {
        ctx.strokeRect(82 + i * 34, 128 + i * 22, 120, 120);
      }
    }

    ctx.fillStyle = "#efe4ce";
    ctx.textAlign = "center";
    ctx.font = '500 58px "Noto Serif SC", "Songti SC", serif';
    const chars = hall.name.split("");
    chars.forEach((char, i) => ctx.fillText(char, w / 2, 350 + i * 82));

    ctx.fillStyle = "rgba(225,190,120,.84)";
    ctx.font = "20px monospace";
    ctx.fillText(hall.no, w / 2, 804);
    ctx.fillStyle = "rgba(239,228,206,.56)";
    ctx.font = "14px monospace";
    ctx.fillText(hall.en, w / 2, 838);
  });
}

function makePortalBlockTexture(hall, index) {
  return canvasTexture(320, 220, (ctx, w, h) => {
    ctx.fillStyle = "#201a14";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(212,174,105,.58)";
    ctx.lineWidth = 5;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.strokeStyle = "rgba(234,222,200,.65)";
    ctx.lineWidth = 3;
    if (index === 0) {
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(160, 110, 34 + i * 15, Math.PI * 0.08, Math.PI * 1.2);
        ctx.stroke();
      }
    } else if (index === 1) {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(45, 58 + i * 32);
        ctx.bezierCurveTo(110, 22 + i * 32, 210, 98 + i * 32, 275, 58 + i * 32);
        ctx.stroke();
      }
    } else if (index === 2) {
      ctx.beginPath();
      ctx.moveTo(30, 168);
      ctx.lineTo(100, 80);
      ctx.lineTo(155, 145);
      ctx.lineTo(230, 52);
      ctx.lineTo(290, 168);
      ctx.stroke();
    } else {
      for (let i = 0; i < 3; i++) ctx.strokeRect(72 + i * 28, 48 + i * 22, 112, 112);
    }
    ctx.fillStyle = "rgba(220,181,108,.78)";
    ctx.font = "18px monospace";
    ctx.textAlign = "center";
    ctx.fillText(hall.no + " / " + hall.en, w / 2, 196);
  });
}

function makeCenterPlaqueTexture(hall, subtitle) {
  return canvasTexture(900, 220, (ctx, w, h) => {
    ctx.fillStyle = "#151411";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(205,164,95,.62)";
    ctx.lineWidth = 4;
    ctx.strokeRect(7, 7, w - 14, h - 14);
    ctx.textAlign = "center";
    ctx.fillStyle = "#eee4d0";
    ctx.font = '500 48px "Noto Serif SC", "Songti SC", serif';
    ctx.fillText(hall.name, w / 2, 88);
    ctx.fillStyle = "rgba(225,211,187,.55)";
    ctx.font = "22px \"Noto Sans SC\", \"Microsoft YaHei\", sans-serif";
    ctx.fillText(subtitle, w / 2, 134);
    ctx.fillStyle = "rgba(210,168,94,.72)";
    ctx.font = "16px monospace";
    ctx.fillText(hall.no + " / " + hall.en, w / 2, 180);
  });
}

function makeDisplayCardTexture(title, subtitle, kind, background = "#e6dfd2") {
  return canvasTexture(360, 480, (ctx, w, h) => {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(27,23,18,.15)";
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, w - 24, h - 24);
    ctx.strokeStyle = "#1d1914";
    ctx.fillStyle = "#1d1914";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (kind % 4 === 0) {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(180, 170, 68 + i * 17, Math.PI * 0.08, Math.PI * 1.15);
        ctx.stroke();
      }
    } else if (kind % 4 === 1) {
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(52, 110 + i * 29);
        ctx.bezierCurveTo(118, 62 + i * 29, 235, 180 + i * 29, 306, 112 + i * 29);
        ctx.stroke();
      }
    } else if (kind % 4 === 2) {
      ctx.beginPath();
      ctx.moveTo(38, 250);
      ctx.lineTo(112, 145);
      ctx.lineTo(175, 225);
      ctx.lineTo(250, 105);
      ctx.lineTo(326, 250);
      ctx.stroke();
    } else {
      for (let i = 0; i < 3; i++) ctx.strokeRect(78 + i * 33, 96 + i * 26, 148, 148);
    }
    ctx.fillStyle = "#1b1712";
    ctx.font = '500 25px "Noto Serif SC", "Songti SC", serif';
    ctx.textAlign = "center";
    ctx.fillText(title, w / 2, 338);
    ctx.fillStyle = "rgba(27,23,18,.55)";
    ctx.font = "16px \"Noto Sans SC\", \"Microsoft YaHei\", sans-serif";
    ctx.fillText(subtitle, w / 2, 374);
  });
}

function makeHistoryCardTexture(year, title) {
  return canvasTexture(300, 420, (ctx, w, h) => {
    ctx.fillStyle = "#171511";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(208,167,94,.5)";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.textAlign = "center";
    ctx.fillStyle = "#e9dcc4";
    ctx.font = "600 64px monospace";
    ctx.fillText(year, w / 2, 116);
    ctx.strokeStyle = "rgba(208,167,94,.45)";
    ctx.beginPath();
    ctx.moveTo(48, 149);
    ctx.lineTo(252, 149);
    ctx.stroke();
    ctx.fillStyle = "rgba(235,222,200,.74)";
    ctx.font = '24px "Noto Serif SC", "Songti SC", serif';
    const chars = title.split("");
    const lines = [];
    for (let i = 0; i < chars.length; i += 7) lines.push(chars.slice(i, i + 7).join(""));
    lines.forEach((line, i) => ctx.fillText(line, w / 2, 210 + i * 38));
  });
}

function makeCarvedTopTexture() {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#6c4d2f");
    gradient.addColorStop(0.5, "#8a6842");
    gradient.addColorStop(1, "#513720");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 34; i++) {
      ctx.strokeStyle = "rgba(35,20,10,.22)";
      ctx.lineWidth = 1 + i % 3;
      ctx.beginPath();
      ctx.moveTo(0, 16 + i * 15);
      ctx.bezierCurveTo(260, 4 + i * 15, 620, 40 + i * 15, w, 12 + i * 15);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(245,224,185,.42)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(170, 350);
    ctx.bezierCurveTo(300, 120, 500, 410, 650, 180);
    ctx.bezierCurveTo(750, 70, 850, 330, 930, 205);
    ctx.stroke();
    ctx.strokeStyle = "rgba(25,15,8,.8)";
    ctx.lineWidth = 10;
    ctx.stroke();
  });
}

function makeGrooveTexture(type) {
  return canvasTexture(280, 200, (ctx, w, h) => {
    ctx.fillStyle = "#6a4b2d";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#24160d";
    ctx.lineWidth = type === 2 ? 9 : type === 1 ? 7 : 4;
    ctx.lineCap = "round";
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      const y = 42 + i * 38;
      ctx.moveTo(28, y);
      if (type === 1) {
        ctx.bezierCurveTo(95, y - 18, 150, y + 18, 250, y);
      } else if (type === 2) {
        ctx.quadraticCurveTo(140, y - 16, 250, y + 4);
      } else {
        ctx.lineTo(250, y);
      }
      ctx.stroke();
    }
  });
}

function makePlaque(work) {
  const texture = canvasTexture(600, 180, (ctx, w, h) => {
    ctx.fillStyle = "#12110f";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(212,174,105,.36)";
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, w - 8, h - 8);
    ctx.textAlign = "center";
    ctx.fillStyle = "#e4d6bc";
    ctx.font = '500 35px "Noto Serif SC", "Songti SC", serif';
    ctx.fillText(work.title.slice(0, 12), w / 2, 70);
    ctx.fillStyle = "rgba(230,219,199,.48)";
    ctx.font = '20px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText((work.artist + " · " + work.medium).slice(0, 28), w / 2, 116);
    ctx.fillStyle = "rgba(211,161,86,.46)";
    ctx.font = '13px monospace';
    ctx.fillText("ZHALUTE WOODCUT", w / 2, 148);
  });
  return new THREE.Mesh(
    new THREE.PlaneGeometry(0.78, 0.234),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false })
  );
}

function makeMedallion() {
  const texture = canvasTexture(1024, 1024, (ctx, w, h) => {
    const cx = w / 2, cy = h / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.translate(cx, cy);
    ctx.strokeStyle = "rgba(205,164,95,.42)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 390, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(205,164,95,.2)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 342, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 24; i++) {
      ctx.rotate(Math.PI * 2 / 24);
      ctx.beginPath();
      ctx.moveTo(0, -350);
      ctx.lineTo(0, -318);
      ctx.strokeStyle = "rgba(205,164,95,.3)";
      ctx.stroke();
    }
    ctx.rotate(-Math.PI * 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(235,224,203,.78)";
    ctx.font = '500 88px "Noto Serif SC", "Songti SC", serif';
    ctx.fillText("版上草原", 0, -6);
    ctx.fillStyle = "rgba(207,165,94,.58)";
    ctx.font = '22px monospace';
    ctx.fillText("PRINTS ON THE GRASSLAND", 0, 55);
  });
  const mesh = new THREE.Mesh(
    new THREE.CircleGeometry(3.15, 96),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.026;
  return mesh;
}

function initGallery(root, options = {}) {
  const app = root.querySelector("#galApp");
  const canvas = root.querySelector("#galCanvas");
  const entry = root.querySelector("#galEntry");
  const enterButton = root.querySelector("#galEnter");
  const roomLabel = root.querySelector("#galRoom");
  const crosshair = root.querySelector("#galCrosshair");
  const targetTip = root.querySelector("#galTarget");
  const mapDot = root.querySelector("#galMapDot");
  const mapRooms = [...root.querySelectorAll(".gal-map-room")];
  const detail = root.querySelector("#galDetail");
  const detailClose = root.querySelector("#galDetailClose");
  const detailImg = root.querySelector("#galDetailImg");
  const detailNo = root.querySelector("#galDetailNo");
  const detailTitle = root.querySelector("#galDetailTitle");
  const detailMeta = root.querySelector("#galDetailMeta");
  const detailDesc = root.querySelector("#galDetailDesc");
  const detailCredit = root.querySelector("#galDetailCredit");
  const exitConfirm = root.querySelector("#galExitConfirm");
  const exitStay = root.querySelector("#galExitStay");
  const exitLeave = root.querySelector("#galExitLeave");
  const errorBox = root.querySelector("#galError");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07090a);
  scene.fog = new THREE.FogExp2(0x07090a, 0.011);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.65));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.46;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const camera = new THREE.PerspectiveCamera(72, 1, 0.08, 95);
  camera.rotation.order = "YXZ";
  camera.position.set(0, 1.66, 0);
  let yaw = 0;
  let pitch = 0;
  let targetYaw = 0;
  let targetPitch = 0;

  const clock = new THREE.Clock();
  const keys = Object.create(null);
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const raycaster = new THREE.Raycaster();
  const centerNdc = new THREE.Vector2(0, 0);
  const pickables = [];
  const textureLoader = new THREE.TextureLoader();
  const roomGroups = [];
  const blockers = [];

  let disposed = false;
  let started = false;
  let detailOpen = false;
  let confirmOpen = false;
  let ready = false;
  let hovered = null;
  let currentHall = -1;
  let drag = null;
  let raf = 0;
  let bob = 0;
  let playerY = 1.66;
  let verticalVelocity = 0;
  let grounded = true;
  let exitLock = false;
  const pointerState = { hasLast: false, lastX: 0, lastY: 0 };

  const floorTexture = materialTexture("#585956", "rgba(232,222,201,ALPHA)", 19, 512);
  floorTexture.repeat.set(13, 13);
  const wallTexture = materialTexture("#746f66", "rgba(244,235,218,ALPHA)", 32, 512);
  wallTexture.repeat.set(3.2, 1.2);

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture, color: 0xffffff, roughness: 0.48, metalness: 0.18
  });
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTexture, color: 0xffffff, roughness: 0.92, metalness: 0
  });
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0x393936, roughness: 0.96, metalness: 0
  });
  const trimMaterial = new THREE.MeshStandardMaterial({
    color: 0x161310, roughness: 0.42, metalness: 0.32
  });
  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0x9f7b3f, roughness: 0.38, metalness: 0.66
  });
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x241b13, roughness: 0.5, metalness: 0.14
  });
  const matMaterial = new THREE.MeshStandardMaterial({
    color: 0xd7d0c2, roughness: 1, metalness: 0
  });
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xbdd3d4,
    transparent: true,
    opacity: 0.18,
    roughness: 0.06,
    metalness: 0.02,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const glassTopMaterial = glassMaterial.clone();
  glassTopMaterial.opacity = 0.12;
  const glowTexture = canvasTexture(256, 256, (ctx, w, h) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w / 2);
    gradient.addColorStop(0, "rgba(255,221,169,.72)");
    gradient.addColorStop(0.42, "rgba(255,211,148,.22)");
    gradient.addColorStop(1, "rgba(255,205,130,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  });
  const shadowTexture = canvasTexture(256, 256, (ctx, w, h) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, w * 0.18, w / 2, h / 2, w * 0.5);
    gradient.addColorStop(0, "rgba(0,0,0,.58)");
    gradient.addColorStop(0.62, "rgba(0,0,0,.24)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  });

  function box(width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  }

  function localBox(group, width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  function addFloor() {
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(76, 76), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);
    scene.add(makeMedallion());
  }

  function addCentralHall() {
    const length = 18;
    const half = length / 2;
    const gap = DOOR_HALF;
    const segment = half - gap;
    const segmentCenter = gap + segment / 2;
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(length, length), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = ROOM_H;
    scene.add(ceiling);

    box(segment, ROOM_H, WALL_T, wallMaterial, -segmentCenter, ROOM_H / 2, -half);
    box(segment, ROOM_H, WALL_T, wallMaterial, segmentCenter, ROOM_H / 2, -half);
    box(gap * 2, ROOM_H - 3.15, WALL_T, wallMaterial, 0, 3.15 + (ROOM_H - 3.15) / 2, -half);

    box(segment, ROOM_H, WALL_T, wallMaterial, -segmentCenter, ROOM_H / 2, half);
    box(segment, ROOM_H, WALL_T, wallMaterial, segmentCenter, ROOM_H / 2, half);
    box(gap * 2, ROOM_H - 3.15, WALL_T, wallMaterial, 0, 3.15 + (ROOM_H - 3.15) / 2, half);

    box(WALL_T, ROOM_H, segment, wallMaterial, -half, ROOM_H / 2, -segmentCenter);
    box(WALL_T, ROOM_H, segment, wallMaterial, -half, ROOM_H / 2, segmentCenter);
    box(WALL_T, ROOM_H - 3.15, gap * 2, wallMaterial, -half, 3.15 + (ROOM_H - 3.15) / 2, 0);

    box(WALL_T, ROOM_H, segment, wallMaterial, half, ROOM_H / 2, -segmentCenter);
    box(WALL_T, ROOM_H, segment, wallMaterial, half, ROOM_H / 2, segmentCenter);
    box(WALL_T, ROOM_H - 3.15, gap * 2, wallMaterial, half, 3.15 + (ROOM_H - 3.15) / 2, 0);

    const columnGeo = new THREE.CylinderGeometry(0.18, 0.22, ROOM_H, 18);
    for (const x of [-gap - 0.18, gap + 0.18]) {
      for (const z of [-half + 0.06, half - 0.06]) {
        const column = new THREE.Mesh(columnGeo, trimMaterial);
        column.position.set(x, ROOM_H / 2, z);
        scene.add(column);
      }
    }
    for (const z of [-gap - 0.18, gap + 0.18]) {
      for (const x of [-half + 0.06, half - 0.06]) {
        const column = new THREE.Mesh(columnGeo, trimMaterial);
        column.position.set(x, ROOM_H / 2, z);
        scene.add(column);
      }
    }

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(3.32, 3.38, 112),
      new THREE.MeshBasicMaterial({ color: 0xb08a4a, transparent: true, opacity: 0.44, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.03;
    scene.add(ring);

    for (let i = 0; i < 4; i++) {
      const hall = HALLS[i];
      const sign = makeDoorSign(hall);
      const length = Math.hypot(hall.center[0], hall.center[1]);
      const nx = hall.center[0] / length;
      const nz = hall.center[1] / length;
      sign.position.y = 4.18;
      sign.position.x = nx * (half - 0.14);
      sign.position.z = nz * (half - 0.14);
      sign.rotation.y = Math.atan2(-nx, -nz);
      scene.add(sign);
    }

    const chandelier = new THREE.PointLight(0xffd9a5, 160, 25, 1.7);
    chandelier.position.set(0, 4.35, 0);
    scene.add(chandelier);

    const ringLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffc878 });
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), ringLightMaterial);
      bulb.position.set(Math.cos(angle) * 2.2, 4.72, Math.sin(angle) * 2.2);
      scene.add(bulb);
    }
  }

  function addPortalDecorations() {
    HALLS.forEach((hall, index) => {
      const length = Math.hypot(hall.center[0], hall.center[1]);
      const nx = hall.center[0] / length;
      const nz = hall.center[1] / length;
      const group = new THREE.Group();
      group.position.set(nx * 8.96, 0, nz * 8.96);
      group.rotation.y = Math.atan2(-nx, -nz);
      scene.add(group);

      const bannerTexture = makePortalBannerTexture(hall, index);
      const blockTexture = makePortalBlockTexture(hall, index);
      const bannerMaterial = new THREE.MeshBasicMaterial({
        map: bannerTexture, side: THREE.DoubleSide, transparent: true
      });
      const blockMaterial = new THREE.MeshStandardMaterial({
        color: 0x5b3b22, roughness: 0.44, metalness: 0.12
      });
      const blockFaceMaterial = new THREE.MeshBasicMaterial({
        map: blockTexture, side: THREE.DoubleSide
      });
      const runnerMaterial = new THREE.MeshStandardMaterial({
        color: hall.accent, roughness: 0.92, metalness: 0
      });

      for (const side of [-1, 1]) {
        const banner = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 2.56), bannerMaterial);
        banner.name = "portal-banner-" + index + "-" + side;
        banner.position.set(side * 2.92, 2.5, 0.38);
        banner.castShadow = true;
        group.add(banner);

        localBox(group, 1.05, 0.055, 0.09, brassMaterial, side * 2.92, 3.81, 0.38);
        localBox(group, 1.05, 0.055, 0.09, brassMaterial, side * 2.92, 1.19, 0.38);

        const pedestal = localBox(group, 0.78, 0.74, 0.54, matMaterial, side * 2.92, 0.37, 0.78);
        pedestal.name = "portal-pedestal-" + index + "-" + side;
        localBox(group, 0.66, 0.09, 0.46, brassMaterial, side * 2.92, 0.76, 0.78);
        const block = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.32, 0.26), blockMaterial);
        block.name = "portal-block-" + index + "-" + side;
        block.position.set(side * 2.92, 0.93, 0.79);
        block.castShadow = true;
        group.add(block);
        const blockFace = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.27), blockFaceMaterial);
        blockFace.position.set(side * 2.92, 0.93, 0.933);
        group.add(blockFace);
      }

      const runner = new THREE.Mesh(new THREE.PlaneGeometry(4.7, 1.3), runnerMaterial);
      runner.rotation.x = -Math.PI / 2;
      runner.position.set(0, 0.026, 0.72);
      runner.receiveShadow = true;
      group.add(runner);

      const runnerEdge = new THREE.Mesh(
        new THREE.PlaneGeometry(4.82, 0.045),
        new THREE.MeshBasicMaterial({ color: 0xb08a4a, transparent: true, opacity: 0.54 })
      );
      runnerEdge.rotation.x = -Math.PI / 2;
      runnerEdge.position.set(0, 0.029, 1.37);
      group.add(runnerEdge);
    });
  }

  function addCenterpiece(hall, group, index) {
    const subtitles = [
      "草原色卡 · 木刻原版 · 四种套色印样",
      "飘带 · 盘肠 · 卷草",
      "1956 — 2025",
      "木板剖面 · 三刀法 · 刀痕试片"
    ];
    const stone = new THREE.MeshStandardMaterial({
      color: 0x5d5d59, roughness: 0.58, metalness: 0.08
    });
    const lightStone = new THREE.MeshStandardMaterial({
      color: 0xb9b3a7, roughness: 0.66, metalness: 0.03
    });
    const ink = new THREE.MeshStandardMaterial({
      color: 0x181512, roughness: 0.72, metalness: 0.05
    });
    const wood = new THREE.MeshStandardMaterial({
      color: 0x624426, roughness: 0.55, metalness: 0.03
    });

    const plaqueTexture = makeCenterPlaqueTexture(hall, subtitles[index]);
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(2.15, 0.52),
      new THREE.MeshBasicMaterial({ map: plaqueTexture, side: THREE.DoubleSide })
    );
    plaque.position.set(0, 0.64, 2.58);
    plaque.rotation.x = -0.22;
    group.add(plaque);

    const centerLight = new THREE.SpotLight(0xffd8a6, 175, 10, Math.PI / 4.2, 0.9, 1.8);
    centerLight.position.set(0, 4.35, 0);
    centerLight.target.position.set(0, 0, 0);
    group.add(centerLight);
    group.add(centerLight.target);

    if (index === 0) {
      const table = new THREE.Mesh(new THREE.CylinderGeometry(2.08, 2.16, 0.28, 64), stone);
      table.position.y = 0.14;
      table.receiveShadow = true;
      group.add(table);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(2.04, 2.04, 0.035, 64), lightStone);
      top.position.y = 0.295;
      group.add(top);

      const block = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.13, 0.68), wood);
      block.position.set(0, 0.39, 0);
      block.rotation.y = -0.17;
      block.castShadow = true;
      group.add(block);
      const blockTop = new THREE.Mesh(
        new THREE.PlaneGeometry(0.94, 0.6),
        new THREE.MeshBasicMaterial({ map: makeCarvedTopTexture(), side: THREE.DoubleSide })
      );
      blockTop.rotation.x = -Math.PI / 2;
      blockTop.position.set(0, 0.46, 0);
      group.add(blockTop);

      const sampleNames = [["云纹", "黑 · 赭"], ["山纹", "青 · 灰"], ["牧野", "绿 · 金"], ["人物", "朱 · 墨"]];
      const sampleColors = ["#d9cdb9", "#cfd8d2", "#d8d2b6", "#ead2c5"];
      for (let i = 0; i < 4; i++) {
        const angle = i / 4 * Math.PI * 2;
        const card = new THREE.Mesh(
          new THREE.PlaneGeometry(0.52, 0.7),
          new THREE.MeshBasicMaterial({
            map: makeDisplayCardTexture(sampleNames[i][0], sampleNames[i][1], i, sampleColors[i]),
            side: THREE.DoubleSide
          })
        );
        card.rotation.x = -Math.PI / 2;
        card.rotation.z = angle;
        card.position.set(Math.sin(angle) * 1.36, 0.318, Math.cos(angle) * 1.36);
        group.add(card);
      }

      const swatches = [
        ["草原绿", "#3f6958"], ["赭土", "#9b6947"],
        ["朱砂", "#b34532"], ["墨黑", "#171513"]
      ];
      swatches.forEach(([label, color], i) => {
        const angle = i / 4 * Math.PI * 2 + Math.PI / 4;
        const texture = canvasTexture(240, 110, (ctx, w, h) => {
          ctx.fillStyle = "#eee7da";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = color;
          ctx.fillRect(12, 12, 82, h - 24);
          ctx.fillStyle = "#201b16";
          ctx.font = '28px "Noto Serif SC", "Songti SC", serif';
          ctx.fillText(label, 111, 58);
          ctx.font = "15px monospace";
          ctx.fillStyle = "rgba(32,27,22,.55)";
          ctx.fillText(color.toUpperCase(), 111, 82);
        });
        const swatch = new THREE.Mesh(
          new THREE.PlaneGeometry(0.65, 0.3),
          new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
        );
        swatch.rotation.x = -Math.PI / 2;
        swatch.rotation.z = -angle;
        swatch.position.set(Math.sin(angle) * 1.82, 0.32, Math.cos(angle) * 1.82);
        group.add(swatch);
      });
    }

    if (index === 1) {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.55, 0.18, 64), stone);
      base.position.y = 0.09;
      group.add(base);
      const inner = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.08, 0.45, 48), ink);
      inner.position.y = 0.315;
      group.add(inner);
      const topRing = new THREE.Mesh(new THREE.TorusGeometry(1.66, 0.035, 10, 72), brassMaterial);
      topRing.rotation.x = Math.PI / 2;
      topRing.position.y = 2.24;
      group.add(topRing);
      const lowerRing = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.022, 8, 64), brassMaterial);
      lowerRing.rotation.x = Math.PI / 2;
      lowerRing.position.y = 0.32;
      group.add(lowerRing);
      for (let i = 0; i < 6; i++) {
        const angle = i / 6 * Math.PI * 2;
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 2.02, 10), brassMaterial);
        post.position.set(Math.sin(angle) * 1.62, 1.17, Math.cos(angle) * 1.62);
        group.add(post);
      }

      const motifs = [
        ["飘带纹", "连续弧线", 1], ["盘肠纹", "回环穿插", 3],
        ["卷草纹", "卷曲生长", 0], ["衣纹", "折转排线", 2],
        ["云纹", "层叠云头", 0], ["水波", "同向波线", 1],
        ["山纹", "山脊折线", 2], ["回纹", "直角连续", 3]
      ];
      motifs.forEach(([title, subtitle, kind], i) => {
        const angle = i / motifs.length * Math.PI * 2;
        const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.45, 6), brassMaterial);
        cord.position.set(Math.sin(angle) * 1.62, 2.02, Math.cos(angle) * 1.62);
        group.add(cord);
        const card = new THREE.Mesh(
          new THREE.PlaneGeometry(0.33, 0.52),
          new THREE.MeshBasicMaterial({
            map: makeDisplayCardTexture(title, subtitle, kind, "#ddd4c4"),
            side: THREE.DoubleSide
          })
        );
        card.position.set(Math.sin(angle) * 1.62, 1.57, Math.cos(angle) * 1.62);
        card.rotation.y = angle;
        group.add(card);
      });
      const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.86, 0.16, 32), lightStone);
      topCap.position.y = 0.55;
      group.add(topCap);
    }

    if (index === 2) {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(2.28, 2.38, 0.2, 72), stone);
      base.position.y = 0.1;
      group.add(base);
      const surface = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.035, 72), lightStone);
      surface.position.y = 0.218;
      group.add(surface);
      const track = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.035, 10, 96), brassMaterial);
      track.rotation.x = Math.PI / 2;
      track.position.y = 0.245;
      group.add(track);

      const timeline = [
        ["1956", "《放学途中》"], ["1962", "《在新建的俱乐部里》"],
        ["1986", "版画之乡报道"], ["2008", "自治区级非遗"],
        ["2017", "旗版画院成立"], ["2025", "新华社专题报道"]
      ];
      timeline.forEach(([year, title], i) => {
        const angle = i / timeline.length * Math.PI * 2;
        const marker = new THREE.Group();
        marker.position.set(Math.sin(angle) * 1.72, 0, Math.cos(angle) * 1.72);
        marker.rotation.y = angle;
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.38, 0.22), ink);
        plinth.position.y = 0.41;
        marker.add(plinth);
        const card = new THREE.Mesh(
          new THREE.PlaneGeometry(0.29, 0.42),
          new THREE.MeshBasicMaterial({
            map: makeHistoryCardTexture(year, title),
            side: THREE.DoubleSide
          })
        );
        card.position.set(0, 0.76, 0.12);
        card.rotation.x = -0.08;
        marker.add(card);
        group.add(marker);
      });

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.82, 32), ink);
      hub.position.y = 0.62;
      group.add(hub);
      const yearPlate = new THREE.Mesh(
        new THREE.PlaneGeometry(0.9, 0.26),
        new THREE.MeshBasicMaterial({
          map: canvasTexture(600, 170, (ctx, w, h) => {
            ctx.fillStyle = "#171511";
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = "rgba(208,167,94,.6)";
            ctx.strokeRect(6, 6, w - 12, h - 12);
            ctx.fillStyle = "#eadcc5";
            ctx.textAlign = "center";
            ctx.font = "46px monospace";
            ctx.fillText("1956 — 2025", w / 2, 105);
          }),
          side: THREE.DoubleSide
        })
      );
      yearPlate.position.set(0, 0.74, 0.34);
      group.add(yearPlate);
    }

    if (index === 3) {
      const table = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.3, 2.25), stone);
      table.position.y = 0.15;
      table.receiveShadow = true;
      group.add(table);
      const slab = new THREE.Mesh(new THREE.BoxGeometry(2.82, 0.24, 1.22), wood);
      slab.position.set(0, 0.44, -0.35);
      slab.castShadow = true;
      group.add(slab);
      const carvedTop = new THREE.Mesh(
        new THREE.PlaneGeometry(2.7, 1.1),
        new THREE.MeshBasicMaterial({ map: makeCarvedTopTexture(), side: THREE.DoubleSide })
      );
      carvedTop.rotation.x = -Math.PI / 2;
      carvedTop.position.set(0, 0.565, -0.35);
      group.add(carvedTop);

      const knifeData = [
        ["三角刀", "V 形深线", 0], ["圆刀", "U 形圆线", 1], ["平刀", "宽面铲除", 2]
      ];
      const metal = new THREE.MeshStandardMaterial({
        color: 0xb8b9b5, roughness: 0.28, metalness: 0.82
      });
      const metalDark = new THREE.MeshStandardMaterial({
        color: 0x575a58, roughness: 0.42, metalness: 0.68
      });
      knifeData.forEach(([name, note, type], i) => {
        const x = (i - 1) * 1.25;
        const knife = new THREE.Group();
        knife.position.set(x, 0.73, 0.84);
        knife.scale.setScalar(1);
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.058, 0.54, 16), wood);
        handle.rotation.z = Math.PI / 2;
        handle.position.x = -0.27;
        knife.add(handle);
        const butt = new THREE.Mesh(new THREE.SphereGeometry(0.066, 18, 12), wood);
        butt.position.x = -0.555;
        knife.add(butt);
        const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.09, 16), metalDark);
        ferrule.rotation.z = Math.PI / 2;
        ferrule.position.x = 0.01;
        knife.add(ferrule);
        const shank = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.045, 0.062), metal);
        shank.position.x = 0.15;
        knife.add(shank);
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.065, 16), metalDark);
        collar.rotation.z = Math.PI / 2;
        collar.position.x = 0.305;
        knife.add(collar);
        let blade;
        if (type === 0) {
          blade = new THREE.Mesh(
            new THREE.CylinderGeometry(0.012, 0.09, 0.24, 3, 1, false),
            metal
          );
          blade.rotation.z = -Math.PI / 2;
          blade.rotation.x = Math.PI / 6;
          blade.position.x = 0.46;
        } else if (type === 1) {
          blade = new THREE.Mesh(
            new THREE.CylinderGeometry(0.052, 0.084, 0.24, 24, 1, true, 0, Math.PI),
            metal
          );
          blade.rotation.z = -Math.PI / 2;
          blade.rotation.x = Math.PI;
          blade.position.x = 0.46;
          const trough = new THREE.Mesh(
            new THREE.CylinderGeometry(0.038, 0.064, 0.2, 16, 1, true, 0, Math.PI),
            metalDark
          );
          trough.rotation.z = -Math.PI / 2;
          trough.rotation.x = Math.PI;
          trough.scale.set(1, 1, 0.84);
          trough.position.set(0.45, -0.014, 0);
          knife.add(trough);
        } else {
          blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.24, 0.035, 0.17),
            metal
          );
          blade.position.x = 0.46;
          const bevel = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.018, 0.17), metalDark);
          bevel.rotation.z = -0.2;
          bevel.position.set(0.565, 0.002, 0);
          knife.add(bevel);
        }
        knife.add(blade);
        const label = new THREE.Mesh(
          new THREE.PlaneGeometry(0.96, 0.33),
          new THREE.MeshBasicMaterial({
            map: canvasTexture(560, 190, (ctx, w, h) => {
              ctx.fillStyle = "#16130f";
              ctx.fillRect(0, 0, w, h);
              ctx.strokeStyle = "rgba(208,167,94,.52)";
              ctx.lineWidth = 3;
              ctx.strokeRect(5, 5, w - 10, h - 10);
              ctx.strokeStyle = "#c3c5c1";
              ctx.fillStyle = "rgba(195,197,193,.15)";
              ctx.lineWidth = 6;
              ctx.lineCap = "round";
              ctx.beginPath();
              if (type === 0) {
                ctx.moveTo(44, 54);
                ctx.lineTo(92, 136);
                ctx.lineTo(140, 54);
              } else if (type === 1) {
                ctx.moveTo(44, 54);
                ctx.lineTo(44, 108);
                ctx.quadraticCurveTo(92, 160, 140, 108);
                ctx.lineTo(140, 54);
              } else {
                ctx.moveTo(44, 94);
                ctx.lineTo(140, 94);
              }
              ctx.stroke();
              ctx.fillStyle = "#e9ddc7";
              ctx.textAlign = "left";
              ctx.font = '25px "Noto Serif SC", "Songti SC", serif';
              ctx.fillText(name, 178, 78);
              ctx.fillStyle = "rgba(230,214,188,.5)";
              ctx.font = "17px monospace";
              ctx.fillText(note, 178, 112);
              ctx.fillStyle = "rgba(208,167,94,.55)";
              ctx.font = "14px monospace";
              ctx.fillText("END PROFILE", 178, 142);
            }),
            side: THREE.DoubleSide
          })
        );
        label.rotation.x = -0.2;
        label.position.set(x, 0.57, 1.18);
        group.add(label);
        group.add(knife);

        const sample = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.09, 0.48), wood);
        sample.position.set(x, 0.39, -1.0);
        group.add(sample);
        const sampleTop = new THREE.Mesh(
          new THREE.PlaneGeometry(0.7, 0.44),
          new THREE.MeshBasicMaterial({ map: makeGrooveTexture(type), side: THREE.DoubleSide })
        );
        sampleTop.rotation.x = -Math.PI / 2;
        sampleTop.position.set(x, 0.44, -1.0);
        group.add(sampleTop);
      });
    }

    if (index === 3) {
      const width = 4.05;
      const height = 1.62;
      const depth = 2.46;
      const glass = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), glassMaterial);
      glass.position.y = height / 2;
      glass.renderOrder = 6;
      group.add(glass);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(width, height, depth)),
        new THREE.LineBasicMaterial({ color: 0xc2a56e, transparent: true, opacity: 0.72 })
      );
      edges.position.y = height / 2;
      group.add(edges);
      for (const x of [-width / 2, width / 2]) {
        for (const z of [-depth / 2, depth / 2]) {
          localBox(group, 0.035, height, 0.035, brassMaterial, x, height / 2, z);
        }
      }
    } else {
      const radius = index === 0 ? 2.34 : index === 1 ? 1.94 : 2.44;
      const height = index === 1 ? 2.92 : 1.5;
      const glass = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, height, 64, 1, true),
        glassMaterial
      );
      glass.position.y = height / 2;
      glass.renderOrder = 6;
      group.add(glass);

      const top = new THREE.Mesh(new THREE.CircleGeometry(radius, 64), glassTopMaterial);
      top.rotation.x = -Math.PI / 2;
      top.position.y = height;
      group.add(top);
      for (const y of [0.04, height]) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.028, 8, 96), brassMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = y;
        group.add(ring);
      }
      for (let i = 0; i < 6; i++) {
        const angle = i / 6 * Math.PI * 2;
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, height, 8), brassMaterial);
        post.position.set(Math.sin(angle) * radius, height / 2, Math.cos(angle) * radius);
        group.add(post);
      }
    }
  }

  function addCorridor(hall) {
    const group = new THREE.Group();
    group.position.set(hall.center[0], 0, hall.center[1]);
    group.rotation.y = hall.rotation;
    scene.add(group);

    localBox(group, WALL_T, ROOM_H - 0.8, 2.7, wallMaterial, -DOOR_HALF, (ROOM_H - 0.8) / 2, HALF + 1.35);
    localBox(group, WALL_T, ROOM_H - 0.8, 2.7, wallMaterial, DOOR_HALF, (ROOM_H - 0.8) / 2, HALF + 1.35);
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(DOOR_HALF * 2, 2.7), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, ROOM_H - 0.8, HALF + 1.35);
    group.add(ceiling);

    const light = new THREE.PointLight(0xffd2a0, 46, 11, 1.8);
    light.position.set(0, ROOM_H - 1.1, HALF + 1.25);
    group.add(light);

    const threshold = new THREE.Mesh(new THREE.BoxGeometry(DOOR_HALF * 2, 0.025, 0.24), brassMaterial);
    threshold.position.set(0, 0.018, HALF + 0.03);
    group.add(threshold);
  }

  function addRoom(hall, index) {
    const group = new THREE.Group();
    group.position.set(hall.center[0], 0, hall.center[1]);
    group.rotation.y = hall.rotation;
    scene.add(group);
    roomGroups[index] = group;

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: hall.accent, roughness: 0.9, metalness: 0
    });

    localBox(group, ROOM_SIZE, ROOM_H, WALL_T, accentMaterial, 0, ROOM_H / 2, -HALF);
    localBox(group, WALL_T, ROOM_H, ROOM_SIZE, wallMaterial, -HALF, ROOM_H / 2, 0);
    localBox(group, WALL_T, ROOM_H, ROOM_SIZE, wallMaterial, HALF, ROOM_H / 2, 0);

    const side = HALF - DOOR_HALF;
    localBox(group, side, ROOM_H, WALL_T, wallMaterial, -DOOR_HALF - side / 2, ROOM_H / 2, HALF);
    localBox(group, side, ROOM_H, WALL_T, wallMaterial, DOOR_HALF + side / 2, ROOM_H / 2, HALF);
    localBox(group, DOOR_HALF * 2, ROOM_H - 3.15, WALL_T, wallMaterial, 0, 3.15 + (ROOM_H - 3.15) / 2, HALF);

    localBox(group, ROOM_SIZE + 0.1, 0.18, 0.2, trimMaterial, 0, 0.09, -HALF + 0.16);
    localBox(group, 0.2, 0.18, ROOM_SIZE, trimMaterial, -HALF + 0.16, 0.09, 0);
    localBox(group, 0.2, 0.18, ROOM_SIZE, trimMaterial, HALF - 0.16, 0.09, 0);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_SIZE, ROOM_SIZE), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = ROOM_H;
    group.add(ceiling);

    const floorInset = new THREE.Mesh(
      new THREE.PlaneGeometry(ROOM_SIZE - 1.25, ROOM_SIZE - 1.25),
      new THREE.MeshStandardMaterial({ color: 0x444541, roughness: 0.64, metalness: 0.08 })
    );
    floorInset.rotation.x = -Math.PI / 2;
    floorInset.position.y = 0.014;
    floorInset.receiveShadow = true;
    group.add(floorInset);

    const inlayMaterial = new THREE.MeshBasicMaterial({
      color: 0x9b7b45, transparent: true, opacity: 0.3
    });
    localBox(group, ROOM_SIZE - 1.6, 0.012, 0.028, inlayMaterial, 0, 0.03, -HALF + 0.85);
    localBox(group, ROOM_SIZE - 1.6, 0.012, 0.028, inlayMaterial, 0, 0.03, HALF - 0.85);
    localBox(group, 0.028, 0.012, ROOM_SIZE - 1.6, inlayMaterial, -HALF + 0.85, 0.03, 0);
    localBox(group, 0.028, 0.012, ROOM_SIZE - 1.6, inlayMaterial, HALF - 0.85, 0.03, 0);
    for (const x of [-7.5, -5, -2.5, 0, 2.5, 5, 7.5]) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.012, 16.5), inlayMaterial);
      line.position.set(x, 0.032, 0);
      group.add(line);
    }
    for (const z of [-7.5, -5, -2.5, 0, 2.5, 5, 7.5]) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(16.5, 0.012, 0.018), inlayMaterial);
      line.position.set(0, 0.032, z);
      group.add(line);
    }

    const roomSign = makeRoomSign(hall);
    group.add(roomSign);

    for (const side of [-1, 1]) {
      const panelMat = new THREE.MeshStandardMaterial({
        color: side < 0 ? 0x5f5b54 : 0x615d55, roughness: 0.88, metalness: 0.02
      });
      const sidePanel = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 3.3), panelMat);
      sidePanel.position.set(side * (HALF - 0.17), 2.42, 0);
      sidePanel.rotation.y = side < 0 ? Math.PI / 2 : -Math.PI / 2;
      group.add(sidePanel);
      for (const z of [-8, -4.1, 4.1, 8]) {
        localBox(group, 0.11, 4.58, 0.16, brassMaterial, side * (HALF - 0.27), 2.29, z);
      }
    }

    localBox(group, 16.8, 0.055, 0.08, brassMaterial, 0, 4.74, -7.08);
    for (let i = 0; i < 4; i++) {
      const x = [-6.15, -2.05, 2.05, 6.15][i];
      localBox(group, 0.09, 0.42, 0.09, trimMaterial, x, 4.48, -6.98);
      const lamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.085, 0.24, 14),
        new THREE.MeshStandardMaterial({
          color: 0x2c2721, roughness: 0.46, metalness: 0.42,
          emissive: 0xffc06b, emissiveIntensity: 0.9
        })
      );
      lamp.rotation.x = Math.PI / 2;
      lamp.position.set(x, 4.42, -6.88);
      group.add(lamp);
    }

    for (const x of [-4.2, 4.2]) {
      const spot = new THREE.SpotLight(0xffd7ad, 230, 20, Math.PI / 4.35, 0.9, 1.6);
      spot.position.set(x, 4.38, 0.25);
      spot.target.position.set(x * 0.55, 1.9, -HALF + 0.1);
      group.add(spot);
      group.add(spot.target);
    }
    for (const side of [-1, 1]) {
      const sideSpot = new THREE.SpotLight(0xffd7ad, 150, 17, Math.PI / 4.2, 0.92, 1.7);
      sideSpot.position.set(side * 3.1, 4.3, 0.2);
      sideSpot.target.position.set(side * (HALF - 0.1), 2.05, 0);
      group.add(sideSpot);
      group.add(sideSpot.target);
    }
    const doorSpot = new THREE.SpotLight(0xffd7ad, 145, 17, Math.PI / 4.2, 0.92, 1.7);
    doorSpot.position.set(0, 4.28, 5.5);
    doorSpot.target.position.set(0, 2.05, HALF - 0.1);
    group.add(doorSpot);
    group.add(doorSpot.target);

    const fill = new THREE.PointLight(0xd0d9e2, 64, 18, 1.9);
    fill.position.set(0, 3.5, 3.5);
    group.add(fill);

    for (const x of [-5.5, 0, 5.5]) {
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.04, 9.8),
        new THREE.MeshBasicMaterial({ color: 0xffe9c9 })
      );
      strip.position.set(x, 4.94, 0.6);
      group.add(strip);
    }
    for (const z of [-5.2, 0, 5.2]) {
      localBox(group, 18.8, 0.1, 0.16, trimMaterial, 0, 4.88, z);
    }

    addCenterpiece(hall, group, index);
    const center = new THREE.Vector3(0, 0, 0);
    group.localToWorld(center);
    blockers.push({
      x1: center.x - 2.55, x2: center.x + 2.55,
      z1: center.z - 2.55, z2: center.z + 2.55
    });
  }

  function addDust() {
    const count = 440;
    const positions = new Float32Array(count * 3);
    const random = mulberry(731);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() - 0.5) * 70;
      positions[i * 3 + 1] = 0.35 + random() * 4.2;
      positions[i * 3 + 2] = (random() - 0.5) * 70;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0xe9d8ba, size: 0.016, transparent: true, opacity: 0.22,
        depthWrite: false, blending: THREE.AdditiveBlending
      })
    );
    points.name = "dust";
    scene.add(points);
  }

  addFloor();
  addCentralHall();
  addPortalDecorations();
  HALLS.forEach(addCorridor);
  HALLS.forEach(addRoom);
  addDust();

  scene.add(new THREE.AmbientLight(0xd1dae2, 2.25));
  const hemisphere = new THREE.HemisphereLight(0xc7d2de, 0x322b24, 1.88);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight(0xffe4bd, 2.6);
  key.position.set(12, 24, 9);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -42;
  key.shadow.camera.right = 42;
  key.shadow.camera.top = 42;
  key.shadow.camera.bottom = -42;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 80;
  key.shadow.bias = -0.00035;
  scene.add(key);

  const walkRects = [
    { x1: -8.65, x2: 8.65, z1: -8.65, z2: 8.65 },
    { x1: -2.12, x2: 2.12, z1: -13.45, z2: -7.2 },
    { x1: -9.55, x2: 9.55, z1: -31.55, z2: -11.95 },
    { x1: 7.2, x2: 13.45, z1: -2.12, z2: 2.12 },
    { x1: 11.95, x2: 31.55, z1: -9.55, z2: 9.55 },
    { x1: -2.12, x2: 2.12, z1: 7.2, z2: 13.45 },
    { x1: -9.55, x2: 9.55, z1: 11.95, z2: 31.55 },
    { x1: -13.45, x2: -7.2, z1: -2.12, z2: 2.12 },
    { x1: -31.55, x2: -11.95, z1: -9.55, z2: 9.55 }
  ];

  function isWalkable(x, z) {
    const inWalk = walkRects.some(r =>
      x >= r.x1 + PLAYER_R && x <= r.x2 - PLAYER_R &&
      z >= r.z1 + PLAYER_R && z <= r.z2 - PLAYER_R
    );
    if (!inWalk) return false;
    return !blockers.some(r =>
      x >= r.x1 - PLAYER_R && x <= r.x2 + PLAYER_R &&
      z >= r.z1 - PLAYER_R && z <= r.z2 + PLAYER_R
    );
  }

  function createArtwork(work, texture) {
    const group = roomGroups[work.hall];
    const aspect = texture.image.width / texture.image.height;
    let artH = 2.02;
    let artW = artH * aspect;
    if (artW > 2.48) {
      artW = 2.48;
      artH = artW / aspect;
    }
    if (artH > 2.12) {
      artH = 2.12;
      artW = artH * aspect;
    }
    if (artW < 0.82) {
      artW = 0.82;
      artH = artW / aspect;
    }
    const index = WORKS.indexOf(work);
    const slot = work.slot;
    const row = [-6.15, -2.05, 2.05, 6.15];
    let xPos = 0;
    let zPos = -HALF + 0.16;
    let rotation = 0;
    if (slot < 4) {
      xPos = row[slot];
    } else if (slot < 8) {
      xPos = -HALF + 0.16;
      zPos = row[slot - 4];
      rotation = Math.PI / 2;
    } else if (slot < 12) {
      xPos = HALF - 0.16;
      zPos = row[slot - 8];
      rotation = -Math.PI / 2;
    } else {
      xPos = slot === 12 ? -6.15 : 6.15;
      zPos = HALF - 0.16;
      rotation = Math.PI;
    }
    const yPos = 2.22;

    const holder = new THREE.Group();
    holder.position.set(xPos, yPos, zPos);
    holder.rotation.y = rotation;

    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(artW + 0.18, artH + 0.18, 0.08),
      frameMaterial
    );
    frame.position.z = 0.015;
    frame.castShadow = true;
    holder.add(frame);

    const frameShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(artW + 0.58, artH + 0.58),
      new THREE.MeshBasicMaterial({
        map: shadowTexture, transparent: true, opacity: 0.72,
        depthWrite: false, blending: THREE.NormalBlending, side: THREE.DoubleSide
      })
    );
    frameShadow.position.z = -0.018;
    holder.add(frameShadow);

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(artW + 1.5, artH + 1.45),
      new THREE.MeshBasicMaterial({
        map: glowTexture, transparent: true, opacity: 0.34,
        depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
      })
    );
    glow.position.z = -0.035;
    holder.add(glow);

    const mat = new THREE.Mesh(
      new THREE.PlaneGeometry(artW + 0.08, artH + 0.08),
      matMaterial
    );
    mat.position.z = 0.065;
    holder.add(mat);

    const printMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.88,
      metalness: 0,
      emissive: 0x241d14,
      emissiveMap: texture,
      emissiveIntensity: 0.14
    });
    const picture = new THREE.Mesh(new THREE.PlaneGeometry(artW, artH), printMaterial);
    picture.position.z = 0.072;
    picture.castShadow = true;
    picture.userData.work = work;
    picture.userData.index = index + 1;
    holder.add(picture);
    pickables.push(picture);

    const plaque = makePlaque(work);
    plaque.position.set(0, -artH / 2 - 0.21, 0.07);
    holder.add(plaque);

    group.add(holder);
  }

  function updateRoom() {
    const x = camera.position.x;
    const z = camera.position.z;
    let hall = -1;
    if (z < -11.5) hall = 0;
    else if (x > 11.5) hall = 1;
    else if (z > 11.5) hall = 2;
    else if (x < -11.5) hall = 3;

    if (hall !== currentHall) {
      currentHall = hall;
      roomLabel.textContent = hall < 0 ? "中央大厅" : HALLS[hall].name;
      mapRooms.forEach((node, i) => node.classList.toggle("active", i === hall));
    }

    const left = Math.max(6, Math.min(94, 50 + x / 66 * 100));
    const top = Math.max(6, Math.min(94, 50 + z / 66 * 100));
    mapDot.style.left = left + "%";
    mapDot.style.top = top + "%";
  }

  function applyLook() {
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
  }

  function updateMovement(delta) {
    if (!started || detailOpen || confirmOpen) {
      velocity.multiplyScalar(Math.max(0, 1 - delta * 10));
      return;
    }

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, up).normalize();

    const moveForward = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
    const moveRight = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
    direction.set(0, 0, 0);
    direction.addScaledVector(forward, moveForward);
    direction.addScaledVector(right, moveRight);

    const speed = keys.ShiftLeft || keys.ShiftRight ? 5.0 : 3.1;
    if (direction.lengthSq() > 0) {
      direction.normalize().multiplyScalar(speed);
      velocity.lerp(direction, 1 - Math.exp(-9 * delta));
    } else {
      velocity.multiplyScalar(Math.max(0, 1 - delta * 9));
    }

    const dx = velocity.x * delta;
    const dz = velocity.z * delta;
    if (isWalkable(camera.position.x + dx, camera.position.z)) camera.position.x += dx;
    else velocity.x = 0;
    if (isWalkable(camera.position.x, camera.position.z + dz)) camera.position.z += dz;
    else velocity.z = 0;

    if (!grounded) {
      verticalVelocity -= 9.8 * delta;
      playerY += verticalVelocity * delta;
      if (playerY <= 1.66) {
        playerY = 1.66;
        verticalVelocity = 0;
        grounded = true;
      }
      camera.position.y = playerY;
    } else {
      const moveSpeed = velocity.length();
      if (moveSpeed > 0.12) {
        bob += delta * (5.6 + moveSpeed * 1.45);
        camera.position.y = 1.66 + Math.sin(bob) * Math.min(0.021, moveSpeed * 0.005);
      } else {
        camera.position.y += (1.66 - camera.position.y) * Math.min(1, delta * 9);
      }
    }
  }

  function updateHover() {
    if (!started || detailOpen || confirmOpen) {
      crosshair.classList.remove("target");
      targetTip.classList.remove("on");
      hovered = null;
      return;
    }
    raycaster.far = 9.5;
    raycaster.setFromCamera(centerNdc, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    const hit = hits.find(item => item.distance <= 9.5);
    hovered = hit ? hit.object : null;
    crosshair.classList.toggle("target", Boolean(hovered));
    targetTip.classList.toggle("on", Boolean(hovered));
    if (hovered) targetTip.textContent = "点击查看 · " + hovered.userData.work.title;
  }

  function requestLock() {
    if (document.pointerLockElement === canvas) return;
    try {
      const result = canvas.requestPointerLock();
      if (result && typeof result.catch === "function") result.catch(() => {});
    } catch {}
  }

  function startMuseum() {
    if (!ready || disposed) return;
    started = true;
    app.classList.add("live");
    entry.classList.remove("on");
    canvas.focus();
    requestLock();
  }

  function openDetail(work) {
    if (!work || detailOpen || confirmOpen) return;
    pointerState.hasLast = false;
    detailOpen = true;
    app.classList.remove("live");
    detailImg.src = work.img;
    detailImg.alt = work.title;
    detailNo.textContent = "HALL " + HALLS[work.hall].no + " · " + HALLS[work.hall].name;
    detailTitle.textContent = work.title;
    detailMeta.textContent = work.artist + " · " + work.medium;
    detailDesc.textContent = work.desc;
    detailCredit.textContent = "来源：" + work.credit;
    detail.classList.add("on");
    detail.setAttribute("aria-hidden", "false");
    if (document.pointerLockElement) document.exitPointerLock();
    setTimeout(() => detailClose.focus(), 30);
  }

  function closeDetail() {
    if (!detailOpen) return;
    detailOpen = false;
    detail.classList.remove("on");
    detail.setAttribute("aria-hidden", "true");
    app.classList.add("live");
    requestLock();
  }

  function requestExitConfirm() {
    if (disposed) return false;
    if (detailOpen) {
      closeDetail();
      return true;
    }
    if (confirmOpen) return true;
    confirmOpen = true;
    app.classList.remove("live");
    exitConfirm.classList.add("on");
    exitConfirm.setAttribute("aria-hidden", "false");
    if (document.pointerLockElement === canvas) document.exitPointerLock();
    setTimeout(() => exitStay.focus(), 30);
    return true;
  }

  function cancelExitConfirm() {
    if (!confirmOpen) return;
    confirmOpen = false;
    exitConfirm.classList.remove("on");
    exitConfirm.setAttribute("aria-hidden", "true");
    if (started) {
      app.classList.add("live");
      requestLock();
    }
  }

  function leaveGallery() {
    confirmOpen = false;
    exitConfirm.classList.remove("on");
    exitConfirm.setAttribute("aria-hidden", "true");
    window.__galleryRequestExit = null;
    window.__galleryConfirmExit = null;
    exitGallery();
  }

  function exitGallery() {
    if (exitLock) return;
    confirmOpen = false;
    exitLock = true;
    if (typeof options.onExit === "function") options.onExit();
  }

  function onKeyDown(event) {
    if (event.key === "Escape") {
      if (confirmOpen) {
        event.preventDefault();
        event.stopImmediatePropagation();
        cancelExitConfirm();
      } else if (detailOpen) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeDetail();
      } else if (started) {
        event.preventDefault();
        event.stopImmediatePropagation();
        requestExitConfirm();
      }
      return;
    }
    if (!started || detailOpen || confirmOpen) return;
    if (event.code === "Space" && !event.repeat && grounded) {
      verticalVelocity = 3.75;
      grounded = false;
      event.preventDefault();
      return;
    }
    if (/^(KeyW|KeyA|KeyS|KeyD|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|ShiftLeft|ShiftRight)$/.test(event.code)) {
      keys[event.code] = true;
      event.preventDefault();
    }
  }

  function onKeyUp(event) {
    keys[event.code] = false;
  }

  function onPointerMove(event) {
    if (!started || detailOpen || confirmOpen) return;
    if (document.pointerLockElement === canvas) {
      targetYaw -= event.movementX * 0.00185;
      targetPitch -= event.movementY * 0.00185;
      targetPitch = Math.max(-1.32, Math.min(1.32, targetPitch));
      return;
    }
    if (drag && event.pointerType !== "mouse") {
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      targetYaw -= dx * 0.0032;
      targetPitch -= dy * 0.0032;
      targetPitch = Math.max(-1.32, Math.min(1.32, targetPitch));
      drag.x = event.clientX;
      drag.y = event.clientY;
      return;
    }
    if (!pointerState.hasLast) {
      pointerState.hasLast = true;
      pointerState.lastX = event.clientX;
      pointerState.lastY = event.clientY;
      return;
    }
    const dx = event.clientX - pointerState.lastX;
    const dy = event.clientY - pointerState.lastY;
    pointerState.lastX = event.clientX;
    pointerState.lastY = event.clientY;
    targetYaw -= dx * 0.00265;
    targetPitch -= dy * 0.00265;
    targetPitch = Math.max(-1.32, Math.min(1.32, targetPitch));
  }

  function onPointerDown(event) {
    if (!started || detailOpen || confirmOpen) return;
    if (document.pointerLockElement !== canvas && event.pointerType !== "mouse") {
      drag = { x: event.clientX, y: event.clientY };
      try { canvas.setPointerCapture(event.pointerId); } catch {}
    }
  }

  function onPointerUp(event) {
    drag = null;
    try { canvas.releasePointerCapture(event.pointerId); } catch {}
  }

  function onCanvasClick() {
    if (!started || detailOpen || confirmOpen) return;
    if (hovered && hovered.userData.work) openDetail(hovered.userData.work);
    else if (document.pointerLockElement !== canvas) requestLock();
  }

  function onLockChange() {
    if (disposed) return;
    if (document.pointerLockElement === canvas) {
      pointerState.hasLast = false;
      app.classList.add("live");
      return;
    }
    app.classList.remove("live");
    if (started && !detailOpen && !confirmOpen && !exitLock) {
      setTimeout(() => {
        if (started && !detailOpen && !confirmOpen && !disposed && !exitLock) requestExitConfirm();
      }, 30);
    }
  }

  function onLockError() {
    if (!started || detailOpen) return;
    pointerState.hasLast = false;
  }

  function onPointerLeave() {
    pointerState.hasLast = false;
  }

  function updateLook(delta) {
    if (!started || detailOpen || confirmOpen) return;
    const ease = 1 - Math.exp(-18 * delta);
    yaw += (targetYaw - yaw) * ease;
    pitch += (targetPitch - pitch) * ease;
    if (Math.abs(targetYaw - yaw) < 0.00002) yaw = targetYaw;
    if (Math.abs(targetPitch - pitch) < 0.00002) pitch = targetPitch;
    applyLook();
  }

  function resize() {
    const width = Math.max(1, root.clientWidth);
    const height = Math.max(1, root.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function frame() {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    const delta = Math.min(clock.getDelta(), 0.05);
    updateMovement(delta);
    updateLook(delta);
    updateRoom();
    updateHover();
    const dust = scene.getObjectByName("dust");
    if (dust) dust.rotation.y += delta * 0.004;
    renderer.render(scene, camera);
  }

  async function loadWorks() {
    let loaded = 0;
    await Promise.all(WORKS.map(async work => {
      try {
        const texture = await textureLoader.loadAsync(work.img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        createArtwork(work, texture);
      } catch (error) {
        console.warn("[版上草原] 作品图片加载失败：", work.title, error);
      } finally {
        loaded += 1;
        enterButton.textContent = "布展 " + loaded + " / " + WORKS.length;
      }
    }));
    if (disposed) return;
    ready = true;
    enterButton.disabled = false;
    enterButton.textContent = "进入展厅";
  }

  function debugSetCamera(x, z, nextYaw = 0, nextPitch = 0) {
    camera.position.set(x, 1.66, z);
    playerY = 1.66;
    verticalVelocity = 0;
    grounded = true;
    yaw = nextYaw;
    pitch = nextPitch;
    targetYaw = nextYaw;
    targetPitch = nextPitch;
    applyLook();
    updateRoom();
  }

  function debugOpenWork(index) {
    if (WORKS[index]) openDetail(WORKS[index]);
  }

  enterButton.addEventListener("click", startMuseum);
  detailClose.addEventListener("click", closeDetail);
  detail.addEventListener("click", event => {
    if (event.target === detail) closeDetail();
  });
  exitStay.addEventListener("click", cancelExitConfirm);
  exitLeave.addEventListener("click", leaveGallery);
  exitConfirm.addEventListener("click", event => {
    if (event.target === exitConfirm) cancelExitConfirm();
  });
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("click", onCanvasClick);
  document.addEventListener("keydown", onKeyDown, true);
  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("pointerlockchange", onLockChange);
  document.addEventListener("pointerlockerror", onLockError);
  root.querySelector("#galExit").addEventListener("click", requestExitConfirm);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  resize();
  applyLook();
  updateRoom();
  frame();
  loadWorks();

  window.__galleryDebug = {
    scene,
    camera,
    setCamera: debugSetCamera,
    openWork: debugOpenWork,
    state: () => ({
      ready, started, detailOpen, hall: currentHall,
      camera: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      look: { yaw, pitch },
      works: WORKS.length,
      loaded: pickables.length,
      hallCounts: HALLS.map((hall, index) => WORKS.filter(work => work.hall === index).length),
      imageSources: WORKS.map(work => work.img),
      hover: hovered?.userData?.work?.title || null,
      detailTitle: detailOpen ? detailTitle.textContent : null,
      confirmOpen
    })
  };
  window.__galleryRequestExit = requestExitConfirm;
  window.__galleryConfirmExit = requestExitConfirm;

  return function dispose() {
    if (disposed) return;
    disposed = true;
    exitLock = true;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    document.removeEventListener("keydown", onKeyDown, true);
    document.removeEventListener("keyup", onKeyUp);
    document.removeEventListener("pointerlockchange", onLockChange);
    document.removeEventListener("pointerlockerror", onLockError);
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointercancel", onPointerUp);
    canvas.removeEventListener("pointerleave", onPointerLeave);
    canvas.removeEventListener("click", onCanvasClick);
    if (document.pointerLockElement === canvas) document.exitPointerLock();
    delete window.__galleryDebug;
    if (window.__galleryRequestExit === requestExitConfirm) window.__galleryRequestExit = null;
    if (window.__galleryConfirmExit === requestExitConfirm) window.__galleryConfirmExit = null;

    const geometries = new Set();
    const materials = new Set();
    const textures = new Set();
    scene.traverse(object => {
      if (object.geometry) geometries.add(object.geometry);
      const list = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
      list.forEach(material => {
        materials.add(material);
        Object.values(material).forEach(value => {
          if (value && value.isTexture) textures.add(value);
        });
      });
    });
    textures.forEach(texture => texture.dispose());
    materials.forEach(material => material.dispose());
    geometries.forEach(geometry => geometry.dispose());
    renderer.dispose();
    scene.clear();
  };
}

window.ZhaluteGallery = { initGallery };
})();
