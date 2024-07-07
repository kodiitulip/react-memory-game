import "./SingleCard.css"

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
	
	const handleClick = () => {
		if (disabled) {return;}
		handleChoice(card);
	}
	
	return (
		<div className="card">
			<div className={flipped ? "flipped" : ""}>
				<img className="front" src={card.src} alt="card front" />
				<img 
					onClick={handleClick} 
					src="/react-memory-game/img/back.png" 
					alt="card back" 
					className="back" />
			</div>
		</div>
	)
}