import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./index.scss"; // Глобальные стили

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
