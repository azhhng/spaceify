import React from 'react'
import './Header.css'

function Header() {
    const toHome = () => {
        window.location.href = "/";
    }

    const playGame = () => {
        window.location.href = "/game"
    }

    return (
        <div className="header-container">
            <h1 onClick={() => toHome()}>Spaceify.</h1>
            <h2>Hover, click, and enjoy.</h2>
            <h2>Made by <a href="https://alicez.herokuapp.com">Alice Zhang</a>.</h2>
            <button id="game-button" onClick={() => playGame()}>Play Game --&#62;</button>
        </div>
    )
}

export default Header
