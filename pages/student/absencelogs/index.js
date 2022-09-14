import axios from "axios";

import { AbsenceLogCard } from "components/AbsenceLogCard";
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

export const getServerSideProps = async  () => {
    console.log('pages\\student\\absencelogs\\index.js>getServerSideProps>[started]');
  const { data: absenceLogs } = await axios.get(
    '/api/absencelogs'
  );
  console.log(absenceLogs);
  return {
    props: {absenceLogs}, // will be passed to the page component as props
  }
  }

