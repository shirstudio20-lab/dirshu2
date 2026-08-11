import { ChafetzChaimSection } from './components/ChafetzChaim/ChafetzChaimSection'
import { DownloadsSection } from './components/Downloads/DownloadsSection'
import { GlobalMapSection } from './components/GlobalMap/GlobalMapSection'
import { Hero } from './components/Hero/Hero'
import { HeroesBookSection } from './components/HeroesBook/HeroesBookSection'
import { JoinSection } from './components/Join/JoinSection'
import { JourneyAdsSection } from './components/JourneyAds/JourneyAdsSection'
import { PrayerModalProvider } from './components/PrayerModal/PrayerModalProvider'
import { PlatformsSection } from './components/Platforms/PlatformsSection'
import { RadinSection } from './components/Radin/RadinSection'
import { SiteHeader } from './components/SiteHeader/SiteHeader'
import { TorahStagesSection } from './components/TorahStages/TorahStagesSection'
import { useViewport } from './hooks/useViewport'

export default function App() {
  const { scale, fluid, width, height } = useViewport()

  return (
    <PrayerModalProvider>
      <SiteHeader />
      <main>
      <Hero scale={scale} fluid={fluid} />
      <TorahStagesSection
        scale={scale}
        fluid={fluid}
        viewportWidth={width}
        viewportHeight={height}
      />
      <JourneyAdsSection scale={scale} fluid={fluid} viewportWidth={width} />
      <HeroesBookSection scale={scale} fluid={fluid} />
      <GlobalMapSection fluid={fluid} />
      <JoinSection scale={scale} fluid={fluid} />
      <ChafetzChaimSection scale={scale} fluid={fluid} />
      <DownloadsSection scale={scale} fluid={fluid} />
      <RadinSection />
      <PlatformsSection />
      </main>
    </PrayerModalProvider>
  )
}

