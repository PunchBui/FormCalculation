import { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'

import { isPrime, isFibonacci } from './utils'

const App = () => {
  const base = 'con'
  const CALCULATION_TYPE = {
    IS_PRIME: 'isPrime',
    IS_FIBONACCI: 'isFibonacci',
  }

  const [value, setValue] = useState('')
  const [calculationType, setCalculationType] = useState(
    CALCULATION_TYPE.IS_PRIME
  )
  const [result, setResult] = useState(0)

  const setRound = (rounded) => setValue(rounded)
  const debouncedSetRound = useCallback(debounce(setRound, 500), [])

  const onChange = (e) => {
    const numberRx = /^(\d+)(\.)?\d*?$/
    const _value = e.target.value

    if (!numberRx.test(_value)) {
      return setValue('')
    }

    if (_value < 0) {
      return setValue(1)
    }

    if (!Number.isInteger(+_value) && _value) {
      const rounded = Math.round(+_value)
      debouncedSetRound(rounded)
      return setValue(_value)
    }

    return setValue(_value)
  }

  const onSelect = (e) => setCalculationType(e.target.value)

  useEffect(() => {
    const _value = +value
    console.log(value, Boolean(_value))

    if (!Number.isInteger(_value) && _value) {
      return
    }

    const _result = calculationType === CALCULATION_TYPE.IS_PRIME
      ? isPrime(_value)
      : isFibonacci(_value)
    
    setResult(_result ? 'true' : 'false')
  }, [value, calculationType])

  return (
    <div className={base}>
      <div className={`${base}__column ${base}__column--left`}>
        <input onChange={onChange} value={value} type='text' />
      </div>
      <div className={`${base}__column ${base}__column--center`}>
        <select value={calculationType} onChange={onSelect}>
          <option value={CALCULATION_TYPE.IS_PRIME}>
            {CALCULATION_TYPE.IS_PRIME}
          </option>
          <option value={CALCULATION_TYPE.IS_FIBONACCI}>
            {CALCULATION_TYPE.IS_FIBONACCI}
          </option>
        </select>
      </div>
      <div className={`${base}__column ${base}__column--right`}>{result}</div>
    </div>
  )
}

export default App
