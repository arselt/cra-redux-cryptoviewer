const ErrorMessage = ({ message, onRetry, className = "" }) => (
  <div role="alert" className={`flex flex-wrap items-center gap-3 rounded-xl bg-danger-bg px-4 py-3 text-danger-ink ${className}`}>
    <p className="grow">{message}</p>
    {onRetry && (
      <button type="button" onClick={onRetry} className="rounded-lg bg-danger-ink px-3 py-1 text-danger-bg">
        Try again
      </button>
    )}
  </div>
);

export default ErrorMessage;
