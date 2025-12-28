import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [flags, setFlags] = useState(() => {
  const saved = localStorage.getItem("flags");
  return saved
    ? JSON.parse(saved)
    : {
        newNavbar: true,
        betaBanner: false,
        darkMode: false,
      };
});

useEffect(() => {
  localStorage.setItem("flags", JSON.stringify(flags));
}, [flags]);


  const toggleFlag = (flag) => {
    setFlags((prev) => ({
      ...prev,
      [flag]: !prev[flag],
    }));
  };

  return (
    <div className={`app ${flags.darkMode ? "dark" : ""}`}>
      <h1>Feature Flag Playground</h1>

      {/* Feature Toggles */}
      <div className="flags">
        {Object.keys(flags).map((flag) => (
          <label key={flag}>
            <input
              type="checkbox"
              checked={flags[flag]}
              onChange={() => toggleFlag(flag)}
            />
           {flag.replace(/([A-Z])/g, " $1")}

          </label>
        ))}
      </div>

      {/* Feature Controlled UI */}
      {flags.betaBanner && (
        <div className="banner">🚀 Beta Feature Enabled</div>
      )}

      <nav className="navbar">
        {flags.newNavbar ? (
          <strong>New Navbar</strong>
        ) : (
          <span>Old Navbar</span>
        )}
      </nav>

      <main className="content">
        <p>Main application content goes here.</p>
      </main>
    </div>
  );
}

export default App;
