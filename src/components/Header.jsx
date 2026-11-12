import { usePrefs } from "../prefs";
import { LANGUAGE_NAMES } from "../i18n";
import { CURRENCIES } from "../api";
import Select from "./Select";

const THEME_ICONS = { light: "☀", dark: "☾" };

const Header = () => {
  const { t, theme, toggleTheme, lang, setLang, currency, setCurrency } = usePrefs();
  const themeLabel = t("theme.label", { mode: t(`theme.${theme}`) });
  return (
    <header className="bg-brand min-h-14 pt-[env(safe-area-inset-top)] rounded-b-xl w-full max-w-7xl mx-auto">
      <nav aria-label={t("nav.label")} className="flex justify-between items-center gap-2 py-2 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] text-on-brand">
        <a href="/" className="focus-visible:outline-on-brand">
          <h1 className="text-xl min-[400px]:text-2xl sm:text-3xl">Cryptoviewer</h1>
        </a>
        <div className="flex items-center gap-2">
          <Select
            value={lang}
            onChange={setLang}
            label={t("language.label")}
            align="right"
            options={Object.entries(LANGUAGE_NAMES).map(([code, name]) => ({ value: code, label: name, shortLabel: code.toUpperCase() }))}
            buttonClassName="h-9 rounded-xl px-2 text-on-brand focus-visible:outline-on-brand"
          />
          <button type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel} className="h-9 w-9 text-lg leading-none rounded-xl focus-visible:outline-on-brand">
            <span aria-hidden="true">{THEME_ICONS[theme]}</span>
          </button>
          <Select
            value={currency}
            onChange={setCurrency}
            label={t("currency.label")}
            align="right"
            options={CURRENCIES.map((code) => ({ value: code, label: code.toUpperCase() }))}
            buttonClassName="h-9 rounded-xl bg-on-brand px-2 text-brand focus-visible:outline-on-brand"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
