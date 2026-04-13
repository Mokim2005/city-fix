import BannerSlider from "../Components/BannerSlider";
import Banner from "../Components/Banner";
import ExploreBanner from "../Components/ExploreBanner";
import BannerReport from "../Components/BannerReport";
import LatestResolvedIssues from "../Components/HomePreview";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <title>Home</title>
      
      {/* Banner with its own background */}
      <Banner />
      
      {/* Rest of the components with shared background */}
      <div
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/930317516/photo/city-road.jpg?s=612x612&w=0&k=20&c=N42N37Gc-BYkVnXDxKw8iDjZqVyrTuHMW3mH7vzJmdc=')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-screen"
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10">
          <ExploreBanner />
          <BannerSlider />
          <BannerReport />
          <LatestResolvedIssues />
        </div>
      </div>
    </div>
  );
};

export default Home;
