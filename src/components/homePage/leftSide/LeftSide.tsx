"use client"
import { CommunityPanel } from './CommunityPanel'
import { FeedIdentityModule } from './FeedIdentityModule'

export function LeftSideBar() {
  return (
    <section className="md:block w-[700px] ml-5 sm:flex sm:justify-around lg:ml-10 md:w-64 mt-7">
      <FeedIdentityModule />
      <CommunityPanel />
    </section>
  )
}
