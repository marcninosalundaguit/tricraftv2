import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://deqcdkykzshypniaqzvx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcWNka3lrenNoeXBuaWFxenZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMDQxOTcsImV4cCI6MjA0Nzc4MDE5N30.J7lHO25im9P0g83LTFXz_NoWkHJd3Hgvac-poQz0ZkQ';

export const supabase = createClient(supabaseUrl, supabaseKey);


