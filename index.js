// hello worldの表示
console.log('hello world')

// タスクの配列を作成
let tasks = ['task1', 'task2', 'task3']

// タスクの総件数
let tasksLength = tasks.length

// 完了済みのタスクの件数
let doneTasksLength = 0

// タスクの総件数表示
totalTask()

// 完了済みタスクの件数
doneTask(0)

// taskの初期表示
tasks.forEach((task, index) => {
  additionTask(task, index)
})

// formのsubmitボタンが押された時にタスクリストに新たな要素を追加する
let submitButton = document.getElementById('submit')

submitButton.addEventListener('click', function addTask() {
  let newTask = document.getElementById('addTaskName').value
  
  if(newTask != ''){
    console.log(newTask)
    additionTask(newTask, tasks.length)
    document.getElementById('addTaskName').value = ''
    tasks.push(newTask)
  }else{
    window.alert('タスク名を入力してください！')
  }
}, false)

// table要素にtaskListの中身を表示する処理の本体
function additionTask(task, index) {
  let taskList = document.getElementById('taskList')
  
  let row = taskList.insertRow(-1)
  row.setAttribute('id', `row-${index}`)

  let taskName = row.insertCell(-1)
  let status = row.insertCell(-1)
  let delete_link = row.insertCell(-1)

  taskName.innerHTML = task
  taskName.setAttribute('id', `task-${index}`)
  status.innerHTML = `<button id="${index}" class="btn" onclick="changeStatus(event)">done</button>`
  delete_link.innerHTML = `<button id="delete-${index}" class="btn btn-danger" onclick="deleteTask(event)">delete</button>`
}

// タスク完了ボタンを押したときにストライクスルーにし、再開したら元通りにできるようにする
function changeStatus(event) {
  let target = document.getElementById(`task-${event.target.id}`)
  if(target.classList.contains('done') == true){
    target.innerHTML = `<span>${target.innerText}</span>`
    target.classList.remove('done')
    event.target.innerText = 'done'
    event.target.classList.remove('btn-success')
    doneTask(-1)
  }else{
    target.innerHTML = `<del class='bg-light'>${target.innerText}</del>`
    target.classList.add('done')
    event.target.innerText = 'start'
    event.target.classList.add('btn-success')
    doneTask(1)
  }
}

function deleteTask(event) {
  let targetId = event.target.id.split('-')[1]
  let row = document.getElementById(`row-${targetId}`)
  row.remove()
  tasksLength -= 1
  totalTask()
}

// タスクの件数表示本体
function totalTask() {
  let total = document.getElementById('task-total')
  total.innerText = `total: ${tasksLength}`
}

// タスクの完了件数表示本体
function doneTask(int) {
  doneTasksLength += int
  let done = document.getElementById('task-done')
  done.innerText = `done: ${doneTasksLength}`
}