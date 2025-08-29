import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../index.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2b87vh9",
        "template_u778il2",
        e.target,
        "cOGhxeiLBvUHxb8ei"
      )
      .then(
        (result) => {
          setStatus("He's Beginning To Believe...");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("There was an error sending the message.");
        }
      );
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black text-matrix-green overflow-hidden">
      <div className="matrix-rain absolute inset-0 z-0"></div>
      <h2 className="text-3xl font-bold mb-4 glitch " data-text="Contact Me">
        Contact Me
      </h2>
      <p className="mb-6">
        Interested in exploring potential opportunities to collaborate or
        contribute to your team? Feel free to reach out!
        <p>I'm eager to discuss how my skills can align with your needs!</p>
        <p>
          Please call <strong>(+1) 647 989-9343</strong> anytime or send an
          email below!
        </p>
      </p>
      <form
        className="flex flex-col space-y-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input-matrix p-4 text-lg rounded-md border-2 border-matrix-green bg-black text-matrix-green placeholder:text-matrix-green w-[40%]"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex w-full justify-center">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input-matrix p-4 text-lg rounded-md border-2 border-matrix-green bg-black text-matrix-green placeholder:text-matrix-green w-[40%]"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            className="input-matrix p-4 text-lg rounded-md border-2 border-matrix-green bg-black text-matrix-green placeholder:text-matrix-green message-box w-full"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            className="btn-matrix p-4 text-lg rounded-md border-2 border-matrix-green bg-matrix-green text-black hover:bg-transparent hover:text-matrix-green mt-4"
          >
            Send
          </button>
        </div>
      </form>
      {status && (
        <div className="mt-6 text-xl font-matrix fade-in">
          <p>{status}</p>
          <p className="text-lg mt-4">- Morpheus</p>
        </div>
      )}
    </section>
  );
};

export default Contact;
