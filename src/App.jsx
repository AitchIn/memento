import React, { useState, useEffect } from 'react';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/Header';
import useAppBadge from './hooks/useAppBadge';

function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);
  const [setBadge, clearBadge] = useAppBadge();

  //Handling card selection
  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  //start over
  const handleNewGame = () => {
    clearBadge();
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => {
    let pickTimer;

    // Two cards clicked
    if (pickOne && pickTwo) {
      //if cards are the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              //update card property to matched
              return { ...card, matched: true };
            }
            else {
              //no match
              return card;
            }
          });
        });
        handleTurn();
      }
      else {
        //set delay for another selection
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    //to avoid conflicts with next timeout
    return () => {
      clearTimeout(pickTimer);
    }
  }, [cards, pickOne, pickTwo]);

  //all matches found
  useEffect(() => {
    //check remaining cards
    const checkWin = cards.filter((card) => !card.matched);

    //all matches found
    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins(wins + 1);
      setBadge();
      handleTurn();
      setCards(shuffle);
    }

  }, [cards, wins]);

  return (
    <>
    <Header handleNewGame={handleNewGame} wins={wins} />

    <div className='grid'>
      {cards.map((card) => {
        const { image, id, matched } = card;

        return (
          <Card
          key={id}
          image={image}
          selected={card === pickOne || card === pickTwo || matched}
          onClick={() => handleClick(card)}
          />
        )
      })}
    </div>
    </>
  );
}

export default App;