// client/src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="relative min-h-screen w-full flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg px-8 py-12 text-[#e8e3d0] animate-fadeIn">
        <h1 className="text-4xl font-['Hedvig_Letters_Serif'] mb-4">404</h1>
        <div className="text-6xl mb-6">✧</div>
        <h2 className="text-2xl font-['Ojuju'] font-light mb-6 text-center">
          The cards cannot find this page
        </h2>
        <p className="text-lg font-['Ojuju'] mb-8 text-center opacity-80">
          The path you seek is veiled in mystery. Perhaps a return to familiar
          grounds will reveal new insights.
        </p>
        <Link
          to="/"
          className="font-['Hedvig_Letters_Serif'] text-xl border border-[#e8e3d0] border-opacity-50 px-8 py-3 rounded-md hover:bg-[#e8e3d0]/10 transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
