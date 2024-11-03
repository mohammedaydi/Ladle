import "./Checkbox.css";

const Checkbox = ({ id, onChange, value, label, name }) => {
  return (
    <div className="checkbox-container">
      <label htmlFor={id}>{label}</label>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Checkbox;
