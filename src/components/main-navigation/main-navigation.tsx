'use client'

import dynamic from 'next/dynamic'

const DynamicNavigation = dynamic(
  () => import('./main-navigation-content'),
  { ssr: false }
)

export default function MainNavigation() {
  return <DynamicNavigation />
}