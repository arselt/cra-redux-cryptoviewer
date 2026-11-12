import { usePrefs } from "../prefs";
import { LANGUAGE_NAMES } from "../i18n";

const THEME_ICONS = { system: "◐", light: "☀", dark: "☾" };

const Header = () => {
  const { t, themeMode, cycleTheme, lang, setLang } = usePrefs();
  const themeLabel = t("theme.label", { mode: t(`theme.${themeMode}`) });
  return (
    <header className="bg-brand min-h-14 pt-[env(safe-area-inset-top)] rounded-b-xl w-full max-w-7xl mx-auto">
      <nav aria-label={t("nav.label")} className="flex justify-between items-center gap-2 py-2 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] text-on-brand">
        <a href="/" className="focus-visible:outline-on-brand">
          <h1 className="text-2xl sm:text-3xl">Cryptoviewer</h1>
        </a>
        <div className="flex items-center gap-2">
          <select
            aria-label={t("language.label")}
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="h-9 rounded-xl bg-transparent px-1 text-on-brand focus-visible:outline-on-brand"
          >
            {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
              <option key={code} value={code} className="text-ink bg-card">{name}</option>
            ))}
          </select>
          <button type="button" onClick={cycleTheme} aria-label={themeLabel} title={themeLabel} className="h-9 w-9 text-lg leading-none rounded-xl focus-visible:outline-on-brand">
            <span aria-hidden="true">{THEME_ICONS[themeMode]}</span>
          </button>
          <div className="bg-on-brand text-md text-brand rounded-xl px-2 py-1">USD</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
