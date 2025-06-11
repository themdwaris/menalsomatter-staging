import React from "react";
import { User, BookOpen, MessageCircle } from "lucide-react";

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 mb-2">
            Welcome to MenAlsoMatter
          </h1>
          <p className="text-gray-600">
            A safe space for men's mental health and wellbeing
          </p>
        </div>
        <button
          className="px-3 py-1.5 rounded-lg bg-navy-700 text-white cursor-pointer transition transform active:scale-90"
          onClick={async () => {
            
            
            const res = await fetch("http://localhost:3000/create-checkout-session", {
              method: "POST",
            });
            const data = await res.json();
            if (data.url) {
              window.location.href = data.url;
            }
          }}
        >
          Donate
        </button>
      </header>

      <section className="mb-10">
        <div className="bg-gradient-to-r from-navy-700 to-navy-900 rounded-xl p-6 text-white shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold mb-3">You're Not Alone</h2>
              <p className="mb-4">
                Join thousands of men who are finding support, connection, and
                resources to navigate life's challenges.
              </p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-md transition-colors duration-300">
                Join Our Community
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://images.pexels.com/photos/6177595/pexels-photo-6177595.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Men in support group"
                className="rounded-lg shadow-lg max-h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-navy-900 mb-4">
          Featured Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <User size={24} className="text-teal-500 mb-3" />,
              title: "Personal Stories",
              description:
                "Read inspiring stories from men who have overcome mental health challenges.",
              cta: "Read Stories",
            },
            {
              icon: <BookOpen size={24} className="text-teal-500 mb-3" />,
              title: "Self-Help Tools",
              description:
                "Access practical tools and exercises to support your mental health journey.",
              cta: "Explore Tools",
            },
            {
              icon: <MessageCircle size={24} className="text-teal-500 mb-3" />,
              title: "Support Groups",
              description:
                "Connect with other men in a safe, confidential space to share and learn.",
              cta: "Find a Group",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              {item.icon}
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
              <a
                href="#"
                className="text-teal-600 font-medium hover:text-teal-800 transition-colors inline-flex items-center"
              >
                {item.cta} <span className="ml-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy-900 mb-4">
          Upcoming Events
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {[
            {
              date: "May 15",
              title: "Virtual Support Group",
              time: "7:00 PM - 8:30 PM",
              participants: 18,
            },
            {
              date: "May 22",
              title: "Wellness Workshop: Stress Management",
              time: "6:00 PM - 7:30 PM",
              participants: 24,
            },
            {
              date: "June 5",
              title: "Outdoor Meditation Session",
              time: "9:00 AM - 10:30 AM",
              participants: 12,
            },
          ].map((event, index) => (
            <div
              key={index}
              className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors
                ${index !== 2 ? "border-b border-gray-200" : ""}`}
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-navy-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-navy-700 font-bold">{event.date}</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-500 mr-4">
                  <span className="font-medium text-navy-700">
                    {event.participants}
                  </span>{" "}
                  participants
                </div>
                <button className="border border-navy-700 text-navy-700 hover:bg-navy-50 py-1 px-4 rounded-md text-sm transition-colors">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
