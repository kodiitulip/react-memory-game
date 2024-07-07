import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ "src": "/img/sword.png", matched: false },
	{ "src": "/img/shield.png", matched: false },
	{ "src": "/img/skull.png", matched: false },
	{ "src": "/img/elixir.png", matched: false },
	{ "src": "/img/ring.png", matched: false },
	{ "src": "/img/scroll.png", matched: false },
];

function App() {

	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);

	// shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setCards(shuffledCards);
		setTurns(0);
	}

	// handle choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	}

	// compare two choices
	useEffect(() => {
		if (!choiceOne || !choiceTwo) {return}

		if (choiceOne.src === choiceTwo.src) {
			setCards(prevCards => {
				return prevCards.map( card => {
					if (card.src === choiceOne.src) {
						return {...card, matched: true};
					} else {
						return card;
					}
				});
			})
			resetTurn();
		} else {
			setTimeout(() => resetTurn(), 1000);
		}
	}, [choiceOne, choiceTwo])

	console.log(cards);

	// reset turns
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurns => prevTurns + 1);
	}

	return (
		<div className="App">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className="card-grid">
				{cards.map(card => (
					<SingleCard 
						key={card.id} 
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
