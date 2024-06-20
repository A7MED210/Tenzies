import "../Dice.css"

export default function Dice(props) {
  const dots = Array(props.num)
    .fill(0)
    .map(() => <div className="dot"></div>)
  return (
    <div
      className={`dice ${props.selected && "selected"}`}
      onClick={() => !props.selected && props.holdDice(props.id)}
    >
      {dots || props.num}
    </div>
  )
}
