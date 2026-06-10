/* global React */
// Banking conversational-search wireframes.
// Reworked to follow the user's hand sketches: personalized greeting,
// attached autosuggest dropdown, conversational result headers,
// blended existing+new search, vertical stack vs carousel results,
// slide-up Apply sheet, existing-account management view, + nav.
// All screen components exported to window for the canvas script.

const { useState } = React;

/* ---------------- frame + primitives ---------------- */

function Phone({ children }) {
  return (
    <div className="wf-phone">
      <div className="wf-statusbar">
        <span>9:41</span>
        <span className="dots"><i></i><i></i><i></i></span>
      </div>
      <div className="wf-screen">{children}</div>
    </div>
  );
}

function Burger({ onClick }) {
  return <button className="wf-burger sk" onClick={onClick}><i></i><i></i><i></i></button>;
}

/* landing header: centered mark + burger top-right */
function BrandRow() {
  return (
    <div className="row between px" style={{ paddingTop: 10 }}>
      <span style={{ width: 30 }} />
      <div className="wf-mark-c" />
      <Burger />
    </div>
  );
}

/* compact top bar for inner screens: small mark left, burger right */
function TopBar() {
  return (
    <div className="wf-topbar">
      <div className="wf-logo"><span className="mark" /><span className="name">Northbank</span></div>
      <Burger />
    </div>
  );
}

function SearchBar({ value, placeholder = "Search products & accounts", caret, big, attached }) {
  return (
    <div className={"wf-search sk" + (big ? " lg" : "")} style={attached ? { marginBottom: 0 } : null}>
      <span className="ic" />
      <span className="txt">{value ? <b>{value}</b> : placeholder}{caret && <span className="caret" />}</span>
      {value ? <span className="clear">×</span> : null}
    </div>
  );
}

function Bar({ w = 80, dk, tall, style }) {
  return <div className={"bar" + (dk ? " dk" : "") + (tall ? " tall" : "")} style={{ width: w + "%", ...style }} />;
}
function Note({ children, r, plain }) {
  return <div className={"wf-note" + (r ? " r" : "") + (plain ? " plain" : "")}>{children}</div>;
}
function Rate({ value, label = "AER", accent }) {
  return <div className={"wf-rate" + (accent ? " accent" : "")}>{value}<small>{label}</small></div>;
}
function Hi({ text, q }) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

/* suggestion row inside attached dropdown */
function SRow({ name, q, sub, rate, tag }) {
  return (
    <div className="wf-srow">
      <div className="body">
        <div className="name"><Hi text={name} q={q} /></div>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {tag && <span className="wf-tag">{tag}</span>}
      {rate && <Rate value={rate} accent />}
    </div>
  );
}

/* ---------------- data ---------------- */
const SAVINGS = [
  { name: "Savings — Easy Access", rate: "3.10%", sub: "Instant access · variable" },
  { name: "Savings — Fixed Rate", rate: "4.45%", sub: "1 year · fixed" },
  { name: "Savings — Tax-free ISA", rate: "4.05%", sub: "Cash ISA · tax-free" },
  { name: "Savings — Term Bond", rate: "4.30%", sub: "2 years · fixed" },
  { name: "Savings — Investment", rate: "—", sub: "Stocks & shares" },
];
const ISAS = [
  { name: "ISA — Easy Access", rate: "4.05%", sub: "Tax-free · variable" },
  { name: "ISA — Fixed 1yr", rate: "4.50%", sub: "Tax-free · fixed" },
  { name: "ISA — Fixed 2yr", rate: "4.35%", sub: "Tax-free · fixed" },
  { name: "ISA — Stocks & Shares", rate: "—", sub: "Investment ISA" },
];

/* ============================================================
   1 · LANDING — the front door (2 variants)
   ============================================================ */

function LandingMinimal() {
  return (
    <Phone>
      <BrandRow />
      <div className="px" style={{ marginTop: 40 }}>
        <div className="wf-greet">Hi <b>John</b></div>
        <div className="wf-greet-sub">What do you need today?</div>
      </div>
      <div style={{ marginTop: 18 }}><SearchBar big caret placeholder="Search products & accounts" /></div>
      <div className="px" style={{ marginTop: 16 }}>
        <Note plain>Type a word — results appear as you go</Note>
      </div>
      <div className="grow" />
      <div className="px" style={{ paddingBottom: 18 }}><Note>Search is the whole home screen</Note></div>
    </Phone>
  );
}

