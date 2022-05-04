const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

// middleware
app.use(cors());
// to get dadta from client side, below gives request to access json that body
app.use(express.json()); //req body


// ROUTES

// create a todo
app.post("/todos",async(req,res)=>{
    try {
        // console.log(req.body);
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", //this $ sign allow us to point some variables we're trying to add to our database
            // returning * is used whenever we are inserting, updating or deleting data, each time you have to return back data
            [description] //this descrition is from upper const{description} and it updates $1 function
        ); //this newTodo will be added to our database file
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos //yahape ./todos kiya toh server connect nahi hua :) /todos kiya to ho gaya :P
app.get("/todos", async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a todo
app.get("/todos/:id", async(req,res)=>{
    try {
        // console.log(req.params); //this will give {id:k (whatever you type localhost/todos/k)}
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo
app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateToDo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);
        res.json("todo updated successfully");
    } catch (err) {
        console.log(err.message);
    }
});

// delete a todo
app.delete("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("todo deleted successfully");
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(5000, ()=>{
    console.log('started hurray');
});