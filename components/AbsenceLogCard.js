import Link from "next/link";

export function AbsenceLogCard({ absenceLog }) {
    const localStartDateAndTime = new Date(absenceLog.startDateAndTime);
		const localStartDateAndTimeInString = `${localStartDateAndTime.getFullYear()}-${('0' + (localStartDateAndTime.getMonth() + 1)).slice(-2)}-${('0' + localStartDateAndTime.getDate()).slice(-2)} ${('0' + localStartDateAndTime.getHours()).slice(-2)}:${('0' + localStartDateAndTime.getMinutes()).slice(-2)} `;
		const localEndDateAndTime = new Date(absenceLog.endDateAndTime);
		const localEndDateAndTimeInString = `${localEndDateAndTime.getFullYear()}-${('0' + (localEndDateAndTime.getMonth() + 1)).slice(-2)}-${('0' + localEndDateAndTime.getDate()).slice(-2)} ${('0' + localEndDateAndTime.getHours()).slice(-2)}:${('0' + localEndDateAndTime.getMinutes()).slice(-2)} `;

  return (
    <Link href={`/student/absencelogs/${absenceLog.absenceLogId}`}>
      <a
        className="block p-6 max-w-sm m-10 max-h-96 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-3"
        key={absenceLog.absenceLogId} 
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {absenceLog.description}
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-200">
          {localStartDateAndTimeInString}
        </div>
        <div className="font-normal text-gray-700 dark:text-gray-200">
          {localEndDateAndTimeInString}
        </div>
      </a>
    </Link>
  );
}
