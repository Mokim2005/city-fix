import BannerSlider from "../Components/BannerSlider";
import Banner from "../Components/Banner";
import ExploreBanner from "../Components/ExploreBanner";
import LatestResolvedIssues from "../Components/HomePreview";
import HowItWorks from "../Components/HowItWork";
import LiveCityStatus from "../Components/LiveCityStatus";
import UserShow from "../Components/UserShow";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <title>Home</title>

      {/* 🔥 Top Banner (Full Width) */}
      <div className="w-full">
        <Banner />
      </div>

      {/* 🔥 Full Width Background Section */}
      <div
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/930317516/photo/city-road.jpg?s=612x612&w=0&k=20&c=N42N37Gc-BYkVnXDxKw8iDjZqVyrTuHMW3mH7vzJmdc=')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative"
      >
        {/* 🔥 Blur Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* 🔥 Content Container (Centered) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">
          <ExploreBanner />
          <LiveCityStatus />
          <BannerSlider />
          <UserShow /> 
          <HowItWorks />
          <LatestResolvedIssues />
        </div>
      </div>
    </div>
  );
};

export default Home;
