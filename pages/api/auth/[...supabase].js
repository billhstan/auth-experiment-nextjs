import { handleAuth } from '@supabase/auth-helpers-nextjs'
//Note that, due to some weird behavior for Chrome during my research activities on Next.JS
//, I have moved all the code from index.js to home.js. As a result, I have configured inside the next.config
//to make sure that the default home page is rendered by home.js code. 
export default handleAuth({ logout: { returnTo: '/' } })