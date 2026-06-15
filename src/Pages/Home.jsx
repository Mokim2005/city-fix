import BannerSlider from "../Components/BannerSlider";
import Banner from "../Components/Banner";
import ExploreBanner from "../Components/ExploreBanner";
import LatestResolvedIssues from "../Components/HomePreview";
import HowItWorks from "../Components/HowItWork";
import LiveCityStatus from "../Components/LiveCityStatus";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <title>Home</title>

      {/* 🔥 Top Banner (Full Width) */}
      <div className="w-full">
        <Banner />
      </div>

      {/* Content Container (Centered) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">
          <ExploreBanner />
          <LiveCityStatus />
          <BannerSlider />
          {/* <UserShow /> */}
          <HowItWorks />
          <LatestResolvedIssues />
      </div>
    </div>
  );
};

export default Home;
