import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react';
export default function Profile () {
  const router = useRouter();
  console.log(`pages\\profile.js>Profile function>[started]`);
  const { user } = useUser()
  console.log(`Inspect the [user] after calling const {user} = useUser() command`);
  console.log(user);
  async function signOut () {
    await supabase.auth.signOut()
    router.push('/')
  }
  if (!user) {
    return (
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>
        <h2>Hello</h2>
        <div>I cannot retrieve any user profile information because you did not login.</div>
      </div>
    )
  } else {
    return (
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>
        <h2>Email, {user.email}</h2>
        <div>User ID: {user.id}</div>
        <div>Authenication status ID: {user.role}</div>
        <div>Role: {user.user_metadata.appRole}</div>
        <button onClick={signOut}>Sign Out</button>
       </div>
    )
  }
}
