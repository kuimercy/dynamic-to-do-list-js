
document.addEventListener('DOMContentLoaded', () => {
   
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    function addTask(taskText, save = true) {
        
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

      
        const li = document.createElement('li');
        li.textContent = taskText;

        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        
        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTask(taskText);
        };

        
        li.appendChild(removeButton);

        
        taskList.appendChild(li);

        
        taskInput.value = "";

    
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }


    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    
    addButton.addEventListener('click', () => addTask(taskInput.value.trim()));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });


    loadTasks();
});

