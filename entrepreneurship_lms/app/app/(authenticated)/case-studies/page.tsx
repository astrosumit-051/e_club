
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Building2, TrendingUp, DollarSign, Users, ArrowRight } from 'lucide-react'
import { CaseStudy } from '@/lib/types'

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch('/data/case-studies.json')
        const data = await response.json()
        setCaseStudies(data)
        setFilteredStudies(data)
      } catch (error) {
        console.error('Error fetching case studies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])

  useEffect(() => {
    let filtered = caseStudies

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(study => 
        study.industry.toLowerCase() === selectedIndustry.toLowerCase()
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(study =>
        study.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.founding_story.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredStudies(filtered)
  }, [caseStudies, searchTerm, selectedIndustry])

  const industries = ['all', ...Array.from(new Set(caseStudies.map(study => study.industry)))]

  const getIndustryColor = (industry: string) => {
    const colors: { [key: string]: string } = {
      'Tech': 'bg-blue-100 text-blue-800',
      'Retail': 'bg-purple-100 text-purple-800',
      'Food & Beverage': 'bg-orange-100 text-orange-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Social Impact': 'bg-pink-100 text-pink-800'
    }
    return colors[industry] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (selectedCase) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedCase(null)}
            className="mb-4"
          >
            ← Back to Case Studies
          </Button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-blue-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedCase.company}</h1>
              <Badge className={`mt-2 ${getIndustryColor(selectedCase.industry)}`}>
                {selectedCase.industry}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-accent" />
                  Founding Story
                </h2>
                <p className="text-gray-700 leading-relaxed">{selectedCase.founding_story}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-2 text-accent" />
                  Problem Identification
                </h2>
                <p className="text-gray-700 leading-relaxed">{selectedCase.problem_identification}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                  Solution Development
                </h2>
                <p className="text-gray-700 leading-relaxed">{selectedCase.solution_development}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-accent" />
                  Business Model Evolution
                </h2>
                <p className="text-gray-700 leading-relaxed">{selectedCase.business_model_evolution}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                  Growth Strategies
                </h2>
                <p className="text-gray-700 leading-relaxed">{selectedCase.growth_strategies}</p>
              </section>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Challenges</h4>
                    <p className="text-sm text-gray-600">{selectedCase.challenges}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Pivots</h4>
                    <p className="text-sm text-gray-600">{selectedCase.pivots}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Financial Milestones</h4>
                    <p className="text-sm text-gray-600">{selectedCase.financial_milestones}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lessons Learned</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedCase.lessons_learned}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Startup Case Studies
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Learn from successful companies and their entrepreneurial journeys. 
          Each case study provides deep insights into problem identification, solution development, and scaling strategies.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by company, industry, or founder..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.slice(1).map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudies.map((study, index) => (
          <Card 
            key={index} 
            className="card-hover cursor-pointer"
            onClick={() => setSelectedCase(study)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-blue-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <Badge className={getIndustryColor(study.industry)}>
                  {study.industry}
                </Badge>
              </div>
              <CardTitle className="text-xl">{study.company}</CardTitle>
              <CardDescription className="line-clamp-3">
                {study.founding_story.substring(0, 150)}...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Search className="w-4 h-4 mr-2" />
                  <span className="font-medium">Problem:</span>
                  <span className="ml-1 line-clamp-1">
                    {study.problem_identification.substring(0, 50)}...
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="font-medium">Solution:</span>
                  <span className="ml-1 line-clamp-1">
                    {study.solution_development.substring(0, 50)}...
                  </span>
                </div>

                <Button 
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCase(study)
                  }}
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No case studies found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('')
              setSelectedIndustry('all')
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
