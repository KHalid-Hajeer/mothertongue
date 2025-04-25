// src/app/api/waitlist/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

const supabase = createClient(supabaseUrl!, supabaseKey!)

export async function POST(req: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables.')
    }

    if (req.headers.get('content-type') !== 'application/json') {
      return NextResponse.json({ error: 'Invalid content-type' }, { status: 415 })
    }

    const body = await req.json()
    const { email, nationality, language } = body

    if (!email || !nationality || !language) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    // Basic email format check
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, nationality, language }])

    if (error) {
      const isDuplicate = error.message.toLowerCase().includes('duplicate')
      return NextResponse.json(
        { error: error.message },
        { status: isDuplicate ? 409 : 400 }
      )
    }

    return NextResponse.json(
      { message: 'Entry added successfully!', data },
      { status: 200 }
    )
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Unhandled error in POST /api/waitlist:', err.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    console.error('Unknown error in POST /api/waitlist')
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  }
}
