
import React from 'react';
import Description from '../../../components/Description';
import Brand from '../../../components/Brand';
import Openhours from '../../../components/Openinghours';
import Location from '../../../components/Location';

const ExamplePage: React.FC = () => {
  return (
  <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#060023] text-white py-8 shadow-md">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-2">Your Company Info</h1>
          <h2 className="text-lg font-medium text-gray-200">
            Please verify if your store's information is correct.
          </h2>
        </div>
      </header>

      {/* Main Content in a Grid */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <Description />
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-md">
            <Brand />
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-md">
            <Openhours />
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-md">
            <Location />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ExamplePage;
