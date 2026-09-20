/**
 * RE:CRAFT - Upcycled Luxury & Collectibles Marketplace
 * Full Application Engine
 * Includes:
 * 1. Minimalist Catalog with Real Bangsaen Waste Stories & Multi-Angle Switcher
 * 2. Nike-Style Multi-Angle & 360 Interactive Product Detail View
 * 3. Live Auction Engine with Real-Time Countdown & Simulated Bids
 * 4. Post Item Modal & Story Engine
 * 5. Upcycling Blueprint Studio for Non-Artists with AI Story Assistant
 * 6. RE:CRAFT Waste Supply Hub (Raw Material Starter Kits)
 * 7. Customer Waste Drop-off & Buyback System (ส่งขยะขายเพื่อรับเงินสด)
 * 8. Comprehensive Admin Studio Backend with Intake & Moderation Queues
 */

// Waste Price Index (ราคารับซื้อขยะอัพไซเคิล ต่อ กก.)
const WASTE_PRICE_INDEX = {
  seaglass: { name: 'แก้วทะเลบางแสนคัดสี', rate: 45, unit: 'กก.', thumb: 'assets/kit_seaglass.jpg', targetKit: 'kit-1' },
  hdpe: { name: 'ฝาขวดน้ำพลาสติก HDPE แยกสี', rate: 35, unit: 'กก.', thumb: 'assets/kit_hdpe.jpg', targetKit: 'kit-2' },
  ghostnet: { name: 'เศษแหอวนประมงกู้ภัย', rate: 50, unit: 'กก.', thumb: 'assets/bracelet_front.jpg', targetKit: 'kit-4' },
  biomineral: { name: 'เปลือกหอยทะเลและมุกธรรมชาติ', rate: 40, unit: 'กก.', thumb: 'assets/necklace_worn.jpg', targetKit: 'kit-1' },
  cans: { name: 'กระป๋องอะลูมิเนียมล้างสะอาด', rate: 40, unit: 'กก.', thumb: 'assets/necklace_detail.jpg', targetKit: 'kit-1' },
  ewaste: { name: 'เฟืองจักรกลและขยะ E-Waste', rate: 80, unit: 'กก.', thumb: 'assets/clock_front.jpg', targetKit: 'kit-3' },
  snackfoil: { name: 'ซองขนมกรุบกรอบ / ถุงฟอยล์อลูมิเนียม', rate: 35, unit: 'กก.', thumb: 'assets/snack_foil_waste.jpg', targetKit: 'kit-2' },
  petbottle: { name: 'ขวดน้ำดื่มพลาสติกใส PET #1', rate: 48, unit: 'กก.', thumb: 'assets/pet_bottle_waste.jpg', targetKit: 'kit-2' }
};

// Raw Material Kits Database (ชุดวัตถุดิบขยะที่เรารับมา ให้คนเอาไปทำตาม Blueprint)
const RAW_MATERIAL_KITS = [
  {
    id: 'kit-1',
    name: 'ชุดเศษแก้วทะเลบางแสนคัดเกรด + ลวดทองแดง (Sea Glass Starter Kit)',
    category: 'jewelry',
    thumb: 'assets/kit_seaglass.jpg',
    origin: 'หาดบางแสน จ.ชลบุรี (ผ่านการทำความสะอาดและฆ่าเชื้อ UV)',
    stock: 42,
    price: 89,
    targetBlueprintId: 'bp-1',
    targetBlueprintName: 'สร้อยคอหินแก้วทะเล',
    estSellingPrice: 650,
    estProfit: 561,
    boxIncludes: 'ก้อนแก้วทะเลคัดสีฟ้า/เขียว 15 ชิ้น, ขดลวดทองแดงบริสุทธิ์ 5 เมตร, เชือกคอตตอนถัก 3 เส้น, ป้ายการันตีพิกัดบางแสน'
  },
  {
    id: 'kit-2',
    name: 'ชุดเกล็ดฝาขวดน้ำทะเลบางแสนบดละเอียด 500g (Ocean HDPE Flakes)',
    category: 'fashion',
    thumb: 'assets/kit_hdpe.jpg',
    origin: 'หาดบางแสน จ.ชลบุรี (คัดแยกจาก 200+ ฝาขวด)',
    stock: 85,
    price: 120,
    targetBlueprintId: 'bp-2',
    targetBlueprintName: 'แว่นตากันแดดฝาขวดน้ำ HDPE',
    estSellingPrice: 1690,
    estProfit: 1570,
    boxIncludes: 'เกล็ดพลาสติก HDPE สีฟ้า-คราม-ดำ ล้างสะอาดพร้อมอบหลอม 500 กรัม, แผ่นกระดาษไขทนความร้อน 3 แผ่น'
  },
  {
    id: 'kit-3',
    name: 'ชุดจานดิสก์เบรกมอเตอร์ไซค์คลีนสนิม + เครื่องนาฬิกา (Rotor Clock Base Kit)',
    category: 'decor',
    thumb: 'assets/clock_front.jpg',
    origin: 'อู่ซ่อมรถมอเตอร์ไซค์ พัทยา-ชลบุรี',
    stock: 18,
    price: 240,
    targetBlueprintId: 'bp-3',
    targetBlueprintName: 'นาฬิกาตั้งโต๊ะจานเบรกอุตสาหกรรม',
    estSellingPrice: 1950,
    estProfit: 1710,
    boxIncludes: 'จานดิสก์เบรกเหล็กกล้าขัดสนิมและเคลือบแล็กเกอร์ด้าน, ชุดเครื่องนาฬิกาควอตซ์เดินเงียบ, เข็มนาฬิกาสีทองเหลือง, ฐานเหล็กพับ'
  },
  {
    id: 'kit-4',
    name: 'ชุดมัดเชือกอวนกู้ภัยทะเล + ตัวล็อกแม่เหล็ก (Ghost Net Cord Kit)',
    category: 'jewelry',
    thumb: 'assets/bracelet_front.jpg',
    origin: 'แนวปะการังเกาะล้าน - อ่าวไทย',
    stock: 30,
    price: 95,
    targetBlueprintId: 'bp-4',
    targetBlueprintName: 'กำไลสายเชือกอวนกู้ภัย',
    estSellingPrice: 790,
    estProfit: 695,
    boxIncludes: 'มัดเชือกอวนไนลอนฟอกฆ่าเชื้อแล้ว ยาว 1.2 เมตร, ตัวล็อกแม่เหล็กสแตนเลสซาติน 2 ชุด, กาวแห้งเร็วเกรดจิวเวลรี่'
  }
];

// Initial Customer Waste Submissions (ขยะที่ลูกค้าไปเก็บมาคัดแยกแล้วส่งขายให้เรา)
const INITIAL_CUSTOMER_WASTE_SUBMISSIONS = [
  {
    id: 201,
    collectorName: 'คุณสมชาย นามเจริญ (อาสาบางแสนคลีนเนอร์)',
    wasteTypeKey: 'seaglass',
    wasteTypeName: 'แก้วทะเลบางแสนคัดสี',
    weightKg: 8,
    location: 'หาดบางแสน ซอย 4 จ.ชลบุรี',
    payoutAmount: 360,
    payoutType: 'cash',
    promptPay: '081-442-XXXX (พร้อมเพย์)',
    notes: 'เก็บตามแนวโขดหินตอนน้ำลง ล้างคราบทรายและคัดแก้วสีฟ้า/เขียวมรกตออกแล้ว ปลอดภัย ไร้ขอบคม',
    thumb: 'assets/kit_seaglass.jpg',
    date: 'วันนี้ 10:30 น.',
    status: 'pending',
    targetKitId: 'kit-1'
  },
  {
    id: 202,
    collectorName: 'กลุ่มเยาวชน BeachGuard ชลบุรี',
    wasteTypeKey: 'hdpe',
    wasteTypeName: 'ฝาขวดน้ำพลาสติก HDPE แยกสี',
    weightKg: 15,
    location: 'หาดวอนนภา บางแสน จ.ชลบุรี',
    payoutAmount: 525,
    payoutType: 'credit',
    promptPay: 'Circular Credits (ได้รับ ฿603 พร้อมโบนัส 15%)',
    notes: 'ฝาขวดน้ำพลาสติก 600+ ฝา แช่น้ำยาฆ่าเชื้อและตากแห้งเรียบร้อย พร้อมบดเป็นเกล็ด',
    thumb: 'assets/kit_hdpe.jpg',
    date: 'วันนี้ 11:45 น.',
    status: 'pending',
    targetKitId: 'kit-2'
  }
];

// Initial Finished Products Catalog
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'สร้อยคอ "Bangsaen Debris Heart" จี้เงินแท้ 925 ฝังแก้วทะเลมินิมอล',
    category: 'jewelry',
    artist: 'Studio Debris x บางแสนคลีนเนอร์',
    origin: 'หาดบางแสน จ.ชลบุรี',
    storyQuote: 'ของไร้ค่าจากท้องทะเล สู่หัวใจโคตรเท่ที่ต้นคอ',
    storyDesc: 'ผลงานชิ้นเอกจากโครงการเก็บกู้ขยะชายหาดบางแสน เศษขวดแก้วสีฟ้าอมเขียวที่จมอยู่ใต้ผืนทรายนานนับสิบปี ถูกเกลียวคลื่นซัดกล่อมเกลาจนมนเนียน นำมาล้างฆ่าเชื้อและขึ้นเรือนด้วยเงินแท้ 925 รีไซเคิลแบบ Dark Oxidized สไตล์โกธิคมินิมอล ไร้การผลิตซ้ำ ชิ้นเดียวในโลก',
    materials: ['แก้วทะเลบางแสน 45%', 'เงินแท้ 925 รีไซเคิล 40%', 'ไมโครพลาสติกทะเล 15%'],
    saleType: 'auction',
    currentBid: 2850,
    startingBid: 800,
    minIncrement: 50,
    bidsCount: 14,
    endsInSeconds: 9858,
    buyNowPrice: 5500,
    dimensions: 'ความยาวสร้อย 50 ซม. / จี้ขนาด 3.2 x 2.4 ซม.',
    isBangsaen: true,
    freeShipping: true,
    verified: true,
    wornImg: 'assets/necklace_worn.jpg',
    angles: [
      { label: 'ด้านหน้า (Front View)', img: 'assets/necklace_front.jpg', desc: 'มุมมองด้านหน้า แสดงความสมมาตรของจี้แก้วทะเลกลางเรือนเงินรมดำ', isWorn: false, tag: 'ด้านหน้า' },
      { label: 'ด้านข้าง 45° (Side Profile)', img: 'assets/necklace_side.jpg', desc: 'มุมมองด้านข้าง เผยมิติความหนาและการขึ้นลายฉลุเงินแท้ 925', isWorn: false, tag: 'ด้านข้าง' },
      { label: 'ซูมเนื้อวัสดุ (Macro Detail)', img: 'assets/necklace_detail.jpg', desc: 'ซูมระดับมาโคร เผยพื้นผิวแก้วทะเลขัดคลื่นธรรมชาติและเท็กซ์เจอร์เงินดิบ', isWorn: false, tag: 'มาโคร' },
      { label: '👤 สวมใส่จริง (On-Model Look)', img: 'assets/necklace_worn.jpg', desc: 'ภาพถ่ายขณะสวมใส่จริงบนต้นคอ - สร้อยคอทิ้งตัวสวยสะท้อนแสงธรรมชาติ สไตล์มินิมอลลักชัวรี', isWorn: true, tag: 'สวมใส่จริง' }
    ],
    bidHistory: [
      { user: 'คุณปกรณ์ (P***n)', amount: 2850, time: '2 นาทีที่แล้ว' },
      { user: 'ArtCollector99', amount: 2700, time: '8 นาทีที่แล้ว' },
      { user: 'BKK_StreetWear', amount: 2500, time: '21 นาทีที่แล้ว' }
    ]
  },
  {
    id: 6,
    title: 'แว่นตากันแดด "Bangsaen Ocean Swirl" ผลิตจากฝาขวดน้ำ HDPE รีไซเคิล 100%',
    category: 'fashion',
    artist: 'WaveForm Optics x หาดบางแสน',
    origin: 'หาดบางแสน จ.ชลบุรี',
    storyQuote: 'จากฝาขวดพลาสติกเกยตื้น สู่มุมมองใหม่ที่โครตคูล',
    storyDesc: 'คัดสรรฝาขวดน้ำพลาสติก HDPE สีฟ้า คราม และดำ ที่เก็บกู้ได้จากหาดบางแสน บดเป็นเกล็ดแล้วหลอมขึ้นรูปด้วยอุณหภูมิควบคุม จนเกิดลวดลายหินอ่อน (Marbled Swirl) ไม่ซ้ำกันแม้แต่ตัวเดียว พร้อมสลักพิกัด BANGSAEN BEACH บนขาแว่น ประกอบเข้ากับเลนส์ Polarized กัน UV400',
    materials: ['พลาสติก HDPE ฝาขวดบางแสน 85%', 'เลนส์โพลาไรซ์รีไซเคิล 15%'],
    saleType: 'buynow',
    price: 1690,
    currentBid: 0,
    bidsCount: 0,
    endsInSeconds: 0,
    dimensions: 'ความกว้างกรอบ 145 มม. ความยาวขา 140 มม.',
    isBangsaen: true,
    freeShipping: true,
    verified: true,
    wornImg: 'assets/sunglasses_worn.jpg',
    angles: [
      { label: 'ด้านหน้า (Front View)', img: 'assets/sunglasses_front.jpg', desc: 'มุมมองด้านหน้า เผยลายหินอ่อนพลาสติกทะเลและทรงคลาสสิก', isWorn: false, tag: 'ด้านหน้า' },
      { label: 'ด้านข้าง (Side Profile)', img: 'assets/sunglasses_side.jpg', desc: 'ขาแว่นสลักพิกัด BANGSAEN BEACH พร้อมแกนข้อต่อสีทองเหลือง', isWorn: false, tag: 'ด้านข้าง' },
      { label: '👤 สวมใส่จริง (On-Model Look)', img: 'assets/sunglasses_worn.jpg', desc: 'ภาพถ่ายขณะสวมใส่จริงกลางแจ้งริมทะเล - ทรงแว่นเข้ากับทุกรูปหน้า กรอบสีฟ้าครามโดดเด่น', isWorn: true, tag: 'สวมใส่จริง' },
      { label: 'ซูมลายหินอ่อน (Texture Macro)', img: 'assets/sunglasses_front.jpg', desc: 'เท็กซ์เจอร์ลายหินอ่อนธรรมชาติที่เกิดจากการหลอมฝาขวดน้ำ HDPE แท้ 100%', isWorn: false, tag: 'มาโคร' }
    ],
    bidHistory: []
  },
  {
    id: 7,
    title: 'นาฬิกาตั้งโต๊ะสตรีท "Industrial Rotor Clock" จากจานเบรกและเฟืองทองเหลือง',
    category: 'decor',
    artist: 'GearHeads Atelier',
    origin: 'อู่ซ่อมรถมอเตอร์ไซค์ พัทยา-ชลบุรี',
    storyQuote: 'หยุดความเร็วของเครื่องจักรกล สู่ตัวบอกเวลาที่ไม่เคยหยุดนิ่ง',
    storyDesc: 'จานดิสก์เบรกมอเตอร์ไซค์ที่หมดอายุการใช้งานถูกขัดคราบน้ำมันและสนิมออก นำมาเคลือบผิวดำด้าน แล้วฝังชุดกลไกนาฬิกาควอตซ์เดินเงียบและเฟืองทองเหลืองโบราณเข้าที่กึ่งกลาง วางบนขาตั้งเหล็กพับแบบมินิมอล',
    materials: ['จานเบรกเหล็กกล้า 65%', 'เฟืองทองเหลือง 25%', 'ฐานเหล็กพับ 10%'],
    saleType: 'auction',
    currentBid: 2100,
    startingBid: 900,
    minIncrement: 50,
    bidsCount: 11,
    endsInSeconds: 18400,
    buyNowPrice: 4200,
    dimensions: 'เส้นผ่านศูนย์กลาง 22 ซม. สูง 25 ซม.',
    isBangsaen: false,
    freeShipping: true,
    verified: true,
    wornImg: 'assets/clock_setting.jpg',
    angles: [
      { label: 'ด้านหน้า (Front View)', img: 'assets/clock_front.jpg', desc: 'มุมมองหน้าปัดจานเบรกและเฟืองทองเหลืองกลางเรือน', isWorn: false, tag: 'ด้านหน้า' },
      { label: '🏡 จัดวางบนโต๊ะ (Desk Setting)', img: 'assets/clock_setting.jpg', desc: 'ภาพบรรยากาศจริงเมื่อจัดวางบนโต๊ะทำงานสไตล์ลอฟท์/ผู้บริหาร ให้ความรู้สึกพรีเมียมเท่', isWorn: true, tag: 'จัดวางจริง' },
      { label: 'ด้านข้าง (Side Profile)', img: 'assets/clock_front.jpg', desc: 'มุมมองด้านข้าง แสดงฐานเหล็กพับเฉียงสไตล์สถาปัตยกรรม', isWorn: false, tag: 'ด้านข้าง' }
    ],
    bidHistory: [
      { user: 'BikerBKK', amount: 2100, time: '14 นาทีที่แล้ว' }
    ]
  },
  {
    id: 2,
    title: 'ประติมากรรมหุ่นกลสะสม "CHRONOS" จากชิ้นส่วนจักรกลและ E-Waste',
    category: 'collectibles',
    artist: 'CyberReclaim Lab',
    origin: 'โรงงานรีไซเคิลจักรกล สมุทรปราการ',
    storyQuote: 'ซากเฟืองเวลาที่หยุดหมุน สู่ประติมากรรมกลไกมีลมหายใจ',
    storyDesc: 'สร้างจากชิ้นส่วนกลไกนาฬิกาโบราณ โซ่จักรยานยนต์ และแผงวงจรอิเล็กทรอนิกส์ นำมาประกอบใหม่ด้วยมือทีละชิ้นตามหลักสรีรศาสตร์แบบ Cyberpunk บนฐานคอนกรีตรีไซเคิล',
    materials: ['เฟืองทองเหลืองนาฬิกา 50%', 'โซ่จักรยานยนต์ 30%', 'แผงวงจร E-Waste 20%'],
    saleType: 'auction',
    currentBid: 7600,
    startingBid: 3500,
    minIncrement: 100,
    bidsCount: 28,
    endsInSeconds: 14200,
    buyNowPrice: 12500,
    dimensions: 'สูง 28 ซม. ฐานกว้าง 14 ซม.',
    isBangsaen: false,
    freeShipping: true,
    verified: true,
    wornImg: 'assets/sculpture_setting.jpg',
    angles: [
      { label: 'ด้านหน้า (Front View)', img: 'assets/sculpture_front.jpg', desc: 'มุมมองด้านหน้า เผยโครงสร้างเฟืองทองเหลืองและแขนกลกลไก', isWorn: false, tag: 'ด้านหน้า' },
      { label: 'ด้านข้าง (Side Profile)', img: 'assets/sculpture_side.jpg', desc: 'มุมมองด้านข้าง แสดงระบบส่งกำลังและสปริงจักรกลด้านข้าง', isWorn: false, tag: 'ด้านข้าง' },
      { label: '🏛️ จัดแสดงในแกลเลอรี (Gallery View)', img: 'assets/sculpture_setting.jpg', desc: 'ภาพบรรยากาศจริงบนแท่นแสดงงานศิลปะในแกลเลอรี แสงสปอตไลท์ขับเน้นมิติตัวเรือน', isWorn: true, tag: 'จัดวางจริง' }
    ],
    bidHistory: [
      { user: 'MechaLover_BKK', amount: 7600, time: '5 นาทีที่แล้ว' }
    ]
  }
];

