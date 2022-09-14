// supabase.js
// Although I am using the auth-helper libraries for the authentication and user authentication state
//. I still need to work on the user sign up flow by coding the register.js.
//As a result, I still need a supabase.js inside the utils directory.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);