import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Open menu"
        className="theme-toggle"
        onClick={() => setOpen((value) => !value)}
      >
        ☰
      </button>
      {open ? (
        <div className="menu-panel">
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
