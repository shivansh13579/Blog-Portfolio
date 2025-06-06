import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import image from "../../../assets/image.jpg";
import image1 from "../../../assets/a1.jpg";
import image2 from "../../../assets/b1.jpg";
import image3 from "../../../assets/c1.jpg";
import course from "../../../assets/course.jpg";
import {
  BookOpen,
  CircleUserRound,
  GraduationCap,
  Menu,
  Store,
  Video,
  X,
} from "lucide-react";
import LoginButton from "./LoginButton";

export default function Header() {
  const location = useLocation();
  const [scroll, setScroll] = useState(false);
  const [color, setColor] = useState(false);
  const [currentImage, setCurrentImage] = useState(image);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
        setColor(true);
      } else {
        setScroll(false);
        setColor(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const navLink = [
    {
      link: "/courses",
      name: "Courses",
      photo: course,
      icon: <GraduationCap />,
    },
    { link: "/about", name: "About", photo: image2, icon: <Store /> },
    { link: "/categories", name: "Blog", photo: image1, icon: <BookOpen /> },
    {
      link: "/contact",
      name: "Contact Us",
      photo: image3,
      icon: <CircleUserRound />,
    },
  ];

  useEffect(() => {
    const matchRoute = navLink.find((nav) => nav.link === location.pathname);
    if (matchRoute) {
      setCurrentImage(matchRoute.photo);
    } else {
      setCurrentImage(image);
    }
  }, [location.pathname]);

  const handleChange = (image) => {
    setCurrentImage(image);
    setMenuOpen(false);
  };

  return (
    <div className="relative w-full ">
      {/* Background Image */}
      <div className="w-full h-screen">
        <img
          className="w-full h-full object-cover"
          src={currentImage}
          alt="Header Image"
        />
      </div>

      {/* Navbar */}
      <div className="absolute top-0 w-full  z-20">
        <div
          className={`fixed w-full px-15  py-4 flex justify-between items-center transition-all duration-300 ${
            scroll
              ? "bg-white text-black shadow-lg"
              : "bg-transparent text-white"
          }`}
        >
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-semibold">𝕊𝕊_𝔹𝕝𝕠𝕘</h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 items-center">
            {navLink.map((data) => (
              <li
                key={data.name}
                className="cursor-pointer hover:text-gray-500 uppercase font-bold text-[18px]"
              >
                <Link to={data.link} onClick={() => handleChange(data.photo)}>
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={28} />
          </button>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <LoginButton />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[80%] sm:w-[60%] bg-white text-black shadow-lg p-5 md:hidden z-30 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center h-fit w-full border-b pb-3 mb-5">
          <h1 className="text-2xl md:text-3xl font-semibold">𝕊𝕊_𝔹𝕝𝕠𝕘</h1>
          <button onClick={() => setMenuOpen(false)}>
            <X className="text-xl" />
          </button>
        </div>
        <div>
          <ul className="flex flex-col gap-8">
            {navLink.map((data) => (
              <li
                key={data.name}
                className="cursor-pointer hover:text-gray-600 uppercase"
              >
                <Link
                  to={data.link}
                  onClick={() => {
                    handleChange(data.photo);
                    setMenuOpen(false); // Close menu on click
                  }}
                  className="w-full flex gap-2 hover:bg-gray-200 py-1 px-4 rounded-sm"
                >
                  <span>{data.icon}</span>
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 py-6 px-4">
            <LoginButton />
          </div>
        </div>
      </div>

      {/* Hero Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-bold pb-2">𝕊𝕊_𝔹𝕝𝕠𝕘</h1>
        <h2 className="text-xl md:text-3xl pt-2 font-semibold">
          Web Development Blog
        </h2>
      </div>
    </div>
  );
}
