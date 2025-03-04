const Header = () => {
  return (
    <header className="bg-zinc-900 h-14 rounded-b-xl w-full max-w-7xl mx-auto">
      <nav className="flex justify-between items-center py-2 px-4 text-zinc-200">
        <a href="/">
          <h1 className="text-3xl">Cryptoviewer</h1>
        </a>
        <div className="bg-zinc-200 text-md text-zinc-900 rounded-xl px-2 py-1">USD</div>
      </nav>
    </header>
  );
};

export default Header;
