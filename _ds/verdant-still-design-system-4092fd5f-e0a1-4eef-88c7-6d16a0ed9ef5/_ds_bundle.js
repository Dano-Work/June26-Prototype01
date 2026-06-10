/* @ds-bundle: {"format":3,"namespace":"VerdantStillDesignSystem_4092fd","components":[],"sourceHashes":{"ui_kits/banking_app/Components.jsx":"00cfca942945","ui_kits/banking_app/DashboardScreen.jsx":"98bea65b2a67","ui_kits/banking_app/Navigation.jsx":"bf629aa4b95c","ui_kits/banking_app/SavingsScreen.jsx":"0e315b185e32","ui_kits/banking_app/TransactionsScreen.jsx":"f12dfdec3c6a","ui_kits/banking_app/TransferScreen.jsx":"5954a842148a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VerdantStillDesignSystem_4092fd = window.VerdantStillDesignSystem_4092fd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/banking_app/Components.jsx
try { (() => {
// Verdant & Still — Banking App — Primitive Components
// Shared design tokens + low-level UI elements

const VS_TOKENS = {
  cream: '#fafcf9',
  white: '#ffffff',
  moss50: '#f2f7f0',
  moss100: '#ddebd8',
  moss200: '#b8d4af',
  moss400: '#6fa05e',
  moss600: '#4a7a38',
  moss800: '#2d5422',
  moss900: '#1a3314',
  emerald50: '#eaf7f1',
  emerald100: '#c0ebd7',
  emerald200: '#80d5af',
  emerald400: '#2db37a',
  emerald600: '#1a8a5a',
  emerald800: '#0e5c3a',
  textPrimary: '#1a2e1a',
  textSecondary: '#4a6347',
  textMuted: '#7a9a78',
  borderLight: 'rgba(74,122,56,0.12)',
  borderMid: 'rgba(74,122,56,0.22)'
};

// ─── Button ─────────────────────────────────────────────────
function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  style,
  disabled
}) {
  const base = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 6,
    transition: 'background 0.15s, transform 0.1s',
    letterSpacing: '0.01em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    opacity: disabled ? 0.55 : 1
  };
  const sizes = {
    md: {
      fontSize: 13,
      padding: '8px 18px'
    },
    sm: {
      fontSize: 12,
      padding: '5px 12px'
    },
    lg: {
      fontSize: 15,
      padding: '11px 24px'
    }
  };
  const variants = {
    primary: {
      background: VS_TOKENS.moss600,
      color: '#fff'
    },
    secondary: {
      background: VS_TOKENS.moss50,
      color: VS_TOKENS.moss800,
      border: `0.5px solid ${VS_TOKENS.borderMid}`
    },
    ghost: {
      background: 'transparent',
      color: VS_TOKENS.moss600,
      border: `0.5px solid ${VS_TOKENS.borderMid}`
    },
    danger: {
      background: '#c0392b',
      color: '#fff'
    }
  };
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const hoverBg = {
    primary: VS_TOKENS.moss800,
    secondary: VS_TOKENS.moss100,
    ghost: VS_TOKENS.moss50,
    danger: '#a93226'
  };
  const variantStyle = {
    ...variants[variant]
  };
  if (hovered && !disabled) variantStyle.background = hoverBg[variant];
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...sizes[size],
      ...variantStyle,
      transform: pressed ? 'scale(0.97)' : 'scale(1)',
      ...style
    },
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false)
  }, children);
}

// ─── Badge ───────────────────────────────────────────────────
function Badge({
  variant = 'moss',
  children
}) {
  const variants = {
    moss: {
      background: VS_TOKENS.moss100,
      color: VS_TOKENS.moss800
    },
    emerald: {
      background: VS_TOKENS.emerald100,
      color: VS_TOKENS.emerald800
    },
    neutral: {
      background: VS_TOKENS.white,
      color: VS_TOKENS.textSecondary,
      border: `0.5px solid ${VS_TOKENS.borderMid}`
    },
    deep: {
      background: VS_TOKENS.moss800,
      color: '#fff'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 11,
      fontWeight: 500,
      padding: '3px 10px',
      borderRadius: 6,
      letterSpacing: '0.03em',
      fontFamily: "'DM Sans', sans-serif",
      ...variants[variant]
    }
  }, children);
}

// ─── Input ───────────────────────────────────────────────────
function Input({
  placeholder,
  value,
  onChange,
  label,
  hint,
  error,
  type = 'text'
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: VS_TOKENS.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      fontFamily: "'DM Sans', sans-serif"
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14,
      padding: '9px 12px',
      borderRadius: 6,
      border: `0.5px solid ${error ? '#c0392b' : focused ? VS_TOKENS.moss400 : VS_TOKENS.borderMid}`,
      background: VS_TOKENS.white,
      color: VS_TOKENS.textPrimary,
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: focused ? `0 0 0 3px rgba(74,122,56,0.10)` : error ? '0 0 0 3px rgba(192,57,43,0.08)' : 'none',
      transition: 'border-color 0.15s, box-shadow 0.15s'
    }
  }), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: error ? '#c0392b' : VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif"
    }
  }, error || hint));
}

// ─── Card ────────────────────────────────────────────────────
function Card({
  children,
  style,
  padding = 16
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: VS_TOKENS.white,
      border: `0.5px solid ${VS_TOKENS.borderLight}`,
      borderRadius: 6,
      padding,
      ...style
    }
  }, children);
}

// ─── Alert ───────────────────────────────────────────────────
function Alert({
  variant = 'neutral',
  title,
  children
}) {
  const variants = {
    success: {
      bg: VS_TOKENS.moss50,
      border: VS_TOKENS.moss400,
      text: VS_TOKENS.moss800
    },
    info: {
      bg: VS_TOKENS.emerald50,
      border: VS_TOKENS.emerald400,
      text: VS_TOKENS.emerald800
    },
    neutral: {
      bg: '#f7f8f6',
      border: VS_TOKENS.borderMid,
      text: VS_TOKENS.textSecondary
    }
  };
  const v = variants[variant];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderRadius: 0,
      background: v.bg,
      borderLeft: `2.5px solid ${v.border}`,
      color: v.text,
      fontSize: 13,
      lineHeight: 1.5,
      fontFamily: "'DM Sans', sans-serif"
    }
  }, title && /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, title), title && ' — ', children);
}

// ─── Avatar ──────────────────────────────────────────────────
function Avatar({
  initials,
  color = VS_TOKENS.moss400,
  size = 32
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.35,
      fontWeight: 500,
      fontFamily: "'DM Sans', sans-serif",
      flexShrink: 0,
      border: `2px solid ${VS_TOKENS.white}`
    }
  }, initials);
}

// ─── Section Label ───────────────────────────────────────────
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.10em',
      color: VS_TOKENS.textMuted,
      paddingBottom: 8,
      borderBottom: `0.5px solid ${VS_TOKENS.borderLight}`,
      marginBottom: 12,
      fontFamily: "'DM Sans', sans-serif"
    }
  }, children);
}

// ─── Divider ─────────────────────────────────────────────────
function Divider({
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '0.5px',
      background: VS_TOKENS.borderLight,
      ...style
    }
  });
}
Object.assign(window, {
  Button,
  Badge,
  Input,
  Card,
  Alert,
  Avatar,
  SectionLabel,
  Divider,
  VS_TOKENS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/banking_app/Components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/banking_app/DashboardScreen.jsx
try { (() => {
// Verdant & Still — Dashboard / Home Screen

const TRANSACTIONS = [{
  id: 1,
  name: 'Riverford Organic',
  category: 'Groceries',
  amount: -42.50,
  date: 'Today',
  icon: '🌿'
}, {
  id: 2,
  name: 'Salary',
  category: 'Income',
  amount: +3200.00,
  date: 'Yesterday',
  icon: '↓'
}, {
  id: 3,
  name: 'Forest & Co.',
  category: 'Coffee',
  amount: -4.80,
  date: 'Yesterday',
  icon: '◑'
}, {
  id: 4,
  name: 'Slow Cycle Repair',
  category: 'Transport',
  amount: -28.00,
  date: 'Mon 2 Jun',
  icon: '○'
}, {
  id: 5,
  name: 'Woodland Trust',
  category: 'Charity',
  amount: -10.00,
  date: 'Mon 2 Jun',
  icon: '◎'
}];
function BalanceCard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: VS_TOKENS.moss800,
      borderRadius: 6,
      padding: '22px 20px 20px',
      margin: '16px 16px 0',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.10em',
      color: VS_TOKENS.moss200,
      fontFamily: "'DM Sans', sans-serif"
    }
  }, "Current Balance"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "My Bank",
    style: {
      height: 20,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
      opacity: 0.7
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 36,
      color: '#fff',
      fontWeight: 400,
      lineHeight: 1,
      marginBottom: 18
    }
  }, "\xA34,208", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      color: VS_TOKENS.moss200
    }
  }, ".47")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      color: VS_TOKENS.moss200,
      fontFamily: "'DM Sans', sans-serif",
      marginBottom: 3
    }
  }, "Income"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 15,
      color: VS_TOKENS.emerald200,
      fontWeight: 400
    }
  }, "+\xA33,200.00")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '0.5px',
      background: 'rgba(255,255,255,0.15)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      color: VS_TOKENS.moss200,
      fontFamily: "'DM Sans', sans-serif",
      marginBottom: 3
    }
  }, "Spent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 15,
      color: '#fff',
      fontWeight: 400
    }
  }, "\u2212\xA3892.33")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '0.5px',
      background: 'rgba(255,255,255,0.15)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      color: VS_TOKENS.moss200,
      fontFamily: "'DM Sans', sans-serif",
      marginBottom: 3
    }
  }, "Saved"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 15,
      color: VS_TOKENS.emerald200,
      fontWeight: 400
    }
  }, "\xA3620.00"))));
}
function QuickActions({
  onSend
}) {
  const actions = [{
    label: 'Send',
    sub: 'Transfer',
    onClick: onSend
  }, {
    label: 'Pay',
    sub: 'Bill or ref'
  }, {
    label: 'Top up',
    sub: 'Add funds'
  }, {
    label: 'Freeze',
    sub: 'Card lock'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 8,
      padding: '16px 16px 0'
    }
  }, actions.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.label,
    onClick: a.onClick,
    style: {
      background: VS_TOKENS.white,
      border: `0.5px solid ${VS_TOKENS.borderLight}`,
      borderRadius: 6,
      padding: '12px 8px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      transition: 'background 0.15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = VS_TOKENS.moss50,
    onMouseLeave: e => e.currentTarget.style.background = VS_TOKENS.white
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 14,
      color: VS_TOKENS.moss800,
      fontWeight: 400
    }
  }, a.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, a.sub))));
}
function TransactionRow({
  tx
}) {
  const isCredit = tx.amount > 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 16px',
      borderBottom: `0.5px solid ${VS_TOKENS.borderLight}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: isCredit ? VS_TOKENS.emerald50 : VS_TOKENS.moss50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      flexShrink: 0,
      color: isCredit ? VS_TOKENS.emerald600 : VS_TOKENS.moss600,
      border: `0.5px solid ${isCredit ? VS_TOKENS.emerald100 : VS_TOKENS.moss100}`,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500
    }
  }, tx.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      color: VS_TOKENS.textPrimary,
      fontFamily: "'DM Sans', sans-serif",
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, tx.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginTop: 2
    }
  }, tx.category, " \xB7 ", tx.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 15,
      fontWeight: 400,
      color: isCredit ? VS_TOKENS.emerald600 : VS_TOKENS.textPrimary,
      flexShrink: 0
    }
  }, isCredit ? '+' : '−', "\xA3", Math.abs(tx.amount).toFixed(2)));
}
function DashboardScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: VS_TOKENS.cream
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    useLogo: true,
    subtitle: "Good morning",
    action: /*#__PURE__*/React.createElement(Avatar, {
      initials: "EL",
      color: VS_TOKENS.moss600,
      size: 34
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement(BalanceCard, null), /*#__PURE__*/React.createElement(QuickActions, {
    onSend: () => onNavigate('send')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Recent activity")), TRANSACTIONS.map(tx => /*#__PURE__*/React.createElement(TransactionRow, {
    key: tx.id,
    tx: tx
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24
    }
  })));
}
Object.assign(window, {
  DashboardScreen,
  TRANSACTIONS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/banking_app/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/banking_app/Navigation.jsx
try { (() => {
// Verdant & Still — Navigation components
// Top header bar + bottom tab navigation

const LOGO_SRC = '../../assets/logo.png';
function TopBar({
  title,
  subtitle,
  onBack,
  action,
  useLogo
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px 12px',
      background: VS_TOKENS.cream,
      borderBottom: `0.5px solid ${VS_TOKENS.borderLight}`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: VS_TOKENS.moss600,
      padding: '4px 6px 4px 0',
      fontSize: 18,
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center'
    }
  }, "\u2190"), /*#__PURE__*/React.createElement("div", null, useLogo ? /*#__PURE__*/React.createElement("img", {
    src: LOGO_SRC,
    alt: "My Bank",
    style: {
      height: 26,
      objectFit: 'contain',
      display: 'block',
      filter: `brightness(0) saturate(100%) invert(22%) sepia(28%) saturate(700%) hue-rotate(75deg) brightness(85%)`
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 18,
      fontWeight: 400,
      color: VS_TOKENS.moss800,
      lineHeight: 1.2
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      marginTop: 2
    }
  }, subtitle))), action && /*#__PURE__*/React.createElement("div", null, action));
}
const NAV_ITEMS = [{
  id: 'home',
  label: 'Home',
  icon: '⌂'
}, {
  id: 'send',
  label: 'Send',
  icon: '↑'
}, {
  id: 'savings',
  label: 'Savings',
  icon: '◎'
}, {
  id: 'history',
  label: 'History',
  icon: '≡'
}, {
  id: 'profile',
  label: 'Profile',
  icon: '○'
}];
function BottomNav({
  active,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      background: VS_TOKENS.white,
      borderTop: `0.5px solid ${VS_TOKENS.borderLight}`,
      flexShrink: 0
    }
  }, NAV_ITEMS.map(item => {
    const isActive = item.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => onSelect(item.id),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        padding: '10px 4px 12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 0.15s',
        color: isActive ? VS_TOKENS.moss600 : VS_TOKENS.textMuted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        lineHeight: 1,
        color: isActive ? VS_TOKENS.moss600 : VS_TOKENS.textMuted
      }
    }, item.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: isActive ? 500 : 400,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: isActive ? VS_TOKENS.moss600 : VS_TOKENS.textMuted
      }
    }, item.label));
  }));
}
Object.assign(window, {
  TopBar,
  BottomNav,
  NAV_ITEMS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/banking_app/Navigation.jsx", error: String((e && e.message) || e) }); }

// ui_kits/banking_app/SavingsScreen.jsx
try { (() => {
// Verdant & Still — Savings Goals Screen

const GOALS = [{
  id: 1,
  name: 'Forest Cabin',
  target: 12000,
  saved: 4208,
  color: '#2d5422',
  emoji: '◎'
}, {
  id: 2,
  name: 'Emergency Fund',
  target: 5000,
  saved: 3750,
  color: '#1a8a5a',
  emoji: '◑'
}, {
  id: 3,
  name: 'New Bicycle',
  target: 1200,
  saved: 340,
  color: '#4a7a38',
  emoji: '○'
}, {
  id: 4,
  name: 'Japan Trip',
  target: 3500,
  saved: 820,
  color: '#6fa05e',
  emoji: '△'
}];
function ProgressBar({
  pct,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: VS_TOKENS.moss50,
      borderRadius: 2,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${Math.min(pct, 100)}%`,
      background: color,
      borderRadius: 2,
      transition: 'width 0.6s ease'
    }
  }));
}
function GoalCard({
  goal,
  onAdd
}) {
  const pct = Math.round(goal.saved / goal.target * 100);
  const remaining = goal.target - goal.saved;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: VS_TOKENS.white,
      border: `0.5px solid ${VS_TOKENS.borderLight}`,
      borderRadius: 6,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: goal.color,
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 14px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 16,
      color: VS_TOKENS.moss800,
      marginBottom: 2
    }
  }, goal.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.07em'
    }
  }, "\xA3", remaining.toLocaleString(), " to go")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 18,
      color: goal.color
    }
  }, pct, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif"
    }
  }, "of \xA3", goal.target.toLocaleString()))), /*#__PURE__*/React.createElement(ProgressBar, {
    pct: pct,
    color: goal.color
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 15,
      color: VS_TOKENS.textPrimary
    }
  }, "\xA3", goal.saved.toLocaleString(), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      color: VS_TOKENS.textMuted
    }
  }, " saved")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onAdd(goal),
    style: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      fontWeight: 500,
      padding: '4px 12px',
      background: VS_TOKENS.moss50,
      color: VS_TOKENS.moss800,
      border: `0.5px solid ${VS_TOKENS.borderMid}`,
      borderRadius: 6,
      cursor: 'pointer',
      transition: 'background 0.15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = VS_TOKENS.moss100,
    onMouseLeave: e => e.currentTarget.style.background = VS_TOKENS.moss50
  }, "+ Add"))));
}
function SavingsScreen() {
  const [goals, setGoals] = React.useState(GOALS);
  const [toastGoal, setToastGoal] = React.useState(null);
  function handleAdd(goal) {
    setGoals(prev => prev.map(g => g.id === goal.id ? {
      ...g,
      saved: Math.min(g.saved + 50, g.target)
    } : g));
    setToastGoal(goal.name);
    setTimeout(() => setToastGoal(null), 2000);
  }
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: VS_TOKENS.cream
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Savings",
    subtitle: "Growing with intention"
  }), toastGoal && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 72,
      left: '50%',
      transform: 'translateX(-50%)',
      background: VS_TOKENS.moss800,
      color: '#fff',
      padding: '8px 18px',
      borderRadius: 6,
      fontSize: 13,
      fontFamily: "'DM Sans', sans-serif",
      zIndex: 100,
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
    }
  }, "+\xA350 added to ", toastGoal), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: VS_TOKENS.white,
      border: `0.5px solid ${VS_TOKENS.borderLight}`,
      borderRadius: 6,
      padding: '16px',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif"
    }
  }, "Total saved"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 22,
      color: VS_TOKENS.moss800
    }
  }, "\xA3", totalSaved.toLocaleString())), /*#__PURE__*/React.createElement(ProgressBar, {
    pct: Math.round(totalSaved / totalTarget * 100),
    color: VS_TOKENS.moss600
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif",
      textAlign: 'right',
      marginTop: 4
    }
  }, Math.round(totalSaved / totalTarget * 100), "% of \xA3", totalTarget.toLocaleString(), " total goal")), /*#__PURE__*/React.createElement(SectionLabel, null, "Your goals"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, goals.map(g => /*#__PURE__*/React.createElement(GoalCard, {
    key: g.id,
    goal: g,
    onAdd: handleAdd
  }))), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      marginTop: 12,
      padding: '12px',
      borderRadius: 6,
      background: 'transparent',
      border: `0.5px dashed ${VS_TOKENS.borderMid}`,
      color: VS_TOKENS.textMuted,
      fontSize: 13,
      fontFamily: "'DM Sans', sans-serif",
      cursor: 'pointer',
      transition: 'all 0.15s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = VS_TOKENS.moss50;
      e.currentTarget.style.color = VS_TOKENS.moss600;
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = VS_TOKENS.textMuted;
    }
  }, "+ New goal"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 20
    }
  })));
}
Object.assign(window, {
  SavingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/banking_app/SavingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/banking_app/TransactionsScreen.jsx
try { (() => {
// Verdant & Still — Transactions / History Screen

const ALL_TRANSACTIONS = [{
  id: 1,
  name: 'Riverford Organic',
  category: 'Groceries',
  amount: -42.50,
  date: 'Today',
  icon: '↓'
}, {
  id: 2,
  name: 'Salary — Greenhouse',
  category: 'Income',
  amount: +3200.00,
  date: 'Yesterday',
  icon: '↑'
}, {
  id: 3,
  name: 'Forest & Co.',
  category: 'Coffee',
  amount: -4.80,
  date: 'Yesterday',
  icon: '↓'
}, {
  id: 4,
  name: 'Slow Cycle Repair',
  category: 'Transport',
  amount: -28.00,
  date: 'Mon 2 Jun',
  icon: '↓'
}, {
  id: 5,
  name: 'Woodland Trust',
  category: 'Charity',
  amount: -10.00,
  date: 'Mon 2 Jun',
  icon: '↓'
}, {
  id: 6,
  name: 'Pret A Manger',
  category: 'Food',
  amount: -8.45,
  date: 'Sun 1 Jun',
  icon: '↓'
}, {
  id: 7,
  name: 'National Rail',
  category: 'Transport',
  amount: -23.40,
  date: 'Sat 31 May',
  icon: '↓'
}, {
  id: 8,
  name: 'Freelance — Fern Co',
  category: 'Income',
  amount: +450.00,
  date: 'Fri 30 May',
  icon: '↑'
}, {
  id: 9,
  name: 'Spotify',
  category: 'Subscript.',
  amount: -11.99,
  date: 'Fri 30 May',
  icon: '↓'
}, {
  id: 10,
  name: 'Tesco',
  category: 'Groceries',
  amount: -31.20,
  date: 'Thu 29 May',
  icon: '↓'
}];
const FILTERS = ['All', 'Income', 'Payments', 'Savings'];
function FilterPill({
  label,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      fontWeight: active ? 500 : 400,
      padding: '5px 14px',
      borderRadius: 6,
      background: active ? VS_TOKENS.moss600 : VS_TOKENS.white,
      color: active ? '#fff' : VS_TOKENS.textSecondary,
      border: `0.5px solid ${active ? VS_TOKENS.moss600 : VS_TOKENS.borderMid}`,
      cursor: 'pointer',
      transition: 'all 0.15s',
      flexShrink: 0
    }
  }, label);
}
function TransactionsScreen() {
  const [filter, setFilter] = React.useState('All');
  const filtered = ALL_TRANSACTIONS.filter(tx => {
    if (filter === 'All') return true;
    if (filter === 'Income') return tx.amount > 0;
    if (filter === 'Payments') return tx.amount < 0;
    return true;
  });
  const total = filtered.reduce((s, t) => s + t.amount, 0);
  const isPositive = total >= 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: VS_TOKENS.cream
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "History",
    subtitle: "June 2025"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      background: VS_TOKENS.white,
      borderBottom: `0.5px solid ${VS_TOKENS.borderLight}`
    }
  }, [{
    label: 'In',
    value: '+£3,650.00',
    color: VS_TOKENS.emerald600
  }, {
    label: 'Out',
    value: '−£159.94',
    color: VS_TOKENS.textPrimary
  }, {
    label: 'Net',
    value: '+£3,490.06',
    color: VS_TOKENS.emerald600
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      flex: 1,
      padding: '12px 16px',
      borderLeft: i > 0 ? `0.5px solid ${VS_TOKENS.borderLight}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      color: VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif",
      marginBottom: 3
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 15,
      color: s.color
    }
  }, s.value)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '12px 16px',
      background: VS_TOKENS.cream,
      overflowX: 'auto',
      flexShrink: 0
    }
  }, FILTERS.map(f => /*#__PURE__*/React.createElement(FilterPill, {
    key: f,
    label: f,
    active: filter === f,
    onClick: () => setFilter(f)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      background: VS_TOKENS.white
    }
  }, filtered.map(tx => {
    const isCredit = tx.amount > 0;
    return /*#__PURE__*/React.createElement("div", {
      key: tx.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        borderBottom: `0.5px solid ${VS_TOKENS.borderLight}`,
        cursor: 'pointer',
        transition: 'background 0.12s'
      },
      onMouseEnter: e => e.currentTarget.style.background = VS_TOKENS.moss50,
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        flexShrink: 0,
        background: isCredit ? VS_TOKENS.emerald50 : VS_TOKENS.moss50,
        border: `0.5px solid ${isCredit ? VS_TOKENS.emerald100 : VS_TOKENS.moss100}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        color: isCredit ? VS_TOKENS.emerald600 : VS_TOKENS.moss600,
        fontFamily: "'DM Sans', sans-serif"
      }
    }, tx.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: VS_TOKENS.textPrimary,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, tx.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: VS_TOKENS.textMuted,
        fontFamily: "'DM Sans', sans-serif",
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginTop: 2
      }
    }, tx.category, " \xB7 ", tx.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'Georgia, serif',
        fontSize: 15,
        color: isCredit ? VS_TOKENS.emerald600 : VS_TOKENS.textPrimary,
        flexShrink: 0
      }
    }, isCredit ? '+' : '−', "\xA3", Math.abs(tx.amount).toFixed(2)));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 20
    }
  })));
}
Object.assign(window, {
  TransactionsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/banking_app/TransactionsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/banking_app/TransferScreen.jsx
try { (() => {
// Verdant & Still — Send / Transfer Screen

const RECENT_CONTACTS = [{
  id: 1,
  initials: 'SR',
  name: 'Sara Rowan',
  color: '#4a7a38'
}, {
  id: 2,
  initials: 'MK',
  name: 'Moss Kitchen',
  color: '#1a8a5a'
}, {
  id: 3,
  initials: 'JF',
  name: 'Jamie Fern',
  color: '#6fa05e'
}, {
  id: 4,
  initials: 'AL',
  name: 'Ash Linden',
  color: '#2d5422'
}];
const STEPS = ['recipient', 'amount', 'confirm', 'done'];
function ContactPill({
  contact,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: selected ? contact.color : VS_TOKENS.moss100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: selected ? '#fff' : VS_TOKENS.moss800,
      fontSize: 15,
      fontWeight: 500,
      fontFamily: "'DM Sans', sans-serif",
      border: selected ? `2px solid ${contact.color}` : `2px solid transparent`,
      transition: 'all 0.15s',
      boxSizing: 'border-box'
    }
  }, contact.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: selected ? VS_TOKENS.moss800 : VS_TOKENS.textMuted,
      fontFamily: "'DM Sans', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      textAlign: 'center',
      maxWidth: 56,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, contact.name.split(' ')[0]));
}
function TransferScreen({
  onBack
}) {
  const [step, setStep] = React.useState('recipient');
  const [selected, setSelected] = React.useState(null);
  const [amount, setAmount] = React.useState('');
  const [note, setNote] = React.useState('');
  const [sending, setSending] = React.useState(false);
  function handleSend() {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep('done');
    }, 1200);
  }
  if (step === 'done') {
    const contact = RECENT_CONTACTS.find(c => c.id === selected);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: VS_TOKENS.cream,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: VS_TOKENS.emerald50,
        border: `0.5px solid ${VS_TOKENS.emerald100}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        marginBottom: 20
      }
    }, "\u2713"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'Georgia, serif',
        fontSize: 22,
        color: VS_TOKENS.moss800,
        marginBottom: 8
      }
    }, "Sent"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: VS_TOKENS.textSecondary,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        marginBottom: 4
      }
    }, "\xA3", parseFloat(amount || 0).toFixed(2), " to ", contact?.name), note && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: VS_TOKENS.textMuted,
        fontFamily: "'DM Sans', sans-serif",
        marginBottom: 28
      }
    }, "\"", note, "\""), /*#__PURE__*/React.createElement(Alert, {
      variant: "success"
    }, "Your transfer is on its way."), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 24
      }
    }), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setStep('recipient');
        setSelected(null);
        setAmount('');
        setNote('');
      }
    }, "Send another"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: VS_TOKENS.cream
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Send money",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '12px 16px 0',
      justifyContent: 'center'
    }
  }, STEPS.slice(0, 3).map((s, i) => {
    const stepIdx = STEPS.indexOf(step);
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        width: stepIdx === i ? 20 : 6,
        height: 6,
        borderRadius: 3,
        background: i <= stepIdx ? VS_TOKENS.moss600 : VS_TOKENS.moss100,
        transition: 'all 0.2s'
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px 16px'
    }
  }, step === 'recipient' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, null, "Recents"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap'
    }
  }, RECENT_CONTACTS.map(c => /*#__PURE__*/React.createElement(ContactPill, {
    key: c.id,
    contact: c,
    selected: selected === c.id,
    onClick: () => setSelected(c.id)
  })))), /*#__PURE__*/React.createElement(Input, {
    label: "Or enter account / sort code",
    placeholder: "20-00-00 \xB7 12345678"
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: !selected,
    onClick: () => setStep('amount'),
    style: {
      width: '100%'
    }
  }, "Continue \u2192")), step === 'amount' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, selected && (() => {
    const c = RECENT_CONTACTS.find(x => x.id === selected);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 14px',
        background: VS_TOKENS.moss50,
        borderRadius: 6,
        border: `0.5px solid ${VS_TOKENS.borderLight}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: c.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 13,
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif"
      }
    }, c.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: VS_TOKENS.textPrimary
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: VS_TOKENS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontFamily: "'DM Sans', sans-serif"
      }
    }, "Recipient")));
  })(), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: VS_TOKENS.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      fontFamily: "'DM Sans', sans-serif",
      marginBottom: 6
    }
  }, "Amount"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 28,
      color: VS_TOKENS.moss800
    }
  }, "\xA3"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    placeholder: "0.00",
    value: amount,
    onChange: e => setAmount(e.target.value),
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 28,
      color: VS_TOKENS.moss800,
      border: 'none',
      borderBottom: `1.5px solid ${VS_TOKENS.borderMid}`,
      outline: 'none',
      background: 'transparent',
      width: '100%',
      padding: '4px 0'
    }
  }))), /*#__PURE__*/React.createElement(Input, {
    label: "Note (optional)",
    placeholder: "Rent \xB7 dinner \xB7 thanks!",
    value: note,
    onChange: e => setNote(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setStep('recipient'),
    style: {
      flex: 1
    }
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    disabled: !amount || parseFloat(amount) <= 0,
    onClick: () => setStep('confirm'),
    style: {
      flex: 2
    }
  }, "Review \u2192"))), step === 'confirm' && (() => {
    const c = RECENT_CONTACTS.find(x => x.id === selected);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 0,
        overflow: 'hidden'
      }
    }, [['To', c?.name], ['Amount', `£${parseFloat(amount).toFixed(2)}`], ['From', 'Verdant Main · ••4208'], ['Arrives', 'Instantly'], note && ['Note', note]].filter(Boolean).map(([k, v], i, arr) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 14px',
        borderBottom: i < arr.length - 1 ? `0.5px solid ${VS_TOKENS.borderLight}` : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: VS_TOKENS.textMuted,
        fontFamily: "'DM Sans', sans-serif",
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontSize: 11
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: VS_TOKENS.textPrimary,
        fontFamily: k === 'Amount' ? 'Georgia, serif' : "'DM Sans', sans-serif",
        fontWeight: k === 'Amount' ? 400 : 400
      }
    }, v)))), /*#__PURE__*/React.createElement(Alert, {
      variant: "info"
    }, "Transfers are protected and instant."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setStep('amount'),
      style: {
        flex: 1
      }
    }, "Edit"), /*#__PURE__*/React.createElement(Button, {
      onClick: handleSend,
      disabled: sending,
      style: {
        flex: 2
      }
    }, sending ? 'Sending…' : 'Confirm & send')));
  })()));
}
Object.assign(window, {
  TransferScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/banking_app/TransferScreen.jsx", error: String((e && e.message) || e) }); }

})();
