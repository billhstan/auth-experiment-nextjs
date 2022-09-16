
import React from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import TopNavbar  from 'components/TopNavbar';
/*Reference: https://github.com/basir/next-tailwind-amazona */
//const Layout = ({title,children}) =>  //This one can be applied too.
export default function Layout({title, children }) {
  return (
    <>
     <Head>
      <title>{title?title + ' - Experiment 4':'Experiment 4'}</title>
      <meta name="description" content="Experiment CRUD and simple layout" ></meta>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />


     </Head>
      <div className="flex h-screen  flex-col justify-between  border-4 border-black">
        <header className="item h-10">
              <TopNavbar/>
        </header>

        <main  className="item   h-full container  bg-zinc-100 mx-auto mt-6 px-4 border-5 border-black">
          {/*  https://smartcodehelper.com/2021/12/17/tailwind-3-column-grid-with-custom-width/ */}
<div className="grid h-full auto-cols-auto grid-cols-10/80/10 gap-2">
	<div className="border-2 border-black">
  <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
  Left section
</h6>
<span className="text-xs font-semibold inline-block py-1 my-1 px-2  rounded text-emerald-600 bg-emerald-200  last:mr-0 mr-1">
  intentionally left empty
</span>
  </div>
	<div className="grid border-2 place-items-center ">{children}</div>
	<div className="border-2 ">
  <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
  Right section
</h6>
<span className="text-xs font-semibold inline-block py-1 my-1 px-2  rounded text-emerald-600 bg-emerald-200  last:mr-0 mr-1">
  intentionally left empty
</span>
  </div>
</div>
</main>
        
        <footer  className="item max-h-10 justify-center items-center shadow-inner  border-2 border-black"><p>Copyright © 2022 Project Inc. @DIT</p></footer>
      </div>
      <Toaster />
    </>
  );
}
