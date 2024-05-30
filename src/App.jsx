import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="w-full text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-purple-600 py-2 bg-slate-900">
      🎞️Movie Adda
      </h1>
      <Outlet />
      <footer className="w-full bg-purple-600 flex justify-center items-center flex-wrap">
        <h1 className="h-full text-center text-white py-3">Made with ❤️ by Sayanjit</h1>
      </footer>
    </>
  );
}

export default App;
