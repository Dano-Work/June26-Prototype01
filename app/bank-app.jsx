/* ================================================================
   app/bank-app.jsx
   BankingApp({ mode }) — "returning" | "new"
   No viewport scaler. Designed for fixed 390×844 DCArtboard.
   All components self-contained; exports BankingApp to window.
   ================================================================ */

const { useState, useMemo, useEffect, useRef } = React;

/* ---- helpers ---- */
function _highlight(name, query) {
  const tokens = (query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return name;
  const low = name.toLowerCase();
  for (const t of tokens) {
    const i = low.indexOf(t);
    if (i >= 0)
    return <>{name.slice(0, i)}<b style={{ color: "var(--color-primary)" }}>{name.slice(i, i + t.length)}</b>{name.slice(i + t.length)}</>;
  }
  return name;
}

/* ---- search box ---- */
function _SearchBox({ value, onChange, onSubmit, onFocus, onBlur, placeholder, autoFocus }) {
  const ref = useRef(null);
  const [foc, setFoc] = useState(false);
  useEffect(() => {if (autoFocus && ref.current) ref.current.focus();}, [autoFocus]);
  return (
    <div
      className={"searchbox" + (value ? " has-value" : "") + (foc ? " focus" : "")}
      onClick={() => ref.current && ref.current.focus()}>
      
      <Ico.Mag className="mag" />
      <input
        ref={ref} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => {setFoc(true);onFocus && onFocus(e);}}
        onBlur={(e) => {setFoc(false);onBlur && onBlur(e);}}
        onKeyDown={(e) => {if (e.key === "Enter") {e.preventDefault();onSubmit && onSubmit();}}} />
      
      {value ?
      <button className="clear" onMouseDown={(e) => {e.preventDefault();onChange("");}}>
            <Ico.X width="12" height="12" />
          </button> :
      null}
    </div>);

}

/* ---- autosuggest ---- */
function _AutoSuggest({ query, results, onPick, showOwned }) {
  if (!results.length) {
    return (
      <div className="suggest anim-in">
        <div className="empty">Nothing found for "{query}" — try "savings", "current" or "ISA".</div>
      </div>);

  }
  return (
    <div className="suggest anim-in">
      {results.map((p) => {
        const owned = showOwned && !!p.owned;
        return (
          <div key={p.id} className={"s-row" + (owned ? " owned" : "")}
          onMouseDown={(e) => {e.preventDefault();onPick(p);}}>
            <div className="s-main">
              <div className="s-name">
                {_highlight(p.name, query)}
                {owned ? <span className="owned-tag"><Ico.Tick width="11" height="11" />You have this</span> : null}
              </div>
              <div className="s-kind">{owned ? "Your account" : p.category + " · " + p.kind}</div>
              <div className="s-desc">{p.descriptor}</div>
            </div>
            <div className="s-key">
              <div className="v">{owned ? p.balance : p.key}</div>
              <div className="u">{owned ? "balance" : p.unit}</div>
            </div>
            <Ico.Chev className="chev" />
          </div>);

      })}
    </div>);

}

/* ---- result panel ---- */
function _Panel({ p, onOpen, showOwned }) {
  const owned = showOwned && !!p.owned;
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
    </button>);

}

/* ---- product sheet ---- */
function _ProductSheet({ product, open, onClose, onApply, onAskAgain, onGoTransactions, showOwned }) {
  const owned = showOwned && product && product.owned;
  return (
    <>
      <div className={"scrim" + (open ? " show" : "")} onClick={onClose} />
      <div className={"sheet" + (open ? " show" : "")} data-open="sheet">
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
              <div className="stat"><div className="v">{product.balance}</div><div className="l">balance</div></div>
              <div className="stat"><div className="v">{product.overdraft}</div><div className="l">overdraft limit</div></div>
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
                Rates are illustrative — this is a prototype.
              </p>
            </div>
            <div className="sheet-foot">
              <button className="apply" onClick={onApply}>Apply <Ico.ArrowR /></button>
            </div>
          </> :
        null}
      </div>
    </>);

}

/* ---- slide-out nav ---- */
function _NavMenu({ open, expanded, onToggleCat, onClose, onCategory, onProduct }) {
  const M = window.MERIDIAN;
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
            const prods = M.PRODUCTS.filter((p) => p.category === cat);
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
              </div>);

          })}
        </div>
      </div>
    </>);

}

/* ---- toast ---- */
function _Toast({ show, text }) {
  return (
    <div style={{
      position: "absolute", left: "50%", bottom: 24,
      transform: `translateX(-50%) translateY(${show ? 0 : 14}px)`,
      background: "var(--moss-900)", color: "var(--white)",
      padding: "10px 18px", borderRadius: "var(--radius-base)", zIndex: 60,
      fontSize: 13, fontWeight: 500, fontFamily: "var(--font-sans)",
      opacity: show ? 1 : 0, transition: "all 0.25s", pointerEvents: "none",
      display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap"
    }}>
      <Ico.Tick width="14" height="14" /> {text}
    </div>);

}

