// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ReadingPage from "./pages/ReadingPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import TarotShuffle from "./pages/TarotShuffle";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reading" element={<ReadingPage />} />
            <Route path="/test" element={<TarotShuffle />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
