import React from 'react'
import { withPageAuth, getUser } from '@supabase/auth-helpers-nextjs'
export default function traffic(props) {


    const {user,role}=props;
    console.log('pages\\traffic.js>Inspect [user] passed into the component using props technique>');
    console.log(user);
    console.log('pages\\traffic.js>Inspect [role] passed into the component using props technique>');
    console.log(role);
     if(role==='student'){
        return (
            <div>
            <div>Hi student role user. This text should be replaced by a redirect logic to direct student role user to the default absense logs page.</div>
            <div>The redirect logic should be done by using the commands inside getServerSideProps</div>
            </div>
        );
     }if(role==='officer'){
        <div>Hi officer role user. This text should be replaced by a redirect logic to direct officer role user to the default my students page</div>
     }if(role==='admin'){
        <div>Hi officer admin role user. This text should be replaced by a redirect logic to direct officer role user to the default manage users page</div>
     }
}


export const redirectToDefaultPageBasedOnRole = async (context) => {
   console.log('\\pages\\traffic.js\\redirectToDefaultPageBasedOnRoles>[started]');
   const { user, accessToken } = await getUser(context);
   const role = user?.user_metadata.appRole;
   if (role=='student') {
      console.log('\\pages\\traffic.js\\redirectToDefaultPageBasedOnRoles\\directing to /student');
     const { res } = context;
     res.writeHead(301, { Location: '/student' });
     res.end();
     return true
   }
   if (role=='officer') {
      console.log('\\pages\\traffic.js\\redirectToDefaultPageBasedOnRoles\\directing to /officer');
      const { res } = context;
      res.writeHead(301, { Location: '/officer' });
      res.end();
      return true
    }
  }
//Reference: https://github.com/vercel/next.js/discussions/11281
export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(context) {
   
   return await redirectToDefaultPageBasedOnRole(context) || {
      props: 
         { user:user,role: user?.user_metadata.appRole }
    }
  

  },
})
