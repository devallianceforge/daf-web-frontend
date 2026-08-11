import { Hero } from '@/components/Hero';
import { StatsSection } from '@/components/StatsSection';
import { PillarsSection } from '@/components/PillarsSection';
import { EventsPreview } from '@/components/EventsPreview';
import { WorkshopsPreview } from '@/components/WorkshopsPreview';
import { CommunitySection } from '@/components/CommunitySection';
import { CTASection } from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <PillarsSection />
      <EventsPreview />
      <WorkshopsPreview />
      <CommunitySection />
      <CTASection />
    </>
  );
}
