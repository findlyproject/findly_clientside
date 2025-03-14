"use client"
import { useAppSelector } from '@/lib/store/hooks'
import { CommunityPanel } from './CommunityPanel'
import { FeedIdentityModule } from './FeedIdentityModule'
import PremiumFeaturesMenu from './Premium'
import Collection from './Collection'
import { usePathname } from 'next/navigation'

export function LeftSideBar() {
    const pathname = usePathname();
  const {activeuser}=useAppSelector((state)=>state.user)
  return (
    <section className="md:block sm:flex sm:justify-around mt-7 h-screen ">
      
  <FeedIdentityModule />
      
  {activeuser && pathname !== "/mynetwork/networklist" && <CommunityPanel />}

  <PremiumFeaturesMenu />
  <Collection />
</section>

  )
}
