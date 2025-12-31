import React from "react";

const GetInTouchSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8">

        {/* LEFT SIDE — FORM */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT SIDE — CONTACT INFO */}
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Hotline:</span> 16625
            </p>
            <p>
              <span className="font-semibold">Sales:</span> +01741285251
            </p>
            <p>
              <span className="font-semibold">Email:</span> info@downtown.com
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GetInTouchSection;
