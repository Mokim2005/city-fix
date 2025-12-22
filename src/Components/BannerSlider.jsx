import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BannerSlider = () => {
  return (
    <section className="bg-gray-900 text-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Side - Text Content (English) */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              City’s Best Plumbing & Water Service
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Fast and reliable solutions for all plumbing issues — from leak
              repairs and pipe fixing to complete water supply installation. We
              provide 24/7 emergency service across the city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300">
                Get Free Quote
              </button>
              <button className="border border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300">
                Call Now: +880 1700-000000
              </button>
            </div>
          </div>

          {/* Right Side - Original Slider (Unchanged Images & Functionality) */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
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

                <div className="relative h-[400px] w-full">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/070/015/200/small/burst-water-pipe-leaking-water-free-photo.jpg"
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                    alt="Slide 2"
                  />
                </div>

                <div className="relative h-[400px] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1436337936912-5be7166b31ae?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RyZWV0JTIwbGlnaHR8ZW58MHx8MHx8fDA%3D"
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                    alt="Slide 3"
                  />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
