import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Navbar from '../navbar/Navbar';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MoodTrack = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mood, setMood] = useState(null);
  const [moodData, setMoodData] = useState([]);
  
  const username = localStorage.getItem('tokenUser');
  console.log(username);

  useEffect(() => {
    // Fetch existing mood data for the user
    axios.get(`http://localhost:8000/api/moods/${username}`)
      .then(response => setMoodData(response.data))
      .catch(error => console.error('Error fetching mood data:', error));
  }, [username]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setIsModalOpen(true);
  };

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    axios.post(`http://localhost:8000/api/moods/${username}`, { date: selectedDate, mood: selectedMood })
      .then(response => {
        setMoodData(prevData => [...prevData, response.data]);
        setIsModalOpen(false);
      })
      .catch(error => console.error('Error saving mood:', error));
  };

  const moodLabels = ['😄', '😊', '😐', '😔', '😢'];
  const moodCounts = moodLabels.map(label => moodData.filter(entry => entry.mood === label).length);

  const data = {
    labels: moodLabels,
    datasets: [
      {
        label: 'Mood Frequency',
        data: moodCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 mt-20 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 rounded-xl shadow-xl">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center">
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 mb-4 shadow-md"
              onChange={handleDateChange}
            />
          </div>
          <Transition appear show={isModalOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-50" />
              </Transition.Child>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                        How do you feel today?
                      </Dialog.Title>
                      <div className="mt-4 flex justify-around">
                        {moodLabels.map((emoji, index) => (
                          <button
                            key={index}
                            className="text-5xl hover:scale-110 transition duration-300 ease-in-out transform"
                            onClick={() => handleMoodSelect(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Mood Frequency</h2>
          </div>
          <div className="mt-8 h-96 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 shadow-md">
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodTrack;