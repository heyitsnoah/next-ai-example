import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({ api: 'endpoint', isWorking: 'great' }), {
    status: 200,
  })
}

export async function POST(req: NextRequest, res: NextResponse) {
  return new Response('ok', { status: 200 })
}