// Initial Pending Approval Products
const INITIAL_PENDING_PRODUCTS = [
  {
    id: 101,
    title: 'แหวนฉลุลาย "Coke Can Crown" จากกระป๋องอะลูมิเนียมหาดวอนนภา',
    category: 'jewelry',
    artist: 'น้องนนท์ (Non_Upcycler)',
    origin: 'หาดวอนนภา บางแสน จ.ชลบุรี',
    storyQuote: 'กระป๋องน้ำอัดลมใต้คลื่น สู่แหวนเงินเงาวับบนนิ้วมือ',
    storyDesc: 'เก็บกระป๋องน้ำอัดลม 5 ใบจากแนวโขดหินหาดวอนนภา หลอมและฉลุลายมินิมอลแบบโกธิค',
    materials: ['อะลูมิเนียมกระป๋องรีไซเคิล 100%'],
    saleType: 'auction',
    startingBid: 450,
    currentBid: 450,
    minIncrement: 50,
    bidsCount: 0,
    endsInSeconds: 86400,
    dimensions: 'ไซส์ US 8',
    isBangsaen: true,
    freeShipping: true,
    verified: true,
    wornImg: 'assets/necklace_worn.jpg',
    angles: [
      { label: 'ด้านหน้า (Front View)', img: 'assets/necklace_detail.jpg', desc: 'มุมมองหน้าแหวนฉลุลายอะลูมิเนียม', isWorn: false, tag: 'ด้านหน้า' },
      { label: '👤 สวมใส่บนนิ้ว (On-Hand Look)', img: 'assets/necklace_worn.jpg', desc: 'ภาพถ่ายขณะสวมใส่บนนิ้วมือจริง ดีไซน์เพรียวมินิมอล', isWorn: true, tag: 'สวมใส่จริง' }
    ],
    bidHistory: []
  },
  {
    id: 102,
    title: 'ฟิกเกอร์ประติมากรรม "Cyber Ray" ปลากระเบนจากสายเคเบิลทะเล',
    category: 'collectibles',
    artist: 'Marine Tech Studio',
    origin: 'ท่าเรือแหลมฉบัง จ.ชลบุรี',
    storyQuote: 'สายส่งสัญญาณที่จมก้นอ่าว สู่ชีวิตใหม่ของสัตว์ทะเลแห่งอนาคต',
    storyDesc: 'สายเคเบิลทองแดงและใยแก้วนำแสงใต้ทะเลที่ชำรุด ถูกนำมาดัดและถักขึ้นรูปเป็นโครงสร้างปลากระเบนราหู',
    materials: ['สายเคเบิลใยแก้ว 60%', 'ทองแดงรีไซเคิล 40%'],
    saleType: 'buynow',
    price: 3450,
    currentBid: 0,
    bidsCount: 0,
    endsInSeconds: 0,
    dimensions: 'ปีกกว้าง 32 ซม.',
    isBangsaen: false,
    freeShipping: true,
    verified: true,
    wornImg: 'assets/sculpture_setting.jpg',
    angles: [
      { label: 'ด้านหน้า (Front View)', img: 'assets/sculpture_front.jpg', desc: 'มุมมองด้านหน้าโครงสร้างปลากระเบนกลไก', isWorn: false, tag: 'ด้านหน้า' },
      { label: '🏛️ จัดวางในห้อง (Room Setting)', img: 'assets/sculpture_setting.jpg', desc: 'มุมมองจัดวางในพื้นที่ห้องรับแขกสไตล์โมเดิร์น', isWorn: true, tag: 'จัดวางจริง' }
    ],
    bidHistory: []
  }
];

// Blueprints Database
const BLUEPRINTS = [
  {
    id: 'bp-1',
    name: 'สร้อยคอหินแก้วทะเล (Sea Glass Pendant)',
    category: 'jewelry',
    difficulty: 'ง่ายมาก (มือใหม่ทำได้ใน 20 นาที)',
    diffClass: 'diff-easy',
    priceSuggest: 'ราคาขายแนะนำ: ฿490 - ฿850',
    thumb: 'assets/necklace_front.jpg',
    presetKey: 'necklace',
    materialsNeeded: 'ขวดแก้วแตกจากหาดบางแสน + ลวดทองแดงจากสายไฟเก่า + เชือกคอตตอน',
    tools: 'กระดาษทรายเบอร์ 240/600 + คีมดัดลวดปากจิ้งจก',
    steps: [
      'เดินเก็บเศษแก้วมนๆ ริมหาด หรือนำขวดแก้วเก่ามาเคาะแตกแล้วขัดลบคมด้วยกระดาษทรายใต้น้ำ',
      'ปอกเปลือกสายไฟเก่าเพื่อเอาลวดทองแดงด้านในมาทำความสะอาด',
      'ใช้คีมดัดลวดทองแดงพันรอบก้อนแก้วทะเลเป็นรูปกรงข่ายแบบสมมาตร',
      'ทำห่วงด้านบนแล้วร้อยเชือกคอตตอน พร้อมถ่ายรูปและลงขายได้ทันที'
    ],
    autoFill: {
      title: 'สร้อยคอจี้แก้วทะเล "Bangsaen Raw Shard" พันขดลวดทองแดงแฮนด์เมด',
      origin: 'หาดบางแสน จ.ชลบุรี',
      quote: 'จากเศษขวดแก้วที่เคยบาดเท้า สู่จี้อัญมณีทะเลที่ใครเห็นก็ต้องมอง',
      desc: 'สร้างตามพิมพ์เขียว Sea Glass Pendant ใช้เศษแก้วสีเขียวมรกตที่คลื่นซัดจากหาดบางแสน ขัดมนอย่างปลอดภัย แล้วดัดลวดทองแดงรีไซเคิลยึดล็อกด้วยมือทุกขั้นตอน',
      materials: 'แก้วทะเลบางแสน 70%, ลวดทองแดงสายไฟเก่า 30%',
      price: 650,
      startBid: 390
    }
  },
  {
    id: 'bp-2',
    name: 'แว่นตากันแดดฝาขวดน้ำ HDPE (Ocean Swirl Sunglasses)',
    category: 'fashion',
    difficulty: 'ปานกลาง (ใช้เตาอบขนาดเล็ก)',
    diffClass: 'diff-medium',
    priceSuggest: 'ราคาขายแนะนำ: ฿1,490 - ฿2,200',
    thumb: 'assets/sunglasses_front.jpg',
    presetKey: 'sunglasses',
    materialsNeeded: 'ฝาขวดน้ำพลาสติก 25-30 ฝา + เลนส์โพลาไรซ์เก่า/เลนส์อะไหล่',
    tools: 'กรรไกรตัดพลาสติก + ถาดอบรองกระดาษไข + บล็อกไม้กดทรง',
    steps: [
      'รวบรวมฝาขวดน้ำสีฟ้า ขาว และดำ ตัดเป็นชิ้นเล็กๆ ขนาดลูกเต๋า',
      'วางผสมสีลงในถาดอบที่ 180°C นาน 12 นาทีจนพลาสติกเริ่มละลายตัวเป็นก้อนหนืด',
      'รีบนำมารีดให้แบนลงในบล็อกไม้แล้วกดอัดด้วยปากกาจับชิ้นงาน ทิ้งไว้จนเย็นสนิท',
      'ใช้ใบเลื่อยฉลุตัดเป็นทรงกรอบแว่น ขัดกระดาษทรายให้เรียบเนียน แล้วใส่เลนส์'
    ],
    autoFill: {
      title: 'แว่นตากันแดด "Ocean Bottlecap Swirl" ลายหินอ่อนพลาสติกทะเล',
      origin: 'หาดบางแสน จ.ชลบุรี',
      quote: 'เปลี่ยนฝาขวดน้ำเกลื่อนหาด สู่กรอบแว่นหินอ่อนตัวเดียวในโลก',
      desc: 'สร้างสรรค์จากฝาขวดน้ำพลาสติก HDPE 28 ฝาที่เก็บได้จากริมหาด นำมาหลอมและกดอัดลวดลายคลื่นทะเลแบบไม่ซ้ำใคร กรอบเหนียวทนทาน น้ำหนักเบา กันแดดได้ 100%',
      materials: 'พลาสติก HDPE รีไซเคิล 85%, เลนส์กัน UV 15%',
      price: 1690,
      startBid: 890
    }
  },
  {
    id: 'bp-3',
    name: 'นาฬิกาตั้งโต๊ะจานเบรกอุตสาหกรรม (Industrial Rotor Clock)',
    category: 'decor',
    difficulty: 'ง่าย (ไม่ต้องมีทักษะช่างขั้นสูง)',
    diffClass: 'diff-easy',
    priceSuggest: 'ราคาขายแนะนำ: ฿1,890 - ฿2,900',
    thumb: 'assets/clock_front.jpg',
    presetKey: 'clock',
    materialsNeeded: 'จานดิสก์เบรกมอเตอร์ไซค์เก่าจากร้านซ่อม + เครื่องนาฬิกาควอตซ์ (฿35)',
    tools: 'แปรงลวดขัดสนิม + สเปรย์แล็กเกอร์ด้าน + กาวอีพ็อกซี่',
    steps: [
      'ขอหรือซื้อจานเบรกเก่าจากร้านซ่อมรถ นำมาขัดคราบน้ำมันและสนิมออกด้วยแปรงลวด',
      'พ่นสเปรย์แล็กเกอร์เคลือบผิวใสแบบด้าน 2 รอบเพื่อกันสนิมถาวรและคงความดิบเท่',
      'ติดแกนเครื่องนาฬิกาควอตซ์เข้าที่รูกึ่งกลางของจานดิสก์เบรก',
      'ประกอบเข็มนาฬิกาและฐานรองเหล็ก พร้อมตั้งโชว์บนโต๊ะทำงาน'
    ],
    autoFill: {
      title: 'นาฬิกาตั้งโต๊ะ "Reclaimed Rotor Timepiece" สไตล์มินิมอลอินดัสเทรียล',
      origin: 'อู่ซ่อมรถมอเตอร์ไซค์ ชลบุรี',
      quote: 'ชิ้นส่วนความเร็วที่ปลดระวาง สู่เวลาที่ไม่มีวันหยุดเดิน',
      desc: 'นำจานดิสก์เบรกมอเตอร์ไซค์ที่หมดสภาพมาขัดเคลือบผิวป้องกันสนิม ติดตั้งชุดกลไกนาฬิกาควอตซ์เดินเรียบไร้เสียงรบกวน เป็นของแต่งบ้านสไตล์ลอฟท์ที่ได้รับความนิยมสูง',
      materials: 'จานเบรกเหล็กกล้า 80%, เครื่องนาฬิกาควอตซ์ 20%',
      price: 1950,
      startBid: 990
    }
  },
  {
    id: 'bp-4',
    name: 'กำไลสายเชือกอวนกู้ภัย (Braided Ghost Net Bracelet)',
    category: 'jewelry',
    difficulty: 'ง่ายมาก (ใช้เวลา 15 นาที)',
    diffClass: 'diff-easy',
    priceSuggest: 'ราคาขายแนะนำ: ฿590 - ฿1,100',
    thumb: 'assets/bracelet_front.jpg',
    presetKey: 'bracelet',
    materialsNeeded: 'เศษเชือกอวนประมงหาดบางแสน + หัวล็อกแม่เหล็กแสตนเลส',
    tools: 'กรรไกร + น้ำส้มสายชูล้างกลิ่น + ไฟแช็กเก็บปลายเส้นด้าย',
    steps: [
      'นำเชือกอวนไนลอนมาแช่น้ำส้มสายชูและสบู่เพื่อลบกลิ่นคาวและคราบดินทราย',
      'แยกเส้นใยออกเป็น 4 เส้นเท่าๆ กัน แล้วถักเปียลายสี่ทิศทางให้แน่นกระชับ',
      'ตัดความยาวให้พอดีกับข้อมือ (ประมาณ 18-20 ซม.) ลนไฟเก็บปลายเชือก',
      'ทากาวติดแน่นหยอดเข้าหัวล็อกแม่เหล็ก ทิ้งไว้ 10 นาทีพร้อมสวมใส่'
    ],
    autoFill: {
      title: 'กำไลข้อมือ "Ghost Net Survivor" ถักใยอวนกู้ภัยทะเลพร้อมล็อกแม่เหล็ก',
      origin: 'หาดบางแสน จ.ชลบุรี',
      quote: 'จากกับดักมรณะใต้เกลียวคลื่น สู่ไอเทมสายลุยที่ช่วยชีวิตสัตว์ทะเล',
      desc: 'เชือกอวนประมงกู้ชีพที่ถูกตัดทิ้งในทะเล นำมาฟอกฆ่าเชื้อและถักทอใหม่ด้วยมือทุกเส้น แข็งแรงทนทาน ใส่ลุยน้ำลุยแดดได้ตลอดชีวิต',
      materials: 'ไนลอนแหอวนทะเล 90%, หัวล็อกแสตนเลส 10%',
      price: 790,
      startBid: 490
    }
  },
  {
    id: 'bp-5',
    name: 'กระเป๋าคลัตช์ฟอยล์ซองขนมรีไซเคิล (Upcycled Foil Clutch)',
    category: 'fashion',
    difficulty: 'ง่าย (ใช้เตารีดทับกระดาษไข)',
    diffClass: 'diff-easy',
    priceSuggest: 'ราคาขายแนะนำ: ฿690 - ฿1,290',
    thumb: 'assets/snack_foil_waste.jpg',
    presetKey: 'snackfoil',
    materialsNeeded: 'ซองขนมกรุบกรอบล้างสะอาด 12-16 ซอง + กระดุมแม่เหล็ก + สายคล้อง',
    tools: 'เตารีดความร้อนต่ำ + กระดาษไขทนความร้อน + กรรไกรตัดผ้า',
    steps: [
      'ผ่าซองขนม ล้างคราบน้ำมันและตากแห้ง ตัดขอบให้เป็นสี่เหลี่ยมผืนผ้าเท่าๆ กัน',
      'วางเรียงซ้อนเหลื่อมกันบนกระดาษไข 4 ชั้นเพื่อให้ได้ความหนาและลวดลายเมทัลลิกสวยงาม',
      'ใช้เตารีดความร้อนต่ำรีบทับผ่านกระดาษไข 10-15 วินาทีจนฟิล์มหลอมประสานเป็นผืนเดียว',
      'พับขึ้นรูปเป็นทรงกระเป๋าคลัตช์ เจาะติดกระดุมแม่เหล็กและสายคล้อง พร้อมใช้งาน'
    ],
    autoFill: {
      title: 'กระเป๋าคลัตช์ "Metallic Snack Wave" หนังเทียมฟอยล์ซองขนมกันน้ำ 100%',
      origin: 'หาดบางแสน จ.ชลบุรี',
      quote: 'เปลี่ยนซองขนมที่ย่อยสลายยาก สู่กระเป๋าคลัตช์แฟชั่นสตรีทแวร์เมทัลลิกสุดเท่',
      desc: 'ผลิตจากซองขนมกรุบกรอบ 14 ซองที่เก็บกู้จากชายหาด นำมาหลอมประสานความร้อนจนได้เนื้อสัมผัสเหนียวนุ่มคล้ายหนังเทียม กันน้ำ 100% ลวดลายกราฟิกไม่ซ้ำใคร',
      materials: 'ฟอยล์ซองขนมอะลูมิเนียม 90%, กระดุมแม่เหล็ก 10%',
      price: 890,
      startBid: 490
    }
  },
  {
    id: 'bp-6',
    name: 'แจกันทรงเรขาคณิตขวด PET รีดเกลียว (Thermal Spiral PET Vase)',
    category: 'decor',
    difficulty: 'ปานกลาง (ใช้ความร้อนเป่าทรง)',
    diffClass: 'diff-medium',
    priceSuggest: 'ราคาขายแนะนำ: ฿850 - ฿1,690',
    thumb: 'assets/pet_bottle_waste.jpg',
    presetKey: 'petbottle',
    materialsNeeded: 'ขวดน้ำดื่มพลาสติกใส PET 3-5 ใบ + ฐานไม้หรือหิน',
    tools: 'มีดคัตเตอร์ + ไดร์เป่าลมร้อน (Heat Gun) หรือน้ำร้อน 85°C + ถุงมือกันความร้อน',
    steps: [
      'ลอกฉลากและทำความสะอาดขวดน้ำ ตัดส่วนก้นขวดออก',
      'ใช้คัตเตอร์กรีดตัดตัวขวดเป็นเกลียวเส้นริบบิ้นความกว้าง 1.5 ซม. สม่ำเสมอ',
      'ดัดบิดเกลียวรอบแกนไม้ทรงกระบอก แล้วใช้ลมร้อนเป่าผ่านอย่างรวดเร็วเพื่อให้พลาสติกจำทรง',
      'ยึดติดกับฐานไม้หรือหินเพื่อทำเป็นแจกันใส่ดอกไม้แห้งหรือหลอดไฟ LED'
    ],
    autoFill: {
      title: 'แจกันเรขาคณิต "Crystal Wave Spiral" ขวดน้ำใสรีดเกลียวโมเดิร์น',
      origin: 'หาดบางแสน จ.ชลบุรี',
      quote: 'พลิกความใสของขวดน้ำริมหาด ให้กลายเป็นมิติแสงเงาเหนือระดับ',
      desc: 'นำขวดน้ำดื่มพลาสติกใส PET มาแปรรูปด้วยความร้อนเป็นแจกันเกลียวทรงเกลียวคลื่นทะเล เนื้อพลาสติกใสเงางาม สะท้อนแสงไฟดุจแก้วคริสตัล น้ำหนักเบา ตกไม่แตก',
      materials: 'พลาสติกใส PET รีไซเคิล 85%, ฐานไม้สัก 15%',
      price: 1190,
      startBid: 650
    }
  }
];

