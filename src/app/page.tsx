import Hero from '@/components/Hero/Hero';
import AboutSection from '@/components/About/AboutSection';
import DeveloperSection from '@/components/Developer/DeveloperSection';
import ArtistSection from '@/components/Artist/ArtistSection';
import FounderSection from '@/components/Founder/FounderSection';
import ConnectSection from '@/components/Connect/ConnectSection';
import SocialMenu from '@/components/shared/SocialMenu';

export default function Home() {
  return (
    <>
      <SocialMenu />
      <Hero />
      <AboutSection />
      <DeveloperSection />
      <ArtistSection />
      <FounderSection />
      <ConnectSection />
    </>
  );
}
