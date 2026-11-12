const ErrorMessage = ({ message, onRetry, className = "" }) => (
  <div role="alert" className={`flex flex-wrap items-center gap-3 rounded-xl bg-rose-100 px-4 py-3 text-rose-900 ${className}`}>
    <p className="grow">{message}</p>
    {onRetry && (
      <button type="button" onClick={onRetry} className="rounded-lg bg-rose-900 px-3 py-1 text-rose-50 focus-visible:outline-rose-900">
        Try again
      </button>
    )}
  </div>
);

export default ErrorMessage;
