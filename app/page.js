"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // null, "success", "error"

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
    setIsLoading(false);
  }

  let message = null;
  if (status === "success") {
    message = <p className="text-green-600 text-center mb-4">Message sent successfully!</p>;
  } else if (status === "error") {
    message = <p className="text-red-600 text-center mb-4">Failed to send message. Please try again.</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-600 to-green-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
        <Image
          src="/companyLogo.png"
          alt="Company Logo"
          width={200}
          height={200}
          className="mx-auto mb-6 rounded-xl border-1 border-green-700 shadow-lg"
          loading = "eager"
        />

        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">
          Connect Us 
        </h1>
        <p className="text-slate-600 mb-8 text-center">
          Fill in your details and we will get back to you as soon as possible
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
             Full Name
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Itamar Hadad"
              name = "name"
              value = {formData.name}
              onChange = {handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
             Email Address
            </label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="itamar.hadad@example.com"
              name = "email"
              value = {formData.email}
              onChange = {handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
             Message
            </label>
            <textarea
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows={4}
              placeholder="Enter your message here..."
              name = "message"
              value = {formData.message}
              onChange = {handleChange}
              required
            />
          </div>

          {message}

          <button            
          type="submit"
          className="bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-500 transition-colors duration-300"
          disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}

