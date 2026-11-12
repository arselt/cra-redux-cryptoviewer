import { usePrefs } from "../prefs";

const THEME_ICONS = { system: "◐", light: "☀", dark: "☾" };

const Header = () => {
  const { themeMode, cycleTheme } = usePrefs();
  return (
    <header className="bg-brand min-h-14 pt-[env(safe-area-inset-top)] rounded-b-xl w-full max-w-7xl mx-auto">
      <nav aria-label="Main" className="flex justify-between items-center gap-2 py-2 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] text-on-brand">
        <a href="/" className="focus-visible:outline-on-brand">
          <h1 className="text-2xl sm:text-3xl">Cryptoviewer</h1>
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycleTheme}
            aria-label={`Theme: ${themeMode}`}
            title={`Theme: ${themeMode}`}
            className="h-9 w-9 text-lg leading-none rounded-xl focus-visible:outline-on-brand"
          >
            <span aria-hidden="true">{THEME_ICONS[themeMode]}</span>
          </button>
          <div className="bg-on-brand text-md text-brand rounded-xl px-2 py-1">USD</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
