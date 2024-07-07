import "./SingleCard.css"

export default function SingleCard({ card, handleChoice, flipped }) {
	
	const handleClick = () => {
		handleChoice(card);
		console.log(`${card} selected`)
	}
	
	return (
		<div className="card">
			<div className={flipped ? "flipped" : ""}>
				<img className="front" src={card.src} alt="card front" />
				<img 
					onClick={handleClick} 
					src="/img/back.png" 
					alt="card back" 
					className="back" />
			</div>
		</div>
	)
}