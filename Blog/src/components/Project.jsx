import React from "react";
import a from "../assets/a.jpg";
import b from "../assets/b.jpg";
import c from "../assets/c.jpg";
import { Github, Link, MoveRight } from "lucide-react";

export function Project() {
  return (
    <>
      <div className="w-full md:w-[90%] h-fit mx-auto mt-5 mb-2 py-5">
        <div className="flex items-center justify-center">
          <h1 className="font-serif text-3xl tracking-wider">Projects</h1>
        </div>
        <div className="my-8 py-8 w-full h-fit grid  justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-3 gap-4">
          <div className="w-[280px] h-fit rounded-xl flex flex-col boder border-white shadow-md">
            <div className="relative group ">
              <img
                className="w-[280px] h-[200px] group-hover:brightness-50 duration-300 transition"
                src={a}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <MoveRight className="text-white text-xl" />
              </div>
            </div>
            <div className="bg-white h-full px-3 py-3 ">
              <h1 className="text-[16px] hover:text-blue-600 font-medium">
                Ecommerce Project is created by using react and appwrite for
                storage.
              </h1>
              <div className="flex justify-between items-center pt-4">
                <span className="bg-gray-100 px-2 py-2 rounded-full">
                  <Github />
                </span>
                <span className="bg-gray-100  px-2 py-2 rounded-full">
                  <Link />
                </span>
              </div>
            </div>
          </div>
          <div className="w-[280px] h-fit rounded-xl flex flex-col boder border-white shadow-md">
            <div className="relative group ">
              <img
                className="w-[280px] h-[200px] group-hover:brightness-50 duration-300 transition"
                src={b}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <MoveRight className="text-white text-xl" />
              </div>
            </div>
            <div className="bg-white h-full px-3 py-3 ">
              <h1 className="text-[16px] hover:text-blue-600 font-medium">
                Ecommerce Project is created by using react and appwrite for
                storage.
              </h1>
              <div className="flex justify-between items-center pt-4">
                <span className="bg-gray-100 px-2 py-2 rounded-full">
                  <Github />
                </span>
                <span className="bg-gray-100  px-2 py-2 rounded-full">
                  <Link />
                </span>
              </div>
            </div>
          </div>
          <div className="w-[280px] h-fit rounded-xl flex flex-col boder border-white shadow-md">
            <div className="relative group ">
              <img
                className="w-[280px] h-[200px] group-hover:brightness-50 duration-300 transition"
                src={c}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <MoveRight className="text-white text-xl" />
              </div>
            </div>
            <div className="bg-white h-full px-3 py-3 ">
              <h1 className="text-[16px] hover:text-blue-600 font-medium">
                Ecommerce Project is created by using react and appwrite for
                storage.
              </h1>
              <div className="flex justify-between items-center pt-4">
                <span className="bg-gray-100 px-2 py-2 rounded-full">
                  <Github />
                </span>
                <span className="bg-gray-100  px-2 py-2 rounded-full">
                  <Link />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
