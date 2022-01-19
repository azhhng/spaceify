import React, { useEffect } from 'react';
import './Game.css'

function Game() {

    var currentPlanet = "";
    var currentName = "";

    var userResponses = { "Earth": "", "Jupiter": "", "Saturn": "", "Mercury": "", "Venus": "", "Mars": "", "Uranus": "", "Neptune": "" };

    useEffect(() => {

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        let planets = ["Earth", "Jupiter", "Saturn", "Mercury", "Venus", "Mars", "Uranus", "Neptune"];
        shuffleArray(planets);

        planets.forEach(function (planetName) {
            // JPL
            let link = "https://images-api.nasa.gov/search?center=JPL&keywords=" + planetName + "&media_type=image";
            fetch(link)
                .then(response => response.json())
                .then(result => {
                    // randomize what photo gets chosen
                    let index = Math.floor(Math.random() * result["collection"]["items"].length);

                    // add planets to the game
                    let planet = document.createElement("div");
                    planet.setAttribute("class", "planet");
                    planet.setAttribute("id", planetName);
                    planet.onclick = function () { pickPlanet(planetName); };

                    let img = document.createElement("img");
                    img.setAttribute("src", result["collection"]["items"][index]["links"][0]["href"]);
                    img.setAttribute("id", planetName + "ID");
                    img.setAttribute("alt", planetName);

                    let userAnswer = document.createElement("h3");
                    userAnswer.innerHTML = "";
                    userAnswer.setAttribute("id", planetName + "AnswerID");
                    userAnswer.setAttribute("class", "planet-answer");

                    planet.appendChild(img);
                    planet.appendChild(userAnswer);
                    document.getElementById('planet-container').appendChild(planet);

                    document.getElementById("play-button").style.display = "block";
                    document.getElementById("progress").textContent = "Game is ready to play.";

                    // set results
                    let resultData = result["collection"]["items"][index]["data"][0];

                    let resultDIV = document.createElement("div");
                    resultDIV.setAttribute("class", "result");
                    resultDIV.setAttribute("id", planetName + "-result");

                    let correctName = document.createElement("h2");
                    correctName.setAttribute("class", "correct-title");
                    correctName.innerHTML = planetName;

                    let resultTitle = document.createElement("h3");
                    resultTitle.innerHTML = resultData["title"];

                    let resultDescription = document.createElement("p");
                    resultDescription.innerHTML = resultData["description_508"];

                    let resultCenter = document.createElement("h4");
                    resultCenter.innerHTML = "Taken by: " + resultData["center"] + " center";

                    resultDIV.appendChild(correctName);
                    resultDIV.appendChild(resultTitle);
                    resultDIV.appendChild(resultDescription);
                    resultDIV.appendChild(resultCenter);

                    document.getElementById('results-container').appendChild(resultDIV);

                })
        });

    })

    const play = () => {
        document.getElementById("instructions").style.display = "none";
        document.getElementById("planet-container").style.display = "block";
        document.getElementById("name-container").style.display = "block";
        document.getElementById("submit-button").style.display = "block";

        // set planet images in the middle
        var planetChildren = document.getElementById("planet-container").children;

        for (let planet of planetChildren) {
            if (planet.childNodes[0].clientHeight < 280) {
                let topMargin = String((280 - planet.childNodes[0].clientHeight) / 2) + "px";
                document.getElementById(planet.childNodes[0].id).style.marginTop = topMargin;
            }
        }
    }

    const pickName = (name) => {

        // if user wants to match name with planet
        if (currentPlanet !== "") {
            currentName = name;

            userResponses[currentPlanet] = currentName;

            // add name
            document.getElementById(currentPlanet + "AnswerID").innerHTML = currentName;

            // remove planet name from list
            document.getElementById(currentName + "Name").style.display = "none";

            document.getElementById(currentPlanet).style.background = "linear-gradient(to top left, rgb(194, 172, 151), rgb(122, 7, 36))";
            currentPlanet = ""
            currentName = ""
        }
        // if user wants to unselect current name
        else if (currentPlanet === "" && currentName === name) {
            document.getElementById(currentName + "Name").style.backgroundColor = "#F5547C";
            currentName = ""
        }

        else {
            if (currentName !== "") {
                document.getElementById(currentName + "Name").style.backgroundColor = "#F5547C";
            }
            currentName = name;
            document.getElementById(currentName + "Name").style.backgroundColor = "#1655F0";
        }
    }

    const pickPlanet = (name) => {

        // if user wants to unmatch current planet and match with current picked name
        if (currentName !== "" && userResponses[name] !== "") {

            document.getElementById(userResponses[name] + "Name").style.display = "block";
            document.getElementById(currentName + "Name").style.display = "none";
            document.getElementById(name + "AnswerID").innerHTML = currentName;
            document.getElementById(userResponses[name] + "Name").style.backgroundColor = "#F5547C";

            userResponses[name] = currentName;

            currentName = "";
            currentPlanet = "";
        }

        // if user wants to unmatch
        else if (userResponses[name] !== "") {
            // add name back to list
            document.getElementById(userResponses[name] + "Name").style.display = "block";
            document.getElementById(userResponses[name] + "Name").style.backgroundColor = "#F5547C";

            document.getElementById(name + "AnswerID").innerHTML = "";
            userResponses[name] = "";
        }

        // if user wants to unselect current planet
        else if (currentPlanet === name && currentName === "") {
            document.getElementById(currentPlanet).style.background = "linear-gradient(to top left, rgb(194, 172, 151), rgb(122, 7, 36))";
            currentPlanet = ""
        }

        else {
            if (currentName !== "") {
                currentPlanet = name;

                userResponses[currentPlanet] = currentName;

                // add name
                document.getElementById(currentPlanet + "AnswerID").innerHTML = currentName;

                // remove planet name from list
                document.getElementById(currentName + "Name").style.display = "none";

                // reset variables
                document.getElementById(currentPlanet).style.background = "linear-gradient(to top left, rgb(194, 172, 151), rgb(122, 7, 36))";
                currentPlanet = ""
                currentName = ""
            }

            else {
                if (currentPlanet !== "") {
                    document.getElementById(currentPlanet).style.background = "linear-gradient(to top left, rgb(194, 172, 151), rgb(122, 7, 36))";
                }
                currentPlanet = name;
                document.getElementById(currentPlanet).style.background = "linear-gradient(to top left, rgb(70, 67, 245), rgb(34, 145, 19))";
            }
        }
    }

    const submit = () => {
        document.getElementById("planet-container").style.width = "400px";
        document.getElementById("results-container").style.display = "block";
        document.getElementById("submit-button").style.display = "none";
        document.getElementById("name-container").style.display = "none";

        let correct = 0
        for (const planet in userResponses) {
            if (planet === userResponses[planet]) {
                correct += 1
            }
        }

        let exclamation = "";

        if (correct < 3) {
            exclamation = "Yikes!";
        }
        else if (correct < 6) {
            exclamation = "Better luck next time."
        }
        else if (correct < 8) {
            exclamation = "Impressive!"
        }
        else {
            exclamation = "WOW!"
        }

        document.getElementById("correct-text").innerHTML = "You got " + String(correct) + " correct out of 8. " + exclamation;
        document.getElementById("correct-container").style.display = "block";
    }

    return (
        <div className="game-container">
            <div className="instruction-container" id="instructions">
                <h2>Instructions</h2>
                <p>Objective: Click and match each photo with their respective planet name.</p>
                <ul>
                    <li>Click the submit button when you are done.</li>
                    <li>Photos of the planets are randomly selected from NASA's Image and Video Library, thus some photos may give little to no helpful information about its planet. (Sorry.)</li>
                    <li>Good luck!</li>
                </ul>
                <h3 id="progress">Preparing game...</h3>
                <button id="play-button" style={{ display: "none" }} onClick={() => play()}>Play --&#62;</button>
            </div>
            <div className="planet-container" id="planet-container" style={{ display: "none" }}>
            </div>
            <div className="name-container" id="name-container" style={{ display: "none" }}>
                <h2>Click to match and reclick that planet to unmatch.</h2>
                <h3 className="name" onClick={() => pickName("Earth")} id="EarthName">Earth</h3>
                <h3 className="name" onClick={() => pickName("Jupiter")} id="JupiterName">Jupiter</h3>
                <h3 className="name" onClick={() => pickName("Saturn")} id="SaturnName">Saturn</h3>
                <h3 className="name" onClick={() => pickName("Mercury")} id="MercuryName">Mercury</h3>
                <h3 className="name" onClick={() => pickName("Venus")} id="VenusName">Venus</h3>
                <h3 className="name" onClick={() => pickName("Mars")} id="MarsName">Mars</h3>
                <h3 className="name" onClick={() => pickName("Uranus")} id="UranusName">Uranus</h3>
                <h3 className="name" onClick={() => pickName("Neptune")} id="NeptuneName">Neptune</h3>
            </div>
            <div className="results-container" id="results-container" style={{ display: "none" }}>
            </div>

            <div className="correct-container" id="correct-container" style={{ display: "none" }}>
                <h3 id="correct-text">Correct: </h3>
            </div>
            <button id="submit-button" style={{ display: "none" }} onClick={() => submit()}>Submit --&#62;</button>
        </div>
    )
}

export default Game;
