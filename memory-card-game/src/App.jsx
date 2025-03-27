// App.jsx (versión solo para desktop con 15 tarjetas)
import { useEffect, useState } from 'react'
import Card from './components/Card'
import Scoreboard from './components/Scoreboard'
import './App.css'

function App() {
  const [cards, setCards] = useState([])
  const [clickedCards, setClickedCards] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clickedEffect, setClickedEffect] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameStatus, setGameStatus] = useState('playing')

  useEffect(() => {
    if (isPlaying) fetchCharacters()
  }, [isPlaying])

  const fetchCharacters = async () => {
    const res = await fetch('https://last-airbender-api.fly.dev/api/v1/characters?perPage=10')
    const data = await res.json()

    const formatted = data.map((char, index) => ({
      id: char._id || index,
      name: char.name || `Personaje ${index + 1}`,
      image: char.photoUrl || 'https://via.placeholder.com/150?text=Avatar',
    }))

    setCards(shuffleArray(formatted))
  }

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const resetGame = () => {
    setClickedCards([])
    setScore(0)
    setClickedEffect({})
    setGameStatus('playing')
    fetchCharacters()
  }

  const handleCardClick = (id) => {
    const isRepeated = clickedCards.includes(id)
    const newEffect = { [id]: isRepeated ? 'incorrect' : 'correct' }
    setClickedEffect(newEffect)

    setTimeout(() => {
      setClickedEffect({})
      setCards(shuffleArray(cards))
    }, 200)

    if (isRepeated) {
      setGameStatus('lost')
    } else {
      const newScore = score + 1
      setScore(newScore)
      const updatedClicks = [...clickedCards, id]
      setClickedCards(updatedClicks)
      if (newScore > bestScore) {
        setBestScore(newScore)
      }
      if (updatedClicks.length === cards.length) {
        setGameStatus('won')
      }
    }
  }

  if (!isPlaying) {
    return (
      <div className="start-screen">
        
        
        <h1>Memorama de Avatar 🌊🔥🌪️🪨</h1>
        <button className="play-button" onClick={() => setIsPlaying(true)}>
          Jugar
        </button>
      </div>
    )
  }

  return (
    <div className="App-wrapper">
      <div className={`App ${gameStatus !== 'playing' ? 'blurred' : ''}`}>
        <h1 className="game-title">Juego de Memoria: Avatar 🌊🔥🌪️🪨</h1>
        <Scoreboard score={score} bestScore={bestScore} />
        <div className="card-container-desktop">
          {cards.map((card) => (
            <Card
              key={card.id}
              name={card.name}
              image={card.image}
              onClick={() => handleCardClick(card.id)}
              className={clickedEffect[card.id] || ''}
            />
          ))}
        </div>
      </div>

      {gameStatus === 'lost' && (
        <div className="end-modal">
          <div className="end-modal-content">
            <h2>You Lose 😢</h2>
            <button onClick={resetGame}>Retry</button>
          </div>
        </div>
      )}

      {gameStatus === 'won' && (
        <div className="end-modal win">
          <div className="end-modal-content">
            <h2>You Win 🎉</h2>
            <p>¡Felicidades, memorizaste todos!</p>
            <button onClick={resetGame}>Jugar otra vez</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
