"use client"
import { CommunityPanel } from './CommunityPanel'
import { FeedIdentityModule } from './FeedIdentityModule'

export function LeftSideBar() {
  return (
    <section className="md:block sm:flex sm:justify-around md:ml-10 md:w-64 lg:w-80 mt-7">
      <FeedIdentityModule />
      <CommunityPanel />
    </section>
  )
}
