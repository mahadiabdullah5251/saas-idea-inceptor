
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wkgggpkprcktjmdlztsu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZ2dncGtwcmNrdGptZGx6dHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjM3NDUsImV4cCI6MjA1NzE5OTc0NX0.l38U9xrqc7qfCL24lasYRo1Wqo6ycCD8D0j0J0mHA8g";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
