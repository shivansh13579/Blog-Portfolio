import React from "react";
import Github from "../../assets/g.png";
import Instagram from "../../assets/i.png";
import Linkedin from "../../assets/l.png";
import Twitter from "../../assets/x.png";

function Footer() {
  // Each object contains image and link
  const socialLinks = [
    {
      icon: Github,
      url: "https://github.com/shivansh13579", // Change to your GitHub profile
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/shivamsingh9_1/", // Change to your Instagram
    },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/shivam-kumar-223ba9263/", // Your LinkedIn
    },
    {
      icon: Twitter,
      url: "https://www.linkedin.com/in/shivam-kumar-223ba9263/", // Change to your Twitter
    },
  ];

  return (
    <footer className="bg-red-500 w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 flex flex-col gap-4">
        {/* Social Icons */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          {socialLinks.map((item, index) => (
            <span
              key={index}
              className="border hover:bg-red-800 p-2 rounded-full text-white transition"
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.icon}
                  alt="social-icon"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </a>
            </span>
          ))}
        </div>

        {/* Name */}
        <div className="w-full">
          <h1 className="text-center font-medium text-4xl sm:text-5xl md:text-8xl lg:text-[140px] font-serif text-white tracking-widest">
            Shivam Singh
          </h1>
        </div>

        {/* Footer bottom text */}
        <div className="border-t border-gray-100 pt-4">
          <h1 className="text-center text-sm sm:text-lg text-white font-serif">
            Designed and Developed By Shivam Singh
          </h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
