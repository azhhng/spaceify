import React, { useEffect, useState } from 'react'
import './Homepage.css'
import Card from "../ImageCard/ImageCard";

function Homepage() {
    const [cards, setCards] = useState([]);
    const [sol, setSol] = useState(1);
    const [page, setPage] = useState(1);
    const [disableBack, setDisableBack] = useState(true);

    useEffect(() => {
        let link = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=" + String(sol) + "&page=" + String(page) + "&api_key=TOVC86BWvjrEZYp9Rcdso2giRfzjfdyQr2HGxVdp"
        fetch(link)
            .then(response => response.json())
            .then(result => {
                if (result["photos"].length === 0) {
                    setCards([])
                    setSol(sol + 1)
                    setPage(1)
                    setDisableBack(true);
                    return;
                }

                var imageCards = [];

                result["photos"].forEach(function (image) {
                    let imageCard = {};

                    imageCard["id"] = image["id"];
                    imageCard["img"] = image["img_src"];
                    imageCard["date_taken"] = image["earth_date"];
                    imageCard["camera"] = String(image["camera"]["full_name"]).replace(" Camera", "");
                    imageCard["rover"] = image["rover"]["name"];

                    imageCards.push(imageCard);

                });
                setCards(imageCards);
            })
    }, [page, sol])

    const nextPage = () => {
        setPage(page + 1);
        setDisableBack(false);
        window.scrollTo(0, 0); // scroll back to top of page
    }

    const backPage = () => {
        if (page > 1) {
            if (page === 2) {
                setDisableBack(true);
            }
            setPage(page - 1);
            window.scrollTo(0, 0); // scroll back to top of page
        }
    }

    return (
        <div>
            <div className="result-container">
                {cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
            <div className="pagination-container">
                <button id="back-button" disabled={disableBack} onClick={() => backPage()}>&#60;-- Back</button>
                <button onClick={() => nextPage()}>Next --&#62;</button>
            </div>
        </div>
    )
}

export default Homepage
