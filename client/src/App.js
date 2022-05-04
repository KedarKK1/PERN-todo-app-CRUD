import React, { Fragment } from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import ListToDos from './components/ListTodos';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListToDos />
      </div>
    </Fragment>
  );
}

export default App;
