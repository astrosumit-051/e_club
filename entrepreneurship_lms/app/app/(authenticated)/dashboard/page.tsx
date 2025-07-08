
'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Target,
  ChevronRight,
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { UserProgress, Achievement } from '@/lib/types'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [weekProgress, setWeekProgress] = useState<UserProgress[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, achievementsRes] = await Promise.all([
          fetch('/api/progress'),
          fetch('/api/achievements')
        ])

        if (progressRes.ok) {
          const progressData = await progressRes.json()
          setWeekProgress(progressData)
        }

        if (achievementsRes.ok) {
          const achievementsData = await achievementsRes.json()
          setAchievements(achievementsData)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const currentWeek = () => {
    const incomplete = weekProgress?.find(week => !week.isCompleted)
    return incomplete ? incomplete.weekNumber : (weekProgress?.length || 0) + 1
  }

  const overallProgress = () => {
    if (!weekProgress?.length) return 0
    const completed = weekProgress.filter(week => week.isCompleted).length
    return Math.round((completed / 6) * 100)
  }

  const getCurrentWeekData = () => {
    const week = currentWeek()
    const weekTitles = [
      'Problem Discovery & Empathy-Driven Innovation',
      'Solution Ideation & Lean Validation',
      'Prototyping & MVP Development',
      'Business Model Design & Market Strategy',
      'Pitching, Storytelling & Fundraising',
      'Scaling Strategies & Ecosystem Navigation'
    ]
    
    return {
      number: week,
      title: weekTitles[week - 1] || 'Course Complete!',
      description: week <= 6 ? `Week ${week} of the entrepreneurship masterclass` : 'Congratulations on completing the course!'
    }
  }

  const totalPoints = achievements?.reduce((sum, achievement) => 
    sum + (achievement.achievement?.points || 0), 0
  ) || 0

  const recentAchievements = achievements?.slice(0, 3) || []

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-accent to-blue-600 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'Entrepreneur'}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          Ready to continue building what's next? Let's make today count.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-gray-900">{overallProgress()}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress value={overallProgress()} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Week</p>
                <p className="text-2xl font-bold text-gray-900">Week {currentWeek()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{achievements?.length || 0}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Module */}
        <div className="lg:col-span-2">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <span>Continue Learning</span>
                  </CardTitle>
                  <CardDescription>
                    {getCurrentWeekData().description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">
                    Week {getCurrentWeekData().number}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">
                {getCurrentWeekData().title}
              </h3>
              
              {currentWeek() <= 6 ? (
                <>
                  <p className="text-gray-600 mb-6">
                    {currentWeek() === 1 && "Learn to identify meaningful problems using Design Thinking principles and customer discovery interviews."}
                    {currentWeek() === 2 && "Apply Lean Startup methodology to validate your solution ideas through structured experiments."}
                    {currentWeek() === 3 && "Build and test your minimum viable product using no-code tools and user feedback."}
                    {currentWeek() === 4 && "Design comprehensive business models and develop go-to-market strategies."}
                    {currentWeek() === 5 && "Craft compelling pitch presentations and understand fundraising fundamentals."}
                    {currentWeek() === 6 && "Plan scaling strategies and navigate startup ecosystems for sustainable growth."}
                  </p>
                  
                  <Link href={`/course/week-${currentWeek()}`}>
                    <Button className="w-full sm:w-auto">
                      Continue Week {currentWeek()}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Course Complete!</h3>
                  <p className="text-gray-600 mb-4">
                    Congratulations on completing all 6 weeks of the entrepreneurship masterclass!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/community">
                      <Button variant="outline">
                        Join Alumni Network
                      </Button>
                    </Link>
                    <Link href="/resources">
                      <Button>
                        Explore Resources
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements & Community Feed */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentAchievements?.length > 0 ? (
                <div className="space-y-3">
                  {recentAchievements.map((userAchievement) => (
                    <div 
                      key={userAchievement.id} 
                      className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg"
                    >
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {userAchievement.achievement?.name || 'Achievement'}
                        </p>
                        <p className="text-xs text-gray-600">
                          {userAchievement.achievement?.points || 0} points
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link href="/profile">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Achievements
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Complete activities to earn your first achievement!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/case-studies">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Explore Case Studies
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Join Discussion
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Resources
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
