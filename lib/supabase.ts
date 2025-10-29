import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xpelwiscrrimyadbfsyr.supabase.co'
const supabaseKey =
  process.env.SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZWx3aXNjcnJpbXlhZGJmc3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2ODU1NzgsImV4cCI6MjA3NzI2MTU3OH0.Dh0twMtzpZeFXgJfR9T_ypDKaE77CdCuPZylmX0VMQA'

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_KEY environment variable')
}
export const supabase = createClient(supabaseUrl, supabaseKey)
