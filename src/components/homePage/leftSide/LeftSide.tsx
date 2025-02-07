"use client"
import { CommunityPanel } from './CommunityPanel'
import { FeedIdentityModule } from './FeedIdentityModule'

export function LeftSideBar() {
  return (
    <section className="hidden md:block md:rounded-t-lg ml-10 w-64">
      <FeedIdentityModule />
      <CommunityPanel />
    </section>
  )
}
