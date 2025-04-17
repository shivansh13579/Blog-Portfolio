import React from "react";
import a from "../assets/a.jpg";
import b from "../assets/b.jpg";
import c from "../assets/c.jpg";
import image from "../assets/image.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image5 from "../assets/image5.png";
import image11 from "../assets/image11.png";
import shiv from "../assets/shiv.png";

import { Github, Link, MoveRight } from "lucide-react";

export function Project() {
  return (
    <>
      <div className="w-full md:w-[90%] h-fit mx-auto mt-5 mb-2 py-5">
        <div className="flex items-center justify-center">
          <h1 className="font-serif text-3xl tracking-wider">Projects</h1>
        </div>
        <div className="my-8 py-8 w-full h-fit grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {/* Reusable Card Component */}
          {[
            {
              image: image,
              title:
                "Ecommerce Project is created by using react and firebase for storage.",
              url: "https://mitkart.com/",
              Github: "https://github.com/shivansh13579",
            },
            {
              image: image1,
              title:
                "Student Dashboard Project is created by using react and Node for backend integration and data management.",
              url: "https://coaching-full-stack-48x3.vercel.app/",
              Github: "https://github.com/shivansh13579",
            },
            {
              image: shiv,
              title:
                "Ecommerce Project is created by using react and appwrite for storage.",
              url: "https://pandit-com-a8ur-git-main-shivansh13579s-projects.vercel.app/lucky-braclet",
              Github: "https://github.com/shivansh13579",
            },
            {
              image: image3,
              title:
                "Service List Project is created by using react and Node for backend integration and data management.",
              url: "https://services-project-9wql.vercel.app/",
              Github: "https://github.com/shivansh13579",
            },
            {
              image: image5,
              title:
                "Portfolio Project is created by using react and for animations I used framer motion.",
              url: "https://modern-portfolio-project-13pa.vercel.app/",
              Github: "https://github.com/shivansh13579",
            },
            {
              image: image2,
              title:
                "Blog Project is created by using react and appwrite for storage.",
              url: "https://main-blog-project.vercel.app/",
              Github: "https://github.com/shivansh13579",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="w-[280px] h-[370px] rounded-xl flex flex-col border border-white shadow-md"
            >
              <div className="relative group">
                <img
                  className="w-[280px] h-[200px] object-cover group-hover:brightness-50 duration-300 transition"
                  src={card.image}
                  alt={`project-${index}`}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <MoveRight className="text-white text-xl" />
                </div>
              </div>
              <div className="bg-white px-3 py-3 h-full flex flex-col justify-between">
                <h1 className="text-[16px] hover:text-blue-600 font-medium line-clamp-3">
                  {card.title}
                </h1>
                <div className="flex justify-between items-center pt-4">
                  <a
                    href={card.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 px-2 py-2 rounded-full hover:bg-gray-200"
                  >
                    <Github />
                  </a>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 px-2 py-2 rounded-full hover:bg-gray-200"
                  >
                    <Link />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
