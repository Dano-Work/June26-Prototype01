/* Verdant & Still — Conversational Banking — interactive wireframe */
const { useState, useMemo, useEffect, useRef } = React;
const M = window.MERIDIAN;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "suggestDetail": "name-rate-desc",
  "panelStyle": "rows",
  "cardOpen": "sheet"
} /*EDITMODE-END*/;

function highlight(name, query) {
  const tokens = (query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return name;
  const low = name.toLowerCase();
  for (const t of tokens) {
    const i = low.indexOf(t);
    if (i >= 0) {
      return <>{name.slice(0, i)}<b>{name.slice(i, i + t.length)}</b>{name.slice(i + t.length)}</>;
    }
  }
  return name;
}

/* ---------- search box ---------- */
function SearchBox({ value, onChange, onSubmit, onFocus, onBlur, placeholder, autoFocus }) {
  const ref = useRef(null);
  const [foc, setFoc] = useState(false);
  useEffect(() => { if (autoFocus && ref.current) ref.current.focus(); }, [autoFocus]);
  return (
    <div
      className={"searchbox" + (value ? " has-value" : "") + (foc ? " focus" : "")}
      onClick={() => ref.current && ref.current.focus()}>
      <Ico.Mag className="mag" />
      <input
        ref={ref} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => { setFoc(true); onFocus && onFocus(e); }}
        onBlur={(e) => { setFoc(false); onBlur && onBlur(e); }}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onSubmit && onSubmit(); } }} />
      {value ?
        <button className="clear" onMouseDown={(e) => { e.preventDefault(); onChange(""); }}>
          <Ico.X width="12" height="12" />
        </button> :
        null}
    </div>
  );
}

/* ---------- autosuggest ---------- */
function AutoSuggest({ query, results, detail, onPick }) {
  if (!results.length) {
    return (
      <div className="suggest anim-in">
        <div className="empty">Nothing found for "{query}" — try "savings", "current" or "ISA".</div>
      </div>
    );
  }
  const Row = (p) =>
    <div key={p.id} className={"s-row" + (p.owned ? " owned" : "")} onMouseDown={(e) => { e.preventDefault(); onPick(p); }}>
      <div className="s-main">
        <div className="s-name">
          {highlight(p.name, query)}
          {p.owned ? <span className="owned-tag"><Ico.Tick width="11" height="11" />You have this</span> : null}
        </div>
        <div className="s-kind">{p.owned ? "Your account" : p.category + " · " + p.kind}</div>
        {detail === "name-rate-desc" ? <div className="s-desc">{p.descriptor}</div> : null}
      </div>
      <div className="s-key">
        <div className="v">{p.owned ? p.balance : p.key}</div>
        <div className="u">{p.owned ? "balance" : p.unit}</div>
      </div>
      <Ico.Chev className="chev" />
    </div>;

  if (detail === "grouped") {
    const groups = {};
    results.forEach((p) => { (groups[p.category] = groups[p.category] || []).push(p); });
    return (
      <div className="suggest anim-in">
        {Object.keys(groups).map((cat) =>
          <div key={cat}>
            <div className="grouphead">{cat}</div>
            {groups[cat].map(Row)}
          </div>
        )}
      </div>
    );
  }
  return <div className="suggest anim-in">{results.map(Row)}</div>;
}

/* ---------- result panel ---------- */
function Panel({ p, onOpen }) {
  const owned = !!p.owned;
  return (
    <button className={"panel" + (owned ? " owned" : "")} onClick={() => onOpen(p)}>
      <div className="p-main">
        <div className="p-name">
          {p.name}
          {owned ? <span className="owned-tag"><Ico.Tick width="12" height="12" />Your account</span> : null}
        </div>
        <div className="p-kind">{p.kind}</div>
        <div className="p-desc">{p.descriptor}</div>
        <span className="p-more">{owned ? "Open account" : "Learn more"} <Ico.Chev width="14" height="14" /></span>
      </div>
      <div className="p-key">
        <div className="v">{owned ? p.balance : p.key}</div>
        <div className="u">{owned ? "balance" : p.unit}</div>
      </div>
    </button>
  );
}

