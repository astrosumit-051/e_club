
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Globe,
  Target,
  Lightbulb,
  TrendingUp
} from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Target,
      title: "Problem-Solution Framework",
      description: "Learn to identify real problems and create innovative solutions using proven methodologies."
    },
    {
      icon: BookOpen,
      title: "6-Week Intensive Program",
      description: "Comprehensive curriculum covering everything from idea validation to scaling strategies."
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with aspiring entrepreneurs worldwide and build your professional network."
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Earn badges, track progress, and compete with peers in a motivating environment."
    },
    {
      icon: Lightbulb,
      title: "Real Case Studies",
      description: "Learn from successful companies like Grammarly, Warby Parker, and Zocdoc."
    },
    {
      icon: TrendingUp,
      title: "Practical Skills",
      description: "Build prototypes, create business models, and pitch to investors with confidence."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation is handled by layout */}
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Build What's <span className="text-accent">Next</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Your journey from idea to industry-defining venture starts here. 
                  Master entrepreneurship through our comprehensive 6-week program 
                  designed for the next generation of innovators.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Global Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>500+ Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>Gamified Learning</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-indigo-500/20 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl h-full flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Interactive Learning Platform
                    </h3>
                    <p className="text-gray-600">
                      Immersive experience with videos, case studies, and hands-on projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Program?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our entrepreneurship masterclass combines proven methodologies with modern 
              technology to deliver an unparalleled learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              6-Week Curriculum Overview
            </h2>
            <p className="text-xl text-gray-600">
              Structured learning path from problem discovery to scaling strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { week: 1, title: "Problem Discovery", description: "Learn to identify meaningful problems using Design Thinking" },
              { week: 2, title: "Solution Validation", description: "Apply Lean Startup methodology to test your ideas" },
              { week: 3, title: "MVP Development", description: "Build and test your minimum viable product" },
              { week: 4, title: "Business Modeling", description: "Design sustainable business models and strategies" },
              { week: 5, title: "Pitching & Fundraising", description: "Craft compelling presentations and understand funding" },
              { week: 6, title: "Scaling Strategies", description: "Plan for growth and navigate startup ecosystems" }
            ].map((week) => (
              <Card key={week.week} className="card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {week.week}
                    </div>
                    <CardTitle className="text-lg">{week.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {week.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of aspiring entrepreneurs who are turning their ideas 
            into successful ventures. Your entrepreneurial journey starts today.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-accent">
              Enroll Now - Start Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
