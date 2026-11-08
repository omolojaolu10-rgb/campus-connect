import { useState } from 'react'
import StudentList from '../components/StudentList'
import { sampleStudents } from '../data/sampleStudents'

function DiscoverPage() {
  const [students, setStudents] = useState(sampleStudents)

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
    <main>
      <section className="discover">
        <div className="section-heading">
          <p className="tagline">MAKE NEW CONNECTIONS</p>
          <h2>Discover Students</h2>
          <p>
            Find people who share your courses, interests and academic goals.
          </p>
        </div>

        <StudentList
          students={students}
          onToggleConnect={handleToggleConnect}
        />
      </section>
    </main>
  )
}

export default DiscoverPage
