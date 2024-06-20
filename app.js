const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let tasks = [];

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'todohome.html'));
// });

app.get('/addtask', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addTask.html'));
});

app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewTasks.html'));
});

app.get('/task/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    res.sendFile(path.join(__dirname, 'public', 'task.html'));
});

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/api/task/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

app.post('/addtask', (req, res) => {
    const { title, description } = req.body;
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id, title, description };
    tasks.push(newTask);
    res.redirect('/tasks');
});

app.post('/updatetask/:id', (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
        task.title = title;
        task.description = description;
    }
    res.redirect('/tasks');
});

app.post('/deletetask/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.redirect('/tasks');
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3000, () => {
    console.log("Server is running on port 3003");
});