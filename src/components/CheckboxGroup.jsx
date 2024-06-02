const CheckboxGroup = ({ title, options, selectedOptions, handleChange }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg mb-2">{title}</h3>
      {options.map((option) => (
        <label key={option} className="block">
          <input
            type="checkbox"
            name={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleChange(option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
