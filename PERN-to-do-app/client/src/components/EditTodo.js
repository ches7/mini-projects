import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {

    const [description, setDescription] = useState(todo.description);

    const editDescription = async e => {
            e.preventDefault();
        try {
            const body = { description };
            console.log(JSON.stringify(body))
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                header: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log(response)
            // window.location = "/";
        } catch (error) {
            console.error(error.message)
        }
    }

    return (<Fragment>
        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`} >
            Edit
        </button>

        <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}></button>
                    </div>

                    <div className="modal-body">
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e => editDescription(e)}>Edit</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>)
};

export default EditTodo;