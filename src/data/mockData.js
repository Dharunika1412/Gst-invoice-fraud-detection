export const invoices = [
  { id: "INV-2041", supplier: "Sri Murugan Traders", gstin: "29ABCDE1234F1Z5", date: "2026-09-24", amount: 482000, tax: 86760, score: 96, flags: ["GSTIN checksum is invalid", "Amount is 9.4x the supplier median", "Raised on a public holiday"] },
  { id: "INV-2044", supplier: "Kaveri Textiles", gstin: "33AAKCK7788L1ZQ", date: "2026-09-25", amount: 1250000, tax: 225000, score: 91, flags: ["Circular billing across 2 linked GSTINs", "ITC claimed exceeds 18% of value"] },
  { id: "INV-2039", supplier: "Anand Fasteners", gstin: "33BBQPA4432M1Z2", date: "2026-09-21", amount: 76500, tax: 13770, score: 84, flags: ["Duplicate invoice number within 30 days", "Supplier has not filed GSTR-1"] },
  { id: "INV-2052", supplier: "Velan Packaging", gstin: "33CCPVN9001R1ZK", date: "2026-09-27", amount: 310000, tax: 55800, score: 72, flags: ["HSN code differs from product history", "Tax rate above expected slab"] },
  { id: "INV-2047", supplier: "Bhavani Handlooms", gstin: "33DDQBH5566K1Z8", date: "2026-09-26", amount: 54200, tax: 2710, score: 63, flags: ["Raised at an unusual hour (02:14 IST)"] },
  { id: "INV-2050", supplier: "Erode Agro Foods", gstin: "33EEREF1120N1Z9", date: "2026-09-27", amount: 128900, tax: 6445, score: 58, flags: ["Round-figure amount", "First invoice from a new supplier"] },
  { id: "INV-2036", supplier: "Perundurai Steels", gstin: "33FFSPS3344Q1Z1", date: "2026-09-19", amount: 905000, tax: 162900, score: 41, flags: ["Volume spike against last quarter"] },
  { id: "INV-2055", supplier: "Gobi Oil Mills", gstin: "33GGTGO7788P1ZB", date: "2026-09-28", amount: 22400, tax: 1120, score: 22, flags: [] },
  { id: "INV-2033", supplier: "Tiruppur Knits", gstin: "33HHUTK1212J1ZD", date: "2026-09-18", amount: 67300, tax: 3365, score: 17, flags: [] },
  { id: "INV-2058", supplier: "Salem Machine Works", gstin: "33IIVSM9090H1ZF", date: "2026-09-29", amount: 143000, tax: 25740, score: 12, flags: [] },
  { id: "INV-2030", supplier: "Coimbatore Pumps", gstin: "33JJWCP4545G1ZH", date: "2026-09-16", amount: 258000, tax: 46440, score: 9, flags: [] },
  { id: "INV-2060", supplier: "Namakkal Poultry", gstin: "33KKXNP6767E1ZJ", date: "2026-09-30", amount: 39800, tax: 1990, score: 6, flags: [] },
];

export const monthlyTrend = [
  { month: "Apr", scanned: 220, flagged: 14 },
  { month: "May", scanned: 248, flagged: 19 },
  { month: "Jun", scanned: 231, flagged: 12 },
  { month: "Jul", scanned: 276, flagged: 25 },
  { month: "Aug", scanned: 302, flagged: 31 },
  { month: "Sep", scanned: 329, flagged: 27 },
];

export const flagTypes = [
  { type: "Amount outlier", count: 34 },
  { type: "Duplicate number", count: 21 },
  { type: "Invalid GSTIN", count: 17 },
  { type: "Filing gap", count: 15 },
  { type: "Circular billing", count: 9 },
];

export const reports = [
  { id: "RPT-0926", name: "September compliance summary", period: "Sep 2026", generated: "2026-10-01", format: "PDF", size: "1.2 MB" },
  { id: "RPT-0826", name: "August compliance summary", period: "Aug 2026", generated: "2026-09-02", format: "PDF", size: "1.1 MB" },
  { id: "RPT-ITC-Q2", name: "Input tax credit at risk, Q2", period: "Jul to Sep 2026", generated: "2026-10-01", format: "XLSX", size: "640 KB" },
  { id: "RPT-SUP-Q2", name: "High-risk supplier register", period: "Jul to Sep 2026", generated: "2026-09-30", format: "CSV", size: "88 KB" },
];

export const featureContribution = (invoice) => [
  { feature: "Amount vs median", weight: Math.min(100, Math.round(invoice.score * 0.9)) },
  { feature: "Supplier history", weight: Math.round(invoice.score * 0.65) },
  { feature: "GSTIN validity", weight: invoice.flags.some((f) => f.includes("GSTIN")) ? 88 : 12 },
  { feature: "Filing status", weight: invoice.flags.some((f) => f.includes("filed")) ? 79 : 10 },
  { feature: "Timing pattern", weight: invoice.flags.some((f) => f.includes("hour") || f.includes("holiday")) ? 70 : 14 },
];
