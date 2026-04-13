import BannerSlider from "../Components/BannerSlider";
import Banner from "../Components/Banner";
import ExploreBanner from "../Components/ExploreBanner";
import BannerReport from "../Components/BannerReport";
import LatestResolvedIssues from "../Components/HomePreview";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <title>Home</title>
      <Banner />
      <ExploreBanner />
      <BannerSlider />
      <BannerReport />
      <LatestResolvedIssues />
    </div>
  );
};

export default Home;
