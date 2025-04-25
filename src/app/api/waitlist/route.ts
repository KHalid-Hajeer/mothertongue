import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials are missing. Check environment variables.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, nationality, language } = body

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, nationality, language }])

    if (error) {
      console.error('Supabase insert error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Entry added successfully!', data }, { status: 200 })
  } catch (err: any) {
    console.error('Unhandled error in POST /api/waitlist:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
