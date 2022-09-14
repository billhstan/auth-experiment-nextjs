import React,{useContext} from 'react'
//https://stackoverflow.com/questions/33611812/export-const-vs-export-default-in-es6
//I was stuck here for some time due to using the rfc shortcut that lead to 
//export default TopNavbar() {  return()  }

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

//I should be using export TopNavbar(){ ... } without the default
function TopNavbar(props) {

  //Note 1: Enable the following 1 command for revision when time comes
  //const [data, setData] = useState()
  //There is a loadData method inside the useEffect which has been commented out.


  const router = useRouter();
  console.log('\\components\\TopNavBar.js>TopNavbar>outside the useEffect() dependency array, run  const { user, error } = useUser();');
  const { user, error } = useUser();
  console.log('\\components\\TopNavBar.js>TopNavbar>outside the useEffect() dependency array [user]>Inspect the [error] variable');
  console.log('[error]:',error);

  console.log('\\components\\TopNavBar.js>TopNavbar>outside the useEffect() dependency array [user]>Inspect the [user] variable');
  console.log(user);
  useEffect(() => {
      //Note 1: Enable the following 8 commands for revision when time comes
      //async function loadData() {
      //const { data } = await supabaseClient.from('test').select('*')
      //console.log('\\components\\TopNavBar.js>TopNavbar>useEffect() dependency array [user]>[started]>Inspect the [data] variable');
      // console.log(data);
      //setData(data)
      // }
      // Only run query once user is logged in.
      //if (user) loadData()
  }, [user])



  
  const SignInButton=(props)=>{
    console.log('\\components\\TopNavbar.js>SignInButton>[started]' );
    console.log(props);//The possible output can be {user:null}
    const {user} = props;
    console.log('\\components\\TopNavbar.js>SignInButton>Inspect [user] after const {user}=props command>' );
    console.dir(user);

    if (user!=null){

            return (
              <div className="navbar-end">{user.email}</div>
            )
    }else{
           return(
            <div className="navbar-end">
            <Link className="btn" href="/login">Sign in</Link>
          </div>
           )
    }
  }
  const UserMenu = (props)=>{
    console.log('\\components\\TopNavbar.js>UserMenu>[started]>' );

     const {user} = props;
     console.log('\\components\\TopNavbar.js>UserMenu>Inspect the [user] variable');
     console.log(user);
      if (user!=null){
        return(
       <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
             <Image       loader={imageLoader}
      src="/user.png"
      alt="Authenticated user icon"
      width={40}
      height={40} />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><Link href="/api/auth/logout">Logout</Link></li>
        </ul>
      </div>
      )
        }
  }
  console.log('\\components\\TopNavbar.js>TopNavbar function>[started]');
  return (
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Announcements</a></li>
        <li tabIndex={0}>
          <a className="justify-between">
            Attendance
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
          </a>
          <ul className="p-2 ml-2 bg-base-100 ">
            <li><a>Absence logs</a></li>
            <li><a>My liason officer in-charge</a></li>
          </ul>
        </li>
        <li><a>Checklist</a></li>
      </ul>

    </div>
    <a className="btn btn-ghost normal-case text-xl">Internship buddy</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal  p-0">
      <li><a>Announcements</a></li>
      <li tabIndex={0}>
        <a>
          Attendance
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 backdrop-blur bg-white/50">
          <li><Link href="/student/absencelogs">Absence logs</Link></li>
          <li><a>My liason officer in-charge</a></li>
        </ul>
      </li>
      <li><a>Checklist</a></li>
    </ul>
    <SignInButton user={user} ></SignInButton>:
    <UserMenu user={user}></UserMenu>
  </div>
  
</div>
  )
}
export default TopNavbar;





