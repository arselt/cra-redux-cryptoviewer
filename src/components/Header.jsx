const Header = () => {
  return (
    <header className="bg-zinc-900 min-h-14 pt-[env(safe-area-inset-top)] rounded-b-xl w-full max-w-7xl mx-auto">
      <nav aria-label="Main" className="flex justify-between items-center py-2 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] text-zinc-200">
        <a href="/" className="focus-visible:outline-zinc-200">
          <h1 className="text-3xl">Cryptoviewer</h1>
        </a>
        <div className="bg-zinc-200 text-md text-zinc-900 rounded-xl px-2 py-1">USD</div>
      </nav>
    </header>
  );
};

export default Header;
