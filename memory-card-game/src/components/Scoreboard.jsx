function Scoreboard({ score, bestScore }) {
    return (
      <div className="scoreboard-container">
        <div className="score-box">
          <p className="label">Puntaje</p>
          <p className="value">{score}</p>
        </div>
        <div className="score-box">
          <p className="label">Mejor Puntaje</p>
          <p className="value">{bestScore}</p>
        </div>
      </div>
    )
  }
  
  export default Scoreboard
  