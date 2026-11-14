import { useState } from 'react'

function TagInput({
  label,
  name,
  tags,
  onChange,
  placeholder,
  maxTags = Number.POSITIVE_INFINITY,
  maxLength = 100,
  error,
  helpText,
}) {
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')
  const errorId = `${name}-error`
  const helpId = `${name}-help`
  const messageId = `${name}-message`
  const describedBy = [
    error && errorId,
    helpText && helpId,
    message && messageId,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  function addTag(value = inputValue) {
    const tag = value.trim()
    if (!tag) return

    if (tag.length > maxLength) {
      setMessage(`Tags must be ${maxLength} characters or fewer.`)
      return
    }
    if (tags.length >= maxTags) {
      setMessage(`You can add no more than ${maxTags} tags.`)
      return
    }
    if (tags.some((existingTag) => existingTag.toLowerCase() === tag.toLowerCase())) {
      setMessage('That tag has already been added.')
      return
    }

    onChange([...tags, tag])
    setInputValue('')
    setMessage('')
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag()
    }
  }

  function removeTag(tagToRemove) {
    onChange(tags.filter((tag) => tag !== tagToRemove))
    setMessage('')
  }

  return (
    <div className="form-field tag-field">
      <label htmlFor={name}>{label}</label>
      <div className="tag-input-row">
        <input
          id={name}
          name={name}
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value)
            setMessage('')
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-invalid={Boolean(error || message)}
          aria-describedby={describedBy}
        />
        <button
          type="button"
          className="tag-add-button"
          onClick={() => addTag()}
        >
          Add
        </button>
      </div>

      {helpText && (
        <p className="field-help" id={helpId}>
          {helpText}
        </p>
      )}
      {error && (
        <p className="field-error" id={errorId} role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="field-error" id={messageId} role="alert">
          {message}
        </p>
      )}

      <ul className="tag-list" aria-label={`${label} added`}>
        {tags.map((tag) => (
          <li className="profile-tag" key={tag}>
            <span>{tag}</span>
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => removeTag(tag)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TagInput
