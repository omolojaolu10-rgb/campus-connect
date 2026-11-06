/**
 * Shows one student.
 * Props:
 *  - student: { id, name, department, courses[], interests[], connected }
 *  - onToggleConnect(studentId): called when the button is clicked
 */
function StudentCard({ student, onToggleConnect }) {
  const { id, name, department, courses, interests, connected } = student

  return (
    <article className="student-card">
      <div className="profile-avatar" aria-hidden="true">
        {name.charAt(0)}
      </div>

      <h3>{name}</h3>
      <p className="department">{department}</p>

      <div className="profile-details">
        <strong>Courses</strong>
        <p>{courses.join(' · ')}</p>

        <strong>Interests</strong>
        <p>{interests.join(' · ')}</p>
      </div>

      <button
        type="button"
        className={connected ? 'connected-btn' : 'connect-btn'}
        aria-pressed={connected}
        aria-label={`${connected ? 'Disconnect from' : 'Connect with'} ${name}`}
        onClick={() => onToggleConnect(id)}
      >
        {connected ? 'Connected ✓' : 'Connect'}
      </button>
    </article>
  )
}

export default StudentCard