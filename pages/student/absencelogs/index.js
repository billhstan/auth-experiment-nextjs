import axios from "axios";
import {supabaseServerClient} from '@supabase/auth-helpers-nextjs';
import { AbsenceLogCard } from "components/AbsenceLogCard";
import { withPageAuth, getUser } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/router";
function AbsenceLogs({ absenceLogs = [] }) {
  const renderAbsenceLogs = () => {
    if (absenceLogs.length === 0) return <h1>No results for absence log data.</h1>;
    return absenceLogs.map((absenceLog) => (
      <AbsenceLogCard key={absenceLog.absenceLogId} absenceLog={absenceLog} />
    ));
  };
  const router = useRouter();
  return (
    <div className="self-stretch mt-8">
      <div className="grid border-2 max-h-full  mx-10 gap-4 grid-cols-1 md:grid-cols-4 self-stretch">
      <div className="grid col-span-4 mb-4 max-w-full place-items-end border-2">
    <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => router.push('/student/absencelogs/create')}>
      Create absence log
    </button>
    </div>
        {renderAbsenceLogs()}
        
      </div>

    </div>

  );
}

export default AbsenceLogs;
/*
export const getServerSideProps = async  () => {
    console.log('pages\\student\\absencelogs\\index.js>getServerSideProps>[started]');
    const { data: absenceLogs } = await axios.get(
    '/api/absencelogs'
  );
  console.log(absenceLogs);
  return {
    props: {absenceLogs}, // will be passed to the page component as props
  }
  }*/
/*
export const getServerSideProps = withPageAuth({
  redirectTo: '/',
  async getServerSideProps(context) {
    // Run queries with RLS on the server
    const { data:absenceLogs } = await supabaseServerClient(context).from('absencelogs').select('*');
    console.log('pages\\student\\absencelogs\\index.js>getServerSideProps>inspect the [absenceLogs] variable after calling supabaseServerClient\'s method');
    console.log(absenceLogs);
    return { props: { absenceLogs } }
  },
})*/

export async function getServerSideProps(context) {
  console.log('context.res', context.res);
    // Run queries with RLS on the server
    const { user } = await supabaseServerClient(context).auth.api.getUser(context.req.cookies["sb-access-token"]);
    const { data:absenceLogs } = await supabaseServerClient(context).from('absencelogs').select('*').match({created_by:user.id});
    console.log('pages\\student\\absencelogs\\index.js>getServerSideProps>inspect the [absenceLogs] variable after calling supabaseServerClient\'s method');
    console.log(absenceLogs);
    const processedData = absenceLogs.map((element)=>{return {
      absenceLogId: element.id,
      description:element.description,
      startDateAndTime : element.start_date,
      endDateAndTime: element.end_date
  }});

    return { props: { absenceLogs:processedData } }
}