// App State
const state = {
  products: [...INITIAL_PRODUCTS],
  pendingProducts: [...INITIAL_PENDING_PRODUCTS],
  customerWasteSubmissions: [...INITIAL_CUSTOMER_WASTE_SUBMISSIONS],
  rawMaterialKits: [...RAW_MATERIAL_KITS],
  totalRescuedKg: 3840,
  selectedCategory: 'all',
  activeFilterPill: 'all',
  sortOption: 'relevance',
  searchKeyword: '',
  selectedProduct: null,
  activeAngleIndex: 0,
  userBidsCount: 2,
  wishlist: new Set([1]),
  scanHistory: [],
  activeScannerPreset: 'seaglass',
  scannerStream: null,
  isScanning: false,
  activeCameraFacing: 'environment'
};

const PRESET_IMAGE_MAP = {
  necklace: [
    { label: 'ด้านหน้า (Front View)', img: 'assets/necklace_front.jpg', desc: 'มุมมองด้านหน้า แสดงความสมมาตรและจี้แก้วทะเล', isWorn: false, tag: 'ด้านหน้า' },
    { label: 'ด้านข้าง 45° (Side View)', img: 'assets/necklace_side.jpg', desc: 'มุมมองด้านข้าง เผยมิติความหนาและตัวเรือน', isWorn: false, tag: 'ด้านข้าง' },
    { label: 'ซูมเนื้อวัสดุ (Macro Detail)', img: 'assets/necklace_detail.jpg', desc: 'ซูมระดับมาโคร เผยเท็กซ์เจอร์เนื้อวัสดุรีไซเคิล', isWorn: false, tag: 'มาโคร' },
    { label: '👤 สวมใส่จริง (On-Model Look)', img: 'assets/necklace_worn.jpg', desc: 'ภาพถ่ายขณะสวมใส่จริงบนต้นคอ สไตล์มินิมอลลักชัวรี', isWorn: true, tag: 'สวมใส่จริง' }
  ],
  sunglasses: [
    { label: 'ด้านหน้า (Front View)', img: 'assets/sunglasses_front.jpg', desc: 'มุมมองด้านหน้า แสดงลายหินอ่อนพลาสติกทะเล', isWorn: false, tag: 'ด้านหน้า' },
    { label: 'ด้านข้าง (Side View)', img: 'assets/sunglasses_side.jpg', desc: 'มุมมองด้านข้าง ขาแว่นสลักพิกัดบางแสน', isWorn: false, tag: 'ด้านข้าง' },
    { label: '👤 สวมใส่จริง (On-Model Look)', img: 'assets/sunglasses_worn.jpg', desc: 'ภาพถ่ายขณะสวมใส่จริงกลางแจ้งริมทะเล', isWorn: true, tag: 'สวมใส่จริง' }
  ],
  clock: [
    { label: 'ด้านหน้า (Front View)', img: 'assets/clock_front.jpg', desc: 'มุมมองหน้าปัดจานเบรกและเฟืองทองเหลือง', isWorn: false, tag: 'ด้านหน้า' },
    { label: '🏡 จัดวางบนโต๊ะ (Desk Setting)', img: 'assets/clock_setting.jpg', desc: 'ภาพบรรยากาศจริงเมื่อจัดวางบนโต๊ะทำงานสไตล์ลอฟท์', isWorn: true, tag: 'จัดวางจริง' },
    { label: 'ด้านข้าง (Side View)', img: 'assets/clock_front.jpg', desc: 'มุมมองด้านข้าง ฐานเหล็กพับ', isWorn: false, tag: 'ด้านข้าง' }
  ],
  sculpture: [
    { label: 'ด้านหน้า (Front View)', img: 'assets/sculpture_front.jpg', desc: 'มุมมองด้านหน้า แสดงโครงสร้างหุ่นกล', isWorn: false, tag: 'ด้านหน้า' },
    { label: 'ด้านข้าง (Side View)', img: 'assets/sculpture_side.jpg', desc: 'มุมมองด้านข้าง เผยระบบข้อต่อกลไก', isWorn: false, tag: 'ด้านข้าง' },
    { label: '🏛️ จัดแสดงในแกลเลอรี (Gallery View)', img: 'assets/sculpture_setting.jpg', desc: 'ภาพบรรยากาศจริงบนแท่นแสดงงานศิลปะในแกลเลอรี', isWorn: true, tag: 'จัดวางจริง' }
  ],
  bracelet: [
    { label: 'ด้านหน้า (Front View)', img: 'assets/bracelet_front.jpg', desc: 'มุมมองด้านหน้า เผยลายถักใยอวน', isWorn: false, tag: 'ด้านหน้า' },
    { label: '👤 สวมใส่จริง (On-Wrist Look)', img: 'assets/bracelet_worn.jpg', desc: 'ภาพถ่ายขณะสวมใส่บนข้อมือจริง แมตช์กับเสื้อผ้าลินิน', isWorn: true, tag: 'สวมใส่จริง' }
  ],
  lamp: [
    { label: 'ด้านหน้า (Front View)', img: 'assets/lamp_front.jpg', desc: 'มุมมองตรง แสดงการส่องแสงผ่านเนื้อแก้วทะเล', isWorn: false, tag: 'ด้านหน้า' },
    { label: 'ด้านข้าง (Side View)', img: 'assets/lamp_front.jpg', desc: 'มุมมองด้านข้าง แสดงฐานไม้ลอยน้ำ', isWorn: false, tag: 'ด้านข้าง' }
  ]
};

// Zone & Category System Map
const ZONE_MAP = {
  all: {
    name: 'ทั้งหมด (All Items)',
    shortName: 'ทั้งหมด',
    heading: 'สินค้าอัพไซเคิลทั้งหมด',
    icon: '🌐'
  },
  jewelry: {
    name: 'สร้อยคอ & เครื่องประดับ (Jewelry)',
    shortName: 'เครื่องประดับ',
    heading: 'สร้อยคอ & เครื่องประดับอัพไซเคิล',
    icon: '💎'
  },
  collectibles: {
    name: 'ของสะสม & หุ่นกล (Collectibles)',
    shortName: 'ของสะสมหุ่นกล',
    heading: 'ของสะสม & ประติมากรรมหุ่นกล E-Waste',
    icon: '🤖'
  },
  fashion: {
    name: 'แว่นตา & แฟชั่นสตรีท (Fashion)',
    shortName: 'แฟชั่นสตรีท',
    heading: 'แว่นตา & แฟชั่นสตรีทพลาสติกทะเล',
    icon: '🕶️'
  },
  decor: {
    name: 'ของแต่งบ้าน & นาฬิกา (Home Decor)',
    shortName: 'ของแต่งบ้าน',
    heading: 'ของแต่งบ้าน & นาฬิกาจานเบรกอัพไซเคิล',
    icon: '🕰️'
  },
  bangsaen: {
    name: 'ซีรีส์ขยะหาดบางแสน (Bangsaen Special)',
    shortName: 'ขยะบางแสน',
    heading: 'คอลเลกชันพิเศษ: ขยะเก็บกู้หาดบางแสน',
    icon: '🌊'
  },
  auction: {
    name: 'ลานประมูลสด (Live Auction)',
    shortName: 'ประมูลสด',
    heading: 'ลานประมูลสด: ชิ้นงานมาสเตอร์พีซเคาะราคา',
    icon: '🔨'
  },
  supply: {
    name: 'คลังวัตถุดิบขยะพร้อมทำ (Waste Kits)',
    shortName: 'คลังวัตถุดิบ',
    heading: 'คลังวัตถุดิบขยะพร้อมทำ (Waste Starter Kits)',
    icon: '📦'
  }
};

// DOM Elements
const productGrid = document.getElementById('productGrid');
const itemsCountText = document.getElementById('itemsCountText');
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const catTabs = document.querySelectorAll('.cat-tab');
const filterPills = document.querySelectorAll('.pill-btn');
const toastStack = document.getElementById('toastStack');
const bidCountBadge = document.getElementById('bidCountBadge');

// Consolidated Zone Modal Elements
const zoneModal = document.getElementById('zoneModal');
const headerZoneBtn = document.getElementById('headerZoneBtn');
const catalogZonePickerBtn = document.getElementById('catalogZonePickerBtn');
const closeZoneModalBtn = document.getElementById('closeZoneModalBtn');
const activeZoneName = document.getElementById('activeZoneName');
const catalogHeading = document.getElementById('catalogHeading');

// Detail Modal Elements
const detailModal = document.getElementById('detailModal');
const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
const verticalThumbsList = document.getElementById('verticalThumbsList');
const viewerMainImg = document.getElementById('viewerMainImg');
const viewerViewport = document.getElementById('viewerViewport');
const currentAngleText = document.getElementById('currentAngleText');
const angleBadge = document.getElementById('angleBadge');
const anglePillsGroup = document.getElementById('anglePillsGroup');
const prevAngleBtn = document.getElementById('prevAngleBtn');
const nextAngleBtn = document.getElementById('nextAngleBtn');
const angleCounterText = document.getElementById('angleCounterText');
const modalCategory = document.getElementById('modalCategory');
const modalOriginText = document.getElementById('modalOriginText');
const modalTitle = document.getElementById('modalTitle');
const modalArtist = document.getElementById('modalArtist');
const modalStoryQuote = document.getElementById('modalStoryQuote');
const modalStoryDesc = document.getElementById('modalStoryDesc');
const modalMaterialsList = document.getElementById('modalMaterialsList');
const auctionModeSection = document.getElementById('auctionModeSection');
const directBuySection = document.getElementById('directBuySection');
const modalCountdown = document.getElementById('modalCountdown');
const modalCurrentBid = document.getElementById('modalCurrentBid');
const modalBidsCount = document.getElementById('modalBidsCount');
const modalNextMinBid = document.getElementById('modalNextMinBid');
const modalDirectPrice = document.getElementById('modalDirectPrice');
const modalSpecsDimension = document.getElementById('modalSpecsDimension');
const bidInputAmount = document.getElementById('bidInputAmount');
const placeBidForm = document.getElementById('placeBidForm');
const bidHistoryList = document.getElementById('bidHistoryList');
const toggleBidHistoryBtn = document.getElementById('toggleBidHistoryBtn');

// Post Modal Elements
const postModal = document.getElementById('postModal');
const openPostModalBtn = document.getElementById('openPostModalBtn');
const closePostModalBtn = document.getElementById('closePostModalBtn');
const cancelPostBtn = document.getElementById('cancelPostBtn');
const postItemForm = document.getElementById('postItemForm');
const radioAuction = document.getElementById('radioAuction');
const radioBuyNow = document.getElementById('radioBuyNow');
const postAuctionFields = document.getElementById('postAuctionFields');
const postBuyNowFields = document.getElementById('postBuyNowFields');
const generateStoryBtn = document.getElementById('generateStoryBtn');

// Admin Modal Elements
const adminModal = document.getElementById('adminModal');
const openAdminModalBtn = document.getElementById('openAdminModalBtn');
const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
const pendingCountBadge = document.getElementById('pendingCountBadge');
const adminPendingBadge = document.getElementById('adminPendingBadge');
const adminIntakeBadge = document.getElementById('adminIntakeBadge');
const pendingCardsList = document.getElementById('pendingCardsList');
const intakeCardsList = document.getElementById('intakeCardsList');
const adminCatalogTableBody = document.getElementById('adminCatalogTableBody');
const adminSupplyTableBody = document.getElementById('adminSupplyTableBody');
const quickApproveAllBtn = document.getElementById('quickApproveAllBtn');
const simulateBuyerBidBtn = document.getElementById('simulateBuyerBidBtn');
const metricTotalWeight = document.getElementById('metricTotalWeight');
const statOceanWaste = document.getElementById('statOceanWaste');

// Blueprint Modal Elements
const blueprintModal = document.getElementById('blueprintModal');
const openBlueprintModalBtn = document.getElementById('openBlueprintModalBtn');
const closeBlueprintModalBtn = document.getElementById('closeBlueprintModalBtn');
const blueprintRecipesGrid = document.getElementById('blueprintRecipesGrid');
const aiWasteInput = document.getElementById('aiWasteInput');
const aiGenerateStoryBtn = document.getElementById('aiGenerateStoryBtn');
const aiResultBox = document.getElementById('aiResultBox');
const aiResultText = document.getElementById('aiResultText');
const aiCopyStoryBtn = document.getElementById('aiCopyStoryBtn');

// Supply Modal Elements (NEW)
const supplyModal = document.getElementById('supplyModal');
const openSupplyHubModalBtn = document.getElementById('openSupplyHubModalBtn');
const subnavSupplyHubBtn = document.getElementById('subnavSupplyHubBtn');
const closeSupplyModalBtn = document.getElementById('closeSupplyModalBtn');
const supplyKitsGrid = document.getElementById('supplyKitsGrid');

// Sell Waste Modal Elements (NEW)
const sellWasteModal = document.getElementById('sellWasteModal');
const openSellWasteModalBtn = document.getElementById('openSellWasteModalBtn');
const topSellWasteLink = document.getElementById('topSellWasteLink');
const closeSellWasteModalBtn = document.getElementById('closeSellWasteModalBtn');
const cancelSellWasteBtn = document.getElementById('cancelSellWasteBtn');
const sellWasteForm = document.getElementById('sellWasteForm');
const sellWasteType = document.getElementById('sellWasteType');
const sellWeightKg = document.getElementById('sellWeightKg');
const payoutCalcAmount = document.getElementById('payoutCalcAmount');
const payoutCreditAmount = document.getElementById('payoutCreditAmount');

// AI Vision Scanner Elements
const aiScannerDock = document.getElementById('aiScannerDock');
const openAiScannerBtn = document.getElementById('openAiScannerBtn');
const aiScannerModal = document.getElementById('aiScannerModal');
const closeAiScannerModalBtn = document.getElementById('closeAiScannerModalBtn');
const scannerTabAnalysisBtn = document.getElementById('scannerTabAnalysisBtn');
const scannerTabModelBtn = document.getElementById('scannerTabModelBtn');
const scannerTabHistoryBtn = document.getElementById('scannerTabHistoryBtn');
const scannerAnalysisView = document.getElementById('scannerAnalysisView');
const scannerModelView = document.getElementById('scannerModelView');
const scannerHistoryView = document.getElementById('scannerHistoryView');
const scannerHistoryCountBadge = document.getElementById('scannerHistoryCountBadge');
const hudMultiDetectionLayer = document.getElementById('hudMultiDetectionLayer');
const aiScannerVideo = document.getElementById('aiScannerVideo');
const aiScannerCanvas = document.getElementById('aiScannerCanvas');
const aiScannerImagePreview = document.getElementById('aiScannerImagePreview');
const hudLaserSweep = document.getElementById('hudLaserSweep');
const hudStatusBadge = document.getElementById('hudStatusBadge');
const hudStatusText = document.getElementById('hudStatusText');
const hudDetectionBox = document.getElementById('hudDetectionBox');
const hudDetectionTag = document.getElementById('hudDetectionTag');
const hudDetectionConf = document.getElementById('hudDetectionConf');
const aiTriggerScanBtn = document.getElementById('aiTriggerScanBtn');
const aiToggleCamBtn = document.getElementById('aiToggleCamBtn');
const aiToggleCamIcon = document.getElementById('aiToggleCamIcon');
const aiToggleCamText = document.getElementById('aiToggleCamText');
const aiUploadImgBtn = document.getElementById('aiUploadImgBtn');
const aiScannerFileInput = document.getElementById('aiScannerFileInput');
const aiAnalysisDynamicContent = document.getElementById('aiAnalysisDynamicContent');
const scannerHistoryList = document.getElementById('scannerHistoryList');
const clearScannerHistoryBtn = document.getElementById('clearScannerHistoryBtn');


