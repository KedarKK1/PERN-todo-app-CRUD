import React, { Fragment, useState } from "react";

const InputTodo = () =>{
    
    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {  description };
            const response = await fetch("http://localhost:5000/todos",
            {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })
            // console.log(response);
            window.location=("/"); //once response has been sent its going to refresh and show the changes
        } catch (err) {
            console.error(err.message);
        }
    };

    return <Fragment>
        <h1 className="text-center mt-5">This is input todo page</h1>
        <form className="text-center d-flex justify-content-center" onSubmit={onSubmitForm}>

            <div className="form-floating">
                <input className="form-control" 
                value={ description  } 
                onChange={e => setDescription(e.target.value)}
                id="floatingInput"
                placeholder="todo"
                autoComplete="off" />

            </div>
            {/* <label htmlFor="floatingInput">Enter task</label> */}

            <button className="btn btn-success">Add</button>

        </form>
    </Fragment>
};

export default InputTodo;