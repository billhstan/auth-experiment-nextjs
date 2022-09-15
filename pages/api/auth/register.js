import { supabase } from '../../../utils/supabase';
//Important reference: https://github.com/M0nica/register-supabase-users-nextjs-example/tree/main/pages
function getEmailDomain(email){
  const stringIndex=email.indexOf('@');
  const domain=email.slice((stringIndex+1),email.length);
  return domain;
}//End of getEmailDomain
function decideUserRole(email){
  const domain =getEmailDomain(email);
  let role=null;
  if (domain==='ichat.sp.edu.sg'||(domain==='hotmail.com')){
    role = 'student';
  }
  if ((domain==='yahoo.com')||(domain==='yahoo.com.sg')){
    role = 'officer';
  }
  return role;
}//End of decideUserRole
export default async function registerUser(req, res) {
    console.log('pages\\api\\register.js>registerUser route handler>[started]');
    const { email, password } = req.body;
    const role=decideUserRole(email);
  let { user, error } = await supabase.auth.signUp(
    {
      email: email,
      password: password,
    },
    {
      data: {
        appRole: role,
      }
    }
  );
  console.log('pages\\api\\register.js>registerUser route handler>Inspect [error] object after supabase.auth.signUp method call>');
  console.log('error', error);
  console.log(`pages\\api\\register.js>registerUser route handler>Inspect [user] object after supabase.auth.signUp method call>`);
  console.log('user', user);
  if (error) {
    return res.status(401).json({ error: error.message });
  }else{
  return res.status(200).json({ user: user });
  }
}