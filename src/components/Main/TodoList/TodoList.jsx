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
  const onRemoveTask = (id) => {
    const remainingTasks = tasks.filter((task) => task._id !== id);
    //remainingTasks guarda las tareas que se quedan

    setTasks(remainingTasks);
  };

  const [taskToEdit, setTaskToEdit] = useState(null); //Hay un objeto en el estado

  //Objetivo, tarea a editar
  const onEditTask = (id) => {
    const findData = tasks.find((data) => data._id === id); //
    setTaskToEdit(findData); //Guardo la tarea entera
  };

  const editedTasks = (editedTask) => {
    const remainingEditedTask = tasks.map((task) =>
      task._id === editedTask._id ? editedTask : task,
    ); // Si el _id coincide, devuelve la editada; si no, deja la que había.

    setTasks(remainingEditedTask);
    setTaskToEdit(null); // para que el Form de editar desaparezca.
  };

  //Renderizar los datos
  const paintData = () =>
    tasks.map((task) => (
      <TodoItem
        key={task._id}
        data={task}
        onRemoveTask={onRemoveTask}
        onEditTask={onEditTask}
      />
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
      <Form addTasks={onAdd} errorMessage={setMessage} />
      {/*Pasarle la prop de text a Mesaage para que lo pinte*/}
      <Messages text={message} />
      {taskToEdit && (
        <Form
          taskToEdit={taskToEdit}
          onAddTasksEdited={editedTasks}
          errorMessage={setMessage}
          key={taskToEdit._id}
        />
      )}
      <ul>{paintData()}</ul>
      {/*Para borrar todas las tareas*/}
      <button onClick={removeData}>CLEAR</button>
      <button onClick={resetData}>RESET</button>
    </div>
  );
};

export default TodoList;
