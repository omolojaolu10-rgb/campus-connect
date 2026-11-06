
import { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Amina Yusuf',
      department: 'Computer Science',
      courses: ['CSC 301', 'CSC 305'],
      interests: ['Technology', 'Reading'],
    },
    {
      id: 2,
      name: 'Daniel James',
      department: 'Software Engineering',
      courses: ['CSC 301', 'SEN 302'],
      interests: ['Coding', 'Football'],
    },
    {
      id: 3,
      name: 'Sarah Ade',
      department: 'Information Technology',
      courses: ['IFT 301', 'CSC 305'],
      interests: ['Design', 'Music'],
    },
  ]);

  function handleConnect(studentId) {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === studentId
          ? { ...student, connected: !student.connected }
          : student
      )
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2>CampusConnect</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#discover">Discover</a>
          <a href="#community">Community</a>
        </div>

        <button className="login-btn">Login</button>
      </nav>

      <section className="hero" id="home">
        <p className="tagline">YOUR CAMPUS. YOUR COMMUNITY.</p>

        <h1>
          Find Your People.
          <br />
          Build Your Future.
        </h1>

        <p className="description">
          Connect with coursemates, find study partners,
          share academic resources and build meaningful
          relationships at Babcock University.
        </p>

        <button className="join-btn">
          Join CampusConnect
        </button>
      </section>

      <section className="discover" id="discover">
        <div className="section-heading">
          <p className="tagline">MAKE NEW CONNECTIONS</p>
          <h2>Discover Students</h2>
          <p>
            Find people who share your courses,
            interests and academic goals.
          </p>
        </div>

        <div className="student-grid">
          {students.map((student) => (
            <div className="student-card" key={student.id}>
              <div className="profile-avatar">
                {student.name.charAt(0)}
              </div>

              <h3>{student.name}</h3>

              <p className="department">
                {student.department}
              </p>

              <div className="profile-details">
                <strong>Courses</strong>
                <p>{student.courses.join(' · ')}</p>

                <strong>Interests</strong>
                <p>{student.interests.join(' · ')}</p>
              </div>

              <button
                className={
                  student.connected
                    ? 'connected-btn'
                    : 'connect-btn'
                }
                onClick={() => handleConnect(student.id)}
              >
                {student.connected ? 'Connected ✓' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
