// MOCK ONLY. Replaced by the Flask API in Phase B. Never ship real credentials in frontend code.
export async function mockLogin(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (
    email.trim().toLowerCase() !== 'demo@student.babcock.edu.ng' ||
    password !== 'Password1'
  ) {
    throw new Error('Invalid email or password.')
  }

  return {
    id: 'demo-student',
    name: 'Demo Student',
    email: 'demo@student.babcock.edu.ng',
  }
}
