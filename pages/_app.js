
import Layout  from 'components/Layout'
import '../styles/globals.css'
import { supabase } from "../utils/supabase";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
    
     return (
      <UserProvider supabaseClient={supabaseClient}>
    <Layout>
  <Component {...pageProps}   />
  </Layout>
  </UserProvider>
  )
}

export default MyApp
