import Head from 'next/head'
import Image from 'next/image'
import chalk from 'chalk';
import util from 'util';
export default function Index() {
  return (
<div className="p-10">
  <h1 className="text-5xl">Internship buddy system</h1>
  <hr className="mb-5" />
  <div className="text-sm">
     Internship is starting soon on 12th September 2022 Monday. If you are new here, and you are going for internship, sign up to  get your liason officer track your internship activities.
  </div>
  
  <div className="border border-l-8 border-blue-800 shadow rounded-lg mt-8 mb-8">
    <h5 className="text-3xl font-bold m-5">Announcements</h5>
    <div className="text-gray-700 text-sm ml-5 mr-5 mb-8">
      No announcements for now.
    </div>
    <div className="bg-gray-100 pt-5 pb-5 border">
      <div className="text-gray-700 text-bold text-sm ml-5 mr-5">
        Be a responsible and dependable young professional.
      </div>
    </div>
    </div>
  
  </div>

  )
}

export async function getServerSideProps(context) {
  //I have gone through the context variable. The variable has a lot of information.
  //For example, query object information etc.
  let user = null;
  let result=null;
  //console.log('\\index.js(homepage)>Inspect the [context] variable',chalk.blue(util.inspect(context)));
 // if (context.req.cookie!=null){
   //  result = await auth0.getSession(context.req,context.res);
 //    console.log(result);
 // console.log('\\index.js(homepage)>Inspect the [user] variable. So that, I can verify whether I can use the getSession technique.');
 // console.log(result);
//  }//end if
  return { props: {},}
}