function LandingQuick() {
  return (
    <Phone>
      <BrandRow />
      <div className="px" style={{ marginTop: 30 }}>
        <div className="wf-greet">Hi <b>John</b></div>
        <div className="wf-greet-sub">What do you need today?</div>
      </div>
      <div style={{ marginTop: 16 }}><SearchBar big caret /></div>
      <div className="px" style={{ marginTop: 22 }}>
        <div className="wf-eyebrow">Try</div>
        <div className="wf-chips mt-2">
          {["Savings", "ISA", "Current", "Mortgage", "Loans"].map((c) => <span className="wf-chip sk" key={c}>{c}</span>)}
        </div>
        <div className="wf-eyebrow" style={{ marginTop: 20 }}>Recent</div>
        <div className="wf-chips mt-2">
          {["Easy access", "Classic a/c"].map((c) => <span className="wf-chip sk" key={c}>{c}</span>)}
        </div>
        <div style={{ marginTop: 18 }}><Note>Quick prompts seed the empty box</Note></div>
      </div>
      <div className="grow" />
    </Phone>
  );
}

/* ============================================================
   2 · AUTO-SUGGEST — attached dropdown, filters as you type (3)
   ============================================================ */

function SuggestSavings() {
  return (
    <Phone>
      <BrandRow />
      <div className="px" style={{ marginTop: 22 }}>
        <div className="wf-greet" style={{ fontSize: 20 }}>Hi <b>John</b></div>
        <div className="wf-greet-sub">What do you need today?</div>
      </div>
      <div style={{ marginTop: 14 }}><SearchBar value="Sav" caret attached /></div>
      <div className="wf-suggest sk">
        <div className="wf-scrolltrack" />
        {SAVINGS.map((s) => <SRow key={s.name} name={s.name} q="Sav" rate={s.rate !== "—" ? s.rate : null} sub={s.sub} />)}
      </div>
      <div className="px" style={{ marginTop: 12 }}><Note>“Sav” → every savings product, with its rate</Note></div>
      <div className="grow" />
    </Phone>
  );
}

function SuggestISA() {
  return (
    <Phone>
      <BrandRow />
      <div className="px" style={{ marginTop: 22 }}>
        <div className="wf-greet" style={{ fontSize: 20 }}>Hi <b>John</b></div>
        <div className="wf-greet-sub">What do you need today?</div>
      </div>
      <div style={{ marginTop: 14 }}><SearchBar value="Savings ISA" caret attached /></div>
      <div className="wf-suggest sk">
        <div className="wf-scrolltrack" />
        {ISAS.map((s) => <SRow key={s.name} name={s.name} q="ISA" rate={s.rate !== "—" ? s.rate : null} sub={s.sub} />)}
      </div>
      <div className="px" style={{ marginTop: 12 }}><Note plain>More letters → narrows to ISAs only (incl. investments)</Note></div>
      <div className="grow" />
    </Phone>
  );
}

function SuggestBlended() {
  return (
    <Phone>
      <BrandRow />
      <div className="px" style={{ marginTop: 22 }}>
        <div className="wf-greet" style={{ fontSize: 20 }}>Hi <b>John</b></div>
        <div className="wf-greet-sub">What do you need today?</div>
      </div>
      <div style={{ marginTop: 14 }}><SearchBar value="Curre" caret attached /></div>
      <div className="wf-suggest sk">
        <div className="wf-scrolltrack" />
        <SRow name="Current account" q="Curre" sub="Your account · ••• 4421" tag="Yours" />
        <SRow name="Current account — Classic" q="Curre" sub="New · no monthly fee" />
        <SRow name="Current account — Joint" q="Curre" sub="New · for two people" />
        <SRow name="Current account — Rewards" q="Curre" sub="New · cashback" />
      </div>
      <div className="px" style={{ marginTop: 12 }}><Note>Blends YOUR accounts with new products</Note></div>
      <div className="grow" />
    </Phone>
  );
}

/* ============================================================
   3 · RESULTS — tap return → panels (2 treatments)
   ============================================================ */

function ConvoHeader({ q = "easy-access savings" }) {
  return (
    <div className="px" style={{ padding: "14px 16px 10px" }}>
      <div className="wf-convo">You’re seeing all our <span className="q">{q}</span>.<br />Would you like to see something else?</div>
    </div>
  );
}

function ResultsStack() {
  const items = [
    { n: "Easy Saver", r: "up to 1.00%", d: "Instant access · variable" },
    { n: "Cash ISA Saver", r: "up to 1.00%", d: "Tax-free · easy access" },
    { n: "Fixed Saver — 1yr", r: "up to 4.45%", d: "Fixed term · higher rate" },
    { n: "Regular Saver", r: "up to 5.00%", d: "Save monthly" },
  ];
  return (
    <Phone>
      <TopBar />
      <ConvoHeader />
      <div style={{ marginBottom: 4 }}><SearchBar value="" placeholder="Refine — try another product" /></div>
      <div className="wf-scroll col gap-2" style={{ padding: "10px 16px 16px" }}>
        {items.map((s, i) => (
          <div className="wf-panel sk" key={s.n}>
            <div className="top">
              <div className="col gap-2">
                <div style={{ fontSize: 15, fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: "var(--wf-muted)" }}>{s.d}</div>
              </div>
              <div className="wf-rate accent">{s.r}<small>AER</small></div>
            </div>
            <div className="row" style={{ gap: 6, color: "var(--wf-accent)", fontSize: 12, fontWeight: 600 }}>Find out more ›</div>
            {i === 0 && <div style={{ alignSelf: "flex-end" }}><Note r plain>tap to expand</Note></div>}
          </div>
        ))}
      </div>
    </Phone>
  );
}

