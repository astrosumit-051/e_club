
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: session.user.id },
      include: {
        achievement: true
      },
      orderBy: { earnedAt: "desc" }
    })

    return NextResponse.json(userAchievements)
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { achievementId } = await request.json()

    // Check if achievement already exists for user
    const existingAchievement = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId: session.user.id,
          achievementId: achievementId
        }
      }
    })

    if (existingAchievement) {
      return NextResponse.json(
        { error: "Achievement already earned" },
        { status: 400 }
      )
    }

    const userAchievement = await prisma.userAchievement.create({
      data: {
        userId: session.user.id,
        achievementId: achievementId
      },
      include: {
        achievement: true
      }
    })

    return NextResponse.json(userAchievement)
  } catch (error) {
    console.error("Error awarding achievement:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
