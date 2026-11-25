import "./TodoItem.css";

const TodoItem = ({ data, onRemove, setValues }) => {
  const { title, desc, _id} = data;


  return (
      <li className="todo-item">
          <p>{title || "--"}</p>
          <p>{desc || "--"}</p>
          <button onClick={() => onRemove(_id)}>BORRAR</button>
      </li>

  );
};

export default TodoItem;
