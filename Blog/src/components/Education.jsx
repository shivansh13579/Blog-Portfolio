import React from "react";
import { Liner } from "./Header";

function Education() {
  // Experience Data
  const experiences = [
    {
      position: "Intern",
      duration: "December 2024 - Present",
      company: "Tech Instance",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQHdEBwk513FVA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729945859843?e=1750291200&v=beta&t=p8U9iDbk0j6EsTCldOiQ00rQbSmgJiNgEG3Cn7vzFZw",
      tasks: [
        "Building an E-commerce Project for a client using React.js for frontend and Firebase for data storage.",
        "Deployed the E-commerce project using Firebase Hosting. Faced many challenges during deployment.",
        "Used GitHub for version control and collaboration with the team.",
        "Built a Student Management project using Electron.js with React and SQLite for backend.",
      ],
    },
    {
      position: "Intern",
      duration: "November 2024 - February",
      company: "Technokrate Pvt Ltd",
      image: "https://www.technokrate.com/img/Techknokrate%20logo%202.png",
      tasks: [
        "Building an E-commerce Project for a client using React.js for frontend and Firebase for data storage.",
        "Deployed the E-commerce project using Firebase Hosting. Faced many challenges during deployment.",
        "Used GitHub for version control and collaboration with the team.",
        "Built a Student Management project using Electron.js with React and SQLite for backend.",
      ],
    },
    {
      position: "Intern",
      duration: "April 2024 - June 2024",
      company: "Auxous Network",
      image:
        "https://auxous.com/wp-content/uploads/2023/03/Auxous-Network-Private-Limited-Logo.png",
      tasks: [
        "Building an E-commerce Project for a client using React.js for frontend and Firebase for data storage.",
        "Deployed the E-commerce project using Firebase Hosting. Faced many challenges during deployment.",
        "Used GitHub for version control and collaboration with the team.",
        "Built a Student Management project using Electron.js with React and SQLite for backend.",
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full h-full">
        <Liner />
      </div>
      <div className="py-5 font-serif">
        {/* Title */}
        <div className="flex items-center justify-center py-3 pb-5 mb-4">
          <h1 className="font-serif text-2xl md:text-3xl tracking-wider">
            Experiences
          </h1>
        </div>

        {/* Experience Sections */}
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`w-full flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } py-4 mt-10 gap-6`}
          >
            {/* Left Content */}
            <div className="md:w-1/2 w-full flex flex-col items-start justify-center py-4 px-4">
              <p className="text-lg md:text-xl">
                <span className="font-semibold">{exp.position}</span> (
                {exp.duration})
              </p>
              <h1 className="text-3xl md:text-5xl text-red-500 font-semibold py-5">
                {exp.company}
              </h1>
              <div>
                <p className="font-semibold pb-2">Achievements/Tasks:</p>
                {exp.tasks.map((task, i) => (
                  <p key={i} className="pb-1 text-sm md:text-base">
                    {task}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="md:w-1/2 w-full bg-gray-100 rounded-md flex items-center justify-center">
              <img
                src={exp.image}
                alt={exp.company}
                className="w-full h-auto h-[250px] md:max-h-[400px] object-contain rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Liner */}
      <div className="w-full h-full py-6 mb-5">
        <Liner />
      </div>
    </div>
  );
}

export default Education;
