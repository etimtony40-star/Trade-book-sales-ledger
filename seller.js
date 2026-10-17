/* TradeBook seller pricing. Load BEFORE purchases.js.
   The buyer never sets the price: sellerQuote(name) returns the seller's price per unit.
   Prices are rough Nigerian market ranges (naira). Update the table to match your market. */
(function () {
  const G = {
    st: [
      "Mr Ibe Stationery Mart",
      "Grace Books & Stationery",
      "Alhaji Bello Office Supplies",
    ],
    fd: [
      "Mama Chidi Provisions",
      "Alhaji Sule Grains & Foods",
      "Mile 3 Market Wholesalers",
    ],
    fb: [
      "Madam Bisi Fabrics",
      "Ada Fashion Collections",
      "Balogun Market Traders",
    ],
    el: [
      "Trans-Amadi Electronics",
      "Rumuokoro Gadget Hub",
      "Mile 1 Tech Dealer",
    ],
    vh: ["Ikenegbu Motors", "Autojunction Dealers"],
    pr: ["Prime Estates & Land Ltd", "Rivers Property Agents"],
    fu: ["Elegance Furniture Mart", "Woji Home Furnishings"],
    hw: ["Oyigbo Building Materials", "Alaba Hardware Stores"],
    bt: ["Glow Beauty Wholesale", "Madam Kemi Cosmetics"],
    gn: ["Mile 3 General Traders", "Alhaji Musa Wholesale"],
  };
  /* [group, pattern, low, high, (default size for per-kg / per-litre goods)] */
  const T = [
    ["st", /pencil/, 80, 200],
    ["st", /eraser|sharpener|\brubber\b/, 100, 300],
    ["st", /exercise book|jotter|note ?book|copy ?book/, 350, 1200],
    ["st", /marker|highlighter/, 300, 900],
    ["st", /\bruler\b|geometry/, 200, 1500],
    ["st", /calculator/, 2500, 8000],
    ["st", /stapler/, 1500, 4500],
    ["st", /\bream\b|\ba4\b|\bpaper\b/, 6000, 9500],
    ["st", /envelope|folder/, 150, 600],
    ["st", /\bglue\b|\bgum\b|cello|\btape\b/, 300, 1200],
    ["st", /\bpens?\b|biro|ballpoint/, 100, 300],
    ["st", /stationer/, 200, 2000],
    ["el", /phone case|screen (protector|guard)|pouch/, 1500, 5000],
    ["el", /power ?bank/, 12000, 35000],
    ["el", /charger|cable|adapter/, 2500, 8000],
    ["el", /ear(phone|piece|pod)|headset|headphone/, 3000, 18000],
    ["el", /iphone/, 600000, 1900000],
    ["el", /samsung|galaxy/, 180000, 1200000],
    ["el", /phone|tecno|infinix|itel|oppo|redmi|android/, 90000, 450000],
    ["el", /macbook/, 1400000, 3500000],
    ["el", /laptop|computer|\bpc\b/, 450000, 1600000],
    ["el", /printer/, 120000, 600000],
    ["el", /television|\btv\b/, 180000, 1200000],
    ["el", /generator|sumec|firman/, 250000, 1500000],
    ["el", /inverter|solar|battery/, 350000, 3500000],
    ["el", /fridge|refrigerator|freezer/, 350000, 1200000],
    ["el", /air ?conditioner|split unit|\bac\b/, 450000, 1100000],
    ["el", /\bfan\b/, 25000, 70000],
    ["el", /blender/, 20000, 60000],
    ["el", /microwave/, 80000, 250000],
    ["el", /cooker/, 90000, 350000],
    ["vh", /bicycle/, 120000, 350000],
    ["vh", /motorcycle|\bbike\b|okada/, 1200000, 2800000],
    ["vh", /keke|tricycle/, 3500000, 6500000],
    ["vh", /truck|lorry|trailer/, 15e6, 60e6],
    [
      "vh",
      /\bcar\b|toyota|honda|lexus|camry|corolla|\bbus\b|vehicle|\bsuv\b|jeep/,
      4e6,
      25e6,
    ],
    ["pr", /\bland\b|\bplots?\b/, 5e6, 80e6],
    ["pr", /house|building|apartment|duplex|\bflat\b/, 15e6, 2e8],
    ["fd", /indomie|noodle/, 9500, 12500],
    ["fd", /water|\bbales?\b/, 1200, 1800],
    ["fd", /\beggs?\b/, 4500, 7000],
    ["fd", /coke|fanta|sprite|pepsi|soft drink|\bmalt\b/, 5500, 9500],
    ["fd", /bread/, 1200, 2500],
    ["fd", /\brice\b/, 1600, 2100, 50],
    ["fd", /beans/, 2200, 2900, 50],
    ["fd", /sugar/, 1800, 2200, 50],
    ["fd", /flour/, 1200, 1700, 50],
    ["fd", /garri|gari/, 700, 1100, 50],
    ["fd", /\boil\b/, 2800, 3600, 25],
    ["fu", /mattress/, 90000, 450000],
    ["fu", /sofa|couch/, 150000, 900000],
    ["fu", /\bbed\b/, 80000, 450000],
    ["fu", /wardrobe/, 120000, 500000],
    ["fu", /chair/, 15000, 60000],
    ["fu", /\btables?\b|\bdesk\b/, 40000, 180000],
    ["hw", /cement/, 9500, 12500],
    ["hw", /iron rod|\brods?\b/, 11000, 22000],
    ["hw", /paint/, 45000, 95000],
    ["hw", /plank|timber/, 2500, 4500],
    ["bt", /\bwig\b/, 25000, 250000],
    ["bt", /perfume|body spray/, 8000, 80000],
    ["bt", /soap/, 400, 1500],
    ["bt", /cream|lotion/, 2500, 9000],
    ["bt", /weave|attachment|\bhair\b/, 6000, 45000],
    ["fb", /lace|george|aso ?oke/, 25000, 120000],
    ["fb", /ankara|fabric|material|wrapper/, 9000, 18000],
    ["fb", /slipper|sandal/, 3000, 10000],
    ["fb", /shoe|sneaker|\bboots?\b/, 15000, 60000],
    ["fb", /school bag|handbag|backpack/, 8000, 30000],
    ["fb", /shirt|trouser|jean|dress|cloth|jersey/, 6000, 25000],
  ];
  const hash = (s) => {
    let h = 5381;
    for (const c of s) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
    return h;
  };
  const step = (p) =>
    p < 1e3 ? 10 : p < 1e4 ? 50 : p < 1e5 ? 500 : p < 1e6 ? 5e3 : 5e4;
  window.sellerQuote = function (name) {
    const k = String(name || "")
      .toLowerCase()
      .trim();
    if (!k) return null;
    let g = "gn",
      lo = 1500,
      hi = 12000,
      known = false;
    for (const t of T) {
      if (t[1].test(k)) {
        g = t[0];
        lo = t[2];
        hi = t[3];
        known = true;
        if (t[4]) {
          const m = k.match(/(\d+(?:\.\d+)?)\s*(?:kg|l|litres?|liters?)\b/),
            sz = m ? +m[1] : t[4];
          lo *= sz;
          hi *= sz;
        }
        break;
      }
    }
    if (!known && /carton|bale|dozen|pack|bundle|bag|crate|box/.test(k)) {
      lo *= 3;
      hi *= 3;
    }
    /* same item + same day = same price, so asking again (or changing the date) cannot get a cheaper one */
    const seed = k + "|" + new Date().toDateString(),
      list = G[g],
      r = (hash(seed) % 10000) / 10000,
      raw = lo + r * (hi - lo),
      st = step(raw);
    return {
      seller: list[hash(seed + "s") % list.length],
      unit: Math.max(st, Math.round(raw / st) * st),
      known,
    };
  };
})();
