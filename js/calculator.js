const display = document.querySelector('.display')
const keys = document.querySelectorAll('.keys')
const equal = document.querySelector('.equal')
const plus = document.querySelector('.plus')
const minus = document.querySelector('.subtract')
const multiple = document.querySelector('.multiply')
const divise = document.querySelector('.division')

//memory will always update for calcualtion
let memory = ''

// sutract
function subtract([num1, num2 = 0]) {
  let result = num1 - num2
  return Number.isInteger(result) ? result : result.toFixed(4)
}

//sum
function sum([num1, num2 = 0]) {
  let result = Number(num1) + Number(num2)
  return Number.isInteger(result) ? result : result.toFixed(4)
}

//multiply
function multiply(arr) {
  let result = arr.length > 0 ? (arr = arr.reduce((acc, val) => acc * val)) : 0
  return Number.isInteger(result) ? result : result.toFixed(4)
}

//diviision
function division([num1, num2]) {
  let result
  if (num2 == '0') {
    display.value = 'Math Error'
  } else {
    result = num1 / num2
  }
  return Number.isInteger(result) ? result : result.toFixed(3)
}

//power
function power([num1, num2]) {
  let result = num1 ** num2
  return Number.isInteger(result) ? result : result.toExponential(4)
}

//factorial
function factorial(num) {
  if (Number(num) === 0) return 1
  let i = num < 0 ? num * -1 - 1 : num - 1
  let fact = num < 0 ? Number(num * -1) : Number(num)
  while (i > 0) {
    fact *= i
    i--
  }
  if (Number.isInteger(fact) && num > 0) {
    return fact > 1000000000 ? fact.toExponential(4) : fact
  } else if (num < 0) {
    return -fact.toExponential(4)
  } else {
    return fact.toExponential(4)
  }
}

//this function will calculate based on the operator
function operator() {
  //the arr will store two value for calculation
  let arr

  /*plus operator*/
  if (memory.match(/^[\-\+]?\d+(\.\d+)?\+(\d+)?\.?(\d+|\+)$/g)) {
    arr = memory.split('+').filter((num) => num !== '')
    memory = String(sum(arr))
    display.value = memory
    return true
  } else if (memory.match(/^[\-\+]?\d+(\.\d+)?\-(\d+)?\.?(\d+|\-)$/g)) {
    /* minus operator */
    console.log('minus')
    let allMinus = memory
      .split('')
      .filter((num) => num == '-')
      .join('')
    arr = memory.split('-').filter((num) => num !== '')
    if (allMinus === '--') {
      memory = `-${String(sum(arr))}`
    } else {
      memory = String(subtract(arr))
    }
    display.value = memory
    return true
  } else if (memory.match(/^[\-\+]?\d+(\.\d+)?\*[\-\+]?(\d+)?\.?(\d+)$/g)) {
    /* multiple operator */
    console.log('multiple')
    let allMinus = memory
      .split('')
      .filter((num) => num == '-')
      .join('')
    arr = memory.split('*').filter((num) => num !== '')
    memory = String(multiply(arr))
    display.value = memory
    return true
  } else if (memory.match(/^[\-\+]?\d+(\.\d+)?\/[\-\+]?(\d+)?\.?(\d+)$/g)) {
    /* division operator */
    console.log('division')
    arr = memory.split('/').filter((num) => num !== '')
    memory = String(division(arr))
    display.value = memory
    return true
  } else if (memory.match(/^[\+\-]?\d+(\.\d+)?\^[\+\-]?(\d+)?\.?\d+$/g)) {
    /* power operator */
    console.log('power')
    arr = memory.split('^').filter((num) => num !== '')
    console.log(memory)
    memory = String(power(arr))
    display.value = memory
    return true
  } else if (memory.match(/^√[\d+]?\.?\d+$/g)) {
    /* root operator*/
    console.log('root')
    let x = memory.split('√')
    memory = String(power([x[1], 0.5]))
    display.value = memory
    return true
  } else if (memory.match(/^[\+\-]?(\d+\.)?\d+!$/g)) {
    /* factorial operator */
    console.log('factorial')
    let x = memory.split('!')
    memory = String(factorial(x[0]))
    display.value = memory
    return true
  } else if (memory.match(/^[\+\-]?(\d+\.)?\d+%$/g)) {
    /* percentage operator */
    console.log('percentage')
    let x = memory.split('%')
    console.log(memory)
    memory = String(division([x[0], 100]))
    display.value = memory
    return true
  }
  return false
}

/*cliking any of calculator key will update the display and the operator() will run based on the display*/

function takeInput(e) {
  if (e.target.textContent.match(/\d/g)) {
    display.value += e.target.textContent
    memory += e.target.textContent
  } else if (
    e.target.textContent.match(/[\+\-\*\/%\^!]/g) &&
    !e.target.textContent.match(/[√!%]/)
  ) {
    display.value += e.target.textContent
    memory += e.target.textContent
    let x = memory.split(/[\+\-\*/\^]/).filter((num) => num !== '')

    if (x.length === 2) {
      memory = memory.split('')
      let lastOperator = memory.pop()
      memory = memory.join('')
      operator()
      memory += lastOperator
      display.value += lastOperator
      console.log(memory)
    } else {
      operator()
    }
  } else if (e.target.textContent.match(/[!%√\.]/)) {
    display.value += e.target.textContent
    memory += e.target.textContent
  } else if (e.target.textContent === '=') {
    if (operator()) {
      operator()
    } else {
      display.value = 'Syntax Error'
      memory = ''
    }
  } else if (e.target.textContent === 'C') {
    display.value = ''
    memory = ''
  } else if (e.target.textContent === '') {
    let strArr = memory.split('')
    strArr.pop()
    memory = strArr.join('')
    display.value = strArr.join('')
  } else if (e.target.textContent === 'AC') {
    display.value = ''
    memory = ''
  }
}

keys.forEach((key) => key.addEventListener('click', takeInput))

/* taking input from keyboard key and the operator will based on display */
document.body.addEventListener('keydown', (e) => {
  if (e.key.match(/\d/g) && e.key.length === 1) {
    display.value += e.key
    memory += e.key
  } else if (e.key.match(/[\+\-\*\/%\^!]/g) && !e.key.match(/[!%]/)) {
    display.value += e.key
    memory += e.key
    let x = memory.split(/[\+\-\*/\^]/).filter((num) => num !== '')

    if (x.length === 2) {
      memory = memory.split('')
      let lastOperator = memory.pop()
      memory = memory.join('')
      operator()
      memory += lastOperator
      display.value += lastOperator
      console.log(memory)
    } else {
      operator()
    }
  } else if (e.key.match(/[!%\.]/)) {
    display.value += e.key
    memory += e.key
  } else if (e.key === 'Backspace') {
    let displayArr = display.value.split('')
    displayArr.pop()
    display.value = displayArr.join('')
    let memoryArr = String(memory).split('')
    memoryArr.pop()
    memory = memoryArr.join('')
  } else if (e.key == 'Enter') {
    if (operator()) {
      operator()
    } else {
      display.value = 'Syntax Error'
      memory = ''
    }
  }
})
