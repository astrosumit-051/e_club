
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

    const progress = await prisma.weekProgress.findMany({
      where: { userId: session.user.id },
      orderBy: { weekNumber: "asc" }
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error fetching progress:", error)
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

    const { weekNumber, progress, isCompleted } = await request.json()

    const updatedProgress = await prisma.weekProgress.upsert({
      where: {
        userId_weekNumber: {
          userId: session.user.id,
          weekNumber: weekNumber
        }
      },
      update: {
        progress: progress,
        isCompleted: isCompleted,
        completedAt: isCompleted ? new Date() : null
      },
      create: {
        userId: session.user.id,
        weekNumber: weekNumber,
        progress: progress,
        isCompleted: isCompleted,
        completedAt: isCompleted ? new Date() : null
      }
    })

    return NextResponse.json(updatedProgress)
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
