import { useState } from "react";
import TodoItem from "./TodoItem";
import initialTasks from "../../../data/tasks.json";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

const initialValues = {
  title: "",
  desc: "",
};

const TodoList = () => {
  //tasks guardadas en el estado
  const [tasks, setTasks] = useState(initialTasks);

  //estado inicial del formulario
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    const newTask = { ...values, isDone: false, _id: uuidv4() };
    //¿Por qué false? Porque una tarea que acabas de crear todavía no está hecha

    //añadimos el objeto al array
    setTasks([...tasks, newTask]);

    //se borrará inmediatamente lo que habíamos escrito en el input
    setValues(initialValues)
  };

  //Objetivo: Borrar cada tarea item
  const removeTask = (id) => {
    const remainingTasks = tasks.filter((task) => task._id !== id);
    //remainingTasks guarda las tareas que se quedan

    setTasks(remainingTasks);
  };

  //Renderizar los datos
  const paintData = () => tasks.map((task) => <TodoItem key={task._id} data={task} onRemove={removeTask} />);

  //Objetivo: Vaciar el array de items
  const removeData = () => setTasks([]);

  const resetData = () => setTasks(initialTasks);


  return (
    <div className="todo-list">
      TodoList
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tarea</label>
        <br />
        <input type="text" name="title" onChange={handleChange} values={} />
        <br />

        <label htmlFor="desc">Description</label>
        <br />
        <input type="text" name="desc" onChange={handleChange} value={} />
        <br />

        {values.title ? (
          <button type="submit">ADD</button>
        ) : (
          <b>Completa los campos</b>
        )}
      </form>
      <ul>{paintData()}</ul>
      {/*Para borrar todas las tareas*/}
      <button onClick={removeData}>CLEAR</button>
      <button onClick={resetData}>RESET</button>
    </div>
  );
};

export default TodoList;
