import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ "src": "%PUBLIC_URL%/img/sword.png", matched: false },
	{ "src": "%PUBLIC_URL%/img/shield.png", matched: false },
	{ "src": "%PUBLIC_URL%/img/skull.png", matched: false },
	{ "src": "%PUBLIC_URL%/img/elixir.png", matched: false },
	{ "src": "%PUBLIC_URL%/img/ring.png", matched: false },
	{ "src": "%PUBLIC_URL%/img/scroll.png", matched: false },
];

function App() {

	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	}

	// handle choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	}

	// compare two choices
	useEffect(() => {
		if (!choiceOne || !choiceTwo) {return;}
		setDisabled(true);

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
		setDisabled(false);
	}

	// start a new game automatically
	useEffect(() => {
		shuffleCards();
	}, [])

	return (
		<div className="App">
			<div className="left"></div>
			<div className="center">
			<h1>Dungeon Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className="card-grid">
				{cards.map(card => (
					<SingleCard 
						key={card.id} 
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
			</div>
			<div className="right"></div>
		</div>
	);
}

export default App;
