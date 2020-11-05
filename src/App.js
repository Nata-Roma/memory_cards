import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import "./styles.css";

// https://pokeres.bastionbot.org/images/pokemon/4.png

const cardImages = [
  { id: 4, name: "fair" },
  { id: 10, name: "caterpillar" },
  { id: 24, name: "snake" },
  { id: 30, name: "evil" },
  { id: 39, name: "paleRoundy" },
  { id: 58, name: "tiger" }
];

const doubleCards = shuffle([...cardImages, ...cardImages]);

export default function App() {
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);
  const [counter, setCounter] = useState(0);

  const clicked = (index) => {
    setOpened((opened) => [...opened, index]);
    setCounter((counter) => counter + 1);
  };

  useEffect(() => {
    if (opened.length < 2) return;
    const matchFirst = doubleCards[opened[0]];
    const matchSecond = doubleCards[opened[1]];
    if (matchFirst.name === matchSecond.name) {
      setMatched((matched) => [...matched, matchFirst.id]);
    }
  }, [opened]);

  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);
  }, [opened]);

  useEffect(() => {
    if (matched.length === cardImages.length) {
      console.log("You won!");
    }
  }, [matched]);

  return (
    <div className="App">
      <h1>Play the game!</h1>
      <p>
        <span className="counter">{counter}</span> Moves
      </p>

      <div className="container">
        {doubleCards.map((card, index) => {
          let isFlip = false;
          if (opened.includes(index)) isFlip = true;
          if (matched.includes(card.id)) isFlip = true;
          return (
            <Card
              card={card}
              key={index}
              isFlip={isFlip}
              clicked={clicked}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}

const Card = ({ card, isFlip, clicked, index }) => {
  return (
    <button
      className={`card ${isFlip ? "flipper" : ""}`}
      onClick={() => clicked(index)}
      disabled={isFlip}
      onDoubleClick={() => {}}
    >
      <div className="back">?</div>
      <div className="front">
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${card.id}.png`}
          alt={card.name}
        />
      </div>
    </button>
  );
};
