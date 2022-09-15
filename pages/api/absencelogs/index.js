import { supabase } from '../../../utils/supabase';
import { supabaseServerClient } from '@supabase/supabase-auth-helpers/nextjs';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getAbsenceLogs(req, res);
    case 'POST':
      return await createAbsenceLog(req, res);
    default:
      return res.status(400).send('Method not allowed');
  }
}

const getAbsenceLogs = async (req, res) => {
  try {
    console.log('api/absencelogs/index.js>>>getAbsenceLogs>>>[started]');
    let { data: absenceLogs } = await supabase
    .from('absencelogs');
    const processedData = absenceLogs.map((element)=>{return {
        absenceLogId: element.id,
        description:element.description,
        startDateAndTime : element.start_date,
        endDateAndTime: element.end_date
    }})
    console.log(processedData);
    return res.status(200).json(processedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const createAbsenceLog = async (req, res) => {
  try {
    //Reference: https://stackoverflow.com/questions/70662175/get-supabase-user-server-side-in-next-js
    const { user } = await supabaseServerClient({ req, res }).auth.api.getUser(req.cookies["sb-access-token"]);
    let { description, startDateAndTime, endDateAndTime } = req.body;
        startDateAndTime = startDateAndTime. replace(/T/, ' ').replace(/\..+/, '')
        endDateAndTime = endDateAndTime. replace(/T/, ' ').replace(/\..+/, '')
        let { data: absenceLog } = await supabase
        .from('absencelogs')
        .insert({ description: description,start_date:startDateAndTime,end_date:endDateAndTime,created_by:user.id })
        .single();
        console.log('\\pages\\api\\absencelogs\\[id].js>createAbsenceLog  method>inspect [absenceLog] after calling supabase\' from().insert().single().');
        console.log(absenceLog);//By looking at the output, the data operation returns one single object. (not an array of 1 element) 
        

    return res.status(200).json({ ...req.body, id: absenceLog.id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};