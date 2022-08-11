const todosContainer = document.querySelector('.todos-container')
const todoInput = document.getElementById('todo-input')
const form = document.getElementById('form')
const allBtn = document.getElementById('all')
const activeBtn = document.getElementById('activeBtn')
const completedBtn = document.getElementById('completed')

const allBtn2 = document.getElementById('all2')
const activeBtn2 = document.getElementById('activeBtn2')
const completedBtn2 = document.getElementById('completed2')

const filterButtons = document.querySelectorAll('.filter-buttons > p')
const itemsLeft = document.getElementById('items-left')
const clear = document.getElementById('clear')
const toggleBtn = document.getElementById('toggleBtn')

let data = []

const addTodo = (p, pushData = true) => {
  const div = document.createElement('div')
  const circle = document.createElement('div')
  const name = document.createElement('p')
  const img = document.createElement('img')
  img.setAttribute('src', './images/icon-cross.svg')
  div.classList.add('todo')
  div.todo = true
  div.drag = false
  circle.classList.add('circle')
  name.textContent = p
  div.append(circle, name, img)

  const finish = () => {
    if (!div.finish) {
      const img = document.createElement('img')
      img.setAttribute('src', './images/icon-check.svg')
      circle.appendChild(img)
      circle.img = img
      div.circle = circle
      circle.classList.add('done')
      name.classList.add('linethrough')
      div.finish = true
      updateItemsLeft()
      return
    }
    circle.classList.remove('done')
    name.classList.remove('linethrough')
    circle.removeChild(circle.img)
    div.finish = false
    updateItemsLeft()
  }


  circle.addEventListener('click', finish)
  name.addEventListener('click', finish)
  img.addEventListener('click', () => {
    removeToList(div)
    updateItemsLeft()
  })

  data.push(div)
  clearActive()
  allBtn.classList.add('active')
  allBtn2.classList.add('active')
  clearContainer()
  update(data)
  updateItemsLeft()
}

const updateItemsLeft = () => {
  const items = data.filter(x => !x.finish)
  itemsLeft.textContent = items.length
}

const update = (arr) => {
  arr.forEach(x => {
    todosContainer.append(x)
  })
}

const clearActive = () => {
  filterButtons.forEach(x => {
    x.classList.remove('active')
  })
}

const clearContainer = () => {
  while(todosContainer.firstChild) {
    todosContainer.removeChild(todosContainer.firstChild)
  }
}

const removeToList = div => {
  data = data.filter(x => x != div)
  todosContainer.removeChild(div)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addTodo(todoInput.value)
  todoInput.value = ''
})

allBtn.addEventListener('click', () => {
  clearActive()
  allBtn.classList.add('active')
  allBtn2.classList.add('active')
  clearContainer()
  update(data)
})

activeBtn.addEventListener('click', () => {
  clearActive()
  activeBtn.classList.add('active')
  activeBtn2.classList.add('active')
  clearContainer()
  const filtered = data.filter(x => !x.finish)
  update(filtered)
})

completedBtn.addEventListener('click', () => {
  clearActive()
  completedBtn.classList.add('active')
  completedBtn2.classList.add('active')
  clearContainer()
  const filtered = data.filter(x => x.finish)
  update(filtered)
})
allBtn2.addEventListener('click', () => {
  clearActive()
  allBtn.classList.add('active')
  allBtn2.classList.add('active')
  clearContainer()
  update(data)
})

activeBtn2.addEventListener('click', () => {
  clearActive()
  activeBtn.classList.add('active')
  activeBtn2.classList.add('active')
  clearContainer()
  const filtered = data.filter(x => !x.finish)
  update(filtered)
})

completedBtn2.addEventListener('click', () => {
  clearActive()
  completedBtn.classList.add('active')
  completedBtn2.classList.add('active')
  clearContainer()
  const filtered = data.filter(x => x.finish)
  update(filtered)
})

clear.addEventListener('click', () => {
  data = data.filter(x => !x.finish)
  clearActive()
  allBtn.classList.add('active')
  clearContainer()
  update(data)
})

let darkMode = true
toggleBtn.addEventListener('click', () => {
  if(darkMode){
    toggleBtn.setAttribute('src', './images/icon-moon.svg')
    darkMode = false
    document.body.classList.add('lightmode')
    return
  }
  toggleBtn.setAttribute('src', './images/icon-sun.svg')
  darkMode = true
  document.body.classList.remove('lightmode')
  return
})

