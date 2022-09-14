import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  const registerUser = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/auth/register', {
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { user } = await response.json();
    if (user) {
    router.push(`/welcome?email=${user.email}`);
    console.log(`\\pages\\register.js\\Just registered ${user.email} to DB after calling the fetch logic.`);
    }
  }; //End of registerUser function (method)

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
      
      />
      <label htmlFor="password">Password</label>

      <input
        type="password"
        id="password"
        name="password"
        required
        
      />
      <button type="submit">Register</button>
    </form>
  );
}