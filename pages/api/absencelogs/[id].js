//file: <root>\api\absencelogs\[id].js
import { supabase } from '../../../utils/supabase';
import { supabaseServerClient } from '@supabase/supabase-auth-helpers/nextjs';
const handler=async (req, res)=> {
  switch (req.method) {
    case 'GET':
      return await getAbsenceLog(req, res);
    case 'DELETE':
      return await deleteAbsenceLog(req, res);
    case 'PUT':
      return await updateAbsenceLog(req, res);
    default:
      return res.status(400).json({ message: 'bad request' });
  }
}

const getAbsenceLog = async (req, res) => {
  try{
 
    //Let the API logic obtain the id of the required first through the req object which
    //is passed in by the framework engine.
    const recordId =  req.query.id;
    //Reference: https://stackoverflow.com/questions/70662175/get-supabase-user-server-side-in-next-js
    //Obtain from user information through the HTTP ONLY cookie which is also obtained from the req object.
    //I have referenced some resources to quickly get the command working. 
    const { user } = await supabaseServerClient({ req, res }).auth.api.getUser(req.cookies["sb-access-token"]);
    //Reference: https://supabase.com/docs/reference/javascript/select
     let { data: absencelog } = await supabaseServerClient(context).from('absencelogs').select('*').eq("id", recordId);
    console.log('\\pages\\api\\absencelogs\\[id].js>getAbsenceLog  method>inspect [absencelog] after calling supabase\'s from().select().eq().');
    console.log(absencelog);
    const processedData =   {
      absenceLogId: absencelog[0].id,
      description:absencelog[0].description,
      startDateAndTime : absencelog[0].start_date,
      endDateAndTime: absencelog[0].end_date
  };
    return res.status(200).json(processedData);
  } catch (error) {
    console.log('\\pages\\api\\absencelogs\\[id].js>getAbsenceLog  method>[catch] block [started].')
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteAbsenceLog = async (req, res) => {
  try {
    //Obtain the record id first.
    const recordId = req.query.id;
    const { data, error } = await supabase
    .from('absencelogs')
    .delete()
    .match({ id: recordId });
    console.log('\\pages\\api\\absencelogs\\[id].js>deleteAbsenceLog  method>inspect [data] after calling supabase\' from().delete().match().');
    console.log(data);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAbsenceLog = async (req, res) => {
  try {
    let {description, startDateAndTime,endDateAndTime } = req.body;
    startDateAndTime = startDateAndTime. replace(/T/, ' ').replace(/\..+/, '')
    endDateAndTime = endDateAndTime. replace(/T/, ' ').replace(/\..+/, '')
        //Obtain the record id first.
    const recordId = req.query.id;
    const { data, error } = await supabase
  .from('absencelogs')
  .update({ description: description, start_date: startDateAndTime, end_date:endDateAndTime })
  .match({ id: recordId })
  console.log('\\pages\\api\\absencelogs\\[id].js>updateAbsenceLog  method>inspect [data] after calling supabase\' from().update().match().');
  console.log(data);//By looking at the output, the data operation returns an array with one element in it.
  const processedData = {
    absenceLogId: data[0].id,
    description:data[0].description,
    startDateAndTime : data[0].start_date,
    endDateAndTime: data[0].end_date
};
    return res.status(204).json(processedData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
