import "./TodoItem.css";

const TodoItem = ({ data, onRemoveTask, onEditTask }) => {
  const { title, desc, _id} = data;


  return (
      <li className="todo-item">
          <p>{title || "--"}</p>
          <p>{desc || "--"}</p>
          <button onClick={() => onRemoveTask(_id)}>BORRAR</button>
          <button onClick={() => onEditTask(_id)}>EDITAR</button>
      </li>
  );
};

export default TodoItem;
