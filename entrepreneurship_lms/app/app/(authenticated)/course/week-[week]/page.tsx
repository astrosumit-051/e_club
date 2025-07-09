
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  Clock,
  FileText
} from 'lucide-react'
import { CURRICULUM_WEEKS } from '@/lib/curriculum-data'
import { WeekModule, UserProgress } from '@/lib/types'
import Link from 'next/link'

export default function WeekPage() {
  const params = useParams()
  const router = useRouter()
  const weekParam = params?.week as string
  const weekNumber = parseInt(weekParam?.replace('week-', '') || '1')
  
  const [weekProgress, setWeekProgress] = useState<UserProgress | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  
  const weekData: WeekModule | undefined = CURRICULUM_WEEKS.find(w => w.weekNumber === weekNumber)

  useEffect(() => {
    if (!weekData) {
      router.push('/course')
      return
    }

    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress')
        if (response.ok) {
          const data = await response.json()
          const currentWeekProgress = data.find((p: UserProgress) => p.weekNumber === weekNumber)
          setWeekProgress(currentWeekProgress || {
            weekNumber,
            isCompleted: false,
            progress: 0
          })
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
      }
    }

    fetchProgress()
  }, [weekNumber, weekData, router])

  const handleItemComplete = async (itemId: string) => {
    const newCompletedItems = new Set(completedItems)
    if (completedItems.has(itemId)) {
      newCompletedItems.delete(itemId)
    } else {
      newCompletedItems.add(itemId)
    }
    setCompletedItems(newCompletedItems)
    
    // Calculate new progress
    const totalItems = (weekData?.content.videos.length || 0) + 
                     (weekData?.content.readings.length || 0) + 
                     (weekData?.content.activities.length || 0)
    const progress = Math.round((newCompletedItems.size / totalItems) * 100)
    const isCompleted = progress >= 100

    // Update progress in database
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weekNumber,
          progress,
          isCompleted
        })
      })
      
      setWeekProgress({
        weekNumber,
        progress,
        isCompleted
      })
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  if (!weekData) {
    return <div>Week not found</div>
  }

  const totalItems = weekData.content.videos.length + 
                    weekData.content.readings.length + 
                    weekData.content.activities.length

  const progressPercentage = weekProgress?.progress || 0

  return (
    <div className="space-y-6">
      {/* Week Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <Link href="/course">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Course
            </Button>
          </Link>
          
          <div className="flex items-center space-x-4">
            {weekNumber > 1 && (
              <Link href={`/course/week-${weekNumber - 1}`}>
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                  Previous Week
                </Button>
              </Link>
            )}
            {weekNumber < 6 && (
              <Link href={`/course/week-${weekNumber + 1}`}>
                <Button variant="outline" size="sm">
                  Next Week
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                {weekNumber}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {weekData.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {weekData.theme}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">
                <Play className="w-3 h-3 mr-1" />
                {weekData.content.videos.length} Videos
              </Badge>
              <Badge variant="outline">
                <BookOpen className="w-3 h-3 mr-1" />
                {weekData.content.readings.length} Readings
              </Badge>
              <Badge variant="outline">
                <Target className="w-3 h-3 mr-1" />
                {weekData.content.activities.length} Activities
              </Badge>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                6-8 hours
              </Badge>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-accent mb-1">
                {progressPercentage}%
              </div>
              <p className="text-sm text-gray-600">Week Progress</p>
            </div>
            <Progress value={progressPercentage} className="mb-4" />
            <div className="text-center">
              {weekProgress?.isCompleted ? (
                <Badge variant="success" className="mb-2">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Week Complete!
                </Badge>
              ) : (
                <p className="text-xs text-gray-600">
                  {completedItems.size} of {totalItems} items completed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Objectives</CardTitle>
          <CardDescription>
            By the end of this week, you will be able to:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {weekData.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="readings">Readings</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Case Studies */}
          {weekData.caseStudies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Featured Case Studies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {weekData.caseStudies.map((company, index) => (
                    <Link key={index} href="/case-studies">
                      <Button 
                        variant="outline" 
                        className="w-full h-auto p-4 text-left"
                      >
                        <div>
                          <div className="font-medium">{company}</div>
                          <div className="text-sm text-gray-600">
                            Learn from their journey
                          </div>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Available Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {weekData.achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg"
                  >
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <div>
                      <div className="font-medium text-sm">{achievement}</div>
                      <div className="text-xs text-gray-600">
                        Complete week activities to unlock
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {weekData.content.videos.map((video, index) => {
            const itemId = `video-${index}`
            const isCompleted = completedItems.has(itemId)
            
            return (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{video.description}</p>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {video.duration}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant={isCompleted ? "outline" : "default"}
                          onClick={() => handleItemComplete(itemId)}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-1" />
                              Watch
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="readings" className="space-y-4">
          {weekData.content.readings.map((reading, index) => {
            const itemId = `reading-${index}`
            const isCompleted = completedItems.has(itemId)
            
            return (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">{reading.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {reading.type}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {reading.content}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant={isCompleted ? "outline" : "default"}
                      onClick={() => handleItemComplete(itemId)}
                      className="ml-4 flex-shrink-0"
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Read
                        </>
                      ) : (
                        'Mark as Read'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          {weekData.content.activities.map((activity, index) => {
            const itemId = `activity-${index}`
            const isCompleted = completedItems.has(itemId)
            
            return (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-lg">{activity.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4">{activity.description}</p>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Instructions:</p>
                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                          {activity.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={isCompleted ? "outline" : "default"}
                      onClick={() => handleItemComplete(itemId)}
                      className="ml-4 flex-shrink-0"
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Complete
                        </>
                      ) : (
                        'Mark Complete'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
