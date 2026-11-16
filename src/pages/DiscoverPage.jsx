import { useState } from 'react'
import StudentList from '../components/StudentList'
import { sampleStudents } from '../data/sampleStudents'
import usePageTitle from '../hooks/usePageTitle'

function DiscoverPage() {
  const [students, setStudents] = useState(sampleStudents)
  usePageTitle('Discover Students')

  function handleToggleConnect(studentId) {
    setStudents((previous) =>
      previous.map((student) =>
        student.id === studentId
          ? { ...student, connected: !student.connected }
          : student,
      ),
    )
  }

  return (
    <section className="discover">
      <div className="section-heading">
        <p className="tagline">MAKE NEW CONNECTIONS</p>
        <h1>Discover Students</h1>
        <p>
          Find people who share your courses, interests and academic goals.
        </p>
      </div>

      <StudentList
        students={students}
        onToggleConnect={handleToggleConnect}
      />
    </section>
  )
}

export default DiscoverPage
