import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo"; //yahape jo first folder banta hai wohi file se import hota hai
// yani yaha ki spelling hamesha check kare

// useEffect is going to fetch api everytime when this component is rendered 

const ListToDos = () =>{

    const [todos, setTodos] = useState([]);

// to delete a member
    const deleteTodo = async id =>{
        try {
            const deleteTodo = await fetch('http://localhost:5000/todos/'+String(id),{ 
                //here do not use'http..../${id}' because it will not work
                method:"DELETE"
            });
            setTodos(todos.filter(todo=>todo.todo_id!==id));
            // using filters to show only those whoose id is not the one's id we just deleted
            // this helps us to not reload page everytime we delete a function
            // console.log(deleteTodo);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTodos = async () => {
        try {
          const response = await fetch("http://localhost:5000/todos");
          const jsonData = await response.json();
    
          setTodos(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      };
    
      useEffect(() => {
        getTodos();
      }, []);
    // this [] is because it is gonna askl for many many requests. To prevent it
    // we have to use [] to get only one request

    // console.log(todos); //for testing purpose
    
    return <Fragment >
        {" "}
        <h1 className="text-center mt-5">List to do</h1>
        <table className="text-center table table-hover mt-3">
            <thead>
            <tr>
                <th>Description</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
                {/* 

            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
            </tr>                
                
                */}

                {todos.map(todo=>(
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td><EditTodo todo={todo} /></td>
                        <td><button className="btn btn-danger"
                            onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            
            </tbody>
        </table>
    </Fragment>
};

export default ListToDos;