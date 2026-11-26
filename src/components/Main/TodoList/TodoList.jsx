import { useState } from "react";
import TodoItem from "./TodoItem";
import Messages from "./Messages";
import Form from "./Form/Form";
import "./TodoList.css";
import { useEffect } from "react";

const TodoList = () => {
  //tasks guardadas en el estado
  const [tasks, setTasks] = useState([]);

  const [initialData, setInitialData] = useState([]);

  const [message, setMessage] = useState("");

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


  //Cuando haya sido añadida una tarea se mostrará durante 5
  useEffect(() => {
    const id = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(id);
  }, [message]);

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

  //añadimos el objeto al array
  const onAdd = (newTask) => {
    setTasks([...tasks, newTask]);
    //Añade el mensaje cuando la tarea es creada
    setMessage("Tarea creada");
  };

  return (
    <div className="todo-list">
      <Form addTasks={onAdd} onError={setMessage} />
      {/*Pasarle la prop de text a Mesaage para que lo pinte*/}
      <Messages text={message} />
      <ul>{paintData()}</ul>
      {/*Para borrar todas las tareas*/}
      <button onClick={removeData}>CLEAR</button>
      <button onClick={resetData}>RESET</button>
    </div>
  );
};

export default TodoList;
