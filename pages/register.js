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
      <div  className="card text-blue-600">
             Use your <span className="text-2xl">ichat or hotmail email account </span>to sign-up so that the system recognizes you as a &quot;student&quot; role user.<br />
             Use your <span className="text-2xl">yahoo email account</span>  to sign-up so that the system recognizes you as a &quot;officer&quot; role user.
      </div>
      <div>
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
      <button type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Register</button>
      </div>
    </form>
  );
}