import React, { Fragment, useState } from "react";

const EditTodo = ({todo}) =>{
    // console.log(todo);
    // const myid = todo.todo_id;
    // const mydescription = todo.description;
    const [description, setDescription] = useState(todo.description);

    const updateDescription = async (e) =>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos/"+String(todo.todo_id),{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            console.log(response);
            window.location="/";  //location("/") is not object location="/"
        } catch (err) {
            console.error(err.message);
        }
    };

    return <Fragment >
    <button type="button" 
        className="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target={"#id"+String(todo.todo_id)}>Edit</button>

{/* here target and id use diff id so that each id will have its input not only first input in each modal */}

    <div className="modal" id={"id"+String(todo.todo_id)}>
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Modal Heading</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                    onClick={()=>setDescription(todo.description)}></button>
                </div>

                <div className="modal-body">
                    <input type="text" className="form-control" 
                    value={description}
                    onChange={e=>setDescription(e.target.value)} />

                </div>

                <div className="modal-footer">
                    <button type="button" 
                        className="btn btn-warning" 
                        data-bs-dismiss="modal"
                        onClick={e=>updateDescription(e)}>Edit</button>
                    <button type="button" 
                        className="btn btn-danger" 
                        data-bs-dismiss="modal"
                        onClick={()=>setDescription(todo.description)}>Close</button>
                </div>

            </div>
        </div>
    </div>

    </Fragment>
};

export default EditTodo;