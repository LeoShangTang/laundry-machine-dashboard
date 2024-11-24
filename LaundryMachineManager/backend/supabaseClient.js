// supabaseClient.js

const { createClient } = require("@supabase/supabase-js");

require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing Supabase environment variables, please check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file"
    );
  }
  
const supabaseServiceRole = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  
module.exports = { supabaseServiceRole };
