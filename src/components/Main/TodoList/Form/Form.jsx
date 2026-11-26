import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialValues = {
  title: "",
  desc: "",
};

const Form = ({addTasks, errorMessage, taskToEdit, onAddTasksEdited}) => {
  //estado inicial del formulario
  const [values, setValues] = useState(taskToEdit || initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Si pasados 20 segundos no envias la tarea que has escrito fase 2
  useEffect(() => {
    const id = setTimeout(() => setValues(initialValues), 20000);
    return () => clearTimeout(id);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    //Validacion: La tarea introducida en el input debe tener al menos 6 caracteres
    if (values.title.length >= 6) {
      
      if (taskToEdit) {
        onAddTasksEdited(values)

      }else{
        //¿Por qué isDone= false? Porque una tarea que acabas de crear todavía no está hecha
        const newTask = { ...values, isDone: false, _id: uuidv4() };

        addTasks(newTask);
      }

      //se borrará inmediatamente lo que habíamos escrito en el input
      setValues(initialValues);

      //mensaje de error si no cumple
    } else errorMessage("Error: Tu tarea debe tener un minimo de 6 caracteres");
  };

  return (
    <div >
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
    </div>
  );
};

export default Form;
