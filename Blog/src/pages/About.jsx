import React from "react";
import Header from "../components/Header";
import { Liner } from "../components/Header";
import { Project } from "../components/Project";
import Education from "../components/Education";

function About() {
  return (
    <>
      <section className="w-full md:w-[90%] h-fit mx-auto my-5 py-5 z-20 px-4">
        <Header />
        <Liner />
      </section>
      <div className="bg-gray-50 my-6-">
        <Project />
      </div>
      <div className="w-full md:w-[90%] h-fit mx-auto">
        <Education />
      </div>
    </>
  );
}

export default About;
