import React from "react";

const Video = () => {
  const videoLinks = [
    "https://www.instagram.com/reel/DI1KThXy6qy/",
    "https://www.instagram.com/reel/DIv8o7QJ9RH/",
    "https://www.instagram.com/reel/DHbF7thS_MN/",
    "https://www.instagram.com/reel/DHdr5C9paxJ/",
    "https://www.instagram.com/reel/DHi1dAvpBxg/",
    "https://www.instagram.com/reel/DHoNU2qIU77/",
    "https://www.instagram.com/reel/DH8kMn6y1n9/",
    "https://www.instagram.com/reel/DHVxSnzyk29/",
    "https://www.instagram.com/reel/DHlpID9Sxq4/",
  ];

  return (
    <>
      <div className="flex items-center justify-center mt-5 py-6">
        <h1 className="font-serif text-2xl sm:text-3xl tracking-wider">
          Course// <span className="text-blue-500">Javascript</span>
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-5 md:overflow-x-auto py-5 hide-scrollbar">
        {videoLinks.map((link, index) => {
          const embedLink = `https://www.instagram.com/p/${
            link.split("/")[4]
          }/embed`;

          return (
            <div
              key={index}
              className="w-full mx-auto px-5 md:w-60 h-96 md:h-80 rounded-lg flex-shrink-0 relative overflow-hidden"
            >
              <iframe
                src={embedLink}
                className="w-full h-full md:-mt-14 -mt-14" // Adjusted margin top based on screen
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                title={`Instagram Video ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Video;
