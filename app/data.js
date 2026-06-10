/* Meridian — placeholder banking product catalogue (wireframe data) */
(function () {
  // category display order mirrors the slide-out nav sketch
  const CATEGORIES = [
    "Savings",
    "Current accounts",
    "ISAs",
    "Investments",
    "Pensions",
    "Loans",
    "Insurance",
    "Life",
    "Family",
    "Overdrafts",
  ];

  // key: short label shown in autosuggest / panels   (the "one variable")
  // unit: caption under the key value
  const PRODUCTS = [
    // ---------------- SAVINGS ----------------
    {
      id: "easy-saver", name: "Easy Saver", category: "Savings",
      kind: "Easy access", key: "1.00%", unit: "AER variable",
      descriptor: "Variable rate for short-term, dip-in-and-out saving.",
      tags: "easy access instant flexible",
      bullets: ["Withdraw any time, no notice", "Save from £1", "Manage entirely in-app", "Rate tracks the base rate"],
    },
    {
      id: "fixed-saver", name: "Fixed Rate Saver", category: "Savings",
      kind: "Fixed term", key: "4.50%", unit: "AER fixed · 1yr",
      descriptor: "Lock your money away for a guaranteed return.",
      tags: "fixed rate bond term locked guaranteed",
      bullets: ["Higher guaranteed rate", "1, 2 or 3 year terms", "No withdrawals during term", "Save £2,000–£1,000,000"],
    },
    {
      id: "cash-isa-saver", name: "Cash ISA Saver", category: "Savings",
      kind: "Tax-free", key: "4.20%", unit: "AER tax-free",
      descriptor: "Tax-free easy-access saving up to your ISA allowance.",
      tags: "isa tax-free tax free easy access allowance",
      bullets: ["Tax-free interest", "£20,000 annual ISA allowance", "Easy access, no notice", "Transfer in existing ISAs"],
    },
    {
      id: "regular-saver", name: "Regular Saver", category: "Savings",
      kind: "Monthly", key: "6.25%", unit: "AER fixed · 1yr",
      descriptor: "Build a habit — pay in monthly for a top rate.",
      tags: "regular monthly habit fixed",
      bullets: ["Pay in £25–£250 a month", "Top fixed rate for 12 months", "Set up a standing order", "One withdrawal allowed"],
    },
    {
      id: "term-deposit", name: "Term Deposit", category: "Savings",
      kind: "Fixed term", key: "4.65%", unit: "AER fixed · 2yr",
      descriptor: "A larger lump sum, locked for a fixed period.",
      tags: "term deposit fixed lump sum bond",
      bullets: ["Fixed return for 2–5 years", "Minimum £5,000", "Interest paid annually or at maturity"],
    },

    // ---------------- CURRENT ACCOUNTS ----------------
    {
      id: "classic-account", name: "Classic Account", category: "Current accounts",
      kind: "Everyday", key: "£0", unit: "monthly fee",
      descriptor: "A simple everyday account with no monthly fee.",
      tags: "current everyday classic john free",
      bullets: ["No monthly account fee", "Contactless debit card", "Arranged overdraft (subject to status)", "In-app spending insights"],
      owned: true, balance: "£100", overdraft: "£0.00",
    },
    {
      id: "joint-account", name: "Joint Account", category: "Current accounts",
      kind: "Shared", key: "£0", unit: "monthly fee",
      descriptor: "Share an account with someone you trust.",
      tags: "current joint shared couple two",
      bullets: ["Two cardholders", "Shared spending view", "Both approve key changes", "No monthly fee"],
    },
    {
      id: "premier-account", name: "Premier Account", category: "Current accounts",
      kind: "Rewards", key: "£3", unit: "monthly fee",
      descriptor: "Cashback on bills plus everyday perks.",
      tags: "current premier rewards cashback perks",
      bullets: ["Cashback on direct debits", "Travel & mobile insurance", "Priority support", "£3/month, waived above £2,500 in"],
    },
    {
      id: "student-account", name: "Student Account", category: "Current accounts",
      kind: "Student", key: "£0", unit: "interest-free OD",
      descriptor: "Interest-free overdraft while you study.",
      tags: "current student young uni university",
      bullets: ["Up to £2,000 interest-free overdraft", "No monthly fee", "Budgeting tools", "Free railcard offer"],
    },

    // ---------------- ISAs ----------------
    {
      id: "stocks-isa", name: "Stocks & Shares ISA", category: "ISAs",
      kind: "Investment", key: "From £25", unit: "per month",
      descriptor: "Invest tax-free with your ISA allowance.",
      tags: "isa stocks shares investment tax-free invest savings",
      bullets: ["Tax-free growth & income", "£20,000 annual allowance", "Ready-made or choose your own", "Capital at risk"],
    },
    {
      id: "lifetime-isa", name: "Lifetime ISA", category: "ISAs",
      kind: "LISA", key: "25%", unit: "govt bonus",
      descriptor: "Save for a first home or later life, with a bonus.",
      tags: "isa lifetime lisa home bonus first savings",
      bullets: ["25% government bonus on savings", "Save up to £4,000 a year", "For a first home or after 60", "Cash or stocks & shares"],
    },
    {
      id: "junior-isa", name: "Junior ISA", category: "ISAs",
      kind: "For kids", key: "4.00%", unit: "AER tax-free",
      descriptor: "Tax-free savings for a child's future.",
      tags: "isa junior jisa child kids family savings",
      bullets: ["Tax-free for under-18s", "£9,000 annual allowance", "Locked until they turn 18", "Cash or investment options"],
    },

    // ---------------- INVESTMENTS ----------------
    {
      id: "ready-made", name: "Ready-Made Investments", category: "Investments",
      kind: "Managed", key: "From £50", unit: "0.45% fee",
      descriptor: "Pick a risk level and we manage the rest.",
      tags: "investment invest managed portfolio fund ready",
      bullets: ["Five risk-rated portfolios", "Managed by experts", "Start from £50", "Capital at risk"],
    },
    {
      id: "gen-invest", name: "General Investment Account", category: "Investments",
      kind: "Flexible", key: "From £1", unit: "no limit",
      descriptor: "Invest beyond your ISA allowance, no upper limit.",
      tags: "investment invest general gia flexible",
      bullets: ["No contribution limit", "Thousands of funds & shares", "Sell any time", "Capital at risk, may be taxable"],
    },

    // ---------------- PENSIONS ----------------
    {
      id: "personal-pension", name: "Personal Pension", category: "Pensions",
      kind: "Retirement", key: "25%", unit: "tax relief*",
      descriptor: "Top up your retirement pot with tax relief.",
      tags: "pension retirement personal sipp tax relief",
      bullets: ["Government tops up contributions", "Ready-made retirement plans", "Consolidate old pensions", "Access from age 55"],
    },
    {
      id: "sipp", name: "Self-Invested Pension", category: "Pensions",
      kind: "SIPP", key: "From £80", unit: "per month",
      descriptor: "Take control of how your pension is invested.",
      tags: "pension sipp self invested retirement",
      bullets: ["Choose your own investments", "Tax relief on contributions", "Wide fund range", "Capital at risk"],
    },

    // ---------------- LOANS ----------------
    {
      id: "personal-loan", name: "Personal Loan", category: "Loans",
      kind: "Unsecured", key: "6.6%", unit: "APR representative",
      descriptor: "Borrow a lump sum with fixed monthly repayments.",
      tags: "loan personal borrow unsecured credit",
      bullets: ["Borrow £1,000–£35,000", "Fixed rate & repayments", "1–7 year terms", "Get a quote with no credit impact"],
    },
    {
      id: "car-loan", name: "Car Loan", category: "Loans",
      kind: "Vehicle", key: "6.9%", unit: "APR representative",
      descriptor: "Spread the cost of your next car.",
      tags: "loan car vehicle auto borrow",
      bullets: ["Borrow £5,000–£50,000", "Fixed monthly repayments", "Decision in minutes", "No early repayment fee"],
    },

    // ---------------- INSURANCE ----------------
    {
      id: "home-insurance", name: "Home Insurance", category: "Insurance",
      kind: "Buildings & contents", key: "From £12", unit: "per month",
      descriptor: "Cover for your building, your things, or both.",
      tags: "insurance home buildings contents cover",
      bullets: ["Buildings, contents or combined", "Accidental damage option", "24/7 emergency helpline", "Manage claims in-app"],
    },
    {
      id: "travel-insurance", name: "Travel Insurance", category: "Insurance",
      kind: "Single or annual", key: "From £8", unit: "per trip",
      descriptor: "Single-trip or annual cover for your travels.",
      tags: "insurance travel trip holiday cover",
      bullets: ["Medical & cancellation cover", "Single trip or annual multi-trip", "Add winter sports", "Worldwide options"],
    },

    // ---------------- LIFE ----------------
    {
      id: "life-cover", name: "Life Insurance", category: "Life",
      kind: "Protection", key: "From £6", unit: "per month",
      descriptor: "Leave a lump sum for the people who matter.",
      tags: "life insurance protection cover family death",
      bullets: ["Cover from £6 a month", "Fixed or decreasing term", "Optional critical illness cover", "Quick online application"],
    },

    // ---------------- FAMILY ----------------
    {
      id: "kids-saver", name: "Kids' Saver", category: "Family",
      kind: "For under-18s", key: "3.50%", unit: "AER variable",
      descriptor: "An easy-access account to save for your child.",
      tags: "family kids child saver savings junior",
      bullets: ["Open for any child under 18", "Easy access, no notice", "Pay in any time", "Watch it grow in-app"],
    },

    // ---------------- OVERDRAFTS ----------------
    {
      id: "arranged-od", name: "Arranged Overdraft", category: "Overdrafts",
      kind: "Short-term", key: "39.9%", unit: "EAR variable",
      descriptor: "An agreed safety net on your current account.",
      tags: "overdraft arranged current borrow short",
      bullets: ["Agree a limit up to £3,000", "Interest-free buffer on first £50", "No usage fees", "Subject to status"],
    },
  ];

  function searchText(p) {
    return (p.name + " " + p.category + " " + p.kind + " " + (p.tags || "")).toLowerCase();
  }

  // Token-prefix matcher: every whitespace-separated token in the query must be
  // found somewhere in the product's searchable text. Typing more words narrows.
  function matchProducts(query) {
    const q = (query || "").trim().toLowerCase();
    if (!q) return [];
    const tokens = q.split(/\s+/);
    return PRODUCTS.filter((p) => {
      const text = searchText(p);
      return tokens.every((t) => text.includes(t));
    });
  }

  // Build a human "you're seeing…" summary for a result set.
  function summarise(query, results) {
    if (!results.length) return null;
    const cats = [...new Set(results.map((r) => r.category))];
    if (cats.length === 1) {
      return cats[0].toLowerCase();
    }
    return null;
  }

  window.MERIDIAN = { CATEGORIES, PRODUCTS, matchProducts, summarise, searchText };
})();
