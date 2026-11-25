import { useState } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";
import { useEffect } from "react";

const initialValues = {
  title: "",
  desc: "",
};

const TodoList = () => {
  //tasks guardadas en el estado
  const [tasks, setTasks] = useState([]);

  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch("/data/tasks.json");
        const data = await res.json();
        setTasks(data);
        setInitialData(data);
      } catch (error) {
        console.error("Message: error al intentar", error);
      }
    };

    getTasks();
  }, []);

  
  //estado inicial del formulario
  const [values, setValues] = useState(initialValues);
  
  useEffect( () => {
    const id = setTimeout(() => setValues(initialValues), 2000)
    return () => clearTimeout(id)
  }, [values]);

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
    setValues(initialValues);
  };

  //Objetivo: Borrar cada tarea item
  const removeTask = (id) => {
    const remainingTasks = tasks.filter((task) => task._id !== id);
    //remainingTasks guarda las tareas que se quedan

    setTasks(remainingTasks);
  };

  //Renderizar los datos
  const paintData = () =>
    tasks.map((task) => (
      <TodoItem key={task._id} data={task} onRemove={removeTask} />
    ));

  //Objetivo: Vaciar el array de items
  const removeData = () => setTasks([]);

  const resetData = () => setTasks(initialData);

  return (
    <div className="todo-list">
      TodoList
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tarea</label>
        <br />
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={values.title}
        />
        <br />

        <label htmlFor="desc">Description</label>
        <br />
        <input
          type="text"
          name="desc"
          onChange={handleChange}
          value={values.desc}
        />
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
