import { nanoid } from "nanoid"
import randomInteger from "random-int"
import { useState, useEffect } from "react"
import Confetti from "react-confetti"
import Dice from "./Dice"

export default function DicesContainer() {
  const [dices, setDices] = useState(randomDices())
  const [tenzies, setTenzies] = useState(false)
  const [trials, setTrials] = useState(0)

  useEffect(() => {
    if (
      dices.every((dice) => {
        return dice.selected && dice.num === dices[0].num
      })
    ) {
      setTenzies(true)
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
      setTrials(0)
    } else {
      setDices((prev) =>
        prev.map((dice, index) => ({
          ...dice,
          num: dice.selected ? dice.num : newRolls[index].num,
        }))
      )
      setTrials((prev) => prev + 1)
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
    <Dice
      key={dice.id}
      id={dice.id}
      selected={dice.selected}
      num={dice.num}
      holdDice={changeSelected}
    />
  ))

  return (
    <>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="trials">
        <h3 className="text">Trials: </h3>
        <p className="num">{trials}</p>
      </div>
      <div className="dices-container">{diceElements}</div>
      <button onClick={rollDices}>{tenzies ? "New Game" : "Roll"}</button>
    </>
  )
}
