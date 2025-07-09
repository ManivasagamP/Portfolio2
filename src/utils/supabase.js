
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient (supabaseUrl,supabaseKey,{
    global: {
      headers:{
        Authorization: `Bearer ${supabaseAccessToken}`,
      }
    }
  })
  return supabase;
}

export default supabaseClient;