function ResultsCarousel() {
  return (
    <Phone>
      <TopBar />
      <ConvoHeader />
      <div style={{ marginBottom: 10 }}><SearchBar value="" placeholder="Refine — try another product" /></div>
      <div className="wf-carousel">
        <div className="wf-card sk">
          <div className="row between"><div style={{ fontSize: 15, fontWeight: 700 }}>Cash ISA</div><div className="wf-rate accent" style={{ fontSize: 15 }}>1.00%<small>AER</small></div></div>
          <div className="wf-img sk-2" style={{ height: 56 }} />
          <Bar w={90} /><Bar w={70} />
          <div className="wf-metarow" style={{ marginTop: 2 }}>
            <span className="m">Access<b>Easy</b></span><span className="m">Tax<b>Free</b></span>
          </div>
          <div className="wf-btn sm sk" style={{ marginTop: 4 }}>Find out more</div>
        </div>
        <div className="wf-card sk">
          <div className="row between"><div style={{ fontSize: 15, fontWeight: 700 }}>Easy Saver</div><div className="wf-rate accent" style={{ fontSize: 15 }}>1.00%<small>AER</small></div></div>
          <div className="wf-img sk-2" style={{ height: 56 }} />
          <Bar w={85} /><Bar w={60} />
        </div>
        <div className="wf-card peek sk" />
      </div>
      <div className="wf-dots"><i className="on" /><i /><i /></div>
      <div className="px"><Note>Swipe through cards instead of a long list</Note></div>
      <div className="grow" />
    </Phone>
  );
}

/* ============================================================
   4 · PRODUCT CARD — Apply in a slide-up sheet (2)
   ============================================================ */

function SheetBase({ children, height = "78%" }) {
  return (
    <Phone>
      <TopBar />
      <ConvoHeader />
      <div className="wf-scroll col gap-2" style={{ padding: "10px 16px 16px", opacity: 0.5 }}>
        {["Easy Saver", "Cash ISA Saver", "Fixed Saver"].map((n) => (
          <div className="wf-panel sk" key={n}><div className="top"><div style={{ fontSize: 15, fontWeight: 700 }}>{n}</div><Rate value="1.00%" accent /></div></div>
        ))}
      </div>
      <div className="wf-scrim" />
      <div className="wf-sheet" style={{ height }}>{children}</div>
    </Phone>
  );
}

function CardSheet() {
  return (
    <SheetBase height="74%">
      <div className="handle" />
      <div className="pad grow">
        <div className="row between">
          <div style={{ fontSize: 20, fontWeight: 700 }}>Easy Saver</div>
          <span style={{ fontSize: 18, color: "var(--wf-muted)" }}>×</span>
        </div>
        <div className="wf-rate accent" style={{ fontSize: 30 }}>up to 1.00%<small>AER · variable</small></div>
        <div className="wf-convo" style={{ fontSize: 13, color: "var(--wf-muted)" }}>Variable interest, ideal for short-term saving.</div>
        <hr style={{ border: 0, borderTop: "1.5px solid var(--wf-fill)", margin: "2px 0" }} />
        <div className="wf-facts">
          <div className="f"><span>Access</span><span>Instant</span></div>
          <div className="f"><span>Minimum deposit</span><span>£1</span></div>
          <div className="f"><span>Interest paid</span><span>Monthly</span></div>
        </div>
        <Note>Apply CTA lives in the more-info slider</Note>
      </div>
      <div className="foot col gap-2">
        <div className="wf-btn sk">Apply ➔</div>
      </div>
    </SheetBase>
  );
}

