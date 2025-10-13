import { useState } from 'react'
import { cn } from './utils/cn'

const Cell = ({
  children,
  className,
  onClick,
}: {
  children: string
  className?: string
  onClick: (v: string) => void
}) => {
  return (
    <div
      // Button semantically for a11y
      id={children}
      onClick={() => onClick(children)}
      className={cn('cursor-pointer border p-2 text-center text-xl', className)}
    >
      {children}
    </div>
  )
}

// const operate = (valA, valB, operation) => {
//   // if (operation === "")
// }

type Operation = '+' | '-' | '/' | '*'

const Calculator = () => {
  // const [value, setValue] = useState<string>('0')

  const [leftValue, setLeftValue] = useState('0')
  const [rightValue, setRightValue] = useState('0')
  const [lastOperation, setLastOperation] = useState<Operation | null>(null)

  //   const [visibleValue, setVisibleValue] = useState<string>('0')

  const handleButtonPress = (value: string) => {
    // if the button pressed is a number button
    if (Number(value)) {
      if (lastOperation) {
        if (rightValue === '0') {
          setRightValue(value)
        } else if (setRightValue) {
          setRightValue((v) => v + value)
        }
      } else {
        if (leftValue === '0') {
          setLeftValue(value)
        } else if (leftValue) {
          setLeftValue((v) => v + value)
        }
      }
    }

    // if an operation button is pressed
    if (value === '+') {
      setLastOperation(value)
      if (lastOperation) {
        // update left value
        setLeftValue((prevLeftValue) => {
          return String(Number(prevLeftValue) + Number(rightValue))
        })
        setRightValue('0')
      }
    }
  }

  const handleClear = () => {
    setLeftValue('0')
    setRightValue('0')
  }

  return (
    <div>
      <div className="bg-gray-400 flex h-[40x] text-right p-4 w-full">
        {rightValue !== '0' ? rightValue : leftValue}
      </div>
      <div className="grid grid-cols-4">
        <Cell onClick={handleClear}>AC</Cell>
        <Cell onClick={handleButtonPress}>+/-</Cell>
        <Cell onClick={handleButtonPress}>%</Cell>
        <Cell onClick={handleButtonPress} className="bg-orange-300">
          /
        </Cell>
        <Cell onClick={handleButtonPress}>7</Cell>
        <Cell onClick={handleButtonPress}>8</Cell>
        <Cell onClick={handleButtonPress}>9</Cell>
        <Cell onClick={handleButtonPress} className="bg-orange-300">
          *
        </Cell>
        <Cell onClick={handleButtonPress}>4</Cell>
        <Cell onClick={handleButtonPress}>5</Cell>
        <Cell onClick={handleButtonPress}>6</Cell>
        <Cell onClick={handleButtonPress} className="bg-orange-300">
          -
        </Cell>
        <Cell onClick={handleButtonPress}>1</Cell>
        <Cell onClick={handleButtonPress}>2</Cell>
        <Cell onClick={handleButtonPress}>3</Cell>
        <Cell onClick={handleButtonPress} className="bg-orange-300">
          +
        </Cell>
        <Cell onClick={handleButtonPress} className="col-span-2">
          0
        </Cell>
        <Cell onClick={handleButtonPress}>.</Cell>
        <Cell onClick={handleButtonPress} className="bg-orange-300">
          =
        </Cell>
      </div>
    </div>
  )
}

export default Calculator
