import React from "react";
import BannerSlider from "../Components/BannerSlider";
import Banner from "../Components/Banner";
import ExploreBanner from "../Components/ExploreBanner";
import BannerReport from "../Components/BannerReport";
import FeaturesSection from "../Components/Feature";

import LatestResolvedIssues from "../Components/HomePreview";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#1a132f] to-[#2b2250] min-h-screen">
      <Banner />
      <ExploreBanner></ExploreBanner>
      <BannerSlider />
      <BannerReport></BannerReport>
      {/* <LatestResolvedIssues></LatestResolvedIssues> */}
      <FeaturesSection></FeaturesSection>
    </div>
  );
};

export default Home;
