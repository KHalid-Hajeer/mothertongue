import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

// Initialize Supabase client with URL and API key
const supabase = createClient(
  process.env.SUPABASE_URL || '', 
  process.env.SUPABASE_API_KEY || ''
)

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, nationality, language } = req.body

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, nationality, language }])

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(200).json({ message: 'Entry added successfully!', data })
  } else {
    return res.status(405).json({ error: 'Method not allowed' }) // Handling other methods
  }
}
