// hello worldの表示
console.log('hello world')

// タスクの配列を作成
let tasks = ['task1', 'task2', 'task3']

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
    additionTask(newTask, (tasks.length))
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
  }else{
    target.innerHTML = `<del class='bg-light'>${target.innerText}</del>`
    target.classList.add('done')
    event.target.innerText = 'start'
    event.target.classList.add('btn-success')
  }
}

function deleteTask(event) {
  let targetId = event.target.id.split('-')[1]
  let row = document.getElementById(`row-${targetId}`)
  row.remove()
}