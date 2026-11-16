import { useState } from 'react'
import ProfileForm from '../components/ProfileForm'
import StudentCard from '../components/StudentCard'
import useAuth from '../hooks/useAuth'
import usePageTitle from '../hooks/usePageTitle'

function ProfilePage() {
  const { user } = useAuth()
  const [values, setValues] = useState(() => ({
    bio: user.profile.bio,
    department: user.profile.department,
    level: user.profile.level,
    courses: [...user.profile.courses],
    skills: [...user.profile.skills],
    interests: [...user.profile.interests],
  }))
  usePageTitle('Profile')

  function handleChange(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  const previewStudent = {
    id: user.id,
    name: user.name,
    department: values.department,
    courses: values.courses,
    interests: values.interests,
    connected: false,
  }

  return (
    <div className="profile-page">
      <div className="profile-page-heading">
        <p className="tagline">YOUR CAMPUS PROFILE</p>
        <h1>Edit your academic profile</h1>
        <p>Share what you study and what you are interested in.</p>
      </div>

      <div className="profile-layout">
        <section className="profile-panel" aria-labelledby="profile-form-title">
          <h2 id="profile-form-title">Academic details</h2>
          <ProfileForm values={values} onChange={handleChange} />
        </section>

        <section
          className="profile-preview"
          aria-labelledby="profile-preview-title"
        >
          <h2 id="profile-preview-title">Profile preview</h2>
          <StudentCard student={previewStudent} showConnectButton={false} />
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
