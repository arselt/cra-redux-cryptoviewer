import { useEffect, useId, useRef, useState } from "react";

// Custom listbox (WAI-ARIA select-only combobox pattern): styled with theme tokens, fully keyboard operable.
// options: [{ value, label, shortLabel? }]
const Select = ({ value, options, onChange, label, prefix, buttonClassName = "", align = "left" }) => {
  const id = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedIndex = Math.max(options.findIndex((option) => option.value === value), 0);
  const selected = options[selectedIndex];

  const open = () => {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };
  const choose = (index) => {
    onChange(options[index].value);
    close();
  };

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.getElementById(`${id}-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex, id]);

  const handleButtonKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      open();
    }
  };

  const handleListKeyDown = (e) => {
    const last = options.length - 1;
    const moves = { ArrowDown: Math.min(activeIndex + 1, last), ArrowUp: Math.max(activeIndex - 1, 0), Home: 0, End: last };
    if (e.key in moves) {
      e.preventDefault();
      setActiveIndex(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(activeIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  // Click/focus leaving the widget closes it without stealing focus back
  const handleBlur = (e) => {
    if (!rootRef.current.contains(e.relatedTarget)) setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative" onBlur={handleBlur}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? `${id}-list` : undefined}
        aria-label={`${label}: ${selected.label}`}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleButtonKeyDown}
        className={`flex items-center gap-2 ${buttonClassName}`}
      >
        {prefix && <span className="text-sm text-subtle whitespace-nowrap">{prefix}</span>}
        <span className="font-medium">{selected.shortLabel ?? selected.label}</span>
        <span aria-hidden="true" className={`text-xs transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>
      {isOpen && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${id}-option-${activeIndex}`}
          onKeyDown={handleListKeyDown}
          className={`absolute z-20 mt-1 max-h-64 min-w-full w-max overflow-auto rounded-xl border border-line bg-card p-1 text-ink shadow-xl ${align === "right" ? "right-0" : "left-0"}`}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(index)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 ${index === activeIndex ? "bg-line" : ""}`}
            >
              <span aria-hidden="true" className={`w-4 ${option.value === value ? "" : "invisible"}`}>✓</span>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
