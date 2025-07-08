
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Play,
  Users,
  Target,
  Trophy,
  Lock,
  FileText,
  Map
} from 'lucide-react'
import Link from 'next/link'
import { CURRICULUM_WEEKS } from '@/lib/curriculum-data'
import { UserProgress } from '@/lib/types'

export default function CoursePage() {
  const [weekProgress, setWeekProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress')
        if (response.ok) {
          const data = await response.json()
          setWeekProgress(data)
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [])

  const getWeekProgress = (weekNumber: number) => {
    return weekProgress?.find(p => p.weekNumber === weekNumber) || {
      weekNumber,
      isCompleted: false,
      progress: 0
    }
  }

  const isWeekUnlocked = (weekNumber: number) => {
    if (weekNumber === 1) return true
    const previousWeek = getWeekProgress(weekNumber - 1)
    return previousWeek.isCompleted
  }

  const overallProgress = () => {
    if (!weekProgress?.length) return 0
    const totalProgress = weekProgress.reduce((sum, week) => sum + week.progress, 0)
    return Math.round(totalProgress / 6)
  }

  const completedWeeks = weekProgress?.filter(week => week.isCompleted).length || 0

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Entrepreneurship Masterclass
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              6-Week Problem-Solution Innovation Framework (PSIF) Program
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="accent" className="text-sm">
                <Clock className="w-3 h-3 mr-1" />
                6-8 hours/week
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Users className="w-3 h-3 mr-1" />
                Global Cohort
              </Badge>
              <Badge variant="success" className="text-sm">
                <Trophy className="w-3 h-3 mr-1" />
                Gamified Learning
              </Badge>
            </div>
          </div>
          
          <div className="text-center lg:text-right">
            <div className="text-3xl font-bold text-accent mb-2">
              {overallProgress()}%
            </div>
            <p className="text-sm text-gray-600 mb-3">Overall Progress</p>
            <Progress value={overallProgress()} className="w-48 mb-2" />
            <p className="text-xs text-gray-500">
              {completedWeeks} of 6 weeks completed
            </p>
          </div>
        </div>
      </div>

      {/* Course Curriculum */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
        
        <div className="space-y-4">
          {CURRICULUM_WEEKS.map((week) => {
            const progress = getWeekProgress(week.weekNumber)
            const isUnlocked = isWeekUnlocked(week.weekNumber)
            
            return (
              <Card 
                key={week.weekNumber} 
                className={`card-hover ${isUnlocked ? 'cursor-pointer' : 'opacity-50'}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          progress.isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isUnlocked 
                              ? 'bg-accent text-white' 
                              : 'bg-gray-300 text-gray-600'
                        }`}>
                          {progress.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isUnlocked ? (
                            week.weekNumber
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </div>
                        
                        <div>
                          <CardTitle className="text-xl">
                            Week {week.weekNumber}: {week.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {week.theme}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Learning Objectives:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {week.learningObjectives.slice(0, 2).map((objective, idx) => (
                            <li key={idx}>{objective}</li>
                          ))}
                          {week.learningObjectives.length > 2 && (
                            <li className="text-gray-500">
                              +{week.learningObjectives.length - 2} more objectives...
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          <Play className="w-3 h-3 mr-1" />
                          {week.content.videos.length} Videos
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {week.content.readings.length} Readings
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Target className="w-3 h-3 mr-1" />
                          {week.content.activities.length} Activities
                        </Badge>
                        {week.caseStudies.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            Case: {week.caseStudies.join(', ')}
                          </Badge>
                        )}
                      </div>

                      {isUnlocked && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{Math.round(progress.progress)}%</span>
                          </div>
                          <Progress value={progress.progress} className="h-2" />
                        </div>
                      )}
                    </div>

                    <div className="ml-6">
                      {isUnlocked ? (
                        <Link href={`/course/week-${week.weekNumber}`}>
                          <Button 
                            variant={progress.isCompleted ? "outline" : "default"}
                            className="min-w-[120px]"
                          >
                            {progress.isCompleted ? "Review" : "Start Week"}
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled className="min-w-[120px]">
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Course Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>
            Enhance your learning with these supplementary materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/case-studies">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Case Studies</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Learn from successful companies like Grammarly, Warby Parker, and more
                  </p>
                </div>
              </Button>
            </Link>

            <Link href="/resources">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <Map className="h-4 w-4" />
                    <span className="font-medium">Startup Resources</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    State-by-state guide to funding, accelerators, and support programs
                  </p>
                </div>
              </Button>
            </Link>

            <Link href="/community">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Community Forums</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Connect with peers, share ideas, and get feedback on your projects
                  </p>
                </div>
              </Button>
            </Link>

            <Link href="/achievements">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <Trophy className="h-4 w-4" />
                    <span className="font-medium">Achievements</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Track your progress and earn badges for completing milestones
                  </p>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
