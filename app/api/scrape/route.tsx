import { scrapeUrl } from '@/utils/scrape'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  const scrape = await scrapeUrl(url)

  return new Response(JSON.stringify(scrape), { status: 200 })
}