// Zone Modal Handlers (Consolidated Zone Navigation)
function openZoneModal() {
  if (zoneModal) {
    zoneModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeZoneModal() {
  if (zoneModal) {
    zoneModal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function selectZoneCategory(categoryKey) {
  state.selectedCategory = categoryKey;

  document.querySelectorAll('.cat-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-category') === categoryKey);
  });

  const zoneInfo = ZONE_MAP[categoryKey] || ZONE_MAP['all'];
  if (activeZoneName) {
    activeZoneName.innerHTML = `${zoneInfo.name}`;
  }
  const headerZoneTitle = document.querySelector('.header-zone-title');
  if (headerZoneTitle) {
    headerZoneTitle.innerHTML = `โซน: ${zoneInfo.shortName}`;
  }
  if (catalogHeading) {
    catalogHeading.innerHTML = `${zoneInfo.icon} ${zoneInfo.heading}`;
  }

  closeZoneModal();

  if (categoryKey === 'supply') {
    openSupplyModal();
    return;
  }

  renderCatalog();

  const catalogSection = document.querySelector('.catalog-controls-section');
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Formatters
function formatCurrency(amount) {
  return '฿' + Number(amount).toLocaleString('th-TH');
}

function formatTime(seconds) {
  if (seconds <= 0) return 'จบการประมูลแล้ว';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ==========================================================================
// CATALOG RENDERING
// ==========================================================================
function renderCatalog() {
  let list = [...state.products];

  if (state.selectedCategory !== 'all') {
    if (state.selectedCategory === 'bangsaen') {
      list = list.filter(p => p.isBangsaen);
    } else if (state.selectedCategory === 'auction') {
      list = list.filter(p => p.saleType === 'auction');
    } else {
      list = list.filter(p => p.category === state.selectedCategory);
    }
  }

  if (state.activeFilterPill === 'free-shipping') {
    list = list.filter(p => p.freeShipping);
  } else if (state.activeFilterPill === 'auction-only') {
    list = list.filter(p => p.saleType === 'auction');
  } else if (state.activeFilterPill === 'buy-now') {
    list = list.filter(p => p.saleType === 'buynow');
  } else if (state.activeFilterPill === 'bangsaen') {
    list = list.filter(p => p.isBangsaen);
  } else if (state.activeFilterPill === 'verified') {
    list = list.filter(p => p.verified);
  }

  if (state.searchKeyword.trim() !== '') {
    const q = state.searchKeyword.trim().toLowerCase();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.storyQuote.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.artist.toLowerCase().includes(q)
    );
  }

  if (state.sortOption === 'price-low') {
    list.sort((a, b) => (a.saleType === 'auction' ? a.currentBid : a.price) - (b.saleType === 'auction' ? b.currentBid : b.price));
  } else if (state.sortOption === 'price-high') {
    list.sort((a, b) => (b.saleType === 'auction' ? b.currentBid : b.price) - (a.saleType === 'auction' ? a.currentBid : a.price));
  } else if (state.sortOption === 'auction-ending') {
    list.sort((a, b) => (a.endsInSeconds || 999999) - (b.endsInSeconds || 999999));
  } else if (state.sortOption === 'bids-count') {
    list.sort((a, b) => (b.bidsCount || 0) - (a.bidsCount || 0));
  } else if (state.sortOption === 'newest') {
    list.sort((a, b) => b.id - a.id);
  }

  itemsCountText.textContent = `พบ ${list.length} รายการ`;

  if (list.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
        <button class="btn btn-secondary" onclick="resetFilters()">ล้างตัวกรองทั้งหมด</button>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = list.map(item => {
    const frontImg = item.angles[0]?.img || 'assets/necklace_front.jpg';
    const sideImg = item.angles[1]?.img || frontImg;
    const wornAngle = item.angles.find(a => a.isWorn);
    const wornImg = item.wornImg || (wornAngle ? wornAngle.img : frontImg);
    const isWish = state.wishlist.has(item.id);

    return `
      <article class="product-card" data-product-id="${item.id}">
        <div class="card-media">
          <img src="${frontImg}" alt="${item.title}" class="card-img-main" loading="lazy">
          <img src="${sideImg}" alt="${item.title} มุมมองด้านข้าง" class="card-img-hover" loading="lazy">
          <img src="${wornImg}" alt="${item.title} ลุคสวมใส่จริง" class="card-img-worn" loading="lazy">
          
          <span class="card-status-badge ${item.saleType}">
            ${item.saleType === 'auction' ? '🔨 กำลังประมูล' : '🛒 ซื้อทันที'}
          </span>

          <span class="card-worn-indicator" style="display: none;">✨ สวมใส่จริง</span>

          <div class="card-view-switcher" onclick="event.stopPropagation()">
            <button class="card-view-btn active" data-view="main" onclick="switchCardPhoto(event, ${item.id}, 'main')" title="ดูตัวชิ้นงาน">
              💎 ชิ้นงาน
            </button>
            <button class="card-view-btn" data-view="worn" onclick="switchCardPhoto(event, ${item.id}, 'worn')" title="ดูภาพขณะสวมใส่/จัดวางจริง">
              👤 ตอนสวมใส่
            </button>
          </div>

          <button class="card-wishlist-toggle ${isWish ? 'favorited' : ''}" title="บันทึกเป็นของโปรด" onclick="toggleWishlist(event, ${item.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </button>
        </div>

        <div class="card-body">
          <div class="card-origin">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${item.origin}</span>
          </div>

          <h3 class="card-title">${item.title}</h3>

          <div class="card-story-quote">
            "${item.storyQuote}"
          </div>

          <div class="card-pricing-footer">
            <div class="card-price-block">
              <span class="card-price-label">${item.saleType === 'auction' ? 'ราคาประมูลปัจจุบัน' : 'ราคาขายตรง'}</span>
              <span class="card-price-value">${formatCurrency(item.saleType === 'auction' ? item.currentBid : item.price)}</span>
              ${item.saleType === 'auction' ? `
                <span class="card-countdown-timer" id="timer-${item.id}">⏱️ ${formatTime(item.endsInSeconds)}</span>
              ` : ''}
            </div>

            ${item.saleType === 'auction' ? `
              <span class="card-bids-pill">เคาะแล้ว ${item.bidsCount} ครั้ง</span>
            ` : `
              <span class="card-bids-pill" style="background:#d1fae5; color:#065f46;">พร้อมส่ง</span>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-wishlist-toggle') || e.target.closest('.card-view-switcher')) return;
      const pid = parseInt(card.getAttribute('data-product-id'), 10);
      openProductDetail(pid, e);
    });
  });
}

window.switchCardPhoto = function(event, id, mode) {
  event.stopPropagation();
  const card = document.querySelector(`.product-card[data-product-id="${id}"]`);
  if (!card) return;
  const wornIndicator = card.querySelector('.card-worn-indicator');
  const btns = card.querySelectorAll('.card-view-btn');

  btns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === mode);
  });

  if (mode === 'worn') {
    card.classList.add('show-worn');
    if (wornIndicator) wornIndicator.style.display = 'inline-flex';
  } else {
    card.classList.remove('show-worn');
    if (wornIndicator) wornIndicator.style.display = 'none';
  }
};

window.resetFilters = function() {
  state.selectedCategory = 'all';
  state.activeFilterPill = 'all';
  state.searchKeyword = '';
  searchInput.value = '';
  searchClearBtn.classList.remove('visible');
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));
  filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
  if (activeZoneName) activeZoneName.innerHTML = 'ทั้งหมด (All Items)';
  const headerZoneTitle = document.querySelector('.header-zone-title');
  if (headerZoneTitle) headerZoneTitle.innerHTML = 'เลือกโซนสินค้า';
  if (catalogHeading) catalogHeading.innerHTML = 'สินค้าอัพไซเคิลทั้งหมด';
  renderCatalog();
};

window.toggleWishlist = function(event, id) {
  event.stopPropagation();
  if (state.wishlist.has(id)) {
    state.wishlist.delete(id);
    showToast('ลบออกจากรายการโปรดแล้ว');
  } else {
    state.wishlist.add(id);
    showToast('บันทึกลงในรายการโปรดแล้ว ❤️');
  }
  renderCatalog();
};

// ==========================================================================
// NIKE-STYLE MULTI-ANGLE & ON-MODEL DETAIL VIEW
// ==========================================================================
function openProductDetail(productId, clickEvent) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProduct = product;
  state.activeAngleIndex = 0;

  modalCategory.textContent = product.category === 'jewelry' ? 'เครื่องประดับ' : product.category === 'fashion' ? 'แฟชั่น & แว่นตา' : product.category === 'collectibles' ? 'ของสะสม' : 'ของแต่งบ้าน';
  modalOriginText.textContent = product.origin;
  modalTitle.textContent = product.title;
  modalArtist.textContent = product.artist;
  modalStoryQuote.textContent = `"${product.storyQuote}"`;
  modalStoryDesc.textContent = product.storyDesc;
  modalSpecsDimension.textContent = product.dimensions || 'ขนาดมาตรฐานดีไซน์สตูดิโอ';

  modalMaterialsList.innerHTML = product.materials.map(m => `
    <span class="material-chip">${m}</span>
  `).join('');

  if (product.saleType === 'auction') {
    auctionModeSection.style.display = 'block';
    directBuySection.style.display = 'none';
    modalCurrentBid.textContent = formatCurrency(product.currentBid);
    modalBidsCount.textContent = `เคาะแล้ว ${product.bidsCount} ครั้ง`;
    const minNext = product.currentBid + product.minIncrement;
    modalNextMinBid.textContent = formatCurrency(minNext);
    bidInputAmount.min = minNext;
    bidInputAmount.value = minNext;
    modalCountdown.textContent = formatTime(product.endsInSeconds);
    renderBidHistory(product.bidHistory);
  } else {
    auctionModeSection.style.display = 'none';
    directBuySection.style.display = 'block';
    modalDirectPrice.textContent = formatCurrency(product.price);
  }

  // Floating Zoom-In Origin Calculation
  const card = (clickEvent && clickEvent.currentTarget) ? clickEvent.currentTarget.closest('.product-card') : document.querySelector(`.product-card[data-product-id="${productId}"]`);
  if (card) {
    const cardMedia = card.querySelector('.card-media') || card;
    const rect = cardMedia.getBoundingClientRect();
    const dialogCenterX = window.innerWidth / 2;
    const dialogCenterY = window.innerHeight / 2;
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const flyX = cardCenterX - dialogCenterX;
    const flyY = cardCenterY - dialogCenterY;
    const flyScale = Math.max(0.3, Math.min(0.55, rect.width / 820));

    detailModal.style.setProperty('--fly-x', `${Math.round(flyX)}px`);
    detailModal.style.setProperty('--fly-y', `${Math.round(flyY)}px`);
    detailModal.style.setProperty('--fly-scale', flyScale.toFixed(2));
  } else {
    detailModal.style.setProperty('--fly-x', `0px`);
    detailModal.style.setProperty('--fly-y', `30px`);
    detailModal.style.setProperty('--fly-scale', `0.85`);
  }

  renderGalleryThumbnails();
  selectAngle(0);

  detailModal.classList.remove('closing');
  detailModal.classList.add('open');
  detailModal.classList.add('zooming-in');
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  detailModal.classList.add('closing');
  setTimeout(() => {
    detailModal.classList.remove('open', 'zooming-in', 'closing');
    document.body.style.overflow = '';
    state.selectedProduct = null;
  }, 230);
}

function renderGalleryThumbnails() {
  const product = state.selectedProduct;
  if (!product || !product.angles) return;

  const thumbsHtml = product.angles.map((ang, idx) => `
    <div class="thumb-item ${ang.isWorn ? 'thumb-worn' : ''} ${idx === state.activeAngleIndex ? 'active' : ''}" data-thumb-idx="${idx}" title="${ang.label}">
      <img src="${ang.img}" alt="${ang.label}">
      <span class="thumb-label">${ang.isWorn ? '👤 สวมใส่' : (ang.tag || ang.label.split(' ')[0])}</span>
    </div>
  `).join('');

  verticalThumbsList.innerHTML = thumbsHtml;

  verticalThumbsList.querySelectorAll('.thumb-item').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-thumb-idx'), 10);
      selectAngle(idx);
    });
  });

  const angleButtonsHtml = product.angles.map((ang, idx) => `
    <button class="angle-btn ${ang.isWorn ? 'angle-worn' : ''} ${idx === state.activeAngleIndex ? 'active' : ''}" data-angle-idx="${idx}">
      ${ang.isWorn ? '👤 ' : ''}${ang.label}
    </button>
  `).join('');

  anglePillsGroup.innerHTML = angleButtonsHtml;

  anglePillsGroup.querySelectorAll('.angle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-angle-idx'), 10);
      selectAngle(idx);
    });
  });
}

function selectAngle(index) {
  const product = state.selectedProduct;
  if (!product || !product.angles || product.angles.length === 0) return;

  if (index < 0) index = product.angles.length - 1;
  if (index >= product.angles.length) index = 0;

  state.activeAngleIndex = index;
  const angle = product.angles[index];

  viewerMainImg.classList.add('switching');
  setTimeout(() => {
    viewerMainImg.src = angle.img;
    viewerMainImg.alt = angle.label;
    viewerMainImg.classList.remove('switching');
  }, 80);

  currentAngleText.textContent = `${angle.label} • ${angle.desc}`;

  if (angleBadge) {
    angleBadge.classList.toggle('is-worn', Boolean(angle.isWorn));
  }

  if (angleCounterText) {
    angleCounterText.textContent = `มุมมองที่ ${index + 1} จาก ${product.angles.length}`;
  }

  document.querySelectorAll('.thumb-item').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-thumb-idx') === String(index));
  });
  document.querySelectorAll('.angle-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-angle-idx') === String(index));
  });
}

// Chevron navigation & Keyboard arrow listener
if (prevAngleBtn) {
  prevAngleBtn.onclick = (e) => {
    e.stopPropagation();
    selectAngle(state.activeAngleIndex - 1);
  };
}

if (nextAngleBtn) {
  nextAngleBtn.onclick = (e) => {
    e.stopPropagation();
    selectAngle(state.activeAngleIndex + 1);
  };
}

window.addEventListener('keydown', (e) => {
  if (!detailModal.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    selectAngle(state.activeAngleIndex - 1);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    selectAngle(state.activeAngleIndex + 1);
  } else if (e.key === 'Escape') {
    closeProductDetail();
  }
});

function renderBidHistory(history) {
  if (!history || history.length === 0) {
    bidHistoryList.innerHTML = `<p style="font-size: 0.75rem; color: var(--text-muted);">ยังไม่มีประวัติการเสนอราคา</p>`;
    return;
  }

  bidHistoryList.innerHTML = history.map(h => `
    <div class="bid-log-row">
      <span class="bid-log-user">${h.user}</span>
      <span class="bid-log-price">${formatCurrency(h.amount)}</span>
      <span class="bid-log-time">${h.time}</span>
    </div>
  `).join('');
}

toggleBidHistoryBtn.addEventListener('click', () => {
  bidHistoryList.style.display = bidHistoryList.style.display === 'none' ? 'flex' : 'none';
});

// Bidding Engine
function submitBid(amount, isSimulated = false, bidderName = 'คุณ (ผู้เสนอราคาสูงสุด)') {
  const product = state.selectedProduct;
  if (!product || product.saleType !== 'auction') return;

  const minAllowed = product.currentBid + product.minIncrement;
  if (amount < minAllowed) {
    showToast(`กรุณาเสนอราคาขั้นต่ำ ${formatCurrency(minAllowed)}`, 'warning');
    return;
  }

  product.currentBid = amount;
  product.bidsCount += 1;
  if (!isSimulated) {
    state.userBidsCount += 1;
    bidCountBadge.textContent = state.userBidsCount;
  }

  product.bidHistory.unshift({
    user: bidderName,
    amount: amount,
    time: 'เมื่อสักครู่'
  });

  modalCurrentBid.textContent = formatCurrency(product.currentBid);
  modalBidsCount.textContent = `เคาะแล้ว ${product.bidsCount} ครั้ง`;
  const newMin = product.currentBid + product.minIncrement;
  modalNextMinBid.textContent = formatCurrency(newMin);
  bidInputAmount.min = newMin;
  bidInputAmount.value = newMin;
  renderBidHistory(product.bidHistory);

  renderCatalog();
  renderAdminCatalogTable();

  if (!isSimulated) {
    showToast(`เคาะประมูลสำเร็จที่ ${formatCurrency(amount)}! ตอนนี้คุณคือผู้เสนอราคาสูงสุด 🎉`, 'auction');
  } else {
    showToast(`[บอทจำลอง] ผู้ใช้ "${bidderName}" เคาะเสนอราคาชิ้นงานเป็น ${formatCurrency(amount)}!`, 'auction');
  }
}

document.querySelectorAll('.btn-quick-bid').forEach(btn => {
  btn.addEventListener('click', () => {
    const addVal = parseInt(btn.getAttribute('data-add'), 10);
    const product = state.selectedProduct;
    if (product) {
      submitBid(product.currentBid + addVal);
    }
  });
});

placeBidForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const amt = parseInt(bidInputAmount.value, 10);
  submitBid(amt);
});

document.getElementById('buyNowBtn')?.addEventListener('click', () => {
  const product = state.selectedProduct;
  if (!product) return;
  showToast(`เพิ่ม "${product.title}" ลงในตะกร้าสินค้าเรียบร้อย! เตรียมพร้อมจัดส่ง 📦`);
  closeProductDetail();
});

// Countdown Timer Loop
setInterval(() => {
  state.products.forEach(p => {
    if (p.saleType === 'auction' && p.endsInSeconds > 0) {
      p.endsInSeconds -= 1;
      const timerEl = document.getElementById(`timer-${p.id}`);
      if (timerEl) {
        timerEl.textContent = '⏱️ ' + formatTime(p.endsInSeconds);
      }
      if (state.selectedProduct && state.selectedProduct.id === p.id) {
        modalCountdown.textContent = formatTime(p.endsInSeconds);
      }
    }
  });

  const heroCountdown = document.getElementById('heroCountdown');
  if (heroCountdown && state.products[0]) {
    heroCountdown.textContent = formatTime(state.products[0].endsInSeconds);
  }
}, 1000);

// ==========================================================================
// SELL WASTE (ระบบส่งขยะขายให้เรา)
// ==========================================================================
function openSellWasteModal() {
  sellWasteModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  updatePayoutCalculator();
}

