import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Home1 = () => {
  const { username: usernameFromUrl } = useParams();
  
  // Initialize with default value to prevent loading flash
  const [username, setUsername] = useState(() => {
    if (usernameFromUrl) {
      return usernameFromUrl;
    }
    return localStorage.getItem('tokenUser') || 'Guest';
  });

  useEffect(() => {
    // Update username if URL changes
    if (usernameFromUrl && usernameFromUrl !== username) {
      setUsername(usernameFromUrl);
    }
  }, [usernameFromUrl, username]);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-r from-teal-100 to-blue-50 overflow-hidden">
      {/* Floating Particles Background Animation */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate__animated animate__fadeIn animate__delay-1s">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-teal-200 to-blue-300 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate__animated animate__pulse animate__infinite animate__delay-2s"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center animate__animated animate__fadeIn animate__delay-1s">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate__animated animate__fadeIn animate__delay-0.5s">
          SUKOON from this Chaos World !
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600 animate__animated animate__fadeIn animate__delay-1s">
          In this fast-paced world, it’s easy to feel overwhelmed. Here, we offer a safe space to pause, reflect, and reconnect with yourself. Whether you're seeking emotional support or a moment of clarity, our platform provides tools designed to help you navigate life's challenges with resilience and self-awareness.
        </p>

        {/* Call-to-Action Button with Hover Animation and Shadow Effects */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/contactus"
            className="px-8 py-3 text-lg font-semibold text-indigo-700 bg-transparent border-2 border-indigo-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-700 hover:text-white hover:shadow-xl animate__animated animate__fadeIn animate__delay-2s"
          >
            Learn More About Us →
          </a>
        </div>

        {/* Link to AI Therapist */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={`/${username}/therapist`}
            className="px-8 py-3 text-lg font-semibold text-teal-700 bg-transparent border-2 border-teal-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 hover:text-white hover:shadow-xl animate__animated animate__fadeIn animate__delay-3s"
          >
            Chat with AI Therapist →
          </Link>
        </div>

        {/* Floating Text Elements for More Interactive UI */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-teal-200 to-blue-300 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate__animated animate__fadeIn animate__delay-3s"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {/* Parallax effect for floating text */}
        <div className="absolute inset-x-0 bottom-10 text-center text-gray-600 opacity-80 animate__animated animate__fadeIn animate__delay-4s">
          <h3 className="text-lg font-semibold">Feel free. Feel safe. Feel heard.</h3>
        </div>
      </div>

      {/* New Floating Element for Extra Detail */}
      <div className="absolute inset-x-0 top-[calc(50%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(50%-20rem)]">
        <div
          className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-teal-200 to-blue-300 opacity-40 sm:left-[calc(50%+25rem)] sm:w-[72.1875rem] animate__animated animate__fadeIn animate__delay-2s"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
};

export default Home1;
