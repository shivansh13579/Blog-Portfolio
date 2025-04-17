import React from "react";
import photo from "../assets/p1.jpg";
import {
  ArrowBigDownDashIcon,
  ArrowDown,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

function Header() {
  return (
    <section className="flex flex-col md:flex-row gap-4 w-full h-fit md:h-[500px] mt-5 px-4">
      <div className="flex-1 w-full h-full flex flex-col items-start justify-center order-2 md:order-1">
        <div className=" ">
          <h1 className="text-xl md:text-3xl font-serif font-light leading-[4rem] tracking-wide ">
            <span className="text-center">Hi,there!👋</span>
            <br /> I'M{" "}
            <span className="text-xl md:text-4xl text-red-500 ">
              Shivam singh
            </span>
          </h1>
        </div>
        <div className="text-2xl md:text-5xl text-red-500 font-serif pt-4 ">
          <Typewriter
            options={{
              strings: [
                "Web Developer",
                "Backend Developer",
                "Frontend Developer",
                "Mern Stack Developer",
              ],
              pauseFor: 1000,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="flex flex-col gap-3 py-4 mt-4">
          <div className="w-full  flex gap-5 items-center justify-start">
            <a
              href="/Resume.pdf"
              download="Resume.pdf"
              className="py-2 px-4 bg-red-500 font-serif font-semibold text-white w-full rounded-md hover:bg-red-700 flex-1 flex items-center justify-start gap-1"
            >
              Resume
              <span>
                <ArrowBigDownDashIcon />
              </span>
            </a>
            <Link to="/contact">
              <button className="flex-1 py-2 px-8 bg-red-500 font-serif font-semibold text-white w-full rounded-md hover:bg-red-700">
                Contact
              </button>
            </Link>
          </div>
          <div className="flex gap-8 pt-7">
            <span className="bg-black hover:bg-red-800 py-2 px-2 rounded-full text-white">
              <Github />
            </span>
            <span className="bg-blue-500 hover:bg-red-800 py-2 px-2 rounded-full text-white">
              <Linkedin />
            </span>
            <span className="bg-blue-500 text-white hover:bg-red-800 py-2 px-2 rounded-full">
              <Twitter />
            </span>
            <span className="bg-red-500 text-white hover:bg-red-800 py-2 px-2 rounded-full">
              <Instagram />
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-end order-1 md:order-2">
        <img className="  h-full w-[400px] rounded-t-full" src={photo} alt="" />
      </div>
    </section>
  );
}

export const Liner = () => {
  return (
    <div className="w-full h-fit flex items-center gap-2 pt-5 flex-wrap">
      {/* Left Line */}
      <div className="flex-1 flex items-center justify-center min-w-[30%]">
        <p className="w-full h-[1px] bg-black/15"></p>
      </div>

      {/* Arrow Button */}
      <div className="w-[10%] min-w-[50px] flex items-center justify-center">
        <p className="bg-slate-500 w-full max-w-[50px] flex items-center justify-center py-[14px] px-2 rounded-full text-white">
          <ArrowDown />
        </p>
      </div>

      {/* Right Line */}
      <div className="flex-1 flex items-center justify-center min-w-[30%]">
        <p className="w-full h-[1px] bg-black/15"></p>
      </div>
    </div>
  );
};

export default Header;