function closeSellWasteModal() {
  sellWasteModal.classList.remove('open');
  document.body.style.overflow = '';
}

openSellWasteModalBtn.addEventListener('click', openSellWasteModal);
topSellWasteLink?.addEventListener('click', (e) => {
  e.preventDefault();
  openSellWasteModal();
});
closeSellWasteModalBtn.addEventListener('click', closeSellWasteModal);
cancelSellWasteBtn.addEventListener('click', closeSellWasteModal);

document.getElementById('footerOpenSellWaste')?.addEventListener('click', (e) => {
  e.preventDefault();
  openSellWasteModal();
});

function updatePayoutCalculator() {
  const key = sellWasteType.value;
  const weight = parseFloat(sellWeightKg.value) || 0;
  const item = WASTE_PRICE_INDEX[key] || WASTE_PRICE_INDEX.seaglass;
  const total = Math.round(item.rate * weight);
  const creditTotal = Math.round(total * 1.15);

  payoutCalcAmount.textContent = formatCurrency(total);
  payoutCreditAmount.textContent = formatCurrency(creditTotal);
}

sellWasteType.addEventListener('change', updatePayoutCalculator);
sellWeightKg.addEventListener('input', updatePayoutCalculator);

// Select price card shortcut
document.querySelectorAll('.price-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-waste-key');
    sellWasteType.value = key;
    document.querySelectorAll('.price-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    updatePayoutCalculator();
  });
});

// Sell Waste Form Submit
sellWasteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const key = sellWasteType.value;
  const weight = parseFloat(sellWeightKg.value) || 1;
  const collector = document.getElementById('sellCollectorName').value.trim();
  const location = document.getElementById('sellLocation').value.trim();
  const dropMethod = document.getElementById('sellDropMethod').value;
  const payoutType = document.querySelector('input[name="payoutType"]:checked').value;
  const promptPay = document.getElementById('sellPromptPay').value.trim();
  const notes = document.getElementById('sellNotes').value.trim();

  const wasteInfo = WASTE_PRICE_INDEX[key] || WASTE_PRICE_INDEX.seaglass;
  const payoutAmount = Math.round(wasteInfo.rate * weight);

  const newSubmission = {
    id: Date.now(),
    collectorName: collector,
    wasteTypeKey: key,
    wasteTypeName: wasteInfo.name,
    weightKg: weight,
    location,
    payoutAmount,
    payoutType,
    promptPay: payoutType === 'credit' ? `Circular Credits (ได้รับ ${formatCurrency(Math.round(payoutAmount * 1.15))})` : promptPay,
    notes: notes || 'คัดแยกสะอาดตามมาตรฐานชุมชน',
    thumb: wasteInfo.thumb,
    date: 'เมื่อสักครู่',
    status: 'pending',
    targetKitId: wasteInfo.targetKit
  };

  state.customerWasteSubmissions.unshift(newSubmission);
  updateAdminBadges();

  sellWasteForm.reset();
  closeSellWasteModal();

  showToast(`ส่งรายการขายขยะ ${weight} กก. สำเร็จแล้ว! ยอดเงิน ${formatCurrency(payoutAmount)} รอการตรวจรับในระบบหลังบ้าน 🎉`);
});

// ==========================================================================
// WASTE SUPPLY HUB (คลังวัตถุดิบขยะคัดแยกพร้อมทำขาย)
// ==========================================================================
function openSupplyModal() {
  supplyModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderSupplyKits();
}

function closeSupplyModal() {
  supplyModal.classList.remove('open');
  document.body.style.overflow = '';
}

openSupplyHubModalBtn?.addEventListener('click', openSupplyModal);
subnavSupplyHubBtn?.addEventListener('click', openSupplyModal);
closeSupplyModalBtn?.addEventListener('click', closeSupplyModal);
document.getElementById('footerOpenSupply')?.addEventListener('click', (e) => {
  e.preventDefault();
  openSupplyModal();
});

function renderSupplyKits() {
  supplyKitsGrid.innerHTML = state.rawMaterialKits.map(kit => `
    <div class="supply-kit-card">
      <div class="supply-kit-top">
        <img src="${kit.thumb}" alt="${kit.name}" class="supply-kit-thumb">
        <div class="supply-kit-info">
          <span class="supply-origin-badge">📍 ${kit.origin}</span>
          <h3 class="supply-kit-title">${kit.name}</h3>
          <span class="supply-stock-pill">✓ มีสต็อกพร้อมส่ง ${kit.stock} ชุด</span>
        </div>
      </div>

      <div class="supply-kit-body">
        <div class="supply-profit-box">
          <div class="cost-side">
            <span>ต้นทุนรับวัตถุดิบชุดนี้</span>
            <strong>${formatCurrency(kit.price)}</strong>
          </div>
          <div class="profit-side">
            <span>ทำขายตามพิมพ์เขียว กำไรประมาณ</span>
            <strong>+${formatCurrency(kit.estProfit)}</strong>
          </div>
        </div>

        <div class="supply-items-list">
          <strong>📦 ภายในชุดประกอบด้วย:</strong><br>
          ${kit.boxIncludes}
        </div>

        <div class="supply-actions-row">
          <button class="btn-claim-kit" onclick="orderSupplyKit('${kit.id}')">
            🛒 สั่งรับวัตถุดิบชุดนี้ (${formatCurrency(kit.price)})
          </button>
          <button class="btn-link-bp" onclick="viewKitBlueprint('${kit.targetBlueprintId}')">
            📖 ดูพิมพ์เขียววิธีทำ
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.orderSupplyKit = function(kitId) {
  const kit = state.rawMaterialKits.find(k => k.id === kitId);
  if (!kit || kit.stock <= 0) return;

  kit.stock -= 1;
  renderSupplyKits();
  renderAdminSupplyTable();

  showToast(`สั่งรับ "${kit.name}" สำเร็จ! เตรียมจัดส่งกล่องวัตถุดิบถึงคุณ พร้อมคู่มือพิมพ์เขียว 📦`);
};

window.viewKitBlueprint = function(bpId) {
  closeSupplyModal();
  blueprintModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderBlueprints();
};

// ==========================================================================
// ADMIN STUDIO BACKEND (รวมการอนุมัติสินค้า และตรวจรับขยะที่ลูกค้าส่งขาย)
// ==========================================================================
openAdminModalBtn.addEventListener('click', () => {
  adminModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderPendingCards();
  renderCustomerIntakeList();
  renderAdminCatalogTable();
  renderAdminSupplyTable();
});

closeAdminModalBtn.addEventListener('click', () => {
  adminModal.classList.remove('open');
  document.body.style.overflow = '';
});

document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
    
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    if (target === 'pending') {
      document.getElementById('tabPanelPending').classList.add('active');
      renderPendingCards();
    } else if (target === 'intake') {
      document.getElementById('tabPanelIntake').classList.add('active');
      renderCustomerIntakeList();
    } else if (target === 'catalog') {
      document.getElementById('tabPanelCatalog').classList.add('active');
      renderAdminCatalogTable();
    } else if (target === 'supply') {
      document.getElementById('tabPanelSupply').classList.add('active');
      renderAdminSupplyTable();
    } else if (target === 'metrics') {
      document.getElementById('tabPanelMetrics').classList.add('active');
    }
  });
});

function updateAdminBadges() {
  const pendingCount = state.pendingProducts.length;
  const intakeCount = state.customerWasteSubmissions.filter(s => s.status === 'pending').length;
  const totalAlerts = pendingCount + intakeCount;

  pendingCountBadge.textContent = totalAlerts;
  adminPendingBadge.textContent = pendingCount;
  adminIntakeBadge.textContent = intakeCount;
  pendingCountBadge.style.display = totalAlerts > 0 ? 'inline-block' : 'none';

  metricTotalWeight.textContent = `${state.totalRescuedKg.toLocaleString()} กก.`;
  if (statOceanWaste) {
    statOceanWaste.textContent = `${(state.totalRescuedKg / 1000).toFixed(1)} ตัน`;
  }
}

// Render Customer Waste Intake Queue
function renderCustomerIntakeList() {
  const pendingList = state.customerWasteSubmissions.filter(s => s.status === 'pending');

  if (pendingList.length === 0) {
    intakeCardsList.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; background: white; border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
        <p style="font-size: 1.1rem; color: #059669; font-weight: 700; margin-bottom: 6px;">✓ ไม่มีรายการส่งขยะค้างตรวจรับ</p>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">ขยะทั้งหมดได้รับการตรวจรับ โอนเงิน และส่งเข้าคลังวัตถุดิบเรียบร้อยแล้ว</p>
      </div>
    `;
    return;
  }

  intakeCardsList.innerHTML = pendingList.map(item => `
    <div class="intake-card" id="intake-card-${item.id}">
      <img src="${item.thumb}" alt="${item.wasteTypeName}" class="intake-thumb">

      <div class="intake-details">
        <div class="intake-meta">
          <span class="intake-badge">ขยะเข้าใหม่ ${item.weightKg} กก.</span>
          <span style="font-size:0.75rem; color:#0d9488; font-weight:600;">📍 ${item.location}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">• ${item.date}</span>
        </div>

        <h4 class="intake-title">${item.wasteTypeName}</h4>
        <div class="intake-seller">ผู้เก็บขยะ: <strong>${item.collectorName}</strong> • ช่องทางรับเงิน: ${item.promptPay}</div>
        <div class="intake-note">"${item.notes}"</div>
      </div>

      <div class="intake-actions">
        <div class="intake-payout-box">
          <span>ยอดเงินที่ต้องโอน:</span>
          <strong>${formatCurrency(item.payoutAmount)}</strong>
        </div>
        <button class="btn-intake-approve" onclick="acceptCustomerWaste(${item.id})">
          ✓ ตรวจรับขยะ & โอนเงิน
        </button>
      </div>
    </div>
  `).join('');
}

// Admin Accept Customer Waste: Pay money + Add stock to Waste Supply Hub + Add rescued weight!
window.acceptCustomerWaste = function(subId) {
  const sub = state.customerWasteSubmissions.find(s => s.id === subId);
  if (!sub) return;

  sub.status = 'completed';

  // 1. Add to total rescued weight
  state.totalRescuedKg += sub.weightKg;

  // 2. Add stock to matching Raw Material Kit
  const kit = state.rawMaterialKits.find(k => k.id === sub.targetKitId);
  if (kit) {
    kit.stock += Math.ceil(sub.weightKg / 2);
  }

  updateAdminBadges();
  renderCustomerIntakeList();
  renderSupplyKits();
  renderAdminSupplyTable();

  showToast(`ตรวจรับขยะ ${sub.weightKg} กก. จาก "${sub.collectorName}" สำเร็จ! โอนเงิน ${formatCurrency(sub.payoutAmount)} และส่งวัตถุดิบเข้าคลังพร้อมให้ช่างเบิกแล้ว 🎉`);
};

// Render Admin Supply Inventory Table
function renderAdminSupplyTable() {
  adminSupplyTableBody.innerHTML = state.rawMaterialKits.map(kit => `
    <tr>
      <td>
        <strong>${kit.name}</strong><br>
        <small style="color:var(--text-secondary);">${kit.boxIncludes.substring(0, 50)}...</small>
      </td>
      <td>${kit.origin}</td>
      <td>
        <strong style="color:#059669;">${kit.stock} ชุด</strong>
      </td>
      <td><strong>${formatCurrency(kit.price)}</strong></td>
      <td>${kit.targetBlueprintName}</td>
      <td>
        <span style="color:#0891b2; font-weight:700;">+${formatCurrency(kit.estProfit)}</span>
      </td>
    </tr>
  `).join('');
}

// Add new waste batch button in Admin
document.getElementById('addNewWasteBatchBtn')?.addEventListener('click', () => {
  const weight = 50;
  state.totalRescuedKg += weight;
  state.rawMaterialKits[0].stock += 15;
  state.rawMaterialKits[1].stock += 20;
  updateAdminBadges();
  renderSupplyKits();
  renderAdminSupplyTable();
  showToast(`บันทึกรับขยะหาดบางแสนล็อตใหม่ +${weight} กก. เข้าคลังวัตถุดิบเรียบร้อย! 🌿`);
});

