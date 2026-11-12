import { usePrefs } from "../prefs";

const ErrorMessage = ({ message, onRetry, className = "" }) => {
  const { t } = usePrefs();
  return (
  <div role="alert" className={`flex flex-wrap items-center gap-3 rounded-xl bg-danger-bg px-4 py-3 text-danger-ink ${className}`}>
    <p className="grow">{message}</p>
    {onRetry && (
      <button type="button" onClick={onRetry} className="rounded-lg bg-danger-ink px-3 py-1 text-danger-bg">
        {t("error.retry")}
      </button>
    )}
  </div>
  );
};

export default ErrorMessage;
