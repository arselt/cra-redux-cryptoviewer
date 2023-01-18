import CryptoCard from "./components/CryptoCard";
import Header from "./components/Header";

function App() {
  return (
    <div className="font-Chivo bg-zinc-100">
      <Header />
      <main className="min-h-screen grid justify-items-center my-5 px-6">
        <CryptoCard />
      </main>
    </div>
  );
}

export default App;
