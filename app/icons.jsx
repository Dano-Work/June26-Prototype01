/* Verdant & Still icons + brand mark */
const Ico = {
  Mag: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>,

  Chev: (p) =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="9 6 15 12 9 18" />
    </svg>,

  Back: (p) =>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="15 6 9 12 15 18" />
    </svg>,

  X: (p) =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
    </svg>,

  Tick: (p) =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>,

  ArrowR: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>,

  Plus: (p) =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>

};

/* My Bank heraldic lion + wordmark, moss-tinted on cream background */
function BrandMark() {
  return (
    <span className="brandmark">
      <img
        src="app/logo.png"
        alt="My Bank"
        style={{
          display: "block",


          objectFit: "contain",
          filter: "brightness(0) saturate(100%) invert(22%) sepia(28%) saturate(700%) hue-rotate(75deg) brightness(85%)",
          width: "auto", height: "52px"
        }} />
      
    </span>);

}

Object.assign(window, { Ico, BrandMark });