// Render Pending Products Queue
function renderPendingCards() {
  updateAdminBadges();

  if (state.pendingProducts.length === 0) {
    pendingCardsList.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; background: white; border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
        <p style="font-size: 1.1rem; color: #059669; font-weight: 700; margin-bottom: 6px;">✓ ไม่มีสินค้าค้างตรวจสอบ</p>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">สินค้าทั้งหมดได้รับการอนุมัติและวางจำหน่ายบนหน้าเว็บเรียบร้อยแล้ว</p>
      </div>
    `;
    return;
  }

  pendingCardsList.innerHTML = state.pendingProducts.map(item => `
    <div class="pending-card" id="pending-card-${item.id}">
      <div class="pending-card-media">
        <img src="${item.angles[0]?.img || 'assets/necklace_front.jpg'}" alt="${item.title}">
        <span class="angle-count-pill">${item.angles.length} มุมมอง</span>
      </div>

      <div class="pending-card-info">
        <div class="pending-info-meta">
          <span class="pending-badge-status">รออนุมัติ (Pending)</span>
          <span class="pending-origin-tag">📍 ${item.origin}</span>
        </div>
        <h4 class="pending-card-title">${item.title}</h4>
        <div class="pending-creator">โดย: <strong>${item.artist}</strong> • หมวดหมู่: ${item.category}</div>
        
        <div class="pending-quote-callout">
          "${item.storyQuote}"
        </div>

        <div class="pending-materials-chips">
          ${item.materials.map(m => `<span class="pending-mat-chip">${m}</span>`).join('')}
        </div>
      </div>

      <div class="pending-actions">
        <div class="pending-price-box">
          <span>${item.saleType === 'auction' ? 'ราคาเริ่มประมูล' : 'ราคาขายตรง'}</span>
          <strong>${formatCurrency(item.saleType === 'auction' ? item.startingBid : item.price)}</strong>
        </div>
        <button class="btn-approve" onclick="approvePendingItem(${item.id})">
          ✓ อนุมัติ & เผยแพร่ทันที
        </button>
        <button class="btn-reject" onclick="rejectPendingItem(${item.id})">
          ✕ ปฏิเสธ / ขอแก้ไข
        </button>
      </div>
    </div>
  `).join('');
}

window.approvePendingItem = function(id) {
  const index = state.pendingProducts.findIndex(p => p.id === id);
  if (index === -1) return;

  const item = state.pendingProducts.splice(index, 1)[0];
  state.products.unshift(item);

  updateAdminBadges();
  renderPendingCards();
  renderCatalog();
  renderAdminCatalogTable();

  showToast(`อนุมัติ "${item.title}" เรียบร้อยแล้ว! ตอนนี้สินค้าขึ้นหน้าแรกและเปิดให้คนทั่วไปดูแล้ว 🎉`);
};

window.rejectPendingItem = function(id) {
  const index = state.pendingProducts.findIndex(p => p.id === id);
  if (index === -1) return;

  const item = state.pendingProducts.splice(index, 1)[0];
  updateAdminBadges();
  renderPendingCards();
  showToast(`ปฏิเสธรายการ "${item.title}" และส่งข้อความแจ้งศิลปินแล้ว`, 'warning');
};

quickApproveAllBtn.addEventListener('click', () => {
  if (state.pendingProducts.length === 0) {
    showToast('ไม่มีรายการค้างตรวจ');
    return;
  }
  const count = state.pendingProducts.length;
  state.products.unshift(...state.pendingProducts);
  state.pendingProducts = [];
  updateAdminBadges();
  renderPendingCards();
  renderCatalog();
  renderAdminCatalogTable();
  showToast(`อนุมัติสินค้าทั้งหมด ${count} รายการขึ้นหน้าร้านเรียบร้อย! ✨`);
});

function renderAdminCatalogTable() {
  adminCatalogTableBody.innerHTML = state.products.map(item => `
    <tr>
      <td>
        <img src="${item.angles[0]?.img || 'assets/necklace_front.jpg'}" class="admin-thumb" alt="${item.title}">
      </td>
      <td>
        <strong>${item.title}</strong><br>
        <small style="color:var(--text-secondary);">${item.artist}</small>
      </td>
      <td>${item.origin}</td>
      <td>
        <span class="card-status-badge ${item.saleType}">
          ${item.saleType === 'auction' ? '🔨 ประมูล' : '🛒 ขายตรง'}
        </span>
      </td>
      <td>
        <strong>${formatCurrency(item.saleType === 'auction' ? item.currentBid : item.price)}</strong>
        ${item.saleType === 'auction' ? `<br><small style="color:#0d9488;">(${item.bidsCount} เคาะ)</small>` : ''}
      </td>
      <td>
        <span style="color:#059669; font-weight:700; font-size:0.75rem;">● วางจำหน่าย</span>
      </td>
      <td>
        <button class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:0.75rem;" onclick="openProductDetail(${item.id})">
          เปิดดูสินค้า
        </button>
      </td>
    </tr>
  `).join('');
}

simulateBuyerBidBtn.addEventListener('click', () => {
  const auctions = state.products.filter(p => p.saleType === 'auction');
  if (auctions.length === 0) return;

  const target = auctions[Math.floor(Math.random() * auctions.length)];
  const names = ['Korn_Bangsaen', 'Chonburi_EcoArt', 'Bangkok_Hype', 'SiamCollector', 'GreenCitizen_99'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const inc = target.minIncrement || 100;
  target.currentBid += inc;
  target.bidsCount += 1;

  target.bidHistory.unshift({
    user: randomName,
    amount: target.currentBid,
    time: 'เมื่อสักครู่'
  });

  renderCatalog();
  renderAdminCatalogTable();

  if (state.selectedProduct && state.selectedProduct.id === target.id) {
    modalCurrentBid.textContent = formatCurrency(target.currentBid);
    modalBidsCount.textContent = `เคาะแล้ว ${target.bidsCount} ครั้ง`;
    const newMin = target.currentBid + target.minIncrement;
    modalNextMinBid.textContent = formatCurrency(newMin);
    bidInputAmount.min = newMin;
    bidInputAmount.value = newMin;
    renderBidHistory(target.bidHistory);
  }

  showToast(`[บอทจำลอง] ผู้ใช้ "${randomName}" เคาะประมูลชิ้นงาน "${target.title}" ที่ ${formatCurrency(target.currentBid)}!`, 'auction');
});

// ==========================================================================
// BLUEPRINT STUDIO & AI ASSISTANT
// ==========================================================================
function openBlueprintModal() {
  if (blueprintModal) {
    blueprintModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderBlueprints();
  }
}

openBlueprintModalBtn.addEventListener('click', openBlueprintModal);
document.getElementById('footerOpenBlueprint')?.addEventListener('click', (e) => {
  e.preventDefault();
  openBlueprintModal();
});

closeBlueprintModalBtn.addEventListener('click', () => {
  blueprintModal.classList.remove('open');
  document.body.style.overflow = '';
});

function renderBlueprints() {
  blueprintRecipesGrid.innerHTML = BLUEPRINTS.map(bp => `
    <div class="blueprint-card" data-blueprint-id="${bp.id}">
      <div class="blueprint-card-top">
        <img src="${bp.thumb}" alt="${bp.name}" class="blueprint-thumb">
        <div class="blueprint-top-info">
          <span class="diff-badge ${bp.diffClass}">${bp.difficulty}</span>
          <h3 class="blueprint-name">${bp.name}</h3>
          <span class="blueprint-price-suggest">${bp.priceSuggest}</span>
        </div>
      </div>

      <div class="blueprint-body">
        <div class="materials-needed-box">
          <strong>♻️ วัตถุดิบขยะที่ต้องใช้:</strong>
          <span>${bp.materialsNeeded}</span>
          <div style="margin-top:4px; color:var(--text-secondary); font-size:0.75rem;">
            🛠️ <strong>อุปกรณ์:</strong> ${bp.tools}
          </div>
        </div>

        <div class="blueprint-steps-list">
          ${bp.steps.map((s, i) => `
            <div class="step-item">
              <span class="step-num">${i + 1}</span>
              <span>${s}</span>
            </div>
          `).join('')}
        </div>

        <button class="btn-use-blueprint" onclick="useBlueprintToList('${bp.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>ใช้พิมพ์เขียวนี้เพื่อลงขายทันที (Auto-Fill)</span>
        </button>
      </div>
    </div>
  `).join('');
}

window.useBlueprintToList = function(bpId) {
  const bp = BLUEPRINTS.find(b => b.id === bpId);
  if (!bp) return;

  blueprintModal.classList.remove('open');
  postModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  document.getElementById('postTitle').value = bp.autoFill.title;
  document.getElementById('postCategory').value = bp.category;
  document.getElementById('postArtist').value = 'ช่างคราฟต์รุ่นใหม่ (New Artisan)';
  document.getElementById('postOrigin').value = bp.autoFill.origin;
  document.getElementById('postStoryQuote').value = bp.autoFill.quote;
  document.getElementById('postStoryDesc').value = bp.autoFill.desc;
  document.getElementById('postMaterials').value = bp.autoFill.materials;

  document.querySelectorAll('.preset-choice').forEach(c => {
    const radio = c.querySelector('input');
    if (radio.value === bp.presetKey) {
      c.classList.add('active');
      radio.checked = true;
    } else {
      c.classList.remove('active');
    }
  });

  if (bp.autoFill.startBid) {
    radioAuction.checked = true;
    postAuctionFields.style.display = 'block';
    postBuyNowFields.style.display = 'none';
    document.getElementById('postStartBid').value = bp.autoFill.startBid;
  }

  showToast(`ดึงข้อมูลสูตร "${bp.name}" เข้าฟอร์มลงขายอัตโนมัติแล้ว! ✨`);
};

aiGenerateStoryBtn.addEventListener('click', () => {
  const waste = aiWasteInput.value.trim() || 'ฝาขวดน้ำและเศษแก้วบางแสน';
  const templates = [
    `"เศษ${waste}ที่เคยไร้ค่าใต้คลื่น สู่หัวใจโคตรเท่ที่ต้นคอ"`,
    `"เกิดจาก${waste}ที่คนมองข้าม หลอมรวมเป็นงานศิลป์ลักชัวรีชิ้นเดียวในโลก"`,
    `"เมื่อ${waste}ไม่ยอมจบชีวิตที่กองขยะ แต่กลายร่างเป็นความเท่ระดับสตรีท"`,
    `"จากมลพิษทำลายเต่าทะเล สู่เกราะความเท่บนข้อมือผู้พิทักษ์ธรรมชาติ"`
  ];
  const quote = templates[Math.floor(Math.random() * templates.length)];
  aiResultText.textContent = quote;
  aiResultBox.style.display = 'flex';
  showToast('✨ AI เสกสตอรี่เสร็จเรียบร้อย!');
});

aiCopyStoryBtn.addEventListener('click', () => {
  const text = aiResultText.textContent.replace(/"/g, '');
  blueprintModal.classList.remove('open');
  postModal.classList.add('open');
  document.getElementById('postStoryQuote').value = text;
  showToast('คัดลอกคำโปรยเข้าสู่ฟอร์มลงขายแล้ว!');
});

// ==========================================================================
// POST ITEM LOGIC
// ==========================================================================
openPostModalBtn.addEventListener('click', () => {
  postModal.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closePostModalBtn.addEventListener('click', () => {
  postModal.classList.remove('open');
  document.body.style.overflow = '';
});

cancelPostBtn.addEventListener('click', () => {
  postModal.classList.remove('open');
  document.body.style.overflow = '';
});

radioAuction.addEventListener('change', () => {
  if (radioAuction.checked) {
    postAuctionFields.style.display = 'block';
    postBuyNowFields.style.display = 'none';
  }
});

radioBuyNow.addEventListener('change', () => {
  if (radioBuyNow.checked) {
    postAuctionFields.style.display = 'none';
    postBuyNowFields.style.display = 'block';
  }
});

document.querySelectorAll('.preset-choice').forEach(choice => {
  choice.addEventListener('click', () => {
    document.querySelectorAll('.preset-choice').forEach(c => c.classList.remove('active'));
    choice.classList.add('active');
  });
});

generateStoryBtn.addEventListener('click', () => {
  const originVal = document.getElementById('postOrigin').value || 'หาดบางแสน';
  const quotes = [
    `ของไร้ค่าจาก${originVal} สู่หัวใจโคตรเท่ที่ทุกคนต้องเหลียวมอง`,
    `จากเศษขยะที่ถูกทอดทิ้ง สู่ผลงานระดับมาสเตอร์พีซชิ้นเดียวในโลก`,
    `เมื่อขยะ${originVal}ไม่ยอมตาย แต่กลับมาเกิดใหม่ในเวอร์ชันที่โครตคูล`,
    `ศิลปะจากคลื่นซัด: กู้คืนธรรมชาติด้วยงานดีไซน์ระดับลักชัวรี`
  ];
  const chosen = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('postStoryQuote').value = chosen;
  showToast('✨ เสกคำโปรยสตอรี่ขยะสำเร็จ!');
});

postItemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('postTitle').value.trim();
  const category = document.getElementById('postCategory').value;
  const artist = document.getElementById('postArtist').value.trim();
  const origin = document.getElementById('postOrigin').value.trim();
  const storyQuote = document.getElementById('postStoryQuote').value.trim();
  const storyDesc = document.getElementById('postStoryDesc').value.trim();
  const materialsRaw = document.getElementById('postMaterials').value.trim();
  const materials = materialsRaw.split(',').map(m => m.trim()).filter(Boolean);
  
  const saleType = document.querySelector('input[name="postSaleType"]:checked').value;
  const presetKey = document.querySelector('input[name="imagePreset"]:checked').value;
  const angles = PRESET_IMAGE_MAP[presetKey] || PRESET_IMAGE_MAP.necklace;

  let currentBid = 0;
  let startingBid = 0;
  let price = 0;
  let endsInSeconds = 86400;

  if (saleType === 'auction') {
    startingBid = parseInt(document.getElementById('postStartBid').value, 10) || 500;
    currentBid = startingBid;
    const hrs = parseInt(document.getElementById('postDurationHours').value, 10) || 24;
    endsInSeconds = hrs * 3600;
  } else {
    price = parseInt(document.getElementById('postDirectPrice').value, 10) || 1200;
  }

  const isBangsaen = origin.includes('บางแสน') || storyQuote.includes('บางแสน') || storyDesc.includes('บางแสน');

  const newPendingItem = {
    id: Date.now(),
    title,
    category,
    artist,
    origin,
    storyQuote,
    storyDesc,
    materials: materials.length > 0 ? materials : ['วัสดุรีไซเคิล 100%'],
    saleType,
    currentBid,
    startingBid,
    minIncrement: 50,
    price,
    bidsCount: 0,
    endsInSeconds,
    buyNowPrice: saleType === 'auction' ? currentBid * 2 : price,
    dimensions: 'ชิ้นงานขนาดมาตรฐาน พร้อมกล่องคราฟต์รักษ์โลก',
    isBangsaen,
    freeShipping: true,
    verified: true,
    angles,
    bidHistory: []
  };

  state.pendingProducts.unshift(newPendingItem);
  updateAdminBadges();
  renderPendingCards();

  postItemForm.reset();
  postModal.classList.remove('open');
  document.body.style.overflow = '';

  showToast(`ส่ง "${title}" เข้าสู่ระบบหลังบ้านเพื่อรออนุมัติแล้ว! ตรวจสอบได้ที่ปุ่ม "ระบบหลังบ้าน" ⏳`);
});

// Search & Filter Events
searchInput.addEventListener('input', (e) => {
  state.searchKeyword = e.target.value;
  searchClearBtn.classList.toggle('visible', e.target.value.length > 0);
  renderCatalog();
});

searchClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  state.searchKeyword = '';
  searchClearBtn.classList.remove('visible');
  renderCatalog();
});

searchBtn.addEventListener('click', renderCatalog);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') renderCatalog();
});

// Zone Modal Listeners
headerZoneBtn?.addEventListener('click', openZoneModal);
catalogZonePickerBtn?.addEventListener('click', openZoneModal);
closeZoneModalBtn?.addEventListener('click', closeZoneModal);

document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.getAttribute('data-category');
    selectZoneCategory(cat);
  });
});

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.activeFilterPill = pill.getAttribute('data-filter');
    renderCatalog();
  });
});

sortSelect.addEventListener('change', (e) => {
  state.sortOption = e.target.value;
  renderCatalog();
});

document.getElementById('openHeroDetailBtn')?.addEventListener('click', (e) => {
  openProductDetail(1, e);
});

// Backdrop click modal close
[detailModal, postModal, adminModal, blueprintModal, supplyModal, sellWasteModal, zoneModal].forEach(modal => {
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      if (modal === detailModal) {
        closeProductDetail();
      } else {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
});

closeDetailModalBtn.addEventListener('click', closeProductDetail);


window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (aiScannerModal && aiScannerModal.classList.contains('open')) {
      closeAiScannerModal();
    }
    [detailModal, postModal, adminModal, blueprintModal, supplyModal, sellWasteModal, zoneModal, aiScannerModal].forEach(modal => {
      if (modal && modal.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    state.selectedProduct = null;
  }
});

function showToast(message, type = 'normal') {
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'auction' ? 'toast-auction' : ''}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'auction' ? `
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      ` : `
        <polyline points="20 6 9 17 4 12"></polyline>
      `}
    </svg>
    <span>${message}</span>
  `;

  toastStack.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// ==========================================================================
// RICH LUXURY PARALLAX & 3D INTERACTION CONTROLLER
// Handles:
// 1. Dynamic multi-depth scroll parallax (Orbs, Watermark, Grid, Hero Float)
// 2. High-precision top progress bar
// 3. 3D perspective card tilt with specular light reflection sheen
// ==========================================================================

function initRichLuxuryParallaxEngine() {
  const progressBar = document.getElementById('scrollProgressBar');
  const mainHeader = document.getElementById('mainHeader');
  const parallaxStage = document.getElementById('parallaxStage');
  const watermark = document.getElementById('parallaxWatermark');
  const glow1 = document.getElementById('parallaxGlow1');
  const glow2 = document.getElementById('parallaxGlow2');
  const glow3 = document.getElementById('parallaxGlow3');
  const heroCard = document.getElementById('heroFeaturedCard');
  const spotlightImg = document.getElementById('spotlightMainImg');

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

    // 1. Update Luxury Top Progress Bar
    if (progressBar) {
      progressBar.style.width = (scrollProgress * 100) + '%';
    }

    // 2. Header luxury glass state
    if (mainHeader) {
      if (scrollY > 35) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // 3. Parallax Canvas Elements
    if (parallaxStage) {
      parallaxStage.style.setProperty('--scroll-y', `${scrollY}px`);
    }

    // Watermark monumental glide
    if (watermark) {
      const wmOffset = -scrollY * 0.42;
      watermark.style.transform = `translate3d(${wmOffset}px, 0, 0)`;
    }

    // Ambient glow orbs floating at varying speeds & directions
    if (glow1) {
      const orb1Y = scrollY * -0.22;
      const orb1X = Math.sin(scrollY * 0.002) * 40;
      glow1.style.transform = `translate3d(${orb1X}px, ${orb1Y}px, 0)`;
    }

    if (glow2) {
      const orb2Y = scrollY * -0.14;
      const orb2X = Math.cos(scrollY * 0.0025) * -50;
      glow2.style.transform = `translate3d(${orb2X}px, ${orb2Y}px, 0)`;
    }

    if (glow3) {
      const orb3Y = scrollY * -0.32;
      const orb3X = Math.sin(scrollY * 0.0018) * 35;
      glow3.style.transform = `translate3d(${orb3X}px, ${orb3Y}px, 0)`;
    }

    // Subtle parallax depth drift on Hero Spotlight Image
    if (spotlightImg && scrollY < 900) {
      const imgDrift = scrollY * 0.08;
      spotlightImg.style.transform = `translate3d(0, ${imgDrift}px, 0) scale(1.02)`;
    }

    // Dynamic Scroll Parallax on Catalog Product Card Images (ภาพเลื่อนตามความเร็ว scroll)
    const cards = document.querySelectorAll('.product-card');
    const viewportHeight = window.innerHeight;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const offsetFromCenter = (rect.top + rect.height / 2) - (viewportHeight / 2);
        const cardImgY = (offsetFromCenter * 0.05).toFixed(1);
        card.style.setProperty('--card-img-y', `${cardImgY}px`);
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation
  updateParallax();
}

function init3DCardTiltEngine() {
  const heroCard = document.getElementById('heroFeaturedCard');

  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = -deltaY * 11;
      const rotateY = deltaX * 11;

      heroCard.style.transition = 'transform 0.08s ease-out';
      heroCard.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      const sheenX = ((x / rect.width) * 100).toFixed(1);
      const sheenY = ((y / rect.height) * 100).toFixed(1);
      heroCard.style.setProperty('--mouse-x', `${sheenX}%`);
      heroCard.style.setProperty('--mouse-y', `${sheenY}%`);
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      heroCard.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // Delegated 3D micro-tilt for Catalog Product Cards
  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    productGrid.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = -deltaY * 6;
      const rotateY = deltaX * 6;

      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.015, 1.015, 1.015)`;
    });

    productGrid.addEventListener('mouseleave', (e) => {
      const cards = productGrid.querySelectorAll('.product-card');
      cards.forEach(card => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
      });
    }, true);
  }
}

/* ==========================================================================
   AI VISION WASTE SCANNER & BLUEPRINT INTELLIGENCE COCKPIT
   ========================================================================== */

const AI_SCAN_PRESETS = {
  mixed: {
    key: 'mixed',
    name: 'กลุ่มขยะริมหาดคละประเภท (Multi-Class Beach Waste)',
    typeCategory: 'ตรวจจับแยกประเภทพร้อมกัน 3 ชิ้น (Multi-Object Detection)',
    purity: '98.6% mAP',
    weightKg: 1.85,
    buyoutVal: 75,
    co2Offset: '3.4 kg CO2e',
    thumb: 'assets/mixed_waste_beach.jpg',
    desc: 'ภาพตัวอย่างขยะริมหาดบางแสน โมเดล AI จำแนกแยกประเภทอัตโนมัติ: ซองขนมฟอยล์ (ซ้าย), ขวดน้ำพลาสติกใส PET (กลาง), และฝาขวดน้ำ HDPE (ขวา)',
    blueprintId: 'bp-2',
    wasteTypeKey: 'hdpe',
    isMultiObject: true,
    detectedObjects: [
      { id: 'obj-1', label: '🍫 ซองขนมกรุบกรอบ (Foil Wrapper)', conf: '98.2%', classKey: 'snack', left: '5%', top: '50%', width: '38%', height: '42%' },
      { id: 'obj-2', label: '🍶 ขวดน้ำดื่มใส PET (Bottle)', conf: '99.4%', classKey: 'bottle', left: '42%', top: '38%', width: '42%', height: '36%' },
      { id: 'obj-3', label: '🧴 ฝาขวดน้ำ HDPE (Caps)', conf: '97.8%', classKey: 'caps', left: '68%', top: '60%', width: '28%', height: '32%' }
    ],
    novelConcept: {
      badge: 'CIRCULAR SYSTEM DESIGN',
      title: 'ระบบแยกส่วนขยะอัพไซเคิล "Beach Clean Zero-Waste Matrix"',
      desc: 'คัดแยกฝาขวดไปหลอมทำกรอบแว่นตา Ocean Swirl, ขวดใสทำแจกันเกลียวคริสตัล, และซองฟอยล์อัดความร้อนทำกระเป๋าคลัตช์กันน้ำ ครบวงจร 100%',
      estimatedPrice: '฿4,500 - ฿7,200 (มูลค่ารวมทั้งเซ็ต)'
    }
  },
  snackfoil: {
    key: 'snackfoil',
    name: 'ซองขนมกรุบกรอบ / ถุงฟอยล์ (Snack Foil Wrapper)',
    typeCategory: 'Multi-layer Metallized Film (PP/Alu/PE Film)',
    purity: '98.2% (ล้างคราบและรีดแบน)',
    weightKg: 0.35,
    buyoutVal: 35,
    co2Offset: '1.4 kg CO2e',
    thumb: 'assets/snack_foil_waste.jpg',
    desc: 'ขยะซองขนมที่ย่อยสลายยากที่สุดและโรงงานทั่วไปไม่รับซื้อ แต่ RE:CRAFT นำมาหลอมประสานความร้อนทำเป็นหนังเทียมฟอยล์กันน้ำระดับสตรีทแวร์ไฮเอนด์',
    blueprintId: 'bp-5',
    wasteTypeKey: 'snackfoil',
    detectedObjects: [
      { id: 'obj-snack', label: '🍫 ซองขนมกรุบกรอบ (Foil Snack Bag)', conf: '98.7%', classKey: 'snack', left: '12%', top: '18%', width: '76%', height: '68%' }
    ],
    novelConcept: {
      badge: 'AVANT-GARDE STREETWEAR',
      title: 'กระเป๋าคลัตช์และซองแท็บเล็ต "Metallic Snack Wave Clutch"',
      desc: 'รีดเชื่อมแผ่นฟอยล์ขนมหลายชั้นด้วยความร้อน ผสานลวดลายกราฟิกป๊อปอาร์ตธรรมชาติ กันน้ำ 100% ทนทานและสะท้อนแสงไฟสุดล้ำ',
      estimatedPrice: '฿890 - ฿1,490'
    }
  },
  petbottle: {
    key: 'petbottle',
    name: 'ขวดน้ำดื่มพลาสติกใส PET (Clear PET Bottle #1)',
    typeCategory: 'Polyethylene Terephthalate (Clear Food Grade)',
    purity: '99.4% (ลอกฉลากและทำความสะอาดแล้ว)',
    weightKg: 1.50,
    buyoutVal: 48,
    co2Offset: '2.6 kg CO2e',
    thumb: 'assets/pet_bottle_waste.jpg',
    desc: 'พลาสติกใสเกรดพรีเมียม นิยมนำมาปั่นเป็นเส้นใย rPET สำหรับทอเสื้อผ้า หรือดัดทรงความร้อนเป็นแจกันและงานอินทีเรียลักชัวรี',
    blueprintId: 'bp-6',
    wasteTypeKey: 'petbottle',
    detectedObjects: [
      { id: 'obj-bottle', label: '🍶 ขวดน้ำดื่มพลาสติกใส (Clear PET Bottle)', conf: '99.4%', classKey: 'bottle', left: '10%', top: '24%', width: '80%', height: '56%' }
    ],
    novelConcept: {
      badge: 'CONTEMPORARY INTERIOR',
      title: 'แจกันเรขาคณิต "Crystal Wave Spiral Vase"',
      desc: 'ตัดริบบิ้นขวดพลาสติกใสรีดเกลียวด้วยลมร้อน ให้มิติการหักเหแสงสะท้อนดั่งแก้วคริสตัลชั้นดี น้ำหนักเบา ตกไม่แตก',
      estimatedPrice: '฿1,190 - ฿1,890'
    }
  },
  hdpe: {
    key: 'hdpe',
    name: 'ฝาขวดน้ำพลาสติก HDPE #2 (Ocean Bottle Caps)',
    typeCategory: 'High-Density Polyethylene (Thermoplastic Polymer)',
    purity: '99.2%',
    weightKg: 1.20,
    buyoutVal: 45,
    co2Offset: '1.9 kg CO2e',
    thumb: 'assets/sunglasses_front.jpg',
    desc: 'พลาสติกเนื้อเหนียวทนความร้อน ล้างคราบทรายและฆ่าเชื้อแล้ว สามารถหลอมอัดซ้ำได้โดยไม่เปราะแตก เหมาะสำหรับขึ้นรูปกรอบแว่นและเฟอร์นิเจอร์ลายหินอ่อน',
    blueprintId: 'bp-2',
    wasteTypeKey: 'hdpe',
    detectedObjects: [
      { id: 'obj-caps', label: '🧴 ฝาขวดน้ำ HDPE (Caps)', conf: '99.2%', classKey: 'caps', left: '15%', top: '20%', width: '70%', height: '60%' }
    ],
    novelConcept: {
      badge: 'CIRCULAR ARCHITECTURE',
      title: 'แผ่นท็อปโต๊ะหินขัด "Milano Ocean Terrazzo Slab"',
      desc: 'บดฝาขวดน้ำหลากสีเป็นเกล็ดลูกเต๋า อัดความร้อนภายใต้แรงดันสูงเป็นแผ่นหินขัดเทียมลายหินอ่อนมิลานเนเซียน สำหรับทำท็อปโต๊ะกาแฟหรือถาดเสิร์ฟหรู',
      estimatedPrice: '฿3,400 - ฿5,900'
    }
  },
  seaglass: {
    key: 'seaglass',
    name: 'แก้วทะเลบางแสนคัดเกรด (Weathered Sea Glass)',
    typeCategory: 'แก้วโซดาไลม์ทะเล (Soda-Lime Silicate Glass)',
    purity: '98.5%',
    weightKg: 0.85,
    buyoutVal: 85,
    co2Offset: '1.2 kg CO2e',
    thumb: 'assets/necklace_front.jpg',
    desc: 'ขวดแก้วแตกที่ผ่านการขัดเกลาโดยคลื่นและทรายทะเลบางแสนจนผิวนวลด้าน ไร้ขอบคม ปลอดภัยสูงสำหรับทำเครื่องประดับชั้นสูงและงานตกแต่งลักชัวรี',
    blueprintId: 'bp-1',
    wasteTypeKey: 'seaglass',
    detectedObjects: [
      { id: 'obj-glass', label: '🌊 แก้วทะเลบางแสน (Sea Glass)', conf: '98.5%', classKey: 'glass', left: '15%', top: '20%', width: '70%', height: '60%' }
    ],
    novelConcept: {
      badge: 'BIOPHILIC LIGHTING',
      title: 'โคมไฟแก้วทะเลเรืองแสง "Bioluminescent Sea Glass Lantern"',
      desc: 'หล่อประสานเศษแก้วทะเลคละสีเข้ากับตัวเรือนทองเหลืองขัดด้าน ติดตั้งไฟ LED อุณหภูมิอบอุ่น ให้ประกายแสงสะท้อนคล้ายเกลียวคลื่นบางแสนยามค่ำคืน',
      estimatedPrice: '฿2,890 - ฿4,500'
    }
  },
  cans: {
    key: 'cans',
    name: 'กระป๋องอะลูมิเนียมล้างสะอาด (Recycled Beverage Cans)',
    typeCategory: 'Alloy 3004 Aluminum (High Recyclability Metal)',
    purity: '97.4%',
    weightKg: 1.00,
    buyoutVal: 40,
    co2Offset: '5.2 kg CO2e',
    thumb: 'assets/necklace_detail.jpg',
    desc: 'อะลูมิเนียมกระป๋องเครื่องดื่ม รีไซเคิลได้ไม่จำกัดจำนวนครั้ง นำมาฉลุลาย ตัดพับ หรือหล่อเป็นชิ้นส่วนเครื่องประดับและโคมไฟสุดเก๋',
    blueprintId: 'bp-1',
    wasteTypeKey: 'cans',
    detectedObjects: [
      { id: 'obj-can', label: '🥫 กระป๋องอะลูมิเนียม (Drink Can)', conf: '97.4%', classKey: 'can', left: '15%', top: '20%', width: '70%', height: '60%' }
    ],
    novelConcept: {
      badge: 'METALLIC LIGHTING',
      title: 'โคมไฟระย้าฉลุลายดาว "Celestial Can Lantern"',
      desc: 'ฉลุเจาะรูลายกลุ่มดาวบนตัวกระป๋องอะลูมิเนียมขัดเงา สะท้อนแสงไฟเป็นประกายระยิบระยับทั่วห้อง',
      estimatedPrice: '฿1,250 - ฿2,100'
    }
  }
};

function playScannerTone(type = 'scan') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (type === 'scan') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'success') {
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    }
  } catch (err) {
    // AudioContext silently ignored if blocked by autoplay policy
  }
}

function loadScannerHistory() {
  try {
    const stored = localStorage.getItem('recraft_ai_scan_history');
    if (stored) {
      state.scanHistory = JSON.parse(stored);
    } else {
      state.scanHistory = [
        {
          id: 'scan-seed-1',
          date: 'เมื่อสักครู่',
          presetKey: 'hdpe',
          name: 'ฝาขวดน้ำพลาสติก HDPE #2',
          purity: '99.2%',
          weightKg: 1.2,
          buyoutVal: 45,
          blueprintTitle: 'แว่นตากันแดดฝาขวดน้ำ HDPE (Ocean Swirl)',
          thumb: 'assets/sunglasses_front.jpg'
        },
        {
          id: 'scan-seed-2',
          date: 'เมื่อวานนี้ 16:40 น.',
          presetKey: 'seaglass',
          name: 'แก้วทะเลบางแสนคัดเกรด',
          purity: '98.5%',
          weightKg: 0.85,
          buyoutVal: 85,
          blueprintTitle: 'สร้อยคอหินแก้วทะเล (Sea Glass Pendant)',
          thumb: 'assets/necklace_front.jpg'
        }
      ];
    }
  } catch (e) {
    state.scanHistory = [];
  }
  updateScannerHistoryBadge();
}

function saveScannerHistory(item) {
  state.scanHistory.unshift(item);
  if (state.scanHistory.length > 20) state.scanHistory.pop();
  try {
    localStorage.setItem('recraft_ai_scan_history', JSON.stringify(state.scanHistory));
  } catch (e) {}
  updateScannerHistoryBadge();
}

function updateScannerHistoryBadge() {
  if (scannerHistoryCountBadge) {
    scannerHistoryCountBadge.textContent = state.scanHistory.length;
  }
}

function openAiScannerModal() {
  if (!aiScannerModal) return;
  aiScannerModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  state.activeScannerPreset = state.activeScannerPreset || 'mixed';
  setScannerPreset(state.activeScannerPreset);
  renderScannerIdleState();
  startScannerCamera();
}

function closeAiScannerModal() {
  if (!aiScannerModal) return;
  aiScannerModal.classList.remove('open');
  document.body.style.overflow = '';
  stopScannerCamera();
  if (hudLaserSweep) hudLaserSweep.classList.remove('scanning');
  if (hudDetectionBox) hudDetectionBox.style.display = 'none';
  if (hudMultiDetectionLayer) hudMultiDetectionLayer.innerHTML = '';
  state.isScanning = false;
}

async function startScannerCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    switchToPreviewFallback('เบราว์เซอร์ไม่รองรับกล้องสด (ใช้โหมดจำลอง)');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: state.activeCameraFacing || 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });

    state.scannerStream = stream;
    if (aiScannerVideo) {
      aiScannerVideo.srcObject = stream;
      aiScannerVideo.style.display = 'block';
      aiScannerVideo.play();
    }
    if (aiScannerImagePreview) aiScannerImagePreview.style.display = 'none';
    if (hudStatusText) hudStatusText.textContent = 'กล้องสดพร้อมทำงาน (LIVE CAMERA)';
    if (aiToggleCamText) aiToggleCamText.textContent = 'ปิดกล้องสด';
    if (aiToggleCamIcon) aiToggleCamIcon.textContent = '⏹';
  } catch (err) {
    switchToPreviewFallback('ไม่สามารถเข้าถึงกล้องได้ (สลับเป็นโหมดจำลอง)');
  }
}

function stopScannerCamera() {
  if (state.scannerStream) {
    state.scannerStream.getTracks().forEach(track => track.stop());
    state.scannerStream = null;
  }
  if (aiScannerVideo) {
    aiScannerVideo.srcObject = null;
    aiScannerVideo.style.display = 'none';
  }
  if (aiToggleCamText) aiToggleCamText.textContent = 'เปิดกล้องสด';
  if (aiToggleCamIcon) aiToggleCamIcon.textContent = '📷';
}

function switchToPreviewFallback(msg) {
  stopScannerCamera();
  if (aiScannerImagePreview) {
    const preset = AI_SCAN_PRESETS[state.activeScannerPreset] || AI_SCAN_PRESETS.seaglass;
    aiScannerImagePreview.src = preset.thumb;
    aiScannerImagePreview.style.display = 'block';
  }
  if (hudStatusText) hudStatusText.textContent = msg || 'โหมดจำลองภาพขยะ (SAMPLE PREVIEW)';
}

function setScannerPreset(presetKey) {
  state.activeScannerPreset = presetKey;
  const preset = AI_SCAN_PRESETS[presetKey] || AI_SCAN_PRESETS.mixed || AI_SCAN_PRESETS.seaglass;

  document.querySelectorAll('.scanner-preset-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-preset') === presetKey);
  });

  if (!state.scannerStream && aiScannerImagePreview) {
    aiScannerImagePreview.src = preset.thumb;
    aiScannerImagePreview.style.display = 'block';
  }

  if (hudDetectionTag) hudDetectionTag.textContent = preset.name.split(' ')[0] || 'MATERIAL';
  if (hudDetectionConf) hudDetectionConf.textContent = preset.purity;

  updateViewfinderBoundingBoxes(preset);
}

function updateViewfinderBoundingBoxes(preset) {
  if (!hudMultiDetectionLayer) return;
  if (!preset || !preset.detectedObjects || preset.detectedObjects.length === 0) {
    hudMultiDetectionLayer.innerHTML = '';
    return;
  }

  hudMultiDetectionLayer.innerHTML = preset.detectedObjects.map(obj => `
    <div class="hud-bbox-item bbox-${obj.classKey}" 
         style="left: ${obj.left}; top: ${obj.top}; width: ${obj.width}; height: ${obj.height};"
         onclick="focusDetectedObject('${obj.classKey}', event)"
         title="คลิกเพื่อเจาะจงโฟกัสที่ ${obj.label}">
      <div class="bbox-corner-tl"></div>
      <div class="bbox-corner-tr"></div>
      <div class="bbox-corner-bl"></div>
      <div class="bbox-corner-br"></div>
      <div class="bbox-header">
        <span class="bbox-label">${obj.label}</span>
        <span class="bbox-conf">${obj.conf}</span>
      </div>
    </div>
  `).join('');
}

function focusDetectedObject(classKey, event) {
  if (event) event.stopPropagation();
  if (classKey === 'snack') {
    setScannerPreset('snackfoil');
    renderScannerIdleState();
    showToast('🔎 โฟกัส: ซองขนมกรุบกรอบฟอยล์ (Snack Foil)', 'normal');
  } else if (classKey === 'bottle') {
    setScannerPreset('petbottle');
    renderScannerIdleState();
    showToast('🔎 โฟกัส: ขวดน้ำดื่มพลาสติกใส PET #1', 'normal');
  } else if (classKey === 'caps') {
    setScannerPreset('hdpe');
    renderScannerIdleState();
    showToast('🔎 โฟกัส: ฝาขวดน้ำพลาสติก HDPE #2', 'normal');
  }
}
window.focusDetectedObject = focusDetectedObject;

function renderScannerIdleState() {
  if (!aiAnalysisDynamicContent) return;
  const preset = AI_SCAN_PRESETS[state.activeScannerPreset] || AI_SCAN_PRESETS.seaglass;

  aiAnalysisDynamicContent.innerHTML = `
    <div class="scanner-idle-card">
      <div class="scanner-idle-icon-pulse">✨</div>
      <h3>พร้อมสแกนและวิเคราะห์ไอเดียด้วย AI</h3>
      <p>เล็งกล้องไปที่เศษขยะรอบตัวคุณ หรือเลือกจาก <strong>"ตัวอย่างขยะริมหาดด่วน"</strong> ด้านล่าง แล้วกดปุ่มสแกน เพื่อค้นหาว่าขยะชิ้นนี้นำไปแปลงเป็นพิมพ์เขียวหรือแนวคิดลักชัวรีอะไรได้บ้าง</p>
      
      <div class="scanner-idle-guide">
        <div class="guide-step-item">
          <span class="guide-step-num">1</span>
          <span>สแกนจำแนกชนิดโครงสร้างวัตถุดิบ & ตรวจสอบความบริสุทธิ์</span>
        </div>
        <div class="guide-step-item">
          <span class="guide-step-num">2</span>
          <span>ประเมินราคารับซื้อเป็นเงินสดทันที พร้อมปริมาณคาร์บอนที่ลดได้</span>
        </div>
        <div class="guide-step-item">
          <span class="guide-step-num">3</span>
          <span>จับคู่สูตรพิมพ์เขียวอัพไซเคิล พร้อมสังเคราะห์แนวคิดใหม่ระดับไฮเอนด์</span>
        </div>
      </div>
    </div>
  `;
}

function triggerAiScan() {
  if (state.isScanning) return;
  state.isScanning = true;

  playScannerTone('scan');
  if (hudLaserSweep) hudLaserSweep.classList.add('scanning');
  if (hudDetectionBox) hudDetectionBox.style.display = 'flex';
  if (hudStatusText) hudStatusText.textContent = '⚡ กำลังประมวลผลด้วย AI SPECTROSCOPY...';

  const preset = AI_SCAN_PRESETS[state.activeScannerPreset] || AI_SCAN_PRESETS.seaglass;

  // Render Live Scanning Stage
  if (aiAnalysisDynamicContent) {
    aiAnalysisDynamicContent.innerHTML = `
      <div class="scanner-active-analyzing">
        <div class="neural-network-ring"></div>
        <h3>AI กำลังวิเคราะห์โครงสร้างขยะ...</h3>
        <div class="analysis-status-stream" id="scannerStatusStream">
          [1/3] ตรวจจับคุณสมบัติพื้นผิวและพันธะโมเลกุล...
        </div>
      </div>
    `;
  }

  const statusStream = document.getElementById('scannerStatusStream');

  setTimeout(() => {
    if (statusStream) {
      statusStream.innerHTML = `[2/3] ตรวจพบ: ${preset.typeCategory} (ความบริสุทธิ์ ${preset.purity})...`;
    }
  }, 500);

  setTimeout(() => {
    if (statusStream) {
      statusStream.innerHTML = `[3/3] สังเคราะห์แนวคิดพิมพ์เขียว & คำนวณมูลค่ารับซื้อ...`;
    }
  }, 1000);

  setTimeout(() => {
    if (hudLaserSweep) hudLaserSweep.classList.remove('scanning');
    playScannerTone('success');
    state.isScanning = false;
    if (hudStatusText) hudStatusText.textContent = 'การวิเคราะห์เสร็จสมบูรณ์ 100% (ANALYSIS COMPLETE)';

    renderScanResults(preset);

    // Save to History Log
    saveScannerHistory({
      id: 'scan-' + Date.now(),
      date: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.',
      presetKey: preset.key,
      name: preset.name,
      purity: preset.purity,
      weightKg: preset.weightKg,
      buyoutVal: preset.buyoutVal,
      blueprintTitle: preset.blueprintId ? (BLUEPRINTS.find(b => b.id === preset.blueprintId)?.name || 'สูตรพิมพ์เขียวแนะนำ') : preset.novelConcept.title,
      thumb: preset.thumb
    });
  }, 1500);
}

function renderScanResults(preset) {
  if (!aiAnalysisDynamicContent) return;

  const matchedBlueprint = preset.blueprintId ? BLUEPRINTS.find(b => b.id === preset.blueprintId) : null;

  aiAnalysisDynamicContent.innerHTML = `
    <div class="scanner-results-container">
      <!-- 1. Material Fingerprint Card -->
      <div class="material-fingerprint-card">
        <div class="fingerprint-top">
          <div class="fingerprint-title-box">
            <h3>${preset.name}</h3>
            <p>${preset.typeCategory}</p>
          </div>
          <span class="fingerprint-confidence-badge">ความบริสุทธิ์: ${preset.purity}</span>
        </div>

        <p style="font-size:0.88rem; color:#cbd5e1; line-height:1.55; margin:0 0 12px;">
          ${preset.desc}
        </p>

        <div class="fingerprint-metrics-grid">
          <div class="metric-pill-box">
            <span class="metric-pill-label">น้ำหนักประเมิน</span>
            <span class="metric-pill-val">${preset.weightKg} กก.</span>
          </div>
          <div class="metric-pill-box">
            <span class="metric-pill-label">มูลค่าส่งขายรับเงิน</span>
            <span class="metric-pill-val highlight-cash">฿${preset.buyoutVal}</span>
          </div>
          <div class="metric-pill-box">
            <span class="metric-pill-label">ลดคาร์บอนฟุตพริ้นท์</span>
            <span class="metric-pill-val highlight-co2">${preset.co2Offset}</span>
          </div>
        </div>
      </div>

      <!-- 2. Matched Blueprint Section -->
      ${matchedBlueprint ? `
        <div class="blueprint-match-section">
          <div class="section-label-super">
            <span>✨</span>
            <span>สูตรพิมพ์เขียวอัพไซเคิลที่ตรงกัน (Matched Blueprint)</span>
          </div>

          <div class="blueprint-matched-card">
            <img src="${matchedBlueprint.thumb}" alt="${matchedBlueprint.name}" class="matched-thumb" />
            <div class="matched-info">
              <div>
                <h4 class="matched-title">${matchedBlueprint.name}</h4>
                <span class="matched-difficulty">${matchedBlueprint.difficulty}</span>
              </div>
              <div class="matched-sell-price">${matchedBlueprint.priceSuggest}</div>
              <div class="matched-actions">
                <button class="btn-view-blueprint-direct" onclick="openMatchedBlueprintFromScanner('${matchedBlueprint.id}')">
                  📖 เปิดดูสูตรทำพิมพ์เขียวนี้ &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 3. Novel Avant-Garde Concept Section -->
      <div class="novel-concept-card">
        <span class="novel-concept-badge">💡 แนวคิดใหม่นอกกรอบ (Generative Novel Concept)</span>
        <h4 class="novel-concept-title">${preset.novelConcept.title}</h4>
        <p class="novel-concept-desc">${preset.novelConcept.desc}</p>
        <div style="font-size:0.86rem; color:#fde047; font-weight:700; font-family:var(--font-heading);">
          ราคาประเมินตลาดระดับงานศิลป์: ${preset.novelConcept.estimatedPrice}
        </div>
      </div>

      <!-- 4. Bottom Actions Row -->
      <div class="scanner-results-bottom-actions">
        <button class="btn-sell-direct-action" onclick="sendToSellWasteFromScanner('${preset.wasteTypeKey}', ${preset.weightKg})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
          <span>นำชิ้นนี้ส่งขายรับเงิน (฿${preset.buyoutVal})</span>
        </button>

        <button class="btn-save-idea-action" onclick="saveCurrentScanIdea()">
          <span>💾 บันทึกผลสแกน</span>
        </button>

        <button class="btn-save-idea-action" onclick="renderScannerIdleState()">
          <span>🔄 สแกนชิ้นใหม่</span>
        </button>
      </div>
    </div>
  `;
}

function openMatchedBlueprintFromScanner(blueprintId) {
  closeAiScannerModal();
  openBlueprintModal();

  setTimeout(() => {
    const card = document.querySelector(`[data-blueprint-id="${blueprintId}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.outline = '3px solid #38bdf8';
      card.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.6)';
      setTimeout(() => {
        card.style.outline = '';
        card.style.boxShadow = '';
      }, 3500);
    }
  }, 350);
}

function sendToSellWasteFromScanner(wasteTypeKey, weightKg) {
  closeAiScannerModal();
  openSellWasteModal();

  if (sellWasteType) {
    sellWasteType.value = wasteTypeKey || 'seaglass';
  }
  if (sellWeightKg) {
    sellWeightKg.value = weightKg || 1;
  }
  updatePayoutCalculator();
  showToast('กรอกข้อมูลขยะจากการสแกน AI ให้เรียบร้อยแล้ว!', 'normal');
}

function saveCurrentScanIdea() {
  showToast('✨ บันทึกผลการสแกนและไอเดียลงในระบบเรียบร้อยแล้ว!', 'normal');
}

function renderScannerHistory() {
  if (!scannerHistoryList) return;
  if (!state.scanHistory || state.scanHistory.length === 0) {
    scannerHistoryList.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
        <div style="font-size: 2.2rem; margin-bottom: 10px;">📜</div>
        <p>ยังไม่มีประวัติการสแกน กดปุ่ม "⚡ สแกน & วิเคราะห์ด้วย AI" เพื่อเริ่มบันทึกไอเดียชิ้นแรกของคุณ</p>
      </div>
    `;
    return;
  }

  scannerHistoryList.innerHTML = state.scanHistory.map(item => `
    <div class="scanner-history-item" onclick="viewHistoryItemDetail('${item.presetKey}')">
      <img src="${item.thumb}" alt="${item.name}" class="history-item-thumb" />
      <div class="history-item-info">
        <h4 class="history-item-title">${item.name}</h4>
        <div class="history-item-meta">
          <span>${item.date}</span> • <span>หนัก ${item.weightKg} กก.</span> • <span style="color:#34d399;">฿${item.buyoutVal}</span>
        </div>
        <div style="font-size: 0.8rem; color: #38bdf8; margin-top: 2px;">
          💡 ${item.blueprintTitle}
        </div>
      </div>
      <span class="history-item-badge">${item.purity}</span>
    </div>
  `).join('');
}

function viewHistoryItemDetail(presetKey) {
  switchScannerTab('analysis');
  setScannerPreset(presetKey);
  const preset = AI_SCAN_PRESETS[presetKey] || AI_SCAN_PRESETS.seaglass;
  renderScanResults(preset);
}

function switchScannerTab(tabKey) {
  scannerTabAnalysisBtn?.classList.remove('active');
  scannerTabHistoryBtn?.classList.remove('active');
  scannerTabModelBtn?.classList.remove('active');

  if (scannerAnalysisView) scannerAnalysisView.style.display = 'none';
  if (scannerHistoryView) scannerHistoryView.style.display = 'none';
  if (scannerModelView) scannerModelView.style.display = 'none';

  if (tabKey === 'analysis') {
    scannerTabAnalysisBtn?.classList.add('active');
    if (scannerAnalysisView) scannerAnalysisView.style.display = 'block';
  } else if (tabKey === 'history') {
    scannerTabHistoryBtn?.classList.add('active');
    if (scannerHistoryView) scannerHistoryView.style.display = 'block';
    renderScannerHistory();
  } else if (tabKey === 'model') {
    scannerTabModelBtn?.classList.add('active');
    if (scannerModelView) scannerModelView.style.display = 'block';
    renderModelFineTuningMatrix();
  }
}

function renderModelFineTuningMatrix() {
  if (!scannerModelView) return;
  scannerModelView.innerHTML = `
    <div class="model-matrix-card">
      <div class="model-header-row">
        <div>
          <span class="model-badge-pill">YOLOv9-CircularWaste-v2.4</span>
          <h3 style="margin: 6px 0 2px; font-family: var(--font-heading); font-size: 1.15rem; color: #f8fafc;">
            ผลการ Fine-Tuning ตรวจจับขยะทะเลจำแนกประเภท
          </h3>
          <p style="margin:0; font-size:0.84rem; color: #94a3b8;">
            โมเดลผ่านการเทรน Fine-Tuning ด้วยชุดข้อมูลภาพขยะหาดจริง 1,420 ภาพ (Data Augmented)
          </p>
        </div>
        <div class="model-overall-stat">
          <span class="stat-big">98.6%</span>
          <span class="stat-sub">mAP@0.5 Overall</span>
        </div>
      </div>

      <!-- Training Benchmarks Grid -->
      <div class="model-stats-grid">
        <div class="model-stat-tile">
          <div class="stat-tile-label">Training Epochs</div>
          <div class="stat-tile-val">120 Epochs</div>
          <div class="stat-tile-sub">Early Stopping @ 98</div>
        </div>
        <div class="model-stat-tile">
          <div class="stat-tile-label">Inference Latency</div>
          <div class="stat-tile-val">18.4 ms</div>
          <div class="stat-tile-sub">FP16 WebGL GPU Accel</div>
        </div>
        <div class="model-stat-tile">
          <div class="stat-tile-label">Precision / Recall</div>
          <div class="stat-tile-val">97.9% / 98.4%</div>
          <div class="stat-tile-sub">F1-Score: 0.981</div>
        </div>
        <div class="model-stat-tile">
          <div class="stat-tile-label">Dataset Size</div>
          <div class="stat-tile-val">1,420 Images</div>
          <div class="stat-tile-sub">4,890 Annotations</div>
        </div>
      </div>

      <!-- Class Breakdown Table -->
      <h4 style="margin: 20px 0 10px; font-size: 0.95rem; color: #e2e8f0; font-family: var(--font-heading);">
        📊 ประสิทธิภาพการแยกประเภทขยะรายคลาส (Per-Class Performance)
      </h4>
      <div class="model-class-table-wrap">
        <table class="model-class-table">
          <thead>
            <tr>
              <th>ประเภทวัตถุ (Target Class)</th>
              <th>ความแม่นยำ (mAP@0.5)</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>สูตรอัพไซเคิล</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="class-color-indicator dot-snack"></span>
                <strong>🍫 ซองขนมกรุบกรอบ (Snack Foil)</strong>
              </td>
              <td><span class="score-tag">98.2%</span></td>
              <td>97.5%</td>
              <td>98.8%</td>
              <td><span class="class-recipe-link" onclick="openMatchedBlueprintFromScanner('bp-5')">คลัตช์ฟอยล์</span></td>
            </tr>
            <tr>
              <td>
                <span class="class-color-indicator dot-bottle"></span>
                <strong>🍶 ขวดน้ำดื่มพลาสติกใส (Clear PET Bottle)</strong>
              </td>
              <td><span class="score-tag">99.4%</span></td>
              <td>99.1%</td>
              <td>99.6%</td>
              <td><span class="class-recipe-link" onclick="openMatchedBlueprintFromScanner('bp-6')">แจกันเกลียวคริสตัล</span></td>
            </tr>
            <tr>
              <td>
                <span class="class-color-indicator dot-caps"></span>
                <strong>🧴 ฝาขวดน้ำพลาสติก HDPE</strong>
              </td>
              <td><span class="score-tag">98.9%</span></td>
              <td>98.4%</td>
              <td>99.2%</td>
              <td><span class="class-recipe-link" onclick="openMatchedBlueprintFromScanner('bp-2')">แว่นกันแดด Terrazzo</span></td>
            </tr>
            <tr>
              <td>
                <span class="class-color-indicator dot-glass"></span>
                <strong>🌊 แก้วทะเลบางแสนคัดสี</strong>
              </td>
              <td><span class="score-tag">99.1%</span></td>
              <td>98.7%</td>
              <td>99.4%</td>
              <td><span class="class-recipe-link" onclick="openMatchedBlueprintFromScanner('bp-1')">สร้อยคอหินแก้ว</span></td>
            </tr>
            <tr>
              <td>
                <span class="class-color-indicator dot-can"></span>
                <strong>🥫 กระป๋องเครื่องดื่มอะลูมิเนียม</strong>
              </td>
              <td><span class="score-tag">98.0%</span></td>
              <td>97.2%</td>
              <td>98.5%</td>
              <td><span class="class-recipe-link" onclick="openMatchedBlueprintFromScanner('bp-3')">นาฬิกา Kinetic</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Quick Test Action -->
      <div style="margin-top: 20px; padding: 14px; background: rgba(30, 41, 59, 0.6); border: 1px dashed rgba(56, 189, 248, 0.4); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="font-size: 0.85rem; color: #cbd5e1;">
          💡 <strong>ทดลองระบบตรวจจับหลายชิ้น:</strong> เลือกภาพตัวอย่าง "ขยะรวม 3 ชิ้น" เพื่อทดสอบการแยกซองขนม vs ขวดน้ำ vs ฝาขวด ในเฟรมเดียว
        </div>
        <button class="btn btn-sm btn-primary" onclick="setScannerPreset('mixed'); switchScannerTab('analysis'); triggerAiScan();" style="white-space: nowrap;">
          ⚡ ลองสแกนแยก 3 ชิ้นทันที
        </button>
      </div>
    </div>
  `;
}
window.renderModelFineTuningMatrix = renderModelFineTuningMatrix;

function initAiScannerEngine() {
  loadScannerHistory();

  // Launcher Dock Trigger
  openAiScannerBtn?.addEventListener('click', openAiScannerModal);
  closeAiScannerModalBtn?.addEventListener('click', closeAiScannerModal);

  // Backdrop click to close
  aiScannerModal?.addEventListener('click', (e) => {
    if (e.target === aiScannerModal) closeAiScannerModal();
  });

  // Tab Switches
  scannerTabAnalysisBtn?.addEventListener('click', () => switchScannerTab('analysis'));
  scannerTabModelBtn?.addEventListener('click', () => switchScannerTab('model'));
  scannerTabHistoryBtn?.addEventListener('click', () => switchScannerTab('history'));

  // Trigger Scan
  aiTriggerScanBtn?.addEventListener('click', triggerAiScan);

  // Toggle Camera
  aiToggleCamBtn?.addEventListener('click', () => {
    if (state.scannerStream) {
      stopScannerCamera();
      switchToPreviewFallback('กล้องถูกปิดแล้ว (อยู่ในโหมดจำลองภาพ)');
    } else {
      startScannerCamera();
    }
  });

  // Upload Image from Disk
  aiUploadImgBtn?.addEventListener('click', () => {
    aiScannerFileInput?.click();
  });

  aiScannerFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    stopScannerCamera();
    const reader = new FileReader();
    reader.onload = (event) => {
      if (aiScannerImagePreview) {
        aiScannerImagePreview.src = event.target.result;
        aiScannerImagePreview.style.display = 'block';
      }
      if (hudStatusText) hudStatusText.textContent = `อัปโหลด: ${file.name.substring(0, 18)}... (พร้อมสแกน)`;
      showToast(`โหลดภาพ "${file.name}" เข้าสู่ช่องส่อง AI แล้ว!`, 'normal');
    };
    reader.readAsDataURL(file);
  });

  // Quick Preset Sample Buttons
  document.querySelectorAll('.scanner-preset-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-preset');
      setScannerPreset(key);
      renderScannerIdleState();
    });
  });

  // Clear History
  clearScannerHistoryBtn?.addEventListener('click', () => {
    state.scanHistory = [];
    try {
      localStorage.removeItem('recraft_ai_scan_history');
    } catch (e) {}
    updateScannerHistoryBadge();
    renderScannerHistory();
    showToast('ล้างประวัติการสแกนเรียบร้อยแล้ว', 'normal');
  });

  // Cross-modal quick triggers
  document.getElementById('blueprintToScannerBtn')?.addEventListener('click', () => {
    blueprintModal?.classList.remove('open');
    openAiScannerModal();
  });

  document.getElementById('sellWasteToScannerBtn')?.addEventListener('click', () => {
    sellWasteModal?.classList.remove('open');
    openAiScannerModal();
  });

  // Global Keyboard Shortcut: Alt + S
  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 's' || e.key === 'S' || e.code === 'KeyS')) {
      e.preventDefault();
      if (aiScannerModal?.classList.contains('open')) {
        closeAiScannerModal();
      } else {
        openAiScannerModal();
      }
    }
  });
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateAdminBadges();
  updatePayoutCalculator();
  initRichLuxuryParallaxEngine();
  init3DCardTiltEngine();
  initAiScannerEngine();
});
