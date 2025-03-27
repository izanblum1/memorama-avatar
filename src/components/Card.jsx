function Card({ name, image, onClick, className }) {
    return (
      <div className={`card ${className}`} onClick={onClick}>
        <img src={image} alt={name} />
        <p>{name}</p>
      </div>
    )
  }
  
  export default Card
  