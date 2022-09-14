import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div className="self-stretch mt-8">
    <div className="grid border-2 max-h-full  mx-10 gap-4 grid-cols-1 md:grid-cols-4 self-stretch">
    <div className="grid col-span-4 mb-4 max-w-full place-items-end border-2">
  <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
  onClick={() => router.push('/')}>
    Home
  </button>
  </div>
  <div>
          Thank you for signing up. Please check your {email} inbox to verify
          your e-mail address. {email}
        </div>
      
    </div>

  </div>
  
  
   );
}