/* ---------- product sheet ---------- */
function ProductSheet({ product, open, mode, isNewCustomer, onClose, onApply, onAskAgain, onGoTransactions }) {
  const owned = product && product.owned;
  return (
    <>
      <div className={"scrim" + (open ? " show" : "")} onClick={onClose} />
      <div className={"sheet" + (open ? " show" : "")} data-open={mode}>
        <div className="grab" />
        <div className="sheet-head">
          <div style={{ flex: 1 }}>
            <div className="prod-eyebrow">{product ? product.category : ""}</div>
            <h2 className="prod-title">{product ? product.name : ""}</h2>
          </div>
          <button className="x" onClick={onClose}><Ico.X /></button>
        </div>

        {product && owned ?
          <div className="sheet-body">
            <div className="acct-stats">
              <div className="stat">
                <div className="v">{product.balance}</div>
                <div className="l">balance</div>
              </div>
              <div className="stat">
                <div className="v">{product.overdraft}</div>
                <div className="l">overdraft limit</div>
              </div>
            </div>
            <div className="acct-actions">
              <div className="acct-action" onClick={onGoTransactions} style={{ cursor: "pointer" }}>
                Transactions <Ico.Chev />
              </div>
              <div className="acct-action">Manage cards <Ico.Chev /></div>
              <div className="acct-action">Payments &amp; transfers <Ico.Chev /></div>
            </div>
            <div className="acct-prompt">What do you need?</div>
            <div onClick={onAskAgain} style={{ cursor: "pointer" }}>
              <div className="searchbox">
                <Ico.Mag className="mag" />
                <span style={{ color: "var(--color-text-muted)", fontSize: 16 }}>Search your money…</span>
              </div>
            </div>
          </div> :
          product ?
            <>
              <div className="sheet-body">
                <div className="prod-headline">
                  <span className="v">{product.key}</span>
                  <span className="u">{product.unit}</span>
                </div>
                <p className="prod-desc">{product.descriptor}</p>
                <hr className="sheet-rule" />
                <ul className="bullets">
                  {product.bullets.map((b, i) =>
                    <li key={i}><Ico.Tick className="tick" /><span>{b}</span></li>
                  )}
                </ul>
                <p className="fineprint">
                  Rates are illustrative — this is a prototype. "Apply" doesn't submit anything.
                </p>
              </div>
              <div className="sheet-foot">
                <button className="apply" onClick={onApply}>
                  {isNewCustomer ? "Open account" : "Apply"} <Ico.ArrowR />
                </button>
              </div>
            </> :
          null}
      </div>
    </>
  );
}

