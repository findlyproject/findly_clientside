"use client"
import { useAppSelector } from '@/lib/store/hooks'
import { CommunityPanel } from './CommunityPanel'
import { FeedIdentityModule } from './FeedIdentityModule'
import PremiumFeaturesMenu from './Premium'
import Collection from './Collection'

export function LeftSideBar() {
  const {activeuser}=useAppSelector((state)=>state.user)
  return (
    <section className="md:block sm:flex sm:justify-around mt-7 h-screen fixed ">
  <FeedIdentityModule />
  {activeuser && <CommunityPanel />}
  <PremiumFeaturesMenu />
  <Collection />
</section>

  )
}
