import { Auth } from '@supabase/ui'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
const Login = () => {
  const { isLoading, user, error } = useUser();
  const router = useRouter()
  useEffect(() => {
    if(user){
     router.push('/traffic');
    }
}, [user])
  if (!user)
    return (
      <>
      <div className="card">
      <a target="_blank" className="no-underline hover:underline ..."href="https://github.com/supabase/ui/issues/345" rel="noopener noreferrer">
      Form does not reset after failed login/signup #345
      </a><br />
      <a target="_blank" className="no-underline hover:underline ..."href="https://github.com/supabase/auth-helpers/blob/main/examples/nextjs/pages/index.tsx" rel="noopener noreferrer">
      Sample login form code in github written by supabase developers.
      </a>
      </div>
        <div className='flex flex-wrap w-6/12 justify-center'>
          {error && (
            <div
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
              role='alert' >
              <strong className='font-bold'>
                Something you might need to know
              </strong>
              <span className='block sm:inline'>{error.message}</span>
              <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
             </span>
            </div>
          )}
          <Auth
            supabaseClient={supabaseClient}
            socialLayout='horizontal'
            socialButtonSize='xlarge'
            redirectTo={'http://localhost:3000/traffic'}
          />
        </div>
      </>
    )

  return (
    <>
     <div className='grid grid-cols-1 gap-4 w-6/12 justify-center'>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <div className='text-black-600/100 text-2xl'>
        Display Sign out button because the auth state is &quot;user is
        currently having an active session&quot;.
      </div>
      <div className="text-green-600/100 text-2xl">
      {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}</div>
      <div className='text-blue-600/100 text-2xl'>
        Printing out the user object content
      </div>
      <div className='text-blue-600/50 break-normal'>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      </div>
    </>
  )
}

export default Login