/* ---------- slide-out nav menu ---------- */
function NavMenu({ open, expanded, onToggleCat, onClose, onCategory, onProduct, products }) {
  return (
    <>
      <div className={"scrim" + (open ? " show" : "")} onClick={onClose} style={{ zIndex: 49 }} />
      <div className={"menu" + (open ? " show" : "")}>
        <div className="menu-head">
          <span className="t">Products</span>
          <button className="x" onClick={onClose}><Ico.X /></button>
        </div>
        <div className="menu-list">
          {M.CATEGORIES.map((cat) => {
            const prods = products.filter((p) => p.category === cat);
            const isOpen = expanded === cat;
            return (
              <div key={cat} className={"m-cat" + (isOpen ? " open" : "")}>
                <div className="m-cat-row">
                  <span className="lbl" onClick={() => onCategory(cat)}>{cat}</span>
                  <span className="plus" onClick={() => onToggleCat(cat)}><Ico.Plus /></span>
                </div>
                <div className="m-sub">
                  {prods.map((p) =>
                    <div key={p.id} className="m-sub-row" onClick={() => onProduct(p)}>
                      <span className="sn">{p.name}</span>
                      <span className="sk">{p.key}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------- toast ---------- */
function Toast({ show, text }) {
  return (
    <div style={{
      position: "absolute", left: "50%", bottom: 28,
      transform: `translateX(-50%) translateY(${show ? 0 : 16}px)`,
      background: "var(--moss-900)", color: "var(--white)",
      padding: "11px 20px", borderRadius: "var(--radius-base)", zIndex: 60,
      fontSize: 14, fontWeight: 500, fontFamily: "var(--font-sans)",
      opacity: show ? 1 : 0, transition: "all 0.28s", pointerEvents: "none",
      display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
      letterSpacing: "0.02em"
    }}>
      <Ico.Tick width="15" height="15" /> {text}
    </div>
  );
}

/* ============================================================
   TRANSACTIONS SCREEN
   ============================================================ */
const TRANSACTIONS = [
  { id: 1,  name: "Salary — Acme Ltd",        cat: "Income",       amount: +3250.00, date: "Today",        credit: true  },
  { id: 2,  name: "Tesco Express",             cat: "Groceries",    amount: -12.40,   date: "Today",        credit: false },
  { id: 3,  name: "Ozone Coffee",              cat: "Coffee",       amount: -4.60,    date: "Yesterday",    credit: false },
  { id: 4,  name: "Netflix",                   cat: "Subscription", amount: -15.99,   date: "Yesterday",    credit: false },
  { id: 5,  name: "Woodland Trust",            cat: "Charity",      amount: -10.00,   date: "Mon 2 Jun",    credit: false },
  { id: 6,  name: "National Rail",             cat: "Transport",    amount: -23.40,   date: "Mon 2 Jun",    credit: false },
  { id: 7,  name: "Freelance — Fern Studio",   cat: "Income",       amount: +450.00,  date: "Sat 31 May",   credit: true  },
  { id: 8,  name: "Waitrose",                  cat: "Groceries",    amount: -38.70,   date: "Sat 31 May",   credit: false },
  { id: 9,  name: "Pret A Manger",             cat: "Food",         amount: -8.45,    date: "Fri 30 May",   credit: false },
  { id: 10, name: "Spotify",                   cat: "Subscription", amount: -11.99,   date: "Fri 30 May",   credit: false },
  { id: 11, name: "HMRC Tax Refund",           cat: "Income",       amount: +220.00,  date: "Thu 29 May",   credit: true  },
  { id: 12, name: "Slow Cycle Repair",         cat: "Transport",    amount: -28.00,   date: "Thu 29 May",   credit: false },
  { id: 13, name: "E.ON Next — Energy",        cat: "Bills",        amount: -94.00,   date: "Wed 28 May",   credit: false },
  { id: 14, name: "Thames Water",              cat: "Bills",        amount: -42.00,   date: "Wed 28 May",   credit: false },
  { id: 15, name: "Amazon",                    cat: "Shopping",     amount: -29.99,   date: "Tue 27 May",   credit: false },
];

const TX_FILTERS = ["All", "Income", "Payments"];

function TxFilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: active ? 500 : 400,
      padding: "5px 14px", borderRadius: "var(--radius-base)",
      background: active ? "var(--color-primary)" : "var(--white)",
      color: active ? "var(--white)" : "var(--color-text-secondary)",
      border: `0.5px solid ${active ? "var(--color-primary)" : "var(--color-border-mid)"}`,
      cursor: "pointer", transition: "all 0.15s", flexShrink: 0
    }}>{label}</button>
  );
}

function TransactionsScreen() {
  const [filter, setFilter] = useState("All");

  const filtered = TRANSACTIONS.filter((tx) => {
    if (filter === "Income") return tx.credit;
    if (filter === "Payments") return !tx.credit;
    return true;
  });

  const totalIn  = TRANSACTIONS.filter((t) => t.credit).reduce((s, t) => s + t.amount, 0);
  const totalOut = TRANSACTIONS.filter((t) => !t.credit).reduce((s, t) => s + Math.abs(t.amount), 0);
  const net = totalIn - totalOut;

  const fmt = (n) => "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const groups = [];
  const seen = {};
  filtered.forEach((tx) => {
    if (!seen[tx.date]) { seen[tx.date] = true; groups.push({ date: tx.date, items: [] }); }
    groups[groups.length - 1].items.push(tx);
  });

  return (
    <div className="txn-screen anim-in">
      <div className="txn-summary">
        {[
          { l: "In",  v: "+" + fmt(totalIn),  credit: true  },
          { l: "Out", v: "−" + fmt(totalOut), credit: false },
          { l: "Net", v: (net >= 0 ? "+" : "−") + fmt(net), credit: net >= 0 },
        ].map((s, i) =>
          <div key={s.l} className={"txn-sum-cell" + (i > 0 ? " bordered" : "")}>
            <div className="txn-sum-label">{s.l}</div>
            <div className="txn-sum-val" style={{ color: s.credit ? "var(--color-accent)" : "var(--color-text-primary)" }}>{s.v}</div>
          </div>
        )}
      </div>

      <div className="txn-filters">
        {TX_FILTERS.map((f) =>
          <TxFilterPill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        )}
      </div>

      <div className="txn-list">
        {groups.map((g) =>
          <div key={g.date}>
            <div className="txn-date-head">{g.date}</div>
            {g.items.map((tx) =>
              <div key={tx.id} className={"txn-row" + (tx.credit ? " credit" : "")}>
                <div className={"txn-icon" + (tx.credit ? " credit" : "")}>
                  {tx.credit ? "+" : "−"}
                </div>
                <div className="txn-main">
                  <div className="txn-name">{tx.name}</div>
                  <div className="txn-cat">{tx.cat}</div>
                </div>
                <div className={"txn-amount" + (tx.credit ? " credit" : "")}>
                  {tx.credit ? "+" : "−"}{fmt(tx.amount)}
                </div>
              </div>
            )}
          </div>
        )}
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

/* ================= APP ================= */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // customerMode is never persisted — always starts as "new" on page load/refresh
  const [customerMode, setCustomerMode] = useState("new"); // "new" | "existing"
  const isNewCustomer = customerMode === "new";

  const [query,       setQuery]       = useState("");
  const [view,        setView]        = useState("home"); // home | results | transactions
  const [prevView,    setPrevView]    = useState("home");
  const [focused,     setFocused]     = useState(false);
  const [openId,      setOpenId]      = useState(null);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);
  const [toast,       setToast]       = useState(null);
  const [scale,       setScale]       = useState(1);
  const [reFocus,     setReFocus]     = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // Products with ownership stripped in new-customer mode
  const effectiveProducts = useMemo(() =>
    M.PRODUCTS.map((p) =>
      isNewCustomer
        ? { ...p, owned: false, balance: undefined, overdraft: undefined }
        : p
    ),
    [isNewCustomer]
  );

  const results = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return [];
    const tokens = q.split(/\s+/);
    const matched = effectiveProducts.filter((p) => {
      const text = M.searchText(p);
      return tokens.every((tok) => text.includes(tok));
    });
    return [...matched].sort((a, b) => (b.owned ? 1 : 0) - (a.owned ? 1 : 0));
  }, [query, effectiveProducts]);

  const product = openId ? effectiveProducts.find((p) => p.id === openId) : null;

  // Scale phone to fit viewport
  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth  || 390;
      const vh = window.innerHeight || 844;
      let s = Math.min((vw - 48) / 390, (vh - 80) / 844, 1.06);
      if (!isFinite(s) || s < 0.3) s = 1;
      setScale(s);
    };
    fit();
    requestAnimationFrame(fit);
    const tid = setTimeout(fit, 250);
    window.addEventListener("resize", fit);
    return () => { window.removeEventListener("resize", fit); clearTimeout(tid); };
  }, []);

  const showToast = (txt) => {
    setToast(txt);
    setTimeout(() => setToast(null), 2600);
  };

  const goResults     = () => { if (query.trim()) { setView("results"); setFocused(false); } };
  const openProduct   = (p) => { setOpenId(p.id); setMenuOpen(false); setFocused(false); };
  const goHomeFocus   = () => { setOpenId(null); setView("home"); setReFocus((x) => x + 1); setFocused(true); };
  const onCategory    = (cat) => { setQuery(cat.replace(" accounts", "")); setView("results"); setMenuOpen(false); setFocused(false); };
  const goTransactions = () => { setPrevView(view); setOpenId(null); setView("transactions"); };

  const goBack = () => {
    if (view === "transactions") {
      setView(prevView);
      setOpenId("classic-account");
    } else {
      setView("home");
      setFocused(false);
    }
  };

  // Apply / Open account
  // New customer: close sheet, show welcome toast, then reveal existing-customer home
  const handleApply = () => {
    if (isNewCustomer) {
      const productName = product ? product.name : "Account";
      setOpenId(null);
      setTransitioning(true);
      showToast(`${productName} opened — welcome, John!`);
      // Switch to existing customer shortly before toast fades, so greeting updates while toast is still visible
      setTimeout(() => {
        setCustomerMode("existing");
        setView("home");
        setQuery("");
        setTransitioning(false);
      }, 1800);
    } else {
      showToast("Application started");
    }
  };

  const summary     = view === "results" ? M.summarise(query, results) : null;
  const showSuggest = view === "home" && focused && query.trim().length > 0;
  const showBack    = view !== "home";

  const captions = {
    home: isNewCustomer
      ? "New customer — search or browse to find an account, then tap Open account"
      : 'Existing customer (John) — try "savings", "current account", "ISA"',
    results:      "Tap any panel to open the product card",
    transactions: "Classic Account · Transactions — tap Back to return",
  };

  return (
    <>
      <div id="stage">
        <div id="phone-scaler" style={{ transform: `scale(${scale})` }}>
          <div className="phone">

            {/* status bar */}
            <div className="statusbar">
              <span>9:41</span>
              <span className="dots"><span /><span /><span /></span>
            </div>

            {/* top bar */}
            <div className="topbar">
              <button className={"back" + (showBack ? " show" : "")} onClick={goBack} aria-label="Back">
                <Ico.Back />
              </button>
              <BrandMark />
              <button className="burger" onClick={() => setMenuOpen(true)} aria-label="Menu">
                <span /><span /><span />
              </button>
            </div>

            {/* screen */}
            <div className="screen">
              {view === "transactions" ?
                <TransactionsScreen /> :

                <div className="pad">
                  {view === "home" ?
                    <>
                      <div className="greeting">
                        {isNewCustomer ? (
                          <>
                            <div className="hi">Welcome to Meridian</div>
                            <div className="ask">Find the right account for you.</div>
                          </>
                        ) : (
                          <>
                            <div className="hi">Good morning, John</div>
                            <div className="ask">What can we help with today?</div>
                          </>
                        )}
                      </div>

                      <div className="searchwrap">
                        <SearchBox
                          value={query} onChange={setQuery} onSubmit={goResults}
                          onFocus={() => setFocused(true)}
                          onBlur={() => setFocused(false)}
                          placeholder="Search savings, accounts, ISAs…"
                          autoFocus={reFocus > 0} key={reFocus} />
                        {showSuggest ?
                          <AutoSuggest query={query} results={results} detail={t.suggestDetail} onPick={openProduct} /> :
                          null}
                      </div>

                      {focused && !query.trim() ?
                        <div className="anim-in try-block">
                          <div className="try-label">Explore</div>
                          <div className="try-row">
                            <button className="try-chip" onClick={() => setQuery("Savings")}>Savings</button>
                            <button className="try-chip" onClick={() => setQuery("Current account")}>Current account</button>
                            <button className="try-chip" onClick={() => setQuery("ISA")}>ISA</button>
                            <button className="try-chip" onClick={() => setQuery("Loan")}>Loan</button>
                            <button className="try-chip" onClick={() => setQuery("Pension")}>Pension</button>
                          </div>
                        </div> :
                        null}
                    </> :

                    <>
                      <p className="results-intro">
                        {summary ?
                          <>All our <b>{summary}</b> — or refine below.</> :
                          <>Results for <b>{query}</b>.</>}
                      </p>
                      <SearchBox
                        value={query} onChange={setQuery} onSubmit={goResults}
                        placeholder="Refine your search…" />
                      {results.length ?
                        <div className="panel-list anim-in" data-style={t.panelStyle}>
                          {results.map((p) => <Panel key={p.id} p={p} onOpen={openProduct} />)}
                        </div> :
                        <div style={{
                          textAlign: "center", color: "var(--color-text-muted)",
                          marginTop: 48, fontFamily: "var(--font-serif)",
                          fontStyle: "italic", fontSize: 20, lineHeight: 1.4
                        }}>
                          Nothing found for "{query}".<br />
                          <span style={{ fontSize: 14, fontFamily: "var(--font-sans)", fontStyle: "normal" }}>
                            Try "savings", "current" or "ISA".
                          </span>
                        </div>
                      }
                    </>
                  }
                </div>
              }
            </div>

            {/* overlays */}
            <ProductSheet
              product={product} open={!!product} mode={t.cardOpen}
              isNewCustomer={isNewCustomer}
              onClose={() => setOpenId(null)}
              onApply={handleApply}
              onAskAgain={goHomeFocus}
              onGoTransactions={goTransactions} />

            <NavMenu
              open={menuOpen} expanded={expandedCat}
              onToggleCat={(c) => setExpandedCat((x) => x === c ? null : c)}
              onClose={() => setMenuOpen(false)}
              onCategory={onCategory}
              onProduct={openProduct}
              products={effectiveProducts} />

            <Toast show={!!toast} text={toast || ""} />
          </div>
        </div>
      </div>

      <div className="stage-caption">{captions[view] || ""}</div>

      <TweaksPanel>
        <TweakSection label="Auto-suggest" />
        <TweakRadio
          label="Row detail" value={t.suggestDetail}
          options={[
            { value: "name-rate",     label: "Name + rate"   },
            { value: "name-rate-desc", label: "+ description" },
            { value: "grouped",       label: "By category"   },
          ]}
          onChange={(v) => setTweak("suggestDetail", v)} />

        <TweakSection label="Results" />
        <TweakRadio
          label="Panel style" value={t.panelStyle}
          options={[
            { value: "rows",  label: "Compact rows" },
            { value: "cards", label: "Cards"        },
          ]}
          onChange={(v) => setTweak("panelStyle", v)} />

        <TweakSection label="Product card" />
        <TweakRadio
          label="Opens as" value={t.cardOpen}
          options={[
            { value: "sheet", label: "Bottom sheet" },
            { value: "full",  label: "Full screen"  },
          ]}
          onChange={(v) => setTweak("cardOpen", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
