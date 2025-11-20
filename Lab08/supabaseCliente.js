import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ==========================
// CONFIGURA TU SUPABASE
// ==========================
let SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZ2J5ZmtzYmh3bnh4dGFpaGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTQwNjIsImV4cCI6MjA3ODU3MDA2Mn0.pDR5MAfdGLQ3Cz-Mw3cMsI2BAh2Jqhg1ov_P1XUMpx0";
let SUPABASE_URL = "https://rggbyfksbhwnxxtaihic.supabase.co";

// Crear cliente una sola vez
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
