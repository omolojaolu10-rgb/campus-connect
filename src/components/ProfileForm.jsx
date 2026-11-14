import { useState } from 'react'
import FormInput from './FormInput'
import TagInput from './TagInput'
import { DEPARTMENTS, LEVELS } from '../config/appConfig'
import useAuth from '../hooks/useAuth'
import {
  validateBio,
  validateDepartment,
  validateLevel,
  validateTags,
} from '../utils/validators'

const FIELD_NAMES = [
  'bio',
  'department',
  'level',
  'courses',
  'skills',
  'interests',
]

function getFieldError(name, value) {
  if (name === 'bio') return validateBio(value)
  if (name === 'department') return validateDepartment(value)
  if (name === 'level') return validateLevel(value)

  return validateTags(value, {
    min: name === 'courses' ? 1 : 0,
    max: 10,
  })
}

function getFormErrors(values) {
  return Object.fromEntries(
    FIELD_NAMES.map((name) => [name, getFieldError(name, values[name])]),
  )
}

function ProfileForm({ values, onChange }) {
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [isSaved, setIsSaved] = useState(false)
  const { updateProfile } = useAuth()

  function handleChange(name, value) {
    onChange(name, value)
    setIsSaved(false)

    if (touched[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: getFieldError(name, value),
      }))
    }
  }

  function handleBlur(name) {
    setTouched((previous) => ({ ...previous, [name]: true }))
    setErrors((previous) => ({
      ...previous,
      [name]: getFieldError(name, values[name]),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched(Object.fromEntries(FIELD_NAMES.map((name) => [name, true])))

    const validationErrors = getFormErrors(values)
    setErrors(validationErrors)
    if (Object.values(validationErrors).some(Boolean)) return

    updateProfile({
      bio: values.bio.trim(),
      department: values.department,
      level: values.level,
      courses: values.courses.map((tag) => tag.trim()),
      skills: values.skills.map((tag) => tag.trim()),
      interests: values.interests.map((tag) => tag.trim()),
    })
    setIsSaved(true)
  }

  return (
    <form className="profile-form" noValidate onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows="4"
          maxLength={300}
          value={values.bio}
          onChange={(event) => handleChange('bio', event.target.value)}
          onBlur={() => handleBlur('bio')}
          aria-invalid={Boolean(touched.bio && errors.bio)}
          aria-describedby={`bio-counter${errors.bio ? ' bio-error' : ''}`}
        />
        <p className="bio-counter" id="bio-counter" aria-live="polite">
          {values.bio.length}/300
        </p>
        {touched.bio && errors.bio && (
          <p className="field-error" id="bio-error" role="alert">
            {errors.bio}
          </p>
        )}
      </div>

      <FormInput
        label="Department"
        name="department"
        type="select"
        value={values.department}
        onChange={(event) => handleChange('department', event.target.value)}
        onBlur={() => handleBlur('department')}
        error={touched.department ? errors.department : ''}
        options={DEPARTMENTS}
      />
      <FormInput
        label="Level"
        name="level"
        type="select"
        value={values.level}
        onChange={(event) => handleChange('level', event.target.value)}
        onBlur={() => handleBlur('level')}
        error={touched.level ? errors.level : ''}
        options={LEVELS.map(String)}
      />

      <TagInput
        label="Courses"
        name="courses"
        tags={values.courses}
        onChange={(tags) => handleChange('courses', tags)}
        placeholder="e.g. CSC 301"
        maxTags={10}
        maxLength={50}
        error={touched.courses ? errors.courses : ''}
        helpText="Add at least one course, up to 10."
      />
      <TagInput
        label="Skills"
        name="skills"
        tags={values.skills}
        onChange={(tags) => handleChange('skills', tags)}
        placeholder="e.g. Research"
        maxTags={10}
        maxLength={50}
        error={touched.skills ? errors.skills : ''}
        helpText="Up to 10 skills."
      />
      <TagInput
        label="Interests"
        name="interests"
        tags={values.interests}
        onChange={(tags) => handleChange('interests', tags)}
        placeholder="e.g. Artificial intelligence"
        maxTags={10}
        maxLength={50}
        error={touched.interests ? errors.interests : ''}
        helpText="Up to 10 interests."
      />

      {isSaved && (
        <p className="profile-save-success" role="status">
          Profile saved.
        </p>
      )}
      <button className="registration-submit" type="submit">
        Save profile
      </button>
    </form>
  )
}

export default ProfileForm
