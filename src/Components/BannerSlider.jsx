import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BannerSlider = () => {
  return (
    <div className="w-full h-[400px]">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        swipeable
        emulateTouch
        dynamicHeight={false}
        className="w-full"
      >
        <div className="relative h-[400px] w-full">
          <img
            src="https://i.ibb.co.com/KcJPPXY2/PH-WASH-2014-Daniel-Burgui-337-scaled-aspect-ratio-1920-1080.jpg"
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            alt="Slide 1"
          />
        </div>

        <div className="relative  h-[400px] w-full">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/070/015/200/small/burst-water-pipe-leaking-water-free-photo.jpg"
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            alt="Slide 2"
          />
        </div>

        <div className="relative  h-[400px] w-full">
          <img
            src="https://images.unsplash.com/photo-1436337936912-5be7166b31ae?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RyZWV0JTIwbGlnaHR8ZW58MHx8MHx8fDA%3D"
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            alt="Slide 3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default BannerSlider;
