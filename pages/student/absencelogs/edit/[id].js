import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function UpdateAbsenceLog() {
  const [absenceLog, setAbsenceLog] = useState({
   absenceLogId: '',
   description: '',
   startDateAndTime: '',
   endDateAndTime: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchAbsenceLog = async (id) => {
      try {
        const { data } = await axios.get("/api/absencelogs/" + id);
        const localStartDateAndTime = new Date(data.startDateAndTime);
        data.startDateAndTime = `${localStartDateAndTime.getFullYear()}-${('0' + (localStartDateAndTime.getMonth() + 1)).slice(-2)}-${('0' + localStartDateAndTime.getDate()).slice(-2)} ${('0' + localStartDateAndTime.getHours()).slice(-2)}:${('0' + localStartDateAndTime.getMinutes()).slice(-2)}`;
        const localEndDateAndTime = new Date(data.endDateAndTime);
        data.endDateAndTime = `${localEndDateAndTime.getFullYear()}-${('0' + (localEndDateAndTime.getMonth() + 1)).slice(-2)}-${('0' + localEndDateAndTime.getDate()).slice(-2)} ${('0' + localEndDateAndTime.getHours()).slice(-2)}:${('0' + localEndDateAndTime.getMinutes()).slice(-2)}`;
        
        setAbsenceLog(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (router.query?.id) {
      fetchAbsenceLog(router.query.id);
    }
    console.log('AbsenceLogForm.js>>>fetchAbsenceLog>>>[started]');
  }, [router.query.id]);

  const handleChange = ({ target: { name, value } }) =>
    setAbsenceLog({ ...absenceLog, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isoStartDateString = new Date(absenceLog.startDateAndTime).toISOString();
			const isoEndDateString = new Date(absenceLog.endDateAndTime).toISOString();
      if (router.query?.id) {
      //Convert user given local time to UTC which the server side database needs.
			//Reference: https://stackoverflow.com/questions/948532/how-to-convert-a-date-to-utc

        await axios.put("/api/absencelogs/" + router.query.id, {
          description: absenceLog.description,
          startDateAndTime: isoStartDateString,
          endDateAndTime:isoEndDateString
        });
        toast.success('You have updated the absence log data.', {
          position: "bottom-center",
        });
      } else {
        await axios.post('/api/absencelogs',  {
          description: absenceLog.description,
          startDateAndTime: isoStartDateString,
          endDateAndTime:isoEndDateString
        });
        toast.success('You have saved the absence log data', {
          position: 'bottom-center',
        });
      }

      router.push("/student/absencelogs");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-1/2">
      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="block w-full text-center text-grey-darkest mb-6 text-2xl text-stone-400">Update absence log</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="Description"
            id="description"
            name="description"
            onChange={handleChange}
            value={absenceLog.description}
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="startDateAndTime"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Start date and time
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="startDateAndTime"
            placeholder="YYYY-MM-DD HH:MM"
            onChange={handleChange}
            value={absenceLog.startDateAndTime}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="endDateAndTime"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            End date and time
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="endDateAndTime"
            placeholder="YYYY-MM-DD HH:MM"
            onChange={handleChange}
            value={absenceLog.endDateAndTime}
          />
        </div>
        {/* By have the class grid, the button element inside the div element is treated as a grid item. As a result, place-items-end will work.  */}
        <div className="flex mb-4 justify-end">
        <button
          className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
          onClick={(e) =>{e.preventDefault(); router.push('/student/absencelogs/');}}>
          Cancel
        </button>
 
        <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          {router.query?.id ? "Update Absence log" : "Save Absence log"}
        </button>
        </div>
      </form>
    </div>
  );
}





 