/* ---- transactions (returning only) ---- */
const _TRANSACTIONS = [
{ id: 1, name: "Salary — Acme Ltd", cat: "Income", amount: +3250.00, date: "Today", credit: true },
{ id: 2, name: "Tesco Express", cat: "Groceries", amount: -12.40, date: "Today", credit: false },
{ id: 3, name: "Ozone Coffee", cat: "Coffee", amount: -4.60, date: "Yesterday", credit: false },
{ id: 4, name: "Netflix", cat: "Subscription", amount: -15.99, date: "Yesterday", credit: false },
{ id: 5, name: "Woodland Trust", cat: "Charity", amount: -10.00, date: "Mon 2 Jun", credit: false },
{ id: 6, name: "National Rail", cat: "Transport", amount: -23.40, date: "Mon 2 Jun", credit: false },
{ id: 7, name: "Freelance — Fern Studio", cat: "Income", amount: +450.00, date: "Sat 31 May", credit: true },
{ id: 8, name: "Waitrose", cat: "Groceries", amount: -38.70, date: "Sat 31 May", credit: false },
{ id: 9, name: "Pret A Manger", cat: "Food", amount: -8.45, date: "Fri 30 May", credit: false },
{ id: 10, name: "Spotify", cat: "Subscription", amount: -11.99, date: "Fri 30 May", credit: false },
{ id: 11, name: "HMRC Tax Refund", cat: "Income", amount: +220.00, date: "Thu 29 May", credit: true },
{ id: 12, name: "Slow Cycle Repair", cat: "Transport", amount: -28.00, date: "Thu 29 May", credit: false }];


