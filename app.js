(function () {
  "use strict";

  const CART_KEY = "tck_cart_v1";
  const ORDERS_KEY = "tck_orders_v1";
  const WISH_KEY = "tck_wishlist_v1";
  const CHANNEL_NAME = "toko_custom_keycaps_realtime_v1";

  const products = [
    {"sku": "KC-001", "img": "Keycaps/1.jpg", "name": "Player One D-Pad", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 330000, "price": "Rp 330.000", "desc": "Keycap bergaya gamepad klasik dengan D-pad timbul dan sekrup di keempat sudutnya.", "theme": "Gaming Retro", "tags": ["Gaming", "Retro"], "story": "Terinspirasi gamepad era 8/16-bit. Permukaan atas dicetak timbul lengkap dengan D-pad, panah arah, dan empat sekrup di sudut, sementara badan abu-abu dua tone memberi kesan plastik konsol jadul. Pas jadi tombol panah atau Esc di keyboard bertema gaming.", "highlights": ["D-pad timbul dengan panah di empat arah", "Detail sekrup di keempat sudut", "Badan dua tone abu-abu dan smoke"], "specs": [["Tema", "Gaming Retro"], ["Warna", "Abu-abu gelap, hitam, smoke"], ["Finishing", "Matte soft-touch"], ["Cocok untuk", "Esc / Panah / WASD"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-002", "img": "Keycaps/2.jpg", "name": "Emerald Wyrm Claw", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 465000, "price": "Rp 465.000", "desc": "Cakar naga bersisik menggenggam permata hijau bersudut potong. Gelap, berat, penuh karakter.", "theme": "Fantasy", "tags": ["Fantasy", "Naga"], "story": "Cakar naga hitam kehijauan dengan sisik berdetail dan kuku runcing, menggenggam kristal hijau zamrud yang berkilau di tengahnya. Tekstur sisiknya dalam, jadi terasa seperti artefak harta karun, bukan sekadar hiasan keyboard.", "highlights": ["Tekstur sisik naga yang dalam", "Permata hijau bersudut potong (faceted)", "Kuku runcing berpatina antik"], "specs": [["Tema", "Fantasy"], ["Warna", "Hitam kehijauan, hijau zamrud"], ["Finishing", "Patina antik, permata faceted"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-003", "img": "Keycaps/3.jpg", "name": "Arcane Elixir", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 420000, "price": "Rp 420.000", "desc": "Botol ramuan ungu penuh gelembung dengan bingkai logam antik, sumbat gabus, dan rantai.", "theme": "Fantasy", "tags": ["Fantasy", "Ramuan"], "story": "Botol ramuan sihir berisi cairan ungu bergelembung yang berputar di dalam resin bening. Bingkai ornamen bergaya perunggu antik membungkus botol, lengkap dengan sumbat gabus dan rantai kecil di lehernya. Kesan koleksi RPG yang langsung terasa.", "highlights": ["Cairan ungu dengan gelembung mikro", "Ornamen bingkai bergaya perunggu antik", "Sumbat gabus dan rantai mungil"], "specs": [["Tema", "Fantasy"], ["Warna", "Ungu, perunggu antik, cokelat gabus"], ["Finishing", "Resin bening, bingkai metalik antik"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-004", "img": "Keycaps/4.jpg", "name": "Insert Coin", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 385000, "price": "Rp 385.000", "desc": "Mesin arcade mini lengkap dengan layar pixel, joystick merah, tombol warna, dan panel koin.", "theme": "Gaming Retro", "tags": ["Arcade", "Retro"], "story": "Replika mini kabinet arcade era 80-an. Layar menampilkan permainan pixel, di bawahnya ada joystick merah dan deretan tombol warna-warni, lalu panel koin di bagian depan. Sisi kabinetnya bermotif garis neon magenta, cyan, dan oranye.", "highlights": ["Layar pixel, joystick merah, dan tombol warna", "Panel koin di bagian depan", "Motif neon di sisi kabinet"], "specs": [["Tema", "Gaming Retro"], ["Warna", "Hitam, magenta, cyan, oranye"], ["Finishing", "Cetak resin, motif warna neon"], ["Cocok untuk", "Enter / Spasi / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-005", "img": "Keycaps/5.jpg", "name": "Coral Reef Cove", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 395000, "price": "Rp 395.000", "desc": "Taman terumbu karang mini dalam resin bening: karang warna-warni, bintang laut, dan rumput laut.", "theme": "Laut", "tags": ["Laut", "Terumbu karang"], "story": "Dunia bawah laut yang dikurung dalam satu keycap. Karang pink, biru, dan oranye tumbuh di atas pasir, ditemani bintang laut dan rumput laut hijau. Karena resinnya bening, pemandangannya terlihat dari atas maupun dari samping.", "highlights": ["Karang pink, biru, dan oranye berdetail", "Bintang laut dan rumput laut mini", "Resin bening, terlihat dari segala sisi"], "specs": [["Tema", "Laut"], ["Warna", "Pink, biru, oranye, hijau, pasir"], ["Finishing", "Resin bening glossy"], ["Cocok untuk", "Esc / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-006", "img": "Keycaps/6.jpg", "name": "Andromeda Drift", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 410000, "price": "Rp 410.000", "desc": "Pusaran nebula ungu dan biru bertabur serpihan foil emas di dalam resin bening.", "theme": "Kosmos", "tags": ["Galaksi", "Kosmos"], "story": "Galaksi spiral yang berputar pelan di dalam resin. Warna ungu, biru tua, dan magenta bercampur seperti kabut nebula, ditaburi serpihan emas yang menangkap cahaya setiap kali keycap bergerak. Setiap pusarannya sedikit berbeda.", "highlights": ["Pusaran nebula ungu, biru, dan magenta", "Serpihan foil emas", "Pola unik di tiap keycap (handmade)"], "specs": [["Tema", "Kosmos"], ["Warna", "Ungu, biru tua, magenta, emas"], ["Finishing", "Resin bening, pigmen swirl, foil emas"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-007", "img": "Keycaps/7.jpg", "name": "Koi Pond Zen", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 385000, "price": "Rp 385.000", "desc": "Ikan koi oranye berenang di kolam biru jernih, lengkap dengan tanaman air dan kerikil.", "theme": "Laut & Kolam", "tags": ["Koi", "Zen"], "story": "Kolam mini dengan dua ikan koi oranye-putih yang berenang di antara tanaman air hijau dan kerikil putih. Resin biru jernih dibuat bergelombang di permukaan atas sehingga terlihat seperti riak air.", "highlights": ["Ikan koi oranye-putih bercat tangan", "Tanaman air dan kerikil mini", "Permukaan atas bergelombang seperti air"], "specs": [["Tema", "Laut & Kolam"], ["Warna", "Biru jernih, oranye, putih, hijau"], ["Finishing", "Resin biru bening glossy"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-008", "img": "Keycaps/8.jpg", "name": "Frostpeak Alps", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 400000, "price": "Rp 400.000", "desc": "Pegunungan bersalju mini dengan pohon pinus dan aliran air biru es, terkunci dalam resin bening.", "theme": "Pegunungan", "tags": ["Gunung", "Salju"], "story": "Lanskap pegunungan bersalju yang dipahat sangat kecil: puncak berlapis salju, tebing berbatu, pohon pinus, dan aliran air biru es yang mengalir di antara lembah. Cocok untuk keyboard bertema dingin atau minimalis.", "highlights": ["Puncak bersalju dan tebing berbatu", "Pohon pinus mini", "Aliran air biru es di lembah"], "specs": [["Tema", "Pegunungan"], ["Warna", "Putih salju, abu-abu batu, biru es, hijau pinus"], ["Finishing", "Resin bening, tekstur salju"], ["Cocok untuk", "Esc / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-009", "img": "Keycaps/9.jpg", "name": "Memento Mori", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 375000, "price": "Rp 375.000", "desc": "Tengkorak antik dengan retakan halus dan mata amber yang berpendar hangat.", "theme": "Gelap & Gotik", "tags": ["Tengkorak", "Gotik"], "story": "Tengkorak berpatina tua lengkap dengan retakan halus di tempurung dan gigi yang detail. Rongga matanya tembus cahaya amber, jadi paling menawan di atas keyboard ber-backlight. Duduk di atas dasar logam gelap yang menambah kesan artefak kuno.", "highlights": ["Retakan dan tekstur tulang yang realistis", "Mata amber tembus cahaya", "Dasar gelap berpatina logam"], "specs": [["Tema", "Gelap & Gotik"], ["Warna", "Abu-abu tulang, hitam, amber"], ["Finishing", "Patina antik, mata resin tembus cahaya"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-010", "img": "Keycaps/10.jpg", "name": "Sukulen Mungil", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 340000, "price": "Rp 340.000", "desc": "Echeveria pastel dalam pot terakota mungil, lengkap dengan kerikil di permukaan tanah.", "theme": "Tanaman & Cozy", "tags": ["Tanaman", "Cozy"], "story": "Tanaman sukulen yang tidak perlu disiram. Daun echeveria hijau keunguan pastel tersusun rapi di dalam pot terakota bertekstur, dengan kerikil kecil menutupi tanahnya. Pilihan manis untuk meja kerja yang ingin terasa lebih hidup.", "highlights": ["Daun sukulen pastel berdetail halus", "Pot terakota bertekstur", "Kerikil mini di permukaan tanah"], "specs": [["Tema", "Tanaman & Cozy"], ["Warna", "Hijau pastel, ungu muda, terakota"], ["Finishing", "Cat tangan, tekstur matte"], ["Cocok untuk", "Esc / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-011", "img": "Keycaps/11.jpg", "name": "Moonwalker", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 440000, "price": "Rp 440.000", "desc": "Helm astronaut dengan visor emas mengilap, lengkap dengan baut, selang, dan panel logam.", "theme": "Sci-Fi", "tags": ["Astronaut", "Sci-Fi"], "story": "Helm astronaut putih-perak yang tampak sudah menempuh banyak misi, dengan visor emas cermin yang memantulkan sekitar. Detail baut, selang, tombol, dan panel sambungan dibuat rapi di sekeliling lehernya. Satu tombol, satu misi ke bulan.", "highlights": ["Visor emas cermin berkilau", "Baut, selang, dan panel berdetail", "Cat putih-perak dengan kesan aus"], "specs": [["Tema", "Sci-Fi"], ["Warna", "Putih, perak, emas"], ["Finishing", "Cat metalik, visor glossy"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-012", "img": "Keycaps/12.jpg", "name": "Boba Bestie", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 355000, "price": "Rp 355.000", "desc": "Segelas boba milk tea mini dengan tutup kubah, sedotan merah-putih, es batu, dan mutiara tapioka.", "theme": "Kuliner Lucu", "tags": ["Boba", "Lucu"], "story": "Satu gelas boba dalam ukuran keycap. Susu teh cokelat muda, mutiara tapioka hitam menumpuk di dasar, es batu mengambang di atas, dan sedotan merah-putih menancap di tutup kubah bening. Imut, dan bikin lapar.", "highlights": ["Mutiara tapioka dan es batu mini", "Tutup kubah bening dengan sedotan", "Dasar bening yang jernih"], "specs": [["Tema", "Kuliner Lucu"], ["Warna", "Cokelat susu, hitam, merah, putih"], ["Finishing", "Resin bening glossy"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-013", "img": "Keycaps/13.jpg", "name": "Api Unggun Malam", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 380000, "price": "Rp 380.000", "desc": "Nyala api resin oranye bening di atas tumpukan kayu bakar, batu, dan arang.", "theme": "Alam & Camping", "tags": ["Api", "Camping"], "story": "Api unggun mini dengan nyala resin oranye bening yang berkilau seperti kaca. Di bawahnya tertata kayu bakar bertekstur, kerikil, dan arang hitam di atas dasar amber tembus cahaya. Terasa hangat, apalagi dengan backlight.", "highlights": ["Nyala api resin oranye transparan", "Kayu bakar, batu, dan arang bertekstur", "Dasar amber tembus cahaya"], "specs": [["Tema", "Alam & Camping"], ["Warna", "Oranye, cokelat kayu, hitam, amber"], ["Finishing", "Resin bening, cat tangan pada kayu dan batu"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-014", "img": "Keycaps/14.jpg", "name": "Mixtape Vol. 1", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 430000, "price": "Rp 430.000", "desc": "Kaset C-60 berlabel “MIX VOL. 1 • A-SIDE” dengan roda gigi emas-perak dan badan smoke.", "theme": "Musik Retro", "tags": ["Kaset", "Retro"], "story": "Kaset pita klasik versi mini: label krem lusuh bertuliskan MIX VOL. 1, A-SIDE, dan C-60, dengan roda gigi emas dan perak serta sekrup di keempat sudutnya. Cangkang bening dan badan smoke gelap membuatnya terlihat seperti barang antik dari rak koleksi.", "highlights": ["Label kaset bergaya lusuh vintage", "Roda gigi emas dan perak", "Sekrup di keempat sudut cangkang"], "specs": [["Tema", "Musik Retro"], ["Warna", "Krem, emas, perak, smoke"], ["Finishing", "Cetak resin, aksen metalik"], ["Cocok untuk", "Enter / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-015", "img": "Keycaps/15.jpg", "name": "Kucing Tidur Siesta", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 405000, "price": "Rp 405.000", "desc": "Kucing oranye-putih meringkuk di atas selimut rajut mungil, tertanam dalam resin bening.", "theme": "Hewan & Cozy", "tags": ["Kucing", "Cozy"], "story": "Kucing belang oranye yang sedang tidur nyenyak di atas selimut rajut abu-abu, tertanam jernih dalam resin bening. Bulu loreng, mata terpejam, dan ekor yang melingkar dibuat sangat detail. Stem MX di bagian dasar ikut terlihat dari luar.", "highlights": ["Bulu loreng dan ekor melingkar berdetail", "Selimut rajut mini bertekstur", "Resin bening, terlihat dari segala sisi"], "specs": [["Tema", "Hewan & Cozy"], ["Warna", "Oranye, putih, abu-abu, bening"], ["Finishing", "Resin bening glossy"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-016", "img": "Keycaps/16.jpg", "name": "Aurora Geode", "profile": "OEM • Resin", "stock": "Tersedia", "limited": false, "priceNum": 365000, "price": "Rp 365.000", "desc": "Gugusan kristal iridescent ungu, pink, dan tosca dengan serpihan glitter halus.", "theme": "Kristal & Mineral", "tags": ["Kristal", "Fantasy"], "story": "Gugusan kristal bening tumbuh dari dasar keycap dan memantulkan semburat ungu, pink, dan tosca seperti aurora. Serpihan glitter halus tersebar di sela ruas kristalnya, dan cahaya hangat dari dasar membuat setiap sisi terlihat berbeda saat keycap bergerak.", "highlights": ["Kristal bersudut potong dengan efek iridescent", "Serpihan glitter halus di sela kristal", "Dasar gelap tembus cahaya yang serasi dengan backlight"], "specs": [["Tema", "Kristal & Mineral"], ["Warna", "Ungu, pink, tosca, amber"], ["Finishing", "Iridescent, bening glossy"], ["Cocok untuk", "Esc / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-017", "img": "Keycaps/17.jpg", "name": "Old Skool CRT", "profile": "Cherry • Resin", "stock": "Tersedia", "limited": false, "priceNum": 350000, "price": "Rp 350.000", "desc": "Komputer tabung mini berwarna krem dengan layar hijau yang menampilkan prompt A:\\>.", "theme": "Komputer Retro", "tags": ["Retro", "Komputer"], "story": "Monitor CRT era 90-an versi mini dengan bodi krem yang tampak sedikit menguning. Layar cembung berwarna hijau menampilkan prompt A:\\>_, lengkap dengan kisi ventilasi, deretan knob kecil, dan lampu LED merah di bagian bawah.", "highlights": ["Layar hijau dengan prompt A:\\>_", "Kisi ventilasi dan knob mungil", "Bodi krem dengan kesan usang"], "specs": [["Tema", "Komputer Retro"], ["Warna", "Krem, hijau gelap, merah"], ["Finishing", "Matte dengan efek usang, layar cembung glossy"], ["Cocok untuk", "Esc / Enter / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-018", "img": "Keycaps/18.jpg", "name": "Cobalt Sentinel", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 380000, "price": "Rp 380.000", "desc": "Helm robot tempur berlapis logam usang dengan mata dan panel sirkuit biru neon.", "theme": "Sci-Fi & Mecha", "tags": ["Mecha", "Cyberpunk"], "story": "Helm prajurit mecha berwarna gunmetal dengan goresan dan tepi aus, seolah baru kembali dari medan perang. Mata visor dan panel sirkuit di sisi helm menyala biru neon, dilengkapi roda gigi dan kabel kecil di bagian rahang.", "highlights": ["Mata visor dan panel sirkuit biru neon", "Panel lapis baja dengan tepi aus", "Roda gigi dan kabel mungil di rahang"], "specs": [["Tema", "Sci-Fi & Mecha"], ["Warna", "Gunmetal, hitam, biru neon"], ["Finishing", "Metalik usang, aksen biru neon"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-019", "img": "Keycaps/19.jpg", "name": "Donut Sprinkle Fiesta", "profile": "SA • PBT", "stock": "Tersedia", "limited": false, "priceNum": 355000, "price": "Rp 355.000", "desc": "Donat berglasir pink dengan taburan meses warna-warni di atas dasar roti keemasan.", "theme": "Kuliner Lucu", "tags": ["Donat", "Manis"], "story": "Satu donat utuh dengan glasir pink yang meleleh di tepinya dan meses pelangi tersebar acak. Donatnya duduk di atas dasar roti keemasan, jadi keycap ini terlihat seperti camilan yang siap dimakan.", "highlights": ["Glasir pink meleleh dengan kilau basah", "Meses pelangi warna-warni", "Dasar roti keemasan bertekstur"], "specs": [["Tema", "Kuliner Lucu"], ["Warna", "Pink, keemasan, warna-warni"], ["Finishing", "Glossy pada glasir, matte pada roti"], ["Cocok untuk", "Esc / Enter / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-020", "img": "Keycaps/20.jpg", "name": "Sovereign Crown", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 370000, "price": "Rp 370.000", "desc": "Mahkota emas berornamen dengan batu rubi, safir, dan permata putih di atas dasar emas.", "theme": "Kerajaan & Mewah", "tags": ["Mahkota", "Emas"], "story": "Mahkota kerajaan miniatur dengan lengkung berpilin, bola bundar, dan salib kecil di puncaknya. Tepinya bermanik halus dan bertabur batu merah, biru, serta putih, berdiri di atas dasar keycap berwarna emas yang mengilap.", "highlights": ["Lengkung mahkota bermanik dan berbatu permata", "Bola dan salib kecil di puncak", "Dasar emas berkilau"], "specs": [["Tema", "Kerajaan & Mewah"], ["Warna", "Emas, merah rubi, biru safir, putih"], ["Finishing", "Emas mengilap, batu permata mini"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-021", "img": "Keycaps/21.jpg", "name": "Iceberg Penguin", "profile": "OEM • PBT", "stock": "Tersedia", "limited": false, "priceNum": 330000, "price": "Rp 330.000", "desc": "Penguin mungil berselendang merah-putih duduk di atas bongkahan es bening.", "theme": "Musim Dingin", "tags": ["Penguin", "Es"], "story": "Penguin kecil dengan syal garis merah-putih bertengger di atas bongkahan es berwarna biru muda. Permukaan esnya penuh gelembung dan retakan halus sehingga terlihat seperti es sungguhan. Manis untuk meja kerja bertema dingin atau Natal.", "highlights": ["Penguin dengan syal garis merah-putih", "Bongkahan es bening dengan gelembung dan retak halus", "Cocok untuk tema musim dingin dan Natal"], "specs": [["Tema", "Musim Dingin"], ["Warna", "Biru es, hitam, putih, merah, oranye"], ["Finishing", "Dasar bening semi-transparan, figur berwarna"], ["Cocok untuk", "Esc / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-022", "img": "Keycaps/22.jpg", "name": "Pepperoni Melt", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 390000, "price": "Rp 390.000", "desc": "Pizza pepperoni dengan keju meleleh, taburan peterseli, dan pinggiran roti renyah.", "theme": "Kuliner Lucu", "tags": ["Pizza", "Keju"], "story": "Pizza mini dengan lapisan mozzarella yang meleleh dan menetes di sisi, ditemani tiga irisan pepperoni mengilap dan serpihan peterseli. Pinggiran rotinya melengkung di bagian belakang, dan dasar keycap berwarna cokelat keemasan seperti adonan panggang.", "highlights": ["Keju meleleh dengan bercak gosong", "Tiga irisan pepperoni mengilap", "Pinggiran roti dan dasar bertekstur panggang"], "specs": [["Tema", "Kuliner Lucu"], ["Warna", "Krem keju, merah pepperoni, cokelat keemasan, hijau"], ["Finishing", "Glossy pada keju, matte pada roti"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-023", "img": "Keycaps/23.jpg", "name": "Ramen Tengah Malam", "profile": "Cherry • PBT", "stock": "Tersedia", "limited": false, "priceNum": 295000, "price": "Rp 295.000", "desc": "Semangkuk ramen mini lengkap dengan telur setengah matang, chashu, nori, dan sumpit.", "theme": "Kuliner Jepang", "tags": ["Ramen", "Kuliner"], "story": "Mangkuk bermotif merah-biru berisi mi kuning, kuah cokelat, telur setengah matang, irisan chashu, narutomaki pink, nori, dan potongan daun bawang. Sepasang sumpit bambu bersandar di tepinya, dan dasar keycap putih membuatnya terlihat seperti mangkuk di atas meja.", "highlights": ["Telur setengah matang, chashu, narutomaki, dan nori", "Mangkuk bermotif tradisional merah-biru", "Sepasang sumpit bambu mini"], "specs": [["Tema", "Kuliner Jepang"], ["Warna", "Putih, cokelat kuah, kuning, pink, hijau"], ["Finishing", "Glossy pada kuah dan mangkuk"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-024", "img": "Keycaps/24.jpg", "name": "Filament Glow", "profile": "OEM • Resin", "stock": "Tersedia", "limited": false, "priceNum": 345000, "price": "Rp 345.000", "desc": "Dua bohlam filamen mungil terkunci dalam resin bening dengan nuansa cahaya hangat.", "theme": "Industrial & Retro", "tags": ["Bohlam", "Filamen"], "story": "Dua bohlam pijar mini dengan dudukan kuningan berdiri di atas pelat logam gelap, terkunci dalam blok resin bening. Filamennya tampak menyala keemasan sehingga terlihat hidup, apalagi di meja yang gelap.", "highlights": ["Dua bohlam dengan filamen keemasan", "Dudukan kuningan di atas pelat logam gelap", "Blok resin bening yang jernih"], "specs": [["Tema", "Industrial & Retro"], ["Warna", "Bening, emas hangat, kuningan, hitam"], ["Finishing", "Resin bening glossy"], ["Cocok untuk", "Esc / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-025", "img": "Keycaps/25.jpg", "name": "Shiba Happy Floof", "profile": "Cherry • PBT", "stock": "Tersedia", "limited": false, "priceNum": 285000, "price": "Rp 285.000", "desc": "Kepala shiba inu oranye-krem dengan bulu bertekstur dan senyum lebar.", "theme": "Hewan & Lucu", "tags": ["Anjing", "Shiba"], "story": "Shiba inu bulat berbulu oranye dengan dada krem dan telinga berlapis putih. Matanya hitam mengilap, lidah pink menjulur dalam senyum lebar, dan bulunya dibuat bertekstur halus. Teman setia untuk Esc atau Enter.", "highlights": ["Bulu oranye-krem bertekstur halus", "Mata hitam mengilap dan lidah pink", "Telinga berlapis putih"], "specs": [["Tema", "Hewan & Lucu"], ["Warna", "Oranye, krem, putih, hitam, pink"], ["Finishing", "Tekstur bulu, mata glossy"], ["Cocok untuk", "Esc / Enter / Panah"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-026", "img": "Keycaps/26.jpg", "name": "Clockwork Core", "profile": "Artisan • Resin", "stock": "Tersedia", "limited": false, "priceNum": 310000, "price": "Rp 310.000", "desc": "Roda gigi dan mesin jam kuningan-tembaga yang terkunci dalam resin bening.", "theme": "Steampunk", "tags": ["Steampunk", "Roda gigi"], "story": "Tumpukan roda gigi jam, pegas, dan pelat mesin berwarna kuningan dan tembaga ditanam di dalam resin bening. Dari atas maupun samping terlihat lapisan mekanismenya, seperti mengintip bagian dalam jam saku antik.", "highlights": ["Roda gigi kuningan dan tembaga bertumpuk", "Pelat dan pegas jam yang detail", "Resin bening terlihat dari segala sisi"], "specs": [["Tema", "Steampunk"], ["Warna", "Bening, kuningan, tembaga"], ["Finishing", "Resin bening glossy"], ["Cocok untuk", "Esc / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-027", "img": "Keycaps/27.jpg", "name": "Strawberry Cream Layer", "profile": "Artisan • Resin", "stock": "Stok Terbatas", "limited": true, "priceNum": 360000, "price": "Rp 360.000", "desc": "Potongan kue spons berlapis krim pink, stroberi, dan hiasan meringue.", "theme": "Kuliner Lucu", "tags": ["Kue", "Stroberi"], "story": "Kue berlapis dua dengan krim stroberi pink di tengah dan glasir pink yang menetes di sisi. Bagian atasnya dihias stroberi, kerucut meringue putih, dan taburan gula pink. Manis dan pastel, cocok untuk setup bertema cozy.", "highlights": ["Dua lapis spons dengan krim pink", "Stroberi mengilap dan meringue mungil", "Taburan gula pink di atas"], "specs": [["Tema", "Kuliner Lucu"], ["Warna", "Pink, krem, merah, putih"], ["Finishing", "Glossy pada stroberi dan glasir"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-028", "img": "Keycaps/28.jpg", "name": "Ikura Gunkan", "profile": "Cherry • PBT", "stock": "Tersedia", "limited": false, "priceNum": 490000, "price": "Rp 490.000", "desc": "Sushi gunkan berisi butiran ikura oranye mengilap dalam balutan nori.", "theme": "Kuliner Jepang", "tags": ["Sushi", "Ikura"], "story": "Gunkan maki dengan balutan nori bertekstur serat dan butiran telur ikan oranye yang menumpuk di puncaknya, dihiasi daun hijau kecil. Butir nasi putih terlihat di bagian dasar, membuat keycap ini tampak seperti sushi sungguhan.", "highlights": ["Butiran ikura oranye transparan dan mengilap", "Balutan nori bertekstur serat", "Butir nasi putih di dasar"], "specs": [["Tema", "Kuliner Jepang"], ["Warna", "Oranye, hitam kehijauan, putih"], ["Finishing", "Glossy pada ikura, matte pada nori"], ["Cocok untuk", "Esc / Enter / tombol aksen"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-029", "img": "Keycaps/29.jpg", "name": "Mesin Ketik Tua", "profile": "Cherry • PBT", "stock": "Tersedia", "limited": false, "priceNum": 510000, "price": "Rp 510.000", "desc": "Mesin ketik antik mini dengan gulungan kertas, deretan tuts bundar, dan batang spasi.", "theme": "Retro & Literasi", "tags": ["Mesin ketik", "Antik"], "story": "Replika mesin ketik tua berwarna logam gelap yang tampak usang, lengkap dengan gulungan kertas krem di atasnya. Deretan tuts bundar, batang spasi, dan kenop silinder dibuat detail. Pas untuk penulis dan pecinta keyboard.", "highlights": ["Deretan tuts bundar dan batang spasi", "Gulungan kertas dan kenop silinder", "Warna logam gelap dengan kesan antik"], "specs": [["Tema", "Retro & Literasi"], ["Warna", "Gunmetal, hitam, krem"], ["Finishing", "Metalik usang"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]},
    {"sku": "KC-030", "img": "Keycaps/30.jpg", "name": "Tumpukan Buku Antik", "profile": "OEM • PBT", "stock": "Tersedia", "limited": false, "priceNum": 475000, "price": "Rp 475.000", "desc": "Tiga buku kuno mini bersampul cokelat, hijau, dan merah dengan pita penanda.", "theme": "Perpustakaan & Klasik", "tags": ["Buku", "Klasik"], "story": "Tiga buku mungil bertumpuk di atas dasar keycap abu gelap. Sampul kulitnya tampak berumur dengan ornamen emas, tepi halamannya menguning, dan pita penanda menjuntai dari buku teratas. Hangat untuk meja kerja yang penuh buku.", "highlights": ["Tiga buku bersampul cokelat, hijau, dan merah", "Ornamen emas dan pita penanda", "Tepi halaman menguning bergaya antik"], "specs": [["Tema", "Perpustakaan & Klasik"], ["Warna", "Cokelat, hijau tua, merah marun, emas, abu gelap"], ["Finishing", "Tekstur kulit usang"], ["Cocok untuk", "Esc / Enter"], ["Stem", "MX (Cherry MX & kompatibel)"]]}
  ];

  // =====================================================
  // SISTEM DISKON
  // Isi persen diskon per SKU. SKU yang tidak ada di sini = harga normal.
  // Contoh: "KC-003": 20  -> diskon 20% untuk KC-003.
  // =====================================================
  const DISCOUNTS = {
    "KC-003": 20,
    "KC-005": 15,
    "KC-011": 25,
    "KC-013": 30,
    "KC-015": 20,
    "KC-018": 10,
    "KC-022": 15,
    "KC-028": 20,
    "KC-029": 25,
    "KC-030": 10
  };

  // =====================================================
  // STOK (simulasi di sisi klien)
  // Isi jumlah stok per SKU untuk menimpa nilai otomatis di bawah.
  // Contoh: "KC-003": 5  -> sisa 5 unit.
  // Tanpa isian: produk "Stok Terbatas" otomatis 2–8 unit, lainnya 20–50 unit.
  // Catatan: ini hanya batasan di browser. Stok sungguhan harus dicek di server.
  // =====================================================
  const STOCK_OVERRIDE = {};

  products.forEach(function (p) {
    const n = parseInt(String(p.sku).replace(/\D/g, ""), 10) || 0;
    const auto = p.limited ? 2 + ((n * 3) % 7) : 20 + ((n * 7) % 31);
    p.stockQty = Number.isFinite(STOCK_OVERRIDE[p.sku]) ? Math.max(0, STOCK_OVERRIDE[p.sku]) : auto;
    p.originalPriceNum = p.priceNum;
    p.originalPrice = p.price;
    const pct = Number(DISCOUNTS[p.sku]) || 0;
    p.discountPercent = pct > 0 && pct < 100 ? pct : 0;
    if (p.discountPercent > 0) {
      // harga akhir dibulatkan ke ribuan terdekat
      p.priceNum = Math.round((p.originalPriceNum * (1 - p.discountPercent / 100)) / 1000) * 1000;
      p.price = formatRupiah(p.priceNum);
    }
  });

  let channel = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (_) {
      channel = null;
    }
  }

  function broadcastEvent(type, payload) {
    if (channel) {
      try {
        channel.postMessage({ type: type, payload: payload, ts: Date.now() });
      } catch (_) {}
    }
  }

  function onRealtimeUpdate(callback) {
    window.addEventListener("storage", function (e) {
      if (e.key === ORDERS_KEY || e.key === CART_KEY || e.key === WISH_KEY) {
        callback({ source: "storage", key: e.key });
      }
    });
    if (channel) {
      channel.addEventListener("message", function (e) {
        callback({ source: "broadcast", data: e.data });
      });
    }
  }

  function formatRupiah(amount) {
    const num = Number(amount) || 0;
    return "Rp " + num.toLocaleString("id-ID");
  }

  function formatWaktu(isoString) {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Cart API
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(parsed) ? parsed : [];
      // selalu sinkron dengan harga (diskon) terbaru
      list.forEach(function (c) {
        const p = getProductBySku(c.sku);
        if (p) {
          c.priceNum = p.priceNum;
          // jumlah di keranjang tidak boleh melebihi stok
          c.qty = Math.max(1, Math.min(parseInt(c.qty, 10) || 1, p.stockQty));
        }
      });
      return list;
    } catch (_) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    broadcastEvent("CART_UPDATED", { count: getCartCount() });
    updateNavBadge();
  }

  function getProductBySku(sku) {
    return products.find(function (item) {
      return item.sku === sku;
    });
  }

  function addToCart(sku, qty) {
    const product = getProductBySku(sku);
    if (!product) return null;
    const addQty = Math.max(1, parseInt(qty, 10) || 1);
    const maxQty = Math.min(99, product.stockQty);
    if (maxQty < 1) return getCart();
    const cart = getCart();
    const existing = cart.find(function (c) {
      return c.sku === sku;
    });
    if (existing) {
      existing.qty = Math.min(maxQty, existing.qty + addQty);
    } else {
      cart.push({
        sku: product.sku,
        name: product.name,
        img: product.img,
        profile: product.profile,
        priceNum: product.priceNum,
        qty: Math.min(maxQty, addQty)
      });
    }
    saveCart(cart);
    return cart;
  }

  function updateCartQty(sku, newQty) {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty < 1) {
      return removeFromCart(sku);
    }
    const cart = getCart();
    const item = cart.find(function (c) {
      return c.sku === sku;
    });
    if (item) {
      const prod = getProductBySku(sku);
      item.qty = Math.min(99, prod ? prod.stockQty : 99, qty);
      saveCart(cart);
    }
    return cart;
  }

  function removeFromCart(sku) {
    const cart = getCart().filter(function (c) {
      return c.sku !== sku;
    });
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartCount() {
    return getCart().reduce(function (sum, item) {
      return sum + (parseInt(item.qty, 10) || 0);
    }, 0);
  }

  function getCartTotals(shippingCost) {
    const cart = getCart();
    const subtotal = cart.reduce(function (sum, item) {
      return sum + item.priceNum * item.qty;
    }, 0);
    const ongkir = cart.length > 0 ? (typeof shippingCost === "number" ? shippingCost : 18000) : 0;
    const grandTotal = subtotal + ongkir;
    return { subtotal: subtotal, ongkir: ongkir, grandTotal: grandTotal };
  }

  function getStock(sku) {
    const p = getProductBySku(sku);
    return p ? p.stockQty : 0;
  }

  // Wishlist API (favorit, disimpan per browser)
  function getWishlist() {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed)
        ? parsed.filter(function (sku) { return !!getProductBySku(sku); })
        : [];
    } catch (_) {
      return [];
    }
  }

  function isWished(sku) {
    return getWishlist().indexOf(sku) !== -1;
  }

  // mengembalikan true jika sekarang menjadi favorit, false jika dihapus
  function toggleWish(sku) {
    if (!getProductBySku(sku)) return false;
    const list = getWishlist();
    const idx = list.indexOf(sku);
    if (idx === -1) list.push(sku);
    else list.splice(idx, 1);
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(list));
    } catch (_) {}
    broadcastEvent("WISH_UPDATED", { count: list.length });
    return idx === -1;
  }

  // Orders API
  function getOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function getOrderById(orderId) {
    return getOrders().find(function (o) {
      return o.id === orderId;
    });
  }

  function generateOrderId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return "INV-TCK-" + y + m + d + "-" + rand;
  }

  function createOrder(customer, shippingMethod) {
    const cart = getCart();
    if (cart.length === 0) return null;

    let ongkir = 18000;
    let shippingLabel = "Kurir Reguler (JNE / J&T)";
    if (shippingMethod === "express") {
      ongkir = 32000;
      shippingLabel = "Kurir Instan / Next Day";
    } else if (shippingMethod === "pickup") {
      ongkir = 0;
      shippingLabel = "Ambil di Workshop Bandung (Gratis)";
    }

    const totals = getCartTotals(ongkir);
    const orderId = generateOrderId();
    const nowIso = new Date().toISOString();

    const order = {
      id: orderId,
      createdAt: nowIso,
      paidAt: null,
      rejectedAt: null,
      status: "PENDING", // PENDING | PAID | REJECTED
      paymentMethod: "QRIS",
      qrisRef: "QRIS" + Date.now().toString().slice(-8),
      approvalRef: null,
      shippingMethod: shippingLabel,
      customer: {
        nama: customer.nama,
        telepon: customer.telepon,
        alamat: customer.alamat,
        kota: customer.kota,
        catatan: customer.catatan || ""
      },
      items: cart.map(function (c) {
        return {
          sku: c.sku,
          name: c.name,
          img: c.img,
          profile: c.profile,
          priceNum: c.priceNum,
          qty: c.qty,
          subtotal: c.priceNum * c.qty
        };
      }),
      subtotal: totals.subtotal,
      ongkir: totals.ongkir,
      grandTotal: totals.grandTotal
    };

    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    clearCart();
    broadcastEvent("ORDER_CREATED", { orderId: order.id });
    return order;
  }

  function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const order = orders.find(function (o) {
      return o.id === orderId;
    });
    if (!order) return null;

    order.status = newStatus;
    if (newStatus === "PAID") {
      order.paidAt = new Date().toISOString();
      order.approvalRef = "APR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    } else if (newStatus === "REJECTED") {
      order.rejectedAt = new Date().toISOString();
    }
    saveOrders(orders);
    broadcastEvent("ORDER_STATUS_CHANGED", { orderId: order.id, status: newStatus });
    return order;
  }

  function renderStatusBadge(status) {
    if (status === "PAID") {
      return '<span class="status-badge status-paid">&#10003; Paid / Lunas</span>';
    }
    if (status === "REJECTED") {
      return '<span class="status-badge status-rejected">&#10005; Ditolak</span>';
    }
    return '<span class="status-badge status-pending"><span class="pulse-dot"></span> Menunggu Bayar</span>';
  }

  // Deterministic Dummy QRIS SVG Generator (Pure JS, zero libraries)
  function generateDummyQrisSvg(seedText) {
    const size = 25;
    const cell = 8;
    const quiet = 16;
    const totalPx = size * cell + quiet * 2;

    let hash = 2166136261;
    const text = String(seedText || "TOKO-CUSTOM-KEYCAPS-QRIS");
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    function nextBit() {
      hash ^= hash << 13;
      hash ^= hash >>> 17;
      hash ^= hash << 5;
      return (hash >>> 0) % 2 === 1;
    }

    const grid = Array.from({ length: size }, function () {
      return Array(size).fill(false);
    });
    const reserved = Array.from({ length: size }, function () {
      return Array(size).fill(false);
    });

    function placeFinder(r0, c0) {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const rr = r0 + r;
          const cc = c0 + c;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          reserved[rr][cc] = true;
          const inOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6;
          const onBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const inInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[rr][cc] = inOuter && (onBorder || inInner);
        }
      }
    }

    function placeAlignment(r0, c0) {
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const rr = r0 + r;
          const cc = c0 + c;
          reserved[rr][cc] = true;
          grid[rr][cc] = Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
        }
      }
    }

    placeFinder(0, 0);
    placeFinder(0, size - 7);
    placeFinder(size - 7, 0);
    placeAlignment(size - 7, size - 7);

    for (let i = 8; i < size - 8; i++) {
      reserved[6][i] = true;
      reserved[i][6] = true;
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    for (let r = 10; r <= 14; r++) {
      for (let c = 10; c <= 14; c++) {
        reserved[r][c] = true;
        grid[r][c] = false;
      }
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!reserved[r][c]) {
          grid[r][c] = nextBit();
        }
      }
    }

    let rects = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c]) {
          const x = quiet + c * cell;
          const y = quiet + r * cell;
          rects += '<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" fill="#1c1c1e"/>';
        }
      }
    }

    const cx = totalPx / 2;
    const cy = totalPx / 2;

    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + totalPx + '" height="' + totalPx + '" viewBox="0 0 ' + totalPx + " " + totalPx + '" role="img" aria-label="Kode QRIS">' +
      '<rect width="100%" height="100%" fill="#ffffff"/>' +
      rects +
      '<rect x="' + (cx - 24) + '" y="' + (cy - 13) + '" width="48" height="26" rx="4" fill="#ffffff" stroke="#1c1c1e" stroke-width="1.5"/>' +
      '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="800" fill="#1c1c1e">QRIS</text>' +
      "</svg>"
    );
  }

  // Logo toko: keycap berkilau dengan stem Cherry MX "+" yang menyala berganti warna.
  // Keycap "mengetik" sendiri tiap beberapa detik; saat di-hover stem berputar jadi "x".
  const BRAND_LOGO = `<svg viewBox="0 0 64 64" focusable="false">
    <defs>
      <linearGradient id="tck-rgb" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ff2e88"/><stop offset=".25" stop-color="#ffc53d"/>
        <stop offset=".5" stop-color="#3dffa0"/><stop offset=".75" stop-color="#22e4ff"/>
        <stop offset="1" stop-color="#8b5cff"/>
      </linearGradient>
      <linearGradient id="tck-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a3760"/><stop offset="1" stop-color="#14131f"/>
      </linearGradient>
      <linearGradient id="tck-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a5596"/><stop offset="1" stop-color="#2a2748"/>
      </linearGradient>
      <filter id="tck-blur" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="3.5"/></filter>
    </defs>
    <rect class="bl-tile" x="2" y="2" width="60" height="60" rx="17"/>
    <rect class="bl-track" x="2" y="2" width="60" height="60" rx="17"/>
    <rect class="bl-chase" x="2" y="2" width="60" height="60" rx="17" pathLength="100"/>
    <ellipse class="bl-glow" cx="32" cy="55" rx="20" ry="4" filter="url(#tck-blur)"/>
    <rect class="bl-switch" x="13" y="49" width="38" height="8" rx="3"/>
    <g class="bl-cap">
      <path d="M8 50 L13 24 Q32 17 51 24 L56 50 Q32 57 8 50Z" fill="url(#tck-body)" stroke="rgba(255,255,255,.22)" stroke-width=".8"/>
      <path d="M16 26 Q32 20.5 48 26 L45 41 Q32 45 19 41Z" fill="url(#tck-top)" stroke="rgba(255,255,255,.18)" stroke-width=".6"/>
      <path class="bl-flash" d="M16 26 Q32 20.5 48 26 L45 41 Q32 45 19 41Z"/>
      <g class="bl-stem"><circle cx="32" cy="33" r="9.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-opacity=".8" stroke-linecap="round" stroke-dasharray="9 5.9" stroke-dashoffset="-2.95"/><rect x="26" y="31.6" width="12" height="2.8" rx="1.2"/><rect x="30.6" y="27" width="2.8" height="12" rx="1.2"/></g>
      <path d="M19.5 28.4 Q25 26 31 25.4" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.4" stroke-linecap="round"/>
    </g>
    <path class="bl-spark" d="M52 9.5 L53.5 13.5 L57.5 15 L53.5 16.5 L52 20.5 L50.5 16.5 L46.5 15 L50.5 13.5Z"/>
  </svg>`;

  // ===== Kontak & media sosial =====
  // GANTI nilai di bawah dengan data asli toko. Kosongkan sebuah field ("") atau hapus
  // barisnya dari "socials" untuk menyembunyikannya. Semua nilai di sini masih CONTOH.
  const CONTACT = {
    person: { name: "Daniel", role: "Pemilik & Admin Toko" },
    whatsapp: "6281234567890",            // format internasional, tanpa "+" dan tanpa 0 di depan
    whatsappDisplay: "+62 812-3456-7890",
    waMessage: "Halo Daniel, saya mau tanya soal keycaps di Toko Daniel Secret.",
    email: "halo@example.com",
    address: "Workshop Toko Daniel Secret, Bandung, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Bandung",
    hours: "09.00 – 17.00 WIB",
    socials: [
      { label: "Instagram", icon: "instagram", handle: "@tokodanielsecret", url: "https://instagram.com/tokodanielsecret", rgb: "255, 46, 136" },
      { label: "TikTok", icon: "tiktok", handle: "@tokodanielsecret", url: "https://tiktok.com/@tokodanielsecret", rgb: "34, 228, 255" },
      { label: "YouTube", icon: "youtube", handle: "Toko Daniel Secret", url: "https://youtube.com/@tokodanielsecret", rgb: "255, 69, 96" },
      { label: "Telegram", icon: "telegram", handle: "@tokodanielsecret", url: "https://t.me/tokodanielsecret", rgb: "56, 189, 248" },
      { label: "Shopee", icon: "bag", handle: "Toko Daniel Secret", url: "https://shopee.co.id/tokodanielsecret", rgb: "255, 120, 60" }
    ]
  };

  // ===== Ikon (gaya garis, 24x24) =====
  const ICONS = {
    grid: `<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`,
    cart: `<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 7H6"/>`,
    history: `<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>`,
    truck: `<path d="M2 6h11v10H2z"/><path d="M13 9h4l4 4v3h-8"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>`,
    store: `<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v8h14v-8"/><path d="M10 20v-5h4v5"/>`,
    qr: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v1M14 20h3M20 18v3"/>`,
    pin: `<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`,
    clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>`,
    mail: `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>`,
    phone: `<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`,
    user: `<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>`,
    chat: `<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>`,
    whatsapp: `<path d="M3 21l1.7-5A9 9 0 1 1 8 19.3z"/><path d="M9 8c0 3.6 3.4 7 7 7l1-1.6-2.2-1.1-1 .9a5 5 0 0 1-2.1-2.1l.9-1L10.5 7z"/>`,
    instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/>`,
    tiktok: `<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.7 2.1 4.4 5 4.7"/>`,
    youtube: `<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor"/>`,
    telegram: `<path d="M21 4L3 11l6 2.5L11 20l3-4.5 4.5 3.5z"/><path d="M9 13.5L21 4"/>`,
    bag: `<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>`,
    external: `<path d="M7 17L17 7"/><path d="M8 7h9v9"/>`,
    keyboard: `<rect x="2" y="6" width="20" height="12" rx="2.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>`
  };

  function svgIcon(name) {
    const body = ICONS[name];
    return body ? '<svg viewBox="0 0 24 24" focusable="false">' + body + "</svg>" : "";
  }

  function icon(name, cls) {
    return '<i class="ic' + (cls ? " " + cls : "") + '" aria-hidden="true">' + svgIcon(name) + "</i>";
  }

  // Isi elemen kosong ber-atribut data-icon="nama" dengan SVG-nya (dipakai di HTML statis)
  function hydrateIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
      if (el.firstChild) return;
      el.classList.add("ic");
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = svgIcon(el.getAttribute("data-icon"));
    });
  }

  function waLink(message) {
    return "https://wa.me/" + CONTACT.whatsapp + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  // Shared Topbar & Footer
  function renderTopbar(activePage) {
    const holder = document.getElementById("site-topbar");
    if (!holder) return;

    const count = getCartCount();
    holder.innerHTML =
      "<header>" +
      '  <div class="container header-inner">' +
      '    <a href="index.html" class="brand">' +
      '      <span class="brand-logo" aria-hidden="true">' + BRAND_LOGO + "</span>" +
      "      <div>" +
      '        <div class="brand-title"><span class="bt-small">Toko</span><span class="bt-main"><span class="bt-w1">Daniel</span> <span class="bt-w2">Secret</span></span></div>' +
      '        <div class="brand-sub">Koleksi Keycaps Mekanikal &amp; Artisan</div>' +
      "      </div>" +
      "    </a>" +
      '    <nav class="topbar-nav" aria-label="Navigasi Utama">' +
      '      <a href="index.html" class="nav-link ' + (activePage === "katalog" ? "active" : "") + '">' + icon("grid") + 'Katalog</a>' +
      '      <a href="cart.html" class="nav-link ' + (activePage === "cart" ? "active" : "") + '">' + icon("cart") + 'Keranjang <span class="cart-badge" id="nav-cart-count">' + count + "</span></a>" +
      '      <a href="history.html" class="nav-link ' + (activePage === "history" ? "active" : "") + '">' + icon("history") + 'Riwayat Transaksi</a>' +
      '      <a href="#kontak" class="nav-link">' + icon("chat") + 'Kontak</a>' +
      "    </nav>" +
      "  </div>" +
      "</header>";
  }

  function renderFooter() {
    const holder = document.getElementById("site-footer");
    if (!holder) return;
    const year = new Date().getFullYear();
    const c = CONTACT;
    const e = escapeHtml;
    const wa = c.whatsapp ? waLink(c.waMessage) : "";
    const ext = ' target="_blank" rel="noopener noreferrer"';

    function row(ic, label, value, href, external) {
      const inner = icon(ic) + '<span class="ft-row-text"><small>' + e(label) + "</small><strong>" + e(value) + "</strong></span>";
      return "<li>" + (href
        ? '<a class="ft-row" href="' + e(href) + '"' + (external ? ext : "") + ">" + inner + "</a>"
        : '<div class="ft-row">' + inner + "</div>") + "</li>";
    }

    const rows = [];
    if (c.whatsapp) rows.push(row("whatsapp", "WhatsApp", c.whatsappDisplay || c.whatsapp, wa, true));
    if (c.email) rows.push(row("mail", "Email", c.email, "mailto:" + c.email, false));
    if (c.address) rows.push(row("pin", "Workshop", c.address, c.mapsUrl, true));
    if (c.hours) rows.push(row("clock", "Jam Operasional", c.hours, "", false));

    const socials = (c.socials || []).filter(function (x) { return x && x.url; }).map(function (x) {
      return '<li><a class="ft-social-link" style="--sc: ' + e(x.rgb || "34, 228, 255") + '" href="' + e(x.url) + '"' + ext +
        ' aria-label="' + e(x.label + (x.handle ? " " + x.handle : "")) + '">' +
        icon(x.icon, "sc-ic") +
        '<span class="ft-social-text"><b>' + e(x.label) + "</b><small>" + e(x.handle || "") + "</small></span>" +
        icon("external", "ft-ext") + "</a></li>";
    });

    const person = c.person && c.person.name
      ? '<div class="ft-person">' +
        '  <span class="ft-avatar" aria-hidden="true">' + e(c.person.name.charAt(0).toUpperCase()) + "</span>" +
        '  <div class="ft-person-info"><div class="ft-person-name">' + e(c.person.name) + '</div><div class="ft-person-role">' + e(c.person.role || "") + "</div></div>" +
        (wa ? '  <a class="btn btn-wa btn-sm" href="' + e(wa) + '"' + ext + ">" + icon("whatsapp") + "Chat WhatsApp</a>" : "") +
        "</div>"
      : "";

    holder.innerHTML =
      "<footer>" +
      '  <div class="container footer-grid">' +
      '    <section class="ft-col ft-brand" aria-labelledby="ft-brand-h">' +
      '      <h2 class="ft-brand-name" id="ft-brand-h">Toko Daniel Secret</h2>' +
      '      <p class="ft-about">Custom keycaps mekanikal &amp; artisan, dikurasi dan dikirim langsung dari Bandung.</p>' +
      '      <ul class="ft-badges">' +
      "        <li>" + icon("qr") + "Bayar via QRIS</li>" +
      "        <li>" + icon("truck") + "Kirim JNE / J&amp;T</li>" +
      "        <li>" + icon("store") + "Ambil di workshop</li>" +
      "      </ul>" +
      "    </section>" +
      '    <section class="ft-col ft-contact" id="kontak" aria-labelledby="ft-contact-h">' +
      '      <h2 class="ft-h" id="ft-contact-h">Hubungi Kami</h2>' + person +
      (rows.length ? '      <ul class="ft-rows">' + rows.join("") + "</ul>" : "") +
      "    </section>" +
      (socials.length
        ? '    <section class="ft-col ft-social" aria-labelledby="ft-social-h">' +
          '      <h2 class="ft-h" id="ft-social-h">Media Sosial</h2>' +
          '      <ul class="ft-socials">' + socials.join("") + "</ul>" +
          "    </section>"
        : "") +
      "  </div>" +
      '  <div class="container footer-inner">' +
      "    <div>&copy; " + year + " Toko Daniel Secret. Seluruh hak cipta dilindungi.</div>" +
      "    <div>Lokasi: Bandung, Indonesia &bull; Jam Operasional: 09.00 &ndash; 17.00 WIB</div>" +
      "  </div>" +
      "</footer>";

    // tombol chat mengambang
    if (wa && !document.getElementById("fab-wa")) {
      document.body.insertAdjacentHTML("beforeend",
        '<a id="fab-wa" class="fab fab-wa" href="' + e(wa) + '"' + ext + ' aria-label="Chat ' + e(c.person.name || "admin") + ' lewat WhatsApp">' +
        icon("whatsapp") + '<span class="fab-label">Chat Admin</span></a>');
    }

    // data terstruktur organisasi untuk mesin pencari
    if (!document.getElementById("ld-org")) {
      const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Toko Daniel Secret",
        email: c.email || undefined,
        telephone: c.whatsappDisplay || undefined,
        address: { "@type": "PostalAddress", addressLocality: "Bandung", addressCountry: "ID" },
        sameAs: (c.socials || []).map(function (x) { return x.url; }).filter(Boolean)
      };
      const tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = "ld-org";
      tag.textContent = JSON.stringify(org);
      document.head.appendChild(tag);
    }

    hydrateIcons(document);
  }

  function updateNavBadge() {
    const badge = document.getElementById("nav-cart-count");
    if (badge) {
      badge.textContent = String(getCartCount());
    }
  }

  // Toast helper
  // showToast(message) tetap berfungsi seperti sebelumnya.
  // Opsi tambahan: showToast(message, { actions: [{ label, href }, { label, onClick }], duration })
  let toastTimer = null;
  let toastDuration = 2400;

  function hideToast() {
    clearTimeout(toastTimer);
    const el = document.getElementById("tck-toast");
    if (el) el.classList.remove("show", "has-actions");
  }

  function startToastTimer() {
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, toastDuration);
  }

  function showToast(message, opts) {
    opts = opts || {};
    let el = document.getElementById("tck-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "tck-toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.setAttribute("aria-atomic", "true");
      // timer berhenti selama kursor/fokus berada di toast, supaya tombol aksi sempat diklik
      el.addEventListener("mouseenter", function () { clearTimeout(toastTimer); });
      el.addEventListener("mouseleave", function () {
        if (el.classList.contains("show")) startToastTimer();
      });
      el.addEventListener("focusin", function () { clearTimeout(toastTimer); });
      el.addEventListener("focusout", function () {
        if (el.classList.contains("show")) startToastTimer();
      });
      document.body.appendChild(el);
    }

    el.textContent = "";
    const msg = document.createElement("span");
    msg.className = "toast-msg";
    msg.textContent = message;
    el.appendChild(msg);

    const actions = Array.isArray(opts.actions) ? opts.actions : [];
    if (actions.length) {
      const wrap = document.createElement("span");
      wrap.className = "toast-actions";
      actions.forEach(function (a) {
        let node;
        if (a.href) {
          node = document.createElement("a");
          node.href = a.href;
        } else {
          node = document.createElement("button");
          node.type = "button";
        }
        node.className = "toast-action";
        node.textContent = a.label;
        node.addEventListener("click", function () {
          hideToast(); // sembunyikan dulu, agar toast baru dari onClick tidak ikut tertutup
          if (typeof a.onClick === "function") a.onClick();
        });
        wrap.appendChild(node);
      });
      el.appendChild(wrap);
    }

    el.classList.toggle("has-actions", actions.length > 0);
    el.classList.add("show");
    toastDuration = typeof opts.duration === "number" ? opts.duration : (actions.length ? 5000 : 2400);
    startToastTimer();
  }

  onRealtimeUpdate(function () {
    updateNavBadge();
  });

  window.TCKStore = {
    products: products,
    formatRupiah: formatRupiah,
    formatWaktu: formatWaktu,
    escapeHtml: escapeHtml,
    getCart: getCart,
    addToCart: addToCart,
    updateCartQty: updateCartQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    getCartCount: getCartCount,
    getCartTotals: getCartTotals,
    getOrders: getOrders,
    getOrderById: getOrderById,
    createOrder: createOrder,
    updateOrderStatus: updateOrderStatus,
    renderStatusBadge: renderStatusBadge,
    generateDummyQrisSvg: generateDummyQrisSvg,
    renderTopbar: renderTopbar,
    renderFooter: renderFooter,
    icon: icon,
    hydrateIcons: hydrateIcons,
    contact: CONTACT,
    updateNavBadge: updateNavBadge,
    showToast: showToast,
    onRealtimeUpdate: onRealtimeUpdate,
    getStock: getStock,
    getWishlist: getWishlist,
    isWished: isWished,
    toggleWish: toggleWish
  };
})();
