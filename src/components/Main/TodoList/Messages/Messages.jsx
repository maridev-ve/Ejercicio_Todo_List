const Messages = ({text}) => {
  return <div>
      {text ? <h2>{text}</h2> : null}
  </div>;
};

export default Messages;
