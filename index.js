
var input = document.querySelector('input')
var button = document.querySelector('button')
var form = document.querySelector('form')
var todos = document.querySelector('.content')

form.addEventListener('submit', function(event){
    event.preventDefault();
    let val = input.value.trim()
    if(val){
        addTodoElement({
            text: val,
        })
        saveTodoList
    }

    input.value = ''
})


function addTodoElement(todo) {
    var li = document.createElement('li');
    li.innerHTML = `
      <span>${todo.text}</span>
      <i class="fa-solid fa-hammer edit"></i>
      <i class="fa-solid fa-trash-can delete"></i>
    `;
  
    if (todo.status === 'completed') {
      li.setAttribute('class', 'completed');
    }
  
    li.querySelector('.edit').addEventListener('click', function() {
      const span = this.parentElement.querySelector('span');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.innerText;
      input.addEventListener('blur', function() {
        const newValue = this.value.trim();
        if (newValue) {
          span.innerText = newValue;
          saveTodoList();
        } else {
          this.value = span.innerText;
        }
        span.style.display = 'inline';
        this.remove();
      });
      span.style.display = 'none';
      this.parentElement.insertBefore(input, span);
      input.focus();
    });
  
    li.querySelector('.delete').addEventListener('click', function() {
      this.parentElement.remove();
      saveTodoList();
    });
  
    li.addEventListener('click', function() {
      this.classList.toggle('completed');
      saveTodoList();
    });
  
    todos.appendChild(li);
  }
  
  


function saveTodoList(){
    let todoList = document.querySelectorAll('li')
    let todoStorage = []
    todoList.forEach(function(item){
        let text = item.querySelector('span').innerText
        let status = item.getAttribute('class')
        todoStorage.push({
            text,
            status
        })
    })
    localStorage.setItem('todolist', JSON.stringify(todoStorage))
}

function init(){
    let data = JSON.parse(localStorage.getItem('todolist'))
    data.forEach(function(item){
        addTodoElement(item)
    })
}

init()