import { NextResponse, NextRequest, userAgent } from 'next/server'
import { supabase } from 'utils/supabase';

import { User, withPageAuth, getUser } from '@supabase/auth-helpers-nextjs'

// Supports both a single string value or an array of matchers
export const config = {
    matcher: [ '/student','/officer/:path*','/admin/:path*','/student/:path*','/traffic'],
  }


export async function middleware(req) {
   console.log('<root>\\middleware.js>[started]');
    const { pathname } = req.nextUrl;
    console.log('<root>\\middleware.js>extracted [pathname] information: ', pathname);
    
    console.log('<root>\\middleware.js>extracted token data:',req.cookies.get('sb-access-token'));
    const accessToken = req.cookies.get('sb-access-token');


    const { user, error } = await supabase.auth.api.getUser(accessToken)
    console.log('<root>\\middleware.js>inspect the [user] variable>');
    console.log(user);
    if (error){
        console.log('<root>\\middleware.js>[error] found after getUser() call.>');
        console.log(error);
        return NextResponse.redirect(new URL('/',req.url))
    }
    if ((user)&&(pathname.includes('traffic'))){
           console.log('<root>\\middleware.js>let the request continue to the /traffic');
           console.log('Note: The traffic.js has getServerSideProps logic to do a rolebased redirection again');
           console.log('<root>\\middleware.js>[pathname]:',pathname);
           console.log('<root>\\middleware.js>[req.nextUrl]:',req.nextUrl);
           return NextResponse.next();
       }   
    if ((user?.user_metadata.appRole=='student')&&(pathname.includes('student'))){
     //   if (pathname=='/api/auth/user'){
        console.log('redirect to student view');
        console.log('<root>\\middleware.js>[pathname]:',pathname);
        console.log('<root>\\middleware.js>[req.nextUrl]:',req.nextUrl);
        return NextResponse.next();
    //    }
    }    

    if ((user?.user_metadata.appRole=='officer')&&(pathname.includes('officer'))){
           
           console.log('redirect to officer view');
           console.log('<root>\\middleware.js>[pathname]:',pathname);
           console.log('<root>\\middleware.js>[req.nextUrl]:',req.nextUrl);
           return NextResponse.next();

       }    
 
   
    return NextResponse.rewrite(new URL('/',req.url));
}