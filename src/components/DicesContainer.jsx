import { nanoid } from "nanoid"
import randomInteger from "random-int"
import { useState, useEffect } from "react"
import Confetti from "react-confetti"

export default function DicesContainer() {
  const [dices, setDices] = useState(randomDices())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    console.log("second effect")
    if (
      dices.every((dice) => {
        return dice.selected && dice.num === dices[0].num
      })
    ) {
      setTenzies(true)
      console.log("you won")
    }
  }, [dices])

  function randomDices() {
    return [...Array(10)].map(() => ({
      num: randomInteger(1, 6),
      selected: false,
      id: nanoid(5),
    }))
  }

  function rollDices() {
    const newRolls = randomDices()
    if (tenzies) {
      setDices(newRolls)
      setTenzies(false)
    } else {
      setDices((prev) =>
        prev.map((dice, index) => ({
          ...dice,
          num: dice.selected ? dice.num : newRolls[index].num,
        }))
      )
    }
  }

  function changeSelected(outerId) {
    setDices((prev) =>
      prev.map((dice) => ({
        ...dice,
        selected: dice.id === outerId ? true : dice.selected,
      }))
    )
  }

  const diceElements = dices.map((dice) => (
    <div
      className={`dice ${dice.selected && "selected"}`}
      onClick={() => !dice.selected && changeSelected(dice.id)}
      key={dice.id}
    >
      {dice.num}
    </div>
  ))

  return (
    <>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dices-container">{diceElements}</div>
      <button onClick={rollDices}>{tenzies ? "New Game" : "Roll"}</button>
    </>
  )
}
