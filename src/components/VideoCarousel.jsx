import { useRef, useState } from "react";
import { highlightsSlides } from "../constant";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play the current video
  const handlePlay = () => {
    const currentVideo = videoRef.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.play();
      setIsPlaying(true);
    }
  };

  // Pause the current video
  const handlePause = () => {
    const currentVideo = videoRef.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.pause();
      setIsPlaying(false);
    }
  };

  // Navigate to the next video
  const handleNext = () => {
    if (currentVideoIndex < highlightsSlides.length - 1) {
      const currentVideo = videoRef.current[currentVideoIndex];
      if (currentVideo) currentVideo.pause(); // Pause the current video
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
      setIsPlaying(false); // Ensure next video starts paused
    }
  };

  // Navigate to the previous video
  const handlePrev = () => {
    if (currentVideoIndex > 0) {
      const currentVideo = videoRef.current[currentVideoIndex];
      if (currentVideo) currentVideo.pause(); // Pause the current video
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
      setIsPlaying(false); // Ensure previous video starts paused
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full">
        {highlightsSlides.map((list, index) => (
          <div
            key={list.id}
            className={`video-carousel_container ${
              index === currentVideoIndex ? "block" : "hidden"
            }`}
          >
            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
              <video
                playsInline
                preload="auto"
                muted
                ref={(el) => (videoRef.current[index] = el)}
                className="p-20 w-full"
              >
                <source src={list.video} type="video/mp4" />
              </video>
            </div>
            <div className="absolute top-12 left-[-5%] z-10">
              {list.textLists.map((text) => (
                <p className="md:text-2xl text-xl text-gray pl-16" key={text}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentVideoIndex === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Play
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={currentVideoIndex === highlightsSlides.length - 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
