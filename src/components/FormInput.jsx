function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  options = [],
  autoComplete,
}) {
  const errorId = `${name}-error`
  const fieldProps = {
    id: name,
    name,
    value,
    onChange,
    onBlur,
    required: true,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    autoComplete,
  }

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      {type === 'select' ? (
        <select {...fieldProps}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...fieldProps} />
      )}
      {error && (
        <p className="field-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormInput
