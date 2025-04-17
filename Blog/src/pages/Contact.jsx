import { MailMinus, MapPin, Phone } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useForm } from "@formspree/react";

function ContactPage() {
  const [state, handleSubmit] = useForm("mzzeqewr"); // Just the form ID

  if (state.succeeded) {
    toast.success("Message sent successfully");
  }
  if (state.errors) {
    toast.success("Something went wrong");
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-7xl font-semibold font-serif leading-[4rem]">
            Hi,
            <br />
            Have a project in mind?
          </h1>
          <div className="flex flex-col gap-6 mt-8 w-full">
            <div className="flex items-start gap-3">
              <MapPin className="text-blue-600" />
              <p>
                Near SBI,
                <br />
                Purnea, Bihar, India, 854301
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-600" />
              <p>9306585702</p>
            </div>
            <div className="flex items-center gap-3">
              <MailMinus className="text-blue-600" />
              <p>shivansh0975@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 bg-white shadow-lg p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium">Full Name</label>
              <input
                className="w-full border-b outline-none p-2"
                placeholder="Enter your name"
                type="text"
                id="fullName"
                name="fullName"
                // value={data.fullName}
                // onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Email</label>
              <input
                className="w-full border-b outline-none p-2"
                placeholder="Enter your email"
                id="email"
                type="email"
                name="email"
                // value={data.email}
                // onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Phone No</label>
              <input
                className="w-full border-b outline-none p-2"
                placeholder="Enter your phone"
                type="number"
                name="phone"
                id="phone"
                // value={data.phone}
                // onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Message</label>
              <textarea
                className="w-full border-b outline-none p-2"
                placeholder="Enter your message"
                id="message"
                name="message"
                // value={data.message}
                // onChange={handleChange}
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 py-2 px-8 text-white rounded-md text-lg flex items-center gap-2"
                type="submit"
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <BeatLoader size={10} color="#fff" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
