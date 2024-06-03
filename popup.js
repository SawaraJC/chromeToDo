document.addEventListener('DOMContentLoaded', function() {
    console.log('Popup DOM loaded');
    const todoList = document.getElementById('todos');
    const newTodoInput = document.getElementById('new-todo');
    const addTodoButton = document.getElementById('add-todo');
  
    // Function to add a new to-do
    function addTodo() {
      const newTodo = newTodoInput.value.trim();
      if (newTodo) {
        console.log('Adding new to-do:', newTodo);
        const li = document.createElement('li');
        li.textContent = newTodo;
        li.addEventListener('click', function() {
          li.classList.toggle('done');
          updateTodoList();
        });
        todoList.appendChild(li);
        newTodoInput.value = '';
        updateTodoList();
      }
    }
  
    // Function to update the to-do list in storage
    function updateTodoList() {
      const todos = [];
      todoList.querySelectorAll('li').forEach(todo => {
        if (!todo.classList.contains('done')) {
          todos.push(todo.textContent);
        }
      });
      chrome.storage.sync.set({ todos: todos }, function() {
        console.log('To-do list updated');
      });
    }
  
    // Load to-dos from storage
    chrome.storage.sync.get(['todos'], function(result) {
      console.log('Loaded to-dos:', result.todos);
      const todos = result.todos || [];
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo;
        li.addEventListener('click', function() {
          li.classList.toggle('done');
          updateTodoList();
        });
        todoList.appendChild(li);
      });
    });
  
    // Add new to-do
    addTodoButton.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTodo();
      }
    });
  });
  