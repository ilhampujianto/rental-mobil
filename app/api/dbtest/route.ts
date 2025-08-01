import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Tes koneksi ke database
    await prisma.$connect()
    console.log('✅ DB connected from Vercel')

    // Tes query ringan
    const users = await prisma.user.findMany({
      take: 1,
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Database connected successfully!',
        sampleUser: users,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ DB connection error in Vercel:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Database connection failed',
        error: String(error),
      }),
      { status: 500 }
    )
  }
}
