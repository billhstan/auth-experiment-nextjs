import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Layout } from "components/Layout";

function AbsenceLogDetail({ absenceLog }) {
  const router = useRouter();
  const localStartDateAndTime = new Date(absenceLog.startDateAndTime);
  const localStartDateAndTimeInString = `${localStartDateAndTime.getFullYear()}-${('0' + (localStartDateAndTime.getMonth() + 1)).slice(-2)}-${('0' + localStartDateAndTime.getDate()).slice(-2)} ${('0' + localStartDateAndTime.getHours()).slice(-2)}:${('0' + localStartDateAndTime.getMinutes()).slice(-2)} `;
  const localEndDateAndTime = new Date(absenceLog.endDateAndTime);
  const localEndDateAndTimeInString = `${localEndDateAndTime.getFullYear()}-${('0' + (localEndDateAndTime.getMonth() + 1)).slice(-2)}-${('0' + localEndDateAndTime.getDate()).slice(-2)} ${('0' + localEndDateAndTime.getHours()).slice(-2)}:${('0' + localEndDateAndTime.getMinutes()).slice(-2)} `;

  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/absencelogs/' + id);
      toast.success('You have deleted the absence log.');
      router.push("/student/absencelogs");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
<div className="flex flex-wrap w-full justify-center">
      <h1 className="block w-full text-center text-grey-darkest mb-6 text-3xl text-stone-400">Absence log</h1>
      <div  className="w-1/2">
      <div className="grid w-full auto-cols-auto grid-cols-50/50 gap-2 text-xl">
	<div className="text-right">Description</div>
	<div className="border-2 border-blue-300 px-2 ">{absenceLog.description}</div>
	<div className="text-right">Start date and time</div>
	<div className="border-2 border-blue-300 px-2 ">{localStartDateAndTimeInString}</div>
	<div className="text-right">End date and time</div>
	<div className="border-2 border-blue-300 px-2">{localEndDateAndTimeInString}</div>
  <div></div>
      <div className="border-2 text-right">
          <button
            className="m-3 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => handleDelete(absenceLog.absenceLogId)}
          >
            Delete
          </button>
        <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => router.push('/student/absencelogs/edit/' + absenceLog.absenceLogId)}
        >
          Edit
        </button>
</div>
      </div>
      </div>
      </div>
  );
}
/*
In simple terms, getServerSideProps enables a page to render server-side. 
  The getServerSideProps method renders your client-side page in server-side and 
  returns a hydrated SEO-friendly HTML document to the browser.
*/
export const getServerSideProps = async ({ query }) => {
  const { data: absenceLog} = await axios.get(
    'http://localhost:3000/api/absencelogs/' + query.id
  );
  console.log('pages\\student\\absencelogs\\[id].js>getServerSideProps method>[started]>inspect [absencelog]');
  console.log(absenceLog);

  return {
    props: {
      absenceLog,
    },
  };
};

export default AbsenceLogDetail;
