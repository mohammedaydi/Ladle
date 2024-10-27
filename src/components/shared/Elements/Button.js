import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={`btn-${props.size} btn-${props.color} ladle-button`}
      id={props.id}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
