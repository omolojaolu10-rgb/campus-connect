import StudentCard from './StudentCard'

/**
 * Props:
 *  - students: array of student objects
 *  - onToggleConnect(studentId): passed down to each StudentCard
 */
function StudentList({ students, onToggleConnect }) {
  if (students.length === 0) {
    return <p className="empty-state">No students found.</p>
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onToggleConnect={onToggleConnect}
        />
      ))}
    </div>
  )
}

export default StudentList