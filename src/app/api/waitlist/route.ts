// src/app/api/waitlist/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, nationality, language } = body

  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email, nationality, language }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: 'Entry added successfully!', data }, { status: 200 })
}
