import React from "react";
import "./Header.css";

function Header() {
  const playGame = () => {
    window.location.href = "/game";
  };

  return (
    <div className="header-container">
      <h1>
        <a href="/">Spaceify.</a>
      </h1>
      <h2>Hover, click, and enjoy.</h2>
      <h2>
        Made by <a href="https://azhhng.netlify.app">Alice Zhang</a>.
      </h2>
      <h2>
        You can find the Github{" "}
        <a href="https://github.com/azhhng/spaceify">here</a>.
      </h2>
      <button id="game-button" onClick={() => playGame()}>
        Play Game --&#62;
      </button>
    </div>
  );
}

export default Header;
