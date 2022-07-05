// hello worldの表示
console.log('hello world')

// タスクの配列を作成
let tasks = [
  {
    id: 1,
    name: 'task1',
    status: 'progress'
  },
  {
    id: 2,
    name: 'task2',
    status: 'progress'
  },
  {
    id: 3,
    name: 'task3',
    status: 'progress'
  }
]

// 完了済みのタスクの件数
doneTask()

// タスクの総件数表示
totalTask()

// taskの初期表示
tasks.forEach((task) => {
  additionTask(task)
})

// 新いタスクの追加
let submitButton = document.getElementById('submit')

submitButton.addEventListener('click', function addTask() {
  let newValue = document.getElementById('addTaskName').value
  
  if(newValue == ''){
    window.alert('タスク名を入力してください！')
  }else if(tasks.filter(task => task.name == newValue).length != 0){
    window.alert('そのタスク名は既に存在しています！')
  }else{
    console.log(newValue)
    document.getElementById('addTaskName').value = ''
    tasks.push({id: tasks.length + 1, name: newValue, status: 'progress'})
    additionTask(tasks.find(task => task.id == tasks.length))
    console.log(tasks)
    totalTask()
  }
}, false)

// table要素にtaskListの中身を表示する処理の本体
function additionTask(task) {
  let taskList = document.getElementById('taskList')
  
  let row = taskList.insertRow(-1)
  row.setAttribute('id', `row-${task.id}`)

  let taskName = row.insertCell(-1)
  let status = row.insertCell(-1)
  let delete_link = row.insertCell(-1)

  taskName.innerHTML = task.name
  taskName.setAttribute('id', `task-${task.id}`)
  status.innerHTML = `<button id="${task.id}" class="btn" onclick="changeStatus(event)">done</button>`
  delete_link.innerHTML = `<button id="delete-${task.id}" class="btn btn-danger" onclick="deleteTask(event)">delete</button>`
}

// タスク完了ボタンを押したときにストライクスルーにし、再開したら元通りにできるようにする
function changeStatus(event) {
  let target = document.getElementById(`task-${event.target.id}`)
  let targetId = target.id.split('-')[1]
  if(target.classList.contains('done') == true){
    target.innerHTML = `<span>${target.innerText}</span>`
    target.classList.remove('done')
    event.target.innerText = 'done'
    event.target.classList.remove('btn-success')
    let task = tasks.find(task => task.id == targetId)
    task.status = 'progress'
    console.log(tasks)
    doneTask()
  }else{
    target.innerHTML = `<del class='bg-light'>${target.innerText}</del>`
    target.classList.add('done')
    event.target.innerText = 'start'
    event.target.classList.add('btn-success')
    let task = tasks.find(task => task.id == targetId)
    task.status = 'done'
    console.log(tasks)
    doneTask()
  }
}

// タスク削除機能
function deleteTask(event) {
  let targetId = event.target.id.split('-')[1]
  let row = document.getElementById(`row-${targetId}`)
  row.remove()
  let target = tasks.find(task => task.id == targetId)
  tasks = tasks.filter(task=> task.id != target.id)
  console.log(tasks)
  totalTask()
  doneTask()
}

// タスクの件数表示本体
function totalTask() {
  let total = document.getElementById('task-total')
  total.innerText = `total: ${tasks.length}`
}

// タスクの完了件数表示本体
function doneTask() {
  let doneTasks = tasks.filter(task => task.status === 'done')
  let done = document.getElementById('task-done')
  done.innerText = `done: ${doneTasks.length}`
}