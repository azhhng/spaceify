import React, { useEffect } from 'react'
import './ImageCard.css'

function ImageCard(props) {

    useEffect(() => {
        // fit image in center of circle
        const img = new Image();

        img.onload = function () {
            try {
                if (this.height < 350) {
                    let topMargin = String((350 - this.height) / 2) + "px";
                    document.getElementById(imgID).style.marginTop = topMargin;
                }
            }
            catch {
            }

        }

        img.src = props.card.img;

    })

    var cardID = props.card.id + "-card";
    var imgID = props.card.id + "-image";
    var containerID = props.card.id + "-container";

    var liked = false;

    const imageHover = () => {
        document.getElementById(containerID).style.display = "inline-block";
    }

    const imageUnhover = () => {
        document.getElementById(containerID).style.display = "none";
    }

    const likeImage = () => {
        if (liked) {
            liked = false;
            document.getElementById(cardID).style.background = "linear-gradient(to top left, rgb(255, 250, 246), rgb(112, 90, 96))";
        }
        else {
            liked = true;
            document.getElementById(cardID).style.background = "linear-gradient(to top left, rgb(201, 22, 52), rgb(255, 104, 154))";
        }
    }

    return (

        <div className="card" id={cardID} onMouseOver={() => imageHover()} onMouseLeave={() => imageUnhover()} onClick={() => likeImage()}>
            <img className="test" id={imgID} src={props.card.img} alt="Avatar" />
            <div className="card-info" id={containerID} style={{ display: "none" }}>
                <h3>Title: {props.card.id}</h3>
                <h3>Date Taken: {props.card.date_taken}</h3>
                <h3>Camera: {props.card.camera}</h3>
                <h3>Rover: {props.card.rover}</h3>
            </div>
        </div>

    )
}

export default ImageCard
