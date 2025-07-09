'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
// … your other imports …

export default function WeekPage() {
  const { week: weekParam } = useParams() as { week: string }
  const weekNumber = parseInt(weekParam.replace('week-', '')) || 1
  // … rest of your code unchanged …
}