function CardDirect() {
  const [tab, setTab] = useState("Overview");
  return (
    <Phone>
      {/* came straight from a suggestion tap — no list behind */}
      <TopBar />
      <div className="px" style={{ padding: "12px 16px 8px", fontSize: 12, color: "var(--wf-muted)" }}>‹ Back to “Savings ISA”</div>
      <div className="wf-scroll" style={{ opacity: 0.25 }}><div className="px"><Bar w={70} dk tall /></div></div>
      <div className="wf-scrim" />
      <div className="wf-sheet" style={{ height: "86%" }}>
        <div className="handle" />
        <div className="pad grow">
          <div className="row between">
            <div style={{ fontSize: 20, fontWeight: 700 }}>Cash ISA Saver</div>
            <Rate value="4.05%" accent />
          </div>
          <div className="wf-tabs">
            {["Overview", "Rates", "Eligibility"].map((t) => <span className={"t" + (t === tab ? " on" : "")} key={t} onClick={() => setTab(t)}>{t}</span>)}
          </div>
          <Bar w={95} tall /><Bar w={88} /><Bar w={92} />
          <div className="wf-facts" style={{ marginTop: 2 }}>
            <div className="f"><span>Tax status</span><span>Tax-free</span></div>
            <div className="f"><span>Access</span><span>Instant</span></div>
          </div>
          <Note>Tap a suggestion → jump straight to its card</Note>
        </div>
        <div className="foot"><div className="wf-btn sk">Apply ➔</div></div>
      </div>
    </Phone>
  );
}

/* ============================================================
   5 · EXISTING ACCOUNT — tapping YOUR account (1)
   ============================================================ */

function AccountView() {
  return (
    <Phone>
      <BrandRow />
      <div className="px" style={{ marginTop: 22, textAlign: "center" }}>
        <div style={{ fontSize: 19, fontWeight: 700 }}>Classic Account</div>
        <div style={{ fontSize: 12, color: "var(--wf-muted)" }}>John P · ••• 4421</div>
      </div>
      <div className="wf-balance" style={{ marginTop: 18, justifyContent: "center" }}>
        <div className="b" style={{ textAlign: "center" }}><div className="fig">£100</div><div className="lab">Balance<br />after payday</div></div>
        <div className="b" style={{ textAlign: "center" }}><div className="fig">£0.00</div><div className="lab">Overdraft<br />limit</div></div>
      </div>
      <div className="col gap-2 px" style={{ marginTop: 22 }}>
        <div className="wf-action sk">Transactions<span className="chev">›</span></div>
        <div className="wf-action sk">Manage cards<span className="chev">›</span></div>
      </div>
      <div className="px" style={{ marginTop: 22 }}>
        <div className="wf-convo" style={{ fontWeight: 600 }}>What do you need?</div>
        <div style={{ margin: "0 -16px", marginTop: 8 }}><SearchBar placeholder="Search within your banking" /></div>
        <div style={{ marginTop: 14 }}><Note>Existing accounts open to manage — search recurs here too</Note></div>
      </div>
      <div className="grow" />
    </Phone>
  );
}

/* ============================================================
   6 · TRADITIONAL NAV — slide-out with + expanders (2)
   ============================================================ */

const NAV = ["Savings", "Investments", "Pensions", "ISAs", "Loans", "Insurance", "Life", "Family", "Overdrafts", "Current"];

function MenuNav() {
  return (
    <Phone>
      <BrandRow />
      <div className="px" style={{ marginTop: 30 }}>
        <div className="wf-greet" style={{ fontSize: 20 }}>Hi <b>John</b></div>
      </div>
      <div className="wf-scrim" />
      <div className="wf-menu">
        <div className="mhead"><span className="wf-eyebrow">All products</span><span className="x">✕</span></div>
        <div className="wf-scroll">
          {NAV.map((t) => (
            <div className="mitem" key={t}>
              <span style={{ fontWeight: 600 }}>{t}</span>
              <span className="plus">+</span>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

function MenuExpanded() {
  return (
    <Phone>
      <BrandRow />
      <div className="px" style={{ marginTop: 30 }}>
        <div className="wf-greet" style={{ fontSize: 20 }}>Hi <b>John</b></div>
      </div>
      <div className="wf-scrim" />
      <div className="wf-menu">
        <div className="mhead"><span className="wf-eyebrow">All products</span><span className="x">✕</span></div>
        <div className="wf-scroll">
          <div className="mitem" style={{ background: "var(--wf-accent-soft)" }}><span style={{ fontWeight: 700 }}>Savings</span><span className="plus">–</span></div>
          {["Easy access", "Fixed rate", "Tax-free ISA", "Term bond", "Regular saver"].map((t) => (
            <div className="mitem sub" key={t}><span>{t}</span><span className="chev">›</span></div>
          ))}
          {["Investments", "Pensions", "ISAs", "Loans", "Insurance"].map((t) => (
            <div className="mitem" key={t}><span style={{ fontWeight: 600 }}>{t}</span><span className="plus">+</span></div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, {
  LandingMinimal, LandingQuick,
  SuggestSavings, SuggestISA, SuggestBlended,
  ResultsStack, ResultsCarousel,
  CardSheet, CardDirect,
  AccountView,
  MenuNav, MenuExpanded,
  WFNote: Note,
});
