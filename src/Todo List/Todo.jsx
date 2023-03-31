import React from "react";
import { useState } from "react";
import "../Todo List/Todo.css";

function Todo() {
  const [inputTodo, setinputTodo] = useState();
  const [todoList, settodoList] = useState([]);
  const [editId, seteditId] = useState(0);

  const addTodo = () => {
    if (editId) {
      const editedTodo = todoList.find((todo) => todo.id === editId);
      const updatedTodos = todoList.map((todo) =>
        todo.id === editedTodo.id
          ? (todo = { id: todo.id, inputTodo })
          : { id: todo.id, inputTodo: todo.inputTodo }
      );

      settodoList(updatedTodos);
      seteditId(0);
      setinputTodo("");

      return;
    }

    if (inputTodo !== "") {
      settodoList([
        { id: `${inputTodo}-${Date.now()}`, inputTodo },
        ...todoList,
      ]);
      setinputTodo("");
    }
  };

  const deleteTodo = (deleteTodoId) => {
    const afterDeletedTodo = todoList.filter(
      (todo) => todo.id !== deleteTodoId
    );

    settodoList([...afterDeletedTodo]);
  };

  const updateTodo = (editTodoId) => {
    const editedTodo = todoList.find((todo) => todo.id === editTodoId);
    setinputTodo(editedTodo.inputTodo);
    seteditId(editTodoId);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="todo-main col-lg-12">
          <div className="todo-submain col-lg-6 offset-lg-3">
            <h1 className="">THINGS TO DO</h1>
            <div className="todo-content">
              <div className="todo">
                <input
                  type="text"
                  placeholder="Add New"
                  value={inputTodo}
                  onChange={(e) => setinputTodo(e.target.value)}
                />
                <button className="btn btn-success" onClick={() => addTodo()}>
                  {editId ? "Edit" : "Add"}
                </button>
              </div>
              {todoList.map((todo) => (
                <>
                  <div className="todo-list">
                    <h6 key={todo.id}>{todo.inputTodo}</h6>
                    <div className="action-buttons">
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => updateTodo(todo.id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