function _TransactionsScreen() {
  const [filter, setFilter] = useState("All");
  const filtered = _TRANSACTIONS.filter((tx) => {
    if (filter === "Income") return tx.credit;
    if (filter === "Payments") return !tx.credit;
    return true;
  });
  const totalIn = _TRANSACTIONS.filter((t) => t.credit).reduce((s, t) => s + t.amount, 0);
  const totalOut = _TRANSACTIONS.filter((t) => !t.credit).reduce((s, t) => s + Math.abs(t.amount), 0);
  const net = totalIn - totalOut;
  const fmt = (n) => "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2 });
  const groups = [];
  const seen = {};
  filtered.forEach((tx) => {
    if (!seen[tx.date]) {seen[tx.date] = true;groups.push({ date: tx.date, items: [] });}
    groups[groups.length - 1].items.push(tx);
  });
  return (
    <div className="txn-screen anim-in">
      <div className="txn-summary">
        {[{ l: "In", v: "+" + fmt(totalIn), credit: true },
        { l: "Out", v: "−" + fmt(totalOut), credit: false },
        { l: "Net", v: (net >= 0 ? "+" : "−") + fmt(net), credit: net >= 0 }].
        map((s, i) =>
        <div key={s.l} className={"txn-sum-cell" + (i > 0 ? " bordered" : "")}>
            <div className="txn-sum-label">{s.l}</div>
            <div className="txn-sum-val" style={{ color: s.credit ? "var(--color-accent)" : "var(--color-text-primary)" }}>{s.v}</div>
          </div>
        )}
      </div>
      <div className="txn-filters">
        {["All", "Income", "Payments"].map((f) =>
        <button key={f} onClick={() => setFilter(f)} style={{
          fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: filter === f ? 500 : 400,
          padding: "5px 14px", borderRadius: "var(--radius-base)", flexShrink: 0,
          background: filter === f ? "var(--color-primary)" : "var(--white)",
          color: filter === f ? "var(--white)" : "var(--color-text-secondary)",
          border: `0.5px solid ${filter === f ? "var(--color-primary)" : "var(--color-border-mid)"}`,
          cursor: "pointer", transition: "all 0.15s"
        }}>{f}</button>
        )}
      </div>
      <div className="txn-list">
        {groups.map((g) =>
        <div key={g.date}>
            <div className="txn-date-head">{g.date}</div>
            {g.items.map((tx) =>
          <div key={tx.id} className={"txn-row" + (tx.credit ? " credit" : "")}>
                <div className={"txn-icon" + (tx.credit ? " credit" : "")}>{tx.credit ? "+" : "−"}</div>
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
        <div style={{ height: 20 }} />
      </div>
    </div>);

}

/* ================================================================
   CONFIGS — per mode
   ================================================================ */
const MODES = {
  returning: {
    hi: "Good morning, John",
    ask: "What can we help with today?",
    placeholder: "Search savings, accounts, ISAs…",
    chips: ["Savings", "Current account", "ISA", "Loan", "Pension"],
    showOwned: true,
    canTransact: true
  },
  new: {
    hi: "Welcome",
    ask: "Find the right account for you",
    placeholder: "Search current accounts, savings, ISAs…",
    chips: ["Current account", "Savings", "Cash ISA", "Investments", "Pension"],
    showOwned: false,
    canTransact: false
  }
};

/* ================================================================
   BANKING APP
   ================================================================ */
function BankingApp({ mode = "returning" }) {
  const M = window.MERIDIAN;
  const cfg = MODES[mode] || MODES.returning;

  const [query, setQuery] = useState("");
  const [view, setView] = useState("home"); // home | results | transactions
  const [prevView, setPrevView] = useState("home");
  const [focused, setFocused] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);
  const [toast, setToast] = useState(null);
  const [reFocus, setReFocus] = useState(0);

  const results = useMemo(() => {
    const r = M.matchProducts(query);
    if (cfg.showOwned) return [...r].sort((a, b) => (b.owned ? 1 : 0) - (a.owned ? 1 : 0));
    return r; // new customer — all products, no owned sorting
  }, [query, cfg.showOwned]);

  const product = openId ? M.PRODUCTS.find((p) => p.id === openId) : null;
  const summary = view === "results" ? M.summarise(query, results) : null;
  const showSug = view === "home" && focused && query.trim().length > 0;
  const showBack = view !== "home";

  const showToast = (txt) => {setToast(txt);setTimeout(() => setToast(null), 2200);};
  const goResults = () => {if (query.trim()) {setView("results");setFocused(false);}};
  const openProduct = (p) => {setOpenId(p.id);setMenuOpen(false);setFocused(false);};
  const goHomeFocus = () => {setOpenId(null);setView("home");setReFocus((x) => x + 1);setFocused(true);};
  const onCategory = (cat) => {setQuery(cat.replace(" accounts", ""));setView("results");setMenuOpen(false);setFocused(false);};
  const goTransact = () => {if (!cfg.canTransact) return;setPrevView(view);setOpenId(null);setView("transactions");};
  const goBack = () => {
    if (view === "transactions") {setView(prevView);setOpenId("classic-account");} else
    {setView("home");setFocused(false);}
  };

  return (
    <div className="phone" style={{ position: "relative", flexShrink: 0 }}>
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
        <_TransactionsScreen /> :

        <div className="pad">
            {view === "home" ?
          <>
                <div className="greeting">
                  <div className="hi">{cfg.hi}</div>
                  <div className="ask">{cfg.ask}</div>
                </div>

                {/* new customer: small onboarding nudge */}
                {mode === "new" ?
            <div style={{
              margin: "14px 0 0",
              padding: "12px 14px",
              background: "var(--color-primary-subtle)",
              borderRadius: "var(--radius-base)",
              border: "0.5px solid var(--color-border-mid)",
              fontSize: 13,
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
              fontFamily: "var(--font-sans)",
              fontWeight: "var(--weight-light)"
            }}>
                    <span style={{ fontWeight: 500, color: "var(--moss-800)" }}>New to My Bank?</span>
                    {" "}Search for an account below, or browse by category from the menu.
                  </div> :
            null}

                <div className="searchwrap">
                  <_SearchBox
                value={query} onChange={setQuery} onSubmit={goResults}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={cfg.placeholder}
                autoFocus={reFocus > 0} key={reFocus} />
              
                  {showSug ?
              <_AutoSuggest query={query} results={results} onPick={openProduct} showOwned={cfg.showOwned} /> :
              null}
                </div>

                {focused && !query.trim() ?
            <div className="anim-in try-block">
                    <div className="try-label">Explore</div>
                    <div className="try-row">
                      {cfg.chips.map((c) =>
                <button key={c} className="try-chip" onClick={() => setQuery(c)}>{c}</button>
                )}
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
                <_SearchBox
              value={query} onChange={setQuery} onSubmit={goResults}
              placeholder="Refine your search…" />
            
                {results.length ?
            <div className="panel-list anim-in">
                    {results.map((p) =>
              <_Panel key={p.id} p={p} onOpen={openProduct} showOwned={cfg.showOwned} />
              )}
                  </div> :

            <div style={{
              textAlign: "center", color: "var(--color-text-muted)",
              marginTop: 48, fontFamily: "var(--font-serif)",
              fontStyle: "italic", fontSize: 18, lineHeight: 1.4
            }}>
                    Nothing found for "{query}".<br />
                    <span style={{ fontSize: 13, fontFamily: "var(--font-sans)", fontStyle: "normal" }}>
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
      <_ProductSheet
        product={product} open={!!product}
        onClose={() => setOpenId(null)}
        onApply={() => showToast("Application started")}
        onAskAgain={goHomeFocus}
        onGoTransactions={goTransact}
        showOwned={cfg.showOwned} />
      
      <_NavMenu
        open={menuOpen} expanded={expandedCat}
        onToggleCat={(c) => setExpandedCat((x) => x === c ? null : c)}
        onClose={() => setMenuOpen(false)}
        onCategory={onCategory}
        onProduct={openProduct} />
      
      <_Toast show={!!toast} text={toast || ""} />
    </div>);

}

// export for canvas
Object.assign(window, { BankingApp });