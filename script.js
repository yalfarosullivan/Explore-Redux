// DOM elements
const valueEl = document.getElementById('value')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plus-five')
const minusFiveBtn = document.getElementById('minus-five')
const incrementOddBtn = document.getElementById('increment-odd')
const incrementAsyncBtn = document.getElementById('increment-async')
const addCustomBtn = document.getElementById('input-submit')
const customInput = document.getElementById('custom-input')

// initial state value
const initialState = {
    value: 0
}

// reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/plusFive':
            return { value: state.value + 5 }
        case 'counter/minusFive':
            return { value: state.value - 5 }
        case 'counter/custom':
            return { value: state.value + action.payload }
        default:
        return state
    }
}

// action object definitions
const addAction = {
  type: 'counter/incremented'
}

const subAction = {
  type: 'counter/decremented'
}

const addFiveAction = {
  type: 'counter/plusFive'
}

const subFiveAction = {
  type: 'counter/minusFive'
}


// generating the store
let store = Redux.createStore(counterReducer)

// defining render
const render = () => {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// establishing dispatch functions
const addOne = () => {
  store.dispatch(addAction)
}

const subOne = () => {
  store.dispatch(subAction)
}

const addFive = () => {
  store.dispatch(addFiveAction)
}

const subFive = () => {
  store.dispatch(subFiveAction)
}

const incrementOdd = () => {
  if(store.getState().value % 2 !== 0) {
    store.dispatch(addAction)
  }
}

const incrementAsync = () => {
  setTimeout(() => {
    store.dispatch(addAction)
  }, 1000);
}

const addCustom = () => {
  let num = +customInput.value
  store.dispatch({
    type: 'counter/custom',
    payload: num
  })
}

// event listeners
plusBtn.addEventListener('click', addOne)
minusBtn.addEventListener('click', subOne)
plusFiveBtn.addEventListener('click', addFive)
minusFiveBtn.addEventListener('click', subFive)
incrementOddBtn.addEventListener('click', incrementOdd)
incrementAsyncBtn.addEventListener('click', incrementAsync)
addCustomBtn.addEventListener('click', addCustom)


// initial render
render()

// subscribe reruns render on dispatch
store.subscribe(render)