import Hero from "@/components/hero/Hero";
import BookAndOrganize from "@/components/home/BookAndOrganize";
import ExploreApp from "@/components/home/ExploreApp";
import PromoSection from "@/components/home/PromoSection";
import TopDestinations from "@/components/home/TopDestinations";
import WhereToTravel from "@/components/home/WhereToTravel";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HomeLoadingScreen from "@/components/home/HomeLoadingScreen";

export default function HomePage() {
  return (
    <main>
      <HomeLoadingScreen />
      <Hero />
      <WhyChooseUs/>
      <PromoSection />
      <TopDestinations/>
      <BookAndOrganize />
      <WhereToTravel />
      <ExploreApp />
  
    </main>
  );
}
