import { useRef, useState, useEffect } from "react";
import { highlightsSlides } from "../constant";
import gsap from "gsap";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, isPlaying, isLastVideo, loadedData, videoId]);

  useEffect(() => {
    const span = videoSpanRef.current;
    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        width: "100%",
        duration: videoRef.current[videoId]?.duration || 0,
        ease: "linear",
        onUpdate: () => {
          // Optional: Handle progress update
        },
        onComplete: () => {
          setVideo((prevVideo) => ({
            ...prevVideo,
            isEnd: true,
          }));
        },
      });
      return () => anim.kill(); // Cleanup animation
    }
  }, [videoId, startPlay]);

  return (
    <div className="flex items-center">
      {highlightsSlides.map((list, i) => (
        <div key={list.id} id="slider" className="sm:pr-20 pr-10">
          <div className="video-carousel_container">
            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
              <video
                id="video"
                playsInline
                preload="auto"
                muted
                ref={(el) => (videoRef.current[i] = el)}
                onPlay={() =>
                  setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: true,
                  }))
                }
                className="p-20"
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
        </div>
      ))}
    </div>
  );
};

export default VideoCarousel;
