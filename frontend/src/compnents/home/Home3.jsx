import React from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Mental Health Assessment',
    description: 'Quick, confidential mental health assessments to check your well-being.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Personal Journals',
    description: 'Track your mood and thoughts privately in a secure, personal journal.',
    icon: LockClosedIcon,
  },
  {
    name: '24/7 Support with AI Therapist',
    description: 'Receive instant support anytime, anywhere with our AI-powered therapist, available around the clock.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Anonymous Chatting',
    description: 'Connect with others anonymously and share experiences freely.',
    icon: FingerPrintIcon,
  },
];

const Home3 = () => {
  return (
    <div className="bg-gradient-to-r from-[#D1D5DB] via-[#A3A5D4] to-[#8A94C0] text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto text-center px-6 lg:px-8">
        <p className="text-4xl font-extrabold text-white mb-6">Unlocking Well-being Excellence</p>
        <p className="text-lg text-gray-100 mb-12 leading-relaxed">
          Stay on top of your mental health with personalized support and assessments that truly understand your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
            >
              <div className="flex items-center justify-center h-20 w-20 mb-6 rounded-full bg-gradient-to-r from-[#81C7D4] to-[#B0E0E6]">
                <feature.icon className="h-12 w-12 text-white" aria-hidden="true" />
              </div>
              <p className="text-2xl font-semibold text-gray-900 mb-4">{feature.name}</p>
              <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home3;
