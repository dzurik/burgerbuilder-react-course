import classes from './Input.module.scss';

const input = (props) => {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>{props.errorMessage}</p>
    );
  }

  if (props.elementType === 'input') {
    inputElement = (
      <input
        onChange={props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
      />
    );
  }

  if (props.elementType === 'textarea') {
    inputElement = (
      <textarea
        onChange={props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
      />
    );
  }

  if (props.elementType === 'select') {
    inputElement = (
      <select
        onChange={props.changed}
        className={inputClasses.join(' ')}
        value={props.value}
      >
        {props.elementConfig